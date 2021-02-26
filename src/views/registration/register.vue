<template>
  <div class="dashboard">
    <div class="background-design"></div>
    <!-- <Header></Header> -->
    <!-- <Menu></Menu> -->
    <header class="sticky-top headernav">
			<nav class="navbar navbar-expand-lg navbar-light container">
				<a class="navbar-brand" href="#"><img src="../../assets/images/chevron-cemcs.svg"/></a>
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
    <div class="container">
      <!-- <NavBar></NavBar> -->
      <div class="row">

        <div class="col-md-12">
          <div class="main-dashboard">
            <div class="dashboard-greeting">
              <div class="overview-text">
                <font-awesome-icon icon="exchange-alt" />
                <div class="header-title">Registration</div>
              </div>
              <div class="date">
                <font-awesome-icon icon="clock" />
                <div class="date-item ml-2">{{new Date().toLocaleString() | humanize}}</div>
              </div>
            </div>
            <div class="line"></div>
            <div class="row">              
              <div class="col-md-12">
                <!-- <div class="row justify-content-md-center"> -->
                <div class="overview-board">
                  <div class="account-overview">
                    <div class="account-overview-content">
                      <div class="mt-2">
                        <div class="header_background">Form Details</div>
                      </div>
                      <div class="row">
                        <div class="col-md-8 mx-auto col-xs-12" style="position: relative;">
                          <div>
                            <b-form
                              ref="form"
                              @submit="onSubmit"
                              @reset="onReset"
                              v-if="show"
                            >
                            <strong>
                            <b-form-group
                                label-cols="4"
                                id="input-group-3"
                                label="Member Type"
                                label-for="input-sm"
                                label-cols-lg="3"
                                label-size="sm"
                              >
                                <b-form-select
                                  id="input-3"
                                  v-model="form.userType"
                                  :options="members"
                                  disabled
                                ></b-form-select
                                ></b-form-group>
                                <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Employee Number"
                                label-for="input-sm"
                              >
                                <b-form-input
                                  id="name-input"
                                  v-model="form.userName"
                                  disabled
                                  required
                                ></b-form-input>
                                </b-form-group>

                                <b-form-group
                                label-cols="4"
                                id="input-group-3"
                                label="Location"
                                label-for="input-sm"
                                label-cols-lg="3"
                                label-size="sm"
                                invalid-feedback="Location is required"
                                :state="location"
                              >
                                <b-form-select
                                  id="input-3"
                                  :state="location"
                                  v-model="form.location"
                                  required
                                  :options="locations"
                                ></b-form-select
                                ></b-form-group>

                                <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Date Of Employment"
                                label-for="example-datepicker"
                                invalid-feedback="Date of Employment is required"
                                :state="DoEmp"
                              >
                            
                                <!-- <b-form-datepicker
                                  id="example-datepicker"
                                  v-model="form.DoB"
                                  :state="nameState"
                                  required
                                ></b-form-datepicker> -->

                                <date-picker class='input-group date down' :state="DoEmp"
                                 v-model="form.empDate" :config="options"></date-picker>
                                </b-form-group>


                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label-for="input-sm"> 
                                <!-- <b-form-input 
                                type="text" id="input-1"                               
                                v-model="savings.minimumSavingsAmount"
                                :formatter="numberFormat">
                                </b-form-input> -->
                                 <span v-if="savings.minimumSavingsAmount === 50000">
                                <code>Minimum Savings of ₦{{savings.minimumSavingsAmount | numberFormat}}
                                   (Fifty Thousand Naira Only)
                                </code></span>
                                <span v-if="savings.minimumSavingsAmount === 10000">
                                <code>Minimum Savings of ₦{{savings.minimumSavingsAmount | numberFormat}}
                                   (Ten Thousand Naira Only)
                                </code></span>
                                </b-form-group>
                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Auth Deduction"
                                label-for="input-sm"
                                invalid-feedback="Deduction is required"
                                :state="autDed"
                              ><b-input-group class="mt-3">
                                <b-form-input
                                  id="input-1"
                                  v-model="form.minSaving"
                                  :formatter="numberFormat"
                                  :state="autDed"
                                  required
                                ></b-form-input></b-input-group>
                                </b-form-group>
                                <!-- {{form.minSaving|NumbersToWords}} -->
                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="First Name"
                                label-for="input-sm"
                                :invalid-feedback="invalidFeedback"
                                :state="Fname"
                              >
                                <b-form-input
                                  id="name-input"
                                  v-model="form.fname"
                                  :state="Fname"
                                  required
                                ></b-form-input
                                ></b-form-group>
                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Middle Name"
                                label-for="input-sm"
                                :state="mName"
                              >
                                <b-form-input
                                  id="name-input"
                                  v-model="form.mname"
                                  :state="mName"
                                ></b-form-input
                                ></b-form-group>
                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Last Name"
                                label-for="input-sm"
                                invalid-feedback=" Last Name is required"
                                :state="Lname"
                              >
                                <b-form-input
                                  id="name-input"
                                  v-model="form.lname"
                                  :state="Lname"
                                  required
                                ></b-form-input
                                ></b-form-group>
                              <!-- <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Title"
                                label-for="input-sm"
                                :state="nameState"
                              >
                                <b-form-select
                                  id="input-3"
                                  v-model="form.title"
                                  :options="titles"
                                ></b-form-select
                                ></b-form-group> -->
                              <b-form-group
                                label-cols="4"
                                id="input-group-3"
                                label="Gender"
                                label-for="input-sm"
                                label-cols-lg="3"
                                label-size="sm"
                                invalid-feedback="Gendr is required"
                                :state="gender"
                              >
                                <b-form-select
                                  id="input-3"
                                  v-model="form.sex"
                                  :options="gender"
                                  :state="gender"
                                  required
                                ></b-form-select
                                ></b-form-group>
                              <b-form-group
                                label-cols="4"
                                id="input-group-3"
                                label="Marital Status"
                                label-for="input-sm"
                                label-cols-lg="3"
                                label-size="sm"
                                invalid-feedback="Status is required"
                                :state="status"
                              >
                                <b-form-select
                                  id="input-3"
                                  v-model="form.marital"
                                :state="status"
                                  :options="maritals"
                                  required
                                ></b-form-select
                                ></b-form-group>
                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Date Of Birth"
                                label-for="example-datepicker"
                                :state="DoB"
                              >
                                <!-- <b-form-datepicker
                                  id="example-datepicker"
                                  v-model="form.DoB"
                                  :state="nameState"
                                  required
                                ></b-form-datepicker > -->
                                <date-picker class='input-group date down'
                                :state="DoB"
                                 v-model="form.DoB"  :config="options"></date-picker>
                                </b-form-group>
                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                :class="isEmailValid"
                                label="Work Email address"
                                label-for="input-sm"
                                valid-feedback="Thank you!"
                                invalid-feedback="Email Address is required"
                                :state="email">
                                <span class="input-group-addon" id="basic-addon1"><span class="fa fa-envelope"></span></span>
                                <b-form-input
                                  id="name-input"
                                  v-model="form.email"
                                  type="email" disabled
                                  :state="email"
                                  required
                                ></b-form-input
                                ></b-form-group>
                                <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Personal Email address"
                                label-for="input-sm"
                              >
                                <b-form-input
                                  id="name-input"
                                  v-model="form.Personalemail"
                                  type="Email"
                                ></b-form-input
                                ></b-form-group>
                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Phone Extention"
                                label-for="input-sm"
                                :state="Ext"
                              >
                                <b-form-input
                                  id="name-input"
                                  v-model="form.workPhone"
                                  :state="Ext"
                                ></b-form-input
                                ></b-form-group>

                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Mobile Number"
                                label-for="input-sm"
                              >
                                <b-form-input
                                  id="name-input"
                                  v-model="form.mobileNo"
                                ></b-form-input
                                ></b-form-group>
                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Address 1"
                                label-for="input-sm"
                                invalid-feedback="Address is required"
                                :state="address"
                              >
                                <b-form-input
                                  id="name-input"
                                  v-model="form.address1"
                                  :state="address"
                                  required
                                ></b-form-input
                                ></b-form-group>
                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Address 2"
                                label-for="input-sm"
                              >
                                <b-form-input
                                  id="name-input"
                                  v-model="form.address2"
                                ></b-form-input
                                ></b-form-group>
                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="State"
                                label-for="input-sm"
                                invalid-feedback="State is required"
                                :state="state"
                              >
                                <b-form-select
                                  id="name-input"
                                  v-model="form.state"
                                  :options="states"
                                  :state="state"
                                  required
                                ></b-form-select
                                ></b-form-group>
                              <b-form-group
                                label-cols="3"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Country"
                                label-for="input-sm"
                                invalid-feedback="Country is required"
                                :state="country"
                              >
                                <b-form-select
                                  id="name-input"
                                  v-model="form.country"
                                  :options="countrys"
                                  :state="country"
                                  required
                                ></b-form-select
                                ></b-form-group>
                            </strong>
                              <div class="row justify-content-md-center">
                                <b-button type="submit" variant="primary">Submit</b-button>
                              </div>
                            </b-form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                <!-- </div> -->
              </div>
              <!-- <div class="col-md-4">
                <div class="dashboard-right-side-bar">
                  <div class="header_2">Profile</div>

                  <RightSidebar></RightSidebar>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

