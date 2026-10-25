import {Check, Copy, Eye, KeyRound, Plus} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * 설정 › 액세스 토큰 › 새 토큰, right after creating a token with a storage
 * scope (`_S3CredentialsPanel.tsx`): the one-time token, then the S3
 * credentials derived from it — endpoint, bucket (project slug), region,
 * `CVPAK…` access key ID and the hidden secret — with the DVC snippet open.
 * The snippet is the client guide's (`docs/guides/s3-client.md`).
 */
const COPY = {
  ko: {
    title: '새 토큰',
    tokens: '액세스 토큰',
    copyNow: '지금 토큰을 복사하십시오',
    copyNowHint: '이 화면을 벗어나면 토큰을 다시 볼 수 없습니다.',
    s3Title: 'S3 자격 증명',
    s3Hint:
      'DVC·aws CLI·rclone 같은 S3 클라이언트로 이 프로젝트의 파일에 접근할 때 사용하는 값입니다. 시크릿 액세스 키는 토큰처럼 지금 한 번만 확인할 수 있습니다.',
    fields: ['엔드포인트', '버킷', '리전', '액세스 키 ID', '시크릿 액세스 키'],
    showSecret: '시크릿 보기',
    snippets: ['DVC 원격 설정', 'aws CLI', 'rclone 설정'],
  },
  en: {
    title: 'New token',
    tokens: 'Access Tokens',
    copyNow: 'Copy your token now',
    copyNowHint: 'You will not see this token again once you leave this screen.',
    s3Title: 'S3 credentials',
    s3Hint:
      "Use these with S3 clients such as DVC, the aws CLI or rclone to reach this project's files. Like the token, the secret access key is shown only now.",
    fields: ['Endpoint', 'Bucket', 'Region', 'Access key ID', 'Secret access key'],
    showSecret: 'Show secret',
    snippets: ['DVC remote', 'aws CLI', 'rclone config'],
  },
} as const;

const VALUES = [
  'https://app.cvp.run/s3',
  'weld-line',
  'auto',
  'CVPAK3F9C2E1B7D44A0E8C51D2B96A7F0E31',
  '••••••••••••••••••••••••••••••••••••••••••',
];

const DVC = [
  'dvc remote add -d cvp s3://weld-line/dvc',
  'dvc remote modify cvp endpointurl https://app.cvp.run/s3',
  'dvc remote modify cvp region auto',
  'dvc remote modify --local cvp access_key_id CVPAK3F9C…',
  'dvc remote modify --local cvp secret_access_key ••••••',
  'dvc add data && dvc push',
];

export function MockS3Credentials() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockAppFrame
      activeNav="settings"
      crumbs={[
        {icon: KeyRound, label: c.tokens},
        {icon: Plus, label: c.title},
      ]}
      title={c.title}
      titleIcon={Plus}
    >
      <div className="space-y-2.5">
        <div className="rounded-md border border-emerald-500/40 bg-emerald-500/5 px-3 py-2">
          <p className="flex items-center gap-1.5 text-[10.5px] font-semibold">
            <Check className="size-3 text-emerald-600" strokeWidth={2.5} />
            {c.copyNow}
          </p>
          <p className="mt-0.5 text-[9.5px] text-muted-foreground">{c.copyNowHint}</p>
          <span className="mt-1.5 flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1 font-mono text-[9.5px]">
            <span className="min-w-0 flex-1 truncate">
              cvp_8f2a61d0c4b9e37f5a1d6c08b2e94f7a3d5c1e60b8f24a97c3e1d5f0a6b2c84e
            </span>
            <Copy className="size-3 shrink-0 text-muted-foreground" />
          </span>
        </div>

        <div className="rounded-md border border-border bg-card px-3 py-2.5">
          <p className="text-[10.5px] font-semibold">{c.s3Title}</p>
          <p className="mt-0.5 text-[9.5px] leading-snug text-muted-foreground">
            {c.s3Hint}
          </p>
          <dl className="mt-2 grid gap-x-4 gap-y-1.5 @2xl:grid-cols-2">
            {c.fields.map((label, i) => (
              <div key={label} className={cn(i >= 3 && '@2xl:col-span-2')}>
                <dt className="text-[9px] text-muted-foreground">{label}</dt>
                <dd className="mt-0.5 flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 font-mono text-[9.5px]">
                  <span className="min-w-0 flex-1 truncate">{VALUES[i]}</span>
                  {i === 4 ? (
                    <span className="flex shrink-0 items-center gap-1 font-sans text-[9px] text-muted-foreground">
                      <Eye className="size-3" />
                      {c.showSecret}
                    </span>
                  ) : (
                    <Copy className="size-3 shrink-0 text-muted-foreground" />
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-2.5 overflow-hidden rounded-md border border-border">
            <div className="flex border-b border-border bg-muted/40 text-[9.5px]">
              {c.snippets.map((label, i) => (
                <span
                  key={label}
                  className={cn(
                    '-mb-px border-b-2 px-2.5 py-1 font-medium',
                    i === 0
                      ? 'border-primary text-foreground'
                      : 'border-transparent text-muted-foreground',
                  )}
                >
                  {label}
                </span>
              ))}
              <MockButton icon={Copy} variant="ghost" className="ml-auto" />
            </div>
            <pre className="overflow-hidden bg-background px-2.5 py-2 font-mono text-[9px] leading-relaxed">
              {DVC.join('\n')}
            </pre>
          </div>
        </div>
      </div>
    </MockAppFrame>
  );
}
