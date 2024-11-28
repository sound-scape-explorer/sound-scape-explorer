import {type NeuralExtractorType} from 'src/panels/config/hooks/use-neural-extractor-state.ts';

interface ExtractorImplementationByXlsxType {
  vgg: NeuralExtractorType;
}

const extractorImplementationByXlsxType: ExtractorImplementationByXlsxType = {
  vgg: 'vgg',
};

export function findExtractorTypeByName(name: string): NeuralExtractorType {
  const keys = Object.keys(extractorImplementationByXlsxType);

  if (!keys.includes(name as NeuralExtractorType)) {
    throw new Error(`${name} is not an extractor`);
  }

  return extractorImplementationByXlsxType[
    name as keyof ExtractorImplementationByXlsxType
  ];
}
