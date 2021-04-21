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
                    <input type="text" class="app-text-field w-input" required placeholder="Type Here" />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Loan Amount</label>
                    <input type="text" class="app-text-field w-input" required placeholder="Type Here" />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Loan Period  (Months)</label>
                    <input type="text" class="app-text-field w-input" required placeholder="Type Here" />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Interest Rate pa:</label>
                    <input type="text" class="app-text-field w-input" required disabled />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Monthly Interest</label>
                    <input type="text" class="app-text-field w-input" required disabled />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Total Interest Over Tenor</label>
                    <input type="text" class="app-text-field w-input" required disabled />
                </div>       
            </div>
            <div class="col-md-8">
                <input type="number" class="app-text-field w-input" required placeholder="Type Here" />
            </div>
                        
        </div>
    </div>
</template>
<script>
// import axios from "axios";
export default {
    data() {
        return {
            selectedLumpSum:null,
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
        
    }  
};
</script>
<style></style>