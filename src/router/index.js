import Vue from "vue";
import VueRouter from "vue-router";
import Tester from "../views/Tester.vue";

Vue.use(VueRouter);

const route = [
  {
    path: "/tester",
    name: "Tester",
    component: Tester,
  },
];

var router = new VueRouter({
  mode: "history",
  route,
});

export default router;
