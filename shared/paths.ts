/* eslint-disable @typescript-eslint/no-namespace */

// todo: rename me to PathRegistry.ts or something

const registeredPaths = new Set<string>();

function register_path(
  domain: string,
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
  export const configs = register_path('configs');
}

export namespace IndexPath {
  export const indices = register_path('indices', 'indices');
  export const impls = register_path('indices', 'impls');
  export const offsets = register_path('indices', 'offsets');
  export const steps = register_path('indices', 'steps');
  export const is_persists = register_path('indices', 'is_persists');
}

namespace AutoclusteredPath {
  export const autoclustered = register_path('autoclustered');
}

export namespace AutoclusteredInstancePath {
  export const autoclustered = (...suffix: number[]) =>
    build_path(AutoclusteredPath.autoclustered, ...suffix);
}

namespace TracedPath {
  export const path = register_path('traced', 'path');
  export const timestamps = register_path('traced', 'timestamps');
}

export namespace TracedInstancePath {
  export const path = (...suffix: number[]) =>
    build_path(TracedPath.path, ...suffix);

  export const timestamps = (...suffix: number[]) =>
    build_path(TracedPath.timestamps, ...suffix);
}

namespace RelativeTracedPath {
  export const data = register_path('relative_traced', 'data');
  export const timestamps = register_path('relative_traced', 'timestamps');
  export const deciles = register_path('relative_traced', 'deciles');
}

export namespace RelativeTracedInstancePath {
  export const data = (...suffix: (string | number)[]) =>
    build_path(RelativeTracedPath.data, ...suffix);

  export const timestamps = (...suffix: (string | number)[]) =>
    build_path(RelativeTracedPath.timestamps, ...suffix);

  export const deciles = (...suffix: (string | number)[]) =>
    build_path(RelativeTracedPath.deciles, ...suffix);
}

namespace MetricPath {
  export const data = register_path('metric', 'data');
}

export namespace MetricInstancePath {
  export const data = (...suffix: (string | number)[]) =>
    build_path(MetricPath.data, ...suffix);
}

namespace ReducedPath {
  export const reduced = register_path('reduced');
}

export namespace ReducedInstancePath {
  export const reduced = (...suffix: number[]) =>
    build_path(ReducedPath.reduced, ...suffix);
}

namespace AggregatedPath {
  export const embeddings = register_path('aggregated', 'embeddings');
  export const timestamps = register_path('aggregated', 'timestamps');
  export const file_indices = register_path('aggregated', 'file_indices');
  export const file_relative_starts = register_path(
    'aggregated',
    'file_relative_starts',
  );
  export const extractor_indices = register_path(
    'aggregated',
    'extractor_indices',
  );
}

export namespace AggregatedInstancePath {
  export const embeddings = (...suffix: (string | number)[]) =>
    build_path(AggregatedPath.embeddings, ...suffix);

  export const timestamps = (...suffix: (string | number)[]) =>
    build_path(AggregatedPath.timestamps, ...suffix);

  export const file_indices = (...suffix: (string | number)[]) =>
    build_path(AggregatedPath.file_indices, ...suffix);

  export const file_relative_starts = (...suffix: (string | number)[]) =>
    build_path(AggregatedPath.file_relative_starts, ...suffix);

  export const extractor_indices = (...suffix: (string | number)[]) =>
    build_path(AggregatedPath.extractor_indices, ...suffix);
}
