<template lang="pug">
AppModal(modalStoreSet="showSettingsModal").pt-12.pb-8
  .bg-app-primary.p-8.max-w-lg.mx-auto.max-h-full.overflow-y-auto.rounded-lg
    .flex.justify-between.mb-10.mx-10.items-center
        h1.font-secondary.font-semibold.text-2xl Settings
        span.cursor-pointer(@click='closeModal')
          Close      
    .flex.justify-between.space-x-3
      AppNpt(nptLabel="Pomodoro"   storeSet="pomodoro_npt")
      AppNpt(nptLabel="Short break" storeSet="shortBreak_npt")
      AppNpt(nptLabel="Long break" storeSet="longBreak_npt")
    .px-4
      Line
      .flex-column.space-y-3      
        ChangeAset(
            label="Auto start Pomodors"
            storeSet="autoStartPomodoros")
        ChangeAset(
            label="Auto start breaks"
            storeSet="autoStartBreaks")
      Line
      SetNpt(label="Rounds before long break")
        template(#aNpt)
          AppNpt(:nptValue="settingsStore.state.timer.rounds"
          storeSet="rounds")
      Line
      .flex-column.space-y-4
        SetNpt(label="Alarm sound")
          template(#aNpt)
            AppSelectInput(@change="changeAlarmSound")
        SetNpt(label="Volume")
          template(#aNpt)
              AppRangeNpt(:nptValue="settingsStore.state.timer.alarmVolume"
                storeSet="alarmVolume"
                @change="chnageAlarmVolume")
      .flex.justify-end.mt-12
        v-btn(text="save" :loading="loadingBtn" @click="saveSettings()") 
</template>

<script setup>
import mHeader from "./modalHeader.vue";
import SetNpt from "./setNpt.vue";
import ChangeAset from "./changeAset.vue";
import AppNpt from "../appBtns/appNpt.vue";
import AppRangeNpt from "../appBtns/appRangeNpt.vue";
import AppSelectInput from "../appBtns/appSelectInput.vue";
import Line from "./line.vue";
import AppModal from "../appModal.vue";
import AppBtn from "../appBtns/appBtn.vue";
import Close from "../_icons/close.vue";

import { useSettingsStore } from "@/stores/settings";
import { useCounterStore } from "@/stores/timer";
import { onMounted, onUnmounted, ref } from "vue";

const counterStore = useCounterStore();
const settingsStore = useSettingsStore();

let audio_elem;
const loadingBtn = ref(false);

onMounted(() => {
  audio_elem = document.createElement("audio");
  audio_elem.src = settingsStore.state.timer.selectedAlarm;
  audio_elem.volume = settingsStore.state.timer.alarmVolume / 100;
  // remove scroll bahavoiour
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "auto";
}),
  function chnageAlarmVolume() {
    audio_elem.volume = settingsStore.state.timer.alarmVolume / 100;
    audio_elem.play();
  };

function changeAlarmSound() {
  audio_elem.src = settingsStore.state.timer.selectedAlarm;
  audio_elem.play();
}
counterStore.$subscribe(
  (mutaion, state) => {
    if (audio_elem.volume > 0 && state.startAlarm) {
      audio_elem.play();
      state.startAlarm = false;
    }
  },
  { detached: true }
);

function closeModal() {
  settingsStore.showSettingsModal = false;
}

async function saveSettings() {
  loadingBtn.value = true;
  await settingsStore.saveToDataBase();
  loadingBtn.value = false;
  settingsStore.showSettingsModal = false;
}
</script>
