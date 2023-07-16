<template lang="pug">
section
  .profile-header profile page
  .loader-container(v-if="uploading")
    h1 loading...
    a-spin
  .m-2(v-else)
    .grid.place-items-center
      .w-32.h-28
        img.w-full.h-full.object-contain(:src="userInfos.imagePath" alt="profile image" ref="img") 
        //- (:src="userInfos.imagePath" alt="profile image" ref="img") 
    .flex.gap-3.justify-center.m-2
      p.upload-img(@click="uploadImg()") upload 
      input.hidden( type="file" ref="fileNpt" )
  .flex.gap-8
    h1.grid.place-items-center name
    input.m-4(v-model="userInfos.name")
    a-button(@click="user.changeUserName()") save
  .flex.gap-8
    h1.grid.place-items-center email
    input.m-4(ref="emailNpt" v-model="userInfos.email")
    a-button save
  nav
    button(@click="user.logOutUser()") log out
    RouterLink(:to="{ name : 'home' }" )
      button home
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import axios from "axios";
import { useRouter } from "vue-router";

const userInfos = useUserStore()._state;
const user = useUserStore();

const uploading = ref(false);
const fileNpt = ref("null");
const img = ref("null");

function uploadImg() {
  const token =
    localStorage.getItem("x-auth-token") ||
    sessionStorage.getItem("x-auth-token");
  fileNpt.value.click();
  fileNpt.value.onchange = () => {
    uploading.value = true;
    const file = fileNpt.value.files[0];
    img.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      const formData = new FormData();
      formData.append("profile", file);
      axios
        .put("/api/editUser/profile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        })
        .then(() => {
          img.value.src = e.target.result;
          useUserStore().imagePath = e.target.result;
        })
        .catch((e) => {
          if (e) return window.alert(e.response.data);
          window.alert("a server error, please try later!");
          uploading.value = false;
        });
    };

    reader.readAsDataURL(file);
    uploading.value = false;
  };
}

// const uint8ToBase64 = (arr) =>
// btoa(
//   Array(arr.length)
//   .fill('')
//   .map((_, i) => String.fromCharCode(arr[i]))
//   .join('')
//   );

// let  imgPath= ref(`data:image/jpeg;base64,${uint8ToBase64(user.img.image.data.data)}`);
</script>

<style scoped>
.profile-header {
  @apply mt-4 mb-10 text-center;
}
.ant-input {
  max-width: 240px;
  border: solid 1px #fff;
  @apply m-2;
}
.upload-img {
  @apply cursor-pointer;
}
.upload-img:hover {
  @apply underline;
}
.ant-input:hover {
  border: solid 1px #d9d9d9;
}
.ant-btn-primary {
  background-color: #1890ff;
}
.timerBtns {
  @apply mb-16;
}

nav {
  @apply p-3 flex gap-4;
}
</style>
