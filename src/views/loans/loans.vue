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
                <div class="header-title">Loans</div>
              </div>
              <div class="date">
                <font-awesome-icon icon="clock" />
                <div class="date-item ml-2">19 December, 2020</div>
              </div>
            </div>
            <div class="line"></div>
            <div class="row">
              <div class="col-md-8">
                <div class="overview-board">
                  <div class="account-overview">
                    <div class="account-overview-content">
                      <div class="mt-2">
                        <div class="header_background">Apply for a loan</div>
                      </div>
                      <div>
                        <div class="row">
                          <div class="col-md-12">
                            <div>
                              <b-form class="form">
                                <!-- <b-row class="my-1 form-row mb-3 ">
                                  <b-col sm="4">
                                    <label class="pt-1 form-label" :for="select"
                                      >Loan Type <code>*</code></label
                                    >
                                  </b-col>
                                  <b-col sm="8">
                                    <b-form-select
                                      v-model="selectedLoan"
                                      :options="loanTypes"
                                    ></b-form-select>
                                  </b-col>
                                </b-row> -->
                                <b-form-group
                                class="pt-1 form-label"
                                label-cols="4"
                                label-cols-lg="4"
                                label-size="sm"
                                label="Loan Type"
                                label-for="sm"
                                invalid-feedback="Loan is required"
                                :state="nameState"
                              >
                                <b-form-select
                                  id="loantype"
                                  v-model="selectedLoan"
                                  @change="getConfig(selectedLoan)"
                                  :state="nameState"
                                  required
                                >                     
                                  <b-form-select-option :value="null" disabled>
                                      -- Select LoanType -- 
                                    </b-form-select-option>
                                    <b-form-select-option 
                                    v-for="item in items" 
                                    :value="item.loan.id"
                                    :key="item.loan.id">
                                      {{item.loan.name}} 
                                  </b-form-select-option>
                                </b-form-select >                      
                                <br/>
                                </b-form-group>

                                <div v-if="selectedLoan === 1">
                                  <b-row class="my-1 form-row mb-3 ">
                                    <b-col sm="4">
                                      <label
                                        class="pt-1 form-label"
                                        :for="ExepctedLumpSum"
                                        >Expected Lump Sum Type
                                        <code>*</code></label
                                      >
                                    </b-col>
                                    <b-col sm="8">
                                      <b-form-input
                                        v-model="details.lumpSumSavingsAmount"
                                      ></b-form-input>
                                    </b-col>
                                  </b-row>
                                  <b-row class="my-1 form-row mb-3">
                                    <b-col sm="4">
                                      <label
                                        class="pt-1 form-label"
                                        :for="DateExpected"
                                        >Date Expected <code>*</code></label
                                      >
                                    </b-col>
                                    <b-col sm="8">
                                      <b-form-input
                                        :id="`DateExpected`"
                                        type="date"
                                      ></b-form-input>
                                    </b-col>
                                  </b-row>
                                  <b-row class="my-1 form-row mb-3">
                                    <b-col sm="4">
                                      <label
                                        class="pt-1 form-label"
                                        :for="AmountExpected"
                                        >Amount Expected <code>*</code></label
                                      >
                                    </b-col>
                                    <b-col sm="8">
                                      <b-form-input
                                        :id="`AmountExpected`"
                                        v-model="details.minMonthlyRepayPeriod"
                                        type="number"
                                      ></b-form-input>
                                    </b-col>
                                  </b-row>
                                  <b-row class="my-1 form-row mb-3">
                                    <b-col sm="4">
                                      <label
                                        class="pt-1 form-label"
                                        :for="AmountDesire"
                                        >Amount Desire <code>*</code></label
                                      >
                                    </b-col>
                                    <b-col sm="8">
                                      <b-form-input
                                        :id="`AmountDesire`"
                                        type="text"
                                        v-model="amount"                                                                                
                                        :formatter="numberFormat"
                                      ></b-form-input>
                                    </b-col>
                                  </b-row>
                                </div>
                                <div v-if="selectedLoan >= 2">
                                  <b-row class="my-1 form-row mb-3">
                                    <b-col sm="4">
                                      <label
                                        class="pt-1 form-label"
                                        :for="Amount"
                                        >Amount <code>*</code></label
                                      >
                                    </b-col>
                                    <b-col sm="8">
                                      <b-form-input
                                        :id="`Amount`"
                                        type="text"                                                                               
                                        :formatter="numberFormat"
                                      ></b-form-input>
                                    </b-col>
                                  </b-row>
                                  <b-row class="my-1 form-row mb-3">
                                    <b-col sm="4">
                                      <label
                                        class="pt-1 form-label"
                                        :for="Amount"
                                        >Payment period (months)
                                        <code>*</code></label
                                      >
                                    </b-col>
                                    <b-col sm="8">
                                      <b-form-input
                                        :id="`payment period`"
                                        v-model="details.monthlyRepayPeriod"
                                        type="number"
                                      ></b-form-input>
                                    </b-col>
                                  </b-row>
                                  <b-row class="my-1 form-row mb-3">
                                    <b-col sm="4">
                                      <label class="pt-1 form-label" :for="Rate"
                                        >Rate (%) <code>*</code></label
                                      >
                                    </b-col>
                                    <b-col sm="8">
                                      <b-form-input
                                        disabled
                                        :id="`Rate`"
                                        v-model="details.intrestRate"
                                        type="text"
                                      ></b-form-input>
                                    </b-col>
                                  </b-row>
                                </div>

                                <div v-if="selectedLoan === '2'">
                                  <div class="header_2">Garantors</div>
                                  <b-row class="my-1 form-row mb-3">
                                    <b-col sm="4">
                                      <label
                                        class="pt-1 form-label"
                                        :for="Amount"
                                        >Employee Number <code>*</code></label
                                      >
                                    </b-col>
                                    <b-col sm="8">
                                      <b-form-input
                                        :id="`Employee Number`"
                                        type="text"
                                      ></b-form-input>
                                    </b-col>
                                  </b-row>
                                  <b-row class="my-1 form-row mb-3">
                                    <b-col sm="4">
                                      <label
                                        class="pt-1 form-label"
                                        :for="Amount"
                                        >Name <code>*</code></label
                                      >
                                    </b-col>
                                    <b-col sm="8">
                                      <b-form-input
                                        :id="`name`"
                                        type="text"
                                      ></b-form-input>
                                    </b-col>
                                  </b-row>
                                </div>

                                <div class="header_2">Method Of Collection</div>
                                <b-row class="my-1 form-row mb-3 ">
                                  <b-col sm="4">
                                    <label class="pt-1 form-label" :for="select"
                                      >Bank <code>*</code></label
                                    >
                                  </b-col>
                                  <b-col sm="8">
                                    <b-form-select
                                      v-model="selected"
                                      :options="banks"
                                    ></b-form-select>
                                  </b-col>
                                </b-row>
                                <b-row class="my-1 form-row mb-3">
                                  <b-col sm="4">
                                    <label class="pt-1 form-label" :for="Amount"
                                      >Account Number <code>*</code></label
                                    >
                                  </b-col>
                                  <b-col sm="8">
                                    <b-form-input
                                      :id="`Account Number`"
                                      type="number"
                                    ></b-form-input>
                                  </b-col>
                                </b-row>
                                <b-row class="my-1 form-row mb-3">
                                  <b-col sm="4">
                                    <label
                                      class="pt-1 form-label"
                                      :for="Beneficiary"
                                      >Beneficiary Name <code>*</code></label
                                    >
                                  </b-col>
                                  <b-col sm="8">
                                    <b-form-input
                                      disabled
                                      :id="`Beneficiary`"
                                      type="text"
                                    ></b-form-input>
                                  </b-col>
                                </b-row>
                              </b-form>
                              <div class="form-buttons">
                                <b-button class="form-btn">Reset</b-button>
                                <b-button class="form-btn">Submit</b-button>
                              </div>
                            </div>
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
import Menu from "../../components/layout/headers/menus.vue";
import RightSidebar from "../../components/layout/sidebar/profile-sidebar.vue";
import Footer from "../../components/layout/footer/footer.vue";

