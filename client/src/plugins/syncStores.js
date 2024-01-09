import axios from "./axiosConfig";
import { useUserStore } from "../stores/user";

export default async () => {
  const user = useUserStore();
  axios
    .get(`/userData`)
    .then((res) => {
      user.checkAuthLoading = true;
      useUserStore().syncAllTheStoresWithDB(res.data.payload.user);
      user.state.loggedIn = true;
      return res.data;
    })
    // what if the back-end is down
    .catch((e) => {
      user.state.loggedIn = false;
      e?.response?.data;
    })
    .finally((user.checkAuthLoading = false));
  return;
};
