import {Check, ChevronDown, Sparkles, X} from 'lucide-react';
import {useMemo} from 'react';

import {MockChrome, MockWindow, seededRandom, turbo} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * `PointceptAutoLabelDialog` open over the 3D labeling editor: agent, model
 * (trained runs first — with the "this dataset" badge — then the downloaded
 * catalog), instance score floor (PointGroup runs only), max voxels per chunk,
 * and add/replace for the existing 3D segmentation.
 */
const COPY = {
  ko: {
    title: 'Pointcept AI 라벨링',
    description:
      '연결된 Pointcept 에이전트로 이 포인트 클라우드를 추론해 결과를 3D 세그멘테이션으로 만듭니다. 토큰을 사용하지 않습니다.',
    agent: '에이전트',
    model: '모델',
    groupFinetuned: '학습한 모델',
    groupCatalog: '카탈로그',
    datasetMatch: '이 데이터셋',
    scoreThreshold: '인스턴스 점수 하한',
    maxVoxels: '조각당 최대 복셀 수',
    maxVoxelsHint: '비우면 에이전트 기본값을 씁니다. GPU 메모리가 부족하면 줄이세요.',
    mode: '기존 3D 세그멘테이션 처리',
    modeAdd: '추가',
    modeAddHint: '기존 라벨은 두고, 새 인스턴스는 기존 번호 뒤에 이어 붙입니다.',
    modeReplace: '대체',
    modeReplaceHint:
      '기존 3D 세그멘테이션을 지우고 결과로 바꿉니다. 큐보이드 등 다른 도형은 그대로입니다.',
    cancel: '취소',
    run: '실행',
    runs: ['사무실 3층 스캔 (3f9c2a1e)', '물류창고 A동 (b71e04d9)'],
  },
  en: {
    title: 'Auto-label with Pointcept',
    description:
      'Run a connected Pointcept agent on this point cloud and turn the result into 3D segmentation. No tokens are used.',
    agent: 'Agent',
    model: 'Model',
    groupFinetuned: 'Trained models',
    groupCatalog: 'Catalog',
    datasetMatch: 'this dataset',
    scoreThreshold: 'Instance score threshold',
    maxVoxels: 'Max voxels per chunk',
    maxVoxelsHint:
      'Leave empty for the agent default. Lower it when the GPU runs out of memory.',
    mode: 'Existing 3D segmentation',
    modeAdd: 'Add',
    modeAddHint:
      'Keep the existing labels; new instances continue after the current numbering.',
    modeReplace: 'Replace',
    modeReplaceHint:
      'Clear the existing 3D segmentation and use the result. Other shapes such as cuboids stay.',
    cancel: 'Cancel',
    run: 'Run',
    runs: ['Office 3F scan (3f9c2a1e)', 'Warehouse A (b71e04d9)'],
  },
} as const;

const AGENT_NAME = 'lab-gpu-01';
const CATALOG = ['PTv3 · ScanNet v2', 'PTv3 · ScanNet200', 'PTv3 · S3DIS'];
const SCORE = 0.3;

const VIEW_W = 800;
const VIEW_H = 500;

type Pt = {x: number; y: number; r: number; color: string};

/** A small indoor room (floor, two walls, desks, chairs, a shelf) projected
 * with a simple perspective camera, colored by height — enough to read as
 * the 3D editor behind the dimmed overlay. */
