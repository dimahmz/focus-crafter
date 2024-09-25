<template lang="pug">
.btn-container.btn-box.bg-app-tertiary.bg-app-quaternary.cursor-pointer(@click='openConfirm')
  Next(colors_classes='fill-app-tertiary')
v-dialog(width='500' v-model='open')
  v-card
    v-alert(type='info' :title="content.confirm_change" :text="content.are_you_sure" variant='tonal')
      .w-full.flex.justify-end.space-x-8.pt-5
        v-btn.close-btn(color="black" text='Close' variant="tonal" @click='cancelChange')
        v-btn.confirm-btn(text='confirm' variant="tonal" @click='confirmChange')
</template>

<script setup>
import { ref } from "vue";
import { useCounterStore } from "@/stores/timer";
import Next from "../_icons/next.vue";
import content from "@/content/labels.json"

const timerStore = useCounterStore();
const open = ref(false);

function openConfirm() {
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
.btn-box {
  @apply rounded-xl p-3 sm:p-4 cursor-pointer;
}

.confirm-btn {
  @apply bg-app-tertiary text-white;
}
.btn-container {
  @apply relative z-40;
}
</style>
