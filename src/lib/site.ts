/**
 * Single source of truth for site paths, the feature-page registry, and links
 * to the product app (app.cvp.run).
 */

/** Product app origin. Unset until the app launches — CTAs fall back to a
 * "coming soon" state when undefined. */
export const APP_URL: string | undefined = import.meta.env.VITE_APP_URL as
  | string
  | undefined;

export function appLink(path: string): string | undefined {
  return APP_URL ? `${APP_URL}${path}` : undefined;
}

export const paths = {
  home: '/',
  pricing: '/pricing',
  newsletterConfirm: '/newsletter/confirm',
  newsletterUnsubscribe: '/newsletter/unsubscribe',
  labelingImages: '/labeling/images',
  labelingVideos: '/labeling/videos',
  labelingPointClouds: '/labeling/point-clouds',
  labelingTimeSeries: '/labeling/time-series',
  platformDatasets: '/platform/datasets',
  platformTraining: '/platform/training',
  platformReview: '/platform/review',
  platformCollaboration: '/platform/collaboration',
  platformDevelopers: '/platform/developers',
  moreAgents: '/more/agents',
  moreCollectors: '/more/collectors',
  moreTwin: '/more/digital-twin',
  moreMlflow: '/more/mlflow',
  moreGraphs: '/more/graphs',
  moreGrids: '/more/grids',
  moreMaps: '/more/maps',
  moreMeetings: '/more/meetings',
  moreSignatures: '/more/signatures',
  moreMemory: '/more/memory-maps',
  moreRegistry: '/more/registry',
  moreApps: '/more/apps',
  moreStore: '/more/store',
} as const;

export type FeatureSlug =
  | 'images'
  | 'videos'
  | 'pointClouds'
  | 'timeSeries'
  | 'datasets'
  | 'training'
  | 'review'
  | 'collaboration'
  | 'developers'
  | 'agents'
  | 'collectors'
  | 'twin'
  | 'mlflow'
  | 'graphs'
  | 'grids'
  | 'maps'
  | 'meetings'
  | 'signatures'
  | 'memory'
  | 'registry'
  | 'apps'
  | 'store';

export type FeatureCategory = 'labeling' | 'platform' | 'more';

/** `development` pages describe features that are built but still in field
 * validation; they carry an "in development" badge instead of launch CTAs. */
export type FeatureStatus = 'available' | 'development';

/** Mockup screens the marketing site can embed. Keys are resolved through the
 * MOCKS registry in `components/mocks`. */
export type MockKey =
  | 'imageEditor'
  | 'autoLabelReview'
  | 'keypointPreset'
  | 'videoTimeline'
  | 'pointCloudEditor'
  | 'pointceptAutoLabel'
  | 'autoSegment'
  | 'timeseriesEditor'
  | 'tsColumnMapping'
  | 'issuePanel'
  | 'datasetGrid'
  | 'sampleGallery'
  | 'uploadWizard'
  | 'datasetQa'
  | 'trainingWizard'
  | 'experimentRun'
  | 'rfdetrInference'
  | 'mlopsOverview'
  | 'mlflowRuns'
  | 'usage'
  | 'files'
  | 'wiki'
  | 'videoLibrary'
  | 'tokenPanel'
  | 'licensePanel'
  | 'apiSnippet'
  | 'agentList'
  | 'agentApps'
  | 'agentInstall'
  | 'modbusOverview'
  | 'collectorsOverview'
  | 'collectorsTimeline'
  | 'twinEditor'
  | 'appsGallery'
  | 'graphEditor'
  | 'gridTable'
  | 'mapView'
  | 'meetingDetail'
  | 'meetingRoom'
  | 'signatureDetail'
  | 'memoryHex'
  | 'registry'
  | 'store';

