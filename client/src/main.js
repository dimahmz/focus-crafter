import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "/src/router/routes";
import App from "./App.vue";
import syncStores from "./plugins/syncStores";

import "./assets/main.css";

import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

async function createApplication() {
  app.use(createPinia());

  app.use(router);

  app.use(vuetify);

  // privide a function that fetch the user
  app.provide("syncStores", syncStores);

  app.mount("#app");
}

createApplication();
