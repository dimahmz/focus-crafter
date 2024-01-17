<template lang="pug">
.flex.items-center.justify-center.w-screen.h-screen
  .flex-column.space-y-12.w-full
    .text-app-tertiary.text-2xl.text-center Loading ...
    div(class="w-1/2 mx-auto")
      v-progress-linear( :indeterminate="true")
</template>
<style lang="scss">
.v-progress-linear {
  .v-progress-linear__indeterminate {
    @apply bg-app-tertiary;
  }
}
</style>
