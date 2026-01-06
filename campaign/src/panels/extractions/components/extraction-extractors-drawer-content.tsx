import {ExtractorImpl} from '@shared/enums';
import {DrawerContent} from 'src/primitives/drawer-content.tsx';
import {Link} from 'src/primitives/link';

export function ExtractionExtractorsDrawerContent() {
  return (
    <DrawerContent
      items={[
        {
          index: 0,
          title: 'Extractors',
          body: (
            <div className="flex column">
              <code>agg.</code>
              <span>
                Untick this to prevent acoustic indicator extractions to be
                aggregated (integrations).
              </span>
            </div>
          ),
        },
        {
          index: 1,
          title: ExtractorImpl.enum.BIRDNET,
          body: (
            <div className="flex column">
              <span>AI-Powered Bird Sound Recognition.</span>
              <Link href="https://birdnet.cornell.edu/">Website</Link>
              <Link href="https://github.com/birdnet-team/BirdNET-Analyzer">
                GitHub
              </Link>
            </div>
          ),
        },
        {
          index: 2,
          title: ExtractorImpl.enum.PERCH,
          body: (
            <div className="flex column">
              <span>
                Google Bird Vocalization Classifier: A global bird embedding and
                classification model.
              </span>
              <Link href="https://www.kaggle.com/models/google/bird-vocalization-classifier">
                Kaggle
              </Link>
            </div>
          ),
        },
        {
          index: 3,
          title: ExtractorImpl.enum.SURF_PERCH,
          body: (
            <div className="flex column">
              <span>
                SurfPerch is a domain-adapted model for classification of sounds
                in coral reefs.
              </span>
              <Link href="https://www.kaggle.com/models/google/surfperch">
                Kaggle
              </Link>
            </div>
          ),
        },
        {
          index: 4,
          title: ExtractorImpl.enum.VGGISH,
          body: (
            <div className="flex column">
              <span>
                An audio event embedding model trained on the YouTube-8M
                dataset.
              </span>
              <Link href="https://www.kaggle.com/models/google/vggish">
                Kaggle
              </Link>
            </div>
          ),
        },
        {
          index: 5,
          title: ExtractorImpl.enum.YAMNET,
          body: (
            <div className="flex column">
              <span>
                An audio event classifier trained on the AudioSet dataset to
                predict audio events from the AudioSet ontology.
              </span>
              <Link href="https://www.kaggle.com/models/google/yamnet">
                Kaggle
              </Link>
            </div>
          ),
        },
        {
          index: 6,
          title: ExtractorImpl.enum.MUSIC_CLASS,
          body: (
            <div className="flex column">
              <span>
                Music genre classification system built on a convolutional
                neural network trained on Mel-spectrograms of 3-second audio
                samples.
              </span>
              <Link href="https://github.com/crlandsc/Music-Genre-Classification-Using-Convolutional-Neural-Networks">
                GitHub
              </Link>
            </div>
          ),
        },
        {
          index: 7,
          title: ExtractorImpl.enum.SPECTRUM,
          body: (
            <div className="flex column">
              <span>
                <code>n_bands</code> number of frequency bands
              </span>
              <span>
                <code>scale</code> frequency scale
              </span>
              <Link href="https://librosa.org/doc/0.11.0/generated/librosa.stft.html">
                librosa.stft
              </Link>
            </div>
          ),
        },
        {
          index: 8,
          title: ExtractorImpl.enum.SPECTROGRAM,
          body: (
            <div className="flex column">
              <span>
                <code>n_bands</code> number of frequency bands
              </span>
              <span>
                <code>scale</code> frequency scale
              </span>
              <Link href="https://librosa.org/doc/0.11.0/generated/librosa.stft.html">
                librosa.stft
              </Link>
            </div>
          ),
        },
        {
          index: 9,
          title: ExtractorImpl.enum.MPS,
          body: (
            <div className="flex column">
              <span>
                Modulation Power Spectrum analysis using two-stage STFT
              </span>
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
            </div>
          ),
        },
        {
          index: 10,
          title: ExtractorImpl.enum.MFCC,
          body: (
            <div className="flex column">
              <span>Mel-frequency cepstral coefficients (MFCCs)</span>
              <Link href="https://librosa.org/doc/0.11.0/generated/librosa.feature.mfcc.html">
                librosa.feature.mfcc
              </Link>
            </div>
          ),
        },
        {
          index: 11,
          title: ExtractorImpl.enum.NDSI,
          body: (
            <div className="flex column">
              <span>
                Normalized Difference Soundscape Index from a power spectrogram.
              </span>
              <Link href="https://scikit-maad.github.io/generated/maad.features.soundscape_index.html">
                scikit-maad doc
              </Link>
            </div>
          ),
        },
        {
          index: 12,
          title: ExtractorImpl.enum.BI,
          body: (
            <div className="flex column">
              <span>Bioacoustics Index from a spectrogram.</span>
              <Link href="https://scikit-maad.github.io/generated/maad.features.bioacoustics_index.html">
                scikit-maad doc
              </Link>
            </div>
          ),
        },
        {
          index: 13,
          title: ExtractorImpl.enum.ADI,
          body: (
            <div className="flex column">
              <span>Acoustic Diversity Index from a spectrogram</span>
              <Link href="https://scikit-maad.github.io/generated/maad.features.acoustic_diversity_index.html">
                scikit-maad doc
              </Link>
            </div>
          ),
        },
        {
          index: 14,
          title: ExtractorImpl.enum.HF,
          body: (
            <div className="flex column">
              <span>
                Spectral entropy of a power spectral density (1d) or power
                spectrogram density (2d)
              </span>
              <Link href="https://scikit-maad.github.io/generated/maad.features.frequency_entropy.html">
                scikit-maad doc
              </Link>
            </div>
          ),
        },
        {
          index: 15,
          title: ExtractorImpl.enum.HT,
          body: (
            <div className="flex column">
              <span>Entropy of the envelope of an audio signal</span>
              <Link href="https://scikit-maad.github.io/generated/maad.features.temporal_entropy.html">
                scikit-maad doc
              </Link>
            </div>
          ),
        },
        {
          index: 16,
          title: ExtractorImpl.enum.MED,
          body: (
            <div className="flex column">
              <span>Median of the envelope of an audio signal</span>
              <Link href="https://scikit-maad.github.io/generated/maad.features.temporal_median.html">
                scikit-maad doc
              </Link>
            </div>
          ),
        },
        {
          index: 17,
          title: ExtractorImpl.enum.ACI,
          body: (
            <div className="flex column">
              <span>Acoustic Complexity Index from a spectrogram</span>
              <Link href="https://scikit-maad.github.io/generated/maad.features.acoustic_complexity_index.html">
                scikit-maad doc
              </Link>
            </div>
          ),
        },
        {
          index: 18,
          title: ExtractorImpl.enum.LEQ,
          body: 'Equivalent Continuous Sound Level',
        },
        {
          index: 19,
          title: ExtractorImpl.enum.LEQ_PERCENTILE,
          body: 'Sound level exceeding a specified percentage',
        },
        {
          index: 20,
          title: ExtractorImpl.enum.LEQ_DIFF,
          body: 'Calculation of the difference between Leq percentiles',
        },
      ]}
    />
  );
}
