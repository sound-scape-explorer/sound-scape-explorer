import {Card, ProgressBar, Section} from '@blueprintjs/core';
import {useDropzone} from 'src/hooks/use-dropzone.ts';
import {Dropzone} from 'src/primitives/dropzone.tsx';

import styles from './import-panel.module.scss';

export function ImportPanel() {
  const {locked, handleDrop} = useDropzone();

  return (
    <Card>
      {locked && (
        <Section className={styles.modal}>
          <ProgressBar intent="primary" />
        </Section>
      )}

      <Dropzone
        className={styles.drop}
        onDrop={handleDrop}
      >
        <div className={styles.content}>
          <div>Drag a folder here containing audio files</div>
          <div>
            Or drop an existing <code>.json</code> or <code>.xlsx</code>
            &nbsp;configuration
          </div>
        </div>
      </Dropzone>
    </Card>
  );
}
