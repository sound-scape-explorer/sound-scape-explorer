import {useTimelineDom} from 'src/components/timeline/use-timeline-dom';
import {ref} from 'vue';

const overviewContext = ref<Nullable<CanvasRenderingContext2D>>(null);
const bodyContext = ref<Nullable<CanvasRenderingContext2D>>(null);

export function useTimelineContext() {
  const {overview, body} = useTimelineDom();

  const mountOverviewContext = () => {
    overviewContext.value = overview.canvas.value?.getContext('2d') ?? null;
  };

  const mountBodyContext = () => {
    bodyContext.value = body.canvas.value?.getContext('2d') ?? null;
  };

  return {
    overview: {
      mount: mountOverviewContext,
      context: overviewContext,
    },
    body: {
      mount: mountBodyContext,
      context: bodyContext,
    },
  };
}
