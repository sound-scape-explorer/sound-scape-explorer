import {Card} from '@blueprintjs/core';
import {FilesCallout} from 'src/components/files-callout.tsx';
import {FilesTable} from 'src/panels/files/components/files-table.tsx';
import {FilesTagging} from 'src/panels/files/components/files-tagging.tsx';

export function FilesPanel() {
  return (
    <Card className="flex column gap">
      <FilesCallout />
      <FilesTagging />
      <FilesTable />
    </Card>
  );
}
