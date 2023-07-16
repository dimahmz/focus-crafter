<template>
  <div class="container">
    <div class="form">
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
      >
        <!-- @finishFailed="onFinishFailed" -->
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username"> </a-input>
        </a-form-item>

        <a-form-item name="email" label="Email" :rules="[{ type: 'email' }]">
          <a-input v-model:value="formState.email" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password">
          </a-input-password>
        </a-form-item>

        <a-form-item
          label="Confirm"
          name="checkPass"
          :rules="[{ required: true, message: 'Please confirm password!' }]"
        >
          <a-input v-model:value="formState.checkPass" type="password" />
        </a-form-item>
        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            sign up
          </a-button>
          Or
          <router-link to="/login">login?</router-link>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const formState = reactive({
  username: "",
  email: "@.gmail.com",
  password: "123",
  checkPass: "123",
});
const router = useRouter();

const onFinish = (values) => {
  axios({
    method: "post",
    url: "/api/signup",
    data: {
      name: formState.username,
      email: formState.email,
      password: formState.password,
      repeat_password: formState.checkPass,
    },
  })
    .then((res) => {
      router.push({ name: "login" });
    })
    .catch((err) => {
      if (err) return window.alert(err.response.data);
      window.alert("a server error occurred please try later");
    });
};

const disabled = computed(() => {
  return false;
  //   return !(
  //     formState.username &&
  //     formState.password &&
  //     formState.email &&
  //     formState.checkPass
  //   );
});
</script>
<style scoped>
.container {
  @apply h-screen grid place-items-center;
}
.form {
  max-width: 800px;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
