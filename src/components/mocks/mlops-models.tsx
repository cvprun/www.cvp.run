import {ArrowRightLeft, Boxes, Crown, Pencil, X} from 'lucide-react';

import {MockAppFrame, MockButton} from '@/components/mocks/app-frame';
import {AliasChip, mlopsTabs} from '@/components/mocks/mlops-ui';
import {useLanguage} from '@/lib/i18n';
import {cn} from '@/lib/utils';

/**
 * MLOps › 모델 › model detail (`/proj/:id/mlops/models/:modelName`): the
 * description card, the three fixed alias lanes (@production · @staging ·
 * @previous) and the champion-and-challenger comparison with its one-click
 * promotion. Values follow the models story.
 */
const COPY = {
  ko: {
    description: '설명',
    descriptionText: '용접 비드 표면 결함(기공·균열) 탐지 모델 · 3라인 검사 셀',
    edit: '설명 편집',
    aliases: '별칭',
    since: (d: string) => `${d}부터`,
    from: (r: string) => `출처 ${r}`,
    move: '옮기기',
    champion: '챔피언과 도전자',
    promote: 'v6 → @production',
    change: '차이',
    versions: '버전',
    lanes: [
      {
        alias: 'production' as const,
        version: 'v5',
        since: '10월 20일',
        metric: 'mAP_50 0.838',
        run: '용접 비드 결함 탐지 #3',
      },
      {
        alias: 'staging' as const,
        version: 'v6',
        since: '10월 24일',
        metric: 'mAP_50 0.851',
        run: '용접 비드 결함 탐지 #5',
      },
      {
        alias: 'previous' as const,
        version: 'v4',
        since: '10월 20일',
        metric: 'mAP_50 0.802',
        run: '용접 비드 결함 탐지 #2',
      },
    ],
  },
  en: {
    description: 'Description',
    descriptionText:
      'Weld bead surface defects (porosity, cracks) · line 3 inspection cell',
    edit: 'Edit description',
    aliases: 'Aliases',
    since: (d: string) => `since ${d}`,
    from: (r: string) => `From ${r}`,
    move: 'Move',
    champion: 'Champion and challenger',
    promote: 'v6 → @production',
    change: 'Change',
    versions: 'Versions',
    lanes: [
      {
        alias: 'production' as const,
        version: 'v5',
        since: 'Oct 20',
        metric: 'mAP_50 0.838',
        run: 'Weld bead defect detection #3',
      },
      {
        alias: 'staging' as const,
        version: 'v6',
        since: 'Oct 24',
        metric: 'mAP_50 0.851',
        run: 'Weld bead defect detection #5',
      },
      {
        alias: 'previous' as const,
        version: 'v4',
        since: 'Oct 20',
        metric: 'mAP_50 0.802',
        run: 'Weld bead defect detection #2',
      },
    ],
  },
} as const;

const DUEL: {
  key: string;
  champion: string;
  challenger: string;
  delta: string;
  better: boolean;
}[] = [
  {
    key: 'val/mAP_50',
    champion: '0.838',
    challenger: '0.851',
    delta: '+0.013',
    better: true,
  },
  {
    key: 'val/mAP_50_95',
    champion: '0.590',
    challenger: '0.603',
    delta: '+0.013',
    better: true,
  },
  {
    key: 'val/loss',
    champion: '0.95',
    challenger: '1.02',
    delta: '+0.07',
    better: false,
  },
];

export function MockMlopsModels() {
  const {lang} = useLanguage();
  const c = COPY[lang];
  const modelsLabel = lang === 'ko' ? '모델' : 'Models';

  return (
    <MockAppFrame
      activeNav="mlops"
      crumbs={[
        {icon: Boxes, label: modelsLabel},
        {icon: Boxes, label: 'weld-defect-detector'},
      ]}
      title="weld-defect-detector"
      titleIcon={Boxes}
      tabs={mlopsTabs(lang, 'models')}
    >
      <div className="space-y-3">
        <div className="flex items-start gap-3 rounded-md border border-border bg-card px-3 py-2.5">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold">{c.description}</p>
            <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
              {c.descriptionText}
            </p>
          </div>
          <MockButton icon={Pencil}>{c.edit}</MockButton>
        </div>

        <div>
          <p className="mb-1.5 text-[11px] font-semibold">{c.aliases}</p>
          <div className="grid gap-2 @2xl:grid-cols-3">
            {c.lanes.map(lane => (
              <div
                key={lane.alias}
                className={cn(
                  'rounded-md border p-3',
                  lane.alias === 'previous'
                    ? 'border-dashed border-border'
                    : 'border-border',
                )}
              >
                <div className="flex items-center gap-1.5">
                  <AliasChip alias={lane.alias} />
                  <span className="text-[9px] text-muted-foreground">
                    {c.since(lane.since)}
                  </span>
                </div>
                <p className="mt-2 text-xl leading-none font-semibold tracking-tight">
                  {lane.version}
                </p>
                <p className="mt-1.5 font-mono text-[9.5px]">{lane.metric}</p>
                <p className="mt-0.5 truncate text-[9px] text-muted-foreground">
                  {c.from(lane.run)}
                </p>
                <div className="mt-2.5 flex gap-1">
                  <MockButton icon={ArrowRightLeft}>{c.move}</MockButton>
                  <MockButton icon={X} variant="ghost" className="px-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-border bg-card">
          <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-2">
            <Crown className="size-3.5 text-muted-foreground" />
            <span className="text-[11px] font-semibold">{c.champion}</span>
            <MockButton variant="default" className="ml-auto font-mono">
              {c.promote}
            </MockButton>
          </div>
          <table className="w-full border-t border-border text-[9.5px]">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground">
                <th className="px-3 py-1.5 text-left font-medium" />
                <th className="px-3 py-1.5 text-right font-medium">
                  <span className="inline-flex items-center gap-1">
                    <AliasChip alias="production" /> v5
                  </span>
                </th>
                <th className="px-3 py-1.5 text-right font-medium">v6</th>
                <th className="px-3 py-1.5 text-right font-medium">{c.change}</th>
              </tr>
            </thead>
            <tbody>
              {DUEL.map(row => (
                <tr key={row.key} className="border-t border-border">
                  <td className="px-3 py-1.5 font-mono text-muted-foreground">
                    {row.key}
                  </td>
                  <td className="px-3 py-1.5 text-right font-mono tabular-nums">
                    {row.champion}
                  </td>
                  <td className="px-3 py-1.5 text-right font-mono tabular-nums">
                    {row.challenger}
                  </td>
                  <td
                    className={cn(
                      'px-3 py-1.5 text-right font-mono tabular-nums',
                      row.better
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : 'text-red-700 dark:text-red-400',
                    )}
                  >
                    {row.delta}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MockAppFrame>
  );
}
