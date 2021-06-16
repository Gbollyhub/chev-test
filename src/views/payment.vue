<template>
	<div class="login-page">
		<img src="../assets/images/login-bg.svg" alt="" id="bg" />
		<header class="sticky-top headernav">
			
		</header>
        <section class="container">
            <div class="login-main row justify-content-md-center">
                <div class="col-md-6 col-sm-12">
                    <div class="row justify-content-md-center">
                        You will be redirected to make a member registration fee of 10,000
                        Kindly Click the button to proceed.                        
                    </div><br/>                     
                    <div class="col-md-4 col-sm-12">
                        <flutterwave-pay-button
                            :tx_ref="generateReference()"
                            :amount=10000
                            currency='NGN'
                            payment_options="card,ussd"
                            redirect_url=""
                            class="login-btn"
                            style=""
                            :meta="{consumer_id: this.form.userName ,consumer_mac: 'kjs9s8ss7dd' }"
                            :customer="{ name: this.form.fname+','+this.form.lname,
                            email: this.form.email, 
                            phone_number: this.form.mobileNo}"
                            :customizations="{  title: 'Registration Fee' ,
                            description: 'Chevron CEMCS Corporative Registration Fee'  ,
                            logo : 'https://flutterwave.com/images/logo-colored.svg' }"
                            :callback="makePaymentCallback"
                            :onclose="closedPaymentModal"
                        >Click To Pay </flutterwave-pay-button>
                    </div>                      
                </div>
                
            </div>
        </section>
        <footer>
            <div class="container">
                <div class="footer">
                    <img src="../assets/images/icons/lock.svg">
                    <p>Your transactions, credentials are secure.<br>
                        Don’t share login credentials with anyone.</p>
                </div>
            </div>
        </footer>
	</div>
</template>

<script>

import axios from "axios";

export default {
  name: 'Home',
  data () {
      return{
          form:{
            fname :"",
            lname: "",
            email:"",
            mobileNo:""
          }
      }
  },
  async created() {
    
    await this.loginDetails();
    // this.fname = await this.$route.params.fname;
    // this.lname = await this.$route.params.lname;
    // this.email = await this.$route.params.email;
    // this.mobileNo = await this.$route.params.mobileNo;
    // await this.initMinSavings();
  },
  methods: {
    makePaymentCallback(response) {
      console.log("Payment callback", response)
    },
    closedPaymentModal() {
      console.log('payment modal is closed');
    },
    generateReference(){
      let date = new Date()
      return date.getTime().toString();
    },

    async loginDetails() {        
     await axios
        .get(`${process.env.VUE_APP_API_URL}/Members/loginId`,{
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.form = response.data;
        })
        .catch(error => {
          error.alert("Error");
        });
    },
  }
}
</script>

<style></style>
