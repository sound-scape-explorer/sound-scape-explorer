import {Card} from '@blueprintjs/core';
import {FilesCallout} from 'src/components/files-callout.tsx';
import {FilesTable} from 'src/panels/files/components/files-table.tsx';
import {FilesTagging} from 'src/panels/files/components/files-tagging.tsx';
import {FilesHelpContent} from 'src/panels/files/files-help-content.tsx';
import {HelpDrawer} from 'src/primitives/help-drawer.tsx';

export function FilesPanel() {
  return (
    <Card className="flex column gap">
      <div className="flex gap center">
        <FilesCallout />
        <HelpDrawer>
          <FilesHelpContent />
        </HelpDrawer>
      </div>
      <FilesTagging />
      <FilesTable />
    </Card>
  );
}
