<template>
  <div>
      <span class="iconify" data-icon="eos-icons:loading"></span>
      <p>loading</p>
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
