<template><div>
       <div class="content-header">Approval Details</div>
          <div>
            <div style="margin-top:50px;" class="button-group">
              <!-- <div>
                  <b-row class="my-1 form-row mb-3 ">
                    <b-col sm="4">
                      <b-form-select
                        v-model="selectedOpt"
                        :options="options"
                      ></b-form-select>
                    </b-col>
                  </b-row>
              </div> -->
              <div>
                <b-row class="my-1 form-row mb-3 ">
                  <b-col sm="4">
                    <b-form-select
                      :id="`modules`"
                      v-model="selectedModule"
                      @change="init(selectedModule)"
                      required>
                      <b-form-select-option :value="null" disabled>
                        -- Select Module -- 
                      </b-form-select-option>
                      <b-form-select-option 
                      v-for="item in modules.data" 
                      :value="item.id"
                      :key="item.id">
                        {{item.name}} 
                      </b-form-select-option>                      
                    </b-form-select>
                  </b-col>
                </b-row>
              </div>
            </div>
            <div v-if="selectedModule >= 3">
              <b-table striped hover small :fields="fields" :items="approve.data" responsive="sm">                              
                <template #cell(index)="data">
                    {{ data.index + 1 }}
                </template>
                <template #cell(employeeNum)="data">
                  <a type="button" @click="Details(approve.data, data.index)" variant="primary">
                  <b class="text-info">{{ data.item.itemData.member.employeeNumber }}</b></a>                    
                </template>
                <template #cell(name)="data">
                    <b class="text-info">{{ data.item.itemData.member.person.lastName.toUpperCase() }}</b>,
                    <b>{{ data.item.itemData.member.person.firstName}}</b>
                </template>                
                <template #cell(loanAmount)="data">
                <a
                  type="button"
                  @click="Details(approve.data, data.index)"
                  variant="primary"
                ><span v-if="selectedModule ==3">
                  <b class="text-info">{{
                    data.item.itemData.loanAmount | price
                  }}</b></span>
                  <span v-if="selectedModule ==4">
                  <b class="text-info">{{
                    data.item.itemData.depositAmount | price
                  }}</b></span>
                  
                  </a
                >
              </template>
                <template #cell(active)="data">
                    <span v-if="data.item.approved == null">Pending</span>
                    <span v-if="data.item.approved == true">Approved</span>
                </template>
                <template #cell(memberType)="data">
                    <span v-if="data.item.itemData.member.memberType === 1">Regular</span>
                    <span v-if="data.item.itemData.member.memberType === 2">Retiree</span>
                    <span v-if="data.item.itemData.member.memberType === 3">Expatriate</span>
                </template>
                <template #cell(show_details)="data">
                    <span v-if="!data.item.approved">
                      <b-button variant="primary" @click="ApproveModuleRequest(data.item.id, data.item.moduleApproverId, data.item.itemId,)" 
                      class="float-sm-left">Approve</b-button>                                    
                    </span>
                    </template>
            </b-table>
              
            </div>
            <div v-if="selectedModule == 2">
            <b-table striped hover small :fields="fields" :items="approve.data" responsive="sm">                              
                <template #cell(index)="data">
                    {{ data.index + 1 }}
                </template>
                <template #cell(employeeNum)="data">
                  <a type="button" @click="Details(approve.data, data.index)" variant="primary">
                  <b class="text-info">{{ data.item.itemData.employeeNumber }}</b></a>                    
                </template>
                <template #cell(name)="data">
                    <b class="text-info">{{ data.item.itemData.person.lastName.toUpperCase() }}</b>,
                    <b>{{ data.item.itemData.person.firstName}}</b>
                </template>                
                <template #cell(loanAmount)="data">
                <a
                  type="button"
                  @click="Details(approve.data, data.index)"
                  variant="primary"
                >
                  <span v-if="data.item.itemData.memberType === 1">{{50000 | price}}</span>
                  <span v-if="data.item.itemData.memberType === 2">{{10000 | price}}</span>
                  <span v-if="data.item.itemData.memberType === 3">{{10000 | price}}</span>                  
                  </a
                >
              </template>
                <template #cell(active)="data">
                    <span v-if="data.item.approved == null">Pending</span>
                    <span v-if="data.item.approved == true">Approved</span>
                </template>
                <template #cell(memberType)="data">
                    <span v-if="data.item.itemData.memberType === 1">Regular</span>
                    <span v-if="data.item.itemData.memberType === 2">Retiree</span>
                    <span v-if="data.item.itemData.memberType === 3">Expatriate</span>
                </template>
                <template #cell(show_details)="data">
                    <span v-if="!data.item.approved">
                      <b-button variant="primary" @click="ApproveModuleRequest(data.item.id, data.item.moduleApproverId, data.item.itemId,)" 
                      class="float-sm-left">Approve</b-button>                                    
                    </span>
                    </template>
            </b-table>
            </div>
      </div>
  
        <b-modal
            v-model="show"
            title= "Approval"
            :header-bg-variant="headerBgVariant"
            :header-text-variant="headerTextVariant"
            :body-bg-variant="bodyBgVariant"
            :body-text-variant="bodyTextVariant"
            >
      <b-container class="justify-content-md-center">
          <b-row class="mb-1 text-left">
          <b-col cols="5"><b>Employees Number</b></b-col>          
          <!-- <b-col cols="3"></b-col> -->
          <b-col>
            <b>{{EmpNo}}</b>
          </b-col>          
        </b-row>

        <b-row class="mb-1 text-left">
          <b-col cols="5">Full Name</b-col>       
          <!-- <b-col cols="3"></b-col> -->
          <b-col>
            <b class="text-info">{{ Name}}</b>
          </b-col>          
        </b-row>
        <span v-if="selectedModule == 2">
        <b-row class="mb-1 text-left">
          <b-col cols="5">Status</b-col>       
          <!-- <b-col cols="3"></b-col> -->
          <b-col>
            <span v-if="Paid === true">Paid</span>
            <span v-if="Paid === false">Not-Paid</span>
          </b-col>          
        </b-row>
        </span>
        <!-- ==========Loan Modal======= -->
        <span v-if="selectedModule == 3">
        <b-row class="mb-1 text-left">
          <b-col cols="5">Loan Amount </b-col>       
          <!-- <b-col cols="3"></b-col> -->
          <b-col>
            {{LoanAmount | price}} <b/><b/>
   ( {{parseFloat(LoanAmount) | NumbersToWords | capitalize}} Naira Only)

          </b-col>          
        </b-row>
        <b-row class="mb-1 text-left">
          <b-col cols="5">Interest </b-col>       
          <!-- <b-col cols="3"></b-col> -->
          <b-col>
            {{interest | price}}
          </b-col>          
        </b-row>
        <b-row class="mb-1 text-left">
          <b-col cols="5">Principal </b-col>       
          <!-- <b-col cols="3"></b-col> -->
          <b-col>
            {{principal | price}}
          </b-col>          
        </b-row>
        
        <b-row class="mb-1 text-left">
          <b-col cols="5"> Repayment</b-col>       
          <!-- <b-col cols="3"></b-col> -->
          <b-col>
              {{repayment}}
          </b-col>          
        </b-row>
        <b-row class="mb-1 text-left">
          <b-col cols="5">Date Submitted</b-col>       
          <!-- <b-col cols="3"></b-col> -->
          <b-col cols="4">
            {{dateSubmitted | hum}}
          </b-col>          
        </b-row>
        <b-row class="mb-1 text-left">
          <b-col cols="5">Effective from </b-col>       
          <!-- <b-col cols="3"></b-col> -->
          <b-col cols="4">
            {{effectiveDate | hum}}
          </b-col>          
        </b-row>
        <b-row class="mb-1 text-left">
          <b-button @click="download(fileDownload)">Download payslip </b-button>          
        </b-row>
        </span>

        <!-- ============SavingDeposit Modal============ -->
        <span v-if="selectedModule == 4">
        <b-row class="mb-1 text-left">
          <b-col cols="5">{{transactionTypeName}} Amount </b-col>       
          <!-- <b-col cols="3"></b-col> -->
          <b-col>
            {{Amount | price}} <b/><b/>
   ( {{parseFloat(Amount) | NumbersToWords | capitalize}} Naira Only)

          </b-col>          
        </b-row>
        <b-row class="mb-1 text-left">
          <b-col cols="5">Transaction Date</b-col>       
          <!-- <b-col cols="3"></b-col> -->
          <b-col cols="4">
            {{transactionDate | hum}}
          </b-col>          
        </b-row>
        </span>

      </b-container>

      <template #modal-footer>
        <div class="w-100">

          <b-button
            variant="danger"
            size="sm"
            class="float-right"
            @click="RejectModuleRequest(id,moduleApproverId,itemId,false)"
          >Reject</b-button>

          <b-button
            variant="primary"
            size="sm"
            class="float-left"
            @click="RejectModuleRequest(id,moduleApproverId,itemId,true)"
          >Approve</b-button>

        </div>
      </template>
    </b-modal>


</div>
</template>

<script src="./pendingApproval.js"></script>

<style src=".././global.css"></style>


