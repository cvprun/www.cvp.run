import {Link2, MousePointer2, Plus} from 'lucide-react';

import {MockPanelFrame} from '@/components/mocks/panel-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

const PRESET_COLOR = '#0070f3';

/** COCO-17 joints as (x%, y%) on the canvas. */
const JOINTS: [number, number, string][] = [
  [50, 10, 'nose'],
  [46, 7, 'left_eye'],
  [54, 7, 'right_eye'],
  [41, 10, 'left_ear'],
  [59, 10, 'right_ear'],
  [37, 25, 'left_shoulder'],
  [63, 25, 'right_shoulder'],
  [29, 41, 'left_elbow'],
  [71, 41, 'right_elbow'],
  [25, 56, 'left_wrist'],
  [75, 56, 'right_wrist'],
  [42, 54, 'left_hip'],
  [58, 54, 'right_hip'],
  [40, 71, 'left_knee'],
  [60, 71, 'right_knee'],
  [39, 89, 'left_ankle'],
  [61, 89, 'right_ankle'],
];

const BONES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [5, 6],
  [5, 7],
  [7, 9],
  [6, 8],
  [8, 10],
  [5, 11],
  [6, 12],
  [11, 12],
  [11, 13],
  [13, 15],
  [12, 14],
  [14, 16],
];

export function MockKeypointPreset() {
  const {t} = useLanguage();
  const m = t.mocks.keypoints;

  return (
    <MockPanelFrame>
      <div className="flex h-[19rem] sm:h-[22rem]">
        {/* canvas */}
        <div
          className="relative min-w-0 flex-1 overflow-hidden bg-background"
          style={{
            backgroundImage:
              'radial-gradient(circle, var(--border) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          {/* mode toggle */}
          <div className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-md border border-border bg-background/95 p-1 shadow-sm">
            <span className="flex items-center gap-1 rounded bg-primary px-2 py-1 text-[10px] text-primary-foreground">
              <MousePointer2 className="size-3" />
              {m.move}
            </span>
            <span className="flex items-center gap-1 rounded px-2 py-1 text-[10px] text-muted-foreground">
              <Link2 className="size-3" />
              {m.connect}
            </span>
          </div>

          {/* bones */}
          <svg className="absolute inset-0 h-full w-full">
            {BONES.map(([a, b], i) => (
              <line
                key={i}
                x1={`${JOINTS[a][0]}%`}
                y1={`${JOINTS[a][1]}%`}
                x2={`${JOINTS[b][0]}%`}
                y2={`${JOINTS[b][1]}%`}
                stroke={PRESET_COLOR}
                strokeWidth={2}
                opacity={0.8}
              />
            ))}
          </svg>

          {/* joints */}
          {JOINTS.map(([x, y], i) => (
            <span
              key={i}
              className={cn(
                'absolute flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-[8px] font-bold text-white shadow-md',
                i === 0 && 'ring-2 ring-primary ring-offset-2 ring-offset-background',
              )}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                backgroundColor: PRESET_COLOR,
                borderColor: 'rgba(255,255,255,0.85)',
              }}
            >
              {i}
            </span>
          ))}
        </div>

        {/* side panel */}
        <aside className="hidden w-44 shrink-0 flex-col border-l border-border bg-card sm:flex">
          <div className="flex gap-1 border-b border-border px-2 py-1.5 text-[10px]">
            <span className="rounded px-1.5 py-1 text-muted-foreground">
              {m.tabProperties}
            </span>
            <span className="rounded bg-muted px-1.5 py-1 font-medium">
              {m.tabJoints}
              <span className="ml-1 rounded bg-background px-1 tabular-nums">
                {m.jointCount}
              </span>
            </span>
            <span className="rounded px-1.5 py-1 text-muted-foreground">
              {m.tabBones}
              <span className="ml-1 rounded bg-muted px-1 tabular-nums">
                {m.boneCount}
              </span>
            </span>
          </div>
          <div className="border-b border-border px-3 py-2 text-[11px] font-medium">
            {m.presetName}
          </div>
          <ul className="flex-1 space-y-0.5 overflow-hidden p-1.5">
            {JOINTS.slice(0, 7).map(([, , name], i) => (
              <li
                key={name}
                className={cn(
                  'flex items-center gap-1.5 rounded-md border px-1.5 py-1 text-[10px]',
                  i === 0 ? 'border-primary bg-accent' : 'border-transparent',
                )}
              >
                <span
                  className="flex size-4 items-center justify-center rounded-full text-[8px] font-bold text-white"
                  style={{backgroundColor: PRESET_COLOR}}
                >
                  {i}
                </span>
                <span className="truncate font-mono">{name}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-border p-2">
            <span className="flex items-center justify-center gap-1 rounded-md border border-border px-2 py-1 text-[10px] text-muted-foreground">
              <Plus className="size-3" />
              {m.addJoint}
            </span>
          </div>
        </aside>
      </div>
    </MockPanelFrame>
  );
}
