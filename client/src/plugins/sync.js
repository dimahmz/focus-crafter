import axios from "./axiosConfig";
import { useUserStore } from "../stores/user";

export default () => {
  // synchronize all the stores with the database
  axios
    .post(`/me`)
    .then((res) => {
      useUserStore().syncAllTheStoresWithDB(res.data);
      sessionStorage.setItem("loggedIn", true);
    })
    .catch((e) => {
      console.log(e);
      useUserStore().state.loggedIn = false;
      sessionStorage.setItem("loggedIn", false);
    });
};
