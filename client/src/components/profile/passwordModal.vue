<template lang="pug">
section.modal-wrapper
  h1 Changing Password
  div
    label.block(for="oldPassword") Enter old password
    input(name="oldPassword" type="password" v-model="resetPassword.oldPass" required)
    p(v-if="resetPassword.oldPassError").text-red-500 {{resetPassword.oldPassError }}
  div
    label.block(for="newPassword") Enter new password
    input(name="newPassword" type="password" v-model="resetPassword.newPass" required)
    p(v-if="resetPassword.newPassError").text-red-500 {{ resetPassword.newPassError }}
  div
    label.block(for="password") Confirm password
    input(name="password" type="password" v-model="resetPassword.newPassConfirm" required)
    p(v-if="resetPassword.newPassConfirmError").text-red-500 {{ resetPassword.newPassConfirmError }}
  .flex-center
    Spinner.w-10.h-10(v-if="waitingResponse"  color="#fff")
    button(v-else @click="setAnewPassword") Confirm
</template>

<script setup>
import { reactive, ref } from "vue";
import { useUserStore } from "../../stores/user";

import Spinner from "../_loaders/spinner.vue";
const waitingResponse = ref(false);

document.body.style.overflow = "hidden";

const user = useUserStore();
const resetPassword = reactive({
  oldPass: "",
  newPass: "",
  newPassConfirm: "",
  oldPassError: "",
  newPassError: "",
  newPassConfirmError: "",
});

async function setAnewPassword() {
  resetPassword.oldPassError =
    resetPassword.newPassError =
    resetPassword.newPassConfirmError =
      "";

  // empty imputs
  if (resetPassword.oldPass.length < 8) {
    resetPassword.oldPassError = "Minimum 8 characters";
    return;
  }
  if (resetPassword.newPass.length < 8) {
    resetPassword.newPassError = "Minimum 8 characters";
    return;
  }
  if (resetPassword.newPassConfirm.length < 8) {
    resetPassword.newPassConfirmError = "Minimum 8 characters";
    return;
  }

  // unequal passwords
  if (resetPassword.newPassConfirm != resetPassword.newPass) {
    resetPassword.newPassConfirmError = "incorrect confirm password ";
    return;
  }

  waitingResponse.value = true;
  const response = await user.changePassword(
    resetPassword.oldPass,
    resetPassword.newPass
  );
  setTimeout(() => {
    waitingResponse.value = false;
    user.state.serverResponse = response;
    user.state.messageModal = true;
    document.body.style.overflow = "auto";
  }, 1000);
}
</script>

<style scoped>
.modal-wrapper {
  @apply w-full max-w-md rounded-sm px-4 py-2 bg-slate-200;
}
</style>
