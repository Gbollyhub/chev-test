<template>
  <div>
    <div class="content-header">Deductions</div>
      <div class="content-sub">Upload file</div>
      <div class="form-flex">
          <div class="form-flex-col">
            <label class="login-label">Transactions Month</label>
                  <b-form-select
                    v-model="transactionMonth"
                    :options="Months" required
                  ></b-form-select>         
          </div>
          <div class="form-flex-col">
            <label class="login-label">Transactions Year</label>
            <input type="text" class="app-text-field w-input" 
            v-model="transactionYear" required disabled />            
          </div>
          <div class="form-flex-col button_group">
            <input type="file" @change="onChange" id="upload" 
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
          </div>
          <div class="form-flex-col">
            <b-button type="submit" @click="onSubmit" variant="primary">Submit</b-button>
          </div>
      </div>
    <div  v-if="excellist.length !== 0">
      <vue-excel-editor v-model="excellist" :change="onChange"/>
        <!-- <vue-excel-column field="EmployeeNumber"   label="Employee Number" />
        <vue-excel-column field="EmployeeName"   label="Employee Name" />
        <vue-excel-column field="Savings"  label="Savings" />
        <vue-excel-column field="ShortTerm" label="Short Term" />
        <vue-excel-column field="LongTerm"    label="Long Term" />
        <vue-excel-column field="Car"  label="Car" />
        <vue-excel-column field="Appliances"  label="Appliances" />
        <vue-excel-column field="SpecialDeposit"  label="Special Deposit" />
        <vue-excel-column field="Executive"  label="Executive" /> -->
      <!-- </vue-excel-editor> -->
      <!-- <el-table
        max-height="600"
        :data="excellist"
        v-loading="tableLoading"
        :span-method="objectSpanMethod"
        border
        style="width: 100%"
      >
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          v-for="(item, i) in excellist"
          :key="i"
        ></el-table-column>
      </el-table> -->
    </div>


  </div>

  

  
</template>

<script>
import XLSX from "xlsx"
import moment from 'moment'
import axios from 'axios'

export default {
  name: "Home",
  data(){
      return{
          mData:{},
          dataArr: [], // Table content data array
          excellist:{},          // countArr: {}, // Analyze the table data and header to get a cross reference array for user-defined consolidation. For the time being, this article only writes the basis, and does not introduce the automatic consolidation of cells~~My other articles have custom merge implementation methods~
          tableColumn: [], // Table header configuration array
          tableLoading: false, // Whether the table is loading
          transactionMonth: null,
          transactionYear: moment(new Date().toLocaleString()).format("YYYY"),
          Months: [
        { text: "---Select Transaction Month---", value: null, disabled: true },
          { value: 1, text: "January", },
          { value: 2, text: "February", },
          { value: 3, text: "March", },
          { value: 4, text: "April" },
          { value: 5, text: "May" },
          { value: 6, text: "June"},
          { value: 7, text: "July" },
          { value: 8, text: "August" },
          { value: 9, text: "September" },
          { value: 10, text: "October"},
          { value: 11, text: "November" },
          { value: 12, text: "December"}
        ],
      }
  },
  methods: {
    onChange(e) 
    {
      const files = e.target.files;
      console.log('File: ',files);
      if (!files.length) {
        return ;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        return alert("The upload format is incorrect. Please upload xls or xlsx format");
      }
      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary"
          });
          const wsname = workbook.SheetNames[0]; // Take the first sheet，wb.SheetNames[0] :Take the name of the first sheet in the sheets
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // Generate JSON table content，wb.Sheets    Get the data of the first sheet
          this.excellist = [];  // Clear received data
          // Edit data
          for (var i = 0; i < ws.length; i++) {
            this.excellist.push(ws[i]);
          }
          console.log("Read results", this.excellist[5].EmployeeName); // At this point, you get an array containing objects that need to be processed

          // const a = workbook.Sheets[workbook.SheetNames[0]];
          // const headers = this.getHeader(a);
          // const cellValues = this.getCell_Values(a);
          // console.log('headers', headers);
          // console.log('Values', cellValues);

        } catch (e) {
          return alert("Read failure!" + e);;
        }
      };
      fileReader.readAsBinaryString(files[0]);
      // var input = document.getElementById("upload");
      // input.value = "";
    },
    // onChange(event)  {
    //   this.file = event.target.files ? event.target.files[0] : null;
    //   if (this.file) {
    //     const reader = new FileReader();

    //     reader.onload = (e) => {
    //       /* Parse data */
    //       const bstr = e.target.result;
    //       const wb = XLSX.read(bstr, { type: 'binary' });
    //       /* Get first worksheet */
    //       const wsname = wb.SheetNames[0];
    //       const ws = wb.Sheets[wsname];
    //       /* Convert array of arrays */
    //       this.mData = XLSX.utils.sheet_to_json(ws, { header: 1 });
    //     }

    //     reader.readAsBinaryString(this.file);
    //   }
    // },

    getHeader(sheet) {
      const headers = [];
      const range = XLSX.utils.decode_range(sheet["!ref"]); // worksheet['!ref'] Is the valid range of the worksheet
      let C;
      /* Get cell value start in the first row */
      const R = range.s.r; //Line / / column C
      for (C = range.s.c; C <= range.e.c; ++C) {
        var cellHeader =
          sheet[
            XLSX.utils.encode_cell({ c: C, r: R })
          ]; /* Get the cell value based on the address  find the cell in the first row */
        
        headers.push(cellHeader);
      }
      return headers;
    },

    getCell_Values(sheet) {
      const cellValue = [];

      const range = XLSX.utils.decode_range(sheet["!ref"]);
      
      for(var R = range.s.r + 1; R <= range.e.r; ++R) {
        for(var C = range.s.c; C <= range.e.c; ++C) {
          var cell_address = sheet [XLSX.utils.encode_cell({c:C, r:R})];

        cellValue.push(cell_address);

        }
      }
      return cellValue;
    },

    async onSubmit() {
      // let formData = new FormData();
      let Deduct = [];
      for( var i = 0; i < this.excellist.length; i++ ){
            // this.Deduct.push(excellist[i]);
            Deduct.push(
              {
                EmployeeNumber:this.excellist[i].EmployeeNumber.toString(),
                EmployeeName:this.excellist[i].EmployeeName,
                Savings:this.excellist[i].Savings,
                SpecialDeposit:this.excellist[i].SpecialDeposit,
                LongTerm:this.excellist[i].LongTerm,
                ShortTerm:this.excellist[i].ShortTerm
              }
            )
      }

      // let Deduct =[
      //   {
      //     EmployeeNumber:this.excellist.EmployeeNumber,
      //     EmployeeName:"",
      //     Savings:100000,
      //     SpecialDeposit:120000,
      //     LongTerm:137500,
      //     ShortTerm:0
      //   }
      // ]
      let rawData = {
        TransactionMonth: this.transactionMonth,
        TransactionYear: parseInt(this.transactionYear),
        Deductions: Deduct
      }
      rawData = JSON.stringify(rawData);
      await axios
        .post(
          `${process.env.VUE_APP_API_URL}/deductions/upload`,
          rawData,
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((response) => {
          this.rawData = response.data;
          this.makeToast(`success`);
          
        })
        .catch(error => {
          this.$bvToast.toast(error.message, {
                title: "Error",
                variant: "danger",
                solid: true,
                autoHideDelay: 5000
            });
        });
    },

    
  }
};
</script>