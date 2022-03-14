<template>
  <div :id="this.audio.fileName" :style="cssRender">
    {{this.audio}}
  </div>
</template>

<script>


export default {
  inject: ["root","player"],
  data: () => ({
    audioSizeInScreen : 0,
    audioSizeInTime : 0,
    defaultSize : 10
  }),
  props:{
    audio : Object,
  },
  updated() {
    this.setSizeAudio()
  },
  created() {
    
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
      this.audioSizeInScreen = Math.ceil((this.player.loggerSizeInScreen * this.audio.timeDuration) / this.player.loggerSizeInTime)
      console.log(this.audioSizeInScreen , this.player.loggerSizeInScreen , this.audio.timeDuration , this.player.loggerSizeInTime)
      /* we chek if  */
      if(this.audioSizeInScreen < this.defaultSize){
        console.log(this.defaultSize)
        document.getElementById(this.audio.fileName).style.width = this.defaultSize +'px'
      }
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
