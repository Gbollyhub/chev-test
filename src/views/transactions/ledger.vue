<template>
    <div>
        <!-- <b-table sticky-header striped hover small :fields="fields"
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
            </b-table> -->

            <b-table-simple hover small caption-top responsive bordered="bordered">
              <caption>Ledger:</caption>
              <colgroup><col><col></colgroup>
              <colgroup><col><col><col></colgroup>
              <colgroup><col><col></colgroup>
              <b-thead >
                <b-tr variant="secondary">
                  <b-th colspan="3" class="text-center">Debit</b-th>
                  <b-th colspan="3" class="text-center">Credit</b-th>
                </b-tr>
                <b-tr colspan="3">
                  <b-th class="text-center">Date</b-th>
                  <b-th class="text-center">Particulars</b-th>
                  <b-th class="text-center">Amount</b-th>
                  <b-th class="text-center">Date</b-th>
                  <b-th class="text-center">Particulars</b-th>
                  <b-th class="text-center">Amount</b-th>
                </b-tr>                
              </b-thead>
              <b-tbody>
                <tr v-for="(debt,index) in ledgerList.debits" :key="index">
                  <td>
                      {{debt.transactionDate | dayMon}}
                  </td>
                  <td >
                    {{debt.particulars}}
                  </td>
                  <td >
                      {{parseFloat(debt.amount) | price }}
                  </td>
                </tr>
                <tr v-for="(cred,index) in ledgerList.credits" :key="index">
                  <td>
                      {{cred.transactionDate | dayMon}}
                  </td>
                  <td >
                    {{cred.particulars}}
                  </td>
                  <td >
                      {{parseFloat(cred.amount) | price }}
                  </td>
                </tr>
                <b-tr variant="secondary">
                  <b-th colspan="3" class="text-center">Total Debit {{parseFloat(ledgerList.totalDebit) | price }}</b-th>
                  <b-th colspan="3" class="text-center">Total Credit {{parseFloat(ledgerList.totalCredit) | price}}</b-th>
                </b-tr>
              </b-tbody>
              <b-tfoot>
                <b-tr>
                  <b-td colspan="6" variant="secondary" class="text-center">
                    Total Balance: <b> {{parseFloat(ledgerList.totalBalance) | price }} </b>
                  </b-td>
                </b-tr>
              </b-tfoot>
            </b-table-simple>
            <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            aria-controls="my-table"
            ></b-pagination>
    </div>    
</template>
<script src="./ledger.js"></script>
