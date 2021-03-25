import Loader from '../../components/ui/loader/loader.vue'
export default {   
    components: {
        Loader
    },
    data() {
    return {
        loader: false,
        nameState: true,
        show: true,      
        notify: 0,
        has_number: false,
        has_lowercsae: false,
        has_uppercase: false,
        has_special: false,
        form: {
            password: "",
            EmployeeNo: "",
            email: "",
            UserType: null,
            UserTypeCategory: 0
        },
        reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/ 
    };
  },
    watch:{
        password(){
            this.has_number    = /\d/.test(this.password);
            this.has_lowercase = /[a-z]/.test(this.password);
            this.has_uppercase = /[A-Z]/.test(this.password);
            this.has_special   = /[!@#%*+=._-]/.test(this.password);
        }
    },
    computed: {
      password() {
        return this.form.password.length >= 8 ? true : false
      }
    },
    methods: {        
        makeToast(variant = null) {
            this.notify++;
            this.$bvToast.toast(`Check your Email for confirmation link`, {
                title: "Successful",
                variant: variant,
                solid: true,
                autoHideDelay: 5000
            });
        },
        isEmailValid() {
      return (this.form.email == "")? "" : (this.reg.test(this.form.email)) ? 'has-success' : 'has-error';
    },
        checkFormValidity() {
        const valid = this.$refs.form.checkValidity();
        this.nameState = valid;
        return valid;
        }, 
    async onSubmit(event) {
      event.preventDefault();
      // Exit when the form isn't valid
      this.loader = true     
      if (!this.checkFormValidity()) {
        return;
      }
      let rawData = {
        Username: this.form.EmployeeNo,
        Password: this.form.password,
        Email: this.form.email,
        UserTypeCategory: parseInt(this.form.UserTypeCategory),
        UserType: 2,
        ReturnUrl: 'http://localhost:8080/confirmation'    
      };
      this.$store.dispatch('createAccout', rawData)
      .then(() =>{  
        this.loader = false;
        this.form.EmployeeNo = ''
         this.form.password = ''
        this.form.email = ''
        this.form.UserTypeCategory = 0

          this.makeToast(`success`);
                    // alert(this.$bvModal.msgBoxOk('Action completed'))
                    // this.$router.push('/register')
                    })
        .catch(err => { if (err.response.status == 400)
            this.$bvToast.toast("Kindly Fill-Up the Form", {
                title: "Warning",
                variant: "warning",
                solid: true,
                autoHideDelay: 5000
            });
            if (err.response.status == 401)
            this.$bvToast.toast(err, {
                title: "Warning",
                variant: "warning",
                solid: true,
                autoHideDelay: 5000
            });
            if (err.response.status == 500)
            this.$bvToast.toast(err.response.data.message, {
                title: "Warning",
                variant: "danger",
                solid: true,
                autoHideDelay: 5000
        })}
        )
    },
  },
    
};