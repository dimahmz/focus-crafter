import { defineStore } from "pinia";

//setting store
import { useSettingsStore } from "./settings";
import { useTasksStore } from "./tasks";

export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      sessionPomodoros: 0,
      pauseTimer: false,
      needToChange: false,
      startAlarm: false,
      timerWorkingIs: "pomodro",
      //
      confirmChange: false,
      isTimerCounting: false,
      //
      confirmChange: false,
      //
      startingPomodoroTimer: true,
      pomodoro: 25 * 60,
      finishedPomodoros: 0,
      //
      startingShortBreakTimer: false,
      shortBreak: 5 * 60,
      //
      startingLongBreakTimer: false,
      longBreak: 30 * 60,
      needLongBreak: false,
      focusMode: false,
      intervals: [],
    };
  },
  getters: {
    getPomodoroCounter() {
      return this.timerStringFormat(this.pomodoro);
    },
    getShortBreakCounter() {
      return this.timerStringFormat(this.shortBreak);
    },
    getLongBreakCounter() {
      return this.timerStringFormat(this.longBreak);
    },
    getCurrentTimerValue() {
      if (this.startingPomodoroTimer)
        return `Focus time- ${this.getPomodoroCounter}`;
      if (this.startingShortBreakTimer)
        return `Break time- ${this.getShortBreakCounter}`;
      return `Break time- ${this.getLongBreakCounter}`;
    },
  },
  actions: {
    startPomodoroTimer() {
      const settingsStore = useSettingsStore();
      const tasksStore = useTasksStore();
      this.isTimerCounting = this.startingPomodoroTimer = true;
      this.timerWorkingIs = "pomodoro";
      // clear all the intervals in this window session to avoid conflicts
      this.intervals.filter((id) => {
        try {
          clearInterval(id);
          return false;
        } catch {
          return true;
        }
      });
      const intervalID = setInterval(() => {
        if (this.needToChange || this.pauseTimer) {
          clearInterval(intervalID);
          this.focusMode = false;
          return;
        }

        this.pomodoro--;

        if (this.pomodoro == 3)
          // start the alart
          this.startAlarm = true;

        // update finished pomodoros
        if (this.pomodoro <= 0 || !this.startingPomodoroTimer) {
          this.finishedPomodoros++;
          this.sessionPomodoros++;
          settingsStore.state.timer.finishedPomodoros++;
          tasksStore.incrementTaskPomodro();

          // decide which break the timer should invoke
          // the number of rounds is configured in the settings
          settingsStore.isRoundsCompleted
            ? this.getAlongBreak(settingsStore.state.timer.autoStartBreaks)
            : this.getAshortBreak(settingsStore.state.timer.autoStartBreaks);

          // clear interval and get back to the initial values
          clearInterval(intervalID);
          this.focusMode = false;
          this.pomodoro = settingsStore.state.timer.pomodoro_npt * 60;
        }
      }, 1000);
      this.intervals.push(intervalID);
    },
    startShortBreakTimer() {
      const settingsStore = useSettingsStore();
      this.isTimerCounting = true;
      this.timerWorkingIs = "shortBreak";
      const interval = setInterval(() => {
        if (this.needToChange || this.pauseTimer) {
          clearInterval(interval);
          return;
        }

        this.shortBreak--;
        if (this.shortBreak == 2) this.startAlarm = true;
        if (this.shortBreak <= 0 || !this.startingShortBreakTimer) {
          clearInterval(interval);
          this.goToPomodoro(settingsStore.state.timer.autoStartPomodoros);
          this.shortBreak = settingsStore.state.timer.shortBreak_npt * 60;
        }
      }, 1000);
    },
    startLongBreakTimer() {
      const settingsStore = useSettingsStore();
      this.isTimerCounting = true;
      this.timerWorkingIs = "longBreak";
      const interval = setInterval(() => {
        if (this.needToChange || this.pauseTimer) {
          clearInterval(interval);
          return;
        }
        this.longBreak--;
        if (this.longBreak == 2) this.startAlarm = true;
        if (this.longBreak <= 0 || !this.startingLongBreakTimer) {
          clearInterval(interval);
          this.goToPomodoro(settingsStore.state.timer.autoStartPomodoros);
          this.longBreak = settingsStore.state.timer.longBreak_npt * 60;
        }
      }, 1000);
    },

    // restart the timer default values
    restartTimer() {
      const settingsStore = useSettingsStore();
      this.pauseTimer = true;
      this.pomodoro = settingsStore.state.timer.pomodoro_npt * 60;
      this.longBreak = settingsStore.state.timer.longBreak_npt * 60;
      this.shortBreak = settingsStore.state.timer.shortBreak_npt * 60;
      this.isTimerCounting = false;
      setTimeout(() => (this.pauseTimer = false), 1000);
    },

    // pause the timer or resume it
    pauseOrResumeTimer() {
      if (!this.pauseTimer) {
        this.pauseTimer = true;
        return;
      }
      this.pauseTimer = false;
      this.needBreakConfirm(false);
    },

    goToPomodoro(autochange) {
      this.stopAllTimers();
      this.startingPomodoroTimer = true;
      if (autochange) setTimeout(() => this.startPomodoroTimer(), 900);
    },
    getAshortBreak(autochange) {
      this.stopAllTimers();
      this.startingShortBreakTimer = true;
      if (autochange) setTimeout(() => this.startShortBreakTimer(), 900);
    },
    getAlongBreak(autochange) {
      this.stopAllTimers();
      this.startingLongBreakTimer = true;
      if (autochange) setTimeout(() => this.startLongBreakTimer(), 900);
    },
    changeToAnewPhase() {
      this.needToChange = true;
    },
    changeAlarmSound(audioSrc) {
      audio_elem.src = audioSrc;
    },

    currentTimerValue() {
      if (this.startingPomodoroTimer) return this.getPomodoroCounter;
      if (this.startingShortBreakTimer) return this.getShortBreakCounter;
      return this.getLongBreakCounter;
    },

    //converts a long numbers (seconds) to a readable format (minutes & seconds)
    timerStringFormat(secondsFormat) {
      const min =
        parseInt(secondsFormat / 60) < 10
          ? `0${parseInt(secondsFormat / 60)}`
          : parseInt(secondsFormat / 60);
      const second =
        parseInt(secondsFormat % 60) < 10
          ? `0${parseInt(secondsFormat % 60)}`
          : parseInt(secondsFormat % 60);

      return `${min}:${second}`;
    },
    // the user confirms if he wants to skip the timer
    needBreakConfirm(confirm) {
      switch (this.timerWorkingIs) {
        case "pomodoro":
          if (confirm) this.pomodoro = 0;
          this.startPomodoroTimer();
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

    stopAllTimers() {
      this.startingPomodoroTimer =
        this.startingShortBreakTimer =
        this.startingLongBreakTimer =
        this.isTimerCounting =
          false;
    },
  },
});
