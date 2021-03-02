import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
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
import Cash_addition from "../views/cash/cashAddition.vue";
import Dec_Inc from "../views/cash/decrease_increase.vue";
import Register1 from "../views/registration/reg.vue";
import NewAccount from "../views/NewAccount.vue";
import Payment from "../views/payment.vue";
import Login from "../views/Login.vue";

import Confirmation from "../views/confirmation.vue";

import Employee from "../views/registration/employeeReg.vue";
import mEmployee from "../views/registration/viewEmployee.vue";
import mApproval from "../views/registration/view_approval.vue";

import Approvals from "../views/registration/approvals.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/confirmation",
    name: "Confirmation",
    component: Confirmation
  },
  {
    path: "/portal",
    name: "Dashboard",
    component: Dashboard,    
    // meta: {requiresAuth: true},
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
    path: "/cash_addition",
    name: "cash_addition",
    beforeEnter : guardMyroute,
    component: Cash_addition
  },
  {
    path: "/decrease_increase",
    name: "decrease_increase",
    component: Dec_Inc
  },
  {
    path: "/members",
    name: "members",
    beforeEnter : guardMyroute,
    component: Members
  },
  {    
    path: "/register",
    name: "register",
    beforeEnter : guardRegRoute,
    component: Register,
    // meta: { guest: true },
  },
  {
    path: "/reg",
    name: "reg",
    component: Register1
  },
  {
    path: "/employee",
    name: "employee",
    beforeEnter : guardMyroute,
    component: Employee,
  },
  {
    path: "/view",
    name: "view",
    component: mEmployee,
  },
  {
    path: "/view_approval",
    name: "viewApproval",
    beforeEnter : guardMyroute,
    component: mApproval,
  },
  {
    path: "/setup",
    name: "setup",
    component: Setup,
  },
  {
    path: "/config",
    name: "config",
    component: Config,
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
    beforeEnter : guardMyroute,
    component: Loan
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    // meta: { guest: true },
  },
  {
    path: "/new-account",
    name: "NewAccount",
    component: NewAccount
  },
  {
    path: "/payment",
    name: "payment",
    beforeEnter : guardMyroute,
    component: Payment
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

function guardMyroute(to, from, next) {
  var isLoggedIn = false;
  if (localStorage.getItem('token')) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }
  if (isLoggedIn) {
    next(); // allow to enter route
  } else {
    next('/login'); // go to '/login';
  }
}

function guardRegRoute(to, from, next) {
  var isLoggedIn = true;
  if (localStorage.getItem('token')) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }
  if (isLoggedIn) {
    next('/portal'); // allow to enter route
  } else {
    next('/login'); // go to '/login';
  }
}

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (this.$store.getters.isLoggedIn) {
//       next();
//       return;
//     }
//     next("/login");
//   } else {
//     next();
//   }
// });

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.guest)) {
//     if (this.$store.getters.isLoggedIn) {
//       next("/register");
//       return;
//     }
//     next();
//   } else {
//     next();
//   }
// });

export default router;
