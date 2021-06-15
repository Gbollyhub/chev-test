<template>
    <div>
             <div class="app-login-section">
    <div class="app-login-col-1">
      <div class="app-login-bg-cover">
        <div style="text-align:center" class="app-login-logo"><img src="../../assets/images/chevron-cemcs-logo.png" width="150px" alt="" class="app-logo-img"/></div>
      </div>
    </div>
    <div class="app-login-col-2">
      <div v-show="loader">
         <Loader/>
      </div>

      <!-- { errorAlert ? <ErrorAlert closeErrorAlert = { closeErrorAlert } errorAlertText = { errorText } /> : '' } -->
      <h2 class="login-header">Reset Password</h2>
      <div class="login-sub">Kindly type in your new password.</div>
      <form @submit.prevent="onSubmit">
      <div class="w-form">      
          <div class="app-login-form-group">
              <label class="login-label">New Password</label>
              <div>
                <input class="app-login-text-field w-input"
                  :type="passwordVisible ? 'text' : 'password'"
                  v-model="form.password" placeholder="Password" required />
                    <button class="visibility" tabindex='-1' @click.prevent="togglePasswordVisibility" 
                      :arial-label="passwordVisible ? 'Hide password' : 'Show password'">                  
                        <b-icon :icon="passwordVisible ? 'eye-fill' : 'eye-slash-fill' "></b-icon>
                    </button>
              </div>
                <div v-if="passwordValidation.errors.length > 0 && !submitted && form.password !== ''"  class='hints'>
                  <p v-for="error in passwordValidation.errors" :key="error"><code>{{error}}</code></p>
                </div>
              </div>
            <div class="app-login-form-group">
              <label class="login-label">Confirm Password</label>
              <input type="password" class="app-login-text-field w-input" v-model="form.checkPassword" placeholder="Password" required />             
             <div class="matches" v-if="notSamePasswords && form.checkPassword.length !== form.password && form.checkPassword !==''">
               <p style="color:red;font-size:14px;">Passwords don't match.</p></div>            
            </div>
      </div>
      <button type="submit" class="app-login-button">Reset Password</button>
      </form>
      <div class="app-login-divider"></div></div>
  </div>
</div>
</template>

<script>
import Loader from '../../components/ui/loader/loader.vue'
import axios from 'axios'
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
        ReturnUrl:"",
        UserId:"",
        code:"",
        form: {
            password: "",
            checkPassword:''
        },
        rules: [
          { message:'One lowercase letter required.', regex:/[a-z]+/ },
          { message:"One uppercase letter required.",  regex:/[A-Z]+/ },
          { message:"One number required.", regex:/[0-9]+/ },
          { message:'One special character required.', regex:/[!@#%*+=._-]/ }
        ],
        passwordVisible:false,
        submitted:false,
      };
  },
  
  created() {
    this.code = decodeURIComponent(escape(window.atob(this.$route.query.code)));
    this.UserId = this.$route.query.user;
  },
  computed: {
		notSamePasswords () {
			if (this.passwordsFilled) {        
        console.log(true)
				return (this.form.password !== this.form.checkPassword)
			} else {
				return false
			}
		},
		passwordsFilled () {
			return (this.form.password !== '' && this.form.checkPassword !== '')
		},
		passwordValidation () {
			let errors = []
			for (let condition of this.rules) {
				if (!condition.regex.test(this.form.password)) {
					errors.push(condition.message)
				}
			}
			if (errors.length === 0) {
				return { valid:true, errors }
			} else {
				return { valid:false, errors }
			}
		}
	},
    methods: {      
      resetPasswords () {
        this.password = ''
        this.checkPassword = ''
        this.submitted = true
        setTimeout(() => {
          this.submitted = false
        }, 2000)
      },
      togglePasswordVisibility () {
        this.passwordVisible = !this.passwordVisible
      },
        makeToast(variant = null) {
            this.notify++;
            this.$bvToast.toast(`Check your Email for confirmation link`, {
                title: "Successful",
                variant: variant,
                solid: true,
                autoHideDelay: 5000
            });
        },
        
    async onSubmit(event) {
      event.preventDefault();
      // Exit when the form isn't valid
      if (this.passwordValidation.errors.length !=0) {
       return this.$bvToast.toast("Invaild password string", {
                title: "Warning",
                variant: "danger",
                solid: true,
                autoHideDelay: 5000})
      }
      if (this.notSamePasswords) {
        return false
      }
      this.loader = true 
      

      let rawData = {
        Code: this.code,
        UserId: this.UserId,
        Password: this.form.password,
        ReturnUrl: `/`    
      };
      rawData=JSON.stringify(rawData);
      await axios
          .post(`${process.env.VUE_APP_API_URL}/Users/ResetPassword`,rawData,{
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }).then(() =>{  
        this.loader = false;
        this.form.password = ''
        this.makeToast(`success`);
        })
        .catch(err => { 
            this.loader = false;
            this.$bvToast.toast(err.response.data.message, {
                title: "Warning",
                variant: "warning",
                solid: true,
                autoHideDelay: 5000
            });
          }
        )
    },
  },
    
};
</script>

