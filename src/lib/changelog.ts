/**
 * Changelog entries, newest first. Titles and bodies live in
 * `translations/changelog.ts` under the same id. Dates are when the feature
 * landed in app.cvp.run (its commit history), and `page` links the entry to
 * the feature page that describes it.
 */
import type {FeatureSlug} from '@/lib/site';
import type {changelog} from '@/lib/translations/changelog';

export type ChangelogTag =
  | 'labeling'
  | 'ml'
  | 'data'
  | 'edge'
  | 'workspace'
  | 'developers'
  | 'security';

export type ChangelogId = keyof (typeof changelog)['ko']['changelogPage']['entries'];

export type ChangelogEntry = {
  id: ChangelogId;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  tag: ChangelogTag;
  /** Feature page, or the security page, that covers the change. */
  page?: FeatureSlug | 'security';
};

export const CHANGELOG_TAGS: readonly ChangelogTag[] = [
  'labeling',
  'ml',
  'data',
  'edge',
  'workspace',
  'developers',
  'security',
];

export const CHANGELOG: readonly ChangelogEntry[] = [
  {id: 'videoConverter', date: '2026-10-23', tag: 'workspace', page: 'media'},
  {id: 'twoFactor', date: '2026-10-23', tag: 'security', page: 'security'},
  {id: 'sampleList', date: '2026-10-14', tag: 'data', page: 'datasets'},
  {id: 'plyLabelRules', date: '2026-10-13', tag: 'labeling', page: 'pointClouds'},
  {id: 'cobotReplay', date: '2026-10-12', tag: 'edge', page: 'twin'},
  {id: 'teachImport', date: '2026-10-12', tag: 'edge', page: 'collectors'},
  {id: 'glossary', date: '2026-10-12', tag: 'ml', page: 'mlops'},
  {id: 'runDetail', date: '2026-10-12', tag: 'ml', page: 'mlops'},
  {id: 'inferenceSection', date: '2026-10-10', tag: 'ml', page: 'inference'},
  {id: 'modbusDevices', date: '2026-10-09', tag: 'edge', page: 'modbus'},
  {id: 'mlflowTracking', date: '2026-10-09', tag: 'ml', page: 'training'},
  {id: 'mlopsRevamp', date: '2026-10-07', tag: 'ml', page: 'mlops'},
  {id: 'videoFlows', date: '2026-10-04', tag: 'workspace', page: 'media'},
  {id: 's3Api', date: '2026-10-01', tag: 'developers', page: 'developers'},
  {id: 'agentCompat', date: '2026-10-01', tag: 'edge', page: 'agents'},
  {id: 'collectors', date: '2026-09-30', tag: 'edge', page: 'collectors'},
  {id: 'agentLimits', date: '2026-09-30', tag: 'edge', page: 'agents'},
  {id: 'timeSeries', date: '2026-09-24', tag: 'labeling', page: 'timeSeries'},
  {id: 'timeSeriesModels', date: '2026-09-24', tag: 'ml', page: 'training'},
  {id: 'pointceptAutolabel', date: '2026-09-23', tag: 'labeling', page: 'pointClouds'},
  {id: 'polygonCleanup', date: '2026-09-16', tag: 'labeling', page: 'images'},
  {id: 'uploadWizard', date: '2026-09-15', tag: 'data', page: 'datasets'},
  {id: 'slugUrls', date: '2026-09-09', tag: 'workspace'},
  {id: 'standaloneCli', date: '2026-09-07', tag: 'developers', page: 'developers'},
  {id: 'pipChannels', date: '2026-09-07', tag: 'developers', page: 'registry'},
  {id: 'editorAutoLabel', date: '2026-08-31', tag: 'labeling', page: 'images'},
  {id: 'fileViewers', date: '2026-08-31', tag: 'workspace', page: 'collaboration'},
  {id: 'twinVr', date: '2026-08-30', tag: 'edge', page: 'twin'},
  {id: 'vrVideo', date: '2026-08-29', tag: 'workspace', page: 'media'},
  {id: 'liveRecording', date: '2026-08-28', tag: 'workspace', page: 'media'},
  {id: 'subtitleChapters', date: '2026-08-25', tag: 'workspace', page: 'media'},
  {id: 'sessions', date: '2026-08-25', tag: 'security', page: 'security'},
  {id: 'wikiShare', date: '2026-08-20', tag: 'workspace', page: 'collaboration'},
  {id: 'gridForms', date: '2026-08-19', tag: 'workspace', page: 'grids'},
  {id: 'agentStorage', date: '2026-08-14', tag: 'edge', page: 'agents'},
  {id: 'agentMetrics', date: '2026-08-13', tag: 'edge', page: 'agents'},
  {id: 'datasetQa', date: '2026-07-31', tag: 'data', page: 'datasets'},
  {id: 'downloader', date: '2026-07-31', tag: 'edge', page: 'agents'},
  {id: 'wikiSlides', date: '2026-07-24', tag: 'workspace', page: 'collaboration'},
  {id: 'meetingRoom', date: '2026-07-22', tag: 'workspace', page: 'meetings'},
  {id: 'store', date: '2026-07-21', tag: 'workspace', page: 'store'},
  {id: 'dimensions', date: '2026-07-20', tag: 'labeling', page: 'pointClouds'},
  {id: 'rfdetrTasks', date: '2026-07-20', tag: 'ml', page: 'training'},
  {id: 'videoTracks', date: '2026-07-18', tag: 'labeling', page: 'videos'},
  {id: 'magicWand', date: '2026-07-17', tag: 'labeling', page: 'images'},
  {id: 'registries', date: '2026-07-12', tag: 'developers', page: 'registry'},
  {id: 'activityFeed', date: '2026-07-12', tag: 'workspace', page: 'collaboration'},
];

/** Entries grouped by month (`YYYY-MM`), in the order they appear. */
export function changelogByMonth(
  entries: readonly ChangelogEntry[],
): {month: string; entries: ChangelogEntry[]}[] {
  const groups: {month: string; entries: ChangelogEntry[]}[] = [];
  for (const entry of entries) {
    const month = entry.date.slice(0, 7);
    const last = groups[groups.length - 1];
    if (last && last.month === month) {
      last.entries.push(entry);
    } else {
      groups.push({month, entries: [entry]});
    }
  }
  return groups;
}
