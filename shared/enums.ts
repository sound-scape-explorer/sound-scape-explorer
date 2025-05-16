import {z} from 'zod';

export const StorageDomain = z.enum(["config","extractions","aggregations","reductions","computations","mean_distance_matrix","autoclusters","metrics","trajectories","relative_trajectories"]);
// eslint-disable-next-line no-redeclare
export type StorageDomain = z.infer<typeof StorageDomain>;

export const ComputationStrategy = z.enum(["UMAP","PCA","EMBEDDINGS"]);
// eslint-disable-next-line no-redeclare
export type ComputationStrategy = z.infer<typeof ComputationStrategy>;

export const ExtractorImpl = z.enum(["BIRDNET","PERCH","SURF_PERCH","VGGISH","YAMNET","MUSIC_CLASS","SPECTRUM","SPECTROGRAM","MPS","MFCC","NDSI","BI","ADI","HF","HT","MED","ACI","LEQ","LEQ_PERCENTILE","LEQ_DIFF"]);
// eslint-disable-next-line no-redeclare
export type ExtractorImpl = z.infer<typeof ExtractorImpl>;

export const AutoclusterImpl = z.enum(["HDBSCAN_EOM","HDBSCAN_LEAF"]);
// eslint-disable-next-line no-redeclare
export type AutoclusterImpl = z.infer<typeof AutoclusterImpl>;

export const ReducerImpl = z.enum(["UMAP","PCA"]);
// eslint-disable-next-line no-redeclare
export type ReducerImpl = z.infer<typeof ReducerImpl>;

export const MetricImpl = z.enum(["MEAN_STD","MEAN_SPREADING","SILHOUETTE","CONTINGENCY","OVERLAP"]);
// eslint-disable-next-line no-redeclare
export type MetricImpl = z.infer<typeof MetricImpl>;

export const MetricType = z.enum(["ONE_D","TWO_D","TWO_D_PAIRING"]);
// eslint-disable-next-line no-redeclare
export type MetricType = z.infer<typeof MetricType>;

export const StftWindowType = z.enum(["HANN","HAMMING","BLACKMANHARRIS"]);
// eslint-disable-next-line no-redeclare
export type StftWindowType = z.infer<typeof StftWindowType>;

export const FrequencyScale = z.enum(["LIN","LOG","MEL"]);
// eslint-disable-next-line no-redeclare
export type FrequencyScale = z.infer<typeof FrequencyScale>;

export const AdiImpl = z.enum(["SHANNON","SIMPSON","INVSIMPSON"]);
// eslint-disable-next-line no-redeclare
export type AdiImpl = z.infer<typeof AdiImpl>;
