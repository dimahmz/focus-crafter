import axios from "axios";
import Cookies from "../utils/appCookies";

// get the token
const token = Cookies.getCookie("x_auth_token");
const axiosInstance = axios.create({
  baseURL: "/api/",
  headers: {
    "x-auth-token": token,
  },
});

export default axiosInstance;
