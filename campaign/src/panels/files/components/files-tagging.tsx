import {
  Button,
  Classes,
  H5,
  Intent,
  Popover,
  Section,
  Text,
} from '@blueprintjs/core';
import {SectionCard} from '@blueprintjs/core/lib/esnext';
import {useFilesTagging} from 'src/panels/files/hooks/use-files-tagging';
import {Select} from 'src/primitives/select.tsx';
import {TextInput} from 'src/primitives/text-input.tsx';

export function FilesTagging() {
  const {
    add,
    selected,
    setSelected,
    rename,
    remove,
    addInput,
    setAddInput,
    editInput,
    setEditInput,
    names,
  } = useFilesTagging();

  return (
    <div className="flex gap">
      <Section title="Add tag">
        <SectionCard className="flex gap">
          <TextInput
            value={addInput}
            onBlur={setAddInput}
            onChange={setAddInput}
            onEnter={add}
          />
          <Button
            className="w1"
            onClickCapture={add}
            text="Add"
            disabled={addInput === ''}
          />
        </SectionCard>
      </Section>

      {names.length > 0 && (
        <Section
          rightElement={<b>Tag names</b>}
          title={
            <Select<string>
              onSelect={setSelected}
              items={names}
              current={selected}
              placeholder="Select"
            />
          }
        >
          <SectionCard className="flex column">
            <div className="flex gap">
              <TextInput
                value={editInput}
                onBlur={setEditInput}
                onChange={setEditInput}
                onEnter={rename}
                disabled={selected === null}
              />

              <Button
                onClick={rename}
                text="Rename"
                className="w2"
                disabled={selected === null || editInput === ''}
              />

              <Popover
                content={
                  <Text className="p">
                    <H5>Confirm deletion</H5>
                    <p>
                      You are about to delete <b>{selected ?? ''}</b>
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
                        onClick={remove}
                      >
                        Delete
                      </Button>
                    </div>
                  </Text>
                }
              >
                <Button
                  text="Remove"
                  disabled={selected === null}
                  intent="danger"
                />
              </Popover>
            </div>
          </SectionCard>
        </Section>
      )}
    </div>
  );
}
