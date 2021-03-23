<template>
<div>
          <div class="content-header">Increase and Decrease Savings</div>
      <div class="content-sub">Increase and decrease savings</div>
                    <div>
                           <strong> 
                               <b-form-group
                                label-cols="2"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Name"
                                label-for="input-sm"
                              >

                              {{user.data.person.lastName+", " +user.data.person.firstName+" " 
                              +user.data.person.middleName}}
                                <!-- <b-form-input
                                  id="name-input"
                                  v-model="user.data.person.firstName"
                                  required
                                ></b-form-input >-->
                                </b-form-group>
                               
                               <b-form-group
                                label-cols="2"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Employee Number"
                                label-for="input-sm"
                              >
                                <b-form-input
                                  id="number-input"
                                  v-model="user.data.employeeNumber"
                                  disabled
                                  required
                                ></b-form-input>
                              </b-form-group>
                              
                               <b-form-group
                                label-cols="2"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Effective Date"
                                label-for="example-datepicker"
                              >
                                <b-form-datepicker
                                  id="example-datepicker"
                                  v-model="effectiveDate"
                                  required
                                ></b-form-datepicker
                                ></b-form-group>

                                <b-form-group
                                label-cols="2"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Increase/Decrease Savings"
                                label-for="input-sm"
                                >
                                <b-form-select
                                    id="input-3"
                                    v-model="inc_dec"
                                    :options="inc_decs"
                                ></b-form-select
                                ></b-form-group>

                              <b-form-group
                                label-cols="2"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Account"
                                label-for="input-sm"
                                >
                                <b-form-select
                                    id="input-3"
                                    v-model="account"
                                    :options="accountTypes"
                                ></b-form-select
                                ></b-form-group>
                                 <b-form-group
                                label-cols="2"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Amount"
                                label-for="input-sm"
                              >
                                <b-form-input
                                  id="input-4"
                                  v-model="amount"
                                  :formatter="numberFormat"
                                ></b-form-input>
                                <span v-if="amount != ''"><code>
    {{parseFloat(this.amount.replace(/,/g, '')) | NumbersToWords | capitalize}} Naira Only
                    </code></span>
                                </b-form-group>
                           </strong>

                      <div style="margin-top:50px;" class="button-group">
           <button type="submit" @click="onSubmit" style="display:inline-block" class="app-form-button">Submit</button>
    </div>

                      </div>  
      </div>
    </template>


<script src="./IncreaseDecrease.js"></script>