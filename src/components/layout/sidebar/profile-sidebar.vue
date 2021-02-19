<template>
  <div>
    <div class="right-side-bar">
      <div class="profile-content">
        <div class="profile-image">
          <img
            src="../../../assets/images/ademola.jpg"
            class="profile-picture"
            alt=""
            srcset=""
          />
          <p class="profile-name">{{member}}</p>
        </div>
        <div class="line"></div>
        <div class="profile-balances">
          <!-- <div class="profile-balance">
            <div class="profile-balance-type">
              Savings Balance:
            </div>
            <h3 class="profile-balance-amount">
              N 100,000
            </h3>
          </div> -->
          <!-- <div class="profile-balance">
            <div class="profile-balance-type">
              Loans Balance:
            </div>
            <h3 class="profile-balance-amount">
              N 100,000
            </h3>
          </div> -->
        </div>
        <div id="last-login">
          <div class="last-login">Your last login:</div>
          <div class="last-login-time">21-Dec-2020 5:03:42 PM</div>
        </div>
      </div>
      <!-- <div id="ads">
               <img src="../../../assets/images/mtn_ads.jpg" class="ads-picture" alt="" srcset="">
           </div> -->
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            // member: {                
            //     fname: "",
            //     mname: "",
            //     lname: "",
            //     title: null,
            //     sex: null,
            //     marital: null,
            //     DoB: "",
            //     email: "",
            //     workPhone: "",
            //     mobileNo: "",
            //     address1: "",
            //     address2: "",
            //     state: null,
            //     country: null,
            //     createdBy: null,
            //     LastModifiedBy: "",
            //     EmployeeNo: "",
            //     MemberType: null,
            //     minSaving: 0
            // }  
        };
  },

  // mounted() {
  //     this.member = localStorage.getItem('data');
  // },
  computed: {
    currentmember: {
      get() {
        return this.$store.state.member;
      }
    }   
  },
  created() {
    this.$store.dispatch('memberDetails');
  }
    
};
</script>
<style></style>