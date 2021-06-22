import Menu from "../../components/layout/headers/menus.vue";
import RightSidebar from "../../components/layout/sidebar/profile-sidebar.vue"
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
      perPage: 10,
      currentPage: 1,
      show: true,
      notify:0,
      options: {
        format: 'YYYY-MM-DD',
        useCurrent: false,
        showClear: true,
        showClose: true,
      },
      user: {},
        employeeNumber: "",
        name: "",
        effectiveDate: new Date(),
        userSavings:{},
        form:{
          account: null,
          amount:"",
          inc_dec: null,
        },
      accountTypes: [
        { text: "---Select Account Type---", value: null, disabled: true },
        { value: 1, text: "Savings " },
        { value: 2, text: "Special Deposit " }
      ],
      inc_decs: [
        { text: "---Select Saving Type---", value: null, disabled: true },
        { value: 1, text: "Savings Increase" },
        { value: 2, text: "Savings Decrease" }
      ],
      fields: [
        {key: 'index', label: 'S/N'},
        { key: 'savingsType', label: 'Saving Type',class: 'text-center' },
        { key: 'savingAmount', label: 'Amount',class: 'text-center' },
        { key: 'transactionType', label: 'Transaction Type',class: 'text-center' },
        { key: 'transactionDate', label: 'Date',class: 'text-center' },
        { key: 'active', label: 'Status',class: 'text-center' },
      ],

    };
  },
  mounted() {
    this.getIncreaseDecreaseList()
  },
  computed:{
    memberLogin() {
      return this.$store.state.member
    },
    totalRows() {
      return this.userSavings.length
    }
  },
  methods: {
    rowClass(item, type) {
      if (!item || type !== 'row') return
      if (item.status === 'awesome') return 'table-success'
    },

    numberFormat(value) {
        this.points = Number(value.replace(/\D/g, ''))
        return value == '0.00' ? '' : this.points.toLocaleString();
      },

    makeToast(variant = null) {
      this.notify++;
      this.$bvToast.toast(`Savings Added`, {
        title: "Successful",
        variant: variant,
        solid: true,
        autoHideDelay: 5000
      });
    },


    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.amount = ''
      this.form.account = null
      this.form.inc_dec = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    async getIncreaseDecreaseList() {
      await axios.get(`${process.env.VUE_APP_API_URL}/SavingDepositTransactions/User/SavingsIncrease-Decrease`,{
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((response) => {
        this.userSavings = response.data;
      })
    },

    async onSubmit(event) {
      event.preventDefault()
      let rawData = {

        TransactionDate: this.effectiveDate,
        MemberId: this.memberLogin.id,
        DepositAmount: parseInt(this.form.amount.replace(/,/g, '')),
        SavingsType: this.form.account,        
        TransactionTypeId: this.form.inc_dec
        }
      rawData = JSON.stringify(rawData);
      await axios
        .post(`${process.env.VUE_APP_API_URL}/SavingDepositTransactions`, rawData, {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          this.rawData = response.data;
          this.makeToast(`success`);
          // if (this.form.MemberType != 2){       
          //   window.history.length > this.$router.
          //   push(`/payment/${this.form.fname}&${this.form.lname}&
          //     ${this.form.email}&${this.form.mobileNo}`);
          // }
          this.getIncreaseDecreaseList()
        })
        .catch(error => {
          this.$bvToast.toast(error.Message, {
                title: "Error",
                variant: "danger",
                solid: true,
                autoHideDelay: 5000
            });
        });
     },    
  }
};