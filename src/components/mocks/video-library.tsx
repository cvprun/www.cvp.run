import {
  CalendarRange,
  ChevronDown,
  Film,
  Heart,
  LayoutDashboard,
  LayoutGrid,
  List,
  ListFilter,
  ListVideo,
  Loader2,
  Lock,
  MessageSquare,
  MoreVertical,
  Play,
  Radio,
  Sparkles,
  Upload,
  X,
} from 'lucide-react';

import {MockAppFrame, MockButton, useNavLabel} from '@/components/mocks/app-frame';
import {MockBadge} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * 동영상 › 전체 목록 (`/proj/:id/videos?tab=all`): the library tabs, toolbar
 * (search · play all · filter · period · sort | view), the 처리 중 section
 * with converter jobs from `_IngestJobCards.tsx` (stage + progress, the
 * NVENC fallback note), then `VideoCard`s. Thumbnails are real frames from
 * Wikimedia Commons "Dashcam Recording (urban)" (CC0).
 */
const THUMBS = ['/mockdata/vt1.webp', '/mockdata/vt2.webp', '/mockdata/vt3.webp'];

const COPY = {
  ko: {
    tabs: ['추천 목록', '즐겨찾기', '재생 목록', '전체 목록', '업로드', '스트리밍'],
    upload: '업로드',
    search: '동영상 검색…',
    sort: '업로드 날짜',
    filter: '필터',
    period: '기간',
    playAll: '모두 재생',
    live: 'LIVE',
    liveName: '1번 게이트 카메라',
    views: (n: string) => `조회수 ${n}회`,
    uploader: '김하늘',
    processing: '처리 중',
    jobs: [
      {
        name: 'Line C — night shift.mkv',
        meta: '2.2 GB · gpu-node-01',
        stage: '인코딩 42%',
        pct: 42,
        note: '하드웨어 인코더(NVENC)를 사용할 수 없어 소프트웨어로 인코딩합니다.',
      },
      {
        name: 'Drone survey.mov',
        meta: '820.2 MB · gpu-node-01',
        stage: '변환기 대기',
        pct: 0,
        note: '',
      },
    ],
    stop: '멈추기',
  },
  en: {
    tabs: [
      'Recommended',
      'Favorites',
      'Playlists',
      'All videos',
      'Upload',
      'Streaming',
    ],
    upload: 'Upload',
    search: 'Search videos…',
    sort: 'Upload date',
    filter: 'Filter',
    period: 'Period',
    playAll: 'Play all',
    live: 'LIVE',
    liveName: 'Gate 1 camera',
    views: (n: string) => `${n} views`,
    uploader: 'Haneul Kim',
    processing: 'Processing',
    jobs: [
      {
        name: 'Line C — night shift.mkv',
        meta: '2.2 GB · gpu-node-01',
        stage: 'Encoding 42%',
        pct: 42,
        note: 'NVENC is unavailable, so the video is encoded in software.',
      },
      {
        name: 'Drone survey.mov',
        meta: '820.2 MB · gpu-node-01',
        stage: 'Waiting for the converter',
        pct: 0,
        note: '',
      },
    ],
    stop: 'Stop',
  },
} as const;

const TAB_ICONS = [Sparkles, Heart, ListVideo, Film, Upload, Radio];

