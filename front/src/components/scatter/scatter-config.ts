import Plotly, {
  type Config,
  type DownloadImgopts,
  type ModeBarButtonAny,
} from 'plotly.js-dist-min';
import {useScatterDownloadPngButton} from 'src/components/scatter/scatter-download-png-button';
import {useScatterExport} from 'src/components/scatter/scatter-export';
import {useScreen} from 'src/components/screen/screen';
import {useClientSettings} from 'src/composables/client-settings';
import {EXPORT_FILENAME, PLOTLY_SIZE} from 'src/constants';
import {computed} from 'vue';

export interface ScatterProps extends DownloadImgopts {
  width: number;
  height: number;
  name: string;
  scale: number;
}

export function useScatterConfig() {
  const {handleScatterExportClick} = useScatterExport();
  const {enable} = useScreen();
  const {preview} = useClientSettings();

  const scatterWidth = PLOTLY_SIZE * (4 / 3);
  const scatterHeight = PLOTLY_SIZE;
  const scatterScale = 4;
  const scatterName = `${EXPORT_FILENAME}-scatter-export`;

  const props: ScatterProps = {
    filename: scatterName,
    width: scatterWidth,
    height: scatterHeight,
    format: 'svg',
    scale: scatterScale,
    name: scatterName,
  };

  const config = computed<Partial<Config>>(() => {
    let barButtons: ModeBarButtonAny[] = [];

    if (preview.value === true) {
      barButtons = [
        {
          name: 'toggle-selection',
          title: 'Toggle selection',
          icon: Plotly.Icons['selectbox'],
          click: () => {
            enable();
          },
        },
      ];
    }

    const {button: downloadPngButton} = useScatterDownloadPngButton(props);
    barButtons = [...barButtons, downloadPngButton];

    barButtons = [
      ...barButtons,
      {
        name: 'download-svg',
        title: 'Download as SVG without legend',
        icon: Plotly.Icons['camera-retro'],
        click: async (gd) => {
          await Plotly.downloadImage(gd, props);
        },
      },
    ];

    barButtons = [
      ...barButtons,
      {
        name: 'export-csv',
        title: 'Export as CSV',
        icon: Plotly.Icons['disk'],
        click: async () => {
          await handleScatterExportClick();
        },
      },
    ];

    return {
      displaylogo: false,
      responsive: true,
      displayModeBar: true,
      modeBarButtonsToAdd: barButtons,
      modeBarButtonsToRemove: ['toImage', 'resetCameraLastSave3d'],
    };
  });

  return {
    config: config,
  };
}
