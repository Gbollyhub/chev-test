<template>
    <div>
        <b-table striped hover small :fields="fields" :items="pending" responsive="sm" bordered="bordered">                              
            <template #cell(index)="data">
                {{ data.index + 1 }}
            </template>
            <template #cell(uploadedBy)="data">
                <a type="button" @click="getPendingByTag(data.item.tag)" variant="primary">
                <b class="text-info">{{ data.item.uploadedBy }}</b></a>                    
            </template>
            <template #cell(totalLoanAmount)="data">
              {{ data.item.totalLoanAmount }}                    
            </template>
            <template #cell(totalSavingsAmount)="data">
                {{ data.item.totalSavingsAmount }}                     
            </template>
            <template #cell(totalSpeciakAmount)="data">
                {{ data.item.totalSpeciakAmount }}                   
            </template>
            <template #cell(totalDeduction)="data">
                {{ data.item.totalDeduction }}                     
            </template>
            <template #cell(approved)="data">
                <span v-if="data.item.approved == false">Pending Approval</span>                    
                <span v-if="data.item.approved == true">Approved</span>                    
            </template>
            <template #cell(uploadDate)="data">
                {{ data.item.uploadDate | dayMon }}                    
            </template>           
        </b-table>

        <span v-if="getResult.length != 0">
            <b-card>
              <b-table striped hover small :fields="fields2" :items="getResult" head-variant="dark"
                :per-page="perPage"
                :current-page="currentPage"
                responsive="sm" bordered="bordered">                              
                <template #cell(index)="row">
                  {{ row.index + 1 }}
                </template>
                <template #cell(EmployeeNumber)="row">  
                  {{ row.item.employeeNumber }}
                </template>
                <template #cell(employeeName)="row">  
                  {{ row.item.employeeName }}
                </template>
                <template #cell(monthlySavings)="row">  
                  {{ row.item.monthlySavings }}
                </template>
                <template #cell(savings)="row">  
                  {{ row.item.savings }}
                </template>
                <template #cell(specialDeposit)="row">  
                  {{ row.item.specialDeposit }}
                </template>
                <template #cell(monthlySpecialDeposit)="row">  
                  {{ row.item.monthlySpecialDeposit }}
                </template>
                <template #cell(shortTerm)="row">  
                  {{ row.item.shortTerm }}
                </template>
                <template #cell(expectedLongTerm)="row">  
                  {{ row.item.expectedLongTerm }}
                </template>
                <template #cell(longTerm)="row">  
                  {{ row.item.longTerm }}
                </template>
                <template #cell(expectedShortTerm)="row">  
                  {{ row.item.expectedShortTerm }}
                </template>
              </b-table>
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                aria-controls="my-table"
            ></b-pagination>
            </b-card>
          </span>


       <!-- <b-modal
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
          <b-col>
            <b>{{empNumber}}</b>
          </b-col>          
        </b-row>

        <b-row class="mb-1 text-left">
          <b-col cols="5">Full Name</b-col>   
          <b-col>
            <b class="text-info">{{ employeeName}}</b>
          </b-col>          
        </b-row>
        <b-row class="mb-1 text-left">
          <b-col cols="5">Savings </b-col>       
          <b-col>
            {{savings}} <b/><b/>

          </b-col>          
        </b-row>
        <b-row class="mb-1 text-left">
          <b-col cols="5">Monthly Savings </b-col>   
          <b-col>
            {{monthlySavings}}
          </b-col>          
        </b-row>
        <b-row class="mb-1 text-left">
          <b-col cols="5">Special Deposit </b-col>   
          <b-col>
            {{specialDeposit}}
          </b-col>          
        </b-row>
        
        <b-row class="mb-1 text-left">
          <b-col cols="5"> monthly Special Deposit</b-col>     
          <b-col>
              {{monthlySpecialDeposit}}
          </b-col>          
        </b-row>
        <b-row class="mb-1 text-left">
          <b-col cols="5">Short Term</b-col>  
          <b-col cols="4">
            {{shortTerm}}
          </b-col>          
        </b-row>
        <b-row class="mb-1 text-left">
          <b-col cols="5">Long Term</b-col>   
          <b-col cols="4">
            {{longTerm}}
          </b-col>          
        </b-row>
        <b-row class="mb-1 text-left">
          <b-col cols="5">Expected Short Term</b-col>   
          <b-col cols="4">
            {{expectedShortTerm}}
          </b-col>          
        </b-row>
        <b-row class="mb-1 text-left">
          <b-col cols="5">Expected Long Term</b-col>  
          <b-col cols="4">
            {{expectedLongTerm}}
          </b-col>          
        </b-row>

      </b-container>

      <template #modal-footer>
        <div class="w-100">

          <b-button
            variant="danger"
            size="sm"
            class="float-right"
          >Reject</b-button>

          <b-button
            variant="primary"
            size="sm"
            class="float-left"
          >Approve</b-button>

        </div>
      </template> -->
    <!-- </b-modal> -->

    </div>
</template>
<script src="./pendingDeduct.js"></script>

<style src=".././global.css"></style>