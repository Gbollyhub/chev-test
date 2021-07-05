<template>
            <div class="app-admin-section">
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
            <div class="app-admin-col-2">
            <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <div @click="goBack" class="settings-icon"></div>
          <div v-if="userType== 3 && memberLogin.department.description == 'INTERNAL CONTROL'" >
             <div @click = "switchView('InternalControl')" class="admin-top-barlinks" :class="[currentTab == 4 ? currentClass : '']">Internal Control Pending Approvals</div>
          </div>
          <!-- <div v-else-if="userType== 3 && memberLogin.department.description == 'ACCOUNTS'" >
             <div @click = "switchView('Payments')" class="admin-top-barlinks" :class="[currentTab == 5 ? currentClass : '']">Payments</div>
          </div> -->
          <div v-else>
          <!-- <div @click = "switchView('Members')" class="admin-top-barlinks" :class="[currentTab == 1 ? currentClass : '']">Members</div> -->
          <!-- <div @click = "switchView('ApprovalRate')" class="admin-top-barlinks" :class="[currentTab == 2 ? currentClass : '']">Approval Route</div> -->
             <div @click = "switchView('ViewPending')" class="admin-top-barlinks" :class="[currentTab == 3 ? currentClass : '']">Pending Approvals</div>
           <!-- <div @click = "switchView('CreateLoan')" class="admin-top-barlinks" :class="[currentTab == 4 ? currentClass : '']">Create Loan</div> -->
            <!-- <div @click = "switchView('Employees')" class="admin-top-barlinks" :class="[currentTab == 5 ? currentClass : '']">Employees</div> -->
             <!-- <div @click = "switchView('LoanConfig')" class="admin-top-barlinks" :class="[currentTab == 6 ? currentClass : '']">Loan Config</div> -->
          </div>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{new Date().toLocaleString() | humanize}}</div>
        </div>
      </div>
        <div v-show="Members">
        <Members/> 
        </div>
            <div v-show="ApprovalRate">
           <ApprovalRate/>       
            </div>
            <div v-show="ViewPending">
           <ViewPending/>       
            </div>
             <div v-show="InternalControl">
           <InternalControl/>       
            </div>
            <div v-show="Payments">
           <Payments/>       
            </div>
             <div v-show="CreateLoan">
           <CreateLoan/>       
            </div>
             <div v-show="Employees">
           <Employees/>       
            </div>
             <div v-show="LoanConfig">
           <LoanConfig/>       
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
import Members from './members.vue'
import ApprovalRate from './approvalRate'
import ViewPending from './viewApproval'
import InternalControl from './internalControlPage'
import CreateLoan from './createLoan.vue'
import Employees from './employees.vue'
import LoanConfig from './loanConfig.vue'
// import Payments from './memberPayments.vue'

export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
    Members,
    ApprovalRate,
    ViewPending,
    InternalControl,
    // Payments,
    CreateLoan,
    Employees,
    LoanConfig,
    // Payment
  },
  data(){
      return{        
        selectedTab: '',
        Members: false,
        ApprovalRate: false,
        CreateLoan: false,
        Employees: false,
        LoanConfig:false,
        ViewPending:false,
        // Payments:false,
        InternalControl:false,
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
created() {
  this.$store.dispatch('memberDetails');
},
methods:{
            goBack(){
    this.$router.go(-1)
  },
    switchView( selected ){
        if(selected == "Members"){
         this.Members = true 
         this.ApprovalRate = false
          this.CreateLoan = false
           this.Employees = false
           this.ViewPending = false
           this.LoanConfig = false
            this.currentTab = 1
        }
        else if(selected == 'ApprovalRate') {
           this.Members = false
           this.ApprovalRate = true
           this.CreateLoan = false
           this.Employees = false
          this.InternalControl=false
           this.ViewPending = false
           this.LoanConfig = false
            this.currentTab = 2
        }
        else if(selected == 'ViewPending') {
           this.Members = false
           this.ApprovalRate = false
           this.ViewPending = true
           this.CreateLoan = false
           this.Employees = false
          this.InternalControl=false
           this.LoanConfig = false
            this.currentTab = 3
        }
        else if(selected == 'InternalControl') {
          this.InternalControl=true
           this.Members = false
           this.ApprovalRate = false
           this.ViewPending = false
           this.CreateLoan = false
           this.Employees = false
           this.LoanConfig = false
            this.currentTab = 4
        }
        // else if(selected == 'Payments') {
        //   this.Payments= true
        //   this.InternalControl=false
        //    this.Members = false
        //    this.ApprovalRate = false
        //    this.ViewPending = false
        //    this.CreateLoan = false
        //   this.InternalControl=false
        //    this.Employees = false
        //    this.LoanConfig = false
        //     this.currentTab = 5
        // }
         else if(selected == 'CreateLoan') {
           this.Members = false
           this.ApprovalRate = false
           this.CreateLoan = true
           this.Employees = false
           this.ViewPending = false
          this.InternalControl=false
           this.LoanConfig = false
            this.currentTab = 6
        }
         else if(selected == 'Employees') {
           this.Members = false
           this.ApprovalRate = false
           this.CreateLoan = false
           this.Employees = true
          this.InternalControl=false
           this.ViewPending = false
           this.LoanConfig = false
            this.currentTab = 7
        }
         else if(selected == 'LoanConfig') {
           this.Members = false
           this.ApprovalRate = false
           this.CreateLoan = false
           this.Employees = false
          this.InternalControl=false
           this.ViewPending = false
           this.LoanConfig = true
            this.currentTab = 8
        }

    },

}
}
</script>

<style src=".././global.css"></style>