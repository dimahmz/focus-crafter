<template lang="pug">
.flex-center
  .max-w-2xl.px-8
    .my-10.flex-center.relative
      router-link.cursor-pointer(:to="{name : 'home'}" class="z-[100]")
        img.w-20(src="/logo.png")
      .absolute.inset-0.h-full.flex.items-center
        v-btn(:ripple="false" variant="tonal" @click="goBack")
          v-icon(icon="mdi-arrow-left" start)
          | {{content.back}}
    h1.title {{content.title}}
    p.text {{content.about_the_website}}
    h1.title {{content.what_is_the_pomodoro}}
    p.text {{content.pomodoro_definition}}
    FeedBackSection
AboutFooter
.h-16.bg-app-tertiary
</template>

<script setup>
import { useRouter } from "vue-router";
import AboutFooter from "./AboutFooter.vue";
import FeedBackSection from "./FeedBackSection.vue";
import content from "@/content/pages/about.json";

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
