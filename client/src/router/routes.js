import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";

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
    component: () => import("/src/router/SignUp/index.vue"),
    meta: {
      requiresAuth: false,
      ifNotAuthenticated: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("/src/router/Login/index.vue"),
    meta: {
      requiresAuth: false,
      ifNotAuthenticated: true,
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
    component: () => import("/src/router/About/index.vue"),
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

// routes protections
// export const routesProtection = router.beforeEach(async (to, from, next) => {
//   const user = useUserStore();

//   const isLoggedIn = user.state.loggedIn;

//   // redirect to login page when navigating into protected routes
//   if (to.meta.requiresAuth && !isLoggedIn) {
//     next({ name: "login" });
//   }
//   // protected pages that are accessible only for unauthenticated users
//   else if (to.meta.ifNotAuthenticated && isLoggedIn) {
//     next({ name: "home" });
//   } else {
//     next();
//   }
// });

export default router;
