<template>
  <div>      
    <div class="mt-2">
    <div class="header_background">Apply for a loan</div>
    </div>
    <div>
    <div class="row">
        <div class="col-md-12">
        <div>
            <div v-if="this.errors != ''">
            <!-- <b-alert show variant="danger" fade dismissible >
                {{this.errors}}
            </b-alert> -->
            <b-alert
                variant="danger"
                dismissible
                fade
                :show="showDismissibleAlert"
                @dismissed="showDismissibleAlert=false"
            >
                {{this.errors}}
            </b-alert>
            </div>
            <b-form class="form">
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
                :value="item.loanId"
                :key="item.loan.id">
                    {{item.loan.name}} 
                </b-form-select-option>
            </b-form-select >                      
            <br/>
            </b-form-group>
            <div v-if="mType === 1">
                <b-row class="my-1 form-row mb-3 ">
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
                    v-model="amountExpected"
                    :formatter="numberFormat"
                    type="text"
                    ></b-form-input>
                    <span v-if="amountExpected != ''"><code>
    {{parseFloat(this.amountExpected.replace(/,/g, '')) | NumbersToWords | capitalize}} Naira Only
                    </code></span>
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
                    v-model.trim="amountDesire"                                                                                
                    :formatter="numberFormat"
                    ></b-form-input>
                    <span v-if="amountDesire != ''"><code>
    {{parseFloat(this.amountDesire.replace(/,/g, '')) | NumbersToWords | capitalize}} Naira Only
                    </code></span>
                </b-col>
                </b-row>
            </div>
            <div v-if="mType  >= 2">
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
                    v-model.lazy.trim="loanAmount"
                    :max="maxLoanAmount" :min="minLoanAmount"
                    @blur="AmountValidation"
                    type="text"                                                                               
                    :formatter="numberFormat"
                    ></b-form-input>
                    <span v-if="loanAmount != ''"><code>
    {{parseFloat(this.loanAmount.replace(/,/g, '')) | NumbersToWords | capitalize}} Naira Only
                    </code></span>
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
                    v-model.lazy="minMonthlyRepayPeriod"
                    :max="this.MaxRepayPeriod" :min="this.MinRepayPeriod"
                    type="number"
                    @blur="RepaymentValidation" 
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

            <div v-if="mType === 2">                                  
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

                <b-row class="my-1 form-row mb-3">
                <b-col sm="4">
                    <label
                    class="pt-1 form-label"                                       
                    >Employee Number 3<code>*</code></label
                    >
                </b-col>
                <b-col sm="8">
                    <b-form-input
                    :id="`Employee Number`"
                    v-model="garantorEmpNo3"
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
                    v-model="garantorName3"
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
</template>
<script>
import axios from "axios";
import moment from 'moment'


export default {
  name: "Home",
  components: {
  },
  data() {
    return {
      // amountToword: parseFloat(this.loanAmount.replace(/,/g, '')) | NumbersToWords,
      checked: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      selectedLoan: "",
      errors: "",
      id:0,
      Loanid:"",
      LoanId:"",
      MemberId:"",
      InterestRate:"",
        name:{data:""},
      loanAmount:"",
      amountDesire:"",
      amountExpected: "",
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
      mType : "",
      items: [],
      details: [],
      mLoan:[],
      loan:{
        loanType: ""
      },
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
        // { value: 4, name: "April" },
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
  async created() {
    await this.initialize();
  },
  methods: {
    
    numberFormat(value) {
        this.points = Number(value.replace(/\D/g, ''))
        return value == '0.00' ? '' : this.points.toLocaleString();
      },
      errorToast(toaster,variant = null, msg,append = false) {
      this.notify++;
      this.$bvToast.toast(msg, {
        title: 'Input Error',
        variant: variant,
        toaster: toaster,
        solid: true,
        autoHideDelay: 5000,
        appendToast: append
      });
    },
    

    AmountValidation() {     
      
      this.showDismissibleAlert = !this.showDismissibleAlert;
      let amount = parseFloat(this.loanAmount.replace(/,/g, ''))
      let expectedAmount = parseFloat(this.amountExpected.replace(/,/g, ''))
      let desireAmount = parseFloat(this.amountDesire.replace(/,/g, ''))
      let mAmountDesire = expectedAmount * 0.75

      if (this.mType == 3 || this.mType == 2) {
        if(amount < this.minLoanAmount && this.minLoanAmount != 0){
              return this.errors = `Loan Amount must be Minimum of ₦ ${this.minLoanAmount | this.numberFormat} only`
        }
        if(this.maxLoanAmount != 0 && amount > this.maxLoanAmount){
              return this.errors = `Loan Amount must be Maximum of ₦ ${this.maxLoanAmount | this.numberFormat} only`
        }
      } 
      if (this.mType == 1) {
        if (desireAmount > mAmountDesire) {
          return this.errors = `Sorry, Maximum loan value is ${mAmountDesire}`
        }  
      }
      return this.errors = "";
    },

    RepaymentValidation() {
      
      // this.dismissCountDown = this.dismissSecs
      this.showDismissibleAlert = !this.showDismissibleAlert;
      if (this.mType == 3 || this.mType == 2) {
        if (this.MinRepayPeriod != 0 && this.minMonthlyRepayPeriod < this.MinRepayPeriod) {
          return this.errors = `Value Less than Minimum Repayment Period for ${this.details.loan.name} Loan` 
        }
        if (this.MinRepayPeriod != 0 && this.minMonthlyRepayPeriod > this.MaxRepayPeriod) {
          return this.errors = `Value more than Maximum Repayment Period for ${this.details.loan.name} Loan`
        }
      }

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
            this.mType = response.data.loan.loanType;
            this.mLoanCode = response.data.loan.loanCode;
            this.minLoanAmount = response.data.minLoanAmount;
            this.maxLoanAmount = response.data.maxLoanAmount;
            this.MinRepayPeriod = response.data.minMonthlyRepayPeriod;
            this.MaxRepayPeriod = response.data.maxMonthlyRepayPeriod
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
            this.mLoan = response.data;
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
        LoanId : this.details.loanId,
        MemberId: this.details.memberTypeId,
        InterestRate: this.details.intrestRate,
        LoanAmount: parseInt(this.loanAmount.replace(/,/g, '')),
        RepaymntPeriod: parseInt(this.minMonthlyRepayPeriod),
        EffectiveMonth:this.effectiveMonth,
        EffectiveYear: parseInt(this.effectiveYear),
        BankCode: this.form.bankcode,
        MethodOfCollection: 2,
        AccountNumber: this.form.accountNumber,
        AccountName: this.name.data,
        Action: 1,
        FormAction: 1
      };
      rawData = JSON.stringify(rawData);
      await axios
        .post(
          `${process.env.VUE_APP_API_URL}/Loans/apply`,
          rawData,
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
          }
        )
        .then((response) => {
          this.errors = response.message      
          this.result = response.data;
          this.$emit("setParamResp", this.result);
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
