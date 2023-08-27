import { markRaw } from "vue";
import router from "../router/routes";
import { createPinia } from "pinia";

export default function usePinia() {
  const pinia = createPinia();
  pinia.use(({ store }) => {
    store.router = markRaw(router);
  });
  return pinia;
}
