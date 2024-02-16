import axios from "axios";
import Cookies from "js-cookie";

// get the token
const baseURL = import.meta.env.VITE_BACK_END_API;
const axiosInstance = axios.create({
  baseURL,
  headers: {
    x_auth_token: Cookies.get("x_auth_token"),
  },
});

export function addAuthToken(token) {
  axiosInstance.defaults.headers.common["x_auth_token"] = token;
}

export default axiosInstance;
