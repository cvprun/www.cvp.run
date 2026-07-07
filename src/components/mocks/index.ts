import type {ComponentType} from 'react';

import type {MockKey} from '@/lib/site';

import {MockApiSnippet} from './api-snippet';
import {MockAutoSegment} from './auto-segment';
import {MockDatasetGrid} from './dataset-grid';
import {MockFiles} from './files';
import {MockImageEditor} from './image-editor';
import {MockIssuePanel} from './issue-panel';
import {MockKeypointPreset} from './keypoint-preset';
import {MockLicensePanel} from './license-panel';
import {MockPointCloudEditor} from './point-cloud-editor';
import {MockTokenPanel} from './token-panel';
import {MockVideoLibrary} from './video-library';
import {MockVideoTimeline} from './video-timeline';
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
};
