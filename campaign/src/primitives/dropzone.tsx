import {JSX} from 'react';
import {type FileWithPath, useDropzone} from 'react-dropzone';

export interface DropzoneInfo {
  path: string;
  isDirectory: boolean;
  isFile: boolean;
}

interface Props {
  readonly className: string;
  readonly children: JSX.Element;
  readonly onDrop: (files: readonly FileWithPath[], info: DropzoneInfo) => void;
}

export function Dropzone({className, onDrop, children}: Props) {
  const {getRootProps, getInputProps} = useDropzone({
    noClick: false,
    useFsAccessApi: false,
    onDrop: (files: File[]) => {
      const paths = files.map(window.electronAPI.getFilePath);
      const commonFolder = window.electronAPI.findCommonFolder(paths);
      const info = window.electronAPI.checkPath(commonFolder);
      onDrop(files, info);
    },
  });

  // @ts-expect-error: https://github.com/react-dropzone/react-dropzone/discussions/1157
  const getNewInputProps = () => getInputProps({webkitdirectory: 'true'});

  return (
    <section>
      <div
        className={className}
        {...getRootProps()}
      >
        <input {...getNewInputProps()} />
        {children}
      </div>
    </section>
  );
}
