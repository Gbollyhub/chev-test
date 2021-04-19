<template>
<div>
       <div class="settings-div">
        <div class="settings-icon"></div>
        <div class="settings-icon"></div>
      </div>
      <div class="div-block">
        <div class="profile-photo"></div>
        <div class="profile-header"> {{user.person.lastName +", " + user.person.firstName+" "}}</div>
        <div class="profile-sub">Employee Number: {{user.employeeNumber}} | {{ user.id }}</div>
      </div>
      <div class="admin-divider"></div>
      <div class="admin-calender-div"></div>
      <div class="admin-divider"></div>
      <div class="misc-card">
        <div class="misc-card-header">Loan Requests</div>
        <div class="misc-card-sub">1000</div>
      </div>
       </div>
  
</template>

<script>

import axios from "axios";

export default {
    data() {
        return {
            user : null
        };
  },
  async mounted() {    
      await this.initUser();
  },
  methods: {

    async initUser() {
      await axios
        .get(`${process.env.VUE_APP_API_URL}/Members/Usertype`, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          this.user = response.data.data;
          const memberId = response.data.data.id;
          localStorage.setItem('memberId', memberId)

        })
        .catch((error) => {
          error.alert('Error');
        });
    },
  }
    
};
</script>