import { createApp } from 'vue';
import store from './stores';

import App from './App.vue';
import router from './router';
// 引入全局样式
import '@/styles/index.scss';

const app = createApp(App);

import ElementPlus from 'element-plus'; // 导入UI组件库
import 'element-plus/dist/index.css'; // 导入依赖css文件
app.use(ElementPlus); // 全局安装ElementPlus
// 消息弹框的样式
// import 'element-plus/theme-chalk/el-message.css';
// import 'element-plus/theme-chalk/el-message.css';

app.use(router);
app.use(store);

app.mount('#app');