// import Header from "../../components/layout/headers/headerDashboard.vue";
// import NavBar from "../../components/layout/headers/dashboardNav.vue";
// import RightSidebar from "../../components/layout/sidebar/profile-sidebar.vue";
import Footer from "../../components/layout/footer/footer.vue";
// import Menu from "../../components/layout/headers/menus.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    // NavBar,
    // RightSidebar,
    Footer,
    // Menu
  },
  data() {
    return {
      checked: false,
        options: {
          format: 'DD/MM/YYYY',
          useCurrent: false,
          showClear: true,
          showClose: true,
        },
      selectedLoan: "",
      show: true,
      notify: 0,
      savings: {
        minimumSavingsAmount: 0
      },
      form: {
        fname: "",
        mname: "",
        lname: "",
        title: null,
        sex: null,
        marital: null,
        empDate : new Date(),
        DoB: new Date(),
        email: "",
        Personalemail:"",
        workPhone: "",
        mobileNo: "",
        address1: "",
        address2: "",
        state: null,
        country: null,
        createdBy: null,
        LastModifiedBy: "",
        EmployeeNo: "",
        MemberType: null,
        minSaving: 0,
        userName:"",
        userType:""
      },
      titles: [{ text: "Select One", value: null }, "Mr.", "Mrs."],
      maritals: [{ text: "Select Status", value: null }, "Single", "Married"],
      gender: [{ text: "Select Gender", value: null }, "Female", "Male"],
      members: [
        { text: "Regular", value: 1, disabled: true },
        { text: "Retiree", value: 2, disabled: true },
        { text: "Expatriate", value: 3, disabled: true }
      ],
      creators: [{ text: "Select One", value: null }, "Shola", "Temi", "Lolu"],
      locations: [
        { text: "Select Country", value: null },
        { text: "Lagos", value: "Lagos" },
        { text: "Escravos", value: "Escravos" },
      ],
      states: [
        { text: "Select State", value: null },
        { text: "Lagos", value: 1 },
        { text: "FCT", value: 2 },
        { text: "Ondo", value: 3 },
        { text: "Imo", value: 4 }
      ],
      countrys: [
        { text: "Select Country", value: null },
        { text: "Nigeria", value: "Nigeria" },
        { text: "Ghana", value: "Ghana" },
        { text: "USA", value: "USA" }
      ],
    };
  },
  mounted () {
        document.title = "Register | Chevron CEMCS Corporate"
    },
    state() {
        return this.Fname.length >= 20
      },
      invalidFeedback() {
        if (this.Fname.length > 0) {
          return 'Enter at least 20 characters.'
        }
        return 'Please enter something.'
      },
  async created() {
    // this.form.EmployeeNo = await this.$route.params.EmployeeNo;
    // this.form.MemberType = await this.$route.params.UserType;
    // this.form.email = await this.$route.params.email;
    await this.loginDetails();
    await this.initMinSavings();
  },
  methods: {

    numberFormat(value) {
        this.points = Number(value.replace(/\D/g, ''))
        return value =='0.00' ? '' : this.points.toLocaleString();
      },
    
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
    onReset(event) {
      event.preventDefault();

      this.nameState = null;
      this.form.fname = "";
      this.form.mname = "";
      this.form.lname = "";
      this.form.title = "";
      this.form.sex = null;
      this.form.marital = null;
      this.form.DoB = "";
      this.form.email = "";
      this.form.workPhone = "";
      this.form.mobileNo = "";
      this.form.address1 = "";
      this.form.address2 = "";
      this.form.state = "";
      this.form.country = "";
      this.form.EmployeeNo = "";
      this.form.MemberType = null;

      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    async onSubmit(event) {
      event.preventDefault();
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }

      let rawData = {
        EmployeeNumber: this.form.userName,
        MemberType: parseInt(this.form.userType),
        Person: {
          FirstName: this.form.fname,
          LastName: this.form.lname,
          MiddleName: this.form.mname,
          EmploymentDate: this.form.empDate,

          // Title: this.form.title,
          Sex: this.form.sex,
          MaritalStatus: this.form.marital,
          DateOfBirth: this.form.DoB,
          Email: this.form.email,
          Personalemail:this.Personalemail,
          WorkPhone: this.form.workPhone,
          MobileNumber: this.form.mobileNo,
          Address1: this.form.address1,
          Address2: this.form.address2,
          StateId: this.form.state,
          Country: this.form.country
        }
      };
      rawData = JSON.stringify(rawData);
      await axios
        .post(`${process.env.VUE_APP_API_URL}/Members/Register`, rawData, {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
             Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          this.rawData = response.data;
          this.makeToast(`success`);
          if (this.form.MemberType != 2){       
            window.history.length > this.$router.
            push(`/payment`);
          }
        })
        .catch((error) => {
          alert(error);
        });

          let minSavings = {
            MemberId: parseInt(this.form.userType),
            SavingsAmount: Number.parseInt(this.form.minSaving),
            Type: 1
          };
          rawData = JSON.stringify(minSavings);
        await axios
        .post(`${process.env.VUE_APP_API_URL}/MemberSavings/All`, minSavings, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
        })
        .then((response) => {
          this.rawData = response.data;
        })
        .catch((error) => {
          alert(error);
        });
    },
    async initMinSavings() {        
     await axios
        .get(`${process.env.VUE_APP_API_URL}/MinSavings/${this.form.userType}`,{
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        })
        .then(response => {
          this.savings = response.data;
        })
        .catch(error => {
          error.alert("Error");
        });
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
  },
};
</script>