export type FeaturePageDef = {
  slug: FeatureSlug;
  category: FeatureCategory;
  status: FeatureStatus;
  path: string;
  /** Large mock rendered under the intro (omit for roadmap pages). */
  heroMock?: MockKey;
  /** One entry per detail section (aligned with `pages.<slug>.sections` in
   * translations); `null` renders the section without a mock. */
  sectionMocks: (MockKey | null)[];
  related: FeatureSlug[];
};

export const FEATURE_PAGES: readonly FeaturePageDef[] = [
  {
    slug: 'images',
    category: 'labeling',
    status: 'available',
    path: paths.labelingImages,
    heroMock: 'imageEditor',
    sectionMocks: [null, 'autoLabelReview', 'keypointPreset', 'issuePanel'],
    related: ['videos', 'training', 'review'],
  },
  {
    slug: 'videos',
    category: 'labeling',
    status: 'available',
    path: paths.labelingVideos,
    heroMock: 'videoTimeline',
    sectionMocks: [null, null, 'videoLibrary'],
    related: ['images', 'pointClouds', 'datasets'],
  },
  {
    slug: 'pointClouds',
    category: 'labeling',
    status: 'available',
    path: paths.labelingPointClouds,
    heroMock: 'pointCloudEditor',
    sectionMocks: [null, 'pointceptAutoLabel', 'autoSegment', null],
    related: ['images', 'training', 'twin'],
  },
  {
    slug: 'timeSeries',
    category: 'labeling',
    status: 'available',
    path: paths.labelingTimeSeries,
    heroMock: 'timeseriesEditor',
    sectionMocks: ['tsColumnMapping', null, null],
    related: ['training', 'collectors', 'datasets'],
  },
  {
    slug: 'datasets',
    category: 'platform',
    status: 'available',
    path: paths.platformDatasets,
    heroMock: 'datasetGrid',
    sectionMocks: ['uploadWizard', 'sampleGallery', 'datasetQa'],
    related: ['images', 'timeSeries', 'review'],
  },
  {
    slug: 'training',
    category: 'platform',
    status: 'available',
    path: paths.platformTraining,
    heroMock: 'trainingWizard',
    sectionMocks: ['rfdetrInference', 'experimentRun', null],
    related: ['agents', 'mlflow', 'images'],
  },
  {
    slug: 'review',
    category: 'platform',
    status: 'available',
    path: paths.platformReview,
    heroMock: 'issuePanel',
    sectionMocks: [null, null, 'datasetGrid'],
    related: ['images', 'datasets', 'collaboration'],
  },
  {
    slug: 'collaboration',
    category: 'platform',
    status: 'available',
    path: paths.platformCollaboration,
    heroMock: 'wiki',
    sectionMocks: [null, 'files', 'videoLibrary'],
    related: ['meetings', 'grids', 'review'],
  },
  {
    slug: 'developers',
    category: 'platform',
    status: 'available',
    path: paths.platformDevelopers,
    heroMock: 'tokenPanel',
    sectionMocks: ['apiSnippet', 'agentInstall', 'licensePanel'],
    related: ['agents', 'registry', 'mlflow'],
  },

  // "More" — the rest of the project workspace. Everything here ships in the
  // app today; `development` marks features still in field validation.
  {
    slug: 'agents',
    category: 'more',
    status: 'available',
    path: paths.moreAgents,
    heroMock: 'agentApps',
    sectionMocks: ['agentList', 'modbusOverview', null],
    related: ['training', 'collectors', 'memory'],
  },
  {
    slug: 'collectors',
    category: 'more',
    status: 'development',
    path: paths.moreCollectors,
    heroMock: 'collectorsOverview',
    sectionMocks: ['collectorsTimeline', null, null],
    related: ['agents', 'timeSeries', 'twin'],
  },
  {
    slug: 'twin',
    category: 'more',
    status: 'available',
    path: paths.moreTwin,
    heroMock: 'twinEditor',
    sectionMocks: [null, null, null],
    related: ['memory', 'agents', 'maps'],
  },
  {
    slug: 'mlflow',
    category: 'more',
    status: 'available',
    path: paths.moreMlflow,
    heroMock: 'mlopsOverview',
    sectionMocks: ['mlflowRuns', null],
    related: ['training', 'developers', 'registry'],
  },
  {
    slug: 'graphs',
    category: 'more',
    status: 'available',
    path: paths.moreGraphs,
    heroMock: 'graphEditor',
    sectionMocks: [null, null],
    related: ['agents', 'apps', 'datasets'],
  },
  {
    slug: 'grids',
    category: 'more',
    status: 'available',
    path: paths.moreGrids,
    heroMock: 'gridTable',
    sectionMocks: [null, null, null],
    related: ['collaboration', 'store', 'twin'],
  },
  {
    slug: 'maps',
    category: 'more',
    status: 'available',
    path: paths.moreMaps,
    heroMock: 'mapView',
    sectionMocks: [null, null],
    related: ['twin', 'datasets', 'grids'],
  },
  {
    slug: 'meetings',
    category: 'more',
    status: 'available',
    path: paths.moreMeetings,
    heroMock: 'meetingDetail',
    sectionMocks: ['meetingRoom', null],
    related: ['collaboration', 'signatures', 'grids'],
  },
  {
    slug: 'signatures',
    category: 'more',
    status: 'available',
    path: paths.moreSignatures,
    heroMock: 'signatureDetail',
    sectionMocks: [null, null],
    related: ['collaboration', 'meetings', 'grids'],
  },
  {
    slug: 'memory',
    category: 'more',
    status: 'available',
    path: paths.moreMemory,
    heroMock: 'memoryHex',
    sectionMocks: [null, 'modbusOverview'],
    related: ['agents', 'twin', 'grids'],
  },
  {
    slug: 'registry',
    category: 'more',
    status: 'available',
    path: paths.moreRegistry,
    heroMock: 'registry',
    sectionMocks: [null, null],
    related: ['developers', 'agents', 'mlflow'],
  },
  {
    slug: 'apps',
    category: 'more',
    status: 'available',
    path: paths.moreApps,
    heroMock: 'appsGallery',
    sectionMocks: [null, null],
    related: ['collaboration', 'graphs', 'developers'],
  },
  {
    slug: 'store',
    category: 'more',
    status: 'available',
    path: paths.moreStore,
    heroMock: 'store',
    sectionMocks: [null, null],
    related: ['grids', 'collaboration', 'datasets'],
  },
] as const;

