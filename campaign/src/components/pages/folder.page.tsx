import {type MouseEvent, useCallback} from 'react';
import Dropzone from 'react-dropzone';
import styles from 'src/components/pages/folder.page.module.scss';
import {useDrop} from 'src/hooks/use-drop.ts';

export function FolderPage() {
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
              <p>Drag folder containing audio files here</p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
}
