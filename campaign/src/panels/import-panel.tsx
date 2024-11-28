import {type MouseEvent, useCallback} from 'react';
import Dropzone from 'react-dropzone';
import {useDrop} from 'src/hooks/use-drop.ts';
import styles from 'src/panels/_panel.module.scss';

export function ImportPanel() {
  const {handleDrop} = useDrop();

  const handleClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div>
      <Dropzone onDrop={handleDrop}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div
              {...getRootProps()}
              className={styles.drop}
            >
              <input
                {...getInputProps()}
                onClick={handleClick}
              />
              <div className={styles.content}>
                <div>Drag a folder here containing audio files</div>
                <div>
                  Or import an existing <code>.json</code> or <code>.xlsx</code>
                  &nbsp;configuration
                </div>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
}
