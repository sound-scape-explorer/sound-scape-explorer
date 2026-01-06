import {useOverviewDrawer} from 'src/components/timeline/overview/use-overview-drawer';

export function useOverviewRender() {
  const {overview: drawer} = useOverviewDrawer();

  const render = () =>
    requestAnimationFrame(() => {
      drawer.background();
      drawer.window();
    });

  return {
    render,
  };
}
