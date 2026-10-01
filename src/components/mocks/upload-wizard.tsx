import {
  Braces,
  ChartColumn,
  ChevronRight,
  Download,
  FileCode2,
  FileUp,
  Images,
  Info,
  PackageCheck,
  ScanSearch,
  Shapes,
  Tags,
  Upload,
  type LucideIcon,
} from 'lucide-react';

import {MockAppFrame} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Dataset detail → 업로드 tab, first wizard step (`_UploadFormatStep`): the
 * track stepper, then one card per import kind for an image dataset
 * (`constants/datasetImportFormats.ts`: icon, tint, extension chips, example
 * path). Every image kind makes one sample per file, so — like the app — the
 * cards come as a single group without the "파일 하나가 샘플 하나" heading.
 */
const COPY = {
  ko: {
    datasetName: '차량 감지 v3',
    tabs: ['샘플', '업로드', '다운로드', '클래스', '태그', 'QA & 통계'],
    title: '어떤 파일을 올리나요?',
    hint: '종류를 고르면 바로 파일 단계로 넘어갑니다. 파일을 넣은 뒤에도 바꿀 수 있습니다.',
    count: '이미지 데이터셋 · 6종',
    steps: ['YOLO', 'data.yaml', 'labels/', 'images/', '검증', '옵션', '업로드'],
    formats: {
      none: ['라벨 없음 (미디어만)', '어노테이션 없이 이미지·동영상만 올립니다.'],
      yolo: [
        'YOLO',
        'Ultralytics YOLO: data.yaml, labels/*.txt, 이미지(탐지·세그멘테이션·포즈).',
      ],
      coco: ['COCO JSON', 'COCO instances·keypoints 매니페스트와 이미지.'],
      voc: ['Pascal VOC', 'Annotations/ 에 이미지마다 XML, ImageSets/Main 분할(선택).'],
      labelme: ['LabelMe', '이미지마다 JSON 하나, 보통 이미지와 같은 폴더.'],
      cvp: ['CVP 네이티브', 'CVP 에서 내보낸 cvp.json(클래스 색 포함).'],
    },
  },
  en: {
    datasetName: 'Vehicle detection v3',
    tabs: ['Samples', 'Upload', 'Download', 'Classes', 'Tags', 'QA & Stats'],
    title: 'What are you uploading?',
    hint: 'Pick a kind to go straight to the files step. You can change it after adding files.',
    count: 'Images dataset · 6 kinds',
    steps: ['YOLO', 'data.yaml', 'labels/', 'images/', 'Check', 'Options', 'Upload'],
    formats: {
      none: ['Media only', 'Upload images or videos only, with no annotations.'],
      yolo: [
        'YOLO',
        'Ultralytics YOLO: data.yaml, labels/*.txt and the images (detect, segment, pose).',
      ],
      coco: ['COCO JSON', 'COCO instances or keypoints manifests, then the images.'],
      voc: [
        'Pascal VOC',
        'One XML per image in Annotations/, optional ImageSets/Main splits.',
      ],
      labelme: ['LabelMe', 'One JSON per image, usually next to the images.'],
      cvp: ['CVP native', 'cvp.json exported from CVP, with class colours.'],
    },
  },
} as const;

type FormatId = 'none' | 'yolo' | 'coco' | 'voc' | 'labelme' | 'cvp';

/** `FORMAT_TINT_CLASSES` (constants/formatTints.ts). */
const TINTS = {
  stone: 'bg-stone-500/10 text-stone-700 dark:bg-stone-400/15 dark:text-stone-300',
  violet: 'bg-violet-500/10 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300',
  blue: 'bg-blue-500/10 text-blue-700 dark:bg-blue-400/15 dark:text-blue-300',
  amber: 'bg-amber-500/10 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300',
  rose: 'bg-rose-500/10 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300',
  cyan: 'bg-cyan-500/10 text-cyan-800 dark:bg-cyan-400/15 dark:text-cyan-300',
} as const;

/** Card data: icon, tint, first three extension chips (+ "…"), example path. */
const FORMATS: {
  id: FormatId;
  icon: LucideIcon;
  tint: keyof typeof TINTS;
  exts: string[];
  more: boolean;
  path: string;
}[] = [
  {
    id: 'none',
    icon: FileUp,
    tint: 'stone',
    exts: ['.jpg', '.jpeg', '.png'],
    more: false,
    path: 'my-data/0001.jpg',
  },
  {
    id: 'yolo',
    icon: ScanSearch,
    tint: 'violet',
    exts: ['.yaml', '.yml', '.txt'],
    more: true,
    path: 'data.yaml',
  },
  {
    id: 'coco',
    icon: Braces,
    tint: 'blue',
    exts: ['.json', '.jpg', '.jpeg'],
    more: true,
    path: 'annotations/instances_train2017.json',
  },
  {
    id: 'voc',
    icon: FileCode2,
    tint: 'amber',
    exts: ['.xml', '.txt', '.jpg'],
    more: true,
    path: 'Annotations/0001.xml',
  },
  {
    id: 'labelme',
    icon: Tags,
    tint: 'rose',
    exts: ['.json', '.jpg', '.jpeg'],
    more: true,
    path: 'labelme/0001.json',
  },
  {
    id: 'cvp',
    icon: PackageCheck,
    tint: 'cyan',
    exts: ['.json', '.jpg', '.jpeg'],
    more: true,
    path: 'cvp.json',
  },
];

