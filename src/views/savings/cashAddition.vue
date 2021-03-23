<template>
<div>
          <div class="content-header">Cash Addition</div>
      <div class="content-sub">Make a cash addition</div>
                      <div >
                        <strong>
                          <b-form-group
                            label-cols="2"
                            label-cols-lg="3"
                            label-size="sm"
                            label="Name"
                            label-for="input-sm"
                          >
                            {{
                              user.data.person.lastName +
                                ', ' +
                                user.data.person.firstName +
                                ' ' +
                                user.data.person.middleName
                            }}
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
                          <!-- <b-row class="my-1 form-row mb-3">
                          <b-col sm="3">
                    <b-form-select
                    v-model="effectiveMonth" disabled
                    :options="Months"
                    value-field="value"
                    text-field="name"
                ></b-form-select></b-col>
                    <b-col sm="3"><b-form-input
                    :id="`DateExpected`"
                    v-model="effectiveYear" disabled
                    type="text"
                    ></b-form-input>
                </b-col></b-row> -->
                            <date-picker class='input-group date down' :state="effectiveDate"
                                 v-model="effectiveDate" :config="options"></date-picker>
                          </b-form-group>

                          <b-form-group
                            label-cols="2"
                            label-cols-lg="3"
                            label-size="sm"
                            label="Account Type"
                            label-for="input-sm"
                          ><b-form-select
                              id="input-3"
                              v-model="account"
                              :options="accountTypes"
                            ></b-form-select
                          ></b-form-group>

                          <b-form-group
                            label-cols="2"
                            label-cols-lg="3"
                            label-size="sm"
                            label="Amount Desired"
                            label-for="input-sm"
                          ><b-form-input
                              id="input-4"
                              v-model.trim="amount"
                              :formatter="numberFormat"
                            ></b-form-input >
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


<script src="./cashAddition.js"></script>