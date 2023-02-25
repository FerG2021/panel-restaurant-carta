import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      component: () => import("../views/login/index.vue"),
    },
    {
      path: "/",
      component: () => import("../views/home/index.vue"),
    },
    {
      path: "/productos",
      component: () => import("../views/products/index.vue"),
    },
    {
      path: "/categorias",
      component: () => import("../views/categories/index.vue"),
    },
    {
      path: "/resenias",
      component: () => import("../views/reviews/index.vue"),
    },
    {
      path: "/mesas",
      component: () => import("../views/tables/index.vue"),
    },
    {
      path: "/mi-cuenta",
      component: () => import("../views/miCuenta/index.vue"),
    },
  ],
});

export default router;
