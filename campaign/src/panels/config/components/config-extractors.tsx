import {Checkbox} from '@blueprintjs/core';
import {useMemo} from 'react';
import {useConfigTemplates} from 'src/panels/config/hooks/use-config-templates.ts';
import {useExtractorSlug} from 'src/panels/config/hooks/use-extractor-slug.ts';
import {
  ConfigExtractorType,
  useExtractorState,
} from 'src/panels/config/hooks/use-extractor-state.ts';
import {useExtractorValidation} from 'src/panels/config/hooks/use-extractor-validation.ts';
import {Drawer} from 'src/primitives/drawer.tsx';
import {
  DrawerContent,
  type DrawerContentProps,
} from 'src/primitives/drawer-content.tsx';
import {GenericSection} from 'src/primitives/generic-section/generic-section.tsx';
import {NumberInput} from 'src/primitives/number-input';
import {Select} from 'src/primitives/select';
import {TextInput} from 'src/primitives/text-input.tsx';

import styles from './config-neural-extractors.module.scss';

const drawer: DrawerContentProps['content'] = [
  [ConfigExtractorType.vgg, 'The VGGish neural network.'],
  [ConfigExtractorType.melogram, 'The melogram (VGGish input)'],
  [
    ConfigExtractorType.melspectrum,
    'The melspectrum (over 1s with same other parameters than melogram)',
  ],
];

export function ConfigExtractors() {
  const {hasTemplate} = useConfigTemplates();
  const {extractors, add, update} = useExtractorState();
  const {getSlug} = useExtractorSlug();
  const {isNameValid, isOffsetValid, isStepValid, validate} =
    useExtractorValidation();
  const validation = useMemo(() => validate(), [validate]);

  return (
    <GenericSection
      title="Extractors"
      getSlug={getSlug}
      items={extractors}
      add={add}
      update={update}
      className={styles.row}
      validation={validation}
      disabled={hasTemplate}
      renderItem={(extractor) => (
        <>
          <TextInput
            defaultValue={extractor.name}
            onBlur={(v) => update(extractor, 'name', v)}
            intent={isNameValid(extractor) ? 'success' : 'danger'}
            disabled={hasTemplate}
          />

          <Select
            items={Object.values(ConfigExtractorType)}
            onSelect={(n) => update(extractor, 'type', n)}
            current={extractor.type}
            placeholder="Select type"
            disabled={hasTemplate}
          />

          <NumberInput
            defaultValue={extractor.offset}
            onBlur={(n) => update(extractor, 'offset', n)}
            intent={isOffsetValid(extractor) ? 'success' : 'danger'}
            disabled={hasTemplate}
          />

          <NumberInput
            defaultValue={extractor.step}
            onBlur={(n) => update(extractor, 'step', n)}
            intent={isStepValid(extractor) ? 'success' : 'danger'}
            disabled={hasTemplate}
          />

          <Checkbox
            checked={extractor.isPersist}
            onChange={(e) =>
              update(extractor, 'isPersist', e.currentTarget.checked)
            }
            disabled={hasTemplate}
          />
        </>
      )}
    >
      <div>name</div>
      <Drawer content={<DrawerContent content={drawer} />}>
        <div className="help flex grow center">type</div>
      </Drawer>
      <div>offset (ms)</div>
      <div>step (ms)</div>
      <div>persist in storage</div>
    </GenericSection>
  );
}
