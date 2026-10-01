import {Boxes, Container, Copy, Package, Ship, Tags, Trash2} from 'lucide-react';
import type {ReactNode} from 'react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {MockBadge} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * `/proj/:id/registry` (Docker tab): storage card with the cleanup button,
 * the repositories table (`_RepositoriesTable`) and the "connect a client"
 * guide with `CodeBlock`s. Tabs come from `RegistryTabs` (icon + count).
 */

const COPY = {
  ko: {
    title: '레지스트리',
    storage: '스토리지',
    total: '전체',
    blobs: (n: number) => `블롭 ${n}개`,
    reclaimable: '회수 가능',
    openUploads: (n: number) => `진행 중 업로드 ${n}개`,
    gc: '스토리지 정리',
    repositories: '리포지토리',
    name: '이름',
    tags: '태그',
    manifests: '매니페스트',
    size: '용량',
    lastPushed: '마지막 푸시',
    actions: '작업',
    guideTitle: '클라이언트 연결',
    guideDesc:
      '사용자명에 프로젝트 ID, 비밀번호에 프로젝트 액세스 토큰(레지스트리 범위)을 사용해 인증합니다.',
    tokenLink: '액세스 토큰 관리',
    login: '로그인',
    push: '이미지 푸시',
    pull: '이미지 풀',
    descs: {
      rfdetr: 'RF-DETR 추론 서버 (CUDA 13)',
      labeling: '라벨링 배치 워커',
      pointcept: 'Pointcept 학습 러너',
      edge: '엣지 게이트웨이 + 수집기',
    },
  },
  en: {
    title: 'Registry',
    storage: 'Storage',
    total: 'Total',
    blobs: (n: number) => `${n} blobs`,
    reclaimable: 'Reclaimable',
    openUploads: (n: number) => `${n} open uploads`,
    gc: 'Clean up storage',
    repositories: 'Repositories',
    name: 'Name',
    tags: 'Tags',
    manifests: 'Manifests',
    size: 'Size',
    lastPushed: 'Last pushed',
    actions: 'Actions',
    guideTitle: 'Connect a client',
    guideDesc:
      'Authenticate with your project id as the username and a project access token (registry scope) as the password.',
    tokenLink: 'Manage access tokens',
    login: 'Log in',
    push: 'Push an image',
    pull: 'Pull an image',
    descs: {
      rfdetr: 'RF-DETR inference server (CUDA 13)',
      labeling: 'Batch labeling worker',
      pointcept: 'Pointcept training runner',
      edge: 'Edge gateway + collectors',
    },
  },
} as const;

type Repo = {
  name: string;
  desc: keyof (typeof COPY)['ko']['descs'];
  tags: number;
  manifests: number;
  size: string;
  pushed: string;
  helm?: boolean;
};

const REPOS: Repo[] = [
  {
    name: 'acme/rfdetr-infer',
    desc: 'rfdetr',
    tags: 7,
    manifests: 14,
    size: '6.8 GB',
    pushed: '2026-09-30 17:42',
  },
  {
    name: 'acme/labeling-worker',
    desc: 'labeling',
    tags: 4,
    manifests: 8,
    size: '412.6 MB',
    pushed: '2026-09-28 09:15',
  },
  {
    name: 'acme/pointcept-runner',
    desc: 'pointcept',
    tags: 3,
    manifests: 3,
    size: '9.1 GB',
    pushed: '2026-09-24 21:03',
  },
  {
    name: 'acme/edge-gateway',
    desc: 'edge',
    tags: 5,
    manifests: 12,
    size: '187.3 MB',
    pushed: '2026-09-19 14:27',
    helm: true,
  },
];

function Card({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-md border border-border bg-card">
      <div className="flex items-center justify-between px-3.5 pt-3 pb-1.5">
        <span className="text-[11px] font-medium">{title}</span>
        {action}
      </div>
      <div className="px-3.5 pb-3.5">{children}</div>
    </div>
  );
}

function Code({lines}: {lines: string[]}) {
  return (
    <div className="relative">
      <pre className="overflow-hidden rounded bg-muted p-2 pr-7 font-mono text-[9.5px] leading-relaxed whitespace-pre">
        {lines.map(line => {
          const [cmd, ...rest] = line.split(' ');
          return (
            <span key={line} className="block truncate">
              <span className="text-sky-600 dark:text-sky-400">{cmd}</span>{' '}
              {rest.map((w, i) => (
                <span
                  key={i}
                  className={cn(
                    w.startsWith('-') && 'text-amber-600 dark:text-amber-400',
                  )}
                >
                  {w}{' '}
                </span>
              ))}
            </span>
          );
        })}
      </pre>
      <Copy className="absolute top-1.5 right-1.5 size-3 text-muted-foreground" />
    </div>
  );
}

