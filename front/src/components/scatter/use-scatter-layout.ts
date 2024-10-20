import {type Layout} from 'plotly.js-dist-min';
import {useClientSettings} from 'src/composables/use-client-settings';
import {computed} from 'vue';

export function useScatterLayout() {
  const {plotBackground} = useClientSettings();

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
      paper_bgcolor: plotBackground.value,
      yaxis: {
        scaleanchor: 'x',
        scaleratio: 1,
      },
      showlegend: false,
    };

    return l;
  });

  return {
    layout: layout,
  };
}
