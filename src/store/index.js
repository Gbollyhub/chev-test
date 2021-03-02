import Vue from "vue";
import Vuex from "vuex";

import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    member: {},
    memberId : ''
  },  
  actions: {
    login({commit}, user){
      return new Promise((resolve,reject) => {
        commit('auth_request')
        axios({url: `${process.env.VUE_APP_API_URL}/Users/login`, data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
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
          const member = response.data
          const memberId = response.data.success
          localStorage.setItem('memberId', memberId)
          console.log(member);    
          resolve(response)
        })
        .catch(err => {
              reject(err)
        });      
      })
    },
    
    // register({commit}, user){
    //   return new Promise((resolve, reject) => {
    //     commit('auth_request')
    //     axios({url: 'http://localhost:8080/new-account', data: user, method: 'POST' })
    //     .then(resp => {
    //       const token = resp.data.token
    //       const user = resp.data.user
    //       localStorage.setItem('token', token)
    //       axios.defaults.headers.common['Authorization'] = token
    //       commit('auth_success', token, user)
    //       resolve(resp)
    //     })
    //     .catch(err => {
    //       commit('auth_error', err)
    //       localStorage.removeItem('token')
    //       reject(err)
    //     })
    //   })
    // },
    
    logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
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
    setMember(state, member) {
      state.member =  member.data;
    },
    setShowAlert(state, value) {
      state.showAlert = value
    },

  },
  getters : {
    isLoggedIn: state => !!state.token,
    member: state => state.member,
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
