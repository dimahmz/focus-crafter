<template lang="pug">
AppModal(modalStoreSet="showSettingsModal").pt-12.pb-8
  .bg-primary.p-8
    .flex.justify-between.mb-6
        h1 Settings
        span.cursor-pointer(@click='closeModal')
          Close      
    .flex.justify-between.space-x-3
      AppNpt(nptLabel="Pomodoro"   storeSet="promodoro_npt")
      AppNpt(nptLabel="Short break" storeSet="shortBreak_npt")
      AppNpt(nptLabel="Long break" storeSet="longBreak_npt")
    .px-4
      Line
      .flex-column.space-y-3      
        ChangeAset(
            label="Auto start Promodors"
            storeSet="autoStartPromodoros")
        ChangeAset(
            label="Auto start breaks"
            storeSet="autoStartBreaks")
        ChangeAset(
            label="Dark mode when running"
            storeSet="focusedMode")
      Line
      SetNpt(label="Rounds before long break")
        template(#aNpt)
          AppNpt(:nptValue="settingsStore.rounds"
          storeSet="rounds")
      Line
      .flex-column.space-y-4
        SetNpt(label="Alarm sound")
          template(#aNpt)
            AppSelectInput(@change="changeAlarmSound")
        SetNpt(label="Volume")
          template(#aNpt)
              AppRangeNpt(:nptValue="settingsStore.alarmVolume"
                storeSet="alarmVolume"
                @change="chnageAlarmVolume")
      .flex.justify-end.mt-12
        //- @click="saveSettings()"
        AppBtn(label="save") 
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
import { onMounted } from "vue";

const counterStore = useCounterStore();
const settingsStore = useSettingsStore();

let audio_elem;

onMounted(() => {
  audio_elem = document.createElement("audio");
  audio_elem.src = settingsStore.state.selectedAlarm;
  audio_elem.volume = settingsStore.state.alarmVolume / 100;
});

function chnageAlarmVolume() {
  audio_elem.volume = settingsStore.state.alarmVolume / 100;
  audio_elem.play();
}

function changeAlarmSound() {
  audio_elem.src = settingsStore.state.selectedAlarm;
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

function saveSettings() {
  // console.log("clicked to save bnt");
  settingsStore.showSettingsModal = false;
  settingsStore.saveToDataBase();
}
</script>
