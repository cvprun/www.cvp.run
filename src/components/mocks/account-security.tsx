import {
  ChevronRight,
  House,
  KeyRound,
  LogOut,
  MonitorSmartphone,
  ShieldCheck,
  SlidersHorizontal,
  Terminal,
  UserRound,
} from 'lucide-react';

import {Logo} from '@/components/logo';
import {MockButton} from '@/components/mocks/app-frame';
import {MockChrome, MockWindow} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * Account › 보안 and 세션 (`/account/security`, `/account/sessions`): the
 * two-factor card with an enrolled authenticator (`_TwoFactorCard`), then the
 * session list — device, location, sign-in method, last activity — with the
 * "sign out all other devices" action. Shown with the account sidebar.
 */
const COPY = {
  ko: {
    home: '홈',
    account: '계정',
    nav: ['프로필', '보안', '세션', 'CLI 토큰', '환경설정'],
    title: '보안',
    twoFactor: '2단계 인증',
    twoFactorHint: '계정에 추가 보안 계층을 설정합니다.',
    enrolled: '등록됨',
    authenticator: '인증기 앱(TOTP)',
    authenticatorHint: '로그인할 때마다 인증기 앱의 6자리 코드를 확인합니다.',
    remove: '해제',
    sessions: '세션',
    signOutOthers: '다른 모든 기기에서 로그아웃',
    cols: ['기기', '위치', '로그인 방식', '마지막 활동', ''],
    current: '현재 세션',
    mfa: '2단계 인증',
    signOut: '로그아웃',
    rows: [
      {
        device: 'Chrome · macOS',
        where: 'Seoul, KR',
        method: '비밀번호',
        last: '지금',
        current: true,
        mfa: true,
      },
      {
        device: 'Safari · iOS',
        where: 'Seoul, KR',
        method: '소셜 로그인',
        last: '2시간 전',
        current: false,
        mfa: true,
      },
      {
        device: 'Firefox · Ubuntu',
        where: 'Busan, KR',
        method: '일회용 코드',
        last: '3일 전',
        current: false,
        mfa: false,
      },
    ],
  },
  en: {
    home: 'Home',
    account: 'Account',
    nav: ['Profile', 'Security', 'Sessions', 'CLI tokens', 'Preferences'],
    title: 'Security',
    twoFactor: 'Two-Factor Authentication',
    twoFactorHint: 'Add an extra layer of security to your account.',
    enrolled: 'Enrolled',
    authenticator: 'Authenticator app (TOTP)',
    authenticatorHint:
      'Every sign-in asks for the 6-digit code from your authenticator app.',
    remove: 'Remove',
    sessions: 'Sessions',
    signOutOthers: 'Sign out all other devices',
    cols: ['Device', 'Location', 'Sign-in method', 'Last active', ''],
    current: 'This device',
    mfa: 'Two-factor',
    signOut: 'Sign out',
    rows: [
      {
        device: 'Chrome · macOS',
        where: 'Seoul, KR',
        method: 'Password',
        last: 'Now',
        current: true,
        mfa: true,
      },
      {
        device: 'Safari · iOS',
        where: 'Seoul, KR',
        method: 'Social sign-in',
        last: '2 hours ago',
        current: false,
        mfa: true,
      },
      {
        device: 'Firefox · Ubuntu',
        where: 'Busan, KR',
        method: 'One-time code',
        last: '3 days ago',
        current: false,
        mfa: false,
      },
    ],
  },
} as const;

const NAV_ICONS = [
  UserRound,
  ShieldCheck,
  MonitorSmartphone,
  Terminal,
  SlidersHorizontal,
];

export function MockAccountSecurity() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockWindow className="@container">
      <MockChrome />
      <div className="flex min-h-[24rem] text-sm">
        <aside className="hidden w-44 shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-2 py-3 @2xl:flex">
          <span className="mb-3 flex h-6 items-center justify-center">
            <Logo />
          </span>
          <p className="px-2 pb-1 text-[9px] font-medium text-sidebar-foreground/50">
            {c.account}
          </p>
          {c.nav.map((label, i) => {
            const Icon = NAV_ICONS[i];
            return (
              <span
                key={label}
                className={cn(
                  'relative flex items-center gap-2 rounded-md px-2 py-[5px] text-[11px]',
                  i === 1
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/65',
                )}
              >
                {i === 1 && (
                  <span className="absolute top-1 bottom-1 left-0 w-px bg-sidebar-primary" />
                )}
                <Icon className="size-3.5 shrink-0" />
                {label}
              </span>
            );
          })}
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex h-9 items-center gap-1 border-b border-border px-4 text-[11px] text-muted-foreground">
            <House className="size-3.5" />
            {c.home}
            <ChevronRight className="size-3" />
            <UserRound className="size-3.5" />
            {c.account}
            <ChevronRight className="size-3" />
            <ShieldCheck className="size-3.5" />
            <span className="font-medium text-foreground">{c.title}</span>
          </div>

          <div className="space-y-3 px-4 py-4 sm:px-5">
            <div className="rounded-md border border-border bg-card px-3 py-2.5">
              <p className="text-[11px] font-semibold">{c.twoFactor}</p>
              <p className="text-[9.5px] text-muted-foreground">{c.twoFactorHint}</p>
              <div className="mt-2 flex items-center gap-2.5 rounded-md border border-border px-2.5 py-2">
                <KeyRound className="size-4 shrink-0 text-muted-foreground" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-[10.5px] font-medium">
                    {c.authenticator}
                    <span className="rounded-md bg-emerald-500/15 px-1 text-[8.5px] font-medium text-emerald-700 dark:text-emerald-400">
                      {c.enrolled}
                    </span>
                  </span>
                  <span className="block truncate text-[9px] text-muted-foreground">
                    {c.authenticatorHint}
                  </span>
                </span>
                <MockButton>{c.remove}</MockButton>
              </div>
            </div>

            <div className="rounded-md border border-border bg-card">
              <div className="flex items-center gap-2 px-3 pt-2.5 pb-2">
                <p className="text-[11px] font-semibold">{c.sessions}</p>
                <MockButton icon={LogOut} className="ml-auto">
                  {c.signOutOthers}
                </MockButton>
              </div>
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="border-t border-border bg-muted/50 text-left text-[9.5px] text-muted-foreground">
                    {c.cols.map((col, i) => (
                      <th
                        key={i}
                        className={cn(
                          'px-3 py-1.5 font-medium',
                          (i === 1 || i === 2) && 'hidden @xl:table-cell',
                        )}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.rows.map(row => (
                    <tr key={row.device} className="border-t border-border">
                      <td className="px-3 py-1.5">
                        <span className="flex flex-wrap items-center gap-1">
                          <span className="font-medium">{row.device}</span>
                          {row.current && (
                            <span className="rounded bg-secondary px-1 text-[8.5px]">
                              {c.current}
                            </span>
                          )}
                          {row.mfa && (
                            <span className="rounded border border-border px-1 text-[8.5px] text-muted-foreground">
                              {c.mfa}
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="hidden px-3 py-1.5 text-muted-foreground @xl:table-cell">
                        {row.where}
                      </td>
                      <td className="hidden px-3 py-1.5 text-muted-foreground @xl:table-cell">
                        {row.method}
                      </td>
                      <td className="px-3 py-1.5 text-muted-foreground">{row.last}</td>
                      <td className="px-3 py-1.5 text-right">
                        {!row.current && (
                          <span className="text-[9.5px] text-muted-foreground underline-offset-2">
                            {c.signOut}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MockWindow>
  );
}
