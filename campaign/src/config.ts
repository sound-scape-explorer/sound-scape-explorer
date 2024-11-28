interface Config {
  version: string;
  settings: Settings;
  paths: {
    config: string;
    storage: string;
  };
  files: File[];
  bands: Band[];
  integrations: Integration[];
  ranges: Range_[];
  extractions: Extraction[]; // an extraction is a combination of filtering + nn extraction + integration + reducing
}

interface File {
  path: string;
  tags: FileTag[];
}

interface FileTag {
  property: string;
  value: string;
}

interface Band {
  index: number
}

interface Integration {
  index: number
}

interface Range_ {
  index: number
}

interface Extraction {
  index: number;
  band: Band;
  integration: Integration;
  extractor: "vgg" | "melogram";
  reducer: Reducer;
  trajectories?: Trajectory[];
}

interface Reducer {
  type: "umap";
  dimensions: number;
}

interface Aggregation {
}

interface Settings {
}

interface Extractor {
}

interface Trajectory {
}

interface ExtractionNew {
  index: number;
  isNeural: boolean;
  band: Band;
  integration: Integration;
  extractor: Extractor;
}


