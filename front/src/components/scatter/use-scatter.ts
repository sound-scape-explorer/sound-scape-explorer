import Plotly, {
  type Layout,
  type PlotlyHTMLElement,
  type PlotMouseEvent,
  type PlotSelectionEvent,
} from 'plotly.js-dist-min';
import {useAppNotification} from 'src/app/notification/use-app-notification';
import {useScatterCamera} from 'src/components/scatter/use-scatter-camera';
import {useScatterConfig} from 'src/components/scatter/use-scatter-config';
import {useScatterTraces} from 'src/components/scatter/use-scatter-traces';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useFiles} from 'src/composables/use-files';
import {useStorageAggregatedIntervalDetails} from 'src/composables/use-storage-aggregated-interval-details';
import {useAudioSelector} from 'src/draggables/audio/use-audio-selector';
import {copyToClipboard} from 'src/utils/copy-to-clipboard';
import {generateFilePresenceArray} from 'src/utils/generate-file-presence-array';
import {getFilesFromIntervals} from 'src/utils/get-files-from-intervals';
import {computed, ref, unref} from 'vue';

const container = ref<PlotlyHTMLElement | null>(null);
const isAttached = ref<boolean>(false);
const isMounted = ref<boolean>(false);
const isRendering = ref<boolean>(false);

export function useScatter() {
  const {selectAudio} = useAudioSelector();
  const {config} = useScatterConfig();
  const {isLocked} = useScatterCamera();
  const {traces} = useScatterTraces();
  const {plotBackground} = useClientSettings();
  const {files} = useFiles();
  const {notify} = useAppNotification();
  const {aggregatedIntervalDetails} = useStorageAggregatedIntervalDetails();
  const {isCopyOnSelect2d} = useClientSettings();

  const handlePlotlyClick = (e: PlotMouseEvent) => {
    const intervalIndex = e.points[0].pointNumber;
    selectAudio(intervalIndex);
  };

  const layout = computed<Partial<Layout> | null>(() => {
    // noinspection SpellCheckingInspection
    const l: Partial<Layout> = {
      dragmode: 'select',
      margin: {
        t: 0,
        r: 0,
        b: 0,
        l: 0,
      },
      plot_bgcolor: plotBackground.value,
      yaxis: {
        scaleanchor: 'x',
        scaleratio: 1,
      },
      showlegend: false,
    };

    return l;
  });

  const mount = async () => {
    if (
      container.value === null ||
      layout.value === null ||
      isMounted.value === true
    ) {
      return;
    }

    isMounted.value = true;
    await Plotly.newPlot(container.value, [], layout.value, config.value);
    console.log('Scatter: First render');
  };

  const attachListeners = () => {
    if (
      container.value === null ||
      isMounted.value === false ||
      isAttached.value === true
    ) {
      return;
    }

    isAttached.value = true;

    container.value.on('plotly_click', handlePlotlyClick);
    container.value.on('plotly_selected', handleSelection);
  };

  const handleSelection = async (e: PlotSelectionEvent | undefined) => {
    if (!isCopyOnSelect2d.value) {
      return;
    }

    const details = unref(aggregatedIntervalDetails);

    if (typeof e === 'undefined' || files.value === null || details === null) {
      return;
    }

    const intervalIndexes = e.points.map((point) => point.pointIndex);
    const fileIndexes = getFilesFromIntervals(details, intervalIndexes);
    const table = generateFilePresenceArray(files.value.length, fileIndexes);
    const string = 'selection\n' + table.join('\n');

    await copyToClipboard(string);

    notify(
      'success',
      `${intervalIndexes.length} intervals for ${
        table.filter((v) => v === 'true').length
      } files selected`,
      'Selection copied!',
    );
  };

  const render = async () => {
    if (
      isMounted.value === false ||
      isRendering.value === true ||
      container.value === null ||
      layout.value === null
    ) {
      return;
    }

    isRendering.value = true;
    await Plotly.react(
      container.value,
      traces.value,
      layout.value,
      config.value,
    );

    console.log('Scatter: Render');
    isRendering.value = false;
  };

  return {
    container: container,
    isLocked: isLocked,
    isMounted: isMounted,
    isAttached: isAttached,
    mount: mount,
    attachListeners: attachListeners,
    render: render,
  };
}
