import {Check, VideoOff} from 'lucide-react';

import {MockPanelFrame} from '@/components/mocks/panel-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/** Dark scene gradients standing in for live video. */
const SCENES = [
  'linear-gradient(160deg, #232e40 0%, #38445c 60%, #1c2431 100%)',
  'linear-gradient(200deg, #1f2a3d 0%, #2b3850 55%, #171d2c 100%)',
  'linear-gradient(140deg, #23343a 0%, #3e5c58 60%, #1a2528 100%)',
  'linear-gradient(180deg, #2a2436 0%, #453a56 55%, #201b2b 100%)',
  'linear-gradient(150deg, #2e2a22 0%, #55482f 60%, #221f18 100%)',
];

export function MockVmsLive() {
  const {t} = useLanguage();
  const m = t.mocks.vms;

  const tiles = [
    {name: m.cameraLobby, ok: true, rec: true, active: true, fps: '30', kbps: '2048k'},
    {name: m.cameraParking, ok: true, rec: false, fps: '25', kbps: '1536k'},
    {name: m.cameraElevator, ok: false, rec: false, fps: '12', kbps: '512k'},
    {name: m.cameraWarehouse, ok: true, rec: true, fps: '30', kbps: '2048k'},
    {name: m.cameraDock, ok: true, rec: false, fps: '25', kbps: '1024k'},
  ];

  const events = [
    {
      time: '14:32:10',
      camera: m.cameraLobby,
      type: 'person',
      sev: m.sevCritical,
      sevClass: 'bg-red-500/15 text-red-600 dark:text-red-400',
      status: m.ackOpen,
      ack: true,
    },
    {
      time: '14:28:44',
      camera: m.cameraParking,
      type: 'motion',
      sev: m.sevWarning,
      sevClass: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
      status: m.ackAcked,
      ack: false,
    },
    {
      time: '14:15:02',
      camera: m.cameraDock,
      type: 'line_cross',
      sev: m.sevInfo,
      sevClass: 'bg-sky-500/15 text-sky-600 dark:text-sky-400',
      status: m.ackAcked,
      ack: false,
    },
  ];

  return (
    <MockPanelFrame>
      {/* header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span>
          <span className="block text-sm font-semibold">{m.layoutName}</span>
          <span className="block text-[10px] text-muted-foreground">{m.subtitle}</span>
        </span>
        <span className="ml-auto flex gap-0.5">
          {['1', '4', '6', '9', '16'].map(preset => (
            <span
              key={preset}
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded border text-[10px] tabular-nums',
                preset === '6'
                  ? 'border-primary bg-primary/10 font-medium'
                  : 'border-border text-muted-foreground',
              )}
            >
              {preset}
            </span>
          ))}
        </span>
      </div>

      {/* video wall 3×2 */}
      <div className="grid grid-cols-2 gap-1 bg-black p-1 sm:grid-cols-3">
        {tiles.map((tile, i) => (
          <div
            key={tile.name}
            className={cn(
              'relative aspect-video overflow-hidden rounded-md',
              tile.active && 'ring-2 ring-primary',
            )}
            style={{background: SCENES[i]}}
          >
            {/* top HUD */}
            <span className="absolute top-1 left-1 rounded bg-black/40 px-1.5 py-0.5 text-[9px] text-white">
              {tile.name}
            </span>
            <span className="absolute top-1 right-1 flex items-center gap-1">
              {tile.rec && (
                <span className="flex items-center gap-0.5 rounded bg-red-500 px-1 py-0.5 text-[8px] font-semibold text-white">
                  <span className="size-1 animate-pulse rounded-full bg-white" />
                  REC
                </span>
              )}
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[8px] font-medium',
                  tile.ok
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-amber-500/20 text-amber-300',
                )}
              >
                {tile.ok ? m.statusOk : m.statusDegraded}
              </span>
            </span>
            {/* bottom HUD */}
            <span className="absolute bottom-1 left-1 flex items-center gap-1.5 rounded bg-black/40 px-1.5 py-0.5 text-[8px] text-white/90 tabular-nums">
              <span>
                {m.fps} {tile.fps}
              </span>
              <span>{tile.kbps}</span>
              <span>H264</span>
              <span className="rounded bg-white/20 px-1">WHEP</span>
            </span>
          </div>
        ))}
        {/* empty slot */}
        <div className="flex aspect-video items-center justify-center rounded-md bg-white/5">
          <VideoOff className="size-5 text-white/25" />
        </div>
      </div>

      {/* events strip */}
      <div className="px-4 py-2.5">
        <div className="grid grid-cols-[4rem_1.2fr_5rem_4rem_4rem_3rem] items-center gap-2 border-b border-border pb-1.5 text-[10px] text-muted-foreground">
          <span>{m.evtColTime}</span>
          <span>{m.evtColCamera}</span>
          <span>{m.evtColType}</span>
          <span>{m.evtColSeverity}</span>
          <span>{m.evtColStatus}</span>
          <span />
        </div>
        {events.map(event => (
          <div
            key={event.time}
            className="grid grid-cols-[4rem_1.2fr_5rem_4rem_4rem_3rem] items-center gap-2 border-b border-border/40 py-1.5 text-[11px] last:border-b-0"
          >
            <span className="font-mono text-[10px] text-muted-foreground">
              {event.time}
            </span>
            <span className="truncate">{event.camera}</span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {event.type}
            </span>
            <span>
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[9px] font-medium',
                  event.sevClass,
                )}
              >
                {event.sev}
              </span>
            </span>
            <span className="text-[10px] text-muted-foreground">{event.status}</span>
            {event.ack ? (
              <span className="flex items-center gap-0.5 justify-self-end rounded border border-border px-1.5 py-0.5 text-[9px] text-muted-foreground">
                <Check className="size-2.5" />
                {m.ack}
              </span>
            ) : (
              <span />
            )}
          </div>
        ))}
      </div>
    </MockPanelFrame>
  );
}
