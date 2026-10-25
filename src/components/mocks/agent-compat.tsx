import {Box, Check, CheckCircle2, Cpu, LayoutGrid, RefreshCw} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Add-app wizard, step 2 호환성 (`agents/:agentId/apps/new`,
 * `_AddAgentAppWizard` + `AppCompatPanel`): the five-step rail, the selected
 * app, and the host check run on the agent — each line shows what the host
 * reported against what the app needs. Values follow the `CompatPassed` story.
 */
const COPY = {
  ko: {
    crumb: '애플리케이션 추가',
    steps: ['앱 선택', '호환성', '실행 인자', '한도', '개수·확인'],
    stepHint: '이 앱이 그 컴퓨터에서 실행되는지 확인합니다.',
    app: '포인트 클라우드 세그멘테이션',
    category: '머신러닝',
    verdict: '이 앱은 그 컴퓨터에서 실행할 수 있습니다.',
    source: '에이전트에서 방금 확인했습니다.',
    again: '다시 확인',
    needs: '필요',
    checks: [
      ['운영체제', 'linux', 'linux'],
      ['아키텍처', 'amd64', 'amd64'],
      ['C 라이브러리(glibc)', '2.39', '2.28'],
      ['GPU', 'NVIDIA GeForce RTX 5090', 'NVIDIA'],
      ['GPU 드라이버', 'CUDA 13.1', 'CUDA 13.0'],
      ['설치 패키지', 'pointcept-wheelhouse@1.7.0', ''],
      ['설치 환경', 'uv', ''],
      ['디스크 여유', '613.6 GiB', '12.0 GiB'],
    ],
    willInstall: '설치될 패키지',
    back: '이전',
    cancel: '취소',
    next: '다음',
  },
  en: {
    crumb: 'Add an application',
    steps: ['Pick an app', 'Compatibility', 'Arguments', 'Limits', 'Count and confirm'],
    stepHint: 'Check whether the app can run on that computer.',
    app: 'Point cloud segmentation',
    category: 'Machine Learning',
    verdict: 'This app can run on that computer.',
    source: 'Checked on the agent just now.',
    again: 'Check again',
    needs: 'needs',
    checks: [
      ['Operating system', 'linux', 'linux'],
      ['Architecture', 'amd64', 'amd64'],
      ['C library (glibc)', '2.39', '2.28'],
      ['GPU', 'NVIDIA GeForce RTX 5090', 'NVIDIA'],
      ['GPU driver', 'CUDA 13.1', 'CUDA 13.0'],
      ['Package', 'pointcept-wheelhouse@1.7.0', ''],
      ['Install environment', 'uv', ''],
      ['Free disk space', '613.6 GiB', '12.0 GiB'],
    ],
    willInstall: 'Will install',
    back: 'Back',
    cancel: 'Cancel',
    next: 'Next',
  },
} as const;

const CURRENT = 1;

export function MockAgentCompat() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockAppFrame
      activeNav="agents"
      crumbs={[
        {icon: Cpu, label: 'gpu-box'},
        {icon: LayoutGrid, label: c.crumb},
      ]}
      title={c.crumb}
      titleIcon={LayoutGrid}
    >
      <div className="grid gap-4 @2xl:grid-cols-[9.5rem_1fr]">
        <ol className="flex flex-wrap gap-1 @2xl:flex-col">
          {c.steps.map((step, i) => (
            <li
              key={step}
              className={cn(
                'flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px]',
                i === CURRENT ? 'bg-accent font-medium' : 'text-muted-foreground',
              )}
            >
              <span
                className={cn(
                  'flex size-4 shrink-0 items-center justify-center rounded-full border text-[8.5px]',
                  i < CURRENT && 'border-primary bg-primary text-primary-foreground',
                  i === CURRENT && 'border-primary',
                  i > CURRENT && 'border-border',
                )}
              >
                {i < CURRENT ? <Check className="size-2.5" strokeWidth={3} /> : i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <div className="min-w-0">
          <p className="text-[10px] text-muted-foreground">{c.stepHint}</p>

          <div className="mt-2.5 flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-2">
            <span className="flex size-7 items-center justify-center rounded-md border border-border bg-muted/40">
              <Box className="size-3.5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10.5px] font-medium">{c.app}</span>
              <span className="block text-[8.5px] tracking-wider text-muted-foreground uppercase">
                {c.category}
              </span>
            </span>
          </div>

          <div className="mt-2.5 rounded-md border border-border bg-card">
            <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
              <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600" />
              <span className="text-[10.5px] font-medium">{c.verdict}</span>
              <span className="text-[9.5px] text-muted-foreground">{c.source}</span>
              <MockButton icon={RefreshCw} className="ml-auto">
                {c.again}
              </MockButton>
            </div>
            <ul className="divide-y divide-border">
              {c.checks.map(([name, observed, needs]) => (
                <li
                  key={name}
                  className="flex items-center gap-2 px-3 py-1.5 text-[10px]"
                >
                  <Check
                    className="size-3 shrink-0 text-emerald-600"
                    strokeWidth={2.5}
                  />
                  <span className="w-32 shrink-0 truncate">{name}</span>
                  <span className="min-w-0 truncate font-mono text-[9.5px] text-muted-foreground">
                    {observed}
                    {needs && (
                      <span className="text-muted-foreground/70">
                        {' '}
                        · {c.needs} {needs}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <p className="border-t border-border px-3 py-1.5 text-[9.5px] text-muted-foreground">
              {c.willInstall}{' '}
              <span className="font-mono text-foreground">
                pointcept-wheelhouse@1.7.0-amd64-cu130
              </span>
            </p>
          </div>

          <div className="mt-3 flex justify-end gap-1.5">
            <MockButton variant="ghost">{c.back}</MockButton>
            <MockButton>{c.cancel}</MockButton>
            <MockButton variant="default">{c.next}</MockButton>
          </div>
        </div>
      </div>
    </MockAppFrame>
  );
}
