<template>
    <div>
        <div class="content-header">Regular Loan Planner</div>
        <div class="form-flex">
             <!-- <div v-show="loader">
                <Loader/>
            </div>
            <Status :state="state" :closeModal = "closeModal" :message = "message" :resetState="resetState" v-if="status"/>           -->
            <div class="col-md-4">
                <div class="form-flex-col">
                    <label class="login-label">Loan Amount</label>
                    <input type="text" v-model="loanAmount" @blur="planner" v-mask="mask"
                    class="app-text-field w-input" required placeholder="Type Here" />
                    <span v-if="loanAmount != ''"><p style="color:red;font-size:12px;" >
                  {{parseFloat(this.loanAmount.replace(/,/g, '')) | NumbersToWords | capitalize}} Naira Only</p></span>
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Loan Periods (Max of 60 Months)</label>
                    <input type="text" v-model="loanPeriod" v-mask="mask" @blur="planner"
                    class="app-text-field w-input" required placeholder="Type Here" />
                    <span v-if="loanPeriod != ''"><p style="color:red;font-size:12px;" >
                  {{loanPeriod | NumbersToWords | capitalize}} Months</p></span>
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Interest Rate pa:</label>
                    <input type="text" v-model="loanData.interestRate" v-mask="mask" class="app-text-field w-input" placeholder="Type Here" />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Available For Loan</label>
                    <input type="text" v-model="loanData.availableForLoan" v-mask="mask" class="app-text-field w-input" disabled />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">30% Savings Required</label>
                    <input type="text" v-model="loanData.requiredSavings" v-mask="mask" class="app-text-field w-input" disabled />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">1/3 Repayment Period</label>
                    <input type="text" v-model="loanData.oneThirdRepaymentPeriod" v-mask="mask" class="app-text-field w-input" disabled />
                </div>         
            </div>
            <!-- <div class="col-md-8">
                <input type="number" class="app-text-field w-input" required placeholder="Type Here" />
            </div> -->
            <div class="line"></div>
            <div class="col-md-4">
                <div class="form-flex-col">
                    <label class="login-label">Min Savings Per Month(3%) on Loan</label>
                    <input type="text" v-model="loanData.minimumSavings" v-mask="mask" class="app-text-field w-input" disabled />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Actual Monthly Savings on Loan</label>
                    <input type="text" v-model="loanData.actualMonthlySavings" v-mask="mask" class="app-text-field w-input" disabled />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Principla Repayment Per Month</label>
                    <input type="text" v-model="loanData.principal" v-mask="mask" class="app-text-field w-input" disabled />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Monthly Interest</label>
                    <input type="text" v-model="loanData.interest" v-mask="mask" class="app-text-field w-input" disabled />
                </div>
                <!-- <div class="form-flex-col">
                    <label class="login-label">Total Monthly Repayment</label>
                    <input type="text" v-model="loanData.totalMonthly" v-mask="mask" class="app-text-field w-input" disabled />
                </div> -->
                <div class="form-flex-col">
                    <label class="login-label">Total</label>
                    <input type="text" class="app-text-field w-input" disabled />
                </div>         
            </div>            
        </div>
    </div>
</template>
<script>
import axios from "axios";
// import Loader from '../../components/ui/loader/loader.vue'
// import Status from '../../components/ui/state/state.vue'
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
    let currencyMask = createNumberMask({
    prefix: '',
    allowDecimal: true,
    decimalLimit :2,
    includeThousandsSeparator: true,
    allowNegative: false,
    });
export default {
    // components: {
    // Loader,
    // Status
    // },
    data() {
        return {
            mask: currencyMask,
            state: 'failed',
            status: false,
            message: '',
            loader: false,
            show: true,
            loanData:{},
            loanAmount:'',
            loanPeriod:'',
            // interestRate:'',
            // availableLoan:'',
            // savingsRequired:'',
            // thirdRepayment:'',
            // minSavings:'',
            // actualSavings:'',
            // principal:'',
            // monthlyInterest:'',
            // totalRepayment:''
        };
    },
    watch:{
        loanAmount(){
            if (this.loanAmount == '' && this.loanPeriod =='') {
                this.clearForm();
                this.loanData.interestRate = '';
            }
        }
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
                axios.post(`${process.env.VUE_APP_API_URL}/LoanConfig/planner`,Body, {
                headers: {"Content-Type": "application/json;charset=utf-8",
                Authorization: `Bearer ${localStorage.getItem('token')}`
                }
                }).then((response) => {
                    if(response.data.success == true){
                        this.loanData = response.data.data;
                    }
                }).catch(error => {
                    this.clearForm();
                    this.message = error.message
                });
            }
        },
        
    }  
};
</script>
<style></style>
