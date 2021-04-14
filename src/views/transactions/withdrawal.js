
import axios from 'axios';
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
        notify: 0,
      options: {
          format: 'YYYY-MM-DD',
          useCurrent: false,
          showClear: true,
          showClose: true,
        },
      user: {},
      employeeNumber: '',
      selected:'',
      effectiveDate: new Date(),
      bankcode:null,
      location:"",
      banks:[],
      name:{data:""},
      accountNumber:"",
      amount:'',
      account:2,
      accountTypes: [
        { text: "---Select Account Type---", value: null, disabled: true },
        // { value: 1, text: "Savings " },
        { value: 2, text: "Special Deposit " }
      ],
    };
  },
  async mounted() {
    await this.initUser();
    await this.getAllBanks();
  },
  methods: {

    numberFormat(value) {
        this.points = Number(value.replace(/\D/g, ''))
        return value == '0.00' ? '' : this.points.toLocaleString();
      },
      
    makeToast(variant = null) {
      this.notify++;
      this.$bvToast.toast(`Transfered`, {
        title: "Successful",
        variant: variant,
        solid: true,
        autoHideDelay: 5000
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
       async verifyAcc() {     
        let verifyData = {            
          destbankcode: this.bankcode,
          recipientaccount: this.accountNumber,
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

    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.amount = ''
      this.form.account = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },

    async onSubmit(event) {
      event.preventDefault()

      let rawData = {
        TransactionDate: this.effectiveDate,
        MemberId: this.user.data.id,
        DepositAmount: parseInt(this.form.amount.replace(/,/g, '')),
        SavingsType: this.form.account,
        TransactionTypeId: 3,
      };
      rawData = JSON.stringify(rawData);
      await axios
        .post(
          `${process.env.VUE_APP_API_URL}/SavingDepositTransactions`,
          rawData,
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
          }
        )
        .then((response) => {
          this.rawData = response.data;
          this.makeToast(`success`);
          if (this.form.MemberType != 2) {
            window.history.length >
              this.$router.push(`/payment}`);
          }
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

    async initUser() {
      await axios
        .get(`${process.env.VUE_APP_API_URL}/Members/Usertype`, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          this.user = response.data;
        })
    },
  },
};