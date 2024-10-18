import {useTimelineColors} from 'src/draggables/calendar/use-timeline-colors';
import {useTimelineContext} from 'src/draggables/calendar/use-timeline-context';
import {useTimelineHandlers} from 'src/draggables/calendar/use-timeline-handlers';

const textSize = 12;
const paddingHorizontal = 3;
const paddingVertical = 9;
const offsetX = 13;
const offsetY = -7;

export function useTimelineDrawTooltip() {
  const {context, hovered} = useTimelineContext();
  const {position} = useTimelineHandlers();
  const {primary} = useTimelineColors();

  const drawTooltip = () => {
    if (context.value === null || hovered.value === null) {
      return;
    }

    const ctx: CanvasRenderingContext2D = context.value;
    const texts = hovered.value.tooltip;

    const {x, y} = position.value;
    const xFinal = x + offsetX;
    const yFinal = y + offsetY;
    const h = textSize * texts.length + paddingVertical * 0.5 + 1;
    const w = Math.max(
      ...texts.map(
        (text) => (ctx.measureText(text).width + paddingHorizontal * 2) * 1.33,
      ),
    );

    ctx.fillStyle = hovered.value.color;
    ctx.fillRect(xFinal, yFinal, w, h);

    ctx.fillStyle = primary;
    ctx.textAlign = 'start';
    ctx.textBaseline = 'middle';

    ctx.font = `${textSize}px Helvetica`;

    texts.forEach((text, i) => {
      ctx.fillText(
        text,
        xFinal + paddingHorizontal,
        yFinal + paddingVertical + i * textSize,
      );
    });
  };

  return {
    drawTooltip: drawTooltip,
  };
}
