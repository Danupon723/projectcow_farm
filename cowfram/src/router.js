import { createRouter, createWebHashHistory } from "vue-router";

import Login from "./view/login.vue";
import Register from "./view/register.vue";

import Layout from "./view/admin/layoute.vue";
import AdminDashboard from "./view/admin/dashbord.vue";

const routes = [
  { path: "/",name: "login", component: Login},
  {path: "/register",name: "register",component: Register },


  { path: "/admin",
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      { path: "", redirect: "/admin/dashboard" },
      { path: "dashboard",  name: "admin-dashboard",  component: AdminDashboard}
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// Guard
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("token");

//   if (to.meta.requiresAuth && !token) {
//     next("/");
//   } else {
//     next();
//   }
// });

export default router;
