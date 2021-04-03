<template>
<div>
          <div class="content-header">Apply for a Loan</div>
      <div class="content-sub">Make a loan request</div>
          <div v-if="this.errors != ''">            
            <b-alert
                variant="danger"
                dismissible
                fade
                :show="showDismissibleAlert"
                @dismissed="showDismissibleAlert=false"
            >{{this.errors}} 
            </b-alert>
            </div>
             <div v-if="!this.result">
                <b-alert variant="danger"
                    dismissible
                    fade
                    :show="showDismissibleAlert"
                    @dismissed="showDismissibleAlert=false" >
                    <ul>
                        <li v-for="item in result.errors" :key="item.errors">
                            {{item.errorMessage}}
                        </li>
                    </ul>              
                </b-alert>
             </div>
            
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
            class="pt-1 form-label"
            label-cols="4"
            label-cols-lg="4"
            label-size="sm"
            label="Loan Type"
            label-for="sm"
            >
            <b-form-select
                id="loantype"
                v-model="selectedLoan"
                @change="getConfig(selectedLoan)"
                required
            >                                               
                <b-form-select-option :value="null" disabled>
                    -- Select LoanType -- 
                </b-form-select-option>
                <b-form-select-option 
                v-for="item in items" 
                :value="item.loanId"
                :key="item.loan.id">
                    {{item.loan.name}} 
                </b-form-select-option>
            </b-form-select >                      
            <br/>
            </b-form-group>
            <div v-if="mType === 1">
                <b-row class="my-1 form-row mb-3 ">
                <b-col sm="4">
                <label class="pt-1 form-label"
                    >Expected Lump Sum Type<code>*</code></label
                >
                </b-col>
                <b-col sm="8">
                <b-form-select
                    v-model="expectedLumpSum"
                    :options="lumpSums"
                    @change="LumpSumDate(expectedLumpSum)"
                ></b-form-select>
                </b-col>
                </b-row> 
                
                <b-row class="my-1 form-row mb-3">
                <b-col sm="4">
                    <label
                    class="pt-1 form-label"
                    >Date Expected MM/YY <code>*</code></label
                    >
                </b-col>
                <b-col sm="4">
                    <b-form-select
                    v-model="effectMonth" disabled
                    :options="Months"
                    value-field="value"
                    text-field="name"
                ></b-form-select></b-col>
                    <b-col sm="3"><b-form-input
                    :id="`DateExpected`"
                    v-model="effectYear" disabled
                    type="text"
                    ></b-form-input>
                </b-col>
                </b-row>
                <b-row class="my-1 form-row mb-3">
                <b-col sm="4">
                    <label
                    class="pt-1 form-label"
                    >Amount Expected <code>*</code></label
                    >
                </b-col>
                <b-col sm="8">
                    <b-form-input
                    :id="`AmountExpected`"
                    v-model="amountExpected"
                    :formatter="numberFormat"
                    type="text"
                    ></b-form-input>
                    <span v-if="amountExpected != ''"><code>
    {{parseFloat(this.amountExpected.replace(/,/g, '')) | NumbersToWords | capitalize}} Naira Only
                    </code></span>
                </b-col>
                </b-row>
                <b-row class="my-1 form-row mb-3">
                <b-col sm="4">
                    <label
                    class="pt-1 form-label"
                    >Amount Desired <code>*</code></label
                    >
                </b-col>
                <b-col sm="8">
                    <b-form-input
                    :id="`AmountDesire`"
                    type="text"
                    v-model.trim="loanAmount"                                                                                
                    :formatter="numberFormat"
                    @blur="AmountValidation"
                    required
                    ></b-form-input>
                    <span v-if="loanAmount != ''"><code>
    {{parseFloat(this.loanAmount.replace(/,/g, '')) | NumbersToWords | capitalize}} Naira Only
                    </code></span>
                </b-col>
                </b-row>
            </div>
            <div v-if="mType  >= 2">
                <b-row class="my-1 form-row mb-3">
                <b-col sm="4">
                    <label
                    class="pt-1 form-label"
                    >Loan Amount <code>*</code></label
                    >
                </b-col>                                    
                <b-col sm="8">
                    <b-form-input
                    :id="`Amount`"
                    v-model.lazy.trim="loanAmount"
                    :max="maxLoanAmount" :min="minLoanAmount"
                    @blur="AmountValidation"
                    @change="getGuarantor"
                    type="text"                                                                               
                    :formatter="numberFormat"
                    required
                    ></b-form-input>
                    <span v-if="loanAmount != ''"><code>
    {{parseFloat(this.loanAmount.replace(/,/g, '')) | NumbersToWords | capitalize}} Naira Only
                    </code></span>
                </b-col>
                
                </b-row>
                <b-row class="my-1 form-row mb-3">
                <b-col sm="4">
                    <label
                    class="pt-1 form-label"
                    >Effective Date MM/YY <code>*</code></label
                    >
                </b-col>
                <b-col sm="3">
                    <b-form-select
                    v-model="this.effectiveMonth" disabled
                    :options="Months"
                    value-field="value"
                    text-field="name"
                ></b-form-select></b-col>
                    <b-col sm="3"><b-form-input
                    :id="`DateExpected`"
                    v-model="effectiveYear" disabled
                    type="text"
                    ></b-form-input>
                </b-col>
                </b-row>
                
                <b-row class="my-1 form-row mb-3">
                <b-col sm="4">
                    <label
                    class="pt-1 form-label"
                    >Repayment Period (months)
                    <code>*</code></label
                    > 
                </b-col>                                                                       
                <b-col sm="8">
                    <b-form-input
                    :id="`payment period`"
                    v-model.lazy="minMonthlyRepayPeriod"
                    :max="this.MaxRepayPeriod" :min="this.MinRepayPeriod"
                    type="number"
                    @blur="RepaymentValidation" 
                    ></b-form-input>
                </b-col>
                </b-row>

                <b-row class="my-1 form-row mb-3">
                <b-col sm="4">
                    <label class="pt-1 form-label"
                    >Rate (%) <code>*</code></label
                    >
                </b-col>
                <b-col sm="8">
                    <b-form-input
                    disabled
                    :id="`Rate`"
                    v-model="details.intrestRate"
                    type="text"
                    ></b-form-input>
                </b-col>
                </b-row>
            </div>

            <div v-if="(mType === 2 && loanAmount.length > 9) || (selectedLoan === 4) || (selectedLoan === 1)" >              
                            
              <span v-if="guarant.data !== 0">
                  <div class="header_2">Guarantors</div>
                
                <div class="wrapper" id='#gt' v-for="n in guarant.data" :key="n">          
                  <b-row class="my-1 form-row mb-3">
                  <!-- <b-col sm="4">
                      <label
                      class="pt-1 form-label"                                       
                      >Employee Number<code>*</code></label
                      >
                  </b-col> -->
                  <!-- {{ this.guarantorNumber }} -->
                  <b-col sm="8">
                      <label
                      class="pt-1 form-label"                                       
                      >Employee Number<code>*</code></label
                      >
                      <b-form-input
                      :id="`guarantorNumber${n}`"
                      v-model.lazy.trim="grant.guarantorNumber[n]"
                      @blur="getGuarantorInfo(grant.guarantorNumber[n])"
                      type="number"
                      required
                      ></b-form-input>
                  </b-col>
                  </b-row>
                  <b-row class="my-1 form-row mb-3">
                  <!-- <b-col sm="4">
                      <label
                      class="pt-1 form-label"
                      >Name <code>*</code></label>
                  </b-col> -->
                  <b-col sm="8">
                      <label
                      class="pt-1 form-label"
                      >Name <code>*</code></label>
                      <b-form-input
                      v-bind:id="`name-${n}`"
                      v-model="grant.guarantorName[n]"
                      type="text"
                      required
                      ></b-form-input>
                  </b-col>
                  </b-row>
                  <b-row class="my-1 form-row mb-3">
                  <!-- <b-col sm="4">
                      <label
                      class="pt-1 form-label"
                      >Email Address  <code>*</code></label>
                  </b-col> -->
                  <b-col sm="10">
                      <label
                      class="pt-1 form-label"
                      >Email Address  <code>*</code></label>
                      <b-form-input
                      v-bind:id="`name-${n}`"
                      v-model="grant.guarantorEmail[n]"
                      type="text"
                      required
                      @blur="addGrant(grant.guarantorNumber[n],grant.guarantorName[n],grant.guarantorEmail[n])"
                      ></b-form-input>
                  </b-col>
                  </b-row>
                </div>
              </span>
              <!-- <span v-if="guarant.data === 0">
                <div>
                  <strong> Not Enough Years of Experience for Loan the Request</strong><br/>
                </div>
              </span> -->
            </div>
            <div class="header_2">Method Of Collection</div>
            <b-row class="my-1 form-row mb-3 ">
                <b-col sm="4">
                <label class="pt-1 form-label" 
                    >Bank <code>*</code></label
                >
                </b-col>
                <b-col sm="8">
                <!-- <b-form-select
                    v-model="form.bankcode"
                    :options="banks"
                    required
                ></b-form-select> -->
                <b-form-select
                id="banks"
                v-model="form.bankcode"
                required
            >                                               
                <b-form-select-option :value="null" disabled>
                    -- Select Bank -- 
                </b-form-select-option>
                <b-form-select-option 
                v-for="item in banks.data" 
                :value="item.bankCode"
                :key="item.id">
                    {{item.bankName}} 
                </b-form-select-option>
            </b-form-select >
                </b-col>
            </b-row>
            <b-row class="my-1 form-row mb-3">
                <b-col sm="4">
                <label class="pt-1 form-label" 
                    >Account Number <code>*</code></label
                >
                </b-col>
                <b-col sm="8">
                <b-form-input
                    id="`Account Number`"
                    v-model="form.accountNumber"
                    @blur="verifyAcc"
                    type="number"
                    aria-describedby="input-live-help input-live-feedback"
                    trim
                    required
                ></b-form-input>
               <div v-if="form.accountNumber.length !== 10 && form.accountNumber !== ''">
                  <p style="color:red;font-size:12px;" >Account Number must be 10 digits</p>
                </div>
                </b-col>
            </b-row>
            <b-row class="my-1 form-row mb-3">
                <b-col sm="4">
                <label
                    class="pt-1 form-label"                                      
                    >Beneficiary Name <code>*</code></label
                >
                </b-col>
                <b-col sm="8">
                <b-form-input
                    disabled
                    id="`Beneficiary`"
                    v-model="name.data"
                    type="text"
                    required
                ></b-form-input>
                </b-col>
            </b-row>
    <div style="margin-top:50px;" class="button-group">
          <button type="reset" style="background:#c00;display:inline-block;margin-right:30px" class="app-form-button">Reset</button>
           <button type="submit" style="display:inline-block" class="app-form-button">Submit</button>
    </div>
            </b-form>
      </div>
    </template>


<script src="./requestLoan.js"></script>