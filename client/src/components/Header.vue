<template lang="pug">
header.w-full.text-center.flex-column
  div.img(class="mb-0 mt-0 flex justify-center md:flex md:justify-end")
    router-link(:to="{name : 'home'}")
      img.w-14.mt-0(src="/logo.png")
  div.flex-column.space-y-2
    h1(class="text-[#0c1A10]").text-2xl.font-semibold Good Afternoon
    p(class="text-[#595959]") Focus on being productive instead of busy.
  h2.text-start.text-2xl.py-2.font-semibold.text-app-tertiary Sing In
</template>

<style scoped>
.img {
  @apply flex justify-center mb-6 md:flex md:!justify-end md:mb-3;
}
</style>
