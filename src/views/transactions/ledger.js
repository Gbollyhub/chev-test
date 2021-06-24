
import Menu from '../../components/layout/headers/menus.vue';
import RightSidebar from '../../components/layout/sidebar/profile-sidebar.vue';
import Footer from '../../components/layout/footer/footer.vue';

import axios from 'axios';
export default {
  name: 'Home',
  components: {
    Menu,
    RightSidebar,
    Footer,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      show: true,
      notify: 0,
      ledgerList:{},
      fields: [
        {key: 'index', label: 'S/N',class: 'text-center'},
        { key: 'savingsType', label: 'Saving Type',class: 'text-center' },
        { key: 'TransactionTypeId', label: 'Transaction Type',class: 'text-center' },
        { key: 'CurrentBalance', label: 'Current Balance',class: 'text-center' },
        { key: 'PreviousBalance', label: 'Previous Balance',class: 'text-center' },
        { key: 'DepositAmount', label: 'Deposit Amount',class: 'text-center' },
        { key: 'transactionDate', label: 'Transaction Date',class: 'text-center' },
        { key: 'active', label: 'Status',class: 'text-center' },
      ],
    };
  },
  async mounted() {
    await this.getLedgerList()
  },
  computed:{
    memberLogin() {
      return this.$store.state.member
    },
    totalRows() {
      return this.ledgerList.length
    }
  },

  methods: {


    async getLedgerList() {
      await axios.get(`${process.env.VUE_APP_API_URL}/SavingDepositLedger/Member`,{
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((response) => {
        this.ledgerList = response.data;
      })
    },    
  },
};