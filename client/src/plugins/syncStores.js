import axios from "./axiosConfig";
import { useUserStore } from "../stores/user";
import Cookies from "../utils/appCookies";

export default () => {
  // synchronize all the stores with the database
  if (Cookies.getCookie("x_auth_token")) {
    axios
      .get(`/userData`)
      .then((res) => {
        useUserStore().syncAllTheStoresWithDB(res.data.payload.user);
      })
      .catch(() => useUserStore().logOutUser());
  }
  return;
};
