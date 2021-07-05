<template>
  <div>
    <b-table :items="users" :fields="fields" striped responsive="sm" bordered="bordered" head-variant="dark">
      <!-- <template #cell(action)="row"> -->
          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
        <!-- <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails" >
          check to view
        </b-form-checkbox>         -->
        <!-- <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button> -->        
      <!-- </template> -->
        <template #cell(index)="row">
            {{ row.index + 1 }}
        </template>
        <template #cell(id)="row">
            <a type="button" @click="getLoanDetails(row.item.id)" variant="primary">
            <b class="text-info">{{ row.item.id }}</b></a>
        </template>
        <template #cell(loanType)="row">
            <a type="button" @click="getLoanDetails(row.item.id)" variant="primary">
            <b class="text-info">{{ row.item.loan.name }}</b>
            </a>
        </template>
        <template #cell(loanAmount)="row">
            <a type="button" @click="getLoanDetails(row.item.id)" variant="primary">
            <b class="text-info">{{ row.item.loanAmount | price }}</b></a>
        </template>

      <!-- <template #row-details="row"> -->
          <!-- <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Age:</b></b-col>
            <b-col>{{ row.item.id }}</b-col>
          </b-row> -->
          <!-- <div v-if="show==true"> -->
        
          <!-- </div> -->
      <!-- </template> -->
    </b-table>

    <b-card v-if="loanDetails">
        <b-table-simple hover small caption-top responsive>
        <b-thead>
            <b-th>
                <b-tr colspan="3" class="text-left">Loan Amount : {{loanDetails.loanAmount | price}}</b-tr>
                <b-tr colspan="3" class="text-left">Loan Principal :{{loanDetails.principal | price}}</b-tr>
                <b-tr colspan="3" class="text-left">Monthly Deduction :{{loanDetails.principal + loanDetails.interest | price}}</b-tr>
            </b-th>
            <b-th>
                <b-tr colspan="3" class="text-right">Date Collected :{{loanDetails.effectiveDate | dayMon}}</b-tr>
                <b-tr colspan="3" class="text-right">Interest :{{loanDetails.interest | price}}</b-tr>
                <b-tr colspan="3" class="text-right">Repayment Period :{{loanDetails.repaymentPeriod}}</b-tr>
            </b-th>
        </b-thead>
        </b-table-simple>
        <!-- <b-container class="bv-example-row bv-example-row-flex-cols">
          <b-row align-v="start">
            <b-col>Debit</b-col>
            <b-col>Credit</b-col>            
          </b-row>
          <b-row align-v="start">
              <b-col>Date</b-col>
              <b-col>Particulars</b-col>
              <b-col>Amount</b-col>
          </b-row>
        </b-container> -->
        <b-table-simple hover small caption-top responsive bordered="bordered" borderless="borderless">      
              <b-thead >
                <b-tr variant="secondary">
                  <b-th colspan="3" class="text-center">Debit</b-th>
                  <b-th colspan="3" class="text-center">Credit</b-th>
                </b-tr>
                <b-tr colspan="3">
                  <b-th class="text-left">Date</b-th>
                  <b-th class="text-left">Particulars</b-th>
                  <b-th class="text-left">Amount</b-th>
                  <b-col colspan="9">
                  <b-th class="text-left">Date</b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th class="text-left">Particulars</b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                  <b-th class="text-left">Amount</b-th>
                  </b-col>
                </b-tr>                
              </b-thead>
              <b-tbody>               
                  <b-td>
                      {{loanDetails.effectiveDate | dayMon}}
                  </b-td>
                  <b-td>
                      Loan amount obtained
                  </b-td>
                  <b-td>
                      {{loanDetails.loanAmount | price}}
                  </b-td>
                <b-col v-for="(r,index) in loanDetails.repayments" :key="index">
                    <b-td >
                        {{r.repaymentDate | dayMon}}
                    </b-td>
                    <b-td></b-td>
                    <b-td></b-td>
                    <b-td></b-td>
                    <b-td></b-td>
                     <b-td>
                          Loan deduction per month
                    </b-td>
                    <b-td></b-td>
                    <b-td></b-td>
                    <b-td></b-td>
                    <b-td></b-td>
                    <b-td>
                        {{r.principal | price}} 
                    </b-td>
                </b-col>
                <b-tr variant="secondary">
                  <b-th colspan="3" class="text-left">Total Debit {{loanDetails.loanAmount | price}}</b-th>
                  <b-th colspan="3" class="text-left">Total Credit: {{this.balance | price}}
                    
                  </b-th>
                </b-tr>
                <b-tr variant="secondary">
                  <b-th colspan="6" class="text-center">Loan Balance{{loanDetails.loanAmount - this.balance |price}}</b-th>
                </b-tr>
              </b-tbody>
        </b-table-simple>
        </b-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
      return {
        perPage: 10,
        currentPage: 1,
        users: [],
        loanDetails:{},
        loanAmount:"",
        debitBalance:{},
        balance:0,
        show: false,
        variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
        headerBgVariant: 'primary',
        headerTextVariant: 'light',
        bodyBgVariant: 'light',
        bodyTextVariant: 'dark',
        footerBgVariant: 'danger',
        footerTextVariant: 'light',
        fields: [
            {key: 'index', label: 'S/N',class: 'text-center'},
            { key: 'id', label: 'Loan ID',class: 'text-center' },
            { key: 'loanType', label: 'Loan Type',class: 'text-center' },
            { key: 'loanAmount', label: 'Loan Amount',class: 'text-center' },
          ],
      };
    },
    async mounted() {    
      await this.initUser();
  },
  created() {
    for (let i = 0; i < 1000; i++) {
        this.users.push({
          id: i + 1
        });
      }
    },
    computed: {
      totalRows() {
        return this.users.length
      },
      // getDebitBalance () {
      //   let balance =0
      //     for (let i = 0; i < this.loanDetails.repayments.principal.length; i++) {
      //       balance += i
      //     }
      //     return balance
        
      // }
      
    },
    methods: {  
      async initUser() {
        await axios
          .get(`${process.env.VUE_APP_API_URL}/Loans/employeenumber`, {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((response) => {
            this.users = response.data.data;
          })
          .catch((error) => {
            if (error.response.status == 401) {
              // auto logout if 401 response returned from api
              localStorage.removeItem('token')
              this.$router.push('/')
          }
          });
      },

      async getLoanDetails(id) {
        await axios
        .get(`${process.env.VUE_APP_API_URL}/Loans/ledger/${id}`, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          this.loanDetails = response.data.data;
          console.log(this.show)
          console.log(this.loanDetails)
          console.log(this.loanDetails.repayments)
          this.balance=0
          for (let i =0; i < this.loanDetails.repayments.length; i++) {
            this.balance += this.loanDetails.repayments[i].principal
          }
          console.log('balance',this.balance)       

        })
        .catch((error) => {
          // alert(error)
          if (error.response.status == 401) {
            // auto logout if 401 response returned from api
            localStorage.removeItem('token')
            this.$router.push('/')
        }
        });

      },      
    }
  }
</script>