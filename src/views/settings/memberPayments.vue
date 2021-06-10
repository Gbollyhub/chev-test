<template>
<div>
    
          <div class="content-header">Payment List</div>

         <div>
                          <div>
                            <!-- <div class="form-buttons">
                              <span></span>
                              <b-button to="/register" variant="primary" class="float-sm-left">+</b-button>
                            </div> -->
                            <b-table striped hover small :fields="fields" :items="items.data" responsive="sm">                              
                              <template #cell(index)="data">
                                {{ data.index + 1 }}
                              </template>
                              <template #cell(Eno)="data">
                                {{ data.item.member.employeeNumber }}
                              </template>
                              <template #cell(name)="data">
                                <b class="text-info">{{ data.item.member.person.lastName.toUpperCase() }}</b>,
                                <b>{{ data.item.member.person.firstName}}</b>
                              </template>
                              
                              <template #cell(amount)="data">
                                {{ data.item.loanAmount | price }}
                              </template>
                              <template #cell(loanCode)="data">
                                {{ data.item.loan.loanCode }}
                              </template>
                              <template #cell(bankName)="data">
                                {{ data.item.bankName }}
                              </template>
                              <template #cell(accountName)="data">
                                {{ data.item.accountName }}
                              </template>
                              <template #cell(accountNo)="data">
                                {{ data.item.accountNumber }}
                              </template>                              
                              <template #cell(email)="data">                                
                                {{ data.item.person.email }}
                              </template>
                              <template #cell(checkbox)>
                                <b-form-checkbox>
                                    {{data}}
                                </b-form-checkbox>
                              </template>
                            </b-table>
                          </div>
                        </div>
  
    </div>
</template>

<script>

import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      items: [],  
      fields: [
        {key: 'index', label: 'S/N'},
        { key: 'Eno', label: 'Emp.No' },
        { key: 'name', label: 'Full Name' },
        { key: 'amount', label: 'Amount' },
        { key: 'loanCode', label: 'Type' },
        { key: 'bankName', label: 'Bank Name' },
        { key: 'accountNo', label: 'Account No.' },
        { key: 'accountName', label: 'Account Name' },
        { key: 'checkbox', label: 'Select' }
      ],
    };
  },
  async created() {
    await this.initialize();
  },
  methods: {
    currentDateTime() {
      const current = new Date();
      const date = current.toDateString(); //+'-'+(current.getMonth()+1)+'-'+current.getDate();
      const time = current.getHours() + ":" + current.getMinutes(); // + ":" //+ current.getSeconds();
      const dateTime = date + " " + time;

      return dateTime;
    },
    async initialize() {        
     await axios
        .get( `${process.env.VUE_APP_API_URL}/Loans/Unpaid`,{
          headers: {
            "Content-Type": "application/json;charset=utf-8",
             Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.items = response.data;
        })
        .catch(error => {
          error.alert("Error");
        });
    }, 
  }

}
    
</script>