<template>
  <div class="container">
    <div class="form">
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember"
              >Remember me</a-checkbox
            >
          </a-form-item>
          <a class="login-form-forgot" href="">Forgot password</a>
        </a-form-item>

        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            Log in
          </a-button>
          Or
          <router-link to="/signup">register now!</router-link>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import axios from "axios";

import { useSettingsStore } from "../stores/settings";
const settingsStore = useSettingsStore();

const formState = reactive({
  username: "diboy",
  password: "diboy1234",
  remember: true,
});

const router = useRouter();

const onFinish = (values) => {
  axios({
    method: "post",
    url: "/api/auth",
    data: {
      name: values.username,
      password: values.password,
    },
  })
    .then(async (res) => {
      const data = res.data;
      const token = data["x-auth-token"];
      if (formState.remember) {
        localStorage.setItem("x-auth-token", token);
      } else {
        sessionStorage.setItem("x-auth-token", token);
      }
      sessionStorage.setItem("loggedIn", true);
      useUserStore().syncAllTheStoresWithDB(data.user);
      router.push({ name: "home" });
    })
    .catch((err) => {
      const res = err?.response?.data;
      if (res) {
        window.alert(res.title + "\n" + res.text);
      } else window.alert("internal server Error!");
    });
};
const onFinishFailed = (errorInfo) => {
  // console.log("Failed:", errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
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
