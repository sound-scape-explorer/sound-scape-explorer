import {Form} from 'src/components/primitives/form.tsx';
import {Input} from 'src/components/primitives/input.tsx';
import {Submit} from 'src/components/primitives/submit.tsx';
import {ConfigButtons} from 'src/components/settings/config-buttons.tsx';
import {ExtractorReducerPicker} from 'src/components/settings/extractors/extractor-reducer-picker.tsx';
import styles from 'src/components/settings/extractors/extractors.module.scss';
import {useExtractors} from 'src/components/settings/extractors/hooks/use-extractors.ts';
import {EXTRACTORS} from 'src/constants.ts';

export function Extractors() {
  const {nameRef, offsetRef, stepRef, persistRef, extractors, add, remove} =
    useExtractors();

  return (
    <div>
      <div className={styles.extractor}>
        <h2>Extractors</h2>
        <span>index</span>
        <span>name</span>
        <span>offset (ms)</span>
        <span>step (ms)</span>
        <span>persist in storage</span>
        <span>reducer type</span>
        <span>reducer dim.</span>
      </div>

      <Form className={styles.form}>
        <span />

        <Submit handleClick={add}>Add</Submit>

        <select ref={nameRef}>
          {EXTRACTORS.map((e) => {
            return (
              <option
                key={e}
                value={e}
              >
                {e}
              </option>
            );
          })}
        </select>

        <Input
          ref={offsetRef}
          type="number"
          placeholder="offset"
          defaultValue={0}
        />

        <Input
          ref={stepRef}
          type="number"
          placeholder="step"
          defaultValue={1000}
        />

        <div className={styles.persist}>
          <Input
            ref={persistRef}
            type="checkbox"
            placeholder="persist"
          />
        </div>
      </Form>

      {extractors.length > 0 && (
        <div className={styles.extractors}>
          {extractors.map((extractor, i) => {
            return (
              <div
                key={extractor.name}
                className={styles.extractor}
              >
                <ConfigButtons onRemove={() => remove(extractor)} />
                <span>{i}</span>
                <span>{extractor.name}</span>
                <span>{extractor.offset}</span>
                <span>{extractor.step}</span>
                <span>{extractor.persist ? 'yes' : 'no'}</span>
                {extractor.isNeural && (
                  <ExtractorReducerPicker extractor={extractor} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
