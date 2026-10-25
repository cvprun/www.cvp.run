import {ChevronDown, Database, Images, Layers, Terminal} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Dataset › 샘플 › PLY 라벨 적용 (`/proj/:p/datasets/:d/label-fields`,
 * `LabelRulesTable`): the field picked from the PLY header, one rule per
 * value — class, or skip — and whether the value is split into objects, then
 * the per-sample summary and the apply bar. Values and classes follow the
 * "mixed" rules story on a weld scan dataset.
 */
const COPY = {
  ko: {
    dataset: 'HD 용접 스캔',
    samples: '샘플',
    title: 'PLY 라벨 적용',
    selected: '샘플 3개 선택',
    targets: '대상',
    targetsLine: '선택한 샘플 3개 · PLY 3 · 다른 형식 0',
    field: '필드',
    fieldIn: '62개 파일에 있음',
    rules: '규칙',
    saved: '데이터셋에 저장된 규칙 · 10월 13일 저장',
    quick: ['값마다 클래스', '한 클래스의 객체들', '직접 지정'],
    cols: ['값', '점', '파일', '클래스', '객체로 나누기'],
    skip: '건너뜀',
    lump: '한 덩어리',
    object: '객체 #1',
    perSample: '샘플마다',
    summary: '배경 한 덩어리 · 부재 객체 최대 2개 · 브래킷 객체 최대 3개 · 건너뜀: -1',
    save: '이 규칙을 데이터셋에 저장',
    cli: 'CLI 명령으로 보기',
    cancel: '취소',
    apply: '3개 샘플에 적용',
  },
  en: {
    dataset: 'HD weld scans',
    samples: 'Samples',
    title: 'Apply PLY labels',
    selected: '3 samples selected',
    targets: 'Targets',
    targetsLine: '3 selected samples · 3 PLY · 0 other formats',
    field: 'Field',
    fieldIn: 'in 62 files',
    rules: 'Rules',
    saved: 'Rules saved on the dataset · saved Oct 13',
    quick: ['One class per value', 'Objects of one class', 'Manual'],
    cols: ['Value', 'Points', 'Files', 'Class', 'Split into objects'],
    skip: 'Skip',
    lump: 'One lump',
    object: 'Object #1',
    perSample: 'Per sample',
    summary:
      'background as one lump · up to 2 member objects · up to 3 bracket objects · skipped: -1',
    save: 'Save these rules on the dataset',
    cli: 'Show as a CLI command',
    cancel: 'Cancel',
    apply: 'Apply to 3 samples',
  },
} as const;

const CLASSES = {
  background: {ko: '배경', en: 'background', color: '#8a8f98'},
  member: {ko: '부재', en: 'member', color: '#2563eb'},
  bracket: {ko: '브래킷', en: 'bracket', color: '#d97706'},
} as const;

type Rule = {
  value: number;
  points: number;
  files: number;
  cls: keyof typeof CLASSES | null;
  split: boolean;
};

const RULES: Rule[] = [
  {value: -1, points: 1_535, files: 44, cls: null, split: false},
  {value: 0, points: 353_354, files: 62, cls: 'background', split: false},
  {value: 1, points: 840_706, files: 62, cls: 'member', split: true},
  {value: 2, points: 798_691, files: 56, cls: 'member', split: true},
  {value: 3, points: 398_787, files: 42, cls: 'bracket', split: true},
  {value: 4, points: 286_426, files: 27, cls: 'bracket', split: true},
];
const MAX_POINTS = Math.max(...RULES.map(r => r.points));

function Switch({on, disabled}: {on: boolean; disabled?: boolean}) {
  return (
    <span
      className={cn(
        'inline-flex h-3.5 w-6 shrink-0 items-center rounded-full p-px',
        on ? 'justify-end bg-primary' : 'justify-start bg-input',
        disabled && 'opacity-40',
      )}
    >
      <span className="size-3 rounded-full bg-background shadow" />
    </span>
  );
}

