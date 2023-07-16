import { defineStore } from "pinia";
import { reactive } from "vue";
import { useSettingsStore } from "../stores/settings";
import { useTasksStore } from "../stores/tasks";

import axios from "../plugins/axiosConfig";

export const useUserStore = defineStore("user", () => {
  const state = reactive({
    loggedIn: false,
    name: "john",
    email: "johndeo1@anemail.com",
    imagePath: "http://localhost:3000",
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

  // change the user name

  async function changeUserName() {
    if (_state.name.length < 4) {
      _state.name = state.name;
      window.alert("name is short");
      return;
    }
    if (_state.name == state.name) return;
    const token =
      sessionStorage.getItem("x-auth-token") ||
      localStorage.getItem("x-auth-token");
    const name = _state.name;
    try {
      const response = await axios.put("/editUser/name", {
        name,
      });
      state.name = _state.name;
      window.alert(response.data);
    } catch (e) {
      _state.name = state.name;
      const res = e?.response?.data;
      if (res) return window.alert(res);
      window.alert("name hasn't been updated!");
    }
  }

  // log out the user

  async function logOutUser() {
    if (sessionStorage.getItem("x-auth-token")) {
      sessionStorage.removeItem("x-auth-token");
    } else {
      localStorage.removeItem("x-auth-token");
    }
    window.location.href = "/";
  }

  return { state, _state, syncAllTheStoresWithDB, changeUserName, logOutUser };
});
