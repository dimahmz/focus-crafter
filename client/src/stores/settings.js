import { defineStore } from "pinia";
import { computed, reactive, watch } from "vue";
import axios from "../plugins/axiosConfig";

// stores
import { useCounterStore } from "./timer";
import { useUserStore } from "./user";

export const useSettingsStore = defineStore("settings", () => {
  // other stores
  const userStore = useUserStore();
  const timerStore = useCounterStore();

  // state is similar to the database settings document
  const state = reactive({
    promodoro_npt: 25,
    shortBreak_npt: 5,
    longBreak_npt: 30,
    autoStartBreaks: false,
    autoStartPromodoros: false,
    allowNotification: false,
    notifyTime: 5,
    rounds: 4,
    alarmVolume: 50,
    selectedAlarm: "https://pomofocus.io/audios/alarms/alarm-bird.mp3",
    focusMode: false,
    finishedPomodoros: 0,
  });

  // this state is related to only the fron-end
  const _state = reactive({
    showSettingsModal: false,
    showTasksModal: false,
    showAddNewTaskModal: false,
    showEditTaskModal: false,

    alarmSound: [
      {
        text: "Bell",
        value: "https://pomofocus.io/audios/alarms/alarm-bell.mp3",
      },
      {
        text: "Bird",
        value: "https://pomofocus.io/audios/alarms/alarm-bird.mp3",
      },
      {
        text: "digital",
        value: "https://pomofocus.io/audios/alarms/alarm-digital.mp3",
      },
      {
        text: "kitchen",
        value: "https://pomofocus.io/audios/alarms/alarm-kitchen.mp3",
      },
      {
        text: "wood",
        value: "https://pomofocus.io/audios/alarms/alarm-wood.mp3",
      },
    ],
  });

  /* ----Getters---- */

  // decide to which break to go
  const isRoundsCompleted = computed(function () {
    return state.finishedPomodoros % state.rounds === 0;
  });

  //sync the timer with the lastest changes made in the settings
  syncWithTimer();

  function saveToDataBase() {
    if (userStore.state.loggedIn) {
      const stateCopy = JSON.stringify(state);
      axios.put("/editUser/settings", {
        settingsUpdate: stateCopy,
      });
    }
  }

  // sync the settings store with the database
  function syncSettingsWithDB(settings) {
    for (const prop in settings) {
      if (state.hasOwnProperty(prop)) {
        state[prop] = settings[prop];
      }
    }
  }

  function syncWithTimer() {
    if (!timerStore.isTimerCounting) {
      timerStore.promodoro = state.promodoro_npt * 60;
      timerStore.shortBreak = state.shortBreak_npt * 60;
      timerStore.longBreak = state.longBreak_npt * 60;
    }
  }
  // make the timer updated
  watch(state, syncWithTimer);

  return {
    state,
    _state,
    isRoundsCompleted,
    saveToDataBase,
    syncSettingsWithDB,
  };
});

// const promodoroBgColor = computed(function () {
//   const bgColor = toRef(state.appSelectedColor, "promodoro");
//   return bgColor.value.primaryColor;
// });
// const shortBreakBgColor = computed(function () {
//   const bgColor = toRef(state.appSelectedColor, "shortBreak");
//   return bgColor.value.primaryColor;
// });
// const longBreakBgColor = computed(function () {
//   const bgColor = toRef(state.appSelectedColor, "longBreak");
//   return bgColor.value.primaryColor;
// });

// function changeAppColor(selectedColor, timer) {
//   document.documentElement.style.setProperty(
//     `--${timer}-primary-color`,
//     selectedColor.primaryColor
//   );
//   document.documentElement.style.setProperty(
//     `--${timer}-secondary-color`,
//     selectedColor.secondaryColor
//   );
//   document.documentElement.style.setProperty(
//     `--${timer}-tertiary-color`,
//     selectedColor.tertiaryColor
//   );
//   state.appSelectedColor[timer] = selectedColor;
// }
