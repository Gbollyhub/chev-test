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
                                    :value="item.loan.loanType"
                                    :key="item.loan.id">
                                      {{item.loan.name}} 
                                  </b-form-select-option>
                                </b-form-select >                      
                                <br/>
                                </b-form-group>

                                <div v-if="selectedLoan === 1">
                                  <b-row class="my-1 form-row mb-3 ">
                                    <!-- <b-col sm="4">
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
                                    </b-col> -->
                                    <b-col sm="4">
                                    <label class="pt-1 form-label" :for="lumpSum"
                                      >Expected Lump Sum Type <code>*</code></label
                                    >
                                  </b-col>
                                  <b-col sm="8">
                                    <b-form-select
                                      v-model="expectedLumpSum"
                                      :options="lumpSums"
                                    ></b-form-select>
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
                                        v-model="minMonthlyRepayPeriod"
                                        :formatter="numberFormat"
                                        type="text"
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
                                <div v-if="selectedLoan  >= 2">
                                  <b-row class="my-1 form-row mb-3">
                                    <b-col sm="4">
                                      <label
                                        class="pt-1 form-label"
                                        :for="Amount"
                                        >Loan Amount <code>*</code></label
                                      >
                                    </b-col>
                                    <b-col sm="8">
                                      <b-form-input
                                        :id="`Amount`"
                                        v-model="loanAmount"
                                        type="text"                                                                               
                                        :formatter="numberFormat"
                                      ></b-form-input>
                                    </b-col>
                                  </b-row>
                                  <b-row class="my-1 form-row mb-3">
                                    <b-col sm="4">
                                      <label
                                        class="pt-1 form-label"
                                        :for="DateExpected"
                                        >Effective Date MM/YY <code>*</code></label
                                      >
                                    </b-col>
                                    <b-col sm="3">
                                      <b-form-select
                                      v-model="effectiveMonth" disabled
                                      :options="Months"
                                      value-field="value"
                                      text-field="name"
                                    ></b-form-select></b-col>
                                      <b-col sm="3"><b-form-input
                                        :id="`DateExpected`"
                                        v-model="effectiveYear" disabled
                                        type="text"
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
                                        v-model.lazy="$v.minMonthlyRepayPeriod.$model"
                                        type="number" :min="24" :max="60"
                                        :maxlength="2"
                                        aria-valuemax="60"
                                        :state="RePayPeriod"
                                      ></b-form-input>
                                      <code><span v-if="!$v.minMonthlyRepayPeriod.between">
                            Repayment Period Must be between {{$v.minMonthlyRepayPeriod.$params.between.min}} Months
                              and {{$v.minMonthlyRepayPeriod.$params.between.max}} Months
                                      </span></code>

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

                                <div v-if="selectedLoan === 2">
                                  
                                  <div class="header_2">Guarantors</div>
                                  <b-row class="my-1 form-row mb-3">
                                    <b-col sm="4">
                                      <label
                                        class="pt-1 form-label"                                       
                                        >Employee Number 1<code>*</code></label
                                      >
                                    </b-col>
                                    <b-col sm="8">
                                      <b-form-input
                                        :id="`Employee Number`"
                                        v-model="garantorEmpNo1"
                                        type="number"
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
                                        v-model="garantorName1"
                                        type="text"
                                      ></b-form-input>
                                    </b-col>
                                  </b-row>

                                  
                                  <b-row class="my-1 form-row mb-3">
                                    <b-col sm="4">
                                      <label
                                        class="pt-1 form-label">Employee Number 2 <code>*</code></label
                                      >
                                    </b-col>
                                    <b-col sm="8">
                                      <b-form-input
                                        :id="`Employee Number`"
                                        v-model="garantorEmpNo2"
                                        type="number"
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
                                        v-model="garantorName2"
                                        type="text"
                                      ></b-form-input>
                                    </b-col>
                                  </b-row>

                                </div>

                                <div class="header_2">Method Of Collection</div>
                                <b-row class="my-1 form-row mb-3 ">
                                  <b-col sm="4">
                                    <label class="pt-1 form-label" 
                                      >Bank <code>*</code></label
                                    >
                                  </b-col>
                                  <b-col sm="8">
                                    <b-form-select
                                      v-model="form.bankcode"
                                      :options="banks"
                                      :for="Amount"
                                    ></b-form-select>
                                  </b-col>
                                </b-row>
                                <b-row class="my-1 form-row mb-3">
                                  <b-col sm="4">
                                    <label class="pt-1 form-label" 
                                      >Account Number <code>*</code></label
                                    >
                                  </b-col>
                                  <b-col sm="8">
                                    <b-form-input
                                      id="`Account Number`"
                                      :for="Amount"
                                      v-model="form.accountNumber"
                                      @blur="verifyAcc"
                                      type="number"
                                    ></b-form-input>
                                  </b-col>
                                </b-row>
                                <b-row class="my-1 form-row mb-3">
                                  <b-col sm="4">
                                    <label
                                      class="pt-1 form-label"
                                      
                                      >Beneficiary Name <code>*</code></label
                                    >
                                  </b-col>
                                  <b-col sm="8">
                                    <b-form-input
                                      disabled
                                      id="`Beneficiary`"
                                      v-model="name.data"
                                      type="text"
                                    ></b-form-input>
                                  </b-col>
                                </b-row>
                              </b-form>
                              <div class="form-buttons">
                                <b-button class="form-btn">Reset</b-button>
                                <b-button class="form-btn" @click="saveLoan">Submit</b-button>
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
import { required, maxLength, between } from 'vuelidate/lib/validators';

