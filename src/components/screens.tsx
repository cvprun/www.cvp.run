/* eslint-disable react-refresh/only-export-components -- SCREENS registry co-located with screen components */
import {
  ArrowRight,
  Barcode,
  Binary,
  Bot,
  Boxes,
  Crop,
  Database,
  Factory,
  FileText,
  FlaskConical,
  Grid3x3,
  Hash,
  KeyRound,
  LayoutGrid,
  Maximize2,
  Palette,
  QrCode,
  ScanLine,
  Shapes,
  SlidersHorizontal,
  Video,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

import {NAV_ICONS, ScreenHeader} from '@/components/app-frame';
import {useLanguage} from '@/lib/i18n';
import type {ScreenKey} from '@/lib/catalog';
import type {Language} from '@/lib/translations';
import {cn} from '@/lib/utils';

/** Which sidebar nav index titles each screen (aligns with showcase.nav). */
const SCREEN_NAV_INDEX: Record<ScreenKey, number> = {
  dashboard: 0,
  graphs: 4,
  surveillance: 5,
  vision: 7,
  datasets: 3,
  mlflow: 8,
  agents: 2,
  manufacturing: 6,
  apps: 7,
};

const SCREEN_T = {
  ko: {
    run: '실행',
    status: '상태',
    accuracy: '정확도',
    loss: '손실',
    duration: '소요',
    host: '호스트',
    version: '버전',
    lastSeen: '최근 접속',
    order: '작업지시',
    product: '품목',
    qty: '수량',
    due: '마감',
    classes: '클래스',
    images: '개',
    running: '실행 중',
    done: '완료',
    failed: '실패',
    queued: '대기',
    inProgress: '진행 중',
    planned: '예정',
    fit: '맞춤',
    selected: '개 선택됨',
    rec: '녹화',
  },
  en: {
    run: 'Run',
    status: 'Status',
    accuracy: 'Accuracy',
    loss: 'Loss',
    duration: 'Duration',
    host: 'Host',
    version: 'Version',
    lastSeen: 'Last seen',
    order: 'Order',
    product: 'Product',
    qty: 'Qty',
    due: 'Due',
    classes: 'Classes',
    images: '',
    running: 'Running',
    done: 'Done',
    failed: 'Failed',
    queued: 'Queued',
    inProgress: 'In progress',
    planned: 'Planned',
    fit: 'Fit',
    selected: ' selected',
    rec: 'REC',
  },
} as const;

const GRADIENTS = [
  'from-brand-violet/30 to-brand-pink/20',
  'from-brand-blue/30 to-brand-cyan/20',
  'from-amber-400/30 to-red-400/20',
  'from-emerald-400/30 to-brand-cyan/20',
  'from-brand-pink/30 to-amber-400/20',
  'from-brand-cyan/30 to-brand-blue/20',
];

function useScreen() {
  const {t, lang} = useLanguage();
  return {t, lang, sc: SCREEN_T[lang as Language]};
}

function ghostButton(label: string, icon?: LucideIcon) {
  const Icon = icon;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground">
      {Icon && <Icon className="size-3.5" />}
      {label}
    </span>
  );
}

function Header({screen}: {screen: ScreenKey}) {
  const {t} = useLanguage();
  const idx = SCREEN_NAV_INDEX[screen];
  return (
    <ScreenHeader icon={NAV_ICONS[idx]} title={t.showcase.nav[idx]} />
  );
}

/* -------------------------------------------------------------------------- */
/* Dashboard                                                                   */
/* -------------------------------------------------------------------------- */

type AgentStatus = 'online' | 'idle' | 'offline';
const STATUS_DOT: Record<AgentStatus, string> = {
  online: 'bg-brand-cyan',
  idle: 'bg-amber-400',
  offline: 'bg-muted-foreground/40',
};

function ago(lang: Language, n: number, unit: 'm' | 'h' | 'd') {
  if (lang === 'ko') {
    const u = unit === 'm' ? '분' : unit === 'h' ? '시간' : '일';
    return `${n}${u} 전`;
  }
  return `${n}${unit} ago`;
}

