import {ExtractionAutoclusters} from 'src/panels/extractions/components/extraction-autoclusters.tsx';
import {ExtractionBands} from 'src/panels/extractions/components/extraction-bands.tsx';
import {ExtractionExtractors} from 'src/panels/extractions/components/extraction-extractors.tsx';
import {ExtractionIntegrations} from 'src/panels/extractions/components/extraction-integrations.tsx';
import {ExtractionMetrics} from 'src/panels/extractions/components/extraction-metrics.tsx';
import {ExtractionReducers} from 'src/panels/extractions/components/extraction-reducers.tsx';
import {ExtractionTemplates} from 'src/panels/extractions/components/extraction-templates.tsx';
import {ExtractionTrajectories} from 'src/panels/extractions/components/extraction-trajectories.tsx';
import {
  type ExtractionConfigWithId,
  useExtractionState,
} from 'src/panels/extractions/hooks/use-extraction-state.ts';
import {TextInput} from 'src/primitives/text-input.tsx';

import styles from './extractions-tab.module.scss';

interface Props {
  extraction: ExtractionConfigWithId;
}

export function ExtractionTab({extraction}: Props) {
  const {updateName} = useExtractionState();

  return (
    <div className="flex column gap">
      <div className={styles.header}>
        <span className="flex center">index</span>
        <span className="flex center">slug</span>
        <span className="flex center">template</span>
      </div>

      <div className={styles.header}>
        <span className="flex center">{extraction.index}</span>
        <TextInput
          defaultValue={extraction.name}
          onChange={(v) => updateName(extraction, v)}
        />

        <ExtractionTemplates extraction={extraction} />
      </div>

      <ExtractionBands extraction={extraction} />
      <ExtractionIntegrations extraction={extraction} />
      <ExtractionExtractors extraction={extraction} />
      <ExtractionReducers extraction={extraction} />
      <ExtractionMetrics extraction={extraction} />
      <ExtractionAutoclusters extraction={extraction} />
      <ExtractionTrajectories extraction={extraction} />
    </div>
  );
}
