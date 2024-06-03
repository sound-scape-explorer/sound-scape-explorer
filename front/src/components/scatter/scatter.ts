import Plotly, {
  type Layout,
  type PlotlyHTMLElement,
  type PlotMouseEvent,
  type PlotSelectionEvent,
} from 'plotly.js-dist-min';
import {useAppNotification} from 'src/app/notification/app-notification';
import {getFilesFromIntervals} from 'src/components/scatter/get-files-from-intervals';
import {useScatterCamera} from 'src/components/scatter/scatter-camera';
import {useScatterClick} from 'src/components/scatter/scatter-click';
import {useScatterConfig} from 'src/components/scatter/scatter-config';
import {useScatterTraces} from 'src/components/scatter/scatter-traces';
import {useClientSettings} from 'src/composables/client-settings';
import {useStorageAggregatedIntervalDetails} from 'src/composables/storage-aggregated-interval-details';
import {useStorageFiles} from 'src/composables/storage-files';
import {copyToClipboard} from 'src/utils/copy-to-clipboard';
import {generateFilePresenceArray} from 'src/utils/generate-file-presence-array';
import {computed, ref, unref} from 'vue';

const container = ref<PlotlyHTMLElement | null>(null);
const isAttached = ref<boolean>(false);
const isMounted = ref<boolean>(false);
const isRendering = ref<boolean>(false);

export function useScatter() {
  const {handleClick} = useScatterClick();
  const {config} = useScatterConfig();
  const {isLocked} = useScatterCamera();
  const {traces} = useScatterTraces();
  const {plotBackground} = useClientSettings();
  const {files} = useStorageFiles();
  const {notify} = useAppNotification();
  const {aggregatedIntervalDetails} = useStorageAggregatedIntervalDetails();
  const {copySelect2d} = useClientSettings();

  const handlePlotlyClick = (data: PlotMouseEvent) => {
    const intervalIndex = data.points[0].pointNumber;
    handleClick(intervalIndex);
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
    console.log('first render');
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
    container.value.on('plotly_click', (e) => {
      console.log(e);
    });
    container.value.on('plotly_selected', handleSelection);
  };

  const handleSelection = async (e: PlotSelectionEvent | undefined) => {
    if (!copySelect2d.value) {
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
      `${intervalIndexes.length} intervals and ${table.length} files selected`,
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
    console.log('render');
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
