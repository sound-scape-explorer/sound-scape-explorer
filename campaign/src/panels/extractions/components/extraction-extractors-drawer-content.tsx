import {ExtractorImpl} from '@shared/enums';
import {DrawerContent} from 'src/primitives/drawer-content.tsx';
import {Link} from 'src/primitives/link';

export function ExtractionExtractorsDrawerContent() {
  return (
    <DrawerContent
      content={[
        [
          ExtractorImpl.enum.BIRDNET,
          <div
            className="flex column"
            key={ExtractorImpl.enum.BIRDNET}
          >
            <span>AI-Powered Bird Sound Recognition.</span>
            <Link href="https://birdnet.cornell.edu/">Website</Link>
            <Link href="https://github.com/birdnet-team/BirdNET-Analyzer">
              GitHub
            </Link>
          </div>,
        ],
        [
          ExtractorImpl.enum.PERCH,
          <div
            className="flex column"
            key={ExtractorImpl.enum.PERCH}
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
          ExtractorImpl.enum.SURF_PERCH,
          <div
            className="flex column"
            key={ExtractorImpl.enum.SURF_PERCH}
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
          ExtractorImpl.enum.VGGISH,
          <div
            className="flex column"
            key={ExtractorImpl.enum.VGGISH}
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
          ExtractorImpl.enum.YAMNET,
          <div
            className="flex column"
            key={ExtractorImpl.enum.YAMNET}
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
          ExtractorImpl.enum.MUSIC_CLASS,
          <div
            className="flex column"
            key={ExtractorImpl.enum.MUSIC_CLASS}
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
        [ExtractorImpl.enum.SPECTRUM, 'Spectrum'],
        [ExtractorImpl.enum.SPECTROGRAM, 'Spectrograms'],
        [ExtractorImpl.enum.MPS, 'Modulation Power Spectrums'],
        [
          ExtractorImpl.enum.MFCC,
          'Mel-frequency cepstral coefficients (MFCCs)',
        ],
        [
          ExtractorImpl.enum.NDSI,
          'Normalized Difference Soundscape Index from a power spectrogram',
        ],
        [ExtractorImpl.enum.BI, 'Bioacoustics Index from a spectrogram'],
        [ExtractorImpl.enum.ADI, 'Acoustic Diversity Index from a spectrogram'],
        [
          ExtractorImpl.enum.HF,
          'Spectral entropy of a power spectral density (1d) or power spectrogram density (2d)',
        ],
        [ExtractorImpl.enum.HT, 'Entropy of the envelope of an audio signal'],
        [ExtractorImpl.enum.MED, 'Median of the envelope of an audio signal'],
        [
          ExtractorImpl.enum.ACI,
          'Acoustic Complexity Index from a spectrogram',
        ],
        [ExtractorImpl.enum.LEQ, 'Equivalent Continuous Sound Level'],
        [
          ExtractorImpl.enum.LEQ_PERCENTILE,
          'Sound level exceeding a specified percentage',
        ],
        [
          ExtractorImpl.enum.LEQ_DIFF,
          'Calculation of the difference between Leq percentiles',
        ],
      ]}
    />
  );
}
