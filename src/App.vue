<template lang="pug">
AppHeader.header
TimerBtns.timerBtns
Footerbtns.footerbtns
WarningModel
.hidden
  Settings
</template>

<script setup>
import WarningModel from "./components/timer/warningModel.vue";
import TimerBtns from "./components/timer/timerBtns.vue";
import AppHeader from "./components/timer/appHeader.vue";
import Footerbtns from "./components/timer/footerbtns.vue";
import Settings from "./components/appSettings/settingModel.vue";
</script>

<style scoped>
.header {
  @apply mt-4 mb-10;
}
.timerBtns {
  @apply mb-16;
}
</style>
