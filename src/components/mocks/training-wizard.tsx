import {Check, FlaskConical, Plus} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {mlopsTabs} from '@/components/mocks/mlops-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * MLOps › 새 학습 (`/proj/:id/mlops/experiments/new?step=1`): the four-step
 * wizard (무엇을 · 데이터 · 설정 · 실행) on its first step — task cards for
 * the seven trainable tasks, the framework card and the model list. Task
 * names and descriptions are the app's `training.json` strings.
 */
const COPY = {
  ko: {
    title: '새 학습',
    steps: ['무엇을', '데이터', '설정', '실행'],
    task: '태스크',
    framework: '프레임워크',
    model: '모델',
    tasks: [
      ['객체 탐지', '바운딩 박스로 객체 위치와 클래스를 예측합니다.'],
      ['인스턴스 세그멘테이션', '객체별 픽셀 마스크를 예측합니다.'],
      ['키포인트 탐지', '포즈·스켈레톤 키포인트를 예측합니다.'],
      [
        '3D 인스턴스 세그멘테이션',
        '포인트 클라우드에서 객체별 점 집합(인스턴스)을 예측합니다.',
      ],
      ['시계열 예측', '채널의 미래 값을 예측 구간과 함께 예측합니다.'],
      [
        '시계열 이상 탐지',
        '각 지점이 예측에서 벗어난 정도를 점수로 매겨 이상 구간을 찾습니다.',
      ],
      [
        '시계열 분류',
        '시계열을 고정 길이 윈도우로 나누어 윈도우마다 클래스를 지정합니다.',
      ],
    ],
    models: [
      'Detection Nano',
      'Detection Small',
      'Detection Medium',
      'Detection Large',
    ],
    prev: '이전',
    next: '다음',
  },
  en: {
    title: 'New training',
    steps: ['What', 'Data', 'Settings', 'Run'],
    task: 'Task',
    framework: 'Framework',
    model: 'Model',
    tasks: [
      ['Object detection', 'Predicts object locations and classes as bounding boxes.'],
      ['Instance segmentation', 'Predicts a pixel mask per object.'],
      ['Keypoint detection', 'Predicts pose/skeleton keypoints.'],
      [
        '3D instance segmentation',
        'Predicts per-object point sets (instances) in a point cloud.',
      ],
      [
        'Time-series forecasting',
        'Predicts future values of a channel with a prediction interval.',
      ],
      [
        'Time-series anomaly detection',
        'Scores how far each point strays from the forecast and flags anomalous ranges.',
      ],
      [
        'Time-series classification',
        'Assigns a class to every fixed-length window of a series.',
      ],
    ],
    models: [
      'Detection Nano',
      'Detection Small',
      'Detection Medium',
      'Detection Large',
    ],
    prev: 'Back',
    next: 'Next',
  },
} as const;

const SELECTED_TASK = 0;
const SELECTED_MODEL = 2;

function Section({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <section>
      <p className="mb-1.5 text-[10.5px] font-semibold">{title}</p>
      {children}
    </section>
  );
}

export function MockTrainingWizard() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockAppFrame
      activeNav="mlops"
      crumbs={[
        {icon: FlaskConical, label: lang === 'ko' ? '실험' : 'Experiments'},
        {icon: Plus, label: c.title},
      ]}
      title={c.title}
      titleIcon={Plus}
      tabs={mlopsTabs(lang, 'experiments')}
    >
      <div className="grid gap-4 @2xl:grid-cols-[8.5rem_1fr]">
        {/* step list */}
        <ol className="flex gap-1 @2xl:flex-col">
          {c.steps.map((step, i) => (
            <li
              key={step}
              className={cn(
                'flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px]',
                i === 0 ? 'bg-accent font-medium' : 'text-muted-foreground',
              )}
            >
              <span
                className={cn(
                  'flex size-4 shrink-0 items-center justify-center rounded-full border text-[8.5px] tabular-nums',
                  i === 0
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border',
                )}
              >
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <div className="min-w-0 space-y-3.5">
          <Section title={c.task}>
            <div className="grid gap-1.5 @xl:grid-cols-2">
              {c.tasks.map(([name, desc], i) => (
                <div
                  key={name}
                  className={cn(
                    'rounded-md border bg-card px-2.5 py-2',
                    i === SELECTED_TASK
                      ? 'border-primary ring-2 ring-primary'
                      : 'border-border',
                    i >= 4 && 'hidden @3xl:block',
                  )}
                >
                  <p className="text-[10px] font-medium">{name}</p>
                  <p className="mt-0.5 line-clamp-2 text-[9px] leading-snug text-muted-foreground">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <div className="grid gap-3.5 @3xl:grid-cols-2">
            <Section title={c.framework}>
              <div className="flex items-start gap-2 rounded-md border border-primary bg-card px-2.5 py-2 ring-1 ring-primary">
                <span className="mt-0.5 flex size-3 shrink-0 items-center justify-center rounded-full border border-primary">
                  <span className="size-1.5 rounded-full bg-primary" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-medium">
                    Image object detection
                  </span>
                  <span className="mt-1 flex flex-wrap gap-1">
                    {['sota', 'realtime', 'Apache-2.0'].map(tag => (
                      <span
                        key={tag}
                        className="rounded bg-muted px-1 font-mono text-[8.5px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                </span>
              </div>
            </Section>

            <Section title={c.model}>
              <ul className="overflow-hidden rounded-md border border-border">
                {c.models.map((name, i) => (
                  <li
                    key={name}
                    className={cn(
                      'flex items-center gap-2 border-b border-border px-2.5 py-1.5 text-[10px] last:border-b-0',
                      i === SELECTED_MODEL && 'bg-accent font-medium',
                    )}
                  >
                    <span
                      className={cn(
                        'flex size-3 shrink-0 items-center justify-center rounded-full border',
                        i === SELECTED_MODEL
                          ? 'border-primary bg-primary'
                          : 'border-border',
                      )}
                    >
                      {i === SELECTED_MODEL && (
                        <Check
                          className="size-2 text-primary-foreground"
                          strokeWidth={3}
                        />
                      )}
                    </span>
                    {name}
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <div className="flex justify-between border-t border-border pt-3">
            <MockButton variant="ghost">{c.prev}</MockButton>
            <MockButton variant="default">{c.next}</MockButton>
          </div>
        </div>
      </div>
    </MockAppFrame>
  );
}
