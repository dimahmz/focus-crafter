<template lang="pug">
.flex-center
  .max-w-2xl.px-8
    .my-10.flex-center.relative
      router-link.cursor-pointer(:to="{name : 'home'}" class="z-[100]")
        img.w-20(src="/logo.png")
      .absolute.inset-0.h-full.flex.items-center
        v-btn(:ripple="false" variant="tonal" @click="goBack")
          v-icon(icon="mdi-arrow-left" start)
          | back
    h1.title About Then Focus Crafter website : 
    p.text Our web-app is designed to help you implement the Pomodoro Technique in your daily work routine. With our easy-to-use interface, you can set your work and break intervals and get started with your Pomodoro sessions in no time. Our app also comes with a timer that will alert you when it's time to take a break or start a new Pomodoro session, so you can stay on track and achieve your goals.
    h1.title What Is the Pomodoro Technique?
    p.text The Pomodoro Technique is a time management strategy developed by Francesco Cirillo in the late 1980s. The technique involves breaking work into 25-minute intervals, called "Pomodoros," separated by short breaks. After four Pomodoros, a longer break is taken. This technique helps individuals to focus on one task at a time and manage their time effectively.
    FeedBackSection
AboutFooter
.h-16.bg-app-tertiary
</template>

<script setup>
import { useRouter } from "vue-router";
import AboutFooter from "./AboutFooter.vue";
import FeedBackSection from "./FeedBackSection.vue";

const router = useRouter();

function goBack() {
  router.go(-1);
}
</script>

<style scoped>
.title {
  @apply text-center text-app-tertiary font-semibold text-xl my-8;
}
.text {
  @apply mx-6 sm:mx-auto text-left text-lg  text-[#87898E];
}
</style>
