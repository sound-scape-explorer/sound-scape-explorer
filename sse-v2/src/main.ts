import { createApp } from 'vue'
import App from './App.vue'

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
Chart.register(BoxPlotController, BoxAndWiskers);

createApp(App).mount("#app");
