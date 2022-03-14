<template>
  <div>
    <p>ImportData Info</p>
  </div>
</template>

<script>

export default {
  inject: ["root"],
  data: () => ({
    selectedLogger : null
  }),
  computed: {
    
  },
  mounted() {
    // TODO on first click because of permissions (autoplay)
    //this.configureAudioChain();

  },
  methods: {
    
  },
};
</script>

<style scoped>

</style>