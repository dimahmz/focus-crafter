import { defineStore } from "pinia";
import { computed, reactive, watch } from "vue";
import makeRequest from "@/api/index";
import { successResponse } from "@/content/errors";

// stores
import { useCounterStore } from "./timer";
import { useUserStore } from "./user";

export const useSettingsStore = defineStore("settings", () => {
  // other stores
  const userStore = useUserStore();
  const timerStore = useCounterStore();

  // state is similar to the database settings document
  const state = reactive({
    timer: {
      pomodoro_npt: 25,
      shortBreak_npt: 5,
      longBreak_npt: 30,
      autoStartBreaks: false,
      autoStartPomodoros: false,
      notifyTime: 5,
      rounds: 4,
      alarmVolume: 0.5,
      selectedAlarm: "/alarms/alarm-bird.mp3",
      finishedPomodoros: 0,
    },
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
        value: "/alarms/alarm-bell.mp3",
      },
      {
        text: "Bird",
        value: "/alarms/alarm-bird.mp3",
      },
      {
        text: "digital",
        value: "/alarms/alarm-digital.mp3",
      },
      {
        text: "kitchen",
        value: "/alarms/alarm-kitchen.mp3",
      },
      {
        text: "wood",
        value: "/alarms/alarm-wood.mp3",
      },
    ],
  });

  /* ----Getters---- */

  // decide to which break to go
  const isRoundsCompleted = computed(function () {
    return state.timer.finishedPomodoros % state.timer.rounds === 0;
  });

  //sync the timer with the lastest changes made in the settings
  syncWithTimer();

  async function saveToDataBase() {
    let response = successResponse;
    if (userStore.state.loggedIn) {
      const stateCopy = { ...state.timer };
      response = await makeRequest("/editSettings", "put", {
        settingsUpdate: stateCopy,
      });
      return response;
    }
    return response;
  }

  // sync the settings store with the database
  function syncSettingsWithDB(settings) {
    for (const prop in settings) {
      if (state.timer.hasOwnProperty(prop)) {
        state.timer[prop] = settings[prop];
      }
    }
  }

  function syncWithTimer() {
    if (!timerStore.isTimerCounting) {
      timerStore.pomodoro = state.timer.pomodoro_npt * 60;
      timerStore.shortBreak = state.timer.shortBreak_npt * 60;
      timerStore.longBreak = state.timer.longBreak_npt * 60;
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
