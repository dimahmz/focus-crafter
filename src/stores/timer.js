import { defineStore, acceptHMRUpdate } from "pinia";

//setting store
import { useSettingsStore } from "./settings";
import { useTasksStore } from "./tasks";

export const useCounterStore = defineStore(
  "counter",

  {
    state: () => {
      const store = useSettingsStore();
      return {
        pauseTimer: false,
        needToChange: false,
        startAlarm: false,
        timerCountingIs: "promodro",
        //
        confirmChange: false,
        TimerIsCounting: false,
        //
        displayModel: false,
        confirmChange: false,
        //
        startPromodoro: true,
        promodoro: store.promodoro_npt,
        finishedPromodoros: 0,
        //
        startShortBreak: false,
        shortBreak: store.shortBreak_npt,
        //
        startLongBreak: false,
        longBreak: store.longBreak_npt,
        needLongBreak: false,
      };
    },
    getters: {
      getcounter: () => {},
      getTimerState() {
        if (this.pauseTimer) return "=>";
        return "||";
      },
    },
    actions: {
      startPromodorotTimer() {
        const store = useSettingsStore();
        const TasksStore = useTasksStore();
        this.TimerIsCounting = this.startPromodoro = true;
        this.timerCountingIs = "promodoro";
        const interval = setInterval(() => {
          if (this.needToChange || this.pauseTimer) {
            clearInterval(interval);
            return;
          }
          this.promodoro--;
          if (this.promodoro == 2) this.startAlarm = true;
          if (this.promodoro <= 0 || !this.startPromodoro) {
            this.finishedPromodoros++;
            TasksStore.tasks.value[TasksStore.selectedTaskNdx]
              .finishedPromdoros++;
            !this.finishedPromodoros % store.rounds === 0
              ? this.getAshortBreak(store.autoStartBreaks)
              : this.getAlongBreak(store.autoStartBreaks);
            clearInterval(interval);
            this.promodoro = store.promodoro_npt;
          }
        }, 1000);
      },
      startShortBreakTimer() {
        const store = useSettingsStore();
        this.TimerIsCounting = true;
        this.timerCountingIs = "shortBreak";
        const interval = setInterval(() => {
          if (this.needToChange || this.pauseTimer) {
            clearInterval(interval);
            return;
          }

          this.shortBreak--;
          if (this.shortBreak == 2) this.startAlarm = true;
          if (this.shortBreak <= 0 || !this.startShortBreak) {
            clearInterval(interval);
            this.goToPromodoro(store.autoStartPromodoros);
            this.shortBreak = store.shortBreak_npt;
          }
        }, 1000);
      },
      startLongBreakTimer() {
        const store = useSettingsStore();
        this.TimerIsCounting = true;
        this.timerCountingIs = "longBreak";
        const interval = setInterval(() => {
          if (this.needToChange || this.pauseTimer) {
            clearInterval(interval);
            return;
          }
          this.longBreak--;
          if (this.longBreak == 2) this.startAlarm = true;
          if (this.longBreak <= 0 || !this.startLongBreak) {
            clearInterval(interval);
            this.goToPromodoro(store.autoStartPromodoros);
            this.longBreak = store.longBreak_npt;
          }
        }, 1000);
      },
      restartTimer() {
        const store = useSettingsStore();
        this.pauseTimer = true;
        this.promodoro = store.promodoro_npt;
        this.longBreak = store.longBreak_npt;
        this.shortBreak = store.shortBreak_npt;
        this.TimerIsCounting = false;
        setTimeout(() => (this.pauseTimer = false), 1000);
      },
      pauseOrResumeTimer() {
        if (this.pauseTimer) {
          this.pauseTimer = false;
          this.needBreakConfirm(false);
          return;
        }
        this.pauseTimer = true;
      },
      goToPromodoro(autochange) {
        this.stopAll();
        this.startPromodoro = true;
        if (autochange) setTimeout(() => this.startPromodorotTimer(), 900);
      },
      getAshortBreak(autochange) {
        this.stopAll();
        this.startShortBreak = true;
        if (autochange) setTimeout(() => this.startShortBreakTimer(), 900);
      },
      getAlongBreak(autochange) {
        this.stopAll();
        this.startLongBreak = true;
        if (autochange) setTimeout(() => this.startLongBreakTimer(), 900);
      },
      changeToAnewPhase() {
        this.displayModel = true;
        this.needToChange = true;
      },
      changeAlarmSound(audioSrc) {
        audio_elem.src = audioSrc;
      },
      needBreakConfirm(confirm) {
        switch (this.timerCountingIs) {
          case "promodoro":
            if (confirm) this.promodoro = 0;
            this.startPromodorotTimer();
            break;
          case "shortBreak":
            if (confirm) this.shortBreak = 0;
            this.startShortBreakTimer();
            break;
          case "longBreak":
            if (confirm) this.longBreak = 0;
            this.startLongBreakTimer();
            break;
        }
        this.needToChange = this.displayModel = false;
      },
      stopAll() {
        this.startPromodoro =
          this.startShortBreak =
          this.startLongBreak =
          this.TimerIsCounting =
            false;
      },
    },
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot));
}
