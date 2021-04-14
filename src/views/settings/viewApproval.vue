<template><div>
       <div class="content-header">Approval Details</div>
          <div>
            <div style="margin-top:50px;" class="button-group">
              <!-- <div>
                  <b-row class="my-1 form-row mb-3 ">
                    <b-col sm="4">
                      <b-form-select
                        v-model="selectedOpt"
                        :options="options"
                      ></b-form-select>
                    </b-col>
                  </b-row>
              </div> -->
              <div>
                <b-row class="my-1 form-row mb-3 ">
                  <b-col sm="4">
                    <b-form-select
                      :id="`modules`"
                      v-model="selectedModule"
                      @change="initapprove()"
                      required>
                      <b-form-select-option :value="null" disabled>
                        -- Select Module -- 
                      </b-form-select-option>
                      <b-form-select-option 
                      v-for="item in modules.data" 
                      :value="item.id"
                      :key="item.id">
                        {{item.name}} 
                      </b-form-select-option>                      
                    </b-form-select>
                  </b-col>
                </b-row>
              </div>
            </div>
            <b-table striped hover small :fields="fields" :items="approve.data" responsive="sm">                              
                <template #cell(index)="data">
                    {{ data.index + 1 }}
                </template>
                <template #cell(name)="data">
                    <b class="text-info">{{ data.item.itemData.person.lastName.toUpperCase() }}</b>,
                    <b>{{ data.item.itemData.person.firstName}}</b>
                </template>
                <template #cell(employeeNumber)="data">
                    {{ data.item.itemData.employeeNumber }}
                </template>
                <template #cell(active)="data">
                    <span v-if="!data.item.itemData.approved">Not-Approved</span>
                    <span v-if="data.item.itemData.approved">Approved</span>
                </template>
                <template #cell(memberType)="data">
                    <span v-if="data.item.itemData.memberType === 1">Regular Member</span>
                    <span v-if="data.item.itemData.memberType === 2">Retiree Member</span>
                    <span v-if="data.item.itemData.memberType === 3">Expatriate Member</span>
                </template>
                <template #cell(show_details)="data">
                    <span v-if="!data.item.itemData.approved">
                      <b-button variant="primary" @click="updatePending" class="float-sm-left">Approve</b-button>                                    
                    </span>
                    <span v-if="data.item.itemData.approved">
                      <b-button variant="primary" @click="updatePending" class="float-sm-left">Pending</b-button>                                    
                    </span>
                    </template>
            </b-table>
      </div>
</div>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
       modules: [],
      selectedModule:null,
      approve: [],      
      approveData: {
        aprroved:Boolean
      },      
      selectedOpt: null,  
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
    await this.initModules();
    await this.initapprove();


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

    async initModules() {        
     await axios
        .get(`${process.env.VUE_APP_API_URL}/ModuleApprovers/Modules`,{
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        })
        .then(response => {
          this.modules = response.data;
        })
        .catch(error => {
            this.$bvToast.toast(error, {
                title: "Error",
                variant: "danger",
                solid: true,
                autoHideDelay: 5000
            });
          });
    },
    // async initapprove(selected) {  
      async initapprove() {

        // if (selectedModule == 2){

        // }

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