export function MockRegistry() {
  const {lang} = useLanguage();
  const c = COPY[lang];
  const host = 'app.cvp.run';
  const proj = 'av-poc';

  return (
    <MockAppFrame
      activeNav="registry"
      title={c.title}
      tabs={[
        {icon: Container, label: 'Docker  4', active: true},
        {icon: Ship, label: 'Helm  1'},
        {icon: Package, label: 'pip  2'},
        {icon: Boxes, label: 'npm  1'},
      ]}
    >
      <div className="flex flex-col gap-3">
        {/* usage */}
        <Card title={c.storage} action={<MockButton icon={Trash2}>{c.gc}</MockButton>}>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px]">
            <span>
              <span className="text-muted-foreground">{c.total}: </span>
              <span className="font-medium">16.5 GB</span>
              <span className="ml-1 text-[10px] text-muted-foreground">
                ({c.blobs(182)})
              </span>
            </span>
            <span>
              <span className="text-muted-foreground">{c.reclaimable}: </span>
              <span className="font-medium">1.2 GB</span>
            </span>
            <span className="text-muted-foreground">{c.openUploads(1)}</span>
          </div>
        </Card>

        {/* repositories */}
        <Card title={c.repositories}>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="h-8 border-b border-border text-muted-foreground">
                <th className="px-1 text-left font-medium whitespace-nowrap">
                  {c.name}
                </th>
                <th className="hidden px-2 text-right font-medium @2xl:table-cell">
                  {c.tags}
                </th>
                <th className="hidden px-2 text-right font-medium @4xl:table-cell">
                  {c.manifests}
                </th>
                <th className="hidden px-2 text-right font-medium @2xl:table-cell">
                  {c.size}
                </th>
                <th className="hidden px-2 text-left font-medium @4xl:table-cell">
                  {c.lastPushed}
                </th>
                <th className="w-14 px-1 text-left font-medium">{c.actions}</th>
              </tr>
            </thead>
            <tbody>
              {REPOS.map((repo, i) => (
                <tr key={repo.name} className={cn(i > 0 && 'border-t border-border')}>
                  <td className="px-1 py-2">
                    <span className="flex items-center gap-1.5">
                      <span className="truncate font-medium">{repo.name}</span>
                      {repo.helm && (
                        <MockBadge className="px-1 py-0 text-[9px] font-normal">
                          Helm
                        </MockBadge>
                      )}
                    </span>
                    <span className="mt-0.5 block truncate text-[10px] text-muted-foreground">
                      {c.descs[repo.desc]}
                    </span>
                  </td>
                  <td className="hidden px-2 py-2 text-right tabular-nums @2xl:table-cell">
                    {repo.tags}
                  </td>
                  <td className="hidden px-2 py-2 text-right tabular-nums @4xl:table-cell">
                    {repo.manifests}
                  </td>
                  <td className="hidden px-2 py-2 text-right whitespace-nowrap tabular-nums @2xl:table-cell">
                    {repo.size}
                  </td>
                  <td className="hidden px-2 py-2 text-[10px] whitespace-nowrap text-muted-foreground tabular-nums @4xl:table-cell">
                    {repo.pushed}
                  </td>
                  <td className="px-1 py-2">
                    <span className="flex items-center gap-0.5">
                      <span className="flex size-6 items-center justify-center rounded-md">
                        <Tags className="size-3.5" />
                      </span>
                      <span className="flex size-6 items-center justify-center rounded-md text-destructive">
                        <Trash2 className="size-3.5" />
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* guide */}
        <Card title={c.guideTitle}>
          <div className="flex flex-col gap-2.5 text-[11px]">
            <p className="text-muted-foreground">
              {c.guideDesc}{' '}
              <span className="underline underline-offset-4">{c.tokenLink}</span>
            </p>
            <div>
              <p className="mb-1 text-[10px] text-muted-foreground">{c.login}</p>
              <Code lines={[`docker login ${host} -u ${proj}`]} />
            </div>
            <div>
              <p className="mb-1 text-[10px] text-muted-foreground">{c.push}</p>
              <Code
                lines={[
                  `docker tag rfdetr-infer:1.4.0 ${host}/${proj}/rfdetr-infer:1.4.0`,
                  `docker push ${host}/${proj}/rfdetr-infer:1.4.0`,
                ]}
              />
            </div>
            <div className="hidden @2xl:block">
              <p className="mb-1 text-[10px] text-muted-foreground">{c.pull}</p>
              <Code lines={[`docker pull ${host}/${proj}/rfdetr-infer:1.4.0`]} />
            </div>
          </div>
        </Card>
      </div>
    </MockAppFrame>
  );
}
