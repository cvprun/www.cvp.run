import {
  CheckCircle2,
  ExternalLink,
  List,
  PenLine,
  Printer,
  ShieldCheck,
  SlidersHorizontal,
  Undo2,
  User,
  UserCheck,
  X,
} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {MockBadge} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * E-signature request detail (`/proj/:id/signatures/:requestId`): header with
 * status badge + author/submitted meta and sign/reject/withdraw/print, the
 * Markdown body, the stamp grid (`SignatureStampGrid`, one row per stage),
 * the integrity panel (`SignatureChainPanel`) and the history
 * (`SignatureTimeline`).
 */

const COPY = {
  ko: {
    docTitle: '2026년 10월 설비 투자 품의',
    tabs: ['전체', '내 차례', '내 기안', '결재선 프리셋'],
    inProgress: '진행 중',
    author: '기안자',
    submitted: '상신',
    sign: '서명',
    reject: '반려',
    withdraw: '회수',
    print: '인쇄',
    body: '본문',
    attachments: '첨부',
    line: '결재선',
    timeline: '이력',
    stage: (n: number) => `${n}단계`,
    lineType: {approval: '결재', agreement: '합의', reference: '참조'},
    stepStatus: {signed: '서명함', pending: '서명 차례', waiting: '대기'},
    waitingHere: '여기서 대기 중',
    notSigned: '미서명',
    verify: '무결성 검증',
    verifyValid: '서명 2건이 모두 검증되었습니다.',
    clientVerified: '브라우저에서 다시 계산한 해시도 일치합니다.',
    contentHash: '문서 해시',
    recordHash: '레코드 해시',
    md: {
      h: '개요',
      p: '용접 셀 A동의 생산 능력 확대를 위해 협동로봇 2대와 용접 포지셔너 1대를 도입하고자 합니다. 디지털 트윈 시뮬레이션 결과 사이클 타임이 18% 단축됩니다.',
      items: [
        ['협동로봇 (6축, 가반 12 kg) × 2', '84,000,000원'],
        ['용접 포지셔너 (2축) × 1', '23,500,000원'],
        ['설치·시운전', '6,200,000원'],
      ],
      total: ['합계', '113,700,000원'],
    },
    attachment: '견적서_2026-09.pdf',
    names: {
      kim: '김하늘',
      park: '박도윤',
      lee: '이서연',
      jung: '정민재',
    },
    events: {
      created: '기안을 작성했습니다',
      submitted: '상신했습니다',
      signed: '서명했습니다',
    },
  },
  en: {
    docTitle: 'Oct 2026 equipment investment request',
    tabs: ['All', 'My turn', 'My requests', 'Approval line presets'],
    inProgress: 'In progress',
    author: 'Author',
    submitted: 'Submitted',
    sign: 'Sign',
    reject: 'Reject',
    withdraw: 'Withdraw',
    print: 'Print',
    body: 'Body',
    attachments: 'Attachments',
    line: 'Approval line',
    timeline: 'History',
    stage: (n: number) => `Stage ${n}`,
    lineType: {approval: 'Approval', agreement: 'Agreement', reference: 'Reference'},
    stepStatus: {signed: 'Signed', pending: 'Your turn', waiting: 'Waiting'},
    waitingHere: 'Waiting here',
    notSigned: 'Not signed',
    verify: 'Verify integrity',
    verifyValid: 'All 2 signatures verified.',
    clientVerified: 'The hash recomputed in your browser matches too.',
    contentHash: 'Document hash',
    recordHash: 'Record hash',
    md: {
      h: 'Summary',
      p: 'To expand capacity in welding cell A, we request two collaborative robots and one welding positioner. The digital twin simulation shows an 18% shorter cycle time.',
      items: [
        ['Cobot (6-axis, 12 kg payload) × 2', 'KRW 84,000,000'],
        ['Welding positioner (2-axis) × 1', 'KRW 23,500,000'],
        ['Installation & commissioning', 'KRW 6,200,000'],
      ],
      total: ['Total', 'KRW 113,700,000'],
    },
    attachment: 'quote_2026-09.pdf',
    names: {
      kim: 'Haneul Kim',
      park: 'Doyun Park',
      lee: 'Seoyeon Lee',
      jung: 'Minjae Jung',
    },
    events: {
      created: 'drafted the request',
      submitted: 'submitted the request',
      signed: 'signed',
    },
  },
} as const;

