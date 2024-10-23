import {useBodyColors} from 'src/components/timeline/body/use-body-colors';
import {useBodyConfig} from 'src/components/timeline/body/use-body-config';
import {useBodyDrawer} from 'src/components/timeline/body/use-body-drawer';
import {useBodyElements} from 'src/components/timeline/body/use-body-elements';
import {useCalendarRange} from 'src/components/timeline/use-calendar-range';
import {useTimelineContext} from 'src/components/timeline/use-timeline-context';
import {
  type BodySize,
  useTimelineDom,
} from 'src/components/timeline/use-timeline-dom';
import {onMounted, watch} from 'vue';

export function useBodyLifecycles({width}: BodySize) {
  const {canvas, updateSize} = useTimelineDom().body;
  const {mount: mountContext} = useTimelineContext().body;
  const {rows, refreshTime} = useBodyConfig();
  const {render} = useBodyDrawer();
  const {left, right} = useCalendarRange();
  const {elements, update} = useBodyElements();
  const {generate: generateScale} = useBodyColors();

  onMounted(render);

  watch(canvas, () => {
    mountContext();
    generateScale();
  });

  watch([left, right], update);
  watch(elements, () => refreshTime(elements));
  watch([width, rows], () => updateSize({width: width}));
}