export function MockVideoLibrary() {
  const {t, lang} = useLanguage();
  const m = t.mocks.videos;
  const c = COPY[lang];
  const nav = useNavLabel();

  const clips = [
    {
      name: c.liveName,
      thumb: THUMBS[1],
      duration: null,
      views: '12',
      comments: 0,
      hls: true,
      encrypted: false,
      playing: false,
      favorite: false,
    },
    {
      name: m.clipNames[0],
      thumb: THUMBS[0],
      duration: '0:26',
      views: '48',
      comments: 3,
      hls: true,
      encrypted: true,
      playing: false,
      favorite: true,
    },
    {
      name: m.clipNames[1],
      thumb: THUMBS[1],
      duration: '2:00',
      views: '131',
      comments: 7,
      hls: true,
      encrypted: false,
      playing: true,
      favorite: false,
    },
    {
      name: m.clipNames[2],
      thumb: THUMBS[2],
      duration: '0:31',
      views: '26',
      comments: 0,
      hls: false,
      encrypted: false,
      playing: false,
      favorite: false,
    },
  ];

  return (
    <MockAppFrame
      activeNav="videos"
      title={nav('videos')}
      actions={
        <MockButton icon={Upload} variant="default">
          {c.upload}
        </MockButton>
      }
      tabs={c.tabs.map((label, i) => ({icon: TAB_ICONS[i], label, active: i === 3}))}
    >
      {/* PageToolbar: search · sort · play all | view mode */}
      <div className="flex items-center gap-1.5">
        <span className="flex h-7 min-w-0 flex-1 items-center rounded-md border border-input bg-background px-2 text-[10px] text-muted-foreground @2xl:max-w-44">
          <span className="truncate">{c.search}</span>
        </span>
        <span className="hidden h-7 w-28 shrink-0 items-center justify-between rounded-md border border-input bg-background px-2 text-[10px] @2xl:flex">
          {c.sort}
          <ChevronDown className="size-3 text-muted-foreground" />
        </span>
        <MockButton icon={Play} className="h-7">
          {c.playAll}
        </MockButton>
        <MockButton icon={ListFilter} className="hidden h-7 @3xl:inline-flex">
          {c.filter}
        </MockButton>
        <MockButton icon={CalendarRange} className="hidden h-7 @4xl:inline-flex">
          {c.period}
        </MockButton>
        <span className="ml-auto flex shrink-0 items-center gap-0.5">
          {[LayoutGrid, LayoutDashboard, List].map((Icon, i) => (
            <span
              key={i}
              className={cn(
                'flex size-6 items-center justify-center rounded-md text-muted-foreground',
                i === 0 && 'bg-accent text-foreground',
              )}
            >
              <Icon className="size-3.5" />
            </span>
          ))}
        </span>
      </div>

      {/* 처리 중: converter jobs, before the asset exists */}
      <div className="mt-3">
        <p className="mb-1.5 flex items-center gap-1.5 text-[10.5px] font-semibold">
          {c.processing}
          <span className="font-normal text-muted-foreground tabular-nums">2</span>
        </p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-3 @3xl:grid-cols-3 @5xl:grid-cols-4">
          {c.jobs.map(job => (
            <div key={job.name}>
              <div className="relative flex aspect-video flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border border-dashed border-border bg-muted/50">
                <Loader2 className="size-4 text-muted-foreground motion-safe:animate-spin" />
                <span className="text-[9.5px] text-muted-foreground tabular-nums">
                  {job.stage}
                </span>
                <span className="absolute inset-x-0 bottom-0 h-px bg-border">
                  <span
                    className="block h-full bg-foreground"
                    style={{width: `${job.pct}%`}}
                  />
                </span>
              </div>
              <div className="flex items-start gap-1 pt-1.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] leading-snug font-medium">
                    {job.name}
                  </p>
                  <p className="text-[9px] text-muted-foreground">{job.meta}</p>
                  {job.note && (
                    <p className="mt-0.5 line-clamp-2 text-[8.5px] text-amber-700 dark:text-amber-400">
                      {job.note}
                    </p>
                  )}
                </div>
                <span className="inline-flex shrink-0 items-center gap-0.5 text-[9px] text-muted-foreground">
                  <X className="size-2.5" />
                  {c.stop}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VideoCard grid */}
      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-4 @3xl:grid-cols-3 @5xl:grid-cols-4">
        {clips.map((clip, i) => (
          <div key={clip.name} className={cn(i === 3 && 'hidden @5xl:block')}>
            <div
              className={cn(
                'relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-950',
                clip.playing && 'ring-2 ring-primary',
              )}
            >
              <img
                src={clip.thumb}
                alt=""
                loading="lazy"
                className={cn(
                  'absolute inset-0 h-full w-full object-cover',
                  !clip.duration && 'scale-x-[-1]',
                )}
              />
              {clip.playing && (
                <span className="absolute top-1.5 left-1.5 rounded bg-primary px-1.5 py-0.5 text-[9px] font-medium text-primary-foreground shadow">
                  {m.nowPlaying}
                </span>
              )}
              {clip.duration ? (
                <span className="absolute right-1 bottom-1 rounded bg-black/80 px-1 text-[9px] leading-4 font-medium text-white tabular-nums">
                  {clip.duration}
                </span>
              ) : (
                <span className="absolute right-1 bottom-1 rounded bg-red-600 px-1 text-[9px] leading-4 font-medium text-white">
                  {c.live}
                </span>
              )}
            </div>
            <div className="flex items-start gap-1 pt-1.5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] leading-snug font-medium">
                  {clip.name}
                </p>
                <p className="text-[9px] text-muted-foreground">{c.uploader}</p>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[9px] text-muted-foreground">
                  <span>{c.views(clip.views)}</span>
                  {clip.comments > 0 && (
                    <span className="inline-flex items-center gap-0.5">
                      <MessageSquare className="size-2.5" />
                      {clip.comments}
                    </span>
                  )}
                  <span className="hidden @3xl:inline">1280×720</span>
                  <MockBadge
                    tone="secondary"
                    className="px-1 py-0 text-[8px] uppercase"
                  >
                    {clip.hls ? m.badgeHls : m.badgeRaw}
                  </MockBadge>
                  {clip.encrypted && (
                    <MockBadge tone="outline" className="px-1 py-0 text-[8px]">
                      <Lock className="size-2" />
                      {m.badgeEncrypted}
                    </MockBadge>
                  )}
                </div>
              </div>
              <span className="flex shrink-0 items-center gap-0.5 text-muted-foreground">
                <Heart
                  className={cn(
                    'size-3',
                    clip.favorite && 'fill-current text-amber-500',
                  )}
                />
                <MoreVertical className="size-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </MockAppFrame>
  );
}
