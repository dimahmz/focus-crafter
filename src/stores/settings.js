import { defineStore, acceptHMRUpdate } from "pinia";
import { reactive, watch } from "vue";

import { useCounterStore } from "./timer";

export const useSettingsStore = defineStore("settings", () => {
  const state = reactive({
    showSettingsModal: false,
    showTasksModal: true,
    promodoro_npt: 25,
    shortBreak_npt: 5,
    longBreak_npt: 30,
    autoStartBreaks: false,
    autoStartPromodoros: false,
    allowNotification: false,
    notifyTime: 5,
    rounds: 4,
    alarmVolume: 50,
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
    selectedAlarm: "https://pomofocus.io/audios/alarms/alarm-bird.mp3",
    focusedMode: false,
  });

  watch(state, updateTimer);

  function updateTimer() {
    const timerStore = useCounterStore();
    if (!timerStore.TimerIsCounting) {
      timerStore.promodoro = state.promodoro_npt * 60;
      timerStore.shortBreak = state.shortBreak_npt * 60;
      timerStore.longBreak = state.longBreak_npt * 60;
    }
  }
  return {
    state,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot));
}
