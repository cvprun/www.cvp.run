import {
  Crown,
  Hand,
  LogOut,
  MessageSquare,
  Mic,
  MicOff,
  MonitorUp,
  MoreHorizontal,
  PhoneOff,
  Settings,
  Smile,
  Users,
  Video,
  type LucideIcon,
} from 'lucide-react';

import {MockChrome, MockWindow} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/** Dark meeting palette (`--meet-stage` / `--meet-surface` / `--meet-accent`). */
const STAGE = '#0f0f0f';
const SURFACE = '#1f1f1f';
const ACCENT = '#62c073';

const COPY = {
  ko: {
    title: '라벨링 가이드 v3 리뷰',
    recording: '녹음 중',
    you: '나',
    guest: '게스트',
    names: ['김지훈', '박서연', '이도현', '최유나', 'Alex Morgan'],
    labels: {
      mic: '마이크 켜기/끄기',
      cam: '카메라 켜기/끄기',
      screen: '화면 공유',
      react: '반응',
      hand: '손들기',
      chat: '채팅',
      people: '참가자',
      settings: '설정',
      more: '더보기',
      leave: '나가기',
      end: '회의 종료',
    },
  },
  en: {
    title: 'Labeling guide v3 review',
    recording: 'Recording',
    you: 'You',
    guest: 'Guest',
    names: ['Jihoon Kim', 'Seoyeon Park', 'Dohyun Lee', 'Yuna Choi', 'Alex Morgan'],
    labels: {
      mic: 'Toggle microphone',
      cam: 'Toggle camera',
      screen: 'Share screen',
      react: 'React',
      hand: 'Raise hand',
      chat: 'Chat',
      people: 'Participants',
      settings: 'Settings',
      more: 'More',
      leave: 'Leave',
      end: 'End meeting',
    },
  },
} as const;

type Tile = {
  /** Camera-on tiles get a tinted "video" gradient; off tiles an AutoIcon avatar. */
  gradient?: [string, string];
  avatar: string;
  muted?: boolean;
  host?: boolean;
  guest?: boolean;
  speaking?: boolean;
  hand?: boolean;
  quality: 1 | 2 | 3;
};

const TILES: Tile[] = [
  {gradient: ['#3b4a5e', '#1d2530'], avatar: '#6366f1', host: true, quality: 3},
  {gradient: ['#5a4636', '#2a2019'], avatar: '#ec4899', speaking: true, quality: 3},
  {avatar: '#14b8a6', muted: true, quality: 2},
  {
    gradient: ['#35514a', '#18251f'],
    avatar: '#f59e0b',
    muted: true,
    hand: true,
    quality: 3,
  },
  {avatar: '#8b5cf6', muted: true, quality: 3},
  {gradient: ['#4a3a5c', '#1f1a28'], avatar: '#0ea5e9', guest: true, quality: 1},
];

function SignalBars({quality}: {quality: 1 | 2 | 3}) {
  const color = quality === 3 ? ACCENT : quality === 2 ? '#f59e0b' : '#ef4444';
  return (
    <span className="flex items-end gap-px">
      {[4, 7, 10].map((h, i) => (
        <span
          key={h}
          className="w-[2px] rounded-full"
          style={{
            height: h,
            background: i < quality ? color : 'rgb(255 255 255 / 0.3)',
          }}
        />
      ))}
    </span>
  );
}

