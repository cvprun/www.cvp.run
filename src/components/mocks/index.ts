import {lazy, type ComponentType, type LazyExoticComponent} from 'react';

import type {MockKey} from '@/lib/site';

type MockModule = Promise<{default: ComponentType}>;

/** Adapts a module's named mock export to the `{default}` shape `lazy()` takes. */
function named<K extends string>(
  load: () => Promise<Record<K, ComponentType>>,
  name: K,
): () => MockModule {
  return () => load().then(module => ({default: module[name]}));
}

/**
 * Loader per mock. Every mock is its own chunk: a page only downloads the
 * screens it shows, and `MockSlot` defers even those until they near the
 * viewport. Keep keys in sync with `MockKey` in `lib/site.ts`.
 */
export const MOCK_LOADERS: Record<MockKey, () => MockModule> = {
  imageEditor: named(() => import('./image-editor'), 'MockImageEditor'),
  autoLabelReview: named(() => import('./auto-label-review'), 'MockAutoLabelReview'),
  keypointPreset: named(() => import('./keypoint-preset'), 'MockKeypointPreset'),
  videoTimeline: named(() => import('./video-timeline'), 'MockVideoTimeline'),
  pointCloudEditor: named(() => import('./point-cloud-editor'), 'MockPointCloudEditor'),
  pointceptAutoLabel: named(
    () => import('./pointcept-autolabel'),
    'MockPointceptAutoLabel',
  ),
  autoSegment: named(() => import('./auto-segment'), 'MockAutoSegment'),
  labelRules: named(() => import('./label-rules'), 'MockLabelRules'),
  timeseriesEditor: named(() => import('./timeseries-editor'), 'MockTimeseriesEditor'),
  tsColumnMapping: named(() => import('./ts-column-mapping'), 'MockTsColumnMapping'),
  issuePanel: named(() => import('./issue-panel'), 'MockIssuePanel'),
  datasetGrid: named(() => import('./dataset-grid'), 'MockDatasetGrid'),
  sampleGallery: named(() => import('./sample-gallery'), 'MockSampleGallery'),
  uploadWizard: named(() => import('./upload-wizard'), 'MockUploadWizard'),
  datasetQa: named(() => import('./dataset-qa'), 'MockDatasetQa'),
  trainingWizard: named(() => import('./training-wizard'), 'MockTrainingWizard'),
  inferenceOverview: named(() => import('./infer-overview'), 'MockInferOverview'),
  inferenceFeature: named(() => import('./infer-feature'), 'MockInferFeature'),
  mlopsOverview: named(() => import('./mlops-overview'), 'MockMlopsOverview'),
  mlopsRuns: named(() => import('./mlops-runs'), 'MockMlopsRuns'),
  mlopsRun: named(() => import('./mlops-run'), 'MockMlopsRun'),
  mlopsModels: named(() => import('./mlops-models'), 'MockMlopsModels'),
  usage: named(() => import('./usage-panel'), 'MockUsage'),
  files: named(() => import('./files'), 'MockFiles'),
  wiki: named(() => import('./wiki'), 'MockWiki'),
  videoLibrary: named(() => import('./video-library'), 'MockVideoLibrary'),
  videoUpload: named(() => import('./video-upload'), 'MockVideoUpload'),
  tokenPanel: named(() => import('./token-panel'), 'MockTokenPanel'),
  s3Credentials: named(() => import('./s3-credentials'), 'MockS3Credentials'),
  licensePanel: named(() => import('./license-panel'), 'MockLicensePanel'),
  apiSnippet: named(() => import('./api-snippet'), 'MockApiSnippet'),
  agentList: named(() => import('./agent-list'), 'MockAgentList'),
  agentApps: named(() => import('./agent-apps'), 'MockAgentApps'),
  agentCompat: named(() => import('./agent-compat'), 'MockAgentCompat'),
  agentInstall: named(() => import('./agent-install'), 'MockAgentInstall'),
  modbusDevices: named(() => import('./modbus-devices'), 'MockModbusDevices'),
  modbusTags: named(() => import('./modbus-tags'), 'MockModbusTags'),
  collectorsOverview: named(
    () => import('./collectors-overview'),
    'MockCollectorsOverview',
  ),
  collectorsTimeline: named(
    () => import('./collectors-timeline'),
    'MockCollectorsTimeline',
  ),
  twinEditor: named(() => import('./twin-editor'), 'MockTwinEditor'),
  appsGallery: named(() => import('./apps-gallery'), 'MockAppsGallery'),
  graphEditor: named(() => import('./graph-editor'), 'MockGraphEditor'),
  gridTable: named(() => import('./grid-table'), 'MockGridTable'),
  mapView: named(() => import('./map-view'), 'MockMapView'),
  meetingDetail: named(() => import('./meeting-detail'), 'MockMeetingDetail'),
  meetingRoom: named(() => import('./meeting-room'), 'MockMeetingRoom'),
  signatureDetail: named(() => import('./signatures'), 'MockSignatureDetail'),
  memoryHex: named(() => import('./memory-hex'), 'MockMemoryHex'),
  registry: named(() => import('./registry'), 'MockRegistry'),
  store: named(() => import('./store'), 'MockStore'),
  accountSecurity: named(() => import('./account-security'), 'MockAccountSecurity'),
};

export const MOCKS = Object.fromEntries(
  Object.entries(MOCK_LOADERS).map(([key, load]) => [key, lazy(load)]),
) as Record<MockKey, LazyExoticComponent<ComponentType>>;

/** Starts downloading a mock's chunk ahead of render (e.g. on tab hover). */
export function preloadMock(key: MockKey): void {
  void MOCK_LOADERS[key]();
}
