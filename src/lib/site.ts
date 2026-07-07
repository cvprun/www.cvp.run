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
} as const;

export type FeatureSlug =
  | 'images'
  | 'videos'
  | 'pointClouds'
  | 'datasets'
  | 'review'
  | 'collaboration'
  | 'developers';

export type FeatureCategory = 'labeling' | 'platform';

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
  | 'files'
  | 'wiki'
  | 'videoLibrary'
  | 'tokenPanel'
  | 'licensePanel'
  | 'apiSnippet';

export type FeaturePageDef = {
  slug: FeatureSlug;
  category: FeatureCategory;
  path: string;
  /** Large mock rendered under the intro. */
  heroMock: MockKey;
  /** One entry per detail section (aligned with `pages.<slug>.sections` in
   * translations); `null` renders the section without a mock. */
  sectionMocks: (MockKey | null)[];
  related: FeatureSlug[];
};

export const FEATURE_PAGES: readonly FeaturePageDef[] = [
  {
    slug: 'images',
    category: 'labeling',
    path: paths.labelingImages,
    heroMock: 'imageEditor',
    sectionMocks: [null, 'keypointPreset', 'issuePanel'],
    related: ['videos', 'pointClouds', 'review'],
  },
  {
    slug: 'videos',
    category: 'labeling',
    path: paths.labelingVideos,
    heroMock: 'videoTimeline',
    sectionMocks: [null, null, 'videoLibrary'],
    related: ['images', 'pointClouds', 'datasets'],
  },
  {
    slug: 'pointClouds',
    category: 'labeling',
    path: paths.labelingPointClouds,
    heroMock: 'pointCloudEditor',
    sectionMocks: [null, 'autoSegment', null],
    related: ['images', 'videos', 'datasets'],
  },
  {
    slug: 'datasets',
    category: 'platform',
    path: paths.platformDatasets,
    heroMock: 'datasetGrid',
    sectionMocks: [null, null, null],
    related: ['images', 'review', 'collaboration'],
  },
  {
    slug: 'review',
    category: 'platform',
    path: paths.platformReview,
    heroMock: 'issuePanel',
    sectionMocks: [null, null, 'datasetGrid'],
    related: ['images', 'datasets', 'collaboration'],
  },
  {
    slug: 'collaboration',
    category: 'platform',
    path: paths.platformCollaboration,
    heroMock: 'wiki',
    sectionMocks: [null, 'files', 'videoLibrary'],
    related: ['datasets', 'review', 'developers'],
  },
  {
    slug: 'developers',
    category: 'platform',
    path: paths.platformDevelopers,
    heroMock: 'tokenPanel',
    sectionMocks: ['apiSnippet', 'licensePanel', null],
    related: ['datasets', 'collaboration', 'images'],
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
  '/features/datasets-mlops': paths.platformDatasets,
  '/features/extensible': paths.platformDevelopers,
  '/modules/datasets': paths.platformDatasets,
};
