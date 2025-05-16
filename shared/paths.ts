/* eslint-disable @typescript-eslint/no-namespace */

// todo: rename me to PathRegistry.ts or something

import {StorageDomain} from '@shared/enums';

const registeredPaths = new Set<string>();

function register_path(
  domain: StorageDomain,
  ...attributes: (string | number)[]
): string {
  const path = `/${domain}` + attributes.map((attr) => `/${attr}`).join('');

  if (registeredPaths.has(path)) {
    throw new Error(`Path ${path} already registered`);
  }

  registeredPaths.add(path);
  return path;
}

function build_path(path: string, ...attributes: (string | number)[]): string {
  if (!registeredPaths.has(path)) {
    throw new Error(`Path ${path} not registered`);
  }

  return path + attributes.map((el) => `/${el}`).join('');
}

export namespace ConfigPath {
  export const config = register_path(StorageDomain.enum.config);
}

const indexDomain = 'indices' as StorageDomain;

// todo: update me when histograms are ready
export namespace IndexPath {
  export const indices = register_path(indexDomain, 'indices');
  export const impls = register_path(indexDomain, 'impls');
  export const offsets = register_path(indexDomain, 'offsets');
  export const steps = register_path(indexDomain, 'steps');
  export const is_persists = register_path(indexDomain, 'is_persists');
}

namespace AutoclusterPath {
  export const autoclusters = register_path(StorageDomain.enum.autoclusters);
}

export namespace AutoclusterPathInstance {
  export const autoclusters = (...suffix: number[]) =>
    build_path(AutoclusterPath.autoclusters, ...suffix);
}

namespace TrajectoryPath {
  export const path = register_path(StorageDomain.enum.trajectories, 'path');
  export const timestamps = register_path(
    StorageDomain.enum.trajectories,
    'timestamps',
  );
}

export namespace TrajectoryPathInstance {
  export const path = (...suffix: number[]) =>
    build_path(TrajectoryPath.path, ...suffix);

  export const timestamps = (...suffix: number[]) =>
    build_path(TrajectoryPath.timestamps, ...suffix);
}

namespace RelativeTrajectoryPath {
  export const data = register_path(
    StorageDomain.enum.relative_trajectories,
    'data',
  );
  export const timestamps = register_path(
    StorageDomain.enum.relative_trajectories,
    'timestamps',
  );
  export const deciles = register_path(
    StorageDomain.enum.relative_trajectories,
    'deciles',
  );
}

export namespace RelativeTrajectoryPathInstance {
  export const data = (...suffix: (string | number)[]) =>
    build_path(RelativeTrajectoryPath.data, ...suffix);

  export const timestamps = (...suffix: (string | number)[]) =>
    build_path(RelativeTrajectoryPath.timestamps, ...suffix);

  export const deciles = (...suffix: (string | number)[]) =>
    build_path(RelativeTrajectoryPath.deciles, ...suffix);
}

namespace MetricPath {
  export const data = register_path(StorageDomain.enum.metrics, 'data');
}

export namespace MetricPathInstance {
  export const data = (...suffix: (string | number)[]) =>
    build_path(MetricPath.data, ...suffix);
}

namespace ReductionPath {
  export const reductions = register_path(StorageDomain.enum.reductions);
}

export namespace ReductionPathInstance {
  export const reductions = (...suffix: number[]) =>
    build_path(ReductionPath.reductions, ...suffix);
}

namespace AggregationPath {
  export const embeddings = register_path(
    StorageDomain.enum.aggregations,
    'embeddings',
  );
  export const timestamps = register_path(
    StorageDomain.enum.aggregations,
    'timestamps',
  );
  export const file_indices = register_path(
    StorageDomain.enum.aggregations,
    'file_indices',
  );
  export const file_relative_starts = register_path(
    StorageDomain.enum.aggregations,
    'file_relative_starts',
  );
  export const extractor_indices = register_path(
    StorageDomain.enum.aggregations,
    'extractor_indices',
  );
}

export namespace AggregationPathInstance {
  export const embeddings = (...suffix: (string | number)[]) =>
    build_path(AggregationPath.embeddings, ...suffix);

  export const timestamps = (...suffix: (string | number)[]) =>
    build_path(AggregationPath.timestamps, ...suffix);

  export const file_indices = (...suffix: (string | number)[]) =>
    build_path(AggregationPath.file_indices, ...suffix);

  export const file_relative_starts = (...suffix: (string | number)[]) =>
    build_path(AggregationPath.file_relative_starts, ...suffix);

  export const extractor_indices = (...suffix: (string | number)[]) =>
    build_path(AggregationPath.extractor_indices, ...suffix);
}