function DashboardScreen() {
  const {t, lang} = useLanguage();
  const s = t.showcase;
  const stats = [
    {icon: Bot, label: s.statAgents, value: '12', delta: '+3'},
    {icon: FileText, label: s.statFiles, value: '248', delta: '+24'},
    {icon: Database, label: s.statDatasets, value: '7', delta: '+1'},
  ];
  const agents: {name: string; status: AgentStatus; n: number; unit: 'm' | 'h'}[] = [
    {name: 'edge-cam-01', status: 'online', n: 2, unit: 'm'},
    {name: 'line-a-vision', status: 'idle', n: 18, unit: 'm'},
    {name: 'qa-inspector', status: 'online', n: 1, unit: 'h'},
    {name: 'gate-rtsp-07', status: 'offline', n: 3, unit: 'h'},
  ];
  const files: {name: string; size: string; n: number; unit: 'm' | 'h' | 'd'}[] = [
    {name: 'calibration_2026.json', size: '4.2 KB', n: 5, unit: 'm'},
    {name: 'line-a-batch.mp4', size: '182 MB', n: 40, unit: 'm'},
    {name: 'defects_dataset.zip', size: '1.3 GB', n: 2, unit: 'h'},
    {name: 'report_q2.pdf', size: '820 KB', n: 1, unit: 'd'},
  ];
  const statusLabel: Record<AgentStatus, string> = {
    online: s.statusOnline,
    idle: s.statusIdle,
    offline: s.statusOffline,
  };

  return (
    <>
      <ScreenHeader
        icon={NAV_ICONS[0]}
        title={s.dashTitle}
        description={s.dashDescription}
        actions={
          <>
            {ghostButton(s.preset)}
            {ghostButton(s.edit)}
          </>
        }
      />
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(stat => (
          <div key={stat.label} className="rounded-md border border-border bg-background/40 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <stat.icon className="size-4" />
              {stat.label}
            </div>
            <div className="mt-3 text-3xl font-bold tracking-tight">{stat.value}</div>
            <div className="mt-1 text-xs text-brand-cyan">
              {stat.delta} {s.deltaWeek}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-md border border-border bg-background/40">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <Bot className="size-4 text-muted-foreground" />
            <span className="text-sm font-semibold">{s.recentAgents}</span>
          </div>
          <ul className="divide-y divide-border">
            {agents.map(row => (
              <li key={row.name} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <span className="flex min-w-0 items-center gap-2">
                  <span className={cn('size-1.5 shrink-0 rounded-full', STATUS_DOT[row.status])} />
                  <span className="truncate font-mono text-xs">{row.name}</span>
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="text-[11px] text-muted-foreground">{statusLabel[row.status]}</span>
                  <span className="text-[11px] text-muted-foreground/70">{ago(lang, row.n, row.unit)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-md border border-border bg-background/40">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <FileText className="size-4 text-muted-foreground" />
            <span className="text-sm font-semibold">{s.recentFiles}</span>
          </div>
          <ul className="divide-y divide-border">
            {files.map(row => (
              <li key={row.name} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <span className="flex min-w-0 items-center gap-2">
                  <FileText className="size-3.5 shrink-0 text-muted-foreground/70" />
                  <span className="truncate font-mono text-xs">{row.name}</span>
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="text-[11px] text-muted-foreground">{row.size}</span>
                  <span className="text-[11px] text-muted-foreground/70">{ago(lang, row.n, row.unit)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Graphs — node editor                                                        */
/* -------------------------------------------------------------------------- */

function GraphNode({title, sub, accent}: {title: string; sub: string; accent: string}) {
  return (
    <div className="w-36 shrink-0 rounded-md border border-border bg-background shadow-sm">
      <div className="flex items-center gap-1.5 border-b border-border px-2.5 py-1.5">
        <span className={cn('size-2 rounded-full', accent)} />
        <span className="truncate text-[11px] font-semibold">{title}</span>
      </div>
      <div className="px-2.5 py-2 text-[10px] text-muted-foreground">{sub}</div>
    </div>
  );
}

function Connector() {
  return <ArrowRight className="size-4 shrink-0 self-center text-muted-foreground/50" />;
}

function GraphsScreen() {
  const {sc} = useScreen();
  return (
    <>
      <Header screen="graphs" />
      <div
        className="mt-6 overflow-x-auto rounded-md border border-border p-6"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          color: 'color-mix(in oklab, var(--muted-foreground) 22%, transparent)',
        }}
      >
        <div className="flex items-center gap-2 text-foreground">
          <GraphNode title="RTSP Source" sub="1920×1080 · 30fps" accent="bg-brand-blue" />
          <Connector />
          <GraphNode title="Undistort" sub="cameraMatrix" accent="bg-brand-cyan" />
          <Connector />
          <GraphNode title="Edge Detect" sub="Canny 50/150" accent="bg-brand-violet" />
          <Connector />
          <GraphNode title="Find Blobs" sub="minArea 120" accent="bg-brand-pink" />
          <Connector />
          <GraphNode title="Overlay Out" sub="WebRTC" accent="bg-emerald-400" />
        </div>
        <div className="mt-6 ml-[8.5rem] flex items-center gap-2 text-foreground">
          <GraphNode title="Histogram" sub="256 bins" accent="bg-amber-400" />
          <Connector />
          <GraphNode title="CSV Export" sub="s3://metrics" accent="bg-muted-foreground" />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-2">
        {ghostButton('100%', SlidersHorizontal)}
        {ghostButton(sc.fit, Maximize2)}
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Surveillance — camera grid                                                  */
/* -------------------------------------------------------------------------- */

function SurveillanceScreen() {
  const {sc} = useScreen();
  const cams = [
    'Gate · North',
    'Line A · Inlet',
    'Line A · QA',
    'Warehouse · 3F',
    'Dock · East',
    'Parking · B1',
  ];
  return (
    <>
      <Header screen="surveillance" />
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cams.map((name, i) => (
          <div key={name} className="overflow-hidden rounded-md border border-border">
            <div
              className={cn(
                'relative flex h-28 items-center justify-center bg-gradient-to-br',
                GRADIENTS[i % GRADIENTS.length],
              )}
            >
              <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded bg-black/55 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                <span className="size-1.5 animate-pulse rounded-full bg-red-500" />
                {sc.rec}
              </span>
              <Video className="size-7 text-white/70" />
            </div>
            <div className="flex items-center justify-between px-2.5 py-2">
              <span className="truncate text-xs font-medium">{name}</span>
              <span className="font-mono text-[10px] text-muted-foreground">cam-{(i + 1).toString().padStart(2, '0')}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Vision — toolkit grid                                                        */
/* -------------------------------------------------------------------------- */

function VisionScreen() {
  const tools: {icon: LucideIcon; name: string}[] = [
    {icon: Grid3x3, name: 'Calibrate'},
    {icon: Crop, name: 'Undistort'},
    {icon: ScanLine, name: 'Edge Detect'},
    {icon: Shapes, name: 'Find Blobs'},
    {icon: Barcode, name: 'Barcode'},
    {icon: SlidersHorizontal, name: 'Histogram'},
    {icon: Shapes, name: 'Contours'},
    {icon: SlidersHorizontal, name: 'Threshold'},
    {icon: Palette, name: 'Color Space'},
    {icon: Boxes, name: 'Morphology'},
    {icon: Crop, name: 'Template Match'},
    {icon: Boxes, name: '3D Model'},
  ];
  return (
    <>
      <Header screen="vision" />
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {tools.map(tool => (
          <div
            key={tool.name}
            className="flex flex-col gap-2 rounded-md border border-border bg-background/40 p-3"
          >
            <span className="flex size-9 items-center justify-center rounded-md border border-border bg-background text-foreground/80">
              <tool.icon className="size-4" />
            </span>
            <span className="text-xs font-medium">{tool.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Datasets — labeled image grid                                                */
/* -------------------------------------------------------------------------- */

function DatasetsScreen() {
  const {sc} = useScreen();
  const classes = [
    {name: 'ok', count: 1840},
    {name: 'scratch', count: 312},
    {name: 'dent', count: 156},
    {name: 'crack', count: 88},
  ];
  const tiles = ['ok', 'scratch', 'ok', 'dent', 'crack', 'ok', 'scratch', 'ok'];
  return (
    <>
      <Header screen="datasets" />
      <div className="mt-6 flex flex-col gap-4 lg:flex-row">
        <div className="shrink-0 rounded-md border border-border bg-background/40 p-3 lg:w-44">
          <p className="px-1 pb-2 text-[10px] font-semibold tracking-wider text-muted-foreground/70 uppercase">
            {sc.classes}
          </p>
          <ul className="space-y-0.5">
            {classes.map((c, i) => (
              <li
                key={c.name}
                className={cn(
                  'flex items-center justify-between rounded px-2 py-1.5 text-xs',
                  i === 1 ? 'bg-accent font-medium' : 'text-muted-foreground',
                )}
              >
                <span className="flex items-center gap-1.5">
                  <span className={cn('size-2 rounded-sm', GRADIENTS[i % GRADIENTS.length], 'bg-gradient-to-br')} />
                  {c.name}
                </span>
                <span className="font-mono text-[10px]">{c.count}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {tiles.map((label, i) => (
            <div key={i} className="overflow-hidden rounded-md border border-border">
              <div className={cn('flex h-20 items-center justify-center bg-gradient-to-br', GRADIENTS[i % GRADIENTS.length])} />
              <div className="px-2 py-1.5">
                <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* MLflow — experiments table                                                   */
/* -------------------------------------------------------------------------- */

type RunStatus = 'done' | 'running' | 'failed';

function MlflowScreen() {
  const {sc} = useScreen();
  const statusLabel: Record<RunStatus, string> = {
    done: sc.done,
    running: sc.running,
    failed: sc.failed,
  };
  const statusClass: Record<RunStatus, string> = {
    done: 'bg-emerald-400/15 text-emerald-500',
    running: 'bg-brand-cyan/15 text-brand-cyan',
    failed: 'bg-red-400/15 text-red-500',
  };
  const runs: {name: string; status: RunStatus; acc: string; loss: string; dur: string}[] = [
    {name: 'defect-net v14', status: 'done', acc: '98.7%', loss: '0.041', dur: '12m'},
    {name: 'defect-net v13', status: 'done', acc: '98.1%', loss: '0.052', dur: '11m'},
    {name: 'edge-yolo v3', status: 'running', acc: '—', loss: '0.118', dur: '4m'},
    {name: 'ocr-crnn v8', status: 'failed', acc: '—', loss: '—', dur: '1m'},
    {name: 'seg-unet v6', status: 'done', acc: '95.4%', loss: '0.087', dur: '23m'},
  ];
  return (
    <>
      <Header screen="mlflow" />
      <div className="mt-6 overflow-x-auto rounded-md border border-border bg-background/40">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border text-[11px] text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 font-medium">{sc.run}</th>
              <th className="px-4 py-2.5 font-medium">{sc.status}</th>
              <th className="px-4 py-2.5 font-medium">{sc.accuracy}</th>
              <th className="px-4 py-2.5 font-medium">{sc.loss}</th>
              <th className="px-4 py-2.5 font-medium">{sc.duration}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {runs.map(run => (
              <tr key={run.name}>
                <td className="px-4 py-2.5 font-mono">{run.name}</td>
                <td className="px-4 py-2.5">
                  <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-medium', statusClass[run.status])}>
                    {statusLabel[run.status]}
                  </span>
                </td>
                <td className="px-4 py-2.5 font-mono">{run.acc}</td>
                <td className="px-4 py-2.5 font-mono">{run.loss}</td>
                <td className="px-4 py-2.5 font-mono text-muted-foreground">{run.dur}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Agents — node table                                                          */
/* -------------------------------------------------------------------------- */

function AgentsScreen() {
  const {t, sc} = useScreen();
  const statusLabel: Record<AgentStatus, string> = {
    online: t.showcase.statusOnline,
    idle: t.showcase.statusIdle,
    offline: t.showcase.statusOffline,
  };
  const rows: {name: string; status: AgentStatus; host: string; ver: string; seen: string}[] = [
    {name: 'edge-cam-01', status: 'online', host: '10.0.4.21', ver: 'v1.8.2', seen: 'now'},
    {name: 'line-a-vision', status: 'idle', host: '10.0.4.22', ver: 'v1.8.2', seen: '18m'},
    {name: 'qa-inspector', status: 'online', host: '10.0.4.30', ver: 'v1.8.1', seen: 'now'},
    {name: 'gate-rtsp-07', status: 'offline', host: '10.0.5.7', ver: 'v1.7.9', seen: '3h'},
  ];
  return (
    <>
      <Header screen="agents" />
      <div className="mt-6 overflow-x-auto rounded-md border border-border bg-background/40">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border text-[11px] text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 font-medium">Agent</th>
              <th className="px-4 py-2.5 font-medium">{sc.status}</th>
              <th className="px-4 py-2.5 font-medium">{sc.host}</th>
              <th className="px-4 py-2.5 font-medium">{sc.version}</th>
              <th className="px-4 py-2.5 font-medium">{sc.lastSeen}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map(row => (
              <tr key={row.name}>
                <td className="px-4 py-2.5 font-mono">{row.name}</td>
                <td className="px-4 py-2.5">
                  <span className="inline-flex items-center gap-1.5">
                    <span className={cn('size-1.5 rounded-full', STATUS_DOT[row.status])} />
                    {statusLabel[row.status]}
                  </span>
                </td>
                <td className="px-4 py-2.5 font-mono text-muted-foreground">{row.host}</td>
                <td className="px-4 py-2.5 font-mono text-muted-foreground">{row.ver}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{row.seen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Manufacturing — work orders                                                  */
/* -------------------------------------------------------------------------- */

type WoStatus = 'done' | 'inProgress' | 'planned';

function ManufacturingScreen() {
  const {sc} = useScreen();
  const statusLabel: Record<WoStatus, string> = {
    done: sc.done,
    inProgress: sc.inProgress,
    planned: sc.planned,
  };
  const statusClass: Record<WoStatus, string> = {
    done: 'bg-emerald-400/15 text-emerald-500',
    inProgress: 'bg-brand-cyan/15 text-brand-cyan',
    planned: 'bg-muted text-muted-foreground',
  };
  const rows: {id: string; product: string; qty: number; status: WoStatus; due: string}[] = [
    {id: 'WO-2041', product: 'Bracket A12', qty: 1200, status: 'inProgress', due: '06-24'},
    {id: 'WO-2040', product: 'Housing C7', qty: 640, status: 'done', due: '06-22'},
    {id: 'WO-2039', product: 'Gear M3', qty: 320, status: 'done', due: '06-22'},
    {id: 'WO-2042', product: 'Panel X9', qty: 850, status: 'planned', due: '06-26'},
  ];
  return (
    <>
      <Header screen="manufacturing" />
      <div className="mt-6 overflow-x-auto rounded-md border border-border bg-background/40">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border text-[11px] text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 font-medium">{sc.order}</th>
              <th className="px-4 py-2.5 font-medium">{sc.product}</th>
              <th className="px-4 py-2.5 font-medium">{sc.qty}</th>
              <th className="px-4 py-2.5 font-medium">{sc.status}</th>
              <th className="px-4 py-2.5 font-medium">{sc.due}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map(row => (
              <tr key={row.id}>
                <td className="px-4 py-2.5 font-mono">{row.id}</td>
                <td className="px-4 py-2.5">{row.product}</td>
                <td className="px-4 py-2.5 font-mono">{row.qty.toLocaleString()}</td>
                <td className="px-4 py-2.5">
                  <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-medium', statusClass[row.status])}>
                    {statusLabel[row.status]}
                  </span>
                </td>
                <td className="px-4 py-2.5 font-mono text-muted-foreground">{row.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Apps — utility launcher                                                      */
/* -------------------------------------------------------------------------- */

function AppsScreen() {
  const apps: {icon: LucideIcon; name: string}[] = [
    {icon: Barcode, name: 'Barcode'},
    {icon: QrCode, name: 'QR Code'},
    {icon: Palette, name: 'Color Converter'},
    {icon: KeyRound, name: 'JWT Viewer'},
    {icon: Hash, name: 'Hash'},
    {icon: Binary, name: 'Base64'},
    {icon: FlaskConical, name: 'Faker'},
    {icon: FileText, name: 'Regex Tester'},
    {icon: Workflow, name: 'WS Discovery'},
    {icon: Factory, name: 'Service Manager'},
    {icon: Bot, name: 'Ollama Chat'},
    {icon: LayoutGrid, name: 'More'},
  ];
  return (
    <>
      <Header screen="apps" />
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {apps.map(app => (
          <div
            key={app.name}
            className="flex items-center gap-3 rounded-md border border-border bg-background/40 p-3"
          >
            <span className="flex size-9 items-center justify-center rounded-md border border-border bg-background text-foreground/80">
              <app.icon className="size-4" />
            </span>
            <span className="text-xs font-medium">{app.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */

export const SCREENS: Record<ScreenKey, React.ComponentType> = {
  dashboard: DashboardScreen,
  graphs: GraphsScreen,
  surveillance: SurveillanceScreen,
  vision: VisionScreen,
  datasets: DatasetsScreen,
  mlflow: MlflowScreen,
  agents: AgentsScreen,
  manufacturing: ManufacturingScreen,
  apps: AppsScreen,
};
