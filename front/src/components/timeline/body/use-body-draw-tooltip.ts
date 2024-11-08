import {useBodyHandlers} from 'src/components/timeline/body/use-body-handlers';
import {useBodyHover} from 'src/components/timeline/body/use-body-hover';
import {useTimelineContext} from 'src/components/timeline/use-timeline-context';
import {useTimelineDom} from 'src/components/timeline/use-timeline-dom';
import {useTimelineTheme} from 'src/components/timeline/use-timeline-theme';
import {isEnoughContrast} from 'src/utils/colors';

const textSize = 12;
const paddingHorizontal = 3;
const paddingVertical = 9;
const offsetX = 13;
const offsetY = -7;

export function useBodyDrawTooltip() {
  const {container} = useTimelineDom().body;
  const {context} = useTimelineContext().body;
  const {hovered} = useBodyHover();
  const {position} = useBodyHandlers();
  const {primary, background} = useTimelineTheme();

  const getStartingPositions = (
    contentWidth: number,
    contentHeight: number,
  ): [number, number] => {
    if (!container.value) {
      return [0, 0];
    }

    const {x, y} = position.value;
    let xFinal = x + offsetX;
    let yFinal = y + offsetY;

    const isRight =
      position.value.x + contentWidth > container.value.clientWidth;

    const isBottom =
      position.value.y + contentHeight > container.value.clientHeight;

    if (isBottom) {
      yFinal -= contentHeight + offsetY + paddingVertical;
    }

    if (isRight) {
      xFinal -= contentWidth + offsetX + paddingHorizontal;
    }

    if (xFinal < 0) {
      xFinal = 0;
    }

    if (yFinal < 0) {
      yFinal = 0;
    }

    return [xFinal, yFinal];
  };

  const drawTooltip = () => {
    if (context.value === null || hovered.value === null) {
      return;
    }

    const ctx: CanvasRenderingContext2D = context.value;
    const texts: string[] = hovered.value.tooltip;

    const h = textSize * texts.length + paddingVertical * 0.5 + 1;
    const w = Math.max(
      ...texts.map(
        (text) => ctx.measureText(text).width + paddingHorizontal * 2,
      ),
    );

    const [xFinal, yFinal] = getStartingPositions(w, h);

    ctx.fillStyle = hovered.value.color;
    ctx.fillRect(xFinal, yFinal, w, h);

    ctx.fillStyle = isEnoughContrast(primary, hovered.value.color)
      ? primary
      : background;
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
