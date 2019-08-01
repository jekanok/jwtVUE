import Vue from "vue";
import Router from "vue-router";
import Index from "./views/index.vue";
import Reg from "./views/reg.vue";
import Home from "./views/Home.vue";
import Profile from "./views/profile.vue";
import axios from "axios";
Vue.use(Router);


const Vuerouter = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      name: "Index",
      component: Index,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/reg",
      name: "Reg",
      component: Reg,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: {
        requiresAuth: true,
        auth: true
      }
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
Vuerouter.beforeEach((to, from, next) => {
  const auth = to.matched.some(record => record.meta.requiresAuth)
  const access_token = localStorage.getItem('access_token')

  if (auth && access_token != null) {

    axios({
      url: 'http://localhost:3000/verify',
      method: 'GET',
      headers: {
        'authorization': access_token
      }
    }).then(response => {
      if (response.data.status == 'ok') {
        if (response.data.payload.ext > +new Date()) {
          next({
            path: '/',
            query: to.fullPath
          })
          localStorage.clear();
        } else {
          next()
        }
      } else {
        next({
          path: '/',
          query: to.fullPath
        })
      }
    })

  } else {
    next()
  }
  if (localStorage.getItem('access_token') != null && auth == false) {
    next({
      path: '/profile'
    })
  }
  next()

})
export default Vuerouter;