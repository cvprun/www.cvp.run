import {Check, ChevronDown, MessageSquare, Send} from 'lucide-react';

import {MockPanelFrame} from '@/components/mocks/panel-frame';
import {useLanguage} from '@/lib/i18n';

/**
 * COCO 2017 val image 000000148719 — "1970 Dodge Dude" by dave_7 (CC BY 2.0),
 * annotations CC BY 4.0 by the COCO Consortium. Every box below is the
 * dataset's own annotation, offset into this 640×400 crop. COCO labels only
 * one person here (far left), so the man visible through the windshield is
 * genuinely unlabeled — which is what the open review thread is about.
 */
const IMAGE_URL = '/mockdata/coco-pickup.webp';
const IMG_W = 640;
const IMG_H = 400;

const CLASS_TRUCK = '#501EB4';
const CLASS_PERSON = '#FF1E1E';

type Box = {name: string; color: string; x: number; y: number; w: number; h: number};

const BOXES: Box[] = [
  {name: 'truck', color: CLASS_TRUCK, x: 96, y: 36, w: 486.5, h: 283.7},
  {name: 'truck', color: CLASS_TRUCK, x: 0, y: 48.2, w: 259, h: 211.5},
  {name: 'truck', color: CLASS_TRUCK, x: 545, y: 55.7, w: 88.8, h: 68.1},
  {name: 'truck', color: CLASS_TRUCK, x: 192.6, y: 56.9, w: 29.8, h: 34.5},
  {name: 'truck', color: CLASS_TRUCK, x: 231.4, y: 58.7, w: 42.1, h: 29.9},
  {name: 'person', color: CLASS_PERSON, x: 1.7, y: 59.5, w: 41.5, h: 44.1},
];

/** Pin anchors in image coordinates: the open one sits on the unlabeled man
 * behind the windshield, the resolved one on the truck cropped by the frame. */
const PIN_OPEN = {x: 421, y: 101};
const PIN_RESOLVED = {x: 55, y: 150};

const asPercent = (pin: {x: number; y: number}) => ({
  left: `${(pin.x / IMG_W) * 100}%`,
  top: `${(pin.y / IMG_H) * 100}%`,
});

/** Labeled frame with one open pin and one resolved pin. */
function PinnedCanvas() {
  return (
    <div className="relative h-full min-h-56 overflow-hidden bg-neutral-950">
      <div className="relative aspect-[640/400] w-full">
        <img
          src={IMAGE_URL}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
        <svg
          viewBox={`0 0 ${IMG_W} ${IMG_H}`}
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {BOXES.map((box, i) => {
            const tagH = 15;
            const tagY = box.y - tagH - 2;
            return (
              <g key={i}>
                <rect
                  x={box.x}
                  y={box.y}
                  width={box.w}
                  height={box.h}
                  fill={box.color}
                  fillOpacity={0.12}
                  stroke={box.color}
                  strokeWidth={2}
                />
                <rect
                  x={box.x}
                  y={tagY}
                  width={box.name.length * 5.6 + 8}
                  height={tagH}
                  rx={2}
                  fill={box.color}
                  opacity={0.85}
                />
                <text
                  x={box.x + 4}
                  y={tagY + tagH - 4}
                  fontSize={11}
                  fill="#ffffff"
                  fontFamily="ui-sans-serif, system-ui"
                >
                  {box.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* open pin (#1, amber) — on the unlabeled person */}
        <span
          className="absolute flex h-6 min-w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-0.5 rounded-full border-2 border-white bg-amber-500 px-1 text-[11px] font-semibold text-white shadow-md ring-2 ring-primary"
          style={asPercent(PIN_OPEN)}
        >
          <MessageSquare className="size-3" />1
        </span>
        {/* resolved pin (green check) */}
        <span
          className="absolute flex h-6 min-w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-emerald-500 px-1 text-white shadow-md"
          style={asPercent(PIN_RESOLVED)}
        >
          <Check className="size-3" />
        </span>
      </div>
    </div>
  );
}

export function MockIssuePanel() {
  const {t} = useLanguage();
  const m = t.mocks.issues;

  return (
    <MockPanelFrame className="@container">
      <div className="flex flex-col @2xl:flex-row">
        <div className="min-w-0 flex-1">
          <PinnedCanvas />
        </div>

        {/* issues tab */}
        <aside className="flex w-full shrink-0 flex-col border-t border-border bg-card @2xl:w-72 @2xl:border-t-0 @2xl:border-l">
          <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
            <span className="text-[11px] text-muted-foreground">{m.headerOpen}</span>
            <span className="flex gap-0.5 text-[10px]">
              <span className="rounded px-1.5 py-0.5 text-muted-foreground">
                {m.filterAll}
              </span>
              <span className="rounded bg-primary px-1.5 py-0.5 text-primary-foreground">
                {m.filterOpen}
              </span>
              <span className="rounded px-1.5 py-0.5 text-muted-foreground">
                {m.filterResolved}
              </span>
            </span>
          </div>

          {/* expanded issue row */}
          <div className="bg-accent/30 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-semibold text-white">
                1
              </span>
              <span className="text-[11px] font-medium">{m.reviewer}</span>
              <span className="text-[10px] text-muted-foreground">{m.openAgo}</span>
              <ChevronDown className="ml-auto size-3.5 rotate-180 text-muted-foreground" />
            </div>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
              <MessageSquare className="size-2.5" />
              {m.commentCount}
            </div>

            {/* thread */}
            <div className="mt-2 space-y-2 rounded-md border border-border bg-background p-2">
              <div>
                <span className="text-[10px] font-medium">{m.reviewer}</span>
                <span className="ml-1.5 text-[9px] text-muted-foreground">
                  {m.openAgo}
                </span>
                <p className="mt-0.5 text-[11px] leading-snug">{m.comment1}</p>
              </div>
              <div>
                <span className="text-[10px] font-medium">{m.me}</span>
                <span className="ml-1.5 text-[9px] text-muted-foreground">
                  {m.openAgo}
                </span>
                <p className="mt-0.5 text-[11px] leading-snug">{m.comment2}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="min-h-7 flex-1 rounded border border-border px-2 py-1.5 text-[10px] text-muted-foreground">
                  {m.replyPlaceholder}
                </span>
                <span className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
                  <Send className="size-3" />
                </span>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <span className="flex h-7 flex-1 items-center justify-center rounded-md bg-primary text-[11px] font-medium text-primary-foreground">
                {m.resolve}
              </span>
            </div>
          </div>

          {/* resolved issue row (collapsed) */}
          <div className="border-t border-border px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-white">
                <Check className="size-3" />
              </span>
              <span className="text-[11px] font-medium">{m.labeler}</span>
              <span className="text-[10px] text-muted-foreground">{m.resolvedAgo}</span>
              <ChevronDown className="ml-auto size-3.5 text-muted-foreground" />
            </div>
          </div>
        </aside>
      </div>
    </MockPanelFrame>
  );
}
