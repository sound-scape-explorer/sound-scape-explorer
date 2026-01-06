import {useBodyConfig} from 'src/components/timeline/body/use-body-config';
import {useTimelineContext} from 'src/components/timeline/use-timeline-context';
import {useTimelineDom} from 'src/components/timeline/use-timeline-dom';
import {useTimelineTheme} from 'src/components/timeline/use-timeline-theme';

export function useBodyDrawRows() {
  const {width} = useTimelineDom().body;
  const {context} = useTimelineContext().body;
  const {rowHeight, rows} = useBodyConfig();
  const {strokeLight} = useTimelineTheme();

  const drawRows = () => {
    if (!context.value) {
      return;
    }

    const ctx = context.value;

    ctx.strokeStyle = strokeLight;
    ctx.lineWidth = 1;
    for (let i = 0; i <= rows.value; i += 1) {
      const y = i * rowHeight;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width.value, y);
      ctx.stroke();
    }
  };

  return {
    drawRows,
  };
}
