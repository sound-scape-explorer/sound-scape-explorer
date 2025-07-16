import {DrawerContent} from 'src/primitives/drawer-content.tsx';

export function FilesHelpContent() {
  return (
    <DrawerContent
      content={[
        [
          'Site',
          <div
            className="flex column"
            key="site"
          >
            <span>
              Site is a required field that identifies where a recording was
              made.
            </span>
            <span>
              All files from the same site are organized chronologically on a
              unified timeline.
            </span>
            <span className="i">
              Note: recordings from the same site must not have overlapping
              timestamps.
            </span>
          </div>,
        ],
      ]}
    />
  );
}
