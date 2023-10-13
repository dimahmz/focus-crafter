import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "/src/router/routes";
import App from "./App.vue";
import Antd from "ant-design-vue";
import syncStores from "./plugins/syncStores";

import "./assets/main.css";
import "./assets/style.css";

import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
// import "ant-design-vue/dist/antd.css";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(createPinia());

app.use(Antd);

app.use(vuetify);

// privide a function that fetch the user
app.provide("syncStores", syncStores);

app.use(router);

app.mount("#app");
