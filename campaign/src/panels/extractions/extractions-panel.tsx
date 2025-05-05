import {Callout, Card, Tab, Tabs} from '@blueprintjs/core';
import {ExtractionTab} from 'src/panels/extractions/extraction-tab.tsx';
import {ExtractionsPanelMenu} from 'src/panels/extractions/extractions-panel-menu.tsx';
import {useExtractionState} from 'src/panels/extractions/hooks/use-extraction-state.ts';
import {useExtractionValidation} from 'src/panels/extractions/hooks/use-extraction-validation';

export function ExtractionsPanel() {
  const {extractions, currentId, setCurrentId} = useExtractionState();
  const {validate} = useExtractionValidation();

  return (
    <Card className="flex column gap">
      <ExtractionsPanelMenu />

      <Tabs
        selectedTabId={currentId}
        onChange={(i: string) => setCurrentId(i)}
      >
        {extractions
          .sort((a, b) => a.index - b.index)
          .map((extraction) => {
            return (
              <Tab
                key={extraction._id}
                id={extraction._id}
                title={
                  <Callout
                    compact
                    className="no-user-select"
                    intent={validate(extraction) ? 'success' : 'danger'}
                  >
                    {`#${extraction.index} ${extraction.name}`}
                  </Callout>
                }
                panel={<ExtractionTab extraction={extraction} />}
              />
            );
          })}
      </Tabs>
    </Card>
  );
}
