import Plotly, {
  type Config,
  type DownloadImgopts,
  type ToImgopts,
} from 'plotly.js-dist-min';
import {useLabelScreenshot} from 'src/components/Label/useLabelScreenshot';
import {EXPORT_FILENAME, PLOTLY_SIZE} from 'src/constants';

import {triggerCanvasDownload} from '../../utils/trigger-canvas-download';
import {useScatterExport} from './useScatterExport';

interface ScatterExportOptions extends DownloadImgopts {
  scale?: number;
}

export function useScatterConfig() {
  const {screenshotLabel} = useLabelScreenshot();
  const {handleScatterExportClick} = useScatterExport();

  const scatterWidth = PLOTLY_SIZE * (4 / 3);
  const scatterHeight = PLOTLY_SIZE;
  const scatterScale = 4;
  const scatterName = `${EXPORT_FILENAME}-scatter-export`;

  const scatterOptions: ScatterExportOptions = {
    filename: scatterName,
    width: scatterWidth,
    height: scatterHeight,
    format: 'svg',
    scale: scatterScale,
  };

  const config: Partial<Config> = {
    displaylogo: false,
    responsive: true,
    modeBarButtonsToAdd: [
      {
        name: 'download-png',
        title: 'Download as PNG with legend',
        icon: Plotly.Icons.camera,
        click: async (gd) => {
          const options: ToImgopts = {...scatterOptions, format: 'png'};

          let data = await Plotly.toImage(gd, options);
          const prefix = 'data:image/png;base64,';
          if (!data.startsWith(prefix)) {
            data = prefix + data;
          }

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = scatterWidth * scatterScale;
          canvas.height = scatterHeight * scatterScale;

          const finish = () => {
            triggerCanvasDownload(canvas, scatterName);
          };

          if (context === null) {
            finish();
            return;
          }

          const image = new Image();
          image.src = data;
          image.onload = async () => {
            context.drawImage(image, 0, 0);

            const legendCanvas = await screenshotLabel();
            const legendContext = legendCanvas?.getContext('2d') ?? null;

            if (legendCanvas === null || legendContext === null) {
              finish();
              return;
            }

            const legendScale = 0.5;
            const legendWidth =
              legendContext.canvas.width * scatterScale * legendScale;
            const legendHeight =
              legendContext.canvas.height * scatterScale * legendScale;

            context.drawImage(
              legendCanvas,
              canvas.width - legendWidth,
              canvas.height - legendHeight,
              legendWidth,
              legendHeight,
            );

            finish();
          };
        },
      },
      {
        name: 'download-svg',
        title: 'Download as SVG without legend',
        icon: Plotly.Icons['camera-retro'],
        click: async (gd) => {
          await Plotly.downloadImage(gd, scatterOptions);
        },
      },
      {
        name: 'export-csv',
        title: 'Export as CSV',
        icon: Plotly.Icons['disk'],
        click: async () => {
          await handleScatterExportClick();
        },
      },
    ],
    modeBarButtonsToRemove: ['toImage', 'resetCameraLastSave3d'],
  };

  return {
    config: config,
  };
}
