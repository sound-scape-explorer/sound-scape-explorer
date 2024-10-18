import Plotly, {type ToImgopts} from 'plotly.js-dist-min';
import {type ScatterProps} from 'src/components/scatter/use-scatter-config';
import {useLabelsScreenshot} from 'src/draggables/labels/use-labels-screenshot';
import {triggerCanvasDownload} from 'src/utils/trigger-canvas-download';

export function useScatterDownloadPngButton(props: ScatterProps) {
  const {screenshotLabel} = useLabelsScreenshot();

  const button = {
    name: 'download-png',
    title: 'Download as PNG with legend',
    icon: Plotly.Icons.camera,
    // @ts-expect-error untyped
    click: async (gd) => {
      const options: ToImgopts = {...props, format: 'png'};

      let data = await Plotly.toImage(gd, options);
      const prefix = 'data:image/png;base64,';
      if (!data.startsWith(prefix)) {
        data = prefix + data;
      }

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = props.width * props.scale;
      canvas.height = props.height * props.scale;

      const finish = () => {
        triggerCanvasDownload(canvas, props.name);
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
          legendContext.canvas.width * props.scale * legendScale;
        const legendHeight =
          legendContext.canvas.height * props.scale * legendScale;

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
  };

  return {
    button: button,
  };
}
