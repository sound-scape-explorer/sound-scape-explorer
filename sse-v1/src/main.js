import {createApp} from 'vue';
import App from './App.vue';

import {Chart, registerables} from 'chart.js';
import {BoxPlotController} from '@sgratzl/chartjs-chart-boxplot';

Chart.register(...registerables);

Chart.register(BoxPlotController);

createApp(App).mount('#app');
