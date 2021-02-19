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
            <div class="login-main">
                <div class="row no-gutters">
                    <div class="col-md-6 d-none d-lg-block">
                        <div class="login-slide ">
                            <!-- <img src="assets/images/login-slider.jpg"> -->
                            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                <ol class="carousel-indicators">
                                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                </ol>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img class="d-block w-100" src="../assets/images/login-slider.jpg"
                                            alt="First slide">
                                    </div>
                                    <div class="carousel-item">
                                        <img class="d-block w-100" src="../assets/images/login-slider2.jpg"
                                            alt="Second slide">
                                    </div>
                                    <div class="carousel-item">
                                        <img class="d-block w-100" src="../assets/images/login-slider.jpg"
                                            alt="Third slide">
                                    </div>
                                </div>
                                <!-- <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a> -->
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="login-account">
                            <h1>Member Registration</h1>
                            <p class="mb-3">Authorized login only.</p>
                            <label for="signUpSelect">Sign up as:</label>
                            <b-form ref="form"
                                    @submit="onSubmit"
                                    v-if="show"
                                    >
                            <div class="login-inputs">                                
                                <div class="memberid">
                                    <div class="icon">                                        
                                        <b-icon icon="award-fill" aria-hidden="true"></b-icon>
                                    </div>
                                    <select class="form-control" v-model="form.UserType" id="exampleFormControlSelect1">
                                        <option :value=null>Member</option>
                                        <option value= 1>Regular Staff Member (RSM)</option>
                                        <option value= 2>Retiree Member (RM)</option>
                                        <option value= 3>Expatriate Member (EM)</option>
                                    </select>
                                    <div class="chevron-down">
                                        <img src="../assets/images/icons/chevron-down.svg">
                                    </div>
                                </div>
                                <div class="password">
                                    <div class="icon">
                                        <!-- <img src="../assets/images/icons/user.svg"> -->
                                        <b-icon icon="person-fill"></b-icon>
                                    </div>
                                    <b-form-input type="text" v-model="form.EmployeeNo" aria-invalid="Member is required" placeholder="Employee Number" />
                                </div>
                                <div class="password">
                                    <div class="icon">
                                        <b-icon icon="envelope"></b-icon>
                                    </div>
                                    <b-form-input type="email" v-model="form.email" aria-invalid="Email is required" placeholder="Email Address" />
                                </div>
                                <div class="password">
                                    <div class="icon">
                                        <!-- <img src="../assets/images/icons/lock.svg">award-fill -->
                                        <b-icon icon="lock-fill" aria-hidden="true"></b-icon>
                                    </div>
                                    
                                    <b-form-input id="password" v-model="form.password"
                                    type="password" :state="nameState" aria-invalid="Password is required" placeholder=" Create Password" /> 
                                    
                                        <!-- <b-form-invalid-feedback id="input-live-feedback">
                                        Enter at least 8 charaters of: One capital letter, number and symbol
                                        </b-form-invalid-feedback>     -->
                                </div>
                                
                            </div>
                            <b-button type="submit" class="login-btn">REGISTER NOW</b-button>
                            </b-form>
                        </div>
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
            <!-- <div class="cc">
                <div class="container">
                    <p>Copyright &copy; 2021 Chevron CEMCS Corporative</p>
                </div>
            </div> -->
        </footer>
	</div>
</template>

<script>

import axios from "axios";
export default {
    data() {
    return {
        nameState: true,
      show: true,      
      notify: 0,
      form: {
        password: "",
        EmployeeNo: "",
        email: "",
        UserType: null 
      }    
    };
  },
  mounted () {
        document.title = "Register | Chevron CEMCS Corporate"
    },
    // computed: {
    //   nameState() {
    //     return this.password.length >= 8 ? true : false
    //   }
    // },
    methods: {        
        makeToast(variant = null) {
            this.notify++;
            this.$bvToast.toast(`Member Added`, {
                title: "Successful",
                variant: variant,
                solid: true,
                autoHideDelay: 5000
            });
        }, 
        checkFormValidity() {
        const valid = this.$refs.form.checkValidity();
        this.nameState = valid;
        return valid;
        }, 
    async onSubmit(event) {
      event.preventDefault();
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      let rawData = {
        Username: this.form.EmployeeNo,
        Password: this.form.password,
        Email: this.form.email,
        UserType: parseInt(this.form.UserType),
        ReturnUrl: `http://localhost:8080/register/${this.form.EmployeeNo}
                    &${this.form.UserType}&${this.email}`    
      };
      rawData = JSON.stringify(rawData);
      await axios
        .post(`${process.env.VUE_APP_API_URL}/Users/Register`, rawData, {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        })
        .then((response) => {
          this.rawData = response.data;
          this.makeToast(`Success`);
        //   window.history.length > this.$router.
        //   push(`/register/${this.form.EmployeeNo}&${this.form.UserType}&${this.form.email}`);
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
    
};
</script>

<style></style>
