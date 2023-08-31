import { defineStore } from "pinia";

//setting store
import { useSettingsStore } from "./settings";
import { useTasksStore } from "./tasks";

export const useCounterStore = defineStore(
  "counter",

  {
    state: () => {
      return {
        pauseTimer: false,
        needToChange: false,
        startAlarm: false,
        timerWorkingIs: "promodro",
        //
        confirmChange: false,
        isTimerCounting: false,
        //
        confirmChange: false,
        //
        startingPromodoroTimer: true,
        promodoro: 25 * 60,
        finishedPromodoros: 0,
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
      getPromodoroCounter() {
        return this.timerStringFormat(this.promodoro);
      },
      getShortBreakCounter() {
        return this.timerStringFormat(this.shortBreak);
      },
      getLongBreakCounter() {
        return this.timerStringFormat(this.longBreak);
      },
      getCurrentTimerValue() {
        if (this.startingPromodoroTimer)
          return `Focus time- ${this.getPromodoroCounter}`;
        if (this.startingShortBreakTimer)
          return `Break time- ${this.getShortBreakCounter}`;
        return `Break time- ${this.getLongBreakCounter}`;
      },
    },
    actions: {
      startPromodoroTimer() {
        const settingsstore = useSettingsStore();
        const TasksStore = useTasksStore();
        if (settingsstore.state.focusMode) this.focusMode = true;
        this.isTimerCounting = this.startingPromodoroTimer = true;
        this.timerWorkingIs = "promodoro";
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

          this.promodoro--;

          // notify the user in the last n minutes
          if (
            settingsstore.state.allowNotification &&
            this.promodoro === settingsstore.state.notifyTime * 60
          )
            this.TimerNotifiesUser(settingsstore.notifyTime);

          // start the alart
          if (this.promodoro == 2) this.startAlarm = true;

          // update finished promodoros
          if (this.promodoro <= 0 || !this.startingPromodoroTimer) {
            this.finishedPromodoros++;
            settingsstore.state.finishedPomodoros++;
            TasksStore.updateSelectedTask();

            // decide which break the timer should invoke
            // the number of rounds is configured in the settings
            settingsstore.isRoundsCompleted
              ? this.getAlongBreak(settingsstore.state.autoStartBreaks)
              : this.getAshortBreak(settingsstore.state.autoStartBreaks);

            // clear interval and get back to the initial values
            clearInterval(intervalID);
            this.focusMode = false;
            this.promodoro = settingsstore.state.promodoro_npt * 60;
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
            this.goToPromodoro(settingsStore.state.autoStartPromodoros);
            this.shortBreak = settingsStore.state.shortBreak_npt * 60;
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
            this.goToPromodoro(settingsStore.state.autoStartPromodoros);
            this.longBreak = settingsStore.state.longBreak_npt * 60;
          }
        }, 1000);
      },

      // restart the timer default values
      restartTimer() {
        const settingsStore = useSettingsStore();
        this.pauseTimer = true;
        this.promodoro = settingsStore.state.promodoro_npt * 60;
        this.longBreak = settingsStore.state.longBreak_npt * 60;
        this.shortBreak = settingsStore.state.shortBreak_npt * 60;
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

      goToPromodoro(autochange) {
        this.stopAllTimers();
        this.startingPromodoroTimer = true;
        if (autochange) setTimeout(() => this.startPromodoroTimer(), 900);
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
        if (this.startingPromodoroTimer) return this.getPromodoroCounter;
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

      // notify the user in the last n minutes
      TimerNotifiesUser(time) {
        console.log(`you will finish this session within ${time}`);
        if (!("Notification" in window)) {
          alert("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
          console.log("notified");
          const notification = new Notification(
            `promodoro will be finished within ${time}`
          );
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              const notification = new Notification(
                `promodoro will be finished within ${time}`
              );
              console.log("notified");
            }
          });
        }
      },

      // the user confirms if he wants to skip the timer
      needBreakConfirm(confirm) {
        switch (this.timerWorkingIs) {
          case "promodoro":
            if (confirm) this.promodoro = 0;
            this.startPromodoroTimer();
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
        this.startingPromodoroTimer =
          this.startingShortBreakTimer =
          this.startingLongBreakTimer =
          this.isTimerCounting =
            false;
      },
    },
  }
);