type C = (typeof COPY)['ko' | 'en'];
type StepStatus = 'signed' | 'pending' | 'waiting';

const STATUS_BOX: Record<StepStatus, string> = {
  waiting: 'border-border bg-muted/20 text-muted-foreground',
  pending: 'border-primary ring-2 ring-primary/30 bg-background',
  signed: 'border-border bg-background',
};

/** A hand-drawn mark (registered signature image). */
function InkSignature() {
  return (
    <svg viewBox="0 0 120 48" className="h-11 w-24 text-[#1d3fbb] dark:text-[#8aa4ff]">
      <path
        d="M8 32c6-14 12-22 16-20s-6 22-3 24 10-18 14-18-2 16 2 16 8-12 12-12 0 10 4 10 6-8 10-9c3 0-1 8 3 8s10-10 14-12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 38c18-3 44-5 78-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.8"
      />
      <circle cx="96" cy="14" r="1.6" fill="currentColor" />
    </svg>
  );
}

type Step = {
  lineType: keyof C['lineType'];
  status: StepStatus;
  email: string;
  body: 'ink' | 'click' | 'none';
  name?: string;
  at?: string;
};

function Stamp({step, c}: {step: Step; c: C}) {
  return (
    <div
      className={cn(
        'flex w-28 flex-col rounded-md border text-center',
        STATUS_BOX[step.status],
      )}
    >
      <div className="border-b border-border px-1.5 py-0.5 text-[10px] font-medium">
        {c.lineType[step.lineType]}
      </div>
      <div className="flex h-14 items-center justify-center px-1.5">
        {step.body === 'ink' ? (
          <InkSignature />
        ) : step.body === 'click' ? (
          <div className="text-[10px]">
            <p className="font-medium">{step.name}</p>
            <p className="text-[9px] text-muted-foreground tabular-nums">{step.at}</p>
          </div>
        ) : (
          <span
            className={cn(
              'text-[10px]',
              step.status === 'pending'
                ? 'font-medium text-primary'
                : 'text-muted-foreground',
            )}
          >
            {step.status === 'pending' ? c.waitingHere : c.notSigned}
          </span>
        )}
      </div>
      <div className="space-y-px border-t border-border px-1.5 py-0.5 text-[9.5px]">
        <p className="truncate">{step.email}</p>
        <p className="text-muted-foreground">{c.stepStatus[step.status]}</p>
      </div>
    </div>
  );
}

