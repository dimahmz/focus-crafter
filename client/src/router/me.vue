<template lang="pug">
div.flex-center
  section.max-w-4xl.w-full(class="sm:px-7 sm:py-5")
    ProfileHeader
    p.text-center.mt-40.mb-5 About you
    .flex-center
      .max-w-xl.w-full.border-2.border-gray-400.rounded.px-3.py-5.mx-10
        div(ref="modifyNameSection")      
          label User name 
          br
          div(v-if="wantsModifyName" )
            input.w-60.px-2.py-1.border-2.border-black(v-model="userInfos.name")
            .flex.justify-end.gap-3
              .w-8.h-8.bg-slate-100.flex-center(@click="closeNameChangeNpt")
                Close
              .w-8.h-8.bg-slate-100.flex-center(@click="changeUserName")
                Check
          p(v-else class="hover:bg-slate-300" @click="displayNameNpt").p-3.cursor-text {{ userInfos.name  }}
        label Email Address
        br
        input.m-4.cursor-not-allowed(ref="emailNpt" v-model="userInfos.email" readonly title="you can't change this email")
        br
        label Password
        br
        input.m-4(ref="emailNpt" value="*****************" @click='()=> user.state.resetPassModal=true')
footer.bg-indigo-900.w-full.h-10.mb-4
//- Modals
.modal-background(v-if="user.state.resetPassModal" @click.self='()=>{ user.state.resetPassModal=false; hideOverFlow();}')
  PasswordModal
.modal-background(v-if="user.state.messageModal" @click.self='()=> {user.state.messageModal=false; hideOverFlow()}')
  MsgModal
.modal-background(v-if="user.state.popupImg" @click.self='()=> {user.state.popupImg=false; hideOverFlow()}')
  img.w-full.max-w-xs.max-h-96(:src="user.state.imagePath" alt="profile image")
</template>

<script setup>
import PasswordModal from "../components/profile/passwordModal.vue";
import MsgModal from "../components/profile/msgModal.vue";

import LeftArrow from "../components/_icons/arrow_left.vue";
import Home from "../components/_icons/home.vue";
import Close from "../components/_icons/close.vue";
import Check from "../components/_icons/check.vue";
import ProfileHeader from "../components/profile/header.vue";

import { ref } from "vue";
import { useUserStore } from "../stores/user";

const userInfos = useUserStore()._state;
const user = useUserStore();

function hideOverFlow() {
  document.body.style.overflow = "auto";
}
// for the nname
const modifyNameSection = ref(null);
const wantsModifyName = ref(false);

// change the user name
function displayNameNpt() {
  wantsModifyName.value = true;
}
function closeNameChangeNpt() {
  userInfos.name = user.state.name;
  wantsModifyName.value = false;
}

async function changeUserName() {
  if (userInfos.name == user.state.name) {
    wantsModifyName.value = false;
    return;
  }
  const resp = await user.changeUserName();
  user.state.serverResponse = resp;
  if (resp.errorLevel > 0) {
    user.state.messageModal = true;
    return;
  }
  wantsModifyName.value = false;
}
</script>

<style scoped>
.profile-header {
  @apply mt-4 mb-10 text-center;
}
.upload-img {
  @apply cursor-pointer;
}
.upload-img:hover {
  @apply underline;
}
.timerBtns {
  @apply mb-16;
}
.modal-background {
  @apply absolute-full-creen flex-center z-20 backdrop-blur;
}

nav {
  @apply p-3 flex gap-4;
}
</style>
