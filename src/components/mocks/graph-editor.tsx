import {ArrowLeft, Play, Save, Search, Square} from 'lucide-react';
import type {CSSProperties, ReactNode} from 'react';

import {MockChrome, MockWindow} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/** Category / port colors from the app's graph schema. */
const CAT = {
  events: '#B33030',
  flow: '#6B7280',
  math: '#3B7A3B',
  cvp: '#0EA5E9',
} as const;
const PORT = {
  image: '#EC4899',
  model: '#10B981',
  annotation: '#F97316',
} as const;
const EXEC_RUNNING = '#FACC15';

function ExecPin() {
  return (
    <span
      className="inline-block border-y-4 border-l-6 border-y-transparent"
      style={{borderLeftColor: 'var(--foreground)'}}
    />
  );
}

function DataPin({color}: {color: string}) {
  return (
    <span
      className="inline-block size-2.5 rounded-full border-2"
      style={{borderColor: color}}
    />
  );
}

function PortRow({left, right}: {left?: ReactNode; right?: ReactNode}) {
  return (
    <div className="flex min-h-5 items-center justify-between gap-3 px-2 text-[9px] text-muted-foreground">
      <span className="flex items-center gap-1">{left}</span>
      <span className="flex items-center gap-1">{right}</span>
    </div>
  );
}

function BlueprintNode({
  style,
  title,
  color,
  executing = false,
  children,
}: {
  style: CSSProperties;
  title: string;
  color: string;
  executing?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'absolute w-36 overflow-hidden rounded-lg border bg-card',
        executing && 'ring-2',
      )}
      style={{
        ...style,
        borderColor: 'var(--border)',
        ...(executing
          ? {boxShadow: `0 0 0 2px ${EXEC_RUNNING}e6, 0 0 18px ${EXEC_RUNNING}73`}
          : undefined),
      }}
    >
      <div
        className="px-2 py-1 text-[10px] font-semibold text-white"
        style={{backgroundColor: color}}
      >
        {title}
      </div>
      <div className="py-1">{children}</div>
    </div>
  );
}

function EventNode({style, title}: {style: CSSProperties; title: string}) {
  return (
    <div
      className="absolute w-32 overflow-hidden rounded-xl border"
      style={{
        ...style,
        borderColor: 'var(--border)',
        boxShadow: '0 4px 12px rgba(179,48,48,0.25)',
      }}
    >
      <div
        className="px-2 py-1 text-[10px] font-semibold text-white"
        style={{background: 'linear-gradient(90deg, #B33030 0%, #B33030CC)'}}
      >
        ▶ {title}
      </div>
      <div className="bg-card py-1">
        <PortRow
          right={
            <>
              exec <ExecPin />
            </>
          }
        />
      </div>
    </div>
  );
}

