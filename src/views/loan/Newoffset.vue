<template>
<div>
          <div class="content-header">Loan Offset</div>
      <div class="content-sub">Fill the following to continue</div>
      <div class="summary-flex">
          <div class="div-block-2">
            <div class="slide-card-header">Monthly Savings</div>
            <div class="slide-card-value">{{memberBalance.monthlyDeductions | price}}</div>
          </div>
          <div class="div-block-2">
            <div class="slide-card-header">Savings Balance</div>
            <div class="slide-card-value">₦ {{memberBalance.savingsBalance}}</div>
          </div>
          <div class="div-block-2">
            <div class="slide-card-header">Special Deposit Balance</div>
            <div class="slide-card-value">₦ {{memberBalance.specialDepositBalance}}</div>
          </div>
      </div>
      <form  @submit="onSubmit" @reset="onReset" v-if="show">
        <div class="form-flex">
            <div class="form-flex-col">
                <label class="login-label">Loan Type</label>
                <select class="app-select w-input" id="loantype"
                        v-model="selectedLoan"
                        required>
                    <option :value="null" disabled>Select Loan Type</option>
                    <option v-for="item in items" 
                        :value="item.loanId"
                        :key="item.loan.id">
                            {{item.loan.name}} 
                    </option>
                </select>
            </div>
            <div class="form-flex-col">
                <label class="login-label">Mode of Offset</label>
                <span v-if="selectedLoan === null ">
                    <select  class="app-select w-input" v-model="form.modeOffset">                
                        <option :value="null" disabled>Select Offset Mode</option>
                    </select>
                </span>
                <span  v-if="selectedLoan === 1 || (memberLogin.memberType === 1 && selectedLoan <= 6) ">
                    <select  class="app-select w-input" v-model="form.modeOffset">
                        <option :value="null" disabled>Select Offset Mode</option>
                        <option :value="1">Savings</option>
                        <option :value="2">Special Deposit</option>
                        <option :value="3">Transfer</option>
                        <option :value="4">Savings and Special Deposit</option>
                        <option :value="5">Savings and Transfer</option>
                        <option :value="6">Transfer and Special Deposit</option>
                    </select>
                    </span>
                    <span v-if="selectedLoan === 3 && memberLogin.memberType === 2">
                        <select  class="app-select w-input" v-model="form.modeOffset">
                        <option :value="null" disabled>Select Offset Mode</option>
                        <option :value="1">Savings</option>
                        </select>
                    </span>
          </div>
          <div v-if="selectedLoan >= 7">
              <b-card-text>
                  Sorry No Loan Offset for Target Loan 
              </b-card-text>
          </div>
            <div v-else class="form-flex">
          <div class="form-flex-col">
               <label class="login-label">Date</label>
                <input type="date" class="app-text-field w-input" v-model="form.todayDate" 
                required disabled />
          </div>
        <div class="form-flex-col">
            <label class="login-label">Location</label>
            <input type="text" class="app-text-field w-input" v-model="memberLogin.location" required disabled />
        </div>
        <div class="form-flex-col">
            <label class="login-label">Repayment Period</label>
            <input type="text" class="app-text-field w-input" v-model="runningLoan.repaymentPeriod"
            required disabled />
        </div>
        <div class="form-flex-col">
            <label class="login-label">Amount of Loan Collected</label>
            <input type="text" class="app-text-field w-input" v-model="runningLoan.loanAmount" v-mask="mask"
            required disabled />
            <span v-if="runningLoan.loanAmount != ''"><code>
            {{ parseFloat(runningLoan.loanAmount) | NumbersToWords | capitalize}} Naira Only
            </code></span>
        </div>         
        <div class="form-flex-col">
            <label class="login-label">Offset Amount</label>
            <input type="text" v-model="calcOffsetAmount" v-mask="mask"
            class="app-text-field w-input" required disabled />
            <span v-if="calcOffsetAmount != ''"><code>
            {{ parseFloat(calcOffsetAmount) | NumbersToWords | capitalize}} Naira Only
            </code></span>
        </div>
        <div v-if="form.modeOffset ==1 || form.modeOffset== 4 || form.modeOffset== 5" class="form-flex-col">
                <label class="login-label">Savings Amount</label>
                <input type="text" v-model="form.cashAmount" v-mask="mask"
                class="app-text-field w-input" required placeholder="Type Here" />
                <span v-if="form.cashAmount != ''"><code>
                {{parseFloat(this.form.cashAmount.replace(/,/g, '')) | NumbersToWords | capitalize}} Naira Only
                </code></span>
        </div>
        <div v-if="form.modeOffset ==2 || form.modeOffset== 4 || form.modeOffset== 6" class="form-flex-col">
                <label class="login-label">Deposit Amount</label>
                <input type="text" v-model="form.depositAmount" v-mask="mask" 
                class="app-text-field w-input" required placeholder="Type Here" />
                <span v-if="form.depositAmount != ''"><code>
                {{parseFloat(form.depositAmount.replace(/,/g, '')) | NumbersToWords | capitalize}} Naira Only
                </code></span>
        </div>
            <div v-if="form.modeOffset ==3 || form.modeOffset== 5 || form.modeOffset== 6" class="form-flex-col">
                <label class="login-label">Transfer Amount</label>
                <input type="text" v-model="form.transferAmount" v-mask="mask" 
                class="app-text-field w-input" required placeholder="Type Here" />
                <span v-if="form.transferAmount != ''"><code>
                {{parseFloat(form.transferAmount.replace(/,/g, '')) | NumbersToWords | capitalize}} Naira Only
                </code></span>
        </div>
           <div class="form-flex-col">
               <label class="login-label">Receipt Dated</label>
            <input type="date" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
          
            <div class="form-flex-col">
                <label class="login-label">Evidence of Payment</label>
                <input type="file" id="myFile" name="filename">
            </div>
          </div>
      </div>
          <div style="margin-top:50px;" class="button-group">
          <!-- <div type="reset" style="background:#c00;display:inline-block;margin-right:30px" class="app-form-button">Cancel</div>
           <div type="submit" style="display:inline-block" class="app-form-button">Submit</div> -->
            <b-button type="reset" style="background:#c00;display:inline-block;margin-right:30px" class="app-form-button">Cancel</b-button>
           <b-button type="submit" style="display:inline-block" class="app-form-button">Submit</b-button>
    </div>
      </form>
  
      </div>
    </template>

    <script src ="./Newoffset.js"></script>