import {ArrowLeft, MoreHorizontal, RefreshCw, Scaling, Trash2} from 'lucide-react';
import type {ReactNode} from 'react';

import {MockPanelFrame} from '@/components/mocks/panel-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

function SolidBadge({className, children}: {className: string; children: ReactNode}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium text-white',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function MockClusterControl() {
  const {t} = useLanguage();
  const m = t.mocks.clusters;

  const pods = [
    {
      name: 'vision-inference-7d9f8-abc12',
      ns: 'production',
      status: 'Running',
      tone: 'bg-emerald-500',
      ready: '1/1',
      restarts: '0',
      node: 'gpu-node-01',
    },
    {
      name: 'train-worker-5c4b2-xk93f',
      ns: 'production',
      status: 'Pending',
      tone: 'bg-amber-500',
      ready: '0/1',
      restarts: '0',
      node: 'gpu-node-02',
    },
  ];

  return (
    <MockPanelFrame>
      {/* header */}
      <div className="border-b border-border px-4 pt-3 pb-0">
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <ArrowLeft className="size-3" />
          {m.back}
        </span>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-base font-semibold tracking-tight">prod-seoul</span>
          <SolidBadge className="bg-emerald-500">{m.connected}</SolidBadge>
          <span className="ml-auto flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[10px] text-muted-foreground">
            <RefreshCw className="size-3" />
            {m.refresh}
          </span>
        </div>
        <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
          https://k8s.prod.io:6443
        </p>

        {/* tabs */}
        <div className="mt-2 flex gap-3 text-[11px]">
          {m.tabs.map((tab, i) => (
            <span
              key={tab}
              className={cn(
                '-mb-px border-b-2 pb-2',
                i === 3
                  ? 'border-primary font-medium'
                  : 'border-transparent text-muted-foreground',
              )}
            >
              {tab}
            </span>
          ))}
          <span className="mb-1.5 ml-auto flex h-6 items-center rounded-md border border-border bg-background px-2 text-[10px] text-muted-foreground">
            production ▾
          </span>
        </div>
      </div>

      <div className="space-y-3 px-4 py-3">
        {/* deployments */}
        <div>
          <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
            {m.deployTitle}
          </p>
          <div className="mt-1.5 grid grid-cols-[1.6fr_5rem_4rem_3.5rem] items-center gap-2 border-b border-border pb-1.5 text-[10px] text-muted-foreground">
            <span>{m.colName}</span>
            <span>{m.colNamespace}</span>
            <span>{m.colReplicas}</span>
            <span />
          </div>
          <div className="grid grid-cols-[1.6fr_5rem_4rem_3.5rem] items-center gap-2 py-1.5 text-[11px]">
            <span className="truncate font-medium">vision-inference</span>
            <span className="text-[10px] text-muted-foreground">production</span>
            <span className="font-mono text-[10px] tabular-nums">3/3</span>
            <span className="flex items-center gap-1 justify-self-end rounded border border-border px-1.5 py-0.5 text-[9px] text-muted-foreground">
              <Scaling className="size-2.5" />
              {m.scale}
            </span>
          </div>
        </div>

        {/* pods */}
        <div>
          <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
            {m.podTitle}
          </p>
          <div className="mt-1.5 grid grid-cols-[1.9fr_4.5rem_3rem_3rem_5rem_1.5rem] items-center gap-2 border-b border-border pb-1.5 text-[10px] text-muted-foreground">
            <span>{m.colName}</span>
            <span>{m.colStatus}</span>
            <span>{m.colReady}</span>
            <span>{m.colRestarts}</span>
            <span>{m.colNode}</span>
            <span />
          </div>
          {pods.map(pod => (
            <div
              key={pod.name}
              className="grid grid-cols-[1.9fr_4.5rem_3rem_3rem_5rem_1.5rem] items-center gap-2 border-b border-border/40 py-1.5 text-[11px] last:border-b-0"
            >
              <span className="truncate font-mono text-[10px]">{pod.name}</span>
              <span>
                <SolidBadge className={pod.tone}>{pod.status}</SolidBadge>
              </span>
              <span className="font-mono text-[10px] tabular-nums">{pod.ready}</span>
              <span className="font-mono text-[10px] tabular-nums">{pod.restarts}</span>
              <span className="truncate text-[10px] text-muted-foreground">
                {pod.node}
              </span>
              {pod.status === 'Running' ? (
                <Trash2 className="size-3 text-muted-foreground" />
              ) : (
                <MoreHorizontal className="size-3 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </div>
    </MockPanelFrame>
  );
}
