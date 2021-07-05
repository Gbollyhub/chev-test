import axios from 'axios'

export default {
  data() {
    return {
        perPage: 10,
        currentPage: 1,
        show: false,
        variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
        headerBgVariant: 'primary',
        headerTextVariant: 'light',
        bodyBgVariant: 'light',
        bodyTextVariant: 'dark',
        footerBgVariant: 'danger',
        footerTextVariant: 'light',
        getResult:[],
        pending:[],
        empNumber: "",
        employeeName: "",
        savings: "",
        monthlySavings: "",
        specialDeposit: "",
        monthlySpecialDeposit: "",
        shortTerm: "",
        longTerm: "",
        expectedShortTerm: "",
        expectedLongTerm: "",
        
        fields: [
            {key: 'index', label: 'S/N', class: 'text-center'},
            { key: 'Tag', label: 'Tag Id', class: 'text-center' },
            { key: 'totalLoanAmount', label: 'Loan Amount', class: 'text-center' },
            { key: 'totalSavingsAmount', label: 'Savings Amount', class: 'text-center' },
            { key: 'totalSpeciakAmount', label: 'Special Amount', class: 'text-center' },        
            { key: 'totalDeduction', label: 'Deduction', class: 'text-center' },
            {key:'uploadDate', label: 'Upload Date', class: 'text-center'}
          ],
    }
  },
  async mounted() {    
    await this.initPending();
},
  methods: {
    async initPending() {
        await axios
          .get(`${process.env.VUE_APP_API_URL}/deductions/pending`, {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((response) => {
            this.pending = response.data.data;
          })
          .catch((error) => {
            if (error.response.status == 401) {
              // auto logout if 401 response returned from api
              localStorage.removeItem('token')
              this.$router.push('/')
          }
          });
      },
      async getPendingByTag(id) {
        // this.getResult = []
        await axios
        .get(`${process.env.VUE_APP_API_URL}/deductions/items/${id}`, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          this.getResult = response.data.data;
          this.empNumber = this.getResult[0].employeeNumber
          this.employeeName = this.getResult[0].employeeName
            this.savings = this.getResult[0].savings
            this.monthlySavings = this.getResult[0].monthlySavings
            this.specialDeposit = this.getResult[0].specialDeposit
            this.monthlySpecialDeposit = this.getResult[0].monthlySpecialDeposit
            this.shortTerm = this.getResult[0].shortTerm
            this.longTerm = this.getResult[0].longTerm
            this.expectedShortTerm= this.getResult[0].expectedShortTerm 
            this.expectedLongTerm = this.getResult[0].expectedLongTerm

          console.log('Employee Number', this.empNumber)
          console.log('Employee Number 1', this.getResult[0].employeeNumber)
          this.show=true
        })
        .catch((error) => {
          console.log(error)
        });

      }
  }
}