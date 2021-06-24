<template>
    <div>
        <b-table sticky-header striped hover small :fields="fields"
       :items="ledgerList" responsive="sm" head-variant="dark" bordered="bordered"
       :per-page="perPage" :current-page="currentPage">                              
                <template #cell(index)="data">
                    {{ data.index + 1 }}
                </template>
                <template #cell(savingsType)="data">                  
                    <span v-if="data.item.savingsType == 1">Savings</span>
                    <span v-if="data.item.savingsType == 2">Deposit</span>
                </template>
                 <template #cell(TransactionTypeId)="data">                  
                    {{data.item.transactionType.name }}
                </template>               
                <template #cell(CurrentBalance)="data">
                  {{
                    data.item.currentBalance | price
                  }}
              </template>
              <template #cell(PreviousBalance)="data">
                  {{
                    data.item.previousBalance | price
                  }}
              </template>
              <template #cell(DepositAmount)="data">
                  {{
                    data.item.depositAmount | price
                  }}
              </template>
               <template #cell(transactionDate)="data">
                  {{
                    data.item.transactionDate | hum
                  }}
              </template>
                <template #cell(active)="data">
                    <span v-if="data.item.status == false">Unpaid</span>
                    <span v-if="data.item.status == true">Paid</span>
                </template>
            </b-table>
            <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            aria-controls="my-table"
            ></b-pagination>
    </div>    
</template>
<script src="./ledger.js"></script>
