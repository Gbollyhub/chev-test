<template>
    <div>
        <div class="content-header">Target Loan Planner</div>
        <div class="form-flex">
            <div class="col-md-4">
                <div class="form-flex-col">
                    <label class="login-label">Lump Sum Type</label>
                    <b-form-select class="app-text-field w-input"
                        v-model="selectedLumpSum"
                        :options="lumpSums"
                        @change="LumpSum(selectedLumpSum)">
                    </b-form-select>
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Amount Expected</label>
                    <input type="text" v-model="amountExpected" class="app-text-field w-input" required placeholder="Type Here" />
                    <span v-if="amountExpected != ''"><p style="color:red;font-size:12px;" >
                   {{parseFloat(this.amountExpected.replace(/,/g, '')) | NumbersToWords | capitalize}} Naira Only</p></span>
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Loan Amount</label>
                    <input type="text" v-model="loanAmount" class="app-text-field w-input" required placeholder="Type Here" />
                    <span v-if="loanAmount != ''"><p style="color:red;font-size:12px;" >
                   {{parseFloat(this.loanAmount.replace(/,/g, '')) | NumbersToWords | capitalize}} Naira Only</p></span>
               
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Loan Period  (Months)</label>
                    <input type="text" v-model="loadPeriod" class="app-text-field w-input" required placeholder="Type Here" />
                    <span v-if="loanPeriod != ''"><p style="color:red;font-size:12px;" >
                  {{loanPeriod | NumbersToWords | capitalize}} Months</p></span>
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Interest Rate pa:</label>
                    <input type="text" v-model="interestRate" class="app-text-field w-input" required disabled />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Monthly Interest</label>
                    <input type="text" v-model="monthlyInterest" class="app-text-field w-input" required disabled />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Total Interest Over Tenor</label>
                    <input type="text" v-model="totalInterest" class="app-text-field w-input" required disabled />
                </div>       
            </div>
            <div class="col-md-8">
                <input type="number" class="app-text-field w-input" required placeholder="Type Here" />
            </div>
                        
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            selectedLumpSum:null,
            loanId:0,
            loanAmount:0,
            amountExpected:0,
            loadPeriod:0,
            lumpSums: [
                { text: "---Select Lump Sum---", value: null },
                { value: 1, text: "Annual Rent Subsidy" },
                { value: 2, text: "Security Allowance" },
                { value: 3, text: "Generator Maintenance/ Diesel Allowance" },
                { value: 4, text: "Annual Productivity Bonus"}
            ], 
        };
    },
    methods: {
        planner() {
            let Body = {
                loanId: 3,
                loanAmount: parseInt(this.loanAmount),
                repaymentPeriod: parseInt(this.loanPeriod),
            }            
            Body = JSON.stringify(Body); 
            if (this.loanPeriod != ''){
                this.loader = true;
                axios.post(`${process.env.VUE_APP_API_URL}/LoanConfig/planner`,Body, {
                headers: {"Content-Type": "application/json;charset=utf-8",
                Authorization: `Bearer ${localStorage.getItem('token')}`
                }
                }).then((response) => {
                    if(response.data.success == true){
                        this.message = response.data.message
                        this.loader = false;
                        this.state = 'success';
                        this.status = true;
                        this.clearForm();
                        this.loanData = response.data.data;
                    }else {
                        this.message = response.data.errors[0].errorMessage
                        this.loader = false;
                        this.status = true;
                        this.state = 'failed';
                        this.clearForm();
                    }
                }).catch(error => {
                    this.clearForm();
                    this.message = error.message
                    this.loader = false;
                    this.status = true;
                    this.state = 'failed';
                });
            }
        },
        
    }   
};
</script>
<style></style>