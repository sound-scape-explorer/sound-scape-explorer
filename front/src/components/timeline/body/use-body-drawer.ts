import {useBodyDrawBackground} from 'src/components/timeline/body/use-body-draw-background';
import {useBodyDrawElements} from 'src/components/timeline/body/use-body-draw-elements';
import {useBodyDrawRows} from 'src/components/timeline/body/use-body-draw-rows';
import {useBodyDrawTooltip} from 'src/components/timeline/body/use-body-draw-tooltip';

export function useBodyDrawer() {
  const {drawBackground} = useBodyDrawBackground();
  const {drawRows} = useBodyDrawRows();
  const {drawElements} = useBodyDrawElements();
  const {drawTooltip} = useBodyDrawTooltip();

  const render = () =>
    requestAnimationFrame(() => {
      drawBackground();
      drawRows();
      drawElements();
      drawTooltip();
    });

  return {
    render: render,
  };
}
