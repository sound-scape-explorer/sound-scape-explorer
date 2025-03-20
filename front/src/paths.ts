/* eslint-disable @typescript-eslint/no-namespace */

// directly taken from python domain objects' paths

const registeredPaths: Set<string> = new Set();

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

// TODO: remove me?
function build_path(path: string, ...attributes: (string | number)[]): string {
  if (!registeredPaths.has(path)) {
    throw new Error(`Path ${path} not registered`);
  }

  return path + attributes.map((el) => `/${el}`).join('');
}

export namespace SettingsPath {
  export const settings = register_path('settings');
}

export namespace FilePath {
  export const indices = register_path('files', 'indices');
  export const relative_paths = register_path('files', 'relative_paths');
  export const absolute_paths = register_path('files', 'absolute_paths');
  export const timestamps = register_path('files', 'timestamps');
  export const sites = register_path('files', 'sites');
  export const durations = register_path('files', 'durations');
  export const label_properties = register_path('files', 'label_properties');
  export const label_values = register_path('files', 'label_values');
}

export namespace BandPath {
  export const indices = register_path('bands', 'indices');
  export const names = register_path('bands', 'names');
  export const lows = register_path('bands', 'lows');
  export const highs = register_path('bands', 'highs');
}

export namespace IntegrationPath {
  export const indices = register_path('integrations', 'indices');
  export const names = register_path('integrations', 'names');
  export const durations = register_path('integrations', 'durations');
}

export namespace ExtractorPath {
  export const indices = register_path('extractors', 'indices');
  export const names = register_path('extractors', 'names');
  export const impls = register_path('extractors', 'impls');
  export const offsets = register_path('extractors', 'offsets');
  export const steps = register_path('extractors', 'steps');
  export const is_persists = register_path('extractors', 'is_persists');
}

export namespace IndexPath {
  export const indices = register_path('indices', 'indices');
  export const impls = register_path('indices', 'impls');
  export const offsets = register_path('indices', 'offsets');
  export const steps = register_path('indices', 'steps');
  export const is_persists = register_path('indices', 'is_persists');
}

export namespace RangePath {
  export const indices = register_path('ranges', 'indices');
  export const names = register_path('ranges', 'names');
  export const starts = register_path('ranges', 'starts');
  export const ends = register_path('ranges', 'ends');
}

export namespace AutoclusterPath {
  export const indices = register_path('autoclusters', 'indices');
  export const impls = register_path('autoclusters', 'impls');
  export const min_cluster_sizes = register_path(
    'autoclusters',
    'min_cluster_sizes',
  );
  export const min_samples = register_path('autoclusters', 'min_samples');
  export const alphas = register_path('autoclusters', 'alphas');
  export const epsilons = register_path('autoclusters', 'epsilons');
}

export namespace TrajectoryPath {
  export const indices = register_path('trajectories', 'indices');
  export const names = register_path('trajectories', 'names');
  export const starts = register_path('trajectories', 'starts');
  export const ends = register_path('trajectories', 'ends');
  export const label_properties = register_path(
    'trajectories',
    'label_properties',
  );
  export const label_values = register_path('trajectories', 'label_values');
  export const steps = register_path('trajectories', 'steps');
}

export namespace DigesterPath {
  export const indices = register_path('digesters', 'indices');
  export const impls = register_path('digesters', 'impls');
  export const is_pairings = register_path('digesters', 'is_pairings');
}

export namespace ReducerPath {
  export const indices = register_path('reducers', 'indices');
  export const impls = register_path('reducers', 'impls');
  export const dimensions = register_path('reducers', 'dimensions');
  export const bands = register_path('reducers', 'bands');
  export const integrations = register_path('reducers', 'integrations');
  export const extractors = register_path('reducers', 'extractors');
}
