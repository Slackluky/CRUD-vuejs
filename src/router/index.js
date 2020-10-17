import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("../components/Home.vue");
const Login = () => import("../components/Login.vue");
const Profile = () => import("../components/Profile.vue");
const Register = () => import("../components/Register.vue");
const PostDetail = () => import("../components/PostDetail.vue");
const Unauth = () => import("../components/Unauthorized.vue");
Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home, meta: { transitionName: "slide" } },
  { path: "/login", component: Login, meta: { transitionName: "fade" } },
  { path: "/register", component: Register, meta: { transitionName: "fade" } },
  { path: "/profile", component: Profile, meta: { transitionName: "slide" } },
  { path: "/unauth", component: Unauth, meta: { transitionName: "slide" } },
  {
    path: "/postdetail/:id",
    component: PostDetail,
    meta: { transitionName: "slide" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
