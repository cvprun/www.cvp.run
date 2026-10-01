import {
  Boxes,
  Check,
  FlaskConical,
  LayoutDashboard,
  LineChart,
  Link2,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * `/proj/:id/mlops/training/new` — the 11-step training wizard
 * (`pages/(app)/proj/mlops/training/new`). Step titles are Korean-only in
 * the app; the English copy here is a faithful translation.
 */
const COPY = {
  ko: {
    tabs: ['개요', '훈련 실험', '실험 추적', '모델', '엔드포인트'],
    title: '실험 실행',
    steps: [
      '태스크',
      '프레임워크',
      '모델',
      '학습 데이터',
      '클래스',
      'Train / Val',
      '하이퍼파라미터',
      '평가',
      '내보내기',
      'GPU',
      '학습',
    ],
    tasks: [
      ['객체 탐지', '바운딩 박스로 객체 위치와 클래스를 예측합니다.'],
      ['인스턴스 세그멘테이션', '객체별 픽셀 마스크를 예측합니다.'],
      ['키포인트 탐지', '포즈/스켈레톤 키포인트를 예측합니다.'],
      [
        '3D 인스턴스 세그멘테이션',
        '포인트 클라우드에서 객체별 점 집합(인스턴스)을 예측합니다. PointGroup · PTv3.',
      ],
      [
        '시계열 예측',
        '채널의 미래 값을 예측 구간과 함께 예측합니다. AutoGluon · Chronos-Bolt.',
      ],
      [
        '시계열 이상 탐지',
        '각 지점이 예측에서 벗어난 정도를 점수로 매겨 이상 구간을 찾습니다. 라벨 구간이 있으면 임계값을 보정합니다.',
      ],
      [
        '시계열 분류',
        '시계열을 고정 길이 윈도우로 나눠 윈도우마다 클래스를 붙입니다. MiniRocket.',
      ],
    ],
    prev: '이전',
    next: '다음',
  },
  en: {
    tabs: ['Overview', 'Training', 'Experiments', 'Models', 'Endpoint'],
    title: 'Run experiment',
    steps: [
      'Task',
      'Framework',
      'Model',
      'Training data',
      'Classes',
      'Train / Val',
      'Hyperparameters',
      'Evaluation',
      'Export',
      'GPU',
      'Train',
    ],
    tasks: [
      ['Object detection', 'Predicts object locations and classes as bounding boxes.'],
      ['Instance segmentation', 'Predicts a pixel mask per object.'],
      ['Keypoint detection', 'Predicts pose/skeleton keypoints.'],
      [
        '3D instance segmentation',
        'Predicts per-object point sets (instances) in a point cloud. PointGroup · PTv3.',
      ],
      [
        'Time-series forecasting',
        'Predicts future values of a channel with a prediction interval. AutoGluon · Chronos-Bolt.',
      ],
      [
        'Time-series anomaly detection',
        'Scores how far each point strays from the forecast and flags anomalous ranges. Labelled ranges calibrate the threshold.',
      ],
      [
        'Time-series classification',
        'Assigns a class to every fixed-length window of a series. MiniRocket.',
      ],
    ],
    prev: 'Previous',
    next: 'Next',
  },
} as const;

/** `MLOPS_TABS` icons, in tab order. */
const MLOPS_TAB_ICONS = [LayoutDashboard, FlaskConical, LineChart, Boxes, Link2];

/** The wizard sits on step 1 (태스크) with 객체 탐지 chosen. */
const CURRENT_STEP = 0;
const SELECTED_TASK = 0;

export function MockTrainingWizard() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockAppFrame
      activeNav="mlops"
      crumbs={[{label: c.tabs[1]}, {label: c.title}]}
      title={c.title}
      tabs={c.tabs.map((label, i) => ({
        label,
        icon: MLOPS_TAB_ICONS[i],
        active: i === 1,
      }))}
    >
      <div className="flex gap-5">
        {/* left stepper */}
        <ol className="hidden w-40 shrink-0 space-y-0.5 @2xl:block">
          {c.steps.map((title, i) => (
            <li
              key={title}
              className={cn(
                'flex items-center gap-2 rounded px-2 py-1 text-[11px]',
                i === CURRENT_STEP
                  ? 'bg-accent font-medium'
                  : i < CURRENT_STEP
                    ? 'text-muted-foreground'
                    : 'text-muted-foreground/60',
              )}
            >
              <span
                className={cn(
                  'flex size-4 shrink-0 items-center justify-center rounded-full text-[9px]',
                  i < CURRENT_STEP
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-current',
                )}
              >
                {i < CURRENT_STEP ? <Check className="size-2.5" /> : i + 1}
              </span>
              {title}
            </li>
          ))}
        </ol>

        {/* content */}
        <div className="min-w-0 flex-1 space-y-3">
          <div className="grid gap-2.5 @lg:grid-cols-2">
            {c.tasks.map(([name, desc], i) => (
              <div
                key={name}
                className={cn(
                  'rounded-md border border-border bg-card px-3 py-3 shadow-sm',
                  i === SELECTED_TASK && 'ring-2 ring-primary',
                )}
              >
                <p className="text-[11px] font-medium">{name}</p>
                <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-muted-foreground">
                  {desc}
                </p>
              </div>
            ))}
          </div>

          {/* footer */}
          <div className="flex justify-between pt-1">
            <MockButton className="opacity-50">{c.prev}</MockButton>
            <MockButton variant="default">{c.next}</MockButton>
          </div>
        </div>
      </div>
    </MockAppFrame>
  );
}
