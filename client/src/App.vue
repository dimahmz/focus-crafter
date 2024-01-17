<template lang="pug">
LoadingPage(v-if="user.state.checkAuthLoading")
router-view(v-else)
</template>

<script setup>
import { onBeforeUnmount, onMounted, watch, inject } from "vue";
import { useCounterStore } from "@/stores/timer";
import Router from "@/router/routes";
import LoadingPage from "@/views/Others/loading.vue";
import { useUserStore } from "@/stores/user";

const user = useUserStore();

const timerStore = useCounterStore();

Router.beforeResolve(async (to, from, next) => {
  const isLoggedIn = user.state.loggedIn;
  // redirect to login page when navigating into protected routes
  if (to.meta.requiresAuth && !isLoggedIn) next({ name: "login" });
  // protected pages that are accessible only for unauthenticated users
  else if (to.meta.ifNotAuthenticated && isLoggedIn) next({ name: "home" });
  else next();
});

onMounted(() => {
  inject("syncStores");

  //add a listner to to catch the user confirmation before leaving the page
  window.addEventListener("beforeunload", confirmExit);
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", confirmExit);
});

const confirmExit = (event) => {
  // this funtion  knows the timer's state 😎
  timerStore.pauseOrResumeTimer();
  // just leave the page if the timer is not working or unstopped in a session
  if (!timerStore.isTimerCounting) return false;
  event.preventDefault();
  event.returnValue = "";
  timerStore.pauseOrResumeTimer();
};

// sync the web-app title with the timer
watch(timerStore, () => {
  if (timerStore.isTimerCounting)
    document.title = timerStore.getCurrentTimerValue;
});
</script>