export function getFeaturePage(
  category: FeatureCategory,
  pathSlug: string | undefined,
): FeaturePageDef | null {
  if (!pathSlug) {
    return null;
  }
  return (
    FEATURE_PAGES.find(
      p => p.category === category && p.path.endsWith(`/${pathSlug}`),
    ) ?? null
  );
}

/** Old marketing routes → new IA. Everything else falls through to `/`.
 * The cluster, VMS, and manufacturing pages were removed from the product
 * (2026-09); their URLs land on the closest living feature. */
export const LEGACY_REDIRECTS: Record<string, string> = {
  '/features/visual-programming': paths.moreGraphs,
  '/features/realtime-streaming': paths.moreCollectors,
  '/features/vision-toolkit': paths.moreApps,
  '/features/vms-cctv': paths.moreCollectors,
  '/features/datasets-mlops': paths.platformDatasets,
  '/features/extensible': paths.platformDevelopers,
  '/modules/vision': paths.moreApps,
  '/modules/vms': paths.moreCollectors,
  '/modules/manufacturing': paths.moreTwin,
  '/modules/datasets': paths.platformDatasets,
  '/modules/graphs': paths.moreGraphs,
  '/modules/mlflow': paths.moreMlflow,
  '/modules/agents': paths.moreAgents,
  '/modules/apps': paths.moreApps,
  '/more/clusters': paths.moreAgents,
  '/more/vms': paths.moreCollectors,
  '/more/manufacturing': paths.moreTwin,
};
