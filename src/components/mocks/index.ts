import type {ComponentType} from 'react';

import type {MockKey} from '@/lib/site';

import {MockAgentList} from './agent-list';
import {MockApiSnippet} from './api-snippet';
import {MockAppsGallery} from './apps-gallery';
import {MockAutoSegment} from './auto-segment';
import {MockClusterControl} from './cluster-control';
import {MockDatasetGrid} from './dataset-grid';
import {MockFiles} from './files';
import {MockGraphEditor} from './graph-editor';
import {MockGridTable} from './grid-table';
import {MockImageEditor} from './image-editor';
import {MockIssuePanel} from './issue-panel';
import {MockKeypointPreset} from './keypoint-preset';
import {MockLicensePanel} from './license-panel';
import {MockMapView} from './map-view';
import {MockMeetingDetail} from './meeting-detail';
import {MockMesTopology} from './mes-topology';
import {MockMlflowRuns} from './mlflow-runs';
import {MockPointCloudEditor} from './point-cloud-editor';
import {MockTokenPanel} from './token-panel';
import {MockVideoLibrary} from './video-library';
import {MockVideoTimeline} from './video-timeline';
import {MockVmsLive} from './vms-live';
import {MockWiki} from './wiki';

export const MOCKS: Record<MockKey, ComponentType> = {
  imageEditor: MockImageEditor,
  keypointPreset: MockKeypointPreset,
  videoTimeline: MockVideoTimeline,
  pointCloudEditor: MockPointCloudEditor,
  autoSegment: MockAutoSegment,
  issuePanel: MockIssuePanel,
  datasetGrid: MockDatasetGrid,
  files: MockFiles,
  wiki: MockWiki,
  videoLibrary: MockVideoLibrary,
  tokenPanel: MockTokenPanel,
  licensePanel: MockLicensePanel,
  apiSnippet: MockApiSnippet,
  appsGallery: MockAppsGallery,
  graphEditor: MockGraphEditor,
  agentList: MockAgentList,
  clusterControl: MockClusterControl,
  vmsLive: MockVmsLive,
  mesTopology: MockMesTopology,
  mlflowRuns: MockMlflowRuns,
  gridTable: MockGridTable,
  mapView: MockMapView,
  meetingDetail: MockMeetingDetail,
};
