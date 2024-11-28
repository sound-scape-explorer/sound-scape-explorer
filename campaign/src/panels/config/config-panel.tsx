import {Card} from '@blueprintjs/core';
import {ConfigCallout} from 'src/components/config-callout.tsx';
import {ConfigBands} from 'src/panels/config/components/config-bands';
import {ConfigExtractors} from 'src/panels/config/components/config-extractors.tsx';
import {ConfigIntegrations} from 'src/panels/config/components/config-integrations';
import {ConfigReducers} from 'src/panels/config/components/config-reducers';
import {ConfigTemplates} from 'src/panels/config/components/config-templates';

export function ConfigPanel() {
  return (
    <Card className="flex column gap">
      <ConfigCallout />
      <ConfigTemplates />
      <ConfigBands />
      <ConfigIntegrations />
      <ConfigExtractors />
      <ConfigReducers />
    </Card>
  );
}