const SELECTED: FormatId = 'yolo';

export function MockUploadWizard() {
  const {lang} = useLanguage();
  const c = COPY[lang];
  const tabIcons = [Images, Upload, Download, Shapes, Tags, ChartColumn];
  const tabs = c.tabs.map((label, i) => ({icon: tabIcons[i], label, active: i === 1}));

  return (
    <MockAppFrame
      activeNav="datasets"
      crumbs={[{icon: Images, label: c.datasetName}, {label: c.tabs[1]}]}
      title={c.datasetName}
      titleIcon={Images}
      tabs={tabs}
    >
      <div className="space-y-5">
        {/* Stepper appearance="track" (current = 0: only its label shows when narrow) */}
        <div className="rounded-lg border border-border bg-card px-3 py-3">
          <ol className="flex items-center gap-1.5 @3xl:gap-2.5">
            {c.steps.map((step, i) => {
              const active = i === 0;
              const last = i === c.steps.length - 1;
              return (
                <li
                  key={step}
                  className={cn(
                    'flex items-center gap-1.5 @3xl:gap-2.5',
                    last ? 'shrink-0' : 'flex-1',
                  )}
                >
                  <span
                    className={cn(
                      'flex shrink-0 items-center gap-2 text-[11px] whitespace-nowrap',
                      active
                        ? 'font-semibold text-foreground'
                        : 'font-medium text-muted-foreground',
                    )}
                  >
                    <span
                      className={cn(
                        'flex size-5 shrink-0 items-center justify-center rounded-full text-[10px]',
                        active
                          ? 'bg-primary font-semibold text-primary-foreground ring-[3px] ring-border'
                          : 'border-[1.5px] border-muted-foreground/40',
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className={cn(!active && 'hidden @4xl:inline')}>{step}</span>
                  </span>
                  {!last && (
                    <span className="h-0.5 min-w-2 flex-1 rounded-full bg-border" />
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* UploadStepHeader */}
        <div className="flex flex-wrap items-end justify-between gap-x-5 gap-y-1.5">
          <div className="min-w-0">
            <h4 className="text-base font-bold tracking-tight">{c.title}</h4>
            <p className="mt-1 text-[11px] text-muted-foreground">{c.hint}</p>
          </div>
          <span className="flex items-center gap-1 text-[10.5px] text-muted-foreground">
            <Info className="size-3 shrink-0" />
            {c.count}
          </span>
        </div>

        {/* kind cards */}
        <div className="grid auto-rows-fr gap-3 @md:grid-cols-2 @3xl:grid-cols-3">
          {FORMATS.map(format => {
            const Icon = format.icon;
            const selected = format.id === SELECTED;
            const [title, desc] = c.formats[format.id];
            return (
              <div
                key={format.id}
                className={cn(
                  'flex h-full min-w-0 flex-col gap-2.5 rounded-lg border bg-card p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]',
                  selected
                    ? 'border-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_20px_-8px_rgba(28,25,23,0.25)]'
                    : 'border-border',
                )}
              >
                <span className="flex w-full items-center gap-2.5">
                  <span
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-lg',
                      TINTS[format.tint],
                    )}
                  >
                    <Icon className="size-4" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold">
                    {title}
                  </span>
                  <ChevronRight
                    className={cn(
                      'size-3.5 shrink-0',
                      selected ? 'text-foreground' : 'text-muted-foreground/50',
                    )}
                  />
                </span>
                <span className="line-clamp-2 min-h-[3.1em] flex-1 text-[10.5px] leading-[1.55] text-muted-foreground">
                  {desc}
                </span>
                <span className="flex w-full items-center gap-1 overflow-hidden border-t border-dashed border-border pt-2.5">
                  {format.exts.map(ext => (
                    <span
                      key={ext}
                      className="shrink-0 rounded-md border border-border bg-muted/60 px-1.5 py-[3px] font-mono text-[9px] leading-none text-muted-foreground"
                    >
                      {ext}
                    </span>
                  ))}
                  {format.more && (
                    <span className="text-[9px] leading-none text-muted-foreground">
                      …
                    </span>
                  )}
                  <span className="ml-auto min-w-0 truncate font-mono text-[9px] text-muted-foreground/80">
                    {format.path}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </MockAppFrame>
  );
}
