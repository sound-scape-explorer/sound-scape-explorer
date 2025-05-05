import {ExtractorImplEnum} from '@shared/enums';
import {DrawerContent} from 'src/primitives/drawer-content.tsx';
import {Link} from 'src/primitives/link';

export function ExtractionExtractorsDrawerContent() {
  return (
    <DrawerContent
      content={[
        [
          ExtractorImplEnum.enum.BIRDNET,
          <div
            className="flex column"
            key={ExtractorImplEnum.enum.BIRDNET}
          >
            <span>AI-Powered Bird Sound Recognition.</span>
            <Link href="https://birdnet.cornell.edu/">Website</Link>
            <Link href="https://github.com/birdnet-team/BirdNET-Analyzer">
              GitHub
            </Link>
          </div>,
        ],
        [
          ExtractorImplEnum.enum.PERCH,
          <div
            className="flex column"
            key={ExtractorImplEnum.enum.PERCH}
          >
            <span>
              Google Bird Vocalization Classifier: A global bird embedding and
              classification model.
            </span>
            <Link href="https://www.kaggle.com/models/google/bird-vocalization-classifier">
              Kaggle
            </Link>
          </div>,
        ],
        [
          ExtractorImplEnum.enum.SURF_PERCH,
          <div
            className="flex column"
            key={ExtractorImplEnum.enum.SURF_PERCH}
          >
            <span>
              SurfPerch is a domain-adapted model for classification of sounds
              in coral reefs.
            </span>
            <Link href="https://www.kaggle.com/models/google/surfperch">
              Kaggle
            </Link>
          </div>,
        ],
        [
          ExtractorImplEnum.enum.VGGISH,
          <div
            className="flex column"
            key={ExtractorImplEnum.enum.VGGISH}
          >
            <span>
              An audio event embedding model trained on the YouTube-8M dataset.
            </span>
            <Link href="https://www.kaggle.com/models/google/vggish">
              Kaggle
            </Link>
          </div>,
        ],
        [
          ExtractorImplEnum.enum.YAMNET,
          <div
            className="flex column"
            key={ExtractorImplEnum.enum.YAMNET}
          >
            <span>
              An audio event classifier trained on the AudioSet dataset to
              predict audio events from the AudioSet ontology.
            </span>
            <Link href="https://www.kaggle.com/models/google/yamnet">
              Kaggle
            </Link>
          </div>,
        ],
        [
          ExtractorImplEnum.enum.MUSIC_CLASS,
          <div
            className="flex column"
            key={ExtractorImplEnum.enum.MUSIC_CLASS}
          >
            <span>
              Music genre classification system built on a convolutional neural
              network trained on Mel-spectrograms of 3-second audio samples.
            </span>
            <Link href="https://github.com/crlandsc/Music-Genre-Classification-Using-Convolutional-Neural-Networks">
              GitHub
            </Link>
          </div>,
        ],
        [ExtractorImplEnum.enum.SPECTRUM, 'Spectrum'],
        [ExtractorImplEnum.enum.SPECTROGRAM, 'Spectrograms'],
        [ExtractorImplEnum.enum.MPS, 'Modulation Power Spectrums'],
        [
          ExtractorImplEnum.enum.MFCC,
          'Mel-frequency cepstral coefficients (MFCCs)',
        ],
        [
          ExtractorImplEnum.enum.NDSI,
          'Normalized Difference Soundscape Index from a power spectrogram',
        ],
        [ExtractorImplEnum.enum.BI, 'Bioacoustics Index from a spectrogram'],
        [
          ExtractorImplEnum.enum.ADI,
          'Acoustic Diversity Index from a spectrogram',
        ],
        [
          ExtractorImplEnum.enum.HF,
          'Spectral entropy of a power spectral density (1d) or power spectrogram density (2d)',
        ],
        [
          ExtractorImplEnum.enum.HT,
          'Entropy of the envelope of an audio signal',
        ],
        [
          ExtractorImplEnum.enum.MED,
          'Median of the envelope of an audio signal',
        ],
        [
          ExtractorImplEnum.enum.ACI,
          'Acoustic Complexity Index from a spectrogram',
        ],
        [ExtractorImplEnum.enum.LEQ, 'Equivalent Continuous Sound Level'],
        [
          ExtractorImplEnum.enum.LEQ_PERCENTILE,
          'Sound level exceeding a specified percentage',
        ],
        [
          ExtractorImplEnum.enum.LEQ_DIFF,
          'Calculation of the difference between Leq percentiles',
        ],
      ]}
    />
  );
}
