<template>
<div v-if="warningZone">
    <b-alert variant="success" show><p style="color:red;font-size:14px;"> Logging you out in 5 min</p></b-alert>
    </div> 
</template>
<script>
import jwt_decode from "jwt-decode";
export default {
    name: "Home",
    components: {
},
    data() {
        return {
            events:["load","click","mousemove","mousedown","scroll","keypress"],
            warningTimer:null,
            logoutTimer:null,
            warningZone: false,
            token: localStorage.getItem('token'),
        };
    },    
    mounted() {
        this.events.forEach(event => {
            window.addEventListener(event, this.resetTimer);
        });
        this.setTimers();

        this.autoRefresh();
    },
    // destroyed() {
    //     this.events.forEach(event => {
    //         window.removeEventListener(event, this.resetTimer);
    //     });
    //     this.resetTimer();
    // },
     methods: {         
         setTimers(){
             this.warningTimer = setTimeout(this.warningMsg, 10*60*1000); // Alert logout msg after idle time after 10min
             this.logoutTimer = setTimeout(this.logoutUser, 15*60*1000); // Logout Automatically in 5 min after warning msg

             this.warningZone = false
         },
         warningMsg(){
            this.warningZone = true             
        },
         resetTimer() {
             clearTimeout(this.warningTimer);
             clearTimeout(this.logoutTimer);

             this.setTimers();
         },
        async logoutUser() {
            await this.$store.dispatch('logout')
            .then(() => this.$router.push('/')) 
         },
        autoRefresh() {
            const { exp } = jwt_decode(this.token)
            console.log("tokenExpireTime:", exp)
            const now = Date.now() / 1000 // exp is represented in seconds since epoch
            let timeUntilRefresh = exp - now
            timeUntilRefresh -= (15 * 60) // Refresh 15 minutes before it expires
            setTimeout(this.refreshToken, timeUntilRefresh * 1000)
        
            //  await this.$store.dispatch('refreshToken')
        },
        async refreshToken() {
            await this.$store.dispatch('refreshToken')
         },
     },

     
};
</script>
<style></style>