import {Button, Card, Text} from '@blueprintjs/core';
import {Download} from '@blueprintjs/icons';
import {ConfigCallout} from 'src/components/config-callout.tsx';
import {FilesCallout} from 'src/components/files-callout.tsx';
import {MetricsCallout} from 'src/components/metrics-callout.tsx';
import {SettingsCallout} from 'src/components/settings-callout.tsx';
import {useExport} from 'src/hooks/use-export.ts';
import {useGlobalValidation} from 'src/hooks/use-global-validation.ts';

export function ExportPanel() {
  const {exportToJson} = useExport();
  const {isValid} = useGlobalValidation();

  return (
    <Card className="flex gap column">
      <FilesCallout />
      <SettingsCallout />
      <ConfigCallout />
      <MetricsCallout />

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
