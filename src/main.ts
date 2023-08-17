import { createApp } from 'vue';
import store from './stores';

import App from './App.vue';
import router from './router';
// 引入全局样式
import '@/styles/index.scss';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
