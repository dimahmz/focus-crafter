import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("/src/router/home.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("/src/router/signup.vue"),
    meta: {
      requiresAuth: false,
      noAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("/src/router/login.vue"),
    meta: {
      requiresAuth: false,
      noAuth: true,
    },
  },
  {
    path: "/me",
    name: "profile",
    component: () => import("/src/router/me.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("/src/router/about.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("/src/router/notfound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// !!!!!
router.beforeEach((to, from, next) => {
  const loggedIn = JSON.parse(sessionStorage.getItem("loggedIn"));
  if (to.meta.requiresAuth) {
    if (!loggedIn) {
      next({ name: "login" });
    } else next();
  } else if (to.meta.noAuth) {
    if (loggedIn) {
      next({ name: "profile" });
      console.log("must go to");
    } else next();
  } else next();
});
// if (!useUserStore().state.loggedIn) next({ name: "home" });
// else to.fullPath;});

export default router;

// Now the app has started!
