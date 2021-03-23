<template>
            <div class="app-admin-section">
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
            <div class="app-admin-col-2">
            <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <div class="settings-icon"></div>
          <div @click = "switchView('LoanRequest')" class="admin-top-barlinks admin-active-top-link">Loan Request</div>
          <div @click = "switchView('History')" class="admin-top-barlinks">History</div>
           <div @click = "switchView('Waiver')" class="admin-top-barlinks">Waiver Form</div>
            <div @click = "switchView('Offset')" class="admin-top-barlinks">Loan Offset</div>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{new Date().toLocaleString() | humanize}}</div>
        </div>
      </div>
        <div v-show="LoanRequest">
        <LoanRequest/> 
        </div>
            <div v-show="History">
           <History/>       
            </div>
             <div v-show="Waiver">
           <Waiver/>       
            </div>
             <div v-show="Offset">
           <Offset/>       
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
import LoanRequest from './requestLoan.vue'
import History from './history'
import Waiver from './waiver.vue'
import Offset from './offset.vue'

export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
    LoanRequest,
    History,
    Waiver,
    Offset

  },
  data(){
      return{
        selectedTab: '',
        LoanRequest: true,
        History: false,
        Waiver: false,
        Offset: false
      }
  },
methods:{
    
    switchView( selected ){
        if(selected == "LoanRequest"){
      
         this.LoanRequest = true
         this.History = false
          this.Waiver = false
           this.Offset = false
        }
        else if(selected == 'History') {
             this.LoanRequest = false
         this.History = true
           this.Waiver = false
           this.Offset = false
        }
         else if(selected == 'Waiver') {
             this.LoanRequest = false
         this.History = false
           this.Waiver = true
           this.Offset = false
        }
         else if(selected == 'Offset') {
             this.LoanRequest = false
         this.History = false
           this.Waiver = false
           this.Offset = true
        }

    },

}
}
</script>

<style src=".././global.css"></style>