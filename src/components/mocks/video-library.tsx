import {ListVideo, Lock, Play, Plus, Search, Video} from 'lucide-react';

import {MockBadge} from '@/components/mocks/mock-ui';
import {MockPanelFrame} from '@/components/mocks/panel-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

const THUMBS = [
  'linear-gradient(135deg, #2b3850 0%, #4c5b7a 55%, #232e40 100%)',
  'linear-gradient(135deg, #1f2a3d 0%, #3d3554 60%, #171d2c 100%)',
  'linear-gradient(135deg, #23343a 0%, #3e5c58 55%, #1a2528 100%)',
];

export function MockVideoLibrary() {
  const {t} = useLanguage();
  const m = t.mocks.videos;

  const clips = [
    {
      name: m.clipNames[0],
      meta: '0:42 · 1920×1080',
      hls: true,
      encrypted: true,
      playing: true,
    },
    {
      name: m.clipNames[1],
      meta: '2:18 · 3840×2160',
      hls: true,
      encrypted: false,
      playing: false,
    },
    {
      name: m.clipNames[2],
      meta: '0:12 · 1280×720',
      hls: false,
      encrypted: false,
      playing: false,
    },
  ];

  return (
    <MockPanelFrame>
      <div className="flex">
        {/* playlist sidebar */}
        <aside className="hidden w-40 shrink-0 border-r border-border bg-muted/20 p-2 sm:block">
          <span className="flex items-center gap-1.5 rounded bg-accent px-2 py-1.5 text-[11px] font-medium">
            <Video className="size-3" />
            {m.allVideos}
            <span className="ml-auto text-[10px] text-muted-foreground">12</span>
          </span>
          <div className="mt-2 flex items-center justify-between px-2">
            <span className="text-[9px] font-semibold tracking-wider text-muted-foreground uppercase">
              {m.playlists}
            </span>
            <Plus className="size-3 text-muted-foreground" />
          </div>
          <ul className="mt-1 space-y-0.5">
            {m.playlistNames.map((name, i) => (
              <li
                key={name}
                className="flex items-center gap-1.5 rounded px-2 py-1 text-[11px] text-muted-foreground"
              >
                <ListVideo className="size-3 shrink-0" />
                <span className="truncate">{name}</span>
                <span className="ml-auto text-[10px]">{i === 0 ? 3 : 9}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* library */}
        <div className="min-w-0 flex-1 p-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 flex-1 items-center gap-1.5 rounded-md border border-border bg-background px-2 text-[11px] text-muted-foreground sm:max-w-44">
              <Search className="size-3" />
              {m.searchPlaceholder}
            </span>
            <span className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground">
              <Play className="size-3" />
              {m.playAll}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {clips.map((clip, i) => (
              <div
                key={clip.name}
                className={cn(
                  'overflow-hidden rounded-lg border border-border bg-card',
                  clip.playing && 'ring-2 ring-primary',
                )}
              >
                <div
                  className="relative aspect-video w-full"
                  style={{background: THUMBS[i]}}
                >
                  {clip.playing && (
                    <span className="absolute top-1.5 left-1.5 flex items-center gap-1 rounded bg-primary px-1.5 py-0.5 text-[9px] font-medium text-primary-foreground">
                      {m.nowPlaying}
                    </span>
                  )}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex size-8 items-center justify-center rounded-full bg-background/80">
                      <Play className="size-3.5" />
                    </span>
                  </span>
                </div>
                <div className="p-2">
                  <span className="block truncate text-[11px] font-medium">
                    {clip.name}
                  </span>
                  <span className="block font-mono text-[9px] text-muted-foreground">
                    {clip.meta}
                  </span>
                  <span className="mt-1 flex gap-1">
                    <MockBadge tone="secondary" className="uppercase">
                      {clip.hls ? m.badgeHls : m.badgeRaw}
                    </MockBadge>
                    {clip.encrypted && (
                      <MockBadge tone="outline">
                        <Lock className="size-2.5" />
                        {m.badgeEncrypted}
                      </MockBadge>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockPanelFrame>
  );
}
