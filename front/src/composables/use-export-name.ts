import {useBandSelection} from 'src/composables/use-band-selection';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {EXPORT_FILENAME} from 'src/constants';

export type ExportType =
  | 'scatter'
  | 'indicators'
  | 'heatmap'
  | 'trajectories'
  | 'relative-trajectories';

const separator = ' - ';

export function useExportName() {
  const {isDetailedExportName} = useClientSettings();
  const {band} = useBandSelection();
  const {integration} = useIntegrationSelection();

  const appendDetails = (blocks: string[]): string[] => {
    if (!isDetailedExportName.value) {
      return blocks;
    }

    if (band.value !== null) {
      blocks.push(band.value.name);
    }

    if (integration.value !== null) {
      blocks.push(integration.value.name);
    }

    return blocks;
  };

  const appendOptions = (blocks: string[], ...opts: string[]): string[] => {
    for (const o of opts) {
      blocks.push(o);
    }

    return blocks;
  };

  const generate = (type: ExportType, ...opts: string[]): string => {
    const blocks: string[] = [EXPORT_FILENAME];
    appendDetails(blocks);

    switch (type) {
      case 'scatter': {
        blocks.push('scatter');
        break;
      }
      case 'indicators': {
        blocks.push('indicators');
        break;
      }
      case 'heatmap': {
        blocks.push('heatmap');
        break;
      }
      case 'trajectories': {
        blocks.push('trajectories');
        break;
      }
      case 'relative-trajectories': {
        blocks.push('relative-trajectories');
        break;
      }
      default: {
        break;
      }
    }

    appendOptions(blocks, ...opts);
    return blocks.join(separator);
  };

  return {
    generate: generate,
  };
}
