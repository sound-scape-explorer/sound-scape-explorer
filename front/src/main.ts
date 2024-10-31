import App from 'src/_app.vue';
import {handleGlobalErrors} from 'src/common/Errors';
import {createApp} from 'vue';

const app = createApp(App);

app.mount('#app');

app.config.errorHandler = handleGlobalErrors;
