<template lang="pug">
header.max-w-4xl.w-full.bg-indigo-900.relative.h-40.mb-32
    .flex.justify-between.items-center.px-8.py-12
        span
            LeftArrow
        p Edit profile
        span
            RouterLink(:to="{ name : 'home' }" )
                Home
    .absolute.top-24.left-20
        .w-36.h-36.relative
            span.imgLoding(:class="{  hidden : !isUploadingImg }")
                Spinner(color="#eee")
            img.rounded-full.w-full.h-full.object-cover.cursor-pointer.border-gray-950.border-4.border-solid(:src="userInfos.imagePath" alt="profile image" ref="img" @click="() => user.state.popupImg=true") 
            input.hidden( type="file" ref="fileNpt" )
        .flex.items-center.gap-5.m-3
            p Change profile 
            .relative(ref="editProfileOptions")
                Dots.cursor-pointer(@click="() => displayEditOptions = !displayEditOptions")
                ul.w-24.h-16.bg-gray-100.cursor-pointer.absolute.left-3.buttom-0(v-if="displayEditOptions")
                    li(@click="uploadImg()") Change Image
                    li Delete Image 
            button(@click="user.logOutUser()") 
              SignOut 
</template>
<script setup>
import LeftArrow from "../_icons/arrow_left.vue";
import Dots from "../_icons/dots.vue";
import Home from "../_icons/home.vue";
import Spinner from "../../components/_loaders/spinner.vue";
import SignOut from "../../components/_icons/signout.vue";

import { onMounted, ref } from "vue";
import { useUserStore } from "../../stores/user";

const userInfos = useUserStore()._state;
const user = useUserStore();

const displayEditOptions = ref(false);
const editProfileOptions = ref(null);

// hide the the modification field when clicking outside
onMounted(() => {
  document.addEventListener("click", (e) => {
    // profile options
    if (
      displayEditOptions.value &&
      e.target.parentNode !== editProfileOptions.value
    )
      displayEditOptions.value = false;
  });
});

// related to uploading an image
const img = ref("null");
const fileNpt = ref("null");
const isUploadingImg = ref(false);

// upload the image
function uploadImg() {
  displayEditOptions.value = false;
  fileNpt.value.click();
  fileNpt.value.onchange = () => {
    const file = fileNpt.value.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      isUploadingImg.value = true;
      const formData = new FormData();
      formData.append("profile", file);
      img.value.src = user.state.imagePath = e.target.result;
      // change in the back-end
      const response = await user.changeUserProfile(formData);
      if (response.errorLevel == 0) return;
      // we an error occcured
      user.state.serverResponse = response;
      user.state.messageModal = true;
      img.value.src = userInfos.imagePath;
      user.state.imagePath = userInfos.imagePath;
    };
    // for better UX
    setTimeout(() => {
      isUploadingImg.value = false;
    }, 1000);

    reader.readAsDataURL(file);
  };
}
</script>
<style scoped>
.profile-header {
  @apply mt-4 mb-10 text-center;
}

.imgLoding {
  /*  flex-center top-0 -left-0 */
  @apply absolute top-0 -left-0 w-full h-full rounded-full;
  background-color: rgb(0, 0, 0, 0.4);
}
</style>
