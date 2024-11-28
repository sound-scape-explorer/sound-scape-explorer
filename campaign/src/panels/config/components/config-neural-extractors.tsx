import {Callout, Checkbox} from '@blueprintjs/core';
import {useMemo} from 'react';
import {getEnumKeys} from 'src/enums.ts';
import {useConfigTemplates} from 'src/panels/config/hooks/use-config-templates.ts';
import {useNeuralExtractorSlug} from 'src/panels/config/hooks/use-neural-extractor-slug.ts';
import {
  NeuralExtractorType,
  useNeuralExtractorState,
} from 'src/panels/config/hooks/use-neural-extractor-state.ts';
import {useNeuralExtractorValidation} from 'src/panels/config/hooks/use-neural-extractor-validation.ts';
import {Drawer} from 'src/primitives/drawer.tsx';
import {GenericSection} from 'src/primitives/generic-section/generic-section.tsx';
import {NumberInput} from 'src/primitives/number-input';
import {Select} from 'src/primitives/select';
import {TextInput} from 'src/primitives/text-input.tsx';

import styles from './config-neural-extractors.module.scss';

export function ConfigNeuralExtractors() {
  const {hasTemplate} = useConfigTemplates();
  const {extractors, add, update} = useNeuralExtractorState();
  const {getSlug} = useNeuralExtractorSlug();
  const {isNameValid, isOffsetValid, isStepValid, validate} =
    useNeuralExtractorValidation();
  const validation = useMemo(() => validate(), [validate]);

  return (
    <GenericSection
      title="Neural extractors"
      getSlug={getSlug}
      items={extractors}
      add={add}
      update={update}
      className={styles.row}
      validation={validation}
      renderItem={(extractor) => (
        <>
          <TextInput
            defaultValue={extractor.name}
            onBlur={(v) => update(extractor, 'name', v)}
            intent={isNameValid(extractor) ? 'success' : 'danger'}
            disabled={hasTemplate}
          />

          <Select
            items={getEnumKeys(NeuralExtractorType)}
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
      <Drawer
        content={
          <div className="flex column gap mt">
            <Callout
              compact
              title="VGGish"
            >
              The VGGish neural network.
            </Callout>

            <Callout
              compact
              title="Melogram"
            >
              The melogram (VGGish input)
            </Callout>

            <Callout
              compact
              title="Melspectrum"
            >
              The melspectrum (over 1s with same other parameters than melogram)
            </Callout>
          </div>
        }
      >
        <div className="help flex grow center">type</div>
      </Drawer>
      <div>offset (ms)</div>
      <div>step (ms)</div>
      <div>persist in storage</div>
    </GenericSection>
  );
}