export function MockSignatureDetail() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  const stages: Step[][] = [
    [
      {
        lineType: 'approval',
        status: 'signed',
        email: 'haneul@acme.ai',
        body: 'ink',
      },
      {
        lineType: 'approval',
        status: 'signed',
        email: 'doyun.park@acme.ai',
        body: 'click',
        name: c.names.park,
        at: '2026-09-30 09:05',
      },
    ],
    [
      {
        lineType: 'agreement',
        status: 'pending',
        email: 'seoyeon.lee@acme.ai',
        body: 'none',
      },
    ],
    [
      {
        lineType: 'reference',
        status: 'waiting',
        email: 'minjae.jung@acme.ai',
        body: 'none',
      },
    ],
  ];

  const events = [
    {actor: c.names.kim, text: c.events.created, at: '2026-09-29 10:12'},
    {actor: c.names.kim, text: c.events.submitted, at: '2026-09-29 10:40'},
    {actor: c.names.kim, text: c.events.signed, at: '2026-09-29 10:41'},
    {actor: c.names.park, text: c.events.signed, at: '2026-09-30 09:05'},
  ];

  return (
    <MockAppFrame
      activeNav="signatures"
      crumbs={[{label: c.docTitle}]}
      title={c.docTitle}
      meta={
        <>
          <MockBadge tone="primary">{c.inProgress}</MockBadge>
          <span className="hidden text-[10px] text-muted-foreground @4xl:inline">
            {c.author}: haneul@acme.ai
          </span>
          <span className="hidden text-[10px] text-muted-foreground tabular-nums @4xl:inline">
            {c.submitted}: 2026-09-29
          </span>
        </>
      }
      actions={
        <>
          <MockButton icon={PenLine} variant="default">
            {c.sign}
          </MockButton>
          <MockButton icon={X}>{c.reject}</MockButton>
          <MockButton icon={Undo2} variant="ghost" className="hidden @2xl:inline-flex">
            {c.withdraw}
          </MockButton>
          <MockButton icon={Printer}>{c.print}</MockButton>
        </>
      }
      tabs={[
        {icon: List, label: c.tabs[0], active: true},
        {icon: UserCheck, label: c.tabs[1]},
        {icon: User, label: c.tabs[2]},
        {icon: SlidersHorizontal, label: c.tabs[3]},
      ]}
    >
      <div className="grid gap-4 @4xl:grid-cols-3">
        <div className="flex flex-col gap-4 @4xl:col-span-2">
          {/* body */}
          <section className="space-y-1.5">
            <h4 className="text-[11px] font-medium text-muted-foreground">{c.body}</h4>
            <div className="rounded-md border border-border p-3 text-[11px] leading-relaxed">
              <p className="mb-1 text-[13px] font-semibold">{c.md.h}</p>
              <p className="mb-2 text-foreground/85">{c.md.p}</p>
              <table className="w-full text-[10px]">
                <tbody>
                  {c.md.items.map(([k, v]) => (
                    <tr key={k} className="border-b border-border">
                      <td className="py-1 pr-2">{k}</td>
                      <td className="py-1 text-right tabular-nums">{v}</td>
                    </tr>
                  ))}
                  <tr className="font-semibold">
                    <td className="py-1 pr-2">{c.md.total[0]}</td>
                    <td className="py-1 text-right tabular-nums">{c.md.total[1]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="flex items-center gap-2 pt-0.5 text-[10px]">
              <span className="text-muted-foreground">{c.attachments}</span>
              <span className="inline-flex items-center gap-1 text-primary">
                {c.attachment}
                <ExternalLink className="size-2.5" />
              </span>
            </p>
          </section>

          {/* approval line */}
          <section className="space-y-1.5">
            <h4 className="text-[11px] font-medium text-muted-foreground">{c.line}</h4>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {stages.map((steps, i) => (
                <div key={i} className="space-y-1.5">
                  <p className="text-[10px] font-medium text-muted-foreground">
                    {c.stage(i + 1)}
                  </p>
                  <div className="flex gap-2">
                    {steps.map(step => (
                      <Stamp key={step.email} step={step} c={c} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-4">
          {/* integrity */}
          <div className="space-y-2 rounded-md border border-border p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-medium">{c.verify}</p>
              <MockButton icon={ShieldCheck}>{c.verify}</MockButton>
            </div>
            <p className="flex items-start gap-1.5 text-[10px] text-muted-foreground">
              <CheckCircle2 className="mt-px size-3 shrink-0 text-emerald-600" />
              {c.clientVerified}
            </p>
            <p className="flex items-start gap-1.5 text-[10px] text-muted-foreground">
              <CheckCircle2 className="mt-px size-3 shrink-0 text-emerald-600" />
              {c.verifyValid}
            </p>
            <p className="font-mono text-[9px] break-all text-muted-foreground">
              {c.contentHash}:
              7f3a9c1e04b8d2f65a0e9b7c3d18f4a2e6c05b9d71a8e3f40c2b6d95e1f7a384
            </p>
            <p className="hidden font-mono text-[9px] break-all text-muted-foreground @4xl:block">
              {c.recordHash} #41:
              c94e2d07b1f8a36e5d02c7b9f41a8e63d5b0c2f97e14a6d83b5f09c2e7a1d468
            </p>
          </div>

          {/* history */}
          <section className="hidden space-y-2 @4xl:block">
            <h4 className="text-[11px] font-medium text-muted-foreground">
              {c.timeline}
            </h4>
            <ol className="space-y-2.5">
              {events.map((e, i) => (
                <li key={i} className="flex gap-2.5 text-[11px]">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  <div>
                    <p>
                      <span className="font-medium">{e.actor}</span>{' '}
                      <span className="text-muted-foreground">{e.text}</span>
                    </p>
                    <p className="text-[10px] text-muted-foreground tabular-nums">
                      {e.at}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </MockAppFrame>
  );
}
