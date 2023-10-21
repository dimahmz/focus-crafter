import axios from "./axiosConfig";
import { useUserStore } from "../stores/user";
import Cookies from "../utils/appCookies";

export default async () => {
  // synchronize all the stores with the database
  if (Cookies.getCookie("x_auth_token")) {
    const user = useUserStore();

    axios
      .get(`/userData`)
      .then((res) => {
        useUserStore().syncAllTheStoresWithDB(res.data.payload.user);
        return res.data;
      })
      // what if the back-end is down
      .catch((e) => {
        user.state.loggedIn = false;
        e?.response?.data;
      });
  }
  return;
};
