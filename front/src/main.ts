import App from 'src/_app.vue';
import {handleGlobalErrors} from 'src/utils/errors';
import {createApp} from 'vue';

const app = createApp(App);

app.mount('#app');

app.config.errorHandler = handleGlobalErrors;
