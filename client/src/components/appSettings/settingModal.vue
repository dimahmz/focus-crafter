<template lang="pug">
AppModal(modalStoreSet="showSettingsModal").pt-12.pb-8
  .bg-app-primary.p-8.max-w-lg.mx-auto.max-h-full.overflow-y-auto.rounded-lg
    .flex.justify-between.mb-10.mx-10.items-center
        h1.font-secondary.font-semibold.text-2xl {{content.settings_title}}
        span.close-modal-btn(@click='closeModal')
          v-icon(icon="mdi-close-circle")
    .flex.justify-between.space-x-3
      AppNpt(:nptLabel="content.pomodoro_label"   storeSet="pomodoro_npt")
      AppNpt(:nptLabel="content.short_break_label" storeSet="shortBreak_npt")
      AppNpt(:nptLabel="content.long_break_label" storeSet="longBreak_npt")
    .px-4
      Line
      .flex-column.space-y-3      
        ChangeAset(
            :label="content.auto_start_pomodoros_label"
            storeSet="autoStartPomodoros")
        ChangeAset(
            :label="content.auto_start_breaks_label"
            storeSet="autoStartBreaks")
      Line
      SetNpt(:label="content.rounds_before_long_break_label")
        template(#aNpt)
          AppNpt(:nptValue="settingsStore.state.timer.rounds"
          storeSet="rounds")
      Line
      .flex-column.space-y-4
        SetNpt(:label="content.alarm_sound_label")
          template(#aNpt)
            SelectAlaramSound(@change="changeAlarmSound")
        SetNpt(:label="content.volume_label")
          template(#aNpt)
              AppRangeNpt(:nptValue="settingsStore.state.timer.alarmVolume"
                storeSet="alarmVolume")
      .save-btn-container
        v-btn(:text="content.save_button_text" size="large"  :loading="loadingBtn" @click="saveSettings()") 
</template>

<script setup>
import mHeader from "./modalHeader.vue";
import SetNpt from "./setNpt.vue";
import ChangeAset from "./changeAset.vue";
import AppNpt from "../appBtns/appNpt.vue";
import AppRangeNpt from "../appBtns/appRangeNpt.vue";
import SelectAlaramSound from "../appBtns/selectAlarmNpt.vue";
import Line from "./line.vue";
import AppModal from "../appModal.vue";
import AppBtn from "../appBtns/appBtn.vue";
import settings from "@/content/settings.json"
import content from "@/content/settings.json";

import { useSettingsStore } from "@/stores/settings";
import { useCounterStore } from "@/stores/timer";
import { ref } from "vue";

const counterStore = useCounterStore();
const settingsStore = useSettingsStore();

const loadingBtn = ref(false);

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

<style lang="scss">
.close-modal-btn {
  @apply cursor-pointer p-0.5 bg-white rounded-full grid justify-items-center;
}
.save-btn-container {
  @apply flex justify-center mt-12;
  .v-btn {
    @apply px-8;
  }
}
</style>
