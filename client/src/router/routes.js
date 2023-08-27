import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";
import Cookies from "../utils/appCookies";
import { inject } from "vue";
import syncStores from "../plugins/syncStores";

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
      ifNotAuthenticated: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("/src/router/login.vue"),
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

// routes protections
router.beforeEach(async (to, from, next) => {
  const user = useUserStore();

  // in case the user enter directly to a protected route from the browser
  if (!user.state.loggedIn && Cookies.getCookie("x_auth_token")) {
    await syncStores();
    next();
  }
  // redirect to login page when navigating into protected routes
  if (to.meta.requiresAuth && !useUserStore().state.loggedIn)
    next({ name: "login" });
  // protected pages that are accessible only for unauthenticated users
  if (to.meta.ifNotAuthenticated && useUserStore().state.loggedIn)
    next({ name: "home" });

  next();
});

export default router;

// Now the app has started!
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require("./Loading.vue").default,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require("./Timeout.vue").default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  });

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children);
    },
  });
}
