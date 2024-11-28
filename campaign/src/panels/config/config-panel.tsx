import {Callout, Card} from '@blueprintjs/core';
import {ConfigBands} from 'src/panels/config/components/config-bands';
import {ConfigIntegrations} from 'src/panels/config/components/config-integrations';
import {ConfigNeuralExtractors} from 'src/panels/config/components/config-neural-extractors.tsx';
import {ConfigReducers} from 'src/panels/config/components/config-reducers';
import {ConfigTemplates} from 'src/panels/config/components/config-templates';
import {useConfigValidation} from 'src/panels/config/hooks/use-config-validation.ts';

export function ConfigPanel() {
  const {isValid} = useConfigValidation();

  return (
    <Card className="flex column gap">
      <Callout intent={isValid ? 'success' : 'danger'}>
        {isValid ? 'Configuration is valid' : 'Configuration is invalid'}
      </Callout>

      <ConfigTemplates />
      <ConfigBands />
      <ConfigIntegrations />
      <ConfigNeuralExtractors />
      <ConfigReducers />
    </Card>
  );
}
