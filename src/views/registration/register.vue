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
                <div class="date-item ml-2">{{ currentDateTime() }}</div>
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
                                invalid-feedback="Member is required"
                              >
                                <b-form-select
                                  id="input-3"
                                  v-model="form.MemberType"
                                  :options="members"
                                  required
                                ></b-form-select
                                ></b-form-group>
                                <b-form-group
                                label-cols="3"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Employee Number"
                                label-for="input-sm"
                                invalid-feedback="Employee No is required"
                                :state="nameState"
                              >
                                <b-form-input
                                  id="name-input"
                                  v-model="form.EmployeeNo"
                                  :disabled="form.EmployeeNo"
                                  :state="nameState"
                                  required
                                ></b-form-input>
                                </b-form-group>
                              <b-form-group
                                label-cols="3"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Minimum Savings"
                                label-for="input-sm"
                              ><b-form-input 
                                type="text" id="input-1" disabled                               
                                v-model="savings.minimumSavingsAmount"
                                :formatter="numberFormat" >
                                </b-form-input></b-form-group>
                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Auth Deduction"
                                label-for="input-sm"
                              ><b-input-group prepend="₦" class="mt-3">
                                <b-form-input
                                  id="input-1"
                                  v-model="form.minSaving"
                                  :formatter="numberFormat"
                                ></b-form-input></b-input-group>
                                </b-form-group>
                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="First Name"
                                label-for="input-sm"
                                invalid-feedback="Name is required"
                                :state="nameState"
                              >
                                <b-form-input
                                  id="name-input"
                                  v-model="form.fname"
                                  :state="nameState"
                                  required
                                ></b-form-input
                                ></b-form-group>
                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Middle Name"
                                label-for="input-sm"
                                :state="nameState"
                              >
                                <b-form-input
                                  id="name-input"
                                  v-model="form.mname"
                                  :state="nameState"
                                ></b-form-input
                                ></b-form-group>
                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Last Name"
                                label-for="input-sm"
                                invalid-feedback=" Last Name is required"
                                :state="nameState"
                              >
                                <b-form-input
                                  id="name-input"
                                  v-model="form.lname"
                                  :state="nameState"
                                  required
                                ></b-form-input
                                ></b-form-group>
                              <b-form-group
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
                                ></b-form-group>
                              <b-form-group
                                label-cols="4"
                                id="input-group-3"
                                label="Gender"
                                label-for="input-sm"
                                label-cols-lg="3"
                                label-size="sm"
                                invalid-feedback="Gendr is required"
                                :state="nameState"
                              >
                                <b-form-select
                                  id="input-3"
                                  v-model="form.sex"
                                  :options="gender"
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
                                :state="nameState"
                              >
                                <b-form-select
                                  id="input-3"
                                  v-model="form.marital"
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
                                invalid-feedback="Date of Birth is required"
                                :show-decade-nav="showDecadeNav"
                                :state="nameState"
                              >
                                <b-form-datepicker
                                  id="example-datepicker"
                                  v-model="form.DoB"
                                  :state="nameState"
                                  required
                                ></b-form-datepicker
                                ></b-form-group>
                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Email address"
                                label-for="input-sm"
                                invalid-feedback="Email is required"
                                :state="nameState"
                              >
                                <b-form-input
                                  id="name-input"
                                  v-model="form.email"
                                  type="email"
                                  :state="nameState"
                                  required
                                ></b-form-input
                                ></b-form-group>
                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Work Phone"
                                label-for="input-sm"
                                :state="nameState"
                              >
                                <b-form-input
                                  id="name-input"
                                  v-model="form.workPhone"
                                  :state="nameState"
                                ></b-form-input
                                ></b-form-group>

                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Mobile Number"
                                label-for="input-sm"
                                invalid-feedback="Mobile No is required"
                                :state="nameState"
                              >
                                <b-form-input
                                  id="name-input"
                                  v-model="form.mobileNo"
                                  :state="nameState"
                                  required
                                ></b-form-input
                                ></b-form-group>
                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Address 1"
                                label-for="input-sm"
                                invalid-feedback="Address is required"
                                :state="nameState"
                              >
                                <b-form-input
                                  id="name-input"
                                  v-model="form.address1"
                                  :state="nameState"
                                  required
                                ></b-form-input
                                ></b-form-group>
                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="Address 2"
                                label-for="input-sm"
                                :state="nameState"
                              >
                                <b-form-input
                                  id="name-input"
                                  v-model="form.address2"
                                  :state="nameState"
                                ></b-form-input
                                ></b-form-group>
                              <b-form-group
                                label-cols="4"
                                label-cols-lg="3"
                                label-size="sm"
                                label="State"
                                label-for="input-sm"
                                invalid-feedback="State is required"
                                :state="nameState"
                              >
                                <b-form-select
                                  id="name-input"
                                  v-model="form.state"
                                  :options="states"
                                  :state="nameState"
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
                                :state="nameState"
                              >
                                <b-form-select
                                  id="name-input"
                                  v-model="form.country"
                                  :options="countrys"
                                  :state="nameState"
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
      selectedLoan: "",
      show: true,
      notify: 0,
      showDecadeNav: true,
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
        DoB: "",
        email: "",
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
        minSaving: 0
      },
      titles: [{ text: "Select One", value: null }, "Mr.", "Mrs."],
      maritals: [{ text: "Select Status", value: null }, "Single", "Married"],
      gender: [{ text: "Select Gender", value: null }, "Female", "Male"],
      members: [
        { text: "Select One", value: null, disabled: true},
        { text: "Regular", value: 1, disabled: true },
        { text: "Retiree", value: 2, disabled: true },
        { text: "Expatriate", value: 3, disabled: true }
      ],
      creators: [{ text: "Select One", value: null }, "Shola", "Temi", "Lolu"],
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
  async created() {
    this.form.EmployeeNo = await this.$route.params.EmployeeNo;
    this.form.MemberType = await this.$route.params.UserType;
    this.form.email = await this.$route.params.email;
    await this.initMinSavings();
  },
  methods: {

    numberFormat(value) {
        this.points = Number(value.replace(/\D/g, ''))
        return value == '0.00' ? '' : this.points.toLocaleString();
      },
    
    currentDateTime() {
      const current = new Date();
      const date = current.toDateString(); //+'-'+(current.getMonth()+1)+'-'+current.getDate();
      const time = current.getHours() + ":" + current.getMinutes(); // + ":" //+ current.getSeconds();
      const dateTime = date + " " + time;

      return dateTime;
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
        EmployeeNumber: this.form.EmployeeNo,
        MemberType: parseInt(this.form.MemberType),
        Person: {
          FirstName: this.form.fname,
          LastName: this.form.lname,
          MiddleName: this.form.mname,
          Title: this.form.title,
          Sex: this.form.sex,
          MaritalStatus: this.form.marital,
          DateOfBirth: this.form.DoB,
          Email: this.form.email,
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
             Authorization: `Bearer ${this.token}`
          },
        })
        .then((response) => {
          this.rawData = response.data;
          this.makeToast(`success`);
          if (this.form.MemberType != 2){       
            window.history.length > this.$router.
            push(`/payment/${this.form.fname}&${this.form.lname}&
              ${this.form.email}&${this.form.mobileNo}`);
          }
        })
        .catch((error) => {
          alert(error);
        });

          let minSavings = {
            MemberId: parseInt(this.form.MemberType),
            SavingsAmount: Number.parseInt(this.form.minSaving),
            Type: 1
          };
          rawData = JSON.stringify(minSavings);
        await axios
        .post(`${process.env.VUE_APP_API_URL}/MemberSavings`, minSavings, {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
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
        .get(`${process.env.VUE_APP_API_URL}/MinSavings/${this.form.MemberType}`,{
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        })
        .then(response => {
          this.savings = response.data;
        })
        .catch(error => {
          error.alert("Error");
        });
    },
  },
};
</script>
