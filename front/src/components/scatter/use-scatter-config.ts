import Plotly, {
  type Config,
  type DownloadImgopts,
  type ModeBarButtonAny,
} from 'plotly.js-dist-min';
import {useScatterDownloadPngButton} from 'src/components/scatter/use-scatter-download-png-button';
import {useScatterExport} from 'src/components/scatter/use-scatter-export';
import {useScreen} from 'src/components/screen/use-screen';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useExportName} from 'src/composables/use-export-name';
import {PLOTLY_SIZE} from 'src/constants';
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
  const {isAlphaPreview} = useClientSettings();
  const {generate} = useExportName();

  const scatterWidth = PLOTLY_SIZE * (4 / 3);
  const scatterHeight = PLOTLY_SIZE;
  const scatterScale = 4;

  const propsRef = computed<ScatterProps>(() => {
    const name = generate('scatter');

    return {
      name: name,
      filename: name,
      width: scatterWidth,
      height: scatterHeight,
      format: 'svg',
      scale: scatterScale,
    };
  });

  const config = computed<Partial<Config>>(() => {
    let barButtons: ModeBarButtonAny[] = [];

    if (isAlphaPreview.value) {
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

    const {button: pngButton} = useScatterDownloadPngButton(propsRef.value);
    barButtons = [...barButtons, pngButton];

    barButtons = [
      ...barButtons,
      {
        name: 'download-svg',
        title: 'Download as SVG without legend',
        icon: Plotly.Icons['camera-retro'],
        click: async (gd) => {
          await Plotly.downloadImage(gd, propsRef.value);
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
