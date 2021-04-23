<template>
<div>
        <div v-show="loader">
         <Loader/>
      </div>
       <Status :state="state" :closeModal = "closeModal" :message = "message" :resetState="resetState" v-if="status"/>
          <div class="content-header">Make a Transfer</div>
      <div class="content-sub">Transfer to own Account</div>
      <form @submit.prevent="onSubmit">
        <div class="form-flex">
          <div class="form-flex-col">
            <label class="login-label">Balance</label>
            <input type="text" class="app-text-field w-input" 
            v-model="memberBalance.specialDepositBalance" v-mask="mask" required disabled />
            <span v-if="memberBalance.specialDepositBalance != ''"><p style="color:red;font-size:12px;" >
                  {{memberBalance.specialDepositBalance | NumbersToWords | capitalize}} Naira Only</p></span>
          </div>
          <div class="form-flex-col">
            <label class="login-label">Transfer Amount</label>
            <input type="text" class="app-text-field w-input" 
            v-model="amount" v-mask="mask"  required placeholder="Type Here" />
            <span v-if="amount != ''"><p style="color:red;font-size:12px;" >
    {{parseFloat(this.amount.replace(/,/g, '')) | NumbersToWords | capitalize}} Naira Only
                    </p></span>
          </div>
          <div class="form-flex-col">
            <label class="login-label">Effective Date</label>
            <date-picker class='input-group date'
              v-model="effectiveDate" :config="options"></date-picker>
          </div>
          <div class="form-flex-col">
            <label class="login-label">Source Account</label>
            <!-- <input type="number" class="app-text-field w-input" required placeholder="Type Here" /> -->
           <select  v-model="sourceAccount" class="app-select w-input">
                 <option v-for="item in accountTypes" :key="item.value" :value="item.value">{{item.text}}</option>
                </select>
          </div>
          <div class="form-flex-col">
            <label class="login-label">Destination Account</label>
             <select  v-model="destAccount" class="app-select w-input">
                 <option v-for="item in accountTypes" :key="item.value" :value="item.value">{{item.text}}</option>
                </select>
          </div>
        </div>
        <button type="submit" class="app-form-button">Submit</button>
      </form>
  
      </div>
    </template>

<script src="./transfer.js"></script>
