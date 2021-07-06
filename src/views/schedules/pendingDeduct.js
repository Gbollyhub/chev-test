import axios from 'axios'

export default {
  data() {
    return {
        perPage: 5,
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
            { key: 'uploadedBy', label: 'Uploaded By', class: 'text-center' },
            { key: 'totalLoanAmount', label: 'Loan Amount', class: 'text-center' },
            { key: 'totalSavingsAmount', label: 'Savings Amount', class: 'text-center' },
            { key: 'totalSpeciakAmount', label: 'Special Amount', class: 'text-center' },        
            { key: 'totalDeduction', label: 'Deduction', class: 'text-center' },
            {key:'approved', label: 'Approved', class: 'text-center'},
            {key:'uploadDate', label: 'Upload Date', class: 'text-center'}
          ],
          fields2: [
            {key: 'index', label: 'S/N', class: 'text-center'},
            { key: 'EmployeeNumber', label: 'Employee Number', class: 'text-center' },
            { key: 'employeeName', label: 'Employee Name', class: 'text-center' },
            { key: 'monthlySavings', label: 'Monthly Savings', class: 'text-center' },
            { key: 'savings', label: 'Savings Amount', class: 'text-center' },
            { key: 'specialDeposit', label: 'Special Deposit', class: 'text-center' },        
            { key: 'monthlySpecialDeposit', label: 'Monthly Special Deposit', class: 'text-center' },        
            { key: 'shortTerm', label: 'ST', class: 'text-center' },
            {key:'expectedLongTerm', label: 'Expected LT', class: 'text-center'},
            {key:'longTerm', label: 'LT', class: 'text-center'},
            {key:'expectedShortTerm', label: 'Expected ST', class: 'text-center'}
          ],
    }
  },
  async mounted() {    
    await this.initPending();
},
created() {
  // for (let i = 0; i < this.getResult.length; i++) {
  //     this.getResult.push({
  //       id: i + 1
  //     });
  //   }
  },
  computed: {
    // totalRows() {
    //   return this.getResult.length
    // }
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
          // this.empNumber = this.getResult[0].employeeNumber
          // this.employeeName = this.getResult[0].employeeName
          //   this.savings = this.getResult[0].savings
          //   this.monthlySavings = this.getResult[0].monthlySavings
          //   this.specialDeposit = this.getResult[0].specialDeposit
          //   this.monthlySpecialDeposit = this.getResult[0].monthlySpecialDeposit
          //   this.shortTerm = this.getResult[0].shortTerm
          //   this.longTerm = this.getResult[0].longTerm
          //   this.expectedShortTerm= this.getResult[0].expectedShortTerm 
          //   this.expectedLongTerm = this.getResult[0].expectedLongTerm

          console.log('Employee Number', this.empNumber)
          console.log('Employee Number 1', this.getResult[0].employeeNumber)

          this.totalRows = this.getResult.length
          this.currentPage = 1
          // this.show=true
        })
        .catch((error) => {
          console.log(error)
        });

      }
  }
}