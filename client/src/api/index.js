import axios from "@/plugins/axiosConfig";
import { ambigiousError, internetError } from "@/content/errors.json";

export default async function makeRequest(endpoint, method, data) {
  try {
    const config = {
      method,
      url: endpoint,
      data,
    };
    const response = await axios(config);

    return response.data;
  } catch (error) {
    if (!error?.response || !error?.response?.data) {
      // internet error
      if (!window.navigator.onLine) {
        window.alert(internetError.message + "\n" + internetError.details);
        return internetError;
      }
      window.alert(ambigiousError.message + "\n" + ambigiousError.details);

      return ambigiousError;
    }

    // server  error
    if (error.response.data.errorLevel == 3) {
      window.alert(ambigiousError.message + "\n" + ambigiousError.details);
      return ambigiousError;
    }
    // normal error
    return error.response.data;
  }
}
