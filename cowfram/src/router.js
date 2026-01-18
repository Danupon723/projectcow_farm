import { createRouter,createWebHashHistory } from "vue-router";

import login from "./view/login.vue";
import register from "./view/register.vue";

import admindashbord from "./view/admin/dashbord.vue";

const routes = [
    {path:'/' ,name:"login" , component:login},
    {path:'/register' , name:"register" , component:register},

    {
        path:'/admin',
        component: admindashbord,

        children : [
            {path:'', redirect:'/admin/dashbord'},
            {path:'dashbord', component:dashbord},
            {path:'user' , component:user}
        ],
        meta:{requiresAuth : true}
        
    },
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

// router.beforeEach((to,from,next) =>{
//     const token = localStorage.getItem('token')

//     if(to.meta.requiresAuth && !token){
//         next('/')
//     }else{
//         next()
//     }
// })
export default router