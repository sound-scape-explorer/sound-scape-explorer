import {Button} from '@blueprintjs/core';
import {useTableRefProvider} from 'src/panels/files/components/use-table-ref.ts';
import {DrawerContent} from 'src/primitives/drawer-content.tsx';

export function FilesHelpContent() {
  const {triggerHelpModal} = useTableRefProvider();

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
        [
          'Table',
          <div
            className="flex column"
            key="table"
          >
            <span>
              The table has a context menu accessed through right clicking.
            </span>

            <span>
              The table has also a help modal opened by striking `?` or clicking{' '}
              <Button onClick={triggerHelpModal}>here</Button>.
            </span>
          </div>,
        ],
      ]}
    />
  );
}
