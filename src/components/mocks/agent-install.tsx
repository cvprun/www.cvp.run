import {Copy, Cpu, Download} from 'lucide-react';
import type {ReactNode} from 'react';

import {MockAppFrame} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Agent install guide (`/proj/:id/agents/install`, `_InstallGuide.tsx` +
 * `lib/cli-install.ts`): token input, OS tabs, the three install commands and
 * the published build with one executable per platform.
 */

const COPY = {
  ko: {
    title: '에이전트',
    agents: '에이전트',
    install: '설치',
    tokenLabel: '에이전트 토큰',
    tokenHint:
      '에이전트를 만들 때 표시된 결합 토큰을 붙여 넣으세요. 아래 명령을 채우는 데만 쓰이고 어디에도 전송되지 않습니다.',
    stepRun: '지금 실행',
    stepRunHint:
      '실행 파일을 설치하고 이 터미널에서 바로 에이전트를 띄웁니다. 터미널을 닫으면 멈춥니다.',
    stepService: '서비스로 등록',
    stepServiceHint:
      '/usr/local/bin 에 설치하고 부팅 시 자동으로 뜨도록 systemd 유닛을 등록합니다. root 권한이 필요합니다.',
    stepInstallOnly: '설치만',
    stepInstallOnlyHint: '실행 파일만 설치하고 위치를 출력합니다. 실행은 직접 합니다.',
    autoUpdate:
      '설치된 실행 파일은 이후 배포를 스스로 따라갑니다. 다시 설치할 필요가 없습니다.',
    channelTitle: '배포된 빌드',
    build: '빌드',
  },
  en: {
    title: 'Agents',
    agents: 'Agents',
    install: 'Install',
    tokenLabel: 'Agent token',
    tokenHint:
      'Paste the combined token shown when the agent was created. It only fills in the commands below and is never sent anywhere.',
    stepRun: 'Run now',
    stepRunHint:
      'Installs the executable and starts the agent in this terminal. Closing the terminal stops it.',
    stepService: 'Register as a service',
    stepServiceHint:
      'Installs to /usr/local/bin and registers a systemd unit so the agent starts at boot. Needs root.',
    stepInstallOnly: 'Install only',
    stepInstallOnlyHint:
      'Installs the executable and prints where it went. Run it yourself afterwards.',
    autoUpdate:
      'The installed executable follows every deployment on its own. No reinstall needed.',
    channelTitle: 'Published build',
    build: 'Build',
  },
} as const;

const ORIGIN = 'https://app.cvp.run';
const TOKEN = 'cvp_8Kq2vN7xRb…_7f3a9c1e';
const LOADER = `curl -fsSL ${ORIGIN}/cli/install.sh`;

const COMMANDS = {
  run: `${LOADER} | sh -s -- --url ${ORIGIN} agent run --token ${TOKEN}`,
  service: `${LOADER} | sudo sh -s -- --url ${ORIGIN} service install --token ${TOKEN}`,
  install: `${LOADER} | sh`,
};

const BINARIES = [
  {arch: 'x64', size: '38.4 MB'},
  {arch: 'arm64', size: '37.9 MB'},
];

/** `CodeBlock`: muted pre + copy button, bash tokens tinted. */
function CodeBlock({code}: {code: string}) {
  // Highlight the command words like `tokenizeCode(…, 'bash')` does.
  const parts = code.split(/(\s+)/).map((word, i) => {
    if (/^(curl|sh|sudo)$/.test(word)) {
      return (
        <span key={i} className="text-blue-600 dark:text-blue-400">
          {word}
        </span>
      );
    }
    if (/^--?[a-z]/.test(word)) {
      return (
        <span key={i} className="text-amber-700 dark:text-amber-300">
          {word}
        </span>
      );
    }
    if (word === '|') {
      return (
        <span key={i} className="text-foreground/70">
          {word}
        </span>
      );
    }
    return word;
  });
  return (
    <div className="relative">
      <pre className="overflow-hidden rounded bg-muted p-2 pr-8 font-mono text-[10px] leading-relaxed break-all whitespace-pre-wrap">
        <code>{parts}</code>
      </pre>
      <span className="absolute top-1 right-1 flex size-5 items-center justify-center rounded text-muted-foreground">
        <Copy className="size-3" />
      </span>
    </div>
  );
}

function Step({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-1.5">
      <h4 className="text-[11px] font-medium">{title}</h4>
      <p className="text-[10px] text-muted-foreground">{hint}</p>
      {children}
    </section>
  );
}

export function MockAgentInstall() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockAppFrame
      activeNav="agents"
      crumbs={[{icon: Download, label: c.install}]}
      title={c.title}
      tabs={[
        {icon: Cpu, label: c.agents},
        {icon: Download, label: c.install, active: true},
      ]}
    >
      <div className="max-w-3xl space-y-5">
        {/* token field */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-medium">{c.tokenLabel}</label>
          <span className="flex h-7 items-center rounded-md border border-input bg-background px-2 font-mono text-[10px] shadow-sm">
            {TOKEN}
          </span>
          <p className="text-[10px] text-muted-foreground">{c.tokenHint}</p>
        </div>

        {/* OS tabs (shadcn TabsList) */}
        <div className="space-y-4">
          <span className="inline-flex h-7 items-center rounded-lg bg-muted p-0.5 text-[10px] text-muted-foreground">
            {['Linux', 'macOS', 'Windows'].map((os, i) => (
              <span
                key={os}
                className={cn(
                  'rounded-md px-2.5 py-1 font-medium',
                  i === 0 && 'bg-background text-foreground shadow-sm',
                )}
              >
                {os}
              </span>
            ))}
          </span>

          <Step title={c.stepRun} hint={c.stepRunHint}>
            <CodeBlock code={COMMANDS.run} />
          </Step>
          <Step title={c.stepService} hint={c.stepServiceHint}>
            <CodeBlock code={COMMANDS.service} />
          </Step>
          <div className="hidden @2xl:block">
            <Step title={c.stepInstallOnly} hint={c.stepInstallOnlyHint}>
              <CodeBlock code={COMMANDS.install} />
            </Step>
          </div>
          <p className="text-[10px] text-muted-foreground">{c.autoUpdate}</p>

          <section className="space-y-1.5 border-t border-border pt-3">
            <h4 className="text-[11px] font-medium">{c.channelTitle}</h4>
            <div className="space-y-1 text-[10px] text-muted-foreground">
              <p className="font-mono text-foreground">{c.build} 2026.09.30-1b7e4c2</p>
              <ul className="flex flex-wrap gap-3">
                {BINARIES.map(({arch, size}) => (
                  <li key={arch}>
                    {arch} · {size}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </MockAppFrame>
  );
}
