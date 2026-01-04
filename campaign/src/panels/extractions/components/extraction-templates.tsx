import {Button, Tooltip} from '@blueprintjs/core';
import {Snowflake} from '@blueprintjs/icons';
import {ICON_SIZE} from '@shared/constants.ts';
import clsx from 'clsx';
import {type ExtractionConfig} from 'src/interfaces.ts';
import {
  TemplateKey,
  useExtractionTemplates,
} from 'src/panels/extractions/hooks/use-extraction-templates.ts';
import {Select} from 'src/primitives/select.tsx';

import styles from './extraction-templates.module.scss';

interface Props {
  readonly extraction: ExtractionConfig;
}

export function ExtractionTemplates({extraction}: Props) {
  const {key, update, hasTemplate, modifyTemplate} =
    useExtractionTemplates(extraction);

  return (
    <div className={clsx(styles.container, 'gap')}>
      <Select<TemplateKey>
        items={Object.values(TemplateKey)}
        current={key}
        onSelect={(k) => update(k)}
      />

      <Tooltip
        content="Modify template"
        disabled={!hasTemplate}
      >
        <Button
          icon={<Snowflake size={ICON_SIZE} />}
          onClick={modifyTemplate}
          disabled={!hasTemplate}
        />
      </Tooltip>
    </div>
  );
}
