<template>
<div>
          <div class="content-header">Make a Transfer</div>
      <div class="content-sub">Transfer to own Account</div>
      <form>
        <div class="form-flex">          
          <!-- <div class="form-flex-col">
            <label class="login-label">Employee No.</label>
            <input type="number" class="app-text-field w-input" required placeholder="Type Here" />
          </div>
          <div class="form-flex-col">
            <label class="login-label">Name</label>
            <input type="text" class="app-text-field w-input" required placeholder="Type Here" />
          </div> -->
          <div class="form-flex-col">
            <label class="login-label">Balance</label>
            <input type="text" class="app-text-field w-input" 
            v-model="balance" v-mask="mask" required placeholder="Type Here" />
            <span v-if="balance != ''"><p style="color:red;font-size:12px;" >
    {{parseFloat(this.balance.replace(/,/g, '')) | NumbersToWords | capitalize}} Naira Only
                    </p></span>
          </div>
          <div class="form-flex-col">
            <label class="login-label">Transfer Amount</label>
            <input type="text" class="app-text-field w-input" 
            v-model="amount" v-mask="mask"  required placeholder="Type Here" />
            <span v-if="amount != ''"><p style="color:red;font-size:12px;" >
    {{parseFloat(this.amount.replace(/,/g, '')) | NumbersToWords | capitalize}} Naira Only
                    </p></span>
          </div>
          <!-- <div class="form-flex-col">
            <label class="login-label">Date</label>
            <date-picker class='input-group date down'
                v-model="effectiveDate" :config="options"></date-picker>
          </div> -->
          <div class="form-flex-col">
            <label class="login-label">Effective Date</label>
            <date-picker class='input-group date down'
              v-model="effectiveDate" :config="options"></date-picker>
          </div>
          <div class="form-flex-col">
            <label class="login-label">Source Account</label>
            <!-- <input type="number" class="app-text-field w-input" required placeholder="Type Here" /> -->
          <b-form-select
              id="input-3"
              name="input-account"
              v-model="sourceAccount"
              :options="accountTypes"
              required
            ></b-form-select>
          </div>
          <div class="form-flex-col">
            <label class="login-label">Destination Account</label>
            <!-- <input type="number" class="app-text-field w-input" required placeholder="Type Here" /> -->
          <b-form-select
              id="input-3"
              name="input-account"
              v-model="destAccount"
              :options="accountTypes"
              required
            ></b-form-select>
          </div>
        </div>
        <button type="submit" class="app-form-button">Submit</button>
      </form>
  
      </div>
    </template>

<script src="./transfer.js"></script>
