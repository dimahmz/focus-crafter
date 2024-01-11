<template lang="pug">
Next(@click='openConfirm' colors_classes='fill-app-tertiary')
v-dialog(width='500' v-model='open')
  v-card
    v-alert(type='info' title='Confirm Change' text='Are you sure you want to change the timer' variant='tonal')
      .w-full.flex.justify-end.space-x-8.pt-5
        v-btn.close-btn(color="black" text='Close' variant="tonal" @click='cancelChange')
        v-btn.confirm-btn(text='confirm' variant="tonal" @click='confirmChange')
</template>

<script setup>
import { ref } from "vue";
import { useCounterStore } from "@/stores/timer";
import Next from "../_icons/next.vue";

const timerStore = useCounterStore();
const open = ref(false);

function openConfirm() {
  console.log("change");
  open.value = true;
  timerStore.changeToAnewPhase();
}
function cancelChange() {
  timerStore.needBreakConfirm(false);
  open.value = false;
}

function confirmChange() {
  timerStore.needBreakConfirm(true);
  open.value = false;
}
</script>
<style scoped>
.v-alert {
  @apply text-black;
}
.close-btn {
  /* @apply bg-app-tertiary text-white; */
}
.confirm-btn {
  @apply bg-app-tertiary text-white;
}
</style>
