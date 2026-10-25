import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  SlidersHorizontal,
  Upload,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * 동영상 › 업로드, step 1 설정 (`/proj/:id/videos/upload`,
 * `_UploadSettingsStep` + `_UploadEncodeBlock` + `_UploadAdvancedSettings`):
 * HLS vs original, the encoding choice (browser only · converter when needed ·
 * converter for everything) with the converter instance, the advanced
 * settings unfolded, segment length, AES-128 encryption and playlist.
 */
const COPY = {
  ko: {
    title: '업로드',
    library: '동영상 목록',
    steps: ['설정', '파일 담기', '업로드'],
    uploadAs: '업로드 방식',
    uploadAsOptions: [
      ['HLS (스트리밍)', '세그먼트로 나누어 스트리밍 재생합니다.'],
      ['원본 파일', '파일을 그대로 보관합니다.'],
    ],
    encoding: '인코딩',
    encodingOptions: [
      ['브라우저만', '브라우저에서 리먹싱합니다.'],
      ['필요할 때 변환기', '재생되지 않는 파일만 변환기가 처리합니다.'],
      ['모두 변환기', '모든 파일을 변환기가 다시 인코딩합니다.'],
    ],
    recommended: '권장',
    converter: '변환기',
    advanced: '고급 설정',
    quality: '화질',
    qualityOptions: [
      ['원본에 가깝게 · 기본', 'CRF 18'],
      ['균형', 'CRF 23'],
      ['용량 작게', 'CRF 28'],
      ['직접 지정', 'CRF · 비트레이트'],
    ],
    speed: '인코딩 속도',
    speedOptions: ['빠르게', '보통', '느리게 · 더 작게'],
    hw: '하드웨어 가속',
    hwOptions: ['NVENC · 기본', 'QSV', '소프트웨어'],
    rest: '해상도 원본 그대로 · 프레임레이트 원본 그대로 · AAC 192 kbps · 트랙 복사 켬',
    segment: '세그먼트 길이',
    segmentOptions: ['4초', '6초', '10초'],
    encrypt: '암호화 (AES-128)',
    playlist: '재생목록',
    playlistValue: '3공장 B라인 점검',
    back: '이전',
    next: '다음',
  },
  en: {
    title: 'Upload',
    library: 'Video library',
    steps: ['Settings', 'Add files', 'Upload'],
    uploadAs: 'Upload as',
    uploadAsOptions: [
      ['HLS (streaming)', 'Split into segments for streaming.'],
      ['Original file', 'Keep the file as it is.'],
    ],
    encoding: 'Encoding',
    encodingOptions: [
      ['Browser only', 'Remuxed in the browser.'],
      ['Converter when needed', 'The converter takes only files that will not play.'],
      ['Converter for everything', 'The converter re-encodes every file.'],
    ],
    recommended: 'Recommended',
    converter: 'Converter',
    advanced: 'Advanced settings',
    quality: 'Quality',
    qualityOptions: [
      ['Close to the original · Default', 'CRF 18'],
      ['Balanced', 'CRF 23'],
      ['Smaller files', 'CRF 28'],
      ['Custom', 'CRF · bitrate'],
    ],
    speed: 'Encoding speed',
    speedOptions: ['Fast', 'Medium', 'Slow · smaller'],
    hw: 'Hardware acceleration',
    hwOptions: ['NVENC · Default', 'QSV', 'Software'],
    rest: 'Original resolution · original frame rate · AAC 192 kbps · track copy on',
    segment: 'Segment length',
    segmentOptions: ['4 s', '6 s', '10 s'],
    encrypt: 'Encrypt (AES-128)',
    playlist: 'Playlist',
    playlistValue: 'Plant 3 line B checks',
    back: 'Back',
    next: 'Next',
  },
} as const;

