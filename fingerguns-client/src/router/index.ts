import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Docket from "@/views/Docket.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import { nextTick } from "vue";

const DEFAULT_TITLE = "Fingerguns 👉";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/dockets/:docketId",
    name: "docket",
    component: Docket,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  nextTick(() => {
    document.title = (to.meta.title as string) || DEFAULT_TITLE;
  });
  next();
});

export default router;
