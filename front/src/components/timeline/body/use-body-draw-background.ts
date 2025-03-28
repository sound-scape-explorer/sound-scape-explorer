import {useTimelineContext} from 'src/components/timeline/use-timeline-context';
import {useTimelineDom} from 'src/components/timeline/use-timeline-dom';
import {useTimelineTheme} from 'src/components/timeline/use-timeline-theme';

export function useBodyDrawBackground() {
  const {width, height} = useTimelineDom().body;
  const {context} = useTimelineContext().body;
  const {background} = useTimelineTheme();

  const drawBackground = () => {
    if (!context.value) {
      return;
    }

    const ctx = context.value;
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width.value, height.value);
  };

  return {
    drawBackground: drawBackground,
  };
}
