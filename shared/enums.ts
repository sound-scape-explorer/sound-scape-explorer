export enum ComputationStrategy {
  Umap = 'umap',
  Pca = 'pca',
  Embeddings = 'embeddings',
}

export enum ExtractorImpl {
  vgg = 'vgg',
  melogram = 'melogram',
  melspectrum = 'melspectrum',
}

export enum IndexImpl {
  leq_maad = 'leq_maad',
  ht = 'ht',
  hf = 'hf',
  med = 'med',
  ndsi = 'ndsi',
  aci = 'aci',
  adi = 'adi',
  bi = 'bi',
}

export enum AutoclusterImpl {
  hdbscan_eom = 'hdbscan_eom',
  hdbscan_leaf = 'hdbscan_leaf',
}

export enum TrajectoryStep {
  Hour = 'hour',
  Day = 'day',
  Month = 'month',
}

export enum DigesterImpl {
  silhouette = 'silhouette',
  contingency = 'contingency',
  sum_var = 'sum_var',
  sum_std = 'sum_std',
  mean_std = 'mean_std',
  mean_spreading = 'mean_spreading',
  distance = 'distance',
  overlap = 'overlap',
}

export enum ReducerImpl {
  umap = 'umap',
  pca = 'pca',
}

