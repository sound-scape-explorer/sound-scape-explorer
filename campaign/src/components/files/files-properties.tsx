import styles from 'src/components/files/files-properties.module.scss';
import {useFilesProperties} from 'src/components/files/hooks/use-files-properties.ts';
import {Button} from 'src/components/primitives/button.tsx';
import {Form} from 'src/components/primitives/form.tsx';
import {Input} from 'src/components/primitives/input.tsx';

export function FilesProperties() {
  const {
    propertyNewRef,
    propertySelectRef,
    propertyEditRef,
    addProperty,
    properties,
    renameProperty,
    removeProperty,
  } = useFilesProperties();

  return (
    <div className={styles.container}>
      <Form>
        <Input
          ref={propertyNewRef}
          type="text"
        />

        <Button
          handleClick={addProperty}
          submit
        >
          Add label property
        </Button>
      </Form>

      <div className={styles.properties}>
        {properties.length > 0 ? (
          <>
            <select ref={propertySelectRef}>
              {properties.map((property) => {
                return (
                  <option
                    key={property}
                    value={property}
                  >
                    {property}
                  </option>
                );
              })}
            </select>

            <Form>
              <Input
                ref={propertyEditRef}
                type="text"
              />
              <Button
                submit
                handleClick={renameProperty}
              >
                rename
              </Button>
              <Button handleClick={removeProperty}>remove</Button>
            </Form>
          </>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
    </div>
  );
}
