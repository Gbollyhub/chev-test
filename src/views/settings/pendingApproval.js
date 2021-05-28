import axios from 'axios'

export default {
  data() {
    return {
        perPage: 10,
        currentPage: 1,
        show: false,
        variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
        headerBgVariant: 'primary',
        headerTextVariant: 'light',
        bodyBgVariant: 'light',
        bodyTextVariant: 'dark',
        footerBgVariant: 'danger',
        footerTextVariant: 'light',
       modules: [],
      selectedModule:null,
      approve: [],
      EmpNo:"",
      Name:"",
      Paid:Boolean,
      moduleApproverId:0,
      id:0,
      itemId:0,    
      approveData: {
        aprroved:Boolean
      },      
      selectedOpt: null,  
      fields: [
        {key: 'index', label: 'S/N'},
        { key: 'name', label: 'Full Name' },
        { key: 'employeeNumber', label: 'Employee No.' },
        { key: 'active', label: 'Status' },        
        { key: 'memberType', label: 'Member Type' },
        {key:'show_details', label: 'Action '}
      ],
      options: [
        {value: null, text: "Select Option"},
        { value: 0, text: "Pending Approval" },
        { value: 1, text: "Approved Members" }
      ]
    };
  },
  async created() {    
    await this.getAll();
    await this.initModules();
    await this.initapprove();


  },
  methods: {
    Details(detail,index) {
        this.EmpNo = detail[index].itemData.employeeNumber
        this.Name = detail[index].itemData.person.lastName.toUpperCase() +", " + detail[index].itemData.person.firstName
        this.Paid = detail[index].itemData.hasPaidFee
        this.id = detail[index].id
        this.moduleApproverId = detail[index].moduleApproverId
        this.itemId = detail[index].itemId

        this.show=true
      },
    async getAll() {        
     await axios
        .get( `${process.env.VUE_APP_API_URL}/Members/All`,{
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.approve = response.data;
        })
        .catch(error => {
          error.alert("Error");
        });
    }, 

    async initModules() {        
     await axios
        .get(`${process.env.VUE_APP_API_URL}/ModuleApprovers/Modules`,{
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        })
        .then(response => {
          this.modules = response.data;
        })
        .catch(error => {
            this.$bvToast.toast(error, {
                title: "Error",
                variant: "danger",
                solid: true,
                autoHideDelay: 5000
            });
          });
    },
    async initapprove() {
     await axios
        .get( `${process.env.VUE_APP_API_URL}/PendingApproval/Members`,{
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.approve = response.data;
        })
        .catch(error => {
          error.alert("Error");
        });
    },

    async ApproveModuleRequest(Id,ModuleApproverId,itemId) { 
      let rawData = {
        Id: Id,
        ModuleApproverId:ModuleApproverId,
        itemId:itemId,
        Approved : true
      };
      rawData = JSON.stringify(rawData);       
     await axios
        .post( `${process.env.VUE_APP_API_URL}/PendingApproval/Approve`, rawData,{
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
            this.approve = response.data;
            this.initapprove();
            this.show=false
        })
        .catch(error => {
          error.alert("Error");
        });
    },
    async RejectModuleRequest(Id,ModuleApproverId,itemId) { 
      let rawData = {
        Id: Id,
        ModuleApproverId:ModuleApproverId,
        itemId:itemId,
        Approved : false
      };
      rawData = JSON.stringify(rawData);       
     await axios
        .post( `${process.env.VUE_APP_API_URL}/PendingApproval/Approve`, rawData,{
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
            this.approve = response.data;
            this.show=false
        })
        .catch(error => {
          error.alert("Error");
        });
    }
}

};