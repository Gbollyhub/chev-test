<template>
<div v-if="warningZone">
    <b-alert variant="success" show><p style="color:red;font-size:14px;"> Logging you out in 5 min</p></b-alert>
    </div> 
</template>
<script>
export default {
    name: "Home",
    components: {
},
    data() {
        return {
            events:['click','mousemove','mousedown','scroll','keypress','load'],
            warningTimer:null,
            logoutTimer:null,
            warningZone: false,
            message:'',
            state:'warning',
            status:false
        };
    },
    
    mounted() {
        this.events.forEach(event => {
            window.addEventListener(event, this.resetTimer);
        });


        this.setTimers();
    },
    destroyed() {
        this.events.forEach(event => {
            window.removeEventListener(event, this.resetTimer);
        });
        this.resetTimer();
    },
     methods: {
         warningMsg(){
            this.warningZone = true             
        },
         setTimers(){
             this.warningTimer = setTimeout(this.warningMsg, 10*60*1000); // Alert logout msg after idle time after 10min
             this.logoutTimer = setTimeout(this.logoutUser, 15*60*1000); // Logout Automatically in 5 min after warning msg

             this.warningZone = false
         },
         resetTimer() {
             clearTimeout(this.warningTimer);
             clearTimeout(this.logoutTimer);

             this.setTimers();
         },
         async logoutUser() {
        await this.$store.dispatch('logout')
		.then(() => this.$router.push('/')) 
         }
     },
     closeModal(){
      this.status = false
  },
};
</script>
<style></style>