export function MockLabelRules() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockAppFrame
      activeNav="datasets"
      crumbs={[
        {icon: Database, label: c.dataset},
        {icon: Images, label: c.samples},
        {icon: Layers, label: c.title},
      ]}
      title={c.title}
      titleIcon={Layers}
      meta={
        <span className="rounded-md bg-secondary px-1.5 py-px text-[9.5px] text-muted-foreground">
          {c.selected}
        </span>
      }
    >
      <div className="space-y-2.5">
        <div className="rounded-md border border-border bg-card px-3 py-2">
          <p className="text-[10.5px] font-semibold">{c.targets}</p>
          <p className="mt-0.5 text-[9.5px] text-muted-foreground">{c.targetsLine}</p>
          <div className="mt-1.5 flex items-center gap-2 text-[10px]">
            <span className="text-muted-foreground">{c.field}</span>
            <span className="flex h-6 items-center gap-1.5 rounded-md border border-input bg-background px-2 font-mono text-[9.5px]">
              scalar_instance_label
              <ChevronDown className="size-3 text-muted-foreground" />
            </span>
            <span className="text-[9.5px] text-muted-foreground">{c.fieldIn}</span>
          </div>
        </div>

        <div className="rounded-md border border-border bg-card">
          <div className="flex flex-wrap items-center gap-2 px-3 pt-2 pb-1.5">
            <p className="text-[10.5px] font-semibold">{c.rules}</p>
            <span className="rounded bg-secondary px-1 text-[8.5px] text-muted-foreground">
              {c.saved}
            </span>
            <span className="ml-auto hidden gap-1 @2xl:flex">
              {c.quick.map((label, i) => (
                <MockButton key={label} variant={i === 2 ? 'default' : 'outline'}>
                  {label}
                </MockButton>
              ))}
            </span>
          </div>
          <table className="w-full text-[10px]">
            <thead>
              <tr className="border-t border-border bg-muted/50 text-left text-[9.5px] text-muted-foreground">
                <th className="px-3 py-1.5 font-medium">{c.cols[0]}</th>
                <th className="px-2 py-1.5 font-medium">{c.cols[1]}</th>
                <th className="hidden px-2 py-1.5 text-right font-medium @xl:table-cell">
                  {c.cols[2]}
                </th>
                <th className="px-2 py-1.5 font-medium">{c.cols[3]}</th>
                <th className="px-2 py-1.5 font-medium">{c.cols[4]}</th>
              </tr>
            </thead>
            <tbody>
              {RULES.map(rule => {
                const cls = rule.cls ? CLASSES[rule.cls] : null;
                return (
                  <tr key={rule.value} className="border-t border-border">
                    <td className="px-3 py-1.5 font-mono tabular-nums">{rule.value}</td>
                    <td className="px-2 py-1.5">
                      <span className="flex items-center gap-1.5">
                        <span className="hidden h-1 w-14 overflow-hidden rounded-full bg-muted @xl:block">
                          <span
                            className="block h-full bg-foreground/60"
                            style={{width: `${(rule.points / MAX_POINTS) * 100}%`}}
                          />
                        </span>
                        <span className="font-mono text-[9.5px] tabular-nums">
                          {rule.points.toLocaleString('en-US')}
                        </span>
                      </span>
                    </td>
                    <td className="hidden px-2 py-1.5 text-right tabular-nums @xl:table-cell">
                      {rule.files}
                    </td>
                    <td className="px-2 py-1.5">
                      <span className="flex h-5 w-28 items-center gap-1.5 rounded-md border border-input bg-background px-1.5">
                        {cls ? (
                          <>
                            <span
                              className="size-2 shrink-0 rounded-sm"
                              style={{backgroundColor: cls.color}}
                            />
                            <span className="truncate">{cls[lang]}</span>
                          </>
                        ) : (
                          <span className="text-muted-foreground">{c.skip}</span>
                        )}
                        <ChevronDown className="ml-auto size-2.5 text-muted-foreground" />
                      </span>
                    </td>
                    <td className="px-2 py-1.5">
                      <span className="flex items-center gap-1.5">
                        <Switch on={rule.split} disabled={rule.value < 0} />
                        {cls && (
                          <span className="text-[9px] text-muted-foreground">
                            {rule.split ? c.object : c.lump}
                          </span>
                        )}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="border-t border-border px-3 py-2">
            <p className="text-[9.5px]">
              <span className="font-medium">{c.perSample}</span>
              <span className="text-muted-foreground"> · {c.summary}</span>
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-[9.5px]">
              <span className="flex size-3 items-center justify-center rounded-[3px] border border-primary bg-primary text-primary-foreground">
                <svg
                  viewBox="0 0 12 12"
                  className="size-2.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M2.5 6.5l2.2 2L9.5 3.5" />
                </svg>
              </span>
              {c.save}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-1.5 rounded-md border border-border bg-card px-3 py-2">
          <MockButton icon={Terminal} variant="ghost" className="mr-auto">
            {c.cli}
          </MockButton>
          <MockButton>{c.cancel}</MockButton>
          <MockButton variant="default">{c.apply}</MockButton>
        </div>
      </div>
    </MockAppFrame>
  );
}
