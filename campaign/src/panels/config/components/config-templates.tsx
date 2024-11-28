import {Button, ButtonGroup} from '@blueprintjs/core';
import {useConfigTemplates} from 'src/panels/config/hooks/use-config-templates.ts';

export function ConfigTemplates() {
  const {key, update} = useConfigTemplates();

  return (
    <ButtonGroup>
      <Button
        text="No template"
        active={key === 'none'}
        onClick={() => update('none')}
      />
      <Button
        text="Coral reefs"
        active={key === 'coral-reefs'}
        onClick={() => update('coral-reefs')}
      />
    </ButtonGroup>
  );
}
