<template lang="pug">
header.w-full.text-center.flex-column
  div.img(class="flex justify-center md:flex md:justify-end")
    router-link(:to="{name : 'home'}")
      img.w-16(src="/logo.png")
  div.flex-column.space-y-3
    h1(class="text-[#0c1A10]").text-3xl.font-semibold Good Afternoon
    p(class="text-[#595959]") Focus on being productive instead of busy.
  h2.text-start.text-3xl.py-3.font-semibold.text-app-tertiary Sing In
</template>

<style scoped>
.img {
  @apply flex justify-center mb-8 md:flex md:!justify-end md:mb-4;
}
</style>
