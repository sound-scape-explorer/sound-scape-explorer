import {Button} from 'src/components/primitives/button.tsx';
import {Form} from 'src/components/primitives/form.tsx';
import {Input} from 'src/components/primitives/input.tsx';
import styles from 'src/components/settings/bands/bands.module.scss';
import {useBands} from 'src/components/settings/bands/use-bands.ts';
import {ConfigButtons} from 'src/components/settings/config-buttons.tsx';

export function Bands() {
  const {nameRef, lowRef, highRef, bands, add, remove, moveUp, moveDown} =
    useBands();

  return (
    <div>
      <div className={styles.band}>
        <h2>Bands</h2>
        <span>index</span>
        <span>name</span>
        <span>low freq. (Hz)</span>
        <span>high freq. (Hz)</span>
      </div>

      <Form className={styles.form}>
        <span />
        <Button
          handleClick={add}
          submit
        >
          Add
        </Button>
        <Input
          ref={nameRef}
          type="text"
          placeholder="name"
        />
        <Input
          ref={lowRef}
          type="number"
          placeholder="low freq."
        />
        <Input
          ref={highRef}
          type="number"
          placeholder="high freq."
        />
      </Form>

      {bands.length > 0 && (
        <div className={styles.bands}>
          {bands.map((band, i) => {
            return (
              <div
                key={band.name}
                className={styles.band}
              >
                <ConfigButtons
                  onRemove={() => remove(band)}
                  onDown={() => moveDown(band)}
                  onUp={() => moveUp(band)}
                />

                <span>{i}</span>
                <span>{band.name}</span>
                <span>{band.low} Hz</span>
                <span>{band.high} Hz</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
