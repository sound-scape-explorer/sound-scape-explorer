import {ExtractorImpl} from '@shared/enums';
import {DrawerContent} from 'src/primitives/drawer-content.tsx';
import {Link} from 'src/primitives/link';

export function ExtractionExtractorsDrawerContent() {
  return (
    <DrawerContent
      content={[
        [
          'Extractors',
          <div
            className="flex column"
            key={ExtractorImpl.enum.BIRDNET}
          >
            {/* TODO: to improve */}
            <span>agg.</span>
            <span>
              Useful to exclude acoustic indicators from the reduced
              visualisations.
            </span>
          </div>,
        ],
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
        [
          ExtractorImpl.enum.SPECTRUM,
          <div
            className="flex column"
            key={ExtractorImpl.enum.SPECTRUM}
          >
            <span>
              <code>n_bands</code> number of frequency bands
            </span>
            <span>
              <code>scale</code> frequency scale
            </span>
            <Link href="https://librosa.org/doc/0.11.0/generated/librosa.stft.html">
              librosa.stft
            </Link>
          </div>,
        ],
        [
          ExtractorImpl.enum.SPECTROGRAM,
          <div
            className="flex column"
            key={ExtractorImpl.enum.SPECTROGRAM}
          >
            <span>
              <code>n_bands</code> number of frequency bands
            </span>
            <span>
              <code>scale</code> frequency scale
            </span>
            <Link href="https://librosa.org/doc/0.11.0/generated/librosa.stft.html">
              librosa.stft
            </Link>
          </div>,
        ],
        [
          ExtractorImpl.enum.MPS,
          <div
            className="flex column"
            key={ExtractorImpl.enum.MPS}
          >
            <span>Modulation Power Spectrum analysis using two-stage STFT</span>
            <span>
              <code>n_bands</code> number of frequency bands
            </span>
            <span>
              <code>scale</code> frequency scale
            </span>
            <span>
              <code>STFT overlap ratios</code> from 0.0 to 1.0
            </span>
            <Link href="https://librosa.org/doc/0.11.0/generated/librosa.stft.html">
              librosa.stft
            </Link>
            <Link href="https://docs.scipy.org/doc/scipy/reference/generated/scipy.fftpack.fft2.html">
              scipy.fftpack.fft2
            </Link>
          </div>,
        ],
        [
          ExtractorImpl.enum.MFCC,
          <div
            className="flex column"
            key={ExtractorImpl.enum.MPS}
          >
            <span>Mel-frequency cepstral coefficients (MFCCs)</span>
            <Link href="https://librosa.org/doc/0.11.0/generated/librosa.feature.mfcc.html">
              librosa.feature.mfcc
            </Link>
          </div>,
        ],
        [
          ExtractorImpl.enum.NDSI,
          <div
            className="flex column"
            key={ExtractorImpl.enum.NDSI}
          >
            <span>
              Normalized Difference Soundscape Index from a power spectrogram.
            </span>
            <Link href="https://scikit-maad.github.io/generated/maad.features.soundscape_index.html">
              scikit-maad doc
            </Link>
          </div>,
        ],
        [
          ExtractorImpl.enum.BI,
          <div
            className="flex column"
            key={ExtractorImpl.enum.BI}
          >
            <span>Bioacoustics Index from a spectrogram.</span>
            <Link href="https://scikit-maad.github.io/generated/maad.features.bioacoustics_index.html">
              scikit-maad doc
            </Link>
          </div>,
        ],
        [
          ExtractorImpl.enum.ADI,
          <div
            className="flex column"
            key={ExtractorImpl.enum.ADI}
          >
            <span>Acoustic Diversity Index from a spectrogram</span>
            <Link href="https://scikit-maad.github.io/generated/maad.features.acoustic_diversity_index.html">
              scikit-maad doc
            </Link>
          </div>,
        ],
        [
          ExtractorImpl.enum.HF,
          <div
            className="flex column"
            key={ExtractorImpl.enum.HF}
          >
            <span>
              Spectral entropy of a power spectral density (1d) or power
              spectrogram density (2d)
            </span>
            <Link href="https://scikit-maad.github.io/generated/maad.features.frequency_entropy.html">
              scikit-maad doc
            </Link>
          </div>,
        ],
        [
          ExtractorImpl.enum.HT,
          <div
            className="flex column"
            key={ExtractorImpl.enum.HT}
          >
            <span>Entropy of the envelope of an audio signal</span>
            <Link href="https://scikit-maad.github.io/generated/maad.features.temporal_entropy.html">
              scikit-maad doc
            </Link>
          </div>,
        ],
        [
          ExtractorImpl.enum.MED,
          <div
            className="flex column"
            key={ExtractorImpl.enum.MED}
          >
            <span>Median of the envelope of an audio signal</span>
            <Link href="https://scikit-maad.github.io/generated/maad.features.temporal_median.html">
              scikit-maad doc
            </Link>
          </div>,
        ],
        [
          ExtractorImpl.enum.ACI,
          <div
            className="flex column"
            key={ExtractorImpl.enum.ACI}
          >
            <span>Acoustic Complexity Index from a spectrogram</span>
            <Link href="https://scikit-maad.github.io/generated/maad.features.acoustic_complexity_index.html">
              scikit-maad doc
            </Link>
          </div>,
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
