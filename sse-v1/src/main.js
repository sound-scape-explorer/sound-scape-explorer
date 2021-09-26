import { createApp } from "vue";
import App from "./App.vue";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

import { BoxPlotController } from '@sgratzl/chartjs-chart-boxplot';
Chart.register(BoxPlotController);

createApp(App).mount("#app");
