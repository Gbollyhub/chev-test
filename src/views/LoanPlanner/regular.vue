<template>
    <div>
        <div class="content-header">Regular Loan Planner</div>
        <div class="form-flex">
            <div class="col-md-4">
                <div class="form-flex-col">
                    <label class="login-label">Loan Amount</label>
                    <input type="text" class="app-text-field w-input" required placeholder="Type Here" />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Loan Periods (Max of 60 Months)</label>
                    <input type="text" class="app-text-field w-input" required placeholder="Type Here" />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Interest Rate pa:</label>
                    <input type="text" class="app-text-field w-input" required placeholder="Type Here" />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Available For Loan</label>
                    <input type="text" class="app-text-field w-input" required placeholder="Type Here" />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">30% Savings Required</label>
                    <input type="text" class="app-text-field w-input" required disabled />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">1/3 Repayment Period</label>
                    <input type="text" class="app-text-field w-input" required disabled />
                </div>         
            </div>
            <div class="col-md-8">
                <input type="number" class="app-text-field w-input" required placeholder="Type Here" />
            </div>
            <!-- <div class="line"></div> -->
            <div class="col-md-4">
                <div class="form-flex-col">
                    <label class="login-label">Min Savings Per Month(3%) on Loan</label>
                    <input type="text" class="app-text-field w-input" required disabled />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Actual Monthly Savings on Loan</label>
                    <input type="text" class="app-text-field w-input" required disabled />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Principla Repayment Per Month</label>
                    <input type="text" class="app-text-field w-input" required disabled />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Monthly Interest</label>
                    <input type="text" class="app-text-field w-input" required disabled />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Total Monthly Repayment</label>
                    <input type="text" class="app-text-field w-input" required disabled />
                </div>
                <div class="form-flex-col">
                    <label class="login-label">Total</label>
                    <input type="text" class="app-text-field w-input" required disabled />
                </div>         
            </div>            
        </div>
    </div>
</template>