import Leftbar from '../../components/leftbar/leftbar'
import Rightbar from '../../components/rightbar/rightbar'
import axios from 'axios';


export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar
  },
  data() {
    return {
      user: null,
    userType: localStorage.getItem('userType'),
      transactionHistory: [
        { amount: "0", type: "Loan", date: `20-12-2020 9:00pm` },
        { amount: "0", type: "withdraw", date: "20-12-2020 9:00pm" },
        { amount: "0", type: "Transfer", date: "20-12-2020 9:00pm" },
        { amount: "0", type: "Saving", date: "20-12-2020 9:00pm" }
      ]
    };
  },
  async mounted() {    
    await this.initUser();
},
  methods: {

    async initUser() {
      await axios
        .get(`${process.env.VUE_APP_API_URL}/Members/Usertype`, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          this.user = response.data.data;
        })
        .catch((error) => {
          if (error.response.status == 401) {
            // auto logout if 401 response returned from api
            localStorage.removeItem('token')
            this.$router.push('/')
        }
        });
    }
  }
}