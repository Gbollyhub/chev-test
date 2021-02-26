<template>
  <div class="dashboard">
    <div class="background-design"></div>
    <!-- <Header></Header> -->
    <Menu></Menu>
    <div class="container">
      <!-- <NavBar></NavBar> -->
      <div class="row">
        <div class="col-md-12">
          <div class="main-dashboard">
            <div class="dashboard-greeting">
              <div class="overview-text">
                <font-awesome-icon icon="exchange-alt" />
                <div class="header-title">Approvers</div>
              </div>
              <div class="date">
                <font-awesome-icon icon="clock" />
                <div class="date-item ml-2">{{new Date().toLocaleString() | humanize}}</div>
              </div>
            </div>
            <div class="line"></div>
            <div class="row">
            <div class="col-md-8">
                <div class="overview-board">
                  <div class="account-overview">
                    <div class="account-overview-content">
                      <div class="mt-2">
                  <div class="header_background">Module Approver</div>
                </div>
                <div class="col-md-12">
                  <strong><b-form-group
                    label-cols="4"
                    id="input-group-3"
                    label="Module"
                    label-for="input-3"
                    label-cols-lg="2"
                    label-size="sm"
                  >
                    <b-form-select
                      id="input-3"
                      v-model="module"
                      :options="modules"
                    ></b-form-select
                    ><br
                  /></b-form-group></strong>

                  <strong><b-form-group
                    label-cols="4"
                    label-cols-lg="2"
                    label-size="sm"
                    label="No. of Approvers"
                    label-for="input-sm"
                  >
                    <b-form-input
                      id="name-input"
                      type="number"
                      v-model="approver"
                      @change="addInputs"
                    ></b-form-input
                    ><br
                  /></b-form-group></strong>

                  <div class="line"></div>

                  <div>
                    <b-table-simple striped hover>
                      <b-tr>
                        <b-th colspan="2">
                          
                          <b-form-group id="input-3" label="Approvers">
                          </b-form-group>
                          <div id="dept" v-if="approver" != 0>
                            <b-form-select
                              id="input-3"
                              v-model="department"
                              required
                            >
                      <b-form-select-option :value="null" disabled>
                            -- Select Department -- 
                          </b-form-select-option>
                          <b-form-select-option 
                          v-for="item in departments" 
                          :value="item.id"
                          :key="item.id">
                            {{item.description}} 
                        </b-form-select-option>
                      
                      </b-form-select
                      >

                          </div>
                          <!-- <div v-if="approver == 2">
                            <b-form-select
                        id="input-3"
                        v-model="department"
                        required
                      >
                      <b-form-select-option :value="null" disabled>
                            -- Select Department -- 
                          </b-form-select-option>
                          <b-form-select-option 
                          v-for="item in departments" 
                          :value="item.id"
                          :key="item.id">
                            {{item.description}} 
                        </b-form-select-option>
                      
                      </b-form-select
                      >
                            <b-form-select
                              id="input-3"
                              v-model="department2"
                              :options="departments"
                            >
                            </b-form-select>
                          </div>-- -->
                          <!-- <div v-if="approver == 3">
                            <b-form-select
                              id="input-3"
                              v-model="department1"
                              :options="departments"
                            >
                            </b-form-select>
                            <b-form-select
                              id="input-3"
                              v-model="department2"
                              :options="departments"
                            >
                            </b-form-select>
                            <b-form-select
                              id="input-3"
                              v-model="department3"
                              :options="departments"
                            >
                            </b-form-select>
                          </div> -->
                          
                          <!-- <div v-if="approver == 4">
                            <b-form-select
                              id="input-3"
                              v-model="department1"
                              :options="departments"
                            >
                            </b-form-select>
                            <b-form-select
                              id="input-3"
                              v-model="department2"
                              :options="departments"
                            >
                            </b-form-select>
                            <b-form-select
                              id="input-3"
                              v-model="department3"
                              :options="departments"
                            >
                            </b-form-select>
                            <b-form-select
                              id="input-3"
                              v-model="department4"
                              :options="departments"
                            >
                            </b-form-select>
                          </div> -->
                        </b-th>
                        <b-th colspan="3">
                          <b-form-group id="input-3" label="Level">
                          </b-form-group>
                          <!-- <div v-if="approver == 2">
                            <b-form-input
                              id="name-input"
                              v-model="level1"
                            ></b-form-input>
                            <b-form-input
                              id="name-input"
                              v-model="level2"
                            ></b-form-input>
                          </div> -->
                          <!-- <div v-if="approver == 3">
                            <b-form-input
                              id="name-input"
                              v-model="level1"
                            ></b-form-input>
                            <b-form-input
                              id="name-input"
                              v-model="level2"
                            ></b-form-input>
                            <b-form-input
                              id="name-input"
                              v-model="level3"
                            ></b-form-input>
                          </div>
                          <div v-if="approver == 4">
                            <b-form-input
                              id="name-input"
                              v-model="level1"
                            ></b-form-input>
                            <b-form-input
                              id="name-input"
                              v-model="level2"
                            ></b-form-input>
                            <b-form-input
                              id="name-input"
                              v-model="level3"
                            ></b-form-input>
                            <b-form-input
                              id="name-input"
                              v-model="level4"
                            ></b-form-input>
                          </div> -->
                        </b-th>
                      </b-tr>                      
                      
                    </b-table-simple>
                    <div class="form-buttons">
                      <b-button type="submit" variant="primary"
                        >Submit</b-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div>
            <div class="col-md-4">
                <div class="dashboard-right-side-bar">
                <div class="header_2">Profile</div>
                    
                    <RightSidebar></RightSidebar>
                </div>
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

