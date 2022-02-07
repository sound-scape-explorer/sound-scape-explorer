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
    this.scanData(this.root.BASE + "scanData");
    
  },
  methods: {
    async scanData(path){
      let res = await fetch(path);
      let body = await res.json();
      return body
    }
  },
};
</script>

<style scoped>

</style>
