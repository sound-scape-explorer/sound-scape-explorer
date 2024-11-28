import {Button} from 'src/components/primitives/button.tsx';
import {Form} from 'src/components/primitives/form.tsx';
import {Input} from 'src/components/primitives/input.tsx';
import {ConfigButtons} from 'src/components/settings/config-buttons.tsx';
import styles from 'src/components/settings/integrations/integrations.module.scss';
import {useIntegrations} from 'src/components/settings/integrations/use-integrations.ts';

export function Integrations() {
  const {add, remove, nameRef, secondsRef, integrations, moveUp, moveDown} =
    useIntegrations();

  return (
    <div>
      <div className={styles.integration}>
        <h2>Integrations</h2>
        <span>index</span>
        <span>name</span>
        <span>duration (seconds)</span>
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
          ref={secondsRef}
          type="number"
          placeholder="duration"
        />
      </Form>

      {integrations.length > 0 && (
        <div className={styles.integrations}>
          {integrations.map((integration, i) => {
            return (
              <div
                key={integration.name}
                className={styles.integration}
              >
                <ConfigButtons
                  onRemove={() => remove(integration)}
                  onDown={() => moveDown(integration)}
                  onUp={() => moveUp(integration)}
                />

                <span>{i}</span>
                <span>{integration.name}</span>
                <span>{integration.seconds}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
