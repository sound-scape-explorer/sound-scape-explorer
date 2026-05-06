import {useBodyColors} from 'src/components/timeline/body/use-body-colors';
import {useBodyConfig} from 'src/components/timeline/body/use-body-config';
import {useBodyDrawer} from 'src/components/timeline/body/use-body-drawer';
import {useBodyElements} from 'src/components/timeline/body/use-body-elements';
import {useBodyHandlers} from 'src/components/timeline/body/use-body-handlers';
import {useBodyHover} from 'src/components/timeline/body/use-body-hover';
import {useTimelineContext} from 'src/components/timeline/use-timeline-context';
import {
  type BodySize,
  useTimelineDom,
} from 'src/components/timeline/use-timeline-dom';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useIntervalTransport} from 'src/composables/use-interval-transport';
import {onMounted, watch} from 'vue';

export function useBodyLifecycles({width}: BodySize) {
  const {canvas, updateSize} = useTimelineDom().body;
  const {mount: mountContext} = useTimelineContext().body;
  const {rows, refreshRows} = useBodyConfig();
  const {render} = useBodyDrawer();
  const {start, end, left, right} = useTimelineRange();
  const {update} = useBodyElements();
  const {generate: generateScale} = useBodyColors();
  const {elements} = useBodyElements();
  const {position} = useBodyHandlers();
  const {hovered} = useBodyHover();
  const {currentIndex} = useIntervalTransport();
  const {timeshift} = useClientSettings();

  const init = () => {
    mountContext();
    generateScale();
  };

  onMounted(render);

  // render when viewport moves (drag), hovered element changes, or data changes
  watch([left, right, elements, width, currentIndex, hovered], render);

  watch(canvas, init);

  // elements rebuild only on range/data change — NOT on viewport drag
  watch([start, end, timeshift], update);

  watch([width, rows], () => updateSize({width}));
  watch(elements, () => refreshRows(elements));
}
