import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/dashboard/dashboard.vue";
import Transfer from "../views/tranfer/transfer.vue";
import Transfer_ from "../views/tranfer/transfer_.vue";
import Withdrawal from "../views/withdrawal/withdrawal.vue";
import Members from "../views/registration/members.vue";
import Loan from "../views/loans/loans.vue";
import Setup from "../views/loanSetUp/setup.vue";
import Config from "../views/loanSetUp/config.vue";
import PriCon from "../views/loanSetUp/pry_con_setup.vue";
import Register from "../views/registration/register.vue";
import NewAccount from "../views/NewAccount.vue";
import Login from "../views/Login.vue";

import Employee from "../views/registration/employeeReg.vue";
import mEmployee from "../views/registration/viewEmployee.vue";

import Approvals from "../views/registration/approvals.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/transfer",
    name: "Transfer",
    component: Transfer
  },
  {
    path: "/transfer_",
    name: "Transfer_",
    component: Transfer_
  },
  {
    path: "/withdrawal",
    name: "withdrawal",
    component: Withdrawal
  },
  {
    path: "/members",
    name: "members",
    component: Members
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/employee",
    name: "employee",
    component: Employee
  },
  {
    path: "/view",
    name: "view",
    component: mEmployee
  },
  {
    path: "/setup",
    name: "setup",
    component: Setup
  },
  {
    path: "/config",
    name: "config",
    component: Config
  },{
    path: "/loan2",
    name: "loan2",
    component: PriCon
  },
  {
    path: "/approvals",
    name: "approvals",
    component: Approvals
  },
  {
    path: "/loan",
    name: "Loan",
    component: Loan
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/new-account",
    name: "NewAccount",
    component: NewAccount
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
