<template>
<div>
    <div v-show="loader">
         <Loader/>
      </div>
    <Status :state="state" :closeModal = "closeModal" :message = "message" :resetState="resetState" v-if="status"/>

          <div class="content-header">Payment List</div>
          <div>
                <div>
                            <!-- <b-table striped hover small :fields="fields" :items="items.data" responsive="sm">                              
                              <template #cell(index)="data">
                                {{ data.index + 1 }}
                              </template>
                              <template #cell(Eno)="data">
                                {{ data.item.member.employeeNumber }}
                              </template>
                              <template #cell(name)="data">
                                <b class="text-info">{{ data.item.member.person.lastName.toUpperCase() }}</b>,
                                <b>{{ data.item.member.person.firstName}}</b>
                              </template>
                              
                              <template #cell(amount)="data">
                                {{ data.item.loanAmount | price }}
                              </template>
                              <template #cell(loanCode)="data">
                                {{ data.item.loan.loanCode }}
                              </template>
                              <template #cell(bankName)="data">
                                {{ data.item.bankName }}
                              </template>
                              <template #cell(accountName)="data">
                                {{ data.item.accountName }}
                              </template>
                              <template #cell(accountNo)="data">
                                {{ data.item.accountNumber }}
                              </template>                              
                              <template #cell(email)="data">                                
                                {{ data.item.person.email }}
                              </template>
                              <template #cell(checkbox)>
                                <b-form-checkbox>
                                    {{data}}
                                </b-form-checkbox>
                              </template>
                            </b-table> -->

        <ejs-grid ref='grid' id='Grid' :dataSource='items' :toolbar='toolbarOptions' 
        height='272px' :allowExcelExport='true' :toolbarClick='excelExport' :allowResizing='true'
        :allowPaging='true' :allowTextWrap='true' :textWrapSettings='wrapSettings' 
        :selectionSettings='selectionOptions' :rowSelected='rowSelected'>
            <e-columns>
                <e-column type='checkbox' headerText='Select' width='50'></e-column>
                <e-column field='member.employeeNumber' headerText='Employee Number' textAlign='Center' width=120></e-column>
                <e-column field='member.person.lastName' headerText='Full Name' width=150  :valueAccessor="nameAccess" textAlign='Center'></e-column>
                <e-column field='loanAmount' headerText='Amount (₦)' textAlign='Center' format='N2' width=150></e-column>
                <e-column field='loan.loanCode' headerText='Type' textAlign='Center' width=60></e-column>
                <e-column field='bankName' headerText='Bank Name' textAlign='Center' width=150></e-column>
                <e-column field='accountName' headerText='Account Number' textAlign='Center' width=150></e-column>
                <e-column field='accountNumber' headerText='Account Name' textAlign='Center' width=150></e-column>
            </e-columns>
        </ejs-grid>
                          </div>
    
    </div>  
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Loader from '../../components/ui/loader/loader.vue'
import Status from '../../components/ui/state/state.vue'
import { GridPlugin,Toolbar, ExcelExport,Resize,Page } from "@syncfusion/ej2-vue-grids";
Vue.use(GridPlugin);
export default {
  name: "Home",
  components: {
    Loader,
    Status,
  },
  data() {
    return {
        state: 'failed',
      status: false,
      message: '',
      loader: false,
      toolbarOptions: ['ExcelExport'],
      pageSettings: { pageSize: 5, pageCount:5 },
      wrapSettings: { wrapMode: 'Both' },
      selectionOptions: { type: 'Multiple'
        //   checkboxMode: 'ResetOnRowClick'      
      },
      fullName:"",
      items: [],  
      fields: [
        {key: 'index', label: 'S/N'},
        { key: 'Eno', label: 'Emp.No' },
        { key: 'name', label: 'Full Name' },
        { key: 'amount', label: 'Amount' },
        { key: 'loanCode', label: 'Type' },
        { key: 'bankName', label: 'Bank Name' },
        { key: 'accountNo', label: 'Account No.' },
        { key: 'accountName', label: 'Account Name' },
        { key: 'checkbox', label: 'Select' }
      ],
    };
  },
  async created() {
    await this.initialize();
  },
  provide: {
        grid: [Resize,Page,Toolbar, ExcelExport]
    },
  methods: {
    currentDateTime() {
      const current = new Date();
      const date = current.toDateString(); //+'-'+(current.getMonth()+1)+'-'+current.getDate();
      const time = current.getHours() + ":" + current.getMinutes(); // + ":" //+ current.getSeconds();
      const dateTime = date + " " + time;

      return dateTime;
    },
    nameAccess(field, items) { 
      return items[field] + ', '+ items['member.person.firstName'];  // Concatenate column  
    },
    currencyFormatter(field,items) { return '₦' + items[field];},

//     rowSelected: function(args) {
//     // let selectedrowindex = this.$refs.grid.getSelectedRowIndexes();  // Get the selected row indexes.
//     // alert(selectedrowindex); // To alert the selected row indexes.
//     let selectedrecords = this.$refs.grid.getSelectedRecords();  // Get the selected records.
    
// },


    async initialize() {        
     await axios
        .get( `${process.env.VUE_APP_API_URL}/Loans/Unpaid`,{
          headers: {
            "Content-Type": "application/json;charset=utf-8",
             Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.items = response.data.data;
        //   this.items= {
        //     fullName=response.data.data.member.person.lastName.toUpperCase() + response.data.data.member.person.firstName
        //   }
        })
        .catch(error => {
          error.alert("Error");
        });
    },
        excelExport(args) {
            let gridRef = this.$refs.grid; // To export all the grid
            let selectedRecords = gridRef.getSelectedRecords() // To export selected records
            if (args['item'].id.indexOf("excelexport") != -1) {
            let exportProperties = {
                dataSource: selectedRecords,
                fileName: "paymentList.xlsx"
                };
                gridRef.excelExport(exportProperties);
                }

            // if (args['item'].id.indexOf("pdfexport") != -1) {
            //       let selectedRecords = gridRef.getSelectedRecords();
            //       let exportProperties = {
            //           dataSource: selectedRecords
            //         };
            //           gridRef.pdfExport(exportProperties);
            //     }
              
        },
  }

}
    
</script>
 <style>
  /* @import "../../../node_modules/@syncfusion/ej2-vue-grids/styles/material.css"; */
  @import url("https://cdn.syncfusion.com/ej2/ej2-grids/styles/material.css");
</style> 
