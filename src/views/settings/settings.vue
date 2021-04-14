<template>
            <div class="app-admin-section">
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
            <div class="app-admin-col-2">
            <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <div class="settings-icon"></div>
          <div @click = "switchView('Members')" class="admin-top-barlinks admin-active-top-link">Members</div>
          <div @click = "switchView('ApprovalRate')" class="admin-top-barlinks">Approval Route</div>
             <div @click = "switchView('ViewPending')" class="admin-top-barlinks">Pending Approvals</div>
           <div @click = "switchView('CreateLoan')" class="admin-top-barlinks">Create Loan</div>
            <div @click = "switchView('Employees')" class="admin-top-barlinks">Employees</div>
             <div @click = "switchView('LoanConfig')" class="admin-top-barlinks">Loan Config</div>

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
import CreateLoan from './createLoan.vue'
import Employees from './employees.vue'
import LoanConfig from './loanConfig.vue'

export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
    Members,
    ApprovalRate,
    ViewPending,
    CreateLoan,
    Employees,
    LoanConfig
  },
  data(){
      return{
        selectedTab: '',
        Members: true,
        ApprovalRate: false,
        CreateLoan: false,
        Employees: false,
        LoanConfig:false,
        ViewPending:false
      }
  },
methods:{
    
    switchView( selected ){
        if(selected == "Members"){
      
         this.Members = true
         this.ApprovalRate = false
          this.CreateLoan = false
           this.Employees = false
           this.ViewPending = false
           this.LoanConfig = false
        }
        else if(selected == 'ApprovalRate') {
           this.Members = false
           this.ApprovalRate = true
           this.CreateLoan = false
           this.Employees = false
           this.ViewPending = false
           this.LoanConfig = false
        }
        else if(selected == 'ViewPending') {
           this.Members = false
           this.ApprovalRate = false
           this.ViewPending = true
           this.CreateLoan = false
           this.Employees = false
           this.LoanConfig = false
        }
         else if(selected == 'CreateLoan') {
           this.Members = false
           this.ApprovalRate = false
           this.CreateLoan = true
           this.Employees = false
           this.ViewPending = false
           this.LoanConfig = false
        }
         else if(selected == 'Employees') {
           this.Members = false
           this.ApprovalRate = false
           this.CreateLoan = false
           this.Employees = true
           this.ViewPending = false
           this.LoanConfig = false
        }
         else if(selected == 'LoanConfig') {
           this.Members = false
           this.ApprovalRate = false
           this.CreateLoan = false
           this.Employees = false
           this.ViewPending = false
           this.LoanConfig = true
        }

    },

}
}
</script>

<style src=".././global.css"></style>