/* eslint-disable @typescript-eslint/no-namespace */

import {
  AggregationStoragePath,
  RelativeTrajectoryStoragePath,
  StorageDomain,
  TrajectoryStoragePath,
} from '@shared/enums';

const registeredPaths = new Set<string>();

function register(domain: StorageDomain, additional?: string): string {
  let path = `/${domain}`;

  if (typeof additional !== 'undefined') {
    path += `/${additional}`;
  }

  if (registeredPaths.has(path)) {
    throw new Error(`Path ${path} already registered`);
  }

  registeredPaths.add(path);
  return path;
}

function build(path: string, ...attributes: (string | number)[]): string {
  if (!registeredPaths.has(path)) {
    throw new Error(`Path ${path} not registered`);
  }

  return path + attributes.map((el) => `/${el}`).join('');
}

export namespace ConfigPath {
  export const config = register(StorageDomain.enum.config);
}

const indexDomain = 'indices' as StorageDomain;

// todo: update me when histograms are ready
export namespace IndexPath {
  export const indices = register(indexDomain, 'indices');
  export const impls = register(indexDomain, 'impls');
  export const offsets = register(indexDomain, 'offsets');
  export const steps = register(indexDomain, 'steps');
  export const is_persists = register(indexDomain, 'is_persists');
}

namespace AutoclusterPath {
  export const autoclusters = register(StorageDomain.enum.autoclusters);
}

export namespace AutoclusterPathInstance {
  export const autoclusters = (...suffix: number[]) =>
    build(AutoclusterPath.autoclusters, ...suffix);
}

namespace TrajectoryPath {
  export const path = register(
    StorageDomain.enum.trajectories,
    TrajectoryStoragePath.enum.path,
  );
  export const timestamps = register(
    StorageDomain.enum.trajectories,
    TrajectoryStoragePath.enum.timestamps,
  );
}

export namespace TrajectoryPathInstance {
  export const path = (...suffix: number[]) =>
    build(TrajectoryPath.path, ...suffix);

  export const timestamps = (...suffix: number[]) =>
    build(TrajectoryPath.timestamps, ...suffix);
}

namespace RelativeTrajectoryPath {
  export const distances = register(
    StorageDomain.enum.relative_trajectories,
    RelativeTrajectoryStoragePath.enum.distances,
  );
  export const timestamps = register(
    StorageDomain.enum.relative_trajectories,
    RelativeTrajectoryStoragePath.enum.timestamps,
  );
  export const deciles = register(
    StorageDomain.enum.relative_trajectories,
    RelativeTrajectoryStoragePath.enum.deciles,
  );
}

export namespace RelativeTrajectoryPathInstance {
  export const distances = (...suffix: (string | number)[]) =>
    build(RelativeTrajectoryPath.distances, ...suffix);

  export const timestamps = (...suffix: (string | number)[]) =>
    build(RelativeTrajectoryPath.timestamps, ...suffix);

  export const deciles = (...suffix: (string | number)[]) =>
    build(RelativeTrajectoryPath.deciles, ...suffix);
}

namespace MetricPath {
  export const metrics = register(StorageDomain.enum.metrics);
}

export namespace MetricPathInstance {
  export const data = (...suffix: (string | number)[]) =>
    build(MetricPath.metrics, ...suffix);
}

namespace ReductionPath {
  export const reductions = register(StorageDomain.enum.reductions);
}

export namespace ReductionPathInstance {
  export const reductions = (...suffix: number[]) =>
    build(ReductionPath.reductions, ...suffix);
}

namespace AggregationPath {
  export const embeddings = register(
    StorageDomain.enum.aggregations,
    AggregationStoragePath.enum.embeddings,
  );
  export const timestamps = register(
    StorageDomain.enum.aggregations,
    AggregationStoragePath.enum.timestamps,
  );
  export const file_indices = register(
    StorageDomain.enum.aggregations,
    AggregationStoragePath.enum.file_indices,
  );
  export const file_relative_starts = register(
    StorageDomain.enum.aggregations,
    AggregationStoragePath.enum.file_relative_starts,
  );
  export const extractor_indices = register(
    StorageDomain.enum.aggregations,
    AggregationStoragePath.enum.extractor_indices,
  );
}

export namespace AggregationPathInstance {
  export const embeddings = (...suffix: (string | number)[]) =>
    build(AggregationPath.embeddings, ...suffix);

  export const timestamps = (...suffix: (string | number)[]) =>
    build(AggregationPath.timestamps, ...suffix);

  export const file_indices = (...suffix: (string | number)[]) =>
    build(AggregationPath.file_indices, ...suffix);

  export const file_relative_starts = (...suffix: (string | number)[]) =>
    build(AggregationPath.file_relative_starts, ...suffix);

  export const extractor_indices = (...suffix: (string | number)[]) =>
    build(AggregationPath.extractor_indices, ...suffix);
}