import axios from "axios";


export default {
  name: "Home",
  components: {
    Menu,
    RightSidebar,
    Footer
  },
  data() {
    return {
      checked: false,
      selectedLoan: "",
      items: [],
      details: [],
      accountTypes: [
        { value: 1, text: "Special Deposit " },
        { value: 2, text: "Fixed Deposit " }
      ],
      banks: [
        { value: "214", text: "First City Monument Bank" },
        { value: "215", text: "Unity Bank" },
        { value: "221", text: "Stanbic IBTC Bank" },
        { value: "232", text: "Sterling Bank" },
        { value: "301", text: "JAIZ Bank" },
        { value: "032", text: "Union Bank" },
        { value: "044", text: "Access Bank" },
        { value: "063", text: "Diamond Bank" },
        { value: "076", text: "Skye Bank" },
        { value: "082", text: "Keystone Bank" },
        { value: "058", text: "GTBank Plc" },
        { value: "050", text: "Ecobank Plc" },
        { value: "068", text: "Standard Chartered Bank" },
        { value: "070", text: "Fidelity Bank" }
      ],     
    };
  },
  async created() {
    await this.initialize();
  },
  methods: {

    numberFormat(value) {
        this.points = Number(value.replace(/\D/g, ''))
        return value == '0.00' ? '' : this.points.toLocaleString();
      },
    

    async initialize() {        
     await axios
        .get(`${process.env.VUE_APP_API_URL}/LoanCongfig/Member/Type`,{
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.items = response.data;
        })
        .catch(error => {
          error.alert("Error");
        });
    }, 

    async getConfig(selectedLoan) {        
      await axios
          .get(`${process.env.VUE_APP_API_URL}/loantype/amount/${selectedLoan}`,{
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(response => {
            this.details = response.data;
          })
          .catch(error => {
            error.alert("Error");
          });
    }, 

  },

};
</script>
