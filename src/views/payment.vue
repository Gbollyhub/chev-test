<template>
	<div class="login-page">
		<img src="../assets/images/login-bg.svg" alt="" id="bg" />
		<header class="sticky-top headernav">
			<nav class="navbar navbar-expand-lg navbar-light container">
				<a class="navbar-brand" href="#"><img src="../assets/images/chevron-cemcs.svg"/></a>
				<button
					class="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav ml-auto ">
						<li class="nav-item ">
							<a class="nav-link" href="#">HOME</a>
						</li>
						<li class="nav-item ">
							<a class="nav-link" href="#">ABOUT US</a>
						</li>
						<li class="nav-item ">
							<a class="nav-link" href="#">CONTACT US</a>
						</li>
						<li class="nav-item ">
							<a class="nav-link" href="#">NEWS</a>
						</li>
						<li class="nav-item ">
							<a class="nav-link" href="/login">LOGIN</a>
						</li>
						<li class="nav-item register_btn">
							<a class="nav-link" href="/new-account">Register Now</a>
						</li>
					</ul>
				</div>
			</nav>
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
                            :meta="{consumer_id: '7898' ,consumer_mac: 'kjs9s8ss7dd' }"
                            :customer="{ name: this.fname+','+this.lname,
                            email: this.email, 
                            phone_number: this.mobileNo}"
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

export default {
  name: 'Home',
  data () {
      return{
        fname :"",
        lname: "",
        email:"",
        mobileNo:""
      }
  },
  async created() {
    this.fname = await this.$route.params.fname;
    this.lname = await this.$route.params.lname;
    this.email = await this.$route.params.email;
    this.mobileNo = await this.$route.params.mobileNo;
    await this.initMinSavings();
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
    }
  }
}
</script>

<style></style>