function PaletteGroup({
  label,
  color,
  items,
}: {
  label: string;
  color: string;
  items: string[];
}) {
  return (
    <div className="px-2 pt-2">
      <p className="flex items-center justify-between px-1 text-[9px] font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
        <span>{items.length}</span>
      </p>
      <ul className="mt-0.5 space-y-px">
        {items.map(item => (
          <li
            key={item}
            className="flex items-center gap-1.5 rounded px-1 py-0.5 text-[10px]"
          >
            <span className="size-2 rounded-sm" style={{backgroundColor: color}} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MockGraphEditor() {
  const {t} = useLanguage();
  const m = t.mocks.graphEditor;

  return (
    <MockWindow>
      <MockChrome />
      {/* editor header */}
      <div className="flex h-10 items-center gap-2 border-b border-border bg-background px-3 text-xs">
        <ArrowLeft className="size-3.5 text-muted-foreground" />
        <span className="font-mono text-[11px] font-medium">{m.graphName}</span>
        <span className="ml-2 flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-1 text-[10px] font-medium text-white">
          <Play className="size-3" />
          {m.run}
        </span>
        <span className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[10px] text-muted-foreground">
          <Square className="size-3" />
          {m.stop}
        </span>
        <span className="ml-auto text-[10px] text-muted-foreground">{m.autosaved}</span>
        <span className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[10px] text-muted-foreground">
          <Save className="size-3" />
          {m.save}
        </span>
      </div>

      <div className="flex h-[24rem] sm:h-[26rem]">
        {/* node palette */}
        <aside className="hidden w-40 shrink-0 flex-col border-r border-border bg-card md:flex">
          <div className="p-2">
            <span className="flex h-7 items-center gap-1.5 rounded-md border border-border bg-background px-2 text-[10px] text-muted-foreground">
              <Search className="size-3" />
              {m.searchPlaceholder}
            </span>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden pb-2">
            <PaletteGroup
              label={m.catEvents}
              color={CAT.events}
              items={[m.nodeStart]}
            />
            <PaletteGroup
              label={m.catFlow}
              color={CAT.flow}
              items={[m.nodeBranch, m.nodeForLoop]}
            />
            <PaletteGroup
              label={m.catMath}
              color={CAT.math}
              items={[m.nodeAdd, m.nodeClamp]}
            />
            <PaletteGroup
              label={m.catCvp}
              color={CAT.cvp}
              items={[m.nodeLoadImage, m.nodeRunModel, m.nodeSaveAnn]}
            />
          </div>
        </aside>

        {/* canvas + log */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div
            className="relative min-h-0 flex-1 overflow-hidden bg-background"
            style={{
              backgroundImage:
                'radial-gradient(circle, var(--border) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          >
            {/* edges */}
            <svg className="absolute inset-0 h-full w-full">
              {/* exec: start → load image */}
              <path
                d="M 122 52 C 150 52, 150 46, 178 46"
                fill="none"
                style={{stroke: 'var(--foreground)'}}
                strokeWidth={2.5}
                opacity={0.8}
              />
              {/* exec (running): load image → run model */}
              <path
                d="M 322 46 C 350 46, 340 120, 368 120"
                fill="none"
                stroke={EXEC_RUNNING}
                strokeWidth={2.5}
              />
              <circle r={3} fill={EXEC_RUNNING}>
                <animateMotion
                  dur="1.2s"
                  repeatCount="indefinite"
                  path="M 322 46 C 350 46, 340 120, 368 120"
                />
              </circle>
              {/* exec: run model → save annotations */}
              <path
                d="M 512 120 C 540 120, 530 60, 558 60"
                fill="none"
                style={{stroke: 'var(--foreground)'}}
                strokeWidth={2.5}
                opacity={0.8}
              />
              {/* data: image → run model */}
              <path
                d="M 322 66 C 352 66, 338 140, 368 140"
                fill="none"
                stroke={PORT.image}
                strokeWidth={1.5}
              />
              {/* data: annotations → save */}
              <path
                d="M 512 140 C 542 140, 528 80, 558 80"
                fill="none"
                stroke={PORT.annotation}
                strokeWidth={1.5}
              />
            </svg>

            <EventNode style={{left: 8, top: 30}} title={m.nodeStart} />

            <BlueprintNode
              style={{left: 180, top: 24}}
              title={m.nodeLoadImage}
              color={CAT.cvp}
            >
              <PortRow
                left={
                  <>
                    <ExecPin /> exec
                  </>
                }
                right={
                  <>
                    exec <ExecPin />
                  </>
                }
              />
              <PortRow
                right={
                  <>
                    {m.portImage} <DataPin color={PORT.image} />
                  </>
                }
              />
            </BlueprintNode>

            <BlueprintNode
              style={{left: 370, top: 98}}
              title={m.nodeRunModel}
              color={CAT.cvp}
              executing
            >
              <PortRow
                left={
                  <>
                    <ExecPin /> exec
                  </>
                }
                right={
                  <>
                    exec <ExecPin />
                  </>
                }
              />
              <PortRow
                left={
                  <>
                    <DataPin color={PORT.image} /> {m.portImage}
                  </>
                }
                right={
                  <>
                    {m.portAnnotations} <DataPin color={PORT.annotation} />
                  </>
                }
              />
              <PortRow
                left={
                  <>
                    <DataPin color={PORT.model} /> yolov8n
                  </>
                }
              />
            </BlueprintNode>

            <BlueprintNode
              style={{left: 560, top: 38}}
              title={m.nodeSaveAnn}
              color={CAT.cvp}
            >
              <PortRow
                left={
                  <>
                    <ExecPin /> exec
                  </>
                }
                right={
                  <>
                    exec <ExecPin />
                  </>
                }
              />
              <PortRow
                left={
                  <>
                    <DataPin color={PORT.annotation} /> {m.portAnnotations}
                  </>
                }
              />
            </BlueprintNode>
          </div>

          {/* execution log */}
          <div className="border-t border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-3 py-1 text-[10px]">
              <span className="font-semibold">{m.logTitle}</span>
              <span className="text-amber-500">{m.logRunning}</span>
              <span className="ml-auto text-muted-foreground">{m.logClear}</span>
            </div>
            <div className="space-y-0.5 px-3 py-1.5 font-mono text-[9px]">
              <p className="text-emerald-600 dark:text-emerald-400">
                <span className="text-muted-foreground">10:32:01</span> {m.log1}
              </p>
              <p className="text-emerald-600 dark:text-emerald-400">
                <span className="text-muted-foreground">10:32:02</span> {m.log2}
              </p>
              <p className="text-emerald-600 dark:text-emerald-400">
                <span className="text-muted-foreground">10:32:02</span> {m.log3}
              </p>
            </div>
          </div>
        </div>

        {/* inspector */}
        <aside className="hidden w-40 shrink-0 flex-col border-l border-border bg-card lg:flex">
          <div className="border-b border-border px-3 py-2 text-[11px] font-semibold">
            {m.inspector}
          </div>
          <div className="space-y-2.5 p-3">
            <div>
              <p className="text-[9px] tracking-wider text-muted-foreground uppercase">
                {m.fieldLabel}
              </p>
              <span className="mt-0.5 flex h-6 items-center rounded border border-border bg-background px-1.5 text-[10px]">
                {m.nodeRunModel}
              </span>
            </div>
            <div>
              <p className="text-[9px] tracking-wider text-muted-foreground uppercase">
                {m.fieldKind}
              </p>
              <p className="font-mono text-[10px]">cvp_run_model</p>
            </div>
            <div>
              <p className="text-[9px] tracking-wider text-muted-foreground uppercase">
                {m.fieldCategory}
              </p>
              <p className="text-[10px]">{m.catCvp}</p>
            </div>
            <div>
              <p className="text-[9px] tracking-wider text-muted-foreground uppercase">
                {m.fieldInputs}
              </p>
              <p className="flex items-center gap-1.5 text-[10px]">
                <DataPin color={PORT.model} />
                {m.portModel}: <span className="font-mono">yolov8n</span>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </MockWindow>
  );
}
