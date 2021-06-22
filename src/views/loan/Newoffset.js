
import moment from 'moment'
import axios from "axios";
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
  const currencyMask = createNumberMask({
    prefix: '',
    allowDecimal: true,
    decimalLimit :2,
    includeThousandsSeparator: true,
    allowNegative: false,
  });
export default {
    data() {
        return {
            show: true,
            mask: currencyMask,
            form: {
                loanType: "Select a Loan Type",
                waiverType: "Select a Waiver Type",
                offsetAmount:"",
                cashAmount:"",
                depositAmount:"",
                transferAmount:"",
                MonthSaving:"",
                balance:"",
                depositBalance:"",
                modeOffset:null,
                todayDate: moment(new Date().toLocaleString()).format("YYYY-MM-DD"), 
       
            },            
            selectedLoan: null,
           waiverDetails: [],
           runningLoan:{}
        };
    },
    computed: {
      memberBalance() {
        return this.$store.state.balance
      },
      memberLogin() {
        return this.$store.state.member
      },
      calcOffsetAmount() {
        let amount = parseFloat(this.memberBalance.savingsBalance.replace(/,/g, ''))
        if (this.selectedLoan == 1){
            return amount + this.runningLoan.interest
        }
        if (this.selectedLoan == 3) {
            return amount + 1000      
        }
      },
    },
    async created() {
      await this.initialize();
      this.$store.dispatch('memberBalance');
      await this.initUser();
    },
    methods: {

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
       },

       async initUser() {
        await axios
          .get(`${process.env.VUE_APP_API_URL}/Loans/runningloan`, {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((response) => {
            this.runningLoan = response.data.data;
          })
      },

    //   calcOffsetAmount() {
    //     let amount = parseFloat(this.memberBalance.savingsBalance.replace(/,/g, ''))
    //     if (this.selectedLoan == 1){
    //         return this.form.offsetAmount = amount + this.runningLoan.interest
    //     }
    //     if (this.selectedLoan == 3) {
    //         return this.form.offsetAmount = amount + 1000      
    //     }
    //   },
      //  async getConfig(selectedLoan) {        
      //   await axios
      //       .get(`${process.env.VUE_APP_API_URL}/loantype/amount/${selectedLoan}`,{
      //         headers: {
      //           "Content-Type": "application/json;charset=utf-8",
      //           Authorization: `Bearer ${localStorage.getItem('token')}`
      //         }
      //       })
      //       .then(response => {
      //           this.details = response.data;
      //           this.mType = response.data.loan.loanType;
      //           this.mLoanCode = response.data.loan.loanCode;
      //           this.minLoanAmount = response.data.minLoanAmount;
      //           this.maxLoanAmount = response.data.maxLoanAmount;
      //           this.MinRepayPeriod = response.data.minMonthlyRepayPeriod;
      //           this.MaxRepayPeriod = response.data.maxMonthlyRepayPeriod
              
      //       })
      //     },

        onReset(event) {
            event.preventDefault()
            this.form.loanType = null,
            this.form.waiverType = null,
            this.form.offsetAmount ="",
            this.form.cashAmount ="",
            this.form.depositAmount ="",
            this.form.MonthSaving ="",
            this.form.balance ="",
            this.form.depositBalance =""
            this.show = false
            this.$nextTick(() => {
              this.show = true
            })
          },
        async onSubmit(event) {
            event.preventDefault()
            console.log('click')
            let value = this.waiverForm
            console.log("d?>>>", value)
            this.waiverDetails.push(value)
            console.log(this.waiverDetails)
        }
    }, 
};
