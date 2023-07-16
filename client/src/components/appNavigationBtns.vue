<template lang="pug">
nav.app-nav
  .icons-container(v-if="!timer.focusMode")
    router-link(:to="{name:'home'}")
      home-outlined
    setting-filled(@click='()=>settingsStore.showSettingsModal=true')
    align-left-outlined(@click='()=>settingsStore.showTasksModal=true')
    router-link( :to="{ name: 'about' }")
      question-circle-outlined
    router-link( v-if="userStore.state.loggedIn" :to="{ name: 'profile' }")
      user-outlined
    router-link( v-else :to="{ name: 'login' }")
      user-outlined      
</template>

<script setup>
import {
  SettingFilled,
  AlignLeftOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons-vue";

import { useCounterStore } from "@/stores/timer";
import { useTasksStore } from "@/stores/tasks";
import { useSettingsStore } from "@/stores/settings";
import { useUserStore } from "@/stores/user";

const timer = useCounterStore();
const tasksStore = useTasksStore();
const settingsStore = useSettingsStore();
const userStore = useUserStore();
</script>

<style scoped>
/* style the active route */
.router-link-active {
  @apply text-white;
}
.app-nav {
  @apply flex justify-center py-6 px-4 bg-pink mt-10;
}
.icons-container {
  @apply w-72 flex justify-between items-center;
}
.router-link {
  @apply p-0 m-0;
}
</style>
