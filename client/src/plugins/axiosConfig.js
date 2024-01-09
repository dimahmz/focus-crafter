import axios from "axios";
import Cookies from "js-cookie";

// get the token
const baseURL = import.meta.env.VITE_BACK_END_API;
const token = Cookies.get("x_auth_token");
const axiosInstance = axios.create({
  baseURL,
  headers: {
    x_auth_token: token,
  },
});

export default axiosInstance;
