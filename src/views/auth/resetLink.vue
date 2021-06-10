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
      <h2 class="login-header">Forgot password</h2>
      <div class="login-sub">Kindly fill in your registered email address.</div>
      <form @submit.prevent="onSubmit">
      <div class="w-form">
         <div class="app-login-form-group">
          <label class="login-label">Email Address</label>
          <input type="email" class="app-login-text-field w-input"  v-model="form.email" required placeholder="Email Address" />
        </div>         
    </div><div style="text-align:center;text-decoration:underline;">
      <button type="submit" class="app-login-button">Send Link</button></div>
      </form><br>
      <router-link to="/"> <div style="text-align:center;text-decoration:underline;">Log into your account</div> </router-link>
     <div class="app-login-divider"></div>
      <div class="app-login-notice">
        <div class="app-login-notice-col-1"></div>
        <!-- <div class="app-login-notice-col-2">Experiencing any problem with loging into your account ? Kindly contact the super admin to help resolve your issues.</div> -->
        <div class="app-login-notice-col-2">For support kindly contact  the Administrator (admin-email@whereever.com).</div>
      </div>
    </div>
     
  </div>
            </div>
</template>

<script>

import axios from "axios";
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
        form: {
            returnUrl: "",
            email: "",
        },
        submitted:false,
        reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/         
      };
  },  
    methods: {     
        isEmailValid() {
      return (this.form.email == "")? "" : (this.reg.test(this.form.email)) ? 'has-success' : 'has-error';
    }, 
        
    async onSubmit(event) {
      event.preventDefault();
      // Exit when the form isn't valid
      this.loader = true
      let rawData = {
        Email: this.form.email,
        ReturnUrl: `${process.env.BASE_API_URL}/resetPassword`    
      };     
      await axios
          .post(`${process.env.VUE_APP_API_URL}/Users/ForgotPassword`,rawData,{
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }).then(() =>{  
        this.loader = false;
        this.form.email = ''
        this.$bvToast.toast("Password reset link sent!", {
                title: "success",
                variant: "success",
                solid: true,
                autoHideDelay: 6000
            });
        })
        .catch(err => { if (err.response.status == 400)
            this.$bvToast.toast("Kindly type in your Email Address", {
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

