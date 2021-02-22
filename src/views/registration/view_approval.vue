<template>
  <div class="dashboard">
    <div class="background-design"></div>
    <Menu></Menu>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="main-dashboard">
            <div class="dashboard-greeting">
              <div class="overview-text">
                <font-awesome-icon icon="exchange-alt" />
                <div class="header-title">Approval</div>
              </div>                               
              <div class="date">
                <font-awesome-icon icon="clock" />
                <div class="date-item ml-2">{{ currentDateTime() }}</div>
              </div>
            </div>
            <div class="line"></div>
            <div class="row">
                <div class="col-md-2">
                  <!-- <div class="dashboard-right-side-bar">
                  <div class="header_2">Profile</div>
                  </div> -->
              </div>
                <div class="col-md-8">
                  <div class="overview-board">
                    <div class="account-overview">                      
                      <div class="account-overview-content">
                        <div class="mt-2">
                          <div class="header_background">Approval Details</div>
                        </div>
                        <div style="position:relative; overflow-y:auto; height:400px">
                          <div>
                            <div>
                                <b-row class="my-1 form-row mb-3 ">
                                  <b-col sm="4">
                                    <b-form-select
                                      v-model="selectedLoan"
                                      :options="options"
                                    ></b-form-select>
                                  </b-col>
                                </b-row>
                            </div>
                            <div v-if="selectedLoan === 2">                           
                                <b-table striped hover small :fields="fields" :items="active.data" responsive="sm">                              
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
                                        <span v-if="data.item.active">Pending Approval</span>
                                    </template>
                                    <template #cell(memberType)="data">
                                        <span v-if="data.item.memberType === 1">Regular Member</span>
                                        <span v-if="data.item.memberType === 2">Retiree Member</span>
                                        <span v-if="data.item.memberType === 3">Expatriate Member</span>
                                    </template>
                                    <template #cell(show_details)="row">
                                    <b-button variant="light" size="sm" @click="row.toggleDetails" class="mr-2">
                                        <b-icon icon="pencil-square" class="primary" variant="primary"></b-icon> </b-button> <br/>
                                    </template>
                                </b-table>
                            </div>
                            <div v-if="selectedLoan === 3">                           
                                <b-table striped hover small :fields="fields" :items="inactive.data" responsive="sm">                              
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
                                        <span v-if="!data.item.active">Not-Approved</span>
                                    </template>
                                    <template #cell(memberType)="data">
                                        <span v-if="data.item.memberType === 1">Regular Member</span>
                                        <span v-if="data.item.memberType === 2">Retiree Member</span>
                                        <span v-if="data.item.memberType === 3">Expatriate Member</span>
                                    </template>
                                    <template #cell(show_details)>
                                        <span></span>
                                        <b-button variant="primary" @click="approve" class="float-sm-left">Approve</b-button>

                                    <!-- <b-button variant="light" size="sm" @click="row.toggleDetails" class="mr-2">
                                        <b-icon icon="pencil-square" class="primary" variant="primary"></b-icon> </b-button> <br/> -->
                                    </template>
                                </b-table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <div class="col-md-2">
                  <!-- <div class="dashboard-right-side-bar">
                  <div class="header_2">Profile</div>
                  </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Menu from "../../components/layout/headers/menus.vue";
import Footer from "../../components/layout/footer/footer.vue";

import axios from "axios";

export default {
  name: "Home",
  components: {
    Menu,
    Footer
  },
  data() {
    return {
      active: [],      
      inactive: [],      
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
        { value: 2, text: "Pending Approval" },
        { value: 3, text: "Approved Members" }
      ]
    };
  },
  async created() {
    await this.initactive();
    await this.Inactive();
  },
  methods: {
    currentDateTime() {
      const current = new Date();
      const date = current.toDateString();
      const time = current.getHours() + ":" + current.getMinutes();
      const dateTime = date + " " + time;

      return dateTime;
    },

    async initactive() {        
     await axios
        .get( `${process.env.VUE_APP_API_URL}/Members/All`,{
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.active = response.data;
        })
        .catch(error => {
          error.alert("Error");
        });
    }, 

    async Inactive() {        
     await axios
        .get( `${process.env.VUE_APP_API_URL}/Members/Inactive`,{
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.inactive = response.data;
        })
        .catch(error => {
          error.alert("Error");
        });
    },

    async approve() {        
     await axios
        .post( `${process.env.VUE_APP_API_URL}`,{
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.active = response.data;
        })
        .catch(error => {
          error.alert("Error");
        });
    }, 
  }

};
</script>
