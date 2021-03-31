<template>
<div>
          <div class="content-header">Apply for a Loan</div>
      <div class="content-sub">Make a loan request</div>
          <div v-if="this.errors != ''">
            <!-- <b-alert show variant="danger" fade dismissible >
                {{this.errors}}
            </b-alert> -->
            <b-alert
                variant="danger"
                dismissible
                fade
                :show="showDismissibleAlert"
                @dismissed="showDismissibleAlert=false"
            >
                {{this.errors}}
            </b-alert>
            </div>

            <b-form class="form">
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
                <label class="pt-1 form-label" :for="lumpSum"
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
                <!-- <b-row class="my-1 form-row mb-3">
                <b-col sm="4">
                    <label
                    class="pt-1 form-label"
                    :for="DateExpected"
                    >Date Expected <code>*</code></label
                    >
                </b-col>
                <b-col sm="8">
                    <b-form-input
                    :id="`DateExpected`"
                    type="date"
                    ></b-form-input>
                </b-col>
                </b-row> -->
                <b-row class="my-1 form-row mb-3">
                <b-col sm="4">
                    <label
                    class="pt-1 form-label"
                    for="DateExpected"
                    >Date Expected MM/YY <code>*</code></label
                    >
                </b-col>
                <b-col sm="4">
                    <b-form-select
                    v-model="effectiveMonth" disabled
                    :options="Months"
                    value-field="value"
                    text-field="name"
                ></b-form-select></b-col>
                    <b-col sm="3"><b-form-input
                    id="DateExpected"
                    v-model="effectiveYear" disabled
                    type="text"
                    ></b-form-input>
                </b-col>
                </b-row>
                <b-row class="my-1 form-row mb-3">
                <b-col sm="4">
                    <label
                    class="pt-1 form-label"
                    :for="AmountExpected"
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
                    :for="AmountDesire"
                    >Amount Desired <code>*</code></label
                    >
                </b-col>
                <b-col sm="8">
                    <b-form-input
                    :id="`AmountDesire`"
                    type="text"
                    v-model.trim="loanAmount"                                                                                
                    :formatter="numberFormat"
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
                    for="DateExpected"
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
                    id="DateExpected"
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
                    <label class="pt-1 form-label" for="Rate"
                    >Rate (%) <code>*</code></label
                    >
                </b-col>
                <b-col sm="8">
                    <b-form-input
                    disabled
                    id="Rate"
                    v-model="details.intrestRate"
                    type="text"
                    ></b-form-input>
                </b-col>
                </b-row>
            </div>

            <div v-if="(mType === 2 && loanAmount.length > 0) || (selectedLoan === 4) || (selectedLoan === 1)" >              
              <div class="header_2">Guarantors</div>
              
              <span v-if="guarantorArray.length !== 0">
                
                <div class="content" v-for="(guarantor, index) in guarantorArray" :key="index">          
                  <b-row class="my-1 form-row mb-3">
                  <b-col sm="4">
                      <label
                      class="pt-1 form-label"                                       
                      >Employee Number<code>*</code></label
                      >
                  </b-col>
                  <!-- {{ this.guarantorNumber }} -->
                  <b-col sm="8">
                      <b-form-input
                      v-model.lazy.trim="guarantor.guarantorNumber"
                      @blur="getGuarantorInfo(guarantor.guarantorNumber, index)"
                      type="number"
                      ></b-form-input>
                  </b-col>
                  </b-row>
                  <b-row class="my-1 form-row mb-3">
                  <b-col sm="4">
                      <label
                      class="pt-1 form-label"
                      >Name <code>*</code></label>
                  </b-col>
                  <b-col sm="8">
                      <b-form-input
                      readonly
                      :value="guarantor.guarantorName"
                      type="text"
                      ></b-form-input>
                  </b-col>
                  </b-row>
                  <b-row class="my-1 form-row mb-3">
                  <b-col sm="4">
                      <label
                      class="pt-1 form-label"
                      >Email Address  <code>*</code></label>
                  </b-col>
                  <b-col sm="8">
                      <b-form-input
                      readonly
                     :value="guarantor.guarantorEmail"
                      type="text"
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
                <b-form-select
                    v-model="form.bankcode"
                    :options="banks"
                ></b-form-select>
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
                    :max="10"
                    @blur="verifyAcc"
                    type="number"
                    :state="accNum"
                    aria-describedby="input-live-help input-live-feedback"
                    trim
                ></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">
                  Account Number must be 10 digits
                </b-form-invalid-feedback>
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
                ></b-form-input>
                </b-col>
            </b-row>
            </b-form>
    <div style="margin-top:50px;" class="button-group">
          <button @click="reset" style="background:#c00;display:inline-block;margin-right:30px" class="app-form-button">Reset</button>
           <button @click="saveLoan" style="display:inline-block" class="app-form-button">Submit</button>
    </div>
      </div>
    </template>


<script src="./requestLoan.js"></script>