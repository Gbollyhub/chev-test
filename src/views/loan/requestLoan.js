import axios from "axios";
import moment from 'moment'


export default {
  name: "Home",
  components: {
  },
  data() {
    return {
      // amountToword: parseFloat(this.loanAmount.replace(/,/g, '')) | NumbersToWords,
      show: true,
      checked: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      selectedLoan: null,
      errors: "",
      result : {
        errors:{}
      },
      errorMsg:"",
      
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
      effectMonth: "",
      effectYear: moment.utc(new Date).format("YYYY"),     
      effectiveMonth: "",
      effectiveYear: moment.utc(new Date).format("YYYY"),
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
          firstName : [],
          email : [],      
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
      banks:[],
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
      guarantorArray: []       
    };
  },

  async created() {
    await this.initialize();
    await this.getAllBanks();
    this.effectiveDate();
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    this.$store.dispatch('getAllMembers')
  },
  computed: {
      
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
      if (value == 1) {
        if ( current.getMonth() > 0) {
          this.effectYear = currentYear+1;
      }else { this.effectYear = currentYear; }
        this.effectMonth = 0;
      }
      else if (value == 2) {
        this.effectMonth = 3;
        if ( current.getMonth() > 3) {
          this.effectYear = currentYear+1;
      }else { this.effectYear = currentYear; }
      }
      else if (value == 3) {
        this.effectMonth = 8;
        if ( current.getMonth() > 8) {
          this.effectYear = currentYear+1;
      }else { this.effectYear = currentYear; }
      }
      else if (value == 4) {
        this.effectMonth = 10;
        if ( current.getMonth() > 8) {
          this.effectYear = currentYear+1;
          console.log(this.effectYear)
      }else { this.effectYear = currentYear; }
      }else { this.effectMonth = "";}
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
      let mAmountDesire = expectedAmount * 0.75

      if (this.mType == 3 || this.mType == 2) {
        if(amount < this.minLoanAmount && this.minLoanAmount != 0){
              return this.errors = `Loan Amount must be Minimum of ₦ ${Number(this.minLoanAmount).toLocaleString()} only`
        }
        if(this.maxLoanAmount != 0 && amount > this.maxLoanAmount){
              return this.errors = `Loan Amount must be Maximum of ₦ ${Number(this.maxLoanAmount).toLocaleString()} only`
        }
      } 
      if (this.mType == 1) {
        if (amount > mAmountDesire) {
          return this.errors = `Enter a value less than or equal to 75% (${Number(mAmountDesire).toLocaleString()}) of Amount Expected ₦ ${Number(expectedAmount).toLocaleString()}`
        }  
      }
      return this.errors = "";
    },

    RepaymentValidation() {
      
      // this.dismissCountDown = this.dismissSecs
      this.showDismissibleAlert = !this.showDismissibleAlert;
      if (this.mType == 3 || this.mType == 2) {
        if (this.MinRepayPeriod != 0 && this.minMonthlyRepayPeriod < this.MinRepayPeriod) {
          return this.errors = `Minimum Repayment Period supplied is not valid, enter a value greater than 
          ${this.MinRepayPeriod}, less than or equal to ${this.MaxRepayPeriod}` 
        }
        if (this.MinRepayPeriod != 0 && this.minMonthlyRepayPeriod > this.MaxRepayPeriod) {
          return this.errors = `Maximum Repayment Period supplied is not valid, enter a value greater than
          ${this.MinRepayPeriod}, less than or equal to ${this.MaxRepayPeriod}`
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

    async getAllBanks() {        
      await axios
         .get(`${process.env.VUE_APP_API_URL}/banks/All`,{
           headers: {
             "Content-Type": "application/json;charset=utf-8"
           }
         })
         .then(response => {
           this.banks = response.data;
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
      this.guarantorArray = []
      let guarantor = {            
            MemberId: parseInt(localStorage.getItem('memberId')),
            LoanId: this.details.loanId,
            LoanAmount: parseInt(this.loanAmount.replace(/,/g, ''))
          }; 
          guarantor = JSON.stringify(guarantor);           
            
     await axios.post(`${process.env.VUE_APP_API_URL}/LoanConfig/Guarantors/count`, guarantor, {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.guarant = response.data;
          for (let index = 0; index < response.data.data; index++) {
            this.guarantorArray.push({
              id: index,
              guarantorNumber : 0,
              guarantorName : "",
              guarantorEmail : "", 
          });
          }
          console.log('guarant>>>>>>', response.data.data)
          console.log('guarantArray>>>>>>', this.guarantorArray)
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

      async getGuarantorInfo(gNo, index) {
        //  console.log("Gotten Number", gNo)
      let guarantor = {            
            EmployeeNumber: gNo
          };    
     await axios
        .post(`${process.env.VUE_APP_API_URL}/Members/EmpNumber`, guarantor, {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.Info = response.data.data;
          console.log('gInfo>>>>>>>>>>>>', response.data.data)
          this.guarantorArray[index].guarantorName = response.data.data.person.firstName + ' ' + response.data.data.person.lastName
          this.guarantorArray[index].guarantorEmail = response.data.data.person.email

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

    async onSubmit(event) {
      event.preventDefault()

      if (this.AmountValidation()) {
        return this.errors;
      }
      if (this.RepaymentValidation()) {
        return this.errors;
      }

      let Month = this.effectiveMonth
      let Year = parseInt(this.effectiveYear)
      let repay = parseInt(this.minMonthlyRepayPeriod)      
      if (this.mType === 1) {
        Month = this.effectMonth
        Year = parseInt(this.effectYear)
        repay = 0
      }

      let rawData = {
        LoanId : this.details.loanId,
        MemberId: this.details.memberTypeId,
        InterestRate: this.details.intrestRate,
        LoanAmount: parseInt(this.loanAmount.replace(/,/g, '')),
        RepaymntPeriod: repay,
        EffectiveMonth: Month,
        EffectiveYear: Year,
        BankCode: this.form.bankcode,
        MethodOfCollection: 2,
        AccountNumber: this.form.accountNumber,
        AccountName: this.name.data,
        LoanGuarantors: this.guarantorArray
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
          if (response.data.data === null){
            this.showDismissibleAlert = !this.showDismissibleAlert;
            this.result = response.data;
          }else {
            this.result = response.data;
            this.$emit("setParamResp", this.result);
            localStorage.setItem("LoanPlan",JSON.stringify(this.result));
            this.$router.push('/repayment_plan');
          }
        })
        .catch(error => {
          if (error.response.status == 401) {
            // auto logout if 401 response returned from api
            localStorage.removeItem('token')
            this.$router.push('/')
        }
            this.$bvToast.toast(error, {
                title: "Error",
                variant: "danger",
                solid: true,
                autoHideDelay: 5000
            });
          });
    },

    onReset(event) {
        event.preventDefault()
        this.selectedLoan = null;
        this.details.loanId = "";
        this.details.memberTypeId = "";
        this.loanAmount = "";
        this.minMonthlyRepayPeriod = "";
        this.form.bankcode = "";
        this.form.accountNumber = "";
        this.name.data = "";
        this.grantData = null

        this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },

  },

}