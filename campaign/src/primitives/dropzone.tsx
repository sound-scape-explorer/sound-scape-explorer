import {type DragEvent, JSX, useCallback, useRef} from 'react';
import {type FileWithPath, useDropzone} from 'react-dropzone';

export interface DropzoneInfo {
  path: string;
  isDirectory: boolean;
  isFile: boolean;
}

interface Props {
  className: string;
  children: JSX.Element;
  onDrop: (files: readonly FileWithPath[], info: DropzoneInfo) => void;
}

export function Dropzone({className, onDrop, children}: Props) {
  const infoRef = useRef<DropzoneInfo>({} as DropzoneInfo);
  const filesRef = useRef<FileWithPath[]>([]);

  const {getRootProps, getInputProps} = useDropzone({
    noClick: true,
    onDrop: (files) => {
      filesRef.current = files;
      onDrop(files, infoRef.current);
    },
  });

  const handleNativeDrop = useCallback((e: DragEvent) => {
    if (e.dataTransfer.files.length !== 1) {
      return;
    }

    const file = e.dataTransfer.files[0];
    const info = window.electronAPI.checkPath(file.path);
    infoRef.current = info;
  }, []);

  return (
    <section onDrop={handleNativeDrop}>
      <div
        className={className}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {children}
      </div>
    </section>
  );
}
