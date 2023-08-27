import axios from "./axiosConfig";
import { useUserStore } from "../stores/user";

export default () => {
  // synchronize all the stores with the database
  axios
    .get(`/appData`)
    .then((res) => {
      useUserStore().syncAllTheStoresWithDB(res.data);
    })
    .catch(() => (useUserStore().state.loggedIn = false));
};
