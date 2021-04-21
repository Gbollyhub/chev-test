<template>
  <div>
    <div class="right-side-bar">

    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {code:"" };
    },
    mounted() {
        this.externalLogin()
    },
    methods: {
        externalLogin() { 
            let Body = {code: "CODE", ReturnUrl:"http://localhost:8080/overview"}
            Body = JSON.stringify(Body);
            axios.post(`${process.env.VUE_APP_API_URL}/ExternalLogin`,Body, {
            headers: {"Content-Type": "application/json;charset=utf-8"}
            }).then().catch(error => {
            this.$bvToast.toast(error, {
                    title: "Error",
                    variant: "danger",
                    solid: true,
                    autoHideDelay: 5000
                });
            });
        },
    }  
};
</script>
<style></style>