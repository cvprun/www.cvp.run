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
  labelingImages: '/labeling/images',
  labelingVideos: '/labeling/videos',
  labelingPointClouds: '/labeling/point-clouds',
  platformDatasets: '/platform/datasets',
  platformReview: '/platform/review',
  platformCollaboration: '/platform/collaboration',
  platformDevelopers: '/platform/developers',
  moreApps: '/more/apps',
  moreGraphs: '/more/graphs',
  moreAgents: '/more/agents',
  moreClusters: '/more/clusters',
  moreVms: '/more/vms',
  moreManufacturing: '/more/manufacturing',
  moreMlflow: '/more/mlflow',
  moreGrids: '/more/grids',
  moreMaps: '/more/maps',
  moreMeetings: '/more/meetings',
} as const;

export type FeatureSlug =
  | 'images'
  | 'videos'
  | 'pointClouds'
  | 'datasets'
  | 'review'
  | 'collaboration'
  | 'developers'
  | 'apps'
  | 'graphs'
  | 'agents'
  | 'clusters'
  | 'vms'
  | 'manufacturing'
  | 'mlflow'
  | 'grids'
  | 'maps'
  | 'meetings';

export type FeatureCategory = 'labeling' | 'platform' | 'more';

/** `development` pages describe upcoming features and carry an
 * "in development" badge instead of launch messaging. */
export type FeatureStatus = 'available' | 'development';

/** Mockup screens the marketing site can embed. Keys are resolved through the
 * MOCKS registry in `components/mocks`. */
export type MockKey =
  | 'imageEditor'
  | 'keypointPreset'
  | 'videoTimeline'
  | 'pointCloudEditor'
  | 'autoSegment'
  | 'issuePanel'
  | 'datasetGrid'
  | 'sampleGallery'
  | 'files'
  | 'wiki'
  | 'videoLibrary'
  | 'tokenPanel'
  | 'licensePanel'
  | 'apiSnippet'
  | 'appsGallery'
  | 'graphEditor'
  | 'agentList'
  | 'clusterControl'
  | 'vmsLive'
  | 'mesTopology'
  | 'mlflowRuns'
  | 'gridTable'
  | 'mapView'
  | 'meetingDetail';

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
    sectionMocks: [null, 'keypointPreset', 'issuePanel'],
    related: ['videos', 'pointClouds', 'review'],
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
    sectionMocks: [null, 'autoSegment', null],
    related: ['images', 'videos', 'datasets'],
  },
  {
    slug: 'datasets',
    category: 'platform',
    status: 'available',
    path: paths.platformDatasets,
    heroMock: 'datasetGrid',
    sectionMocks: [null, 'sampleGallery', null],
    related: ['images', 'review', 'collaboration'],
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
    related: ['datasets', 'review', 'developers'],
  },
  {
    slug: 'developers',
    category: 'platform',
    status: 'available',
    path: paths.platformDevelopers,
    heroMock: 'tokenPanel',
    sectionMocks: ['apiSnippet', 'licensePanel', null],
    related: ['datasets', 'collaboration', 'images'],
  },

  // "More" section — features not covered by the launch pages. Pages with
  // status 'development' are roadmap previews and carry an in-dev badge.
  {
    slug: 'apps',
    category: 'more',
    status: 'available',
    path: paths.moreApps,
    heroMock: 'appsGallery',
    sectionMocks: [null, null],
    related: ['collaboration', 'developers', 'graphs'],
  },
  {
    slug: 'graphs',
    category: 'more',
    status: 'available',
    path: paths.moreGraphs,
    heroMock: 'graphEditor',
    sectionMocks: [null, null],
    related: ['apps', 'agents', 'datasets'],
  },
  {
    slug: 'agents',
    category: 'more',
    status: 'development',
    path: paths.moreAgents,
    heroMock: 'agentList',
    sectionMocks: [null, null],
    related: ['graphs', 'clusters', 'developers'],
  },
  {
    slug: 'clusters',
    category: 'more',
    status: 'development',
    path: paths.moreClusters,
    heroMock: 'clusterControl',
    sectionMocks: [null, null],
    related: ['agents', 'mlflow', 'developers'],
  },
  {
    slug: 'vms',
    category: 'more',
    status: 'development',
    path: paths.moreVms,
    heroMock: 'vmsLive',
    sectionMocks: [null, null],
    related: ['videos', 'agents', 'maps'],
  },
  {
    slug: 'manufacturing',
    category: 'more',
    status: 'development',
    path: paths.moreManufacturing,
    heroMock: 'mesTopology',
    sectionMocks: [null, null],
    related: ['vms', 'agents', 'grids'],
  },
  {
    slug: 'mlflow',
    category: 'more',
    status: 'development',
    path: paths.moreMlflow,
    heroMock: 'mlflowRuns',
    sectionMocks: [null, null],
    related: ['datasets', 'developers', 'clusters'],
  },
  {
    slug: 'grids',
    category: 'more',
    status: 'development',
    path: paths.moreGrids,
    heroMock: 'gridTable',
    sectionMocks: [null, null],
    related: ['datasets', 'collaboration', 'manufacturing'],
  },
  {
    slug: 'maps',
    category: 'more',
    status: 'development',
    path: paths.moreMaps,
    heroMock: 'mapView',
    sectionMocks: [null, null],
    related: ['vms', 'datasets', 'grids'],
  },
  {
    slug: 'meetings',
    category: 'more',
    status: 'development',
    path: paths.moreMeetings,
    heroMock: 'meetingDetail',
    sectionMocks: [null, null],
    related: ['collaboration', 'grids', 'apps'],
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

/** Old marketing routes → new IA. Everything else falls through to `/`. */
export const LEGACY_REDIRECTS: Record<string, string> = {
  '/features/visual-programming': paths.moreGraphs,
  '/features/realtime-streaming': paths.moreVms,
  '/features/vision-toolkit': paths.moreApps,
  '/features/vms-cctv': paths.moreVms,
  '/features/datasets-mlops': paths.platformDatasets,
  '/features/extensible': paths.platformDevelopers,
  '/modules/vision': paths.moreApps,
  '/modules/vms': paths.moreVms,
  '/modules/manufacturing': paths.moreManufacturing,
  '/modules/datasets': paths.platformDatasets,
  '/modules/graphs': paths.moreGraphs,
  '/modules/mlflow': paths.moreMlflow,
  '/modules/agents': paths.moreAgents,
  '/modules/apps': paths.moreApps,
};
