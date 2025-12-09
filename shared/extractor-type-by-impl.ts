import {ExtractorImpl, ExtractorType} from './enums';

type ExtractorTypeByImpl = Record<ExtractorImpl, ExtractorType>;

export const extractorTypeByImpl: ExtractorTypeByImpl = {
  // neural
  [ExtractorImpl.enum.BIRDNET]: ExtractorType.enum.NEURAL,
  [ExtractorImpl.enum.PERCH]: ExtractorType.enum.NEURAL,
  [ExtractorImpl.enum.SURF_PERCH]: ExtractorType.enum.NEURAL,
  [ExtractorImpl.enum.VGGISH]: ExtractorType.enum.NEURAL,
  [ExtractorImpl.enum.YAMNET]: ExtractorType.enum.NEURAL,
  [ExtractorImpl.enum.MUSIC_CLASS]: ExtractorType.enum.NEURAL,

  // low level
  [ExtractorImpl.enum.SPECTRUM]: ExtractorType.enum.LOW_LEVEL,
  [ExtractorImpl.enum.SPECTROGRAM]: ExtractorType.enum.LOW_LEVEL,
  [ExtractorImpl.enum.MPS]: ExtractorType.enum.LOW_LEVEL,
  [ExtractorImpl.enum.MFCC]: ExtractorType.enum.LOW_LEVEL,

  // acoustics
  [ExtractorImpl.enum.NDSI]: ExtractorType.enum.ACOUSTICS,
  [ExtractorImpl.enum.BI]: ExtractorType.enum.ACOUSTICS,
  [ExtractorImpl.enum.ADI]: ExtractorType.enum.ACOUSTICS,
  [ExtractorImpl.enum.HF]: ExtractorType.enum.ACOUSTICS,
  [ExtractorImpl.enum.HT]: ExtractorType.enum.ACOUSTICS,
  [ExtractorImpl.enum.MED]: ExtractorType.enum.ACOUSTICS,
  [ExtractorImpl.enum.ACI]: ExtractorType.enum.ACOUSTICS,
  [ExtractorImpl.enum.LEQ]: ExtractorType.enum.ACOUSTICS,
  [ExtractorImpl.enum.LEQ_PERCENTILE]: ExtractorType.enum.ACOUSTICS,
  [ExtractorImpl.enum.LEQ_DIFF]: ExtractorType.enum.ACOUSTICS,
};
