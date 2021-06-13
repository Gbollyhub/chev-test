<template>
<div>
  <Status :state="state" :closeModal = "closeModal" :message = "message" :resetState="resetState" v-if="status"/>
    <div class="content-header">Internal Approval </div>
    <div>
      <div style="margin-top:50px;" class="button-group">
        <div>         
        </div>
      </div>
      <b-table
        striped
        hover
        small
        :fields="fields"
        :items="approve.data"
        responsive="sm"
      >
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
         <template #cell(employeeNumber)="data">
          <a
            type="button"
            @click="Details(approve.data, data.index)"
            variant="primary"
          >
            <b class="text-info">{{
              data.item.member.employeeNumber
            }}</b></a
          >
        </template>
        <template #cell(name)="data">
          <b class="text-info">{{
            data.item.member.person.lastName.toUpperCase()
          }}</b
          >,
          <b>{{ data.item.member.person.firstName }}</b>
        </template>
       
         <template #cell(loanAmount)="data">
          <a
            type="button"
            @click="Details(approve.data, data.index)"
            variant="primary"
          >
            <b class="text-info">{{
              data.item.loanAmount | price
            }}</b></a
          >
        </template>
        <template #cell(active)="data">
          <span v-if="data.item.status == false">Pending</span>
          <span v-if="data.item.status == true">Approved</span>
        </template>
        <template #cell(memberType)="data">
          <span v-if="data.item.member.memberType === 1"
            >Regular Member</span
          >
          <span v-if="data.item.member.memberType === 2"
            >Retiree Member</span
          >
          <span v-if="data.item.member.memberType === 3"
            >Expatriate Member</span
          >
        </template>
        <template #cell(show_details)="data">
          <span v-if="!data.item.status">
            <b-button
              variant="primary"
              @click="
                ApproveModuleRequest(
                  data.item.id,
                  data.item.moduleApproverId,
                  data.item.itemId
                )
              "
              class="float-sm-left"
              >Approve</b-button
            >
          </span>
        </template>
      </b-table>
    </div>

    <b-modal
      v-model="show"
      title="Approval"
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
            <b>{{ EmpNo }}</b>
          </b-col>
        </b-row>

        <b-row class="mb-1 text-left">
          <b-col cols="5">Full Name</b-col>
          <!-- <b-col cols="3"></b-col> -->
          <b-col>
            <b class="text-info">{{ Name }}</b>
          </b-col>
        </b-row>        
        <!-- ==========Loan Modal======= -->
          <b-row class="mb-1 text-left">
            <b-col cols="5">Loan Amount </b-col>
            <!-- <b-col cols="3"></b-col> -->
            <b-col>
              {{ LoanAmount | price }} <b /><b /> (
              {{ parseFloat(LoanAmount) | NumbersToWords | capitalize }} Naira
              Only)
            </b-col>
          </b-row>
          <b-row class="mb-1 text-left">
            <b-col cols="5">Monthly Interest </b-col>
            <!-- <b-col cols="3"></b-col> -->
            <b-col>
              {{ interest | price }}
            </b-col>
          </b-row>
          <b-row class="mb-1 text-left">
            <b-col cols="5">Monthly Principal </b-col>
            <!-- <b-col cols="3"></b-col> -->
            <b-col>
              {{ principal | price }}
            </b-col>
          </b-row>

          <b-row class="mb-1 text-left">
            <b-col cols="5"> Repayment</b-col>
            <!-- <b-col cols="3"></b-col> -->
            <b-col>
              {{ repayment }}
            </b-col>
          </b-row>
          <b-row class="mb-1 text-left">
            <b-col cols="5">Date Submitted</b-col>
            <!-- <b-col cols="3"></b-col> -->
            <b-col cols="4">
              {{ dateSubmitted | hum }}
            </b-col>
          </b-row>
          <b-row class="mb-1 text-left">
            <b-col cols="5">
              <label for="textarea-default">Comment:</label>
            </b-col>
            <b-col cols="10">
              <b-form-textarea
              id="comment"
              v-model="comment"
              placeholder="Enter comment..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
            </b-col>
          </b-row>         

       
      </b-container>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="danger"
            size="sm"
            class="float-right"
            @click="ApproveModuleRequest(id,0)"
            >Reject</b-button
          >
          <b-button
            variant="primary"
            size="sm"
            class="float-left"
            @click="ApproveModuleRequest(id,1)"
            >Approve</b-button
          >
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import Status from '../../components/ui/state/state.vue'

