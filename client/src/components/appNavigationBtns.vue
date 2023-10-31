<template lang="pug">
.flex-center
  .icons-container(v-if="!timer.focusMode")
    Setting(@click='()=>settingsStore.showSettingsModal=true')
    Calendar(@click='()=>settingsStore.showTasksModal=true')
    router-link( :to="{ name: 'about' }")
      Info
    router-link(:to="userStore.state.loggedIn ? { name: 'profile' } : { name: 'login' }")
      Profile
</template>

<script setup>
import { UserOutlined } from "@ant-design/icons-vue";
import Setting from "./_icons/setting.vue";
import Info from "./_icons/info.vue";
import Home from "./_icons/home.vue";
import Calendar from "./_icons/calendar.vue";
import Profile from "./_icons/profile.vue";

import { useCounterStore } from "@/stores/timer";
import { useTasksStore } from "@/stores/tasks";
import { useSettingsStore } from "@/stores/settings";
import { useUserStore } from "@/stores/user";

const timer = useCounterStore();
const settingsStore = useSettingsStore();
const userStore = useUserStore();
</script>

<style scoped>
/* style the active route */
.router-link-active {
  /* @apply; */
}
.icons-container {
  @apply w-full max-w-xs flex justify-between items-center bg-app-secondary rounded-xl px-3 py-4;
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
