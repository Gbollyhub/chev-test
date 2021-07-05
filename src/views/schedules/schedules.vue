<template>
    <div class="app-admin-section">
        <div class="app-admin-col-1">
            <Leftbar/>
        </div>
    <div class="app-admin-col-2">
    <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <div @click="goBack" class="settings-icon"></div>
             <div @click = "switchView('Schedule')" class="admin-top-barlinks" :class="[currentTab == 1 ? currentClass : '']">Deduction Upload</div>
             <div @click = "switchView('PendingDeduct')" class="admin-top-barlinks" :class="[currentTab == 2 ? currentClass : '']">Pending Deduction</div>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{new Date().toLocaleString() | humanize}}</div>
        </div>
      </div>  
    <div v-show="Schedule">
        <Schedule/>       
    </div>
    <div v-show="PendingDeduct">
        <PendingDeduct/>       
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
import Schedule from './schedule.vue'
import PendingDeduct from './pendingDeduct.vue'

export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
    Schedule,
    PendingDeduct
  },
  data(){
      return{        
        selectedTab: '',
        Schedule:true,
        PendingDeduct:false,
        currentTab: 1,
        currentClass: 'admin-active-top-link',
        userType: localStorage.getItem('userType')
      }
  },
  created() {
  this.$store.dispatch('memberDetails');
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
         if (selected == 'Schedule') {
            this.Schedule = true
            this.PendingDeduct = false
            this.currentTab = 1
        }
        else if(selected == 'PendingDeduct') {
            this.PendingDeduct = true
            this.Schedule = false
            this.currentTab = 2
        }
    },
}
}
</script>

<style src=".././global.css"></style>