export default {
  components: {
    Status
},
  data() {
    return {
      state: 'failed',
      status: false,
      message: '',
      perPage: 10,
      currentPage: 1,
      show: false,
      variants: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'light',
        'dark',
      ],
      headerBgVariant: 'primary',
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'dark',
      footerBgVariant: 'danger',
      footerTextVariant: 'light',
      modules: [],
      selectedModule: null,
      approve: [],
      EmpNo: '',
      Name: '',
      LoanAmount: 0,
      Amount: 0,
      dateSubmitted: '',
      comment:"",
      interest: 0,
      principal: 0,
      repayment: 0,
      Paid: Boolean,
      moduleApproverId: 0,
      id: 0,
      itemId: 0,
      approveData: {
        aprroved: Boolean,
      },
      selectedOpt: null,
      fields: [
        { key: 'index', label: 'S/N' },
        { key: 'employeeNumber', label: 'Employee No.' },
        { key: 'name', label: 'Full Name' },
        { key: 'loanAmount', label: 'Amount' },
        { key: 'active', label: 'Status' },
        { key: 'memberType', label: 'Member Type' },
        { key: 'show_details', label: 'Action ' },
      ],
      options: [
        { value: null, text: 'Select Option' },
        { value: 0, text: 'Pending Approval' },
        { value: 1, text: 'Approved Members' },
      ],
    };
  },
  async created() {
    await this.initVerify();
  },
  methods: {
    Details(detail, index) {
        this.EmpNo = detail[index].member.employeeNumber;
        this.Name =
          detail[index].member.person.lastName.toUpperCase() +
          ', ' +
          detail[index].member.person.firstName;
        this.id = detail[index].id;
        this.moduleApproverId = detail[index].moduleApproverId;
        this.itemId = detail[index].itemId;
        this.LoanAmount = detail[index].loanAmount;
        this.dateSubmitted = detail[index].dateSubmitted;
        this.interest = detail[index].interest;
        this.principal = detail[index].principal;
        this.repayment = detail[index].repaymentPeriod;
        // this.fileDownload = [detail[index].itemData.filePath];
        // console.log('file 1: ', JSON.stringify(this.fileDownload));
        this.show = true;
    },

    // Verify Pending Request
    async initVerify() {
      await axios
         .get( `${process.env.VUE_APP_API_URL}/Loans/pending/verification`, {          
          headers: {
             "Content-Type": "application/json;charset=utf-8",
             Authorization: `Bearer ${localStorage.getItem('token')}`,
             responseType: 'arraybuffer'
           }
         })
         .then(response => {
            this.approve = response.data;
         })
         .catch(error => {
           this.message = error
            this.state = 'failed';
            this.status = true;
         });
     },
     closeModal(){
      this.status = false
  },

    async ApproveModuleRequest(Id, approve) {
      console.log("approve: ", approve)
      let rawData = {
        itemId: Id,
        Status: approve,
        Comment: this.comment
      };
      rawData = JSON.stringify(rawData);
      await axios
        .post(
          `${process.env.VUE_APP_API_URL}/Loans/verify`,
          rawData,
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        ).then(response => {
           if(response.data.success == true){              
            this.message = 'Loan was successfully Approved'
            this.state = 'success';
            this.status = true;
            this.initVerify();
            this.show = false;
            }
            if(response.data.success == false){
            this.message = response.data.errors[0].errorMessage
            this.state = 'failed';
            this.status = true;
            this.show = false;
            }
         })
         .catch(error => {
           this.message = error
            this.state = 'failed';
            this.status = true;
         });
    },    
  },
};
</script>

<style src=".././global.css"></style>
