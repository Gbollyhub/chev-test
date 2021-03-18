import Vue from "vue";
import Vuex from "vuex";

import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    empNum: '',
    email: '',
    user : {},
    member: {},
    memberId : '',
    Allmember:{},
    memberNum:{}
  },  
  actions: {
    login({commit}, user){
      return new Promise((resolve,reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_API_URL}/Users/login`, data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          const userType = resp.data.userType
          localStorage.setItem('token', token)
          localStorage.setItem('userType', userType)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
        
      })
    },

    memberDetails(){
      return new Promise((resolve, reject) => {
        axios({url: `${process.env.VUE_APP_API_URL}/Members/Usertype`, method: 'GET'})
        .then(response => {         
          // const member = response.data JSON.parse(localStorage.getItem("LoanPlan"));
          const member = response.data
          const memberId = response.data.id
          localStorage.setItem('memberId', memberId)
          this.commit('setMember', member, memberId)
          console.log(memberId);    
          resolve(response)
        })
        .catch(err => {
              reject(err)
        });      
      })
    },

    getAllMembers(){
      return new Promise((resolve, reject) => {
        axios({url: `${process.env.VUE_APP_API_URL}/Members/All`, method: 'GET'})
        .then(response => {
          const Allmember = response.data
          const memberNum = response.data.data.employeeNumber
          this.commit('AllMembers', Allmember,memberNum)  
          resolve(response)
        })
        .catch(err => {
              reject(err)
        });      
      })
    },
    
    createAccout({commit}, Newuser){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_API_URL}/Users/Register`, data: Newuser, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const memType = resp.data.userType
          const empNum = resp.data.userName
          const email = resp.data.email
          localStorage.setItem('token', token)
          localStorage.setItem('memType', memType)
          localStorage.setItem('empNum', empNum)
          localStorage.setItem('email', email)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, empNum,email,memType)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          localStorage.removeItem('memType')
          localStorage.removeItem('empNum')
          localStorage.removeItem('email')
          reject(err)
        })
      })
    },
    
    logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')        
        localStorage.removeItem('memType')
        localStorage.removeItem('empNum')
        localStorage.removeItem('email')
        localStorage.removeItem('memberId')
        localStorage.removeItem('LoanPlan')
        localStorage.removeItem('userType')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },

    getLoanApplication(Id) {
      return new Promise((resolve, reject) => {
        axios({url: `${process.env.VUE_APP_API_URL}/Loans/${Id}`, method: 'GET'})
        .them(response => {
          this.commit("AppLoanId", response.data)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    },

    states(){
      return new Promise((resolve, reject) => {
        axios({url: `${process.env.VUE_APP_API_URL}/States/All`, method: 'GET'})
        .then(response => {         
          const state = response.data
          console.log(state);    
          resolve(response)
        })
        .catch(err => {
              reject(err)
        });      
      })
    },
  },

  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
    setMember(state, member, memberId) {
      state.member =  member;
      state.memberId =  memberId;
    },
    AllMembers(state, Allmember, memberNum) {
      state.Allmember =  Allmember.data;
      state.memberNum =  memberNum.data;
    },
    AppLoanId(state, appLoan){
      state.appLoan = appLoan.data
    },
    setShowAlert(state, value) {
      state.showAlert = value
    },

  },
  getters : {
    isLoggedIn: state => !!state.token,
    member: state => state.memberId,
    authStatus: state => state.status,
    variant: state => state.variant,
    message: state => state.message,
    showAlert: state => state.showAlert

  }, 

});

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// });
