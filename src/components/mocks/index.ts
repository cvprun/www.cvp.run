import type {ComponentType} from 'react';

import type {MockKey} from '@/lib/site';

import {MockAgentApps} from './agent-apps';
import {MockAgentInstall} from './agent-install';
import {MockAgentList} from './agent-list';
import {MockApiSnippet} from './api-snippet';
import {MockAppsGallery} from './apps-gallery';
import {MockAutoLabelReview} from './auto-label-review';
import {MockAutoSegment} from './auto-segment';
import {MockCollectorsOverview} from './collectors-overview';
import {MockCollectorsTimeline} from './collectors-timeline';
import {MockDatasetGrid} from './dataset-grid';
import {MockDatasetQa} from './dataset-qa';
import {MockExperimentRun} from './experiment-run';
import {MockFiles} from './files';
import {MockGraphEditor} from './graph-editor';
import {MockGridTable} from './grid-table';
import {MockImageEditor} from './image-editor';
import {MockIssuePanel} from './issue-panel';
import {MockKeypointPreset} from './keypoint-preset';
import {MockLicensePanel} from './license-panel';
import {MockMapView} from './map-view';
import {MockMeetingDetail} from './meeting-detail';
import {MockMeetingRoom} from './meeting-room';
import {MockMemoryHex} from './memory-hex';
import {MockMlflowRuns} from './mlflow-runs';
import {MockMlopsOverview} from './mlops-overview';
import {MockModbusOverview} from './modbus-overview';
import {MockPointCloudEditor} from './point-cloud-editor';
import {MockPointceptAutoLabel} from './pointcept-autolabel';
import {MockRegistry} from './registry';
import {MockRfdetrInference} from './rfdetr-inference';
import {MockSampleGallery} from './sample-gallery';
import {MockSignatureDetail} from './signatures';
import {MockStore} from './store';
import {MockTimeseriesEditor} from './timeseries-editor';
import {MockTokenPanel} from './token-panel';
import {MockTrainingWizard} from './training-wizard';
import {MockTsColumnMapping} from './ts-column-mapping';
import {MockTwinEditor} from './twin-editor';
import {MockUploadWizard} from './upload-wizard';
import {MockUsage} from './usage-panel';
import {MockVideoLibrary} from './video-library';
import {MockVideoTimeline} from './video-timeline';
import {MockWiki} from './wiki';

export const MOCKS: Record<MockKey, ComponentType> = {
  imageEditor: MockImageEditor,
  autoLabelReview: MockAutoLabelReview,
  keypointPreset: MockKeypointPreset,
  videoTimeline: MockVideoTimeline,
  pointCloudEditor: MockPointCloudEditor,
  pointceptAutoLabel: MockPointceptAutoLabel,
  autoSegment: MockAutoSegment,
  timeseriesEditor: MockTimeseriesEditor,
  tsColumnMapping: MockTsColumnMapping,
  issuePanel: MockIssuePanel,
  datasetGrid: MockDatasetGrid,
  sampleGallery: MockSampleGallery,
  uploadWizard: MockUploadWizard,
  datasetQa: MockDatasetQa,
  trainingWizard: MockTrainingWizard,
  experimentRun: MockExperimentRun,
  rfdetrInference: MockRfdetrInference,
  mlopsOverview: MockMlopsOverview,
  mlflowRuns: MockMlflowRuns,
  usage: MockUsage,
  files: MockFiles,
  wiki: MockWiki,
  videoLibrary: MockVideoLibrary,
  tokenPanel: MockTokenPanel,
  licensePanel: MockLicensePanel,
  apiSnippet: MockApiSnippet,
  agentList: MockAgentList,
  agentApps: MockAgentApps,
  agentInstall: MockAgentInstall,
  modbusOverview: MockModbusOverview,
  collectorsOverview: MockCollectorsOverview,
  collectorsTimeline: MockCollectorsTimeline,
  twinEditor: MockTwinEditor,
  appsGallery: MockAppsGallery,
  graphEditor: MockGraphEditor,
  gridTable: MockGridTable,
  mapView: MockMapView,
  meetingDetail: MockMeetingDetail,
  meetingRoom: MockMeetingRoom,
  signatureDetail: MockSignatureDetail,
  memoryHex: MockMemoryHex,
  registry: MockRegistry,
  store: MockStore,
};
