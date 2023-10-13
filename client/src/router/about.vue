<template lang="pug">
h1.my-8.text-center.font-seconadry.text-4xl.font-semibold About 
h1.title About Then ProPomodoro website : 
p.text Our web-app is designed to help you implement the Pomodoro Technique in your daily work routine. With our easy-to-use interface, you can set your work and break intervals and get started with your Pomodoro sessions in no time. Our app also comes with a timer that will alert you when it's time to take a break or start a new Pomodoro session, so you can stay on track and achieve your goals.
h1.title What Is the Pomodoro Technique?
p.text The Pomodoro Technique is a time management strategy developed by Francesco Cirillo in the late 1980s. The technique involves breaking work into 25-minute intervals, called "Pomodoros," separated by short breaks. After four Pomodoros, a longer break is taken. This technique helps individuals to focus on one task at a time and manage their time effectively.
h1.title Give us your feedback!
.flex-column.space-y-8.mx-12.max-w-sm.mb-8(class="sm:mx-auto")
  p.text Let us know how we can improve this app
  a-input(placeholder="your email")
  a-textarea(placeholder="Feedback..." :rows="5")
  .flex.justify-end
    AppBtn(label="send" @click="sendFeedback")
.h-16.bg-app-tertiary
</template>

<script setup>
import AppBtn from "../components/appBtns/appBtn.vue";
function sendFeedback() {
  console.log("sent feedback");
}
</script>

<style scoped>
.title {
  @apply text-center text-app-tertiary font-semibold text-xl my-8;
}
.text {
  @apply max-w-2xl mx-6 sm:mx-auto text-left text-lg  text-[#87898E];
}
</style>
