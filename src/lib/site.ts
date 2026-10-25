/**
 * Single source of truth for site paths, the feature-page registry, and links
 * to the product app (app.cvp.run).
 */

/** Canonical origin of this marketing site (canonical URLs, sitemap, OG). */
export const SITE_ORIGIN = 'https://www.cvp.run';

/** Product app origin. Unset until the app launches — CTAs fall back to a
 * "coming soon" state when undefined. `import.meta.env` is absent when the
 * build plugin imports this module under Node, hence the optional chain. */
export const APP_URL: string | undefined = import.meta.env?.VITE_APP_URL as
  | string
  | undefined;

export function appLink(path: string): string | undefined {
  return APP_URL ? `${APP_URL}${path}` : undefined;
}

/** The app's "Contact sales" address (billing › Enterprise card). */
export const SALES_MAILTO = 'mailto:sales@cvp.run?subject=Enterprise%20plan%20inquiry';

export const paths = {
  home: '/',
  pricing: '/pricing',
  security: '/security',
  changelog: '/changelog',
  newsletterConfirm: '/newsletter/confirm',
  newsletterUnsubscribe: '/newsletter/unsubscribe',
  labelingImages: '/labeling/images',
  labelingVideos: '/labeling/videos',
  labelingPointClouds: '/labeling/point-clouds',
  labelingTimeSeries: '/labeling/time-series',
  platformDatasets: '/platform/datasets',
  platformTraining: '/platform/training',
  platformInference: '/platform/inference',
  platformMlops: '/platform/mlops',
  platformReview: '/platform/review',
  platformCollaboration: '/platform/collaboration',
  platformDevelopers: '/platform/developers',
  moreAgents: '/more/agents',
  moreCollectors: '/more/collectors',
  moreModbus: '/more/modbus',
  moreTwin: '/more/digital-twin',
  moreMedia: '/more/video-library',
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
  | 'inference'
  | 'mlops'
  | 'review'
  | 'collaboration'
  | 'developers'
  | 'agents'
  | 'collectors'
  | 'modbus'
  | 'twin'
  | 'media'
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

/** Sub-groups of the "more" menu: field equipment, team workspace, builders. */
export type FeatureGroup = 'edge' | 'workspace' | 'build';

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
  | 'labelRules'
  | 'timeseriesEditor'
  | 'tsColumnMapping'
  | 'issuePanel'
  | 'datasetGrid'
  | 'sampleGallery'
  | 'uploadWizard'
  | 'datasetQa'
  | 'trainingWizard'
  | 'inferenceOverview'
  | 'inferenceFeature'
  | 'mlopsOverview'
  | 'mlopsRuns'
  | 'mlopsRun'
  | 'mlopsModels'
  | 'usage'
  | 'files'
  | 'wiki'
  | 'videoLibrary'
  | 'videoUpload'
  | 'tokenPanel'
  | 's3Credentials'
  | 'licensePanel'
  | 'apiSnippet'
  | 'agentList'
  | 'agentApps'
  | 'agentCompat'
  | 'agentInstall'
  | 'modbusDevices'
  | 'modbusTags'
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
  | 'store'
  | 'accountSecurity';

export type FeaturePageDef = {
  slug: FeatureSlug;
  category: FeatureCategory;
  /** Column in the "more" menu and landing scope list (more pages only). */
  group?: FeatureGroup;
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
    related: ['videos', 'inference', 'review'],
  },
  {
    slug: 'videos',
    category: 'labeling',
    status: 'available',
    path: paths.labelingVideos,
    heroMock: 'videoTimeline',
    sectionMocks: [null, null, 'videoLibrary'],
    related: ['images', 'media', 'datasets'],
  },
  {
    slug: 'pointClouds',
    category: 'labeling',
    status: 'available',
    path: paths.labelingPointClouds,
    heroMock: 'pointCloudEditor',
    sectionMocks: [null, 'pointceptAutoLabel', 'autoSegment', 'labelRules'],
    related: ['images', 'inference', 'twin'],
  },
  {
    slug: 'timeSeries',
    category: 'labeling',
    status: 'available',
    path: paths.labelingTimeSeries,
    heroMock: 'timeseriesEditor',
    sectionMocks: ['tsColumnMapping', null, null],
    related: ['inference', 'collectors', 'datasets'],
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
    sectionMocks: ['autoLabelReview', 'mlopsRun', null],
    related: ['mlops', 'inference', 'agents'],
  },
  {
    slug: 'inference',
    category: 'platform',
    status: 'available',
    path: paths.platformInference,
    heroMock: 'inferenceFeature',
    sectionMocks: ['inferenceOverview', null, null],
    related: ['training', 'mlops', 'agents'],
  },
  {
    slug: 'mlops',
    category: 'platform',
    status: 'available',
    path: paths.platformMlops,
    heroMock: 'mlopsOverview',
    sectionMocks: ['mlopsRuns', 'mlopsModels', null],
    related: ['training', 'inference', 'developers'],
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
    sectionMocks: [null, 'files', null],
    related: ['meetings', 'media', 'grids'],
  },
  {
    slug: 'developers',
    category: 'platform',
    status: 'available',
    path: paths.platformDevelopers,
    heroMock: 'tokenPanel',
    sectionMocks: ['apiSnippet', 's3Credentials', 'agentInstall', 'licensePanel'],
    related: ['agents', 'registry', 'mlops'],
  },

  // "More" — the rest of the project workspace, in three menu columns.
  // Everything here ships in the app today; `development` marks features
  // still in field validation.
  {
    slug: 'agents',
    category: 'more',
    group: 'edge',
    status: 'available',
    path: paths.moreAgents,
    heroMock: 'agentApps',
    sectionMocks: ['agentList', 'agentCompat', null],
    related: ['inference', 'collectors', 'modbus'],
  },
  {
    slug: 'collectors',
    category: 'more',
    group: 'edge',
    status: 'development',
    path: paths.moreCollectors,
    heroMock: 'collectorsOverview',
    sectionMocks: ['collectorsTimeline', null, null],
    related: ['agents', 'timeSeries', 'twin'],
  },
  {
    slug: 'modbus',
    category: 'more',
    group: 'edge',
    status: 'available',
    path: paths.moreModbus,
    heroMock: 'modbusTags',
    sectionMocks: ['modbusDevices', null, null],
    related: ['collectors', 'twin', 'memory'],
  },
  {
    slug: 'twin',
    category: 'more',
    group: 'edge',
    status: 'available',
    path: paths.moreTwin,
    heroMock: 'twinEditor',
    sectionMocks: [null, null, null, null],
    related: ['modbus', 'collectors', 'maps'],
  },
  {
    slug: 'memory',
    category: 'more',
    group: 'edge',
    status: 'available',
    path: paths.moreMemory,
    heroMock: 'memoryHex',
    sectionMocks: [null, null],
    related: ['agents', 'twin', 'modbus'],
  },
  {
    slug: 'media',
    category: 'more',
    group: 'workspace',
    status: 'available',
    path: paths.moreMedia,
    heroMock: 'videoLibrary',
    sectionMocks: ['videoUpload', null, null],
    related: ['videos', 'collaboration', 'agents'],
  },
  {
    slug: 'grids',
    category: 'more',
    group: 'workspace',
    status: 'available',
    path: paths.moreGrids,
    heroMock: 'gridTable',
    sectionMocks: [null, null, null],
    related: ['collaboration', 'store', 'twin'],
  },
  {
    slug: 'meetings',
    category: 'more',
    group: 'workspace',
    status: 'available',
    path: paths.moreMeetings,
    heroMock: 'meetingDetail',
    sectionMocks: ['meetingRoom', null],
    related: ['collaboration', 'signatures', 'grids'],
  },
  {
    slug: 'signatures',
    category: 'more',
    group: 'workspace',
    status: 'available',
    path: paths.moreSignatures,
    heroMock: 'signatureDetail',
    sectionMocks: [null, null],
    related: ['collaboration', 'meetings', 'grids'],
  },
  {
    slug: 'maps',
    category: 'more',
    group: 'workspace',
    status: 'available',
    path: paths.moreMaps,
    heroMock: 'mapView',
    sectionMocks: [null, null],
    related: ['twin', 'datasets', 'grids'],
  },
  {
    slug: 'store',
    category: 'more',
    group: 'workspace',
    status: 'available',
    path: paths.moreStore,
    heroMock: 'store',
    sectionMocks: [null, null],
    related: ['grids', 'collaboration', 'datasets'],
  },
  {
    slug: 'graphs',
    category: 'more',
    group: 'build',
    status: 'available',
    path: paths.moreGraphs,
    heroMock: 'graphEditor',
    sectionMocks: [null, null],
    related: ['agents', 'apps', 'datasets'],
  },
  {
    slug: 'registry',
    category: 'more',
    group: 'build',
    status: 'available',
    path: paths.moreRegistry,
    heroMock: 'registry',
    sectionMocks: [null, null],
    related: ['developers', 'agents', 'mlops'],
  },
  {
    slug: 'apps',
    category: 'more',
    group: 'build',
    status: 'available',
    path: paths.moreApps,
    heroMock: 'appsGallery',
    sectionMocks: [null, null],
    related: ['collaboration', 'graphs', 'developers'],
  },
] as const;

/** Feature pages of a menu category, in registry order. */
export function pagesIn(category: FeatureCategory): FeaturePageDef[] {
  return FEATURE_PAGES.filter(page => page.category === category);
}

export const FEATURE_GROUPS: readonly FeatureGroup[] = ['edge', 'workspace', 'build'];

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
 * (2026-09); their URLs land on the closest living feature. MLOps moved from
 * "more" to the platform menu (2026-10). */
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
  '/modules/mlflow': paths.platformMlops,
  '/modules/agents': paths.moreAgents,
  '/modules/apps': paths.moreApps,
  '/more/clusters': paths.moreAgents,
  '/more/vms': paths.moreCollectors,
  '/more/manufacturing': paths.moreTwin,
  '/more/mlflow': paths.platformMlops,
};
