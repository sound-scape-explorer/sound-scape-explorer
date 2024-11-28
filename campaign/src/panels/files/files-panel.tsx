import {Card} from '@blueprintjs/core';
import {FilesCallout} from 'src/components/files-callout.tsx';
import {FilesLabels} from 'src/panels/files/components/files-labels.tsx';
import {FilesTable} from 'src/panels/files/components/files-table.tsx';

export function FilesPanel() {
  return (
    <Card className="flex column gap">
      <FilesCallout />
      <FilesLabels />
      <FilesTable />
    </Card>
  );
}
