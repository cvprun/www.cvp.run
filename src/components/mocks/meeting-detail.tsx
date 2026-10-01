import {Mic, Radio, Users, Video} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {MockBadge} from '@/components/mocks/mock-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

type Status = 'recording' | 'uploaded' | 'transcribing' | 'summarizing' | 'done';

const COPY = {
  ko: {
    title: '회의록',
    record: '녹음 시작',
    startMeeting: '회의 시작',
    liveTitle: '진행 중인 회의',
    liveBadge: 'LIVE',
    recordingOn: '녹음 켜짐',
    guestsAllowed: '게스트 허용',
    join: '참여',
    recordingSection: '회의록',
    columns: ['제목', '상태', '길이', '수정됨'],
    status: {
      recording: '녹음 중',
      uploaded: '업로드됨',
      transcribing: '전사 중',
      summarizing: '요약 중',
      done: '완료',
    },
    live: [
      {title: '라벨링 가이드 v3 리뷰', recording: true, guests: true},
      {title: '센서 캘리브레이션 스탠드업', recording: false, guests: false},
    ],
    rows: [
      '라벨링 가이드 v3 리뷰',
      '주간 회의 - 9월 30일',
      '고객사 PoC 킥오프',
      'RF-DETR 재학습 결과 공유',
      '주간 회의 - 9월 23일',
    ],
  },
  en: {
    title: 'Meetings',
    record: 'Record',
    startMeeting: 'Start meeting',
    liveTitle: 'Live meetings',
    liveBadge: 'LIVE',
    recordingOn: 'Recording on',
    guestsAllowed: 'Guests allowed',
    join: 'Join',
    recordingSection: 'Recordings',
    columns: ['Title', 'Status', 'Duration', 'Updated'],
    status: {
      recording: 'Recording',
      uploaded: 'Uploaded',
      transcribing: 'Transcribing',
      summarizing: 'Summarizing',
      done: 'Done',
    },
    live: [
      {title: 'Labeling guide v3 review', recording: true, guests: true},
      {title: 'Sensor calibration stand-up', recording: false, guests: false},
    ],
    rows: [
      'Labeling guide v3 review',
      'Weekly sync - Sep 30',
      'Customer PoC kickoff',
      'RF-DETR retraining results',
      'Weekly sync - Sep 23',
    ],
  },
} as const;

/** Recording rows: status, duration, updated, from a video meeting. */
const ROWS: {status: Status; duration: string; updated: string; video: boolean}[] = [
  {status: 'recording', duration: '—', updated: '2026-10-01 10:02:41', video: true},
  {
    status: 'summarizing',
    duration: '48:12',
    updated: '2026-09-30 16:21:08',
    video: false,
  },
  {
    status: 'transcribing',
    duration: '1:12:30',
    updated: '2026-09-29 14:47:55',
    video: true,
  },
  {status: 'uploaded', duration: '22:05', updated: '2026-09-26 11:30:19', video: false},
  {status: 'done', duration: '51:40', updated: '2026-09-23 17:05:02', video: false},
];

/** `MeetingStatusBadge`: destructive / secondary / default badge variants. */
function StatusBadge({status, label}: {status: Status; label: string}) {
  if (status === 'recording') {
    return (
      <MockBadge tone="destructive" className="bg-destructive text-white">
        {label}
      </MockBadge>
    );
  }
  return (
    <MockBadge tone={status === 'done' ? 'primary' : 'secondary'}>{label}</MockBadge>
  );
}

function Checkbox() {
  return <span className="block size-3 rounded-[3px] border border-input" />;
}

export function MockMeetingDetail() {
  const {lang} = useLanguage();
  const c = COPY[lang];

  return (
    <MockAppFrame
      activeNav="meetings"
      title={c.title}
      actions={
        <>
          <MockButton icon={Mic}>{c.record}</MockButton>
          <MockButton icon={Video} variant="default">
            {c.startMeeting}
          </MockButton>
        </>
      }
    >
      {/* live meetings */}
      <section className="mb-6">
        <div className="mb-2 flex items-center gap-1.5">
          <h4 className="text-[11px] font-medium">{c.liveTitle}</h4>
          <span className="flex items-center gap-1 rounded-full bg-destructive/10 px-1.5 py-px text-[9px] font-semibold text-destructive">
            <span className="size-1 animate-pulse rounded-full bg-destructive" />
            {c.live.length}
          </span>
        </div>
        <div className="space-y-1.5">
          {c.live.map(room => (
            <div
              key={room.title}
              className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 rounded-xl border border-border bg-card px-3 py-2"
            >
              <span className="flex items-center gap-1 rounded-full bg-destructive/10 px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-destructive uppercase">
                <Radio className="size-2.5 animate-pulse" />
                {c.liveBadge}
              </span>
              <span className="min-w-0 flex-1 truncate text-[11px] font-medium">
                {room.title}
              </span>
              {room.recording && (
                <span className="hidden rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground @xl:inline">
                  {c.recordingOn}
                </span>
              )}
              {room.guests && (
                <span className="hidden items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground @xl:flex">
                  <Users className="size-3" />
                  {c.guestsAllowed}
                </span>
              )}
              <MockButton icon={Video} variant="default">
                {c.join}
              </MockButton>
            </div>
          ))}
        </div>
      </section>

      {/* recordings */}
      <h4 className="mb-2 text-[11px] font-medium">{c.recordingSection}</h4>
      <div className="overflow-hidden rounded-md border border-border bg-card">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="h-8 border-b border-border text-left text-muted-foreground">
              <th className="w-0 pr-1 pl-2.5">
                <Checkbox />
              </th>
              <th className="px-2 font-medium">{c.columns[0]}</th>
              <th className="w-24 px-2 font-medium">{c.columns[1]}</th>
              <th className="hidden px-2 text-right font-medium @2xl:table-cell">
                {c.columns[2]}
              </th>
              <th className="hidden w-36 px-2 font-medium @3xl:table-cell">
                {c.columns[3]}
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={i} className={cn(i > 0 && 'border-t border-border')}>
                <td className="py-2 pr-1 pl-2.5">
                  <Checkbox />
                </td>
                <td className="px-2 py-2">
                  <span className="flex min-w-0 items-center gap-1.5">
                    {row.video && (
                      <Video className="size-3 shrink-0 text-muted-foreground" />
                    )}
                    <span className="truncate font-medium">{c.rows[i]}</span>
                  </span>
                </td>
                <td className="px-2 py-2">
                  <StatusBadge status={row.status} label={c.status[row.status]} />
                </td>
                <td className="hidden px-2 py-2 text-right tabular-nums text-muted-foreground @2xl:table-cell">
                  {row.duration}
                </td>
                <td className="hidden px-2 py-2 text-[10px] tabular-nums text-muted-foreground @3xl:table-cell">
                  {row.updated}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MockAppFrame>
  );
}
