<template>
  <div :style="cssRender">
    {{this.audio.timeDuration}}
    {{audioSizeInScreen}}
  </div>
</template>

<script>


export default {
  inject: ["root"],
  data: () => ({
    audioSizeInScreen : 0,
    audioSizeInTime : 0
  }),
  props:{
    audio : Object,
    loggerSizeInScreen : Number,
    loggerSizeInTime : Number /* in seconds */
  },
  created() {
    
  },
  updated() {
    this.setSizeAudio()
  },
  computed: {
    cssRender(){
      return 0
    }
  },
  mounted() {
    // TODO on first click because of permissions (autoplay)
    //this.configureAudioChain();
    //this.filledPlayerPist()
    this.setSizeAudio()
  },
  methods: {
    /* TODO modifier la longueur de l'audio */
    setSizeAudio(){
      this.audioSizeInScreen = (this.loggerSizeInScreen * this.audio.timeDuration) / this.loggerSizeInTime
      console.log(this.audioSizeInScreen , this.loggerSizeInScreen , this.audio.timeDuration , this.loggerSizeInTime)
    },
  },
};
</script>

<style scoped>
div{
  background-color: green;
  height: 100%;
  width: 100%;
}
</style>
