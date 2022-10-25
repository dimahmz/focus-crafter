import { defineStore, acceptHMRUpdate } from "pinia";
export const useSettingsStore = defineStore("settings", {
  state: () => {
    return {
      showModal: true,
      promodoro_npt: 25,
      shortBreak_npt: 5,
      longBreak_npt: 30,
      autoStartBreaks: false,
      autoStartPromodoros: false,
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
    };
  },
  getters: {},
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot));
}
