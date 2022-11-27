<template lang="pug">
.btn-container
  setting-filled(@click='()=>settingsStore.showSettingsModal=true')
  align-left-outlined(@click='()=>settingsStore.showTasksModal=true')
</template>

<script setup>
import {  SettingFilled , AlignLeftOutlined } from "@ant-design/icons-vue";
import { useCounterStore } from "@/stores/timer";
import { useSettingsStore } from "@/stores/settings";
const settingsStore = useSettingsStore();
const store = useCounterStore();
</script>

<style scoped>
.btn-container {
  @apply flex justify-center w-40 space-x-3 mx-auto;
}
</style>
