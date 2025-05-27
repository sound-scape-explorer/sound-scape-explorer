import {useClientSettings} from 'src/composables/use-client-settings';
import {useViewSelection} from 'src/composables/use-view-selection';
import {EXPORT_FILENAME, ExportType} from 'src/constants';

const separator = ' - ';

export function useExportName() {
  const {band, integration} = useViewSelection();
  const {isDetailedExportName} = useClientSettings();

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
      case ExportType.enum.scatter: {
        blocks.push('scatter');
        break;
      }
      case ExportType.enum.indicators: {
        blocks.push('indicators');
        break;
      }
      case ExportType.enum.heatmap: {
        blocks.push('heatmap');
        break;
      }
      case ExportType.enum.trajectories: {
        blocks.push('trajectories');
        break;
      }
      case ExportType.enum.relativeTrajectories: {
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
    generate,
  };
}
