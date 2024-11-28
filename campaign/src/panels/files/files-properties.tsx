import {
  Button,
  Classes,
  H5,
  InputGroup,
  Intent,
  Popover,
  Section,
  Text,
} from '@blueprintjs/core';
import {SectionCard} from '@blueprintjs/core/lib/esnext';
import {useFilesProperties} from 'src/hooks/use-files-properties.ts';
import {Select} from 'src/primitives/select';
import {type LabelProperty} from 'src/types.ts';

export function FilesProperties() {
  const {
    properties,
    newProperty,
    handleNewPropertyChange,
    editProperty,
    handleEditPropertyChange,
    selectedProperty,
    setSelectedProperty,
    addProperty,
    renameProperty,
    removeProperty,
  } = useFilesProperties();

  return (
    <div className="flex gap">
      <Section title="Add label">
        <SectionCard className="flex gap">
          <InputGroup
            value={newProperty}
            onChange={handleNewPropertyChange}
            fill
            onKeyDown={(e) => e.code === 'Enter' && addProperty()}
          />
          <Button
            className="w1"
            onClick={() => addProperty()}
            text="Add"
            disabled={newProperty === ''}
          />
        </SectionCard>
      </Section>

      {properties.length > 0 && (
        <>
          <Section
            rightElement={<b>Label properties</b>}
            title={
              <Select<LabelProperty>
                forwardKey="name"
                selector="name"
                onSelect={setSelectedProperty}
                items={properties}
                current={selectedProperty}
                placeholder="Select"
              />
            }
          >
            <SectionCard className="flex column">
              <div className="flex gap">
                <InputGroup
                  value={editProperty}
                  onChange={handleEditPropertyChange}
                  fill
                  disabled={selectedProperty === null}
                  onKeyDown={(e) => e.code === 'Enter' && renameProperty()}
                />

                <Button
                  onClick={renameProperty}
                  text="Rename"
                  className="w2"
                  disabled={editProperty === ''}
                />

                <Popover
                  content={
                    <Text className="p">
                      <H5>Confirm deletion</H5>
                      <p>
                        You are about to delete{' '}
                        <b>{selectedProperty?.name ?? ''}</b>.
                        <br />
                        This can&apos;t be undone.
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          marginTop: 15,
                        }}
                      >
                        <Button
                          className={Classes.POPOVER_DISMISS}
                          style={{marginRight: 10}}
                        >
                          Cancel
                        </Button>
                        <Button
                          intent={Intent.DANGER}
                          className={Classes.POPOVER_DISMISS}
                          onClick={removeProperty}
                        >
                          Delete
                        </Button>
                      </div>
                    </Text>
                  }
                >
                  <Button
                    text="Remove"
                    disabled={selectedProperty === null}
                  />
                </Popover>
              </div>
            </SectionCard>
          </Section>
        </>
      )}
    </div>
  );
}
