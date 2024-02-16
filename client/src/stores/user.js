import { defineStore } from "pinia";
import { reactive } from "vue";
import { useSettingsStore } from "../stores/settings";
import { useTasksStore } from "../stores/tasks";
import axios, { addAuthToken } from "@/plugins/axiosConfig";
import makeRequest from "@/api/index";

import Cookies from "js-cookie";
import router from "../router/routes";
import _ from "loadsh";

export const useUserStore = defineStore("user", () => {
  const state = reactive({
    checkAuthLoading: false,
    loggedIn: false,
    rememberMe: false,
    name: "john",
    email: "johndeo1@anemail.com",
    imagePath: "http://localhost:3000",
    resetPassModal: false,
    messageModal: false,
    popupImg: false,
    openSnackbar: false,
    openRegistrationModal: false,
    serverResponse: {
      success: true,
      title: "",
      description: "",
      errorLevel: 0,
    },
    serverResponseError: {
      success: false,
      title: "A server error has occurred",
      description: "Couldn't get response, please try agaian later",
      errorLevel: 4,
    },
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

    if (data.tasks) useTasksStore().syncTasksWithDB(data.tasks);
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
    const response = await makeRequest("/auth", "post", {
      name,
      password,
    });
    if (!response.success) {
      _.assign(state.serverResponse, response);
      return;
    }
    const days = rememberMe ? 365 : 0;
    const user = response.payload.user;
    // get the token from the response and store it in the cookies
    Cookies.set("x_auth_token", response.payload.x_auth_token, {
      expires: days,
    });
    addAuthToken(Cookies.get("x_auth_token"));
    // synchronize the stores with th the database
    syncAllTheStoresWithDB(user);

    // redirect to home page
    router.push({ name: "home" });
  }

  async function registerUser(user) {
    const response = await makeRequest("signup", "post", { ...user });
    await _.assign(state.serverResponse, response);

    if (response.success) {
      state.openRegistrationModal = true;
    } else {
      state.openSnackbar = true;
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
  // log out the user
  async function logOutUser() {
    Cookies.remove("x_auth_token");
    state.loggedIn = false;
    state.serverResponse = {};
    router.push({ name: "home" });
  }

  return {
    state,
    _state,
    syncAllTheStoresWithDB,
    changeUserName,
    logOutUser,
    registerUser,
    loginUser,
    changePassword,
    changeUserProfile,
  };
});
