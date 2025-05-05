// INFO: A block corresponds to one audio
// todo: replace me from intervals.windows
export interface BlockDetails {
  start: number; // ms
  fileStart: number; // relative
  file: string; // path
  fileIndex: number;
}
