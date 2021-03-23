import axios from "axios";
import moment from 'moment'


export default {
  el:'#gt',
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
        guarant: {data:0},
      loanAmount:"",
      amountDesire:"",
      amountExpected: "",
      expectedLumpSum:null,
      minMonthlyRepayPeriod:"",
      garantorEmpNo : "",
      garantorName : "",
      accountName : "",      
      beneficiary : "",
      effectiveMonth: "",
      effectiveYear: moment(new Date().toLocaleString()).format("YYYY"),
      form: {
        accountNumber:"",
        bankcode:"",
      },
      grant: 
        {
          guarantorNumber :{},
          guarantorName : {},
          guarantorEmail : {},      
       },
       Info: {
          EmployeeNumber:"",
          person:  {
          firstName : {},
          email : {},      
       }
       },
       grantData:[],
       LoanGuarantors:[],
      mType : "",
      items: [],
      details: [],
      mLoan:[],
      loan:{
        loanType: ""
      },
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
         { text: "---Select Lump Sum---", value: null },
        { value: 1, text: "Annual Rent Subsidy" },
        { value: 2, text: "Security Allowance" },
        { value: 3, text: "Generator Maintenance/ Diesel Allowance" },
        { value: 4, text: "Annual Productivity Bonus"}
      ], 
      Months: [
        { name: "January", value: 0 },
        { name: "February", value: 1 },
        { name: "March", value: 2 },
        { value: 3, name: "April" },
        { value: 4, name: "May" },
        { value: 5, name: "June"},
        { value: 6, name: "July" },
        { value: 7, name: "August" },
        { value: 8, name: "September" },
        { value: 9, name: "October"},
        { value: 10, name: "November" },
        { value: 11, name: "December"}
      ],
       
    };
  },
  async created() {
    await this.initialize();
    this.effectiveDate();
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    this.$store.dispatch('getAllMembers')
  },
  computed: {
      accNum() {
        return this.form.accountNumber.length == 10 ? true : false
      },
      getAllmembers () {
          return this.$store.state.Allmember
      },
      memNumbers () {
          return this.$store.state.memberNum
      }
    },
  methods: {

    effectiveDate () {
      const current = new Date();
      const currentDate = current.getDate();      
      if (currentDate < 15) {
        return this.effectiveMonth = current.getMonth();
      }
      else {
       return  this.effectiveMonth = current.getMonth() +1;
      }
    },

    LumpSumDate(value) {
      const current = new Date();
      const currentYear = current.getFullYear();
          console.log("Year is ", currentYear );      
      if (value == 1) {
        if ( current.getMonth() > 0) {
          this.effectiveYear = currentYear+1;
      }else { this.effectiveYear = currentYear; }
        this.effectiveMonth = 0;
      }
      else if (value == 2) {
        this.effectiveMonth = 3;
        if ( current.getMonth() > 3) {
          this.effectiveYear = currentYear+1;
      }else { this.effectiveYear = currentYear; }
      }
      else if (value == 3) {
        this.effectiveMonth = 8;
        if ( current.getMonth() > 8) {
          this.effectiveYear = currentYear+1;
      }else { this.effectiveYear = currentYear; }
      }
      else if (value == 4) {
        this.effectiveMonth = 10;
        if ( current.getMonth() > 8) {
          this.effectiveYear = currentYear+1;
      }else { this.effectiveYear = currentYear; }
      }else { this.effectiveMonth = "";}
      
      
    },
    
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
          return this.errors = `Sorry, Maximum loan value is 75% of your Amount Expected  ${mAmountDesire}`
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
    
    //.............................................Start................................
    async getGuarantor() {
      let guarantor = {            
            MemberId: parseInt(localStorage.getItem('memberId')),
            LoanId: this.details.loanId,
            LoanAmount: parseInt(this.loanAmount.replace(/,/g, ''))
          }; 
          guarantor = JSON.stringify(guarantor);           
              await axios      
     await axios
        .post(`${process.env.VUE_APP_API_URL}/LoanConfig/Guarantors/count`, guarantor, {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.guarant = response.data;
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

    addGrant(gNo,gName,gMail){
      let index = null
      console.log(this.grantData.length)
      for (let i = 0; i < this.grantData.length; i++) {
              console.log("Lenght is " + this.grantData.length)
              console.log("gData is " + JSON.stringify(this.grantData[i]))
              console.log("Gno is " + gNo)
        if (this.grantData[i].EmployeeNumber === gNo) {
          console.log("Index is ", index)
          console.log("i is ",i)
          index = i
          break
        }
      }

      console.log("Last index is ",index)
      // this.grantData.splice(index, 1)

      this.grantData.push({
        EmployeeNumber : gNo,
        GuarantorName: gName,
        GuarantorEmail: gMail
      });
    },


       async getGuarantorInfo(gNo) {
      let guarantor = {            
            EmployeeNumber: gNo
          }; 
          guarantor = JSON.stringify(guarantor);           
              await axios      
     await axios
        .post(`${process.env.VUE_APP_API_URL}/Members/EmpNumber`, guarantor, {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.Info = response.data.data;
        })
        .catch(error => {
          this.$bvToast.toast(error.message, {
                title: "Error",
                variant: "danger",
                solid: true,
                autoHideDelay: 5000
            });
        });
    },



    //..........................................End Guarantor Info.............................
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

      this.AmountValidation()
      this.RepaymentValidation()

      let repay = parseInt(this.minMonthlyRepayPeriod)
      if (repay == null) { repay = 0}

      let rawData = {
        LoanId : this.details.loanId,
        MemberId: this.details.memberTypeId,
        InterestRate: this.details.intrestRate,
        LoanAmount: parseInt(this.loanAmount.replace(/,/g, '')),
        RepaymntPeriod: repay,
        EffectiveMonth:this.effectiveMonth,
        EffectiveYear: parseInt(this.effectiveYear),
        BankCode: this.form.bankcode,
        MethodOfCollection: 2,
        AccountNumber: this.form.accountNumber,
        AccountName: this.name.data,
        LoanGuarantors: this.grantData
      }
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
          localStorage.setItem("LoanPlan",JSON.stringify(this.result));
          this.$router.push('/repayment_plan');
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

      reset() {
        this.selectedLoan = "";
        this.details.loanId = "";
        this.details.memberTypeId = "";
        this.loanAmount = "";
        this.minMonthlyRepayPeriod = "";
        this.form.bankcode = "";
        this.form.accountNumber = "";
        this.name.data = "";
        this.grantData = null
    },

  },

}