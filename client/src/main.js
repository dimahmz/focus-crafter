import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "/src/router/index"
import Antd from "ant-design-vue";
import App from "./App.vue";

import "ant-design-vue/dist/antd.css";
import "./assets/main.css";
import "./assets/style.css";

const app = createApp(App);

app.use(createPinia());

app.use(Antd);

app.use(router);

app.mount("#app");