function Row({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <div className="grid gap-1.5 border-t border-border py-2.5 first:border-t-0 first:pt-0 @2xl:grid-cols-[7.5rem_1fr] @2xl:gap-3">
      <p className="pt-0.5 text-[10px] font-medium">{label}</p>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function RadioCard({
  title,
  desc,
  selected,
  badge,
}: {
  title: string;
  desc?: string;
  selected?: boolean;
  badge?: string;
}) {
  return (
    <span
      className={cn(
        'flex min-w-0 items-start gap-1.5 rounded-md border px-2 py-1.5',
        selected ? 'border-primary ring-1 ring-primary' : 'border-border',
      )}
    >
      <span
        className={cn(
          'mt-0.5 flex size-2.5 shrink-0 items-center justify-center rounded-full border',
          selected ? 'border-primary' : 'border-input',
        )}
      >
        {selected && <span className="size-1.5 rounded-full bg-primary" />}
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1 text-[10px] font-medium">
          <span className="truncate">{title}</span>
          {badge && (
            <span className="shrink-0 rounded bg-secondary px-1 text-[8px] text-muted-foreground">
              {badge}
            </span>
          )}
        </span>
        {desc && (
          <span className="block truncate text-[9px] text-muted-foreground">
            {desc}
          </span>
        )}
      </span>
    </span>
  );
}

function Pills({options, selected}: {options: readonly string[]; selected: number}) {
  return (
    <span className="flex flex-wrap gap-1">
      {options.map((option, i) => (
        <span
          key={option}
          className={cn(
            'rounded-md border px-2 py-0.5 text-[9.5px]',
            i === selected
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border text-muted-foreground',
          )}
        >
          {option}
        </span>
      ))}
    </span>
  );
}

export function MockVideoUpload() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockAppFrame
      activeNav="videos"
      crumbs={[{icon: Upload, label: c.title}]}
      title={c.title}
      titleIcon={Upload}
      actions={<MockButton icon={Clapperboard}>{c.library}</MockButton>}
    >
      {/* stepper */}
      <div className="mb-3 flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2">
        {c.steps.map((step, i) => (
          <span key={step} className="flex flex-1 items-center gap-2 last:flex-none">
            <span
              className={cn(
                'flex size-4 shrink-0 items-center justify-center rounded-full text-[8.5px] font-medium',
                i === 0
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground',
              )}
            >
              {i + 1}
            </span>
            <span
              className={cn(
                'text-[10px]',
                i === 0 ? 'font-medium' : 'text-muted-foreground',
              )}
            >
              {step}
            </span>
            {i < c.steps.length - 1 && <span className="h-px flex-1 bg-border" />}
          </span>
        ))}
      </div>

      <div className="rounded-md border border-border bg-card px-3 py-3">
        <Row label={c.uploadAs}>
          <div className="grid gap-1.5 @xl:grid-cols-2">
            {c.uploadAsOptions.map(([title, desc], i) => (
              <RadioCard key={title} title={title} desc={desc} selected={i === 0} />
            ))}
          </div>
        </Row>

        <Row label={c.encoding}>
          <div className="grid gap-1.5 @3xl:grid-cols-3">
            {c.encodingOptions.map(([title, desc], i) => (
              <RadioCard
                key={title}
                title={title}
                desc={desc}
                selected={i === 1}
                badge={i === 1 ? c.recommended : undefined}
              />
            ))}
          </div>
          <span className="mt-1.5 flex h-6 w-44 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-[10px]">
            <span className="text-muted-foreground">{c.converter}</span>
            gpu-node-01
            <ChevronDown className="ml-auto size-3 text-muted-foreground" />
          </span>
        </Row>

        <Row label={c.advanced}>
          <div className="rounded-md border border-border">
            <div className="flex items-center gap-1.5 border-b border-border px-2.5 py-1.5 text-[10px] font-medium">
              <SlidersHorizontal className="size-3 text-muted-foreground" />
              {c.advanced}
              <ChevronUp className="ml-auto size-3 text-muted-foreground" />
            </div>
            <div className="space-y-2 px-2.5 py-2">
              <div>
                <p className="mb-1 text-[9.5px] text-muted-foreground">{c.quality}</p>
                <div className="grid grid-cols-2 gap-1 @3xl:grid-cols-4">
                  {c.qualityOptions.map(([title, desc], i) => (
                    <RadioCard
                      key={title}
                      title={title}
                      desc={desc}
                      selected={i === 0}
                    />
                  ))}
                </div>
              </div>
              <div className="grid gap-2 @2xl:grid-cols-2">
                <div>
                  <p className="mb-1 text-[9.5px] text-muted-foreground">{c.speed}</p>
                  <Pills options={c.speedOptions} selected={1} />
                </div>
                <div>
                  <p className="mb-1 text-[9.5px] text-muted-foreground">{c.hw}</p>
                  <Pills options={c.hwOptions} selected={0} />
                </div>
              </div>
              <p className="truncate text-[9px] text-muted-foreground">{c.rest}</p>
            </div>
          </div>
        </Row>

        <Row label={c.segment}>
          <Pills options={c.segmentOptions} selected={1} />
        </Row>

        <Row label={c.encrypt}>
          <span className="inline-flex h-3.5 w-6 items-center justify-end rounded-full bg-primary p-px">
            <span className="size-3 rounded-full bg-background shadow" />
          </span>
        </Row>

        <Row label={c.playlist}>
          <span className="flex h-6 w-52 items-center rounded-md border border-input bg-background px-2 text-[10px]">
            {c.playlistValue}
            <ChevronDown className="ml-auto size-3 text-muted-foreground" />
          </span>
        </Row>
      </div>

      <div className="mt-3 flex justify-between">
        <MockButton variant="ghost" className="opacity-50">
          {c.back}
        </MockButton>
        <MockButton variant="default">{c.next}</MockButton>
      </div>
    </MockAppFrame>
  );
}
