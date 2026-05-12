import {useOverviewDrawer} from 'src/components/timeline/overview/use-overview-drawer';

let frameId: number | null = null;

export function useOverviewRender() {
  const {overview: drawer} = useOverviewDrawer();

  const render = () => {
    if (frameId !== null) {
      return;
    }
    frameId = requestAnimationFrame(() => {
      frameId = null;
      drawer.background();
      drawer.window();
    });
  };

  return {
    render,
  };
}
