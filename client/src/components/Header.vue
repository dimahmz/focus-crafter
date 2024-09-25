<template lang="pug">
header.w-full.text-center.flex-column
  .flex-center-between.mb-5
    router-link(:to="{name : 'home'}")
      v-icon(icon="mdi-home" size="x-large").text-app-tertiary
    div.img-container(class="mb-0 mt-0 flex justify-center")
      router-link(:to="{name : 'home'}")
        img.w-14.mt-0(src="/logo.png")
  div.flex-column.space-y-2
    h1(class="text-[#0c1A10]").text-2xl.font-semibold {{content.greetings}}
    p(class="text-[#595959]") {{content.message}} 
  h2.text-start.text-2xl.py-2.font-semibold.text-app-tertiary {{content.singin}} 
</template>

<style scoped>
.img-container {
  @apply flex justify-center mb-5 md:hidden;
}
</style>

<script setup>
import content from "@/content/pages/login.json"
</script>
