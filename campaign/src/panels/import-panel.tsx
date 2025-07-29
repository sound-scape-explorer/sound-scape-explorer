import {
  Callout,
  Card,
  FileInput,
  ProgressBar,
  Section,
} from '@blueprintjs/core';
import {useDropzone} from 'src/hooks/use-dropzone';
import {Dropzone} from 'src/primitives/dropzone.tsx';

import styles from './import-panel.module.scss';

export function ImportPanel() {
  const {locked, handleDrop, handleLoad} = useDropzone();

  return (
    <Card>
      {locked && (
        <Section className={styles.modal}>
          <ProgressBar intent="primary" />
        </Section>
      )}

      <div className={styles.container}>
        <Callout title="Configurations">
          Load older configurations below.
        </Callout>

        <FileInput
          text={
            <>
              Load <code>.json</code> or <code>.xlsx</code>
            </>
          }
          onInputChange={handleLoad}
        />

        <Callout title="Audio files">
          Load audio files by dragging or selecting a folder over the dropzone
          below.
        </Callout>

        <Dropzone
          className={styles.dropContainer}
          onDrop={handleDrop}
        >
          <div className={styles.dropContent}>
            <div>
              <b>Dropzone</b>
            </div>
            <div>Drag over or click me!</div>
          </div>
        </Dropzone>
      </div>
    </Card>
  );
}