import axios from "axios";
import moment, { parseTwoDigitYear } from 'moment'


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
      Loanid:"",
        name:{data:""},
      // loanType : "",
      loanAmount:"",
      expectedLumpSum:null,
      minMonthlyRepayPeriod:"",
      garantorEmpNo : "",
      garantorName : "",
      accountName : "",      
      beneficiary : "",
      effectiveMonth: 3,
      effectiveYear: moment(new Date().toLocaleString()).format("YYYY"),
      form: {
        accountNumber:"",
      bankcode:"",
      },
      items: [],
      details: [],
      loan:[],
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
      lumpSums: [
        { value: 1, text: "Annual Rent Subsidy" },
        { value: 2, text: "Security Allowance" },
        { value: 3, text: "Generator Maintenance/ Diesel Allowance" },
        { value: 4, text: "Annual Productivity Bonus"}
      ], 
      Months: [
        { name: "March", value: 3 },
        // { value: 4, text: "April" },
        // { value: 5, text: "May" },
        // { value: 6, text: "June"},
        // { value: 7, text: "July" },
        // { value: 8, text: "August" },
        // { value: 9, text: "September" },
        // { value: 10, text: "October"},
        // { value: 11, text: "November" },
        // { value: 12, text: "December"}
      ], 
    };
  },
  validations: {
    minMonthlyRepayPeriod: {
      required,
      maxLength: maxLength(2),
      between: between(24, 60)
    },
  },
  computed: {
      RePayPeriod() {
        if (this.minMonthlyRepayPeriod.length == 0) {
          return ""
        }
        return this.minMonthlyRepayPeriod.length == 2 ? true : false
      },
      // invalidFeedback() {
      //   if (this.name.length > 0) {
      //     return 'Enter at least 2 characters.'
      //   }
      //   return 'Please enter something.'
      // },
    },
  async created() {
    await this.initialize();
  },
  methods: {

      
    // handleBlur(e) {
    //   this.verifyAcc()
      // console.log('blur', e.target.value)
    // },

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
          this.$bvToast.toast(error, {
                title: "Error",
                variant: "danger",
                solid: true,
                autoHideDelay: 5000
            });
        });
    }, 

    async initialize2() {        
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
          this.$bvToast.toast(error, {
                title: "Error",
                variant: "danger",
                solid: true,
                autoHideDelay: 5000
            });
        });
    },

  async verifyAcc() {     

          let verifyData = {            
            destbankcode: this.form.bankcode,
            recipientaccount: this.form.accountNumber,
          }; 

          verifyData = JSON.stringify(verifyData);           
              await axios
        .post(`${process.env.VUE_APP_API_URL}/flutterwave/account/name`,verifyData, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        })
        .then(response => {
          this.name = response.data;
          // this.form.bankcode,
          // this.form.accountNumber,
          
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
            this.$bvToast.toast(error, {
                title: "Error",
                variant: "danger",
                solid: true,
                autoHideDelay: 5000
            });
          });
    },

    async getLoanType(Loanid) {        
      await axios
          .get(`${process.env.VUE_APP_API_URL}/loans/${Loanid}`,{
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(response => {
            this.loanId = response.data;
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

    async saveLoan() {
      let rawData = {
        LoanId : this.details.LoanId,
        MemberId: this.details.MemberId,
        InterestRate: this.details.intrestRate,
        LoanAmount: parseInt(this.loanAmount),
        EffectiveMonth:this.effectiveMonth,
        EffectiveYear: parseTwoDigitYear(this.effectiveYear),
        BankCode: this.bankcode,
        MethOfCollection: 2,
        AccountNumber: this.accounNumber,
        AccountName: "0015232217"
      };
      rawData = JSON.stringify(rawData);
      await axios
        .post(
          `${process.env.VUE_APP_API_URL}/Loans/apply`,
          rawData,
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          this.rawData = response.data;
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

  },

};
</script>