// import Header from "../../components/layout/headers/headerDashboard.vue";
// import NavBar from "../../components/layout/headers/dashboardNav.vue";
import Menu from "../../components/layout/headers/menus.vue";
import RightSidebar from "../../components/layout/sidebar/profile-sidebar.vue"
import Footer from "../../components/layout/footer/footer.vue";

import axios from "axios";

export default {
  name: "Home",
  components: {
    // Header,
    // NavBar,
    Menu,
    RightSidebar,
    Footer
  },
  data() {
    return {
      checked: false,
      selectedLoan: "",
      approver : "",
      dept:"",
      department: null,
      department1: null,
      department2: null,
      department3: null,
      department4: null,
      module: null,
      modules: [
        { text: "Select Module", value: null },
        "Membership",
        "Loans",
        "Savings",
        "Special Deposits",
        "Fixed Deposits",
        "Insurance",
        "Real Estate"
      ],
      departments: [
        { text: "Select Approver", value: null },
        "Accounts",
        "Operations",
        "Internal Control",
        "GM's Office",
        "Secretary",
        "Assistant Secretary",
        "Treasurer",
        "Assistant Treasurer",
        "President",
        "Vice President"
      ],

      fields: ["Approvers", "Level"],          
      
    };
  },
  async created() {
    await this.initDept();
  },
  methods: {

    async initDept() {        
     await axios
        .get(`${process.env.VUE_APP_API_URL}/Department/All`,{
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        })
        .then(response => {
          this.departments = response.data;
        })
        .catch(error => {
          error.alert("Error");
        });
    },
    addInputs(elm) {
      var dept = document.querySelector('#dept');
      dept.innerHTML = '';
      for (var i = 0; i < parseInt(elm.value); i++) {
      var wrapper = document.createElement('div');
      wrapper.innerHTML = //'<input type="text" placeholder="textfield ' + i + '" />';
                          `<b-form-select
                        id="input-3"
                        v-model="form.dept"                       
                        required
                      >
                      <b-form-select-option :value="null" disabled>
                            -- Select Department -- 
                          </b-form-select-option>
                          <b-form-select-option 
                          v-for="item in departments" 
                          :value="item.id"
                          :key="item.id">
                            {{item.description}} 
                        </b-form-select-option>
                      
                      </b-form-select>`
      dept.appendChild(wrapper);
  }
}


  }
};
</script>