function useRoomScatter(): Pt[] {
  return useMemo(() => {
    const rand = seededRandom(20260921);
    const raw: [number, number, number][] = [];
    const push = (x: number, y: number, z: number) => raw.push([x, y, z]);
    const box = (
      cx: number,
      cy: number,
      w: number,
      d: number,
      z0: number,
      z1: number,
      n: number,
    ) => {
      for (let i = 0; i < n; i++) {
        const face = rand();
        if (face < 0.5) {
          push(cx + (rand() - 0.5) * w, cy + (rand() - 0.5) * d, z1);
        } else if (face < 0.75) {
          push(cx + (rand() - 0.5) * w, cy - d / 2, z0 + rand() * (z1 - z0));
        } else {
          push(
            cx + (rand() < 0.5 ? -w / 2 : w / 2),
            cy + (rand() - 0.5) * d,
            z0 + rand() * (z1 - z0),
          );
        }
      }
    };
    // floor + walls
    for (let i = 0; i < 1500; i++) push((rand() - 0.5) * 8, rand() * 7, 0);
    for (let i = 0; i < 700; i++) push((rand() - 0.5) * 8, 7, rand() * 2.8);
    for (let i = 0; i < 500; i++) push(-4, rand() * 7, rand() * 2.8);
    // desks
    box(-1.6, 3.2, 1.6, 0.8, 0, 0.75, 260);
    box(1.2, 3.2, 1.6, 0.8, 0, 0.75, 260);
    box(-1.6, 5.2, 1.6, 0.8, 0, 0.75, 220);
    box(1.2, 5.2, 1.6, 0.8, 0, 0.75, 220);
    // chairs
    for (const [cx, cy] of [
      [-1.6, 2.4],
      [1.2, 2.4],
      [-1.6, 4.4],
      [1.2, 4.4],
    ]) {
      box(cx, cy, 0.5, 0.5, 0, 0.48, 70);
      box(cx, cy - 0.25, 0.5, 0.06, 0.48, 1.0, 40);
    }
    // shelf by the left wall
    box(-3.6, 5.5, 0.6, 2, 0, 2.1, 320);

    return raw
      .map(([x, y, z]) => {
        const depth = y + 3.2;
        const sx = VIEW_W / 2 + (x / depth) * 520;
        const sy = VIEW_H * 0.36 + ((1.9 - z) / depth) * 520 * 0.72 + (y / depth) * 60;
        return {
          x: sx,
          y: sy,
          r: Math.max(0.9, 3.2 / depth),
          depth,
          color: turbo(z / 2.8),
        };
      })
      .sort((a, b) => b.depth - a.depth)
      .map(({x, y, r, color}) => ({x, y, r, color}));
  }, []);
}

function Field({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <div className="space-y-1.5">
      <span className="block text-[11px] font-medium">{label}</span>
      {children}
    </div>
  );
}

function SelectTrigger({
  children,
  open = false,
}: {
  children: React.ReactNode;
  open?: boolean;
}) {
  return (
    <span
      className={cn(
        'flex h-7 items-center gap-2 rounded-md border border-input bg-background px-2.5 text-[11px] shadow-sm',
        open && 'ring-2 ring-ring/40',
      )}
    >
      <span className="flex min-w-0 flex-1 items-center gap-1.5 truncate">
        {children}
      </span>
      <ChevronDown className="size-3 shrink-0 text-muted-foreground/60" />
    </span>
  );
}

function MatchBadge({label}: {label: string}) {
  return (
    <span className="shrink-0 rounded-md bg-secondary px-1.5 py-px text-[9px] text-secondary-foreground">
      {label}
    </span>
  );
}

function Radio({checked}: {checked: boolean}) {
  return (
    <span className="mt-0.5 flex size-3 shrink-0 items-center justify-center rounded-full border border-primary text-primary">
      {checked && <span className="size-1.5 rounded-full bg-current" />}
    </span>
  );
}