/** `MeetingVideoTile`: 16:9 tile, name strip, host crown, mute icon, speaking ring. */
function VideoTile({
  tile,
  name,
  guestLabel,
}: {
  tile: Tile;
  name: string;
  guestLabel: string;
}) {
  return (
    <div
      className="relative aspect-video overflow-hidden rounded-lg"
      style={{
        background: tile.gradient
          ? `radial-gradient(120% 90% at 50% 20%, ${tile.gradient[0]}, ${tile.gradient[1]})`
          : SURFACE,
        boxShadow: tile.speaking
          ? `0 0 0 2px ${ACCENT}`
          : 'inset 0 0 0 1px rgb(255 255 255 / 0.1)',
      }}
    >
      {tile.gradient ? (
        // silhouette standing in for the camera feed
        <svg
          viewBox="0 0 160 90"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMax slice"
        >
          <circle cx={80} cy={40} r={15} fill="rgb(255 255 255 / 0.16)" />
          <path
            d="M44 92 C46 66 62 58 80 58 C98 58 114 66 116 92 Z"
            fill="rgb(255 255 255 / 0.12)"
          />
        </svg>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="flex aspect-square h-2/5 items-center justify-center rounded-full text-[13px] font-semibold text-white"
            style={{background: tile.avatar}}
          >
            {name.slice(0, 1)}
          </span>
        </div>
      )}

      <span className="absolute top-1.5 left-1.5 rounded bg-black/35 p-1">
        <SignalBars quality={tile.quality} />
      </span>
      {tile.hand && (
        <span
          className="absolute top-1.5 right-1.5 flex size-5 items-center justify-center rounded-full text-white"
          style={{background: ACCENT}}
        >
          <Hand className="size-3" />
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-2 pt-4 pb-1.5">
        {tile.muted && <MicOff className="size-3 shrink-0 text-white/90" />}
        {tile.host && <Crown className="size-3 shrink-0 text-white/90" />}
        <span className="truncate text-[10px] font-medium text-white">{name}</span>
        {tile.guest && (
          <span className="shrink-0 rounded bg-white/15 px-1 text-[9px] text-white/80">
            {guestLabel}
          </span>
        )}
      </div>
    </div>
  );
}

function ControlButton({
  icon: Icon,
  label,
  tone = 'ghost',
  badge,
  className,
}: {
  icon: LucideIcon;
  label: string;
  tone?: 'ghost' | 'destructive' | 'leave';
  badge?: number;
  className?: string;
}) {
  return (
    <span
      title={label}
      className={cn(
        'relative flex size-8 shrink-0 items-center justify-center rounded-full',
        tone === 'ghost' && 'text-white/90',
        tone === 'leave' && 'text-red-400',
        tone === 'destructive' && 'bg-red-600 text-white',
        className,
      )}
    >
      <Icon className="size-3.5" />
      {badge ? (
        <span className="absolute -top-0.5 -right-0.5 flex size-3.5 items-center justify-center rounded-full bg-white text-[8px] font-semibold text-black">
          {badge}
        </span>
      ) : null}
    </span>
  );
}

export function MockMeetingRoom() {
  const {lang} = useLanguage();
  const c = COPY[lang];
  const l = c.labels;
  const names = [`${c.names[0]} (${c.you})`, ...c.names.slice(1)];

  return (
    <MockWindow className="@container">
      <MockChrome />
      <div
        className="flex min-h-[24rem] flex-col text-white"
        style={{background: STAGE}}
      >
        {/* MeetingRoomHeader */}
        <header
          className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2"
          style={{background: SURFACE}}
        >
          <span className="flex min-w-0 items-center gap-2">
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-red-500/15 px-1.5 py-0.5 text-[10px] font-medium text-red-400">
              <span className="size-1.5 animate-pulse rounded-full bg-red-500" />
              {c.recording}
            </span>
            <span className="truncate text-[11px] font-medium">{c.title}</span>
          </span>
          <span className="flex shrink-0 items-center gap-2.5 text-[10px] text-white/60">
            <SignalBars quality={3} />
            <span className="flex items-center gap-1 tabular-nums">
              <Users className="size-3" />
              {TILES.length}
            </span>
            <span className="tabular-nums">24:18</span>
          </span>
        </header>

        {/* MeetingVideoGrid */}
        <div className="grid flex-1 grid-cols-2 content-center gap-2 p-3 @3xl:grid-cols-3">
          {TILES.map((tile, i) => (
            <div key={i} className={cn(i >= 4 && 'hidden @3xl:block')}>
              <VideoTile tile={tile} name={names[i]} guestLabel={c.guest} />
            </div>
          ))}
        </div>

        {/* MeetingControlBar */}
        <div className="flex justify-center px-4 pt-1 pb-3">
          <div
            className="inline-flex items-center gap-1 rounded-full border border-white/10 px-1.5 py-1 shadow-lg"
            style={{background: SURFACE}}
          >
            <ControlButton icon={Mic} label={l.mic} />
            <ControlButton icon={Video} label={l.cam} />
            <ControlButton icon={MonitorUp} label={l.screen} />
            <ControlButton icon={Smile} label={l.react} />
            <ControlButton icon={Hand} label={l.hand} />
            <span className="hidden items-center gap-1 @xl:flex">
              <ControlButton icon={MessageSquare} label={l.chat} badge={2} />
              <ControlButton icon={Users} label={l.people} />
              <ControlButton icon={Settings} label={l.settings} />
            </span>
            <ControlButton
              icon={MoreHorizontal}
              label={l.more}
              badge={2}
              className="@xl:hidden"
            />
            <span className="mx-1 h-5 w-px bg-white/15" />
            <ControlButton icon={LogOut} label={l.leave} tone="leave" />
            <ControlButton icon={PhoneOff} label={l.end} tone="destructive" />
          </div>
        </div>
      </div>
    </MockWindow>
  );
}
