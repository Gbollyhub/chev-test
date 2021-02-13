<template>
  <div class="home">
    <Header></Header>
  </div>
</template>

<script>
// @ is an alias to /src

import Header from "../components/layout/headers/headerDashboard.vue";
export default {
  name: "Home",
  components: {
    Header
  }
};
</script>
