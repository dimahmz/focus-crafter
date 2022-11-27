import { defineStore, acceptHMRUpdate } from "pinia";
import { reactive, watch ,toRef,computed} from "vue";

//other stores
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

    diplayPallete:false,
    
    appSelectedColor: {
      promodoro:{
        primaryColor: "#00042c",
        secondaryColor: "#12163d",
        tertiaryColor: "#ff6d7f",
      },
      shortBreak:{
        primaryColor: "#00042c",
        secondaryColor: "#12163d",
        tertiaryColor: "#ff6d7f",
      },
      longBreak:{
        primaryColor: "#00042c",
        secondaryColor: "#12163d",
        tertiaryColor: "#ff6d7f",
      }
    },
    focusedMode: false,
  });

  const promodoroBgColor = computed(function () {
    const bgColor = toRef(state.appSelectedColor, "promodoro");
    return bgColor.value.primaryColor;
  });
  const shortBreakBgColor = computed(function () {
    const bgColor = toRef(state.appSelectedColor, "shortBreak");
    return bgColor.value.primaryColor;
  });
  const longBreakBgColor = computed(function () {
    const bgColor = toRef(state.appSelectedColor, "longBreak");
    return bgColor.value.primaryColor;
  });


  function changeAppColor(selectedColor,timer) {
    document.documentElement.style.setProperty(`--${timer}-primary-color`,selectedColor.primaryColor);
    document.documentElement.style.setProperty(`--${timer}-secondary-color`,selectedColor.secondaryColor);
    document.documentElement.style.setProperty(`--${timer}-tertiary-color`,selectedColor.tertiaryColor);
    state.appSelectedColor[timer] = selectedColor;
  }

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
    promodoroBgColor,
    shortBreakBgColor,
    longBreakBgColor,
    changeAppColor,

  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot));
}