export function MockPointceptAutoLabel() {
  const {lang} = useLanguage();
  const c = COPY[lang];
  const points = useRoomScatter();

  return (
    <MockWindow>
      <MockChrome />
      <div className="relative h-[34rem] overflow-hidden bg-[#0b1220] sm:h-[33rem]">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          {points.map((p, i) => (
            <rect
              key={i}
              x={p.x - p.r / 2}
              y={p.y - p.r / 2}
              width={p.r}
              height={p.r}
              fill={p.color}
            />
          ))}
        </svg>
        {/* DialogOverlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* DialogContent (sm:max-w-lg) */}
        <div className="absolute top-1/2 left-1/2 grid w-[calc(100%-2rem)] max-w-[26rem] -translate-x-1/2 -translate-y-1/2 gap-3.5 rounded-lg border border-border bg-background p-4 shadow-lg">
          <X className="absolute top-3.5 right-3.5 size-3.5 text-muted-foreground" />
          <div className="space-y-1 pr-4">
            <span className="flex items-center gap-1.5 text-[13px] font-semibold tracking-tight">
              <Sparkles className="size-3.5" />
              {c.title}
            </span>
            <p className="text-[10.5px] leading-relaxed text-muted-foreground">
              {c.description}
            </p>
          </div>

          <div className="min-w-0 space-y-3">
            <Field label={c.agent}>
              <SelectTrigger>{AGENT_NAME}</SelectTrigger>
            </Field>

            <div className="relative">
              <Field label={c.model}>
                <SelectTrigger open>
                  <span className="truncate">{c.runs[0]}</span>
                  <MatchBadge label={c.datasetMatch} />
                </SelectTrigger>
              </Field>
              {/* open SelectContent */}
              <div className="absolute top-full right-0 left-0 z-10 mt-1 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md">
                <span className="block px-2 py-1 text-[10px] font-semibold text-muted-foreground">
                  {c.groupFinetuned}
                </span>
                {c.runs.map((run, i) => (
                  <span
                    key={run}
                    className={cn(
                      'flex items-center gap-1.5 rounded-sm py-1 pr-2 pl-6 text-[11px] relative',
                      i === 0 && 'bg-accent text-accent-foreground',
                    )}
                  >
                    {i === 0 && <Check className="absolute left-2 size-3" />}
                    <span className="truncate">{run}</span>
                    {i === 0 && <MatchBadge label={c.datasetMatch} />}
                  </span>
                ))}
                <span className="mt-0.5 block px-2 py-1 text-[10px] font-semibold text-muted-foreground">
                  {c.groupCatalog}
                </span>
                {CATALOG.map(name => (
                  <span
                    key={name}
                    className="block rounded-sm py-1 pr-2 pl-6 text-[11px]"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium">{c.scoreThreshold}</span>
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  {SCORE.toFixed(2)}
                </span>
              </div>
              {/* Slider 0.05–0.95 */}
              <span className="relative block h-3">
                <span className="absolute top-1/2 right-0 left-0 h-1 -translate-y-1/2 rounded-full bg-secondary" />
                <span
                  className="absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full bg-primary"
                  style={{width: `${((SCORE - 0.05) / 0.9) * 100}%`}}
                />
                <span
                  className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background"
                  style={{left: `${((SCORE - 0.05) / 0.9) * 100}%`}}
                />
              </span>
            </div>

            <Field label={c.maxVoxels}>
              <span className="flex h-7 items-center rounded-md border border-input bg-background px-2.5 text-[11px] tabular-nums shadow-sm">
                200000
              </span>
              <p className="text-[10px] text-muted-foreground">{c.maxVoxelsHint}</p>
            </Field>

            <Field label={c.mode}>
              <div className="grid gap-1.5">
                {(
                  [
                    [c.modeAdd, c.modeAddHint, true],
                    [c.modeReplace, c.modeReplaceHint, false],
                  ] as const
                ).map(([title, hint, checked]) => (
                  <span
                    key={title}
                    className={cn(
                      'flex items-start gap-2.5 rounded-md border p-2.5',
                      'border-border',
                    )}
                  >
                    <Radio checked={checked} />
                    <span className="min-w-0 space-y-0.5">
                      <span className="block text-[11px] font-medium">{title}</span>
                      <span className="block text-[10px] leading-snug text-muted-foreground">
                        {hint}
                      </span>
                    </span>
                  </span>
                ))}
              </div>
            </Field>
          </div>

          <div className="flex justify-end gap-1.5">
            <span className="flex h-7 items-center rounded-md px-3 text-[11px] font-medium">
              {c.cancel}
            </span>
            <span className="flex h-7 items-center rounded-md bg-primary px-3 text-[11px] font-medium text-primary-foreground shadow">
              {c.run}
            </span>
          </div>
        </div>
      </div>
    </MockWindow>
  );
}
