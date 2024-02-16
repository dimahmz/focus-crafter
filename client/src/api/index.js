import axios from "@/plugins/axiosConfig";
import { ambigiousError, internetError } from "@/content/errors.json";
import Cookies from "js-cookie";

export default async function makeRequest(endpoint, method, data) {
  try {
    const config = {
      method,
      url: endpoint,
      data,
      headers: {
        x_auth_token: Cookies.get("x_auth_token"),
      },
    };
    const response = await axios(config);

    return response.data;
  } catch (error) {
    if (!error?.response || !error?.response?.data) {
      // internet error
      if (!window.navigator.onLine) {
        window.alert(internetError.title + "\n" + internetError.description);
        return internetError;
      }
      window.alert(ambigiousError.title + "\n" + ambigiousError.description);

      return ambigiousError;
    }

    // server  error
    if (error.response.data.errorLevel == 3) {
      window.alert(ambigiousError.title + "\n" + ambigiousError.description);
      return ambigiousError;
    }
    // normal error
    return error.response.data;
  }
}
