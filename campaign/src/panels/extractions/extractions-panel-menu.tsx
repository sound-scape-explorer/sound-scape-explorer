import {Button, Classes, H5, Intent, Popover, Text} from '@blueprintjs/core';
import {useExtractionState} from 'src/panels/extractions/hooks/use-extraction-state.ts';

export function ExtractionsPanelMenu() {
  const {
    extractions,
    currentId,
    addExtraction,
    deleteExtraction,
    duplicateExtraction,
    moveExtraction,
  } = useExtractionState();

  return (
    <div className="flex gap">
      <Button
        className="flex grow"
        onClick={addExtraction}
      >
        Add
      </Button>
      <Button
        className="flex grow"
        onClick={() => moveExtraction(currentId, -1)}
        disabled={extractions.length <= 1}
      >
        Move left
      </Button>
      <Button
        className="flex grow"
        onClick={() => moveExtraction(currentId, 1)}
        disabled={extractions.length <= 1}
      >
        Move right
      </Button>
      <Button
        className="flex grow"
        onClick={() => duplicateExtraction(currentId)}
        disabled={extractions.length === 0}
      >
        Duplicate
      </Button>

      <Popover
        className="flex grow"
        content={
          <Text className="p">
            <H5>Confirm deletion</H5>
            <p>This can&apos;t be undone</p>
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
                onClick={() => deleteExtraction(currentId)}
              >
                Delete
              </Button>
            </div>
          </Text>
        }
      >
        <Button
          disabled={extractions.length === 0}
          intent="danger"
          style={{width: '100%'}}
        >
          Delete
        </Button>
      </Popover>
    </div>
  );
}
