/* eslint-disable */
import {z} from 'zod';

export const ComputationStrategyEnum = z.enum(["UMAP","PCA","EMBEDDINGS"] as const);
export type ComputationStrategyEnum = z.infer<typeof ComputationStrategyEnum>;
export const ExtractorImplEnum = z.enum(["BIRDNET","PERCH","SURF_PERCH","VGGISH","YAMNET","MUSIC_CLASS","SPECTRUM","SPECTROGRAM","MPS","MFCC","NDSI","BI","ADI","HF","HT","MED","ACI","LEQ","LEQ_PERCENTILE","LEQ_DIFF"] as const);
export type ExtractorImplEnum = z.infer<typeof ExtractorImplEnum>;
export const AutoclusterImplEnum = z.enum(["HDBSCAN_EOM","HDBSCAN_LEAF"] as const);
export type AutoclusterImplEnum = z.infer<typeof AutoclusterImplEnum>;
export const ReducerImplEnum = z.enum(["UMAP","PCA"] as const);
export type ReducerImplEnum = z.infer<typeof ReducerImplEnum>;
export const MetricImplEnum = z.enum(["MEAN_STD","MEAN_SPREADING","SILHOUETTE","CONTINGENCY","OVERLAP"] as const);
export type MetricImplEnum = z.infer<typeof MetricImplEnum>;
export const MetricTypeEnum = z.enum(["ONE_D","TWO_D","TWO_D_PAIRING"] as const);
export type MetricTypeEnum = z.infer<typeof MetricTypeEnum>;
export const TrajectoryStepEnum = z.enum(["HOUR","DAY","MONTH"] as const);
export type TrajectoryStepEnum = z.infer<typeof TrajectoryStepEnum>;
export const StftWindowTypeEnum = z.enum(["HANN","HAMMING","BLACKMANHARRIS"] as const);
export type StftWindowTypeEnum = z.infer<typeof StftWindowTypeEnum>;
export const FrequencyScaleEnum = z.enum(["LIN","LOG","MEL"] as const);
export type FrequencyScaleEnum = z.infer<typeof FrequencyScaleEnum>;
export const AdiImplEnum = z.enum(["SHANNON","SIMPSON","INVSIMPSON"] as const);
export type AdiImplEnum = z.infer<typeof AdiImplEnum>;