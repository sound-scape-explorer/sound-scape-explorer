export interface ApiUMAPInterface {
  binSize: number;
  /**
   * Coordinates
   */
  X: number[][];
  /**
   * Label
   */
  l: string[];
  /**
   * Timestamps in seconds
   */
  t: number[];
  /**
   * Columns
   */
  c: string[][];
}
