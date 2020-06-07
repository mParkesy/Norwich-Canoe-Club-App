import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Session from "../views/Session.vue";
import SessionList from "../views/SessionList.vue";
import Socials from "../views/Socials.vue";
import ClubGoal from "../views/ClubGoal.vue";
import Login from "../views/Login.vue";
import PaddleSpots from "../views/PaddleSpots.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/session/:id",
    name: "Session",
    component: Session,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/session-list",
    name: "Sessions",
    component: SessionList,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/socials",
    name: "Socials",
    component: Socials,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/paddle-spots",
    name: "PaddleSpots",
    component: PaddleSpots,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/club-goal",
    name: "Club Goal",
    component: ClubGoal,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {

  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('user') == null) {
        console.log("no user")
        return next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        })
    } else {
        // let user = JSON.parse(localStorage.getItem('user'))
        // next({ name: 'Home'})
        console.log("user")
        return next()
    }
  } else {
    console.log("doesnt require auth")
    return next()
  }
})

export default router;
