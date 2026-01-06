import {Button, Card, Text} from '@blueprintjs/core';
import {Download} from '@blueprintjs/icons';
import {ExtractionsCallout} from 'src/components/extractions-callout.tsx';
import {FilesCallout} from 'src/components/files-callout.tsx';
import {SettingsCallout} from 'src/components/settings-callout.tsx';
import {useExport} from 'src/hooks/use-export';
import {useGlobalValidation} from 'src/hooks/use-global-validation';

export function ExportPanel() {
  const {exportToJson} = useExport();
  const {isValid} = useGlobalValidation();

  return (
    <Card className="flex gap column">
      <FilesCallout />
      <SettingsCallout />
      <ExtractionsCallout />

      <Text>
        Export your campaign project to <code>.json</code>
      </Text>

      <Button
        onClick={exportToJson}
        icon={<Download />}
        intent={isValid ? 'success' : 'warning'}
      >
        Download campaign JSON
      </Button>

      <Text>
        Import the downloaded file into the{' '}
        <span className="i b">Processing</span> module to generate your data.
      </Text>
    </Card>
  );
}
