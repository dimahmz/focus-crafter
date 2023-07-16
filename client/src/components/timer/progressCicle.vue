<template lang="pug">
section
  .circle-bg
    a-progress(type="circle" :percent="progress")
      template(#format="percent")
        .counter {{ counter }}
  </template>
<script setup>
import { useCounterStore } from "@/stores/timer";
import { watch, ref } from "vue";

const timerStore = useCounterStore();

const props = defineProps({
  counter: { type: String, required: true },
  timing: { type: Number, required: true },
  timerNpt: { type: Number, required: true },
});

const progress = ref(0);

watch(props, () => {
  progress.value = 100 - (props.timing / (props.timerNpt * 60)) * 100;
});
</script>

<style scoped>
* .circle-bg {
  @apply text-white;
}
.changeBtn {
  @apply text-white;
}
.roundedBtn {
  @apply cursor-pointer flex justify-center m-5;
}
.roundedBtn:hover {
  @apply transition-all ease-out scale-110;
}
.control-timer {
  @apply flex flex-col justify-center items-center cursor-pointer text-white;
}
.change-btns {
  @apply text-white flex justify-center items-center cursor-pointer space-x-4 m-4 px-1 py-2;
  background-color: #1890ff;
}
</style>
