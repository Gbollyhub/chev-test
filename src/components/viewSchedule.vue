<template>
  <div class="account-overview-content">
    <div class="mt-2">
      <div class="header_background" @setParam="Onset">Loan Schedule</div>
      {{this.set}}
    </div>
    <div>
      <div class="row">
        <div class="col-md-12">
          <div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "Home",
  components: {
  },
  data() {
    return {
      
    };
  },
  async created() {
  },
  methods: {
    
    async Onset(result) {
    this.set = await this.result;
    console.log(result);
  }

  },

};
</script>
