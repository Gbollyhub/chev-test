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
              <input type="password" class="app-login-text-field w-input" v-model.lazy="form.checkpassword" placeholder="Password" required />             
            </div>
             <div class="matches" v-if="notSamePasswords"><p><code>Passwords don't match.</code></p></div>            
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
        queryString:"",
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
    console.log("Urlcode:",this.$route.query.code)
    this.queryString = decodeURIComponent(escape(window.atob(this.$route.query.code)));    
            console.log("queryString:",this.queryString)
    this.code = this.queryString.split(':')[0];
    console.log("code:",this.code)
    this.UserId = this.queryString.split(':')[1];    
    console.log("userId:",this.UserId)
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
</script>

