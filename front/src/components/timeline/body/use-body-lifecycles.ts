import {useBodyColors} from 'src/components/timeline/body/use-body-colors';
import {useBodyConfig} from 'src/components/timeline/body/use-body-config';
import {useBodyDrawer} from 'src/components/timeline/body/use-body-drawer';
import {useBodyElements} from 'src/components/timeline/body/use-body-elements';
import {useTimelineContext} from 'src/components/timeline/use-timeline-context';
import {
  type BodySize,
  useTimelineDom,
} from 'src/components/timeline/use-timeline-dom';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {onMounted, watch} from 'vue';

export function useBodyLifecycles({width}: BodySize) {
  const {canvas, updateSize} = useTimelineDom().body;
  const {mount: mountContext} = useTimelineContext().body;
  const {rows, refreshRows} = useBodyConfig();
  const {render} = useBodyDrawer();
  const {left, right} = useTimelineRange();
  const {update} = useBodyElements();
  const {generate: generateScale} = useBodyColors();
  const {elements} = useBodyElements();

  onMounted(render);

  watch(canvas, () => {
    mountContext();
    generateScale();
  });

  watch([left, right], update);
  watch([width, rows], () => updateSize({width: width}));
  watch(elements, () => refreshRows(elements));
}
