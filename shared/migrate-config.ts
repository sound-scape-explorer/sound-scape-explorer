/**
 * Migrate configuration files between v14 beta versions
 *
 * Files:
 * - LABEL_* properties → tags object
 *
 * Trajectories:
 * - labelName/labelValue → tagName/tagValue
 * - step → smoothingWindow
 */

import {ConfigDto} from '@shared/dtos';
import {readFileSync, writeFileSync} from 'fs';

import {VERSION} from '../campaign/src/version';
import {
  SMOOTHING_WINDOW_PRESETS,
  type SmoothingWindowPreset,
} from './constants';

// type definitions

interface OldOrNewTrajectory {
  index: number;
  name: string;
  start: string;
  end: string;
  labelName?: string;
  labelValue?: string;
  step?: SmoothingWindowPreset;
  // new keys
  tagName?: string;
  tagValue?: string;
  smoothingWindow?: number;
}

interface NewTrajectory {
  index: number;
  name: string;
  start: string;
  end: string;
  tagName: string;
  tagValue: string;
  smoothingWindow: number;
}

type LabelProperty = `LABEL_${string}`;
type Tags = Record<string, string>;

interface OldOrNewFile {
  Index: string;
  Path: string;
  Date: string;
  Site: string;
  tags?: Tags; // new labels
  [p: LabelProperty]: string; // old labels
}

interface NewFile {
  Index: string;
  Path: string;
  Date: string;
  Site: string;
  tags: Tags;
}

interface OldOrNewExtraction {
  trajectories: OldOrNewTrajectory[];
}

interface NewExtraction {
  trajectories: NewTrajectory[];
}

interface OldOrNewConfig {
  extractions: OldOrNewExtraction[];
  files: OldOrNewFile[];
}

interface NewConfig {
  version: string;
  extractions: NewExtraction[];
  files: NewFile[];
}

const target = process.argv[2];
const config: OldOrNewConfig = JSON.parse(readFileSync(target, 'utf8'));

// files: labels to tag objects

const files: NewFile[] = [];

for (const file of config.files) {
  const keys = Object.keys(file);
  const labels = keys.filter((key) =>
    key.startsWith('LABEL_'),
  ) as LabelProperty[];

  const newFile: NewFile = {
    Index: file.Index,
    Path: file.Path,
    Date: file.Date,
    Site: file.Site,
    tags: file.tags ?? {},
  };

  for (const label of labels) {
    const tag = label.replace('LABEL_', '');
    const value = file[label];
    newFile.tags[tag] = value;
  }

  files.push(newFile);
}

// extractions: trajectories

const extractions: NewExtraction[] = [];

for (const extraction of config.extractions) {
  const trajectories: NewTrajectory[] = [];

  for (const trajectory of extraction.trajectories) {
    const newTrajectory: NewTrajectory = {
      index: trajectory.index,
      name: trajectory.name,
      start: trajectory.start,
      end: trajectory.end,
      tagName: trajectory.tagName ?? trajectory.labelName ?? '',
      tagValue: trajectory.tagValue ?? trajectory.labelValue ?? '',
      smoothingWindow:
        trajectory.smoothingWindow ??
        SMOOTHING_WINDOW_PRESETS[trajectory.step ?? 'HOUR'],
    };

    trajectories.push(newTrajectory);
  }

  const newExtraction: NewExtraction = {
    ...extraction,
    trajectories,
  };

  extractions.push(newExtraction);
}

// construct new config

const newConfig: NewConfig = {
  ...config,
  version: VERSION,
  extractions,
  files,
};

const dto = ConfigDto.parse(newConfig);

writeFileSync(target, JSON.stringify(dto, null, 2));
