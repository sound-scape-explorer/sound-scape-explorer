<template>
  <div>
    <iframe src="/.hiddenREADME.html" frameborder="0" ></iframe>
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
    let size = document.getElementsByTagName('html')[0].clientHeight - 50
    size += "px" 
    console.log(size)
    document.getElementsByTagName('iframe')[0].style.height=size.toString()
    size = document.getElementsByTagName('html')[0].clientWidth - 50
    size += "px" 
    console.log(size)
    document.getElementsByTagName('iframe')[0].style.width=size.toString()
  },
  methods: {
    
  },
};
</script>

<style scoped>

</style>