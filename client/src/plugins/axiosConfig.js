import axios from "axios";
import Cookies from "../utils/appCookies";

// get the token
const baseURL = import.meta.env.VITE_BACK_END_API;
const token = Cookies.getCookie("x_auth_token");
const axiosInstance = axios.create({
  baseURL,
  headers: {
    "x-auth-token": token,
  },
});

export default axiosInstance;
