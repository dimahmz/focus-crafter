import { defineStore } from "pinia";
import { reactive } from "vue";
import { useSettingsStore } from "../stores/settings";
import { useTasksStore } from "../stores/tasks";
import axios from "../plugins/axiosConfig";
import Cookies from "../utils/appCookies";
import router from "../router/routes";

export const useUserStore = defineStore("user", () => {
  const state = reactive({
    loggedIn: false,
    rememberMe: false,
    name: "john",
    email: "johndeo1@anemail.com",
    imagePath: "http://localhost:3000",
    resetPassModal: false,
    messageModal: false,
    popupImg: false,
    serverResponse: {},
  });

  // state for changes
  const _state = reactive({
    name: "",
    email: "",
    imagePath: "http://localhost:3000",
  });

  /* ----Methods---- */

  // sync all the stores
  function syncAllTheStoresWithDB(data) {
    state.loggedIn = true;
    // sync with the settings store
    if (data.settings) useSettingsStore().syncSettingsWithDB(data.settings);
    // sync with the tasks store

    if (data.task) useTasksStore().syncTasksWithDB(data.task);
    // sync the user store
    state.name = data.name;
    state.email = data.email;
    state.imagePath += data.img.path;
    //
    _state.name = data.name;
    _state.email = data.email;
    _state.imagePath += data.img.path;
  }

  // log in the user
  async function loginUser({ name, password }, rememberMe) {
    try {
      const response = await axios({
        method: "post",
        url: "auth",
        data: { name, password },
      });
      // remember the user
      if (rememberMe) {
        localStorage.setItem("authenticated", true);
        sessionStorage.removeItem("authenticated");
      } else {
        sessionStorage.setItem("authenticated", true);
        localStorage.removeItem("authenticated");
      }
      const days = rememberMe ? 100 : 0;
      const user = response.data.payload.user;
      // get the token from the response and store it in the cookies
      Cookies.setCookie(
        "x_auth_token",
        response.data.payload.x_auth_token,
        days
      );
      // synchronize the stores with th the database
      syncAllTheStoresWithDB(user);
      // redirect to home page
      router.push({ name: "home" });
    } catch (e) {
      return e.response.data;
    }
  }

  // change the user name
  async function changeUserName() {
    if (_state.name.length < 4) {
      _state.name = state.name;
      return {
        title: "name is too short ",
        description: "name should contain at least four carachters!",
        errorLevel: 1,
      };
    }
    const name = _state.name;
    try {
      const response = await axios.put("/editUser/name", { name });
      state.name = _state.name;
      return response.data;
    } catch (e) {
      _state.name = state.name;
      return e.response.data;
    }
  }

  // change the user password
  async function changePassword(old_password, new_password) {
    try {
      const response = await axios.put("/editUser/password", {
        old_password,
        new_password,
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }

  // change the user image
  async function changeUserProfile(formData) {
    try {
      const response = await axios.put("/editUser/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }

  function isUserLoggedIn() {
    return (
      state.loggedIn ||
      JSON.parse(sessionStorage.getItem("authenticated")) ||
      JSON.parse(localStorage.getItem("authenticated"))
    );
  }

  // log out the user
  async function logOutUser() {
    Cookies.removeCookie("x_auth_token");
    state.loggedIn = false;
    state.serverResponse = {};
    localStorage.removeItem("authenticated");
    sessionStorage.removeItem("authenticated");
    router.push({ name: "home" });
  }

  return {
    state,
    _state,
    syncAllTheStoresWithDB,
    changeUserName,
    logOutUser,
    loginUser,
    changePassword,
    changeUserProfile,
    isUserLoggedIn,
  };
});
