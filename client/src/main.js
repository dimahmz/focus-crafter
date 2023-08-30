import Pinia from "./stores/Pinia";

import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "/src/router/routes";
import Antd from "ant-design-vue";
import App from "./App.vue";
import syncStores from "./plugins/syncStores";

import "ant-design-vue/dist/antd.css";
import "./assets/main.css";
import "./assets/style.css";

const app = createApp(App);

app.use(createPinia());

app.use(Antd);

// privide a function that fetch the user
app.provide("syncStores", syncStores);

app.use(router);

app.mount("#app");
