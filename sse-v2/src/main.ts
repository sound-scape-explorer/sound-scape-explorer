import { createApp } from 'vue';
import App from './App.vue';
import VueResizeObserver from "vue-resize-observer";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
Chart.register(BoxPlotController, BoxAndWiskers);

const app = createApp(App);
app.use(VueResizeObserver);
app.mount("#app");
