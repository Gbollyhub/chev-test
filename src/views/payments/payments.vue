<template>
    <div class="app-admin-section">
        <div class="app-admin-col-1">
            <Leftbar/>
        </div>
    <div class="app-admin-col-2">
    <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <div @click="goBack" class="settings-icon"></div>
          <!-- <div v-if="userType== 3 && memberLogin.department.description == 'ACCOUNTS'" > -->
             <div @click = "switchView('Payments')" class="admin-top-barlinks" :class="[currentTab == 1 ? currentClass : '']">Payments</div>
          <!-- </div> -->
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{new Date().toLocaleString() | humanize}}</div>
        </div>
      </div>        
    <div v-show="Payments">
        <Payments/>       
    </div>            
    </div>
    <div class="app-admin-col-3">
        <Rightbar />
    </div>
</div>
</template>


<script>
import Leftbar from '../../components/leftbar/leftbar'
import Rightbar from '../../components/rightbar/rightbar'
import Payments from './memberPayments.vue'

export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
    Payments
  },
  data(){
      return{        
        selectedTab: '',
        Payments:true,
        currentTab: 1,
        currentClass: 'admin-active-top-link',
        userType: localStorage.getItem('userType')
      }
  },
computed: {
  memberLogin() {
  return this.$store.state.member
}
},
methods:{
            goBack(){
    this.$router.go(-1)
  },
    switchView( selected ){ 
         if(selected == 'Payments') {
            this.Payments= true,
            this.UploadFile=false,
            this.currentTab = 1
        }
    },
}
}
</script>

<style src=".././global.css"></style>