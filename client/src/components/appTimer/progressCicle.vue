<template>
  <div class="m-0 p-0 w-full relative progress-circle-container">
    <div class="w-full flex-center">
      <p
        class="text-4xl text-center flex-center tracking-[10px] md:text-6xl font-secondary p-1 font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <span class="w-full">
          {{ counter }}
        </span>
      </p>
    </div>
    <svg
      ref="svg"
      viewBox="-25 -25 250 250"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style="transform: rotate(-90deg)"
    >
      <circle
        ref="track_circle"
        r="90"
        cx="100"
        cy="100"
        fill="transparent"
        stroke-dasharray="565"
        stroke-dashoffset="0"
      ></circle>
      <circle
        ref="progress_circle"
        r="90"
        cx="100"
        cy="100"
        stroke-linecap="round"
        fill="transparent"
        stroke-dasharray="628"
        stroke-dashoffset="628"
      ></circle>
    </svg>
  </div>
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

const progress_circle = ref(null);

const track_circle = ref(null);

const svg = ref(null);

watch(props, () => {
  const raduis = +track_circle.value.getAttribute("r");

  progress.value = 100 - (props.timing / (props.timerNpt * 60)) * 100;

  const circumference = 2 * Math.PI * raduis;

  const offset = circumference * ((100 - progress.value) / 100);

  progress_circle.value.style.strokeDashoffset = offset;
  progress_circle.value.style.strokeDasharray = circumference;
});
</script>

<style scoped lang="scss">
.progress-circle-container {
  div {
    p {
      // @apply w-[280px] md:w-[210px];
    }
  }
}

svg {
  @apply w-[340px] md:w-[480px] h-[300px] md:h-[360px];
  & > circle {
    @apply stroke-[12px] md:stroke-[15px];
  }
  circle:first-child {
    @apply stroke-app-secondary;
  }
  circle:nth-child(2) {
    @apply stroke-app-tertiary;
  }
}
text {
  @apply text-black text-4xl font-bold;
}
</style>
