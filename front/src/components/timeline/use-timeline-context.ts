import {useTimelineDom} from 'src/components/timeline/use-timeline-dom';
import {ref} from 'vue';

const overviewContext = ref<CanvasRenderingContext2D | null>(null);
const bodyContext = ref<CanvasRenderingContext2D | null>(null);

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
