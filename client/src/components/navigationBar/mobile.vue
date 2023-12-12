<template lang="pug">
.fixed.bottom-0.w-full.px-4
  .icons-container(v-if="!timer.focusMode")
    v-icon(icon="mdi-cog" @click='()=>settingsStore.showSettingsModal=true')
    v-icon(icon="mdi-calendar-check" @click='()=>settingsStore.showTasksModal=true')
    router-link( :to="{ name: 'about' }")
      v-icon(icon="mdi-information")
    router-link(:to="userStore.state.loggedIn ? { name: 'profile' } : { name: 'login' }")
      v-icon(icon="mdi-account")
</template>

<script setup>
import { UserOutlined } from "@ant-design/icons-vue";

import { useCounterStore } from "@/stores/timer";
import { useTasksStore } from "@/stores/tasks";
import { useSettingsStore } from "@/stores/settings";
import { useUserStore } from "@/stores/user";

const timer = useCounterStore();
const settingsStore = useSettingsStore();
const userStore = useUserStore();
</script>

<style lang="scss" scoped>
.icons-container {
  @apply w-full max-w-xs mx-auto flex justify-between items-center bg-app-secondary rounded-t-3xl py-4 px-6;
  @apply md:flex-column;
}
.icons-container svg {
  @apply stroke-app-tertiary fill-black;
}

.icons-container * {
  @apply cursor-pointer;
}
.router-link {
  @apply p-0 m-0;
}
</style>
