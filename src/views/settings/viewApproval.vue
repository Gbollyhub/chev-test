<template>
            <div class="app-admin-section">
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
            <div class="app-admin-col-2">
            <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <div class="settings-icon"></div>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{new Date().toLocaleString() | humanize}}</div>
        </div>
      </div>
       <div class="content-header">Approval Details</div>
                        <div>
                            <div>
                                <b-row class="my-1 form-row mb-3 ">
                                  <b-col sm="4">
                                    <b-form-select
                                      v-model="selectedLoan"
                                      @change="initapprove(selectedLoan)"
                                      :options="options"
                                    ></b-form-select>
                                  </b-col>
                                </b-row>
                            </div>
                                <b-table striped hover small :fields="fields" :items="approve.data" responsive="sm">                              
                                    <template #cell(index)="data">
                                        {{ data.index + 1 }}
                                    </template>
                                    <template #cell(name)="data">
                                        <b class="text-info">{{ data.item.person.lastName.toUpperCase() }}</b>,
                                        <b>{{ data.item.person.firstName}}</b>
                                    </template>
                                    <template #cell(employeeNumber)="data">
                                        {{ data.item.employeeNumber }}
                                    </template>
                                    <template #cell(active)="data">
                                        <span v-if="!data.item.approved">Not-Approved</span>
                                        <span v-if="data.item.approved">Approved</span>
                                    </template>
                                    <template #cell(memberType)="data">
                                        <span v-if="data.item.memberType === 1">Regular Member</span>
                                        <span v-if="data.item.memberType === 2">Retiree Member</span>
                                        <span v-if="data.item.memberType === 3">Expatriate Member</span>
                                    </template>
                                    <template #cell(show_details)="data">
                                        <span v-if="!data.item.approved">
                                          <b-button variant="primary" @click="updatePending" class="float-sm-left">Approve</b-button>                                    
                                        </span>
                                        <span v-if="data.item.approved">
                                          <b-button variant="primary" @click="updatePending" class="float-sm-left">Pending</b-button>                                    
                                        </span>
                                        </template>
                                </b-table>
                            <!-- </div> -->
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
import axios from 'axios'

export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar
  },
  data() {
    return {
      approve: [],      
      approveData: {
        aprroved:Boolean
      },      
      selectedLoan: null,  
      fields: [
        {key: 'index', label: 'S/N'},
        { key: 'name', label: 'Full Name' },
        { key: 'employeeNumber', label: 'Employee No.' },
        { key: 'active', label: 'Status' },        
        { key: 'memberType', label: 'Member Type' },
        {key:'show_details', label: 'Action '}
      ],
      options: [
        {value: null, text: "Select Option"},
        { value: 0, text: "Pending Approval" },
        { value: 1, text: "Approved Members" }
      ]
    };
  },
  async created() {    
    await this.getAll();
  },
  methods: {
    async getAll() {        
     await axios
        .get( `${process.env.VUE_APP_API_URL}/Members/All`,{
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.approve = response.data;
        })
        .catch(error => {
          error.alert("Error");
        });
    }, 
    // async initapprove(selectedLoan) {  
      async initapprove() {        
     await axios
        // .get( `${process.env.VUE_APP_API_URL}/Members/Approved/${selectedLoan}`,{
          // -----for pending------
        .get( `${process.env.VUE_APP_API_URL}/PendingApproval/Members`,{
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.approve = response.data;
        })
        .catch(error => {
          error.alert("Error");
        });
    },

    async updatePending() { 
      let rawData = {
        approved : true
      };
      rawData = JSON.stringify(rawData);       
     await axios
        .post( `${process.env.VUE_APP_API_URL}/Members`, rawData,{
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.approve = response.data;
        })
        .catch(error => {
          error.alert("Error");
        });
    },


  }

};
  
</script>

<style src=".././global.css"></style>