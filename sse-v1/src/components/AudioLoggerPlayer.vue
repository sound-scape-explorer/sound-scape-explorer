<template>
  <div>
    
  </div>
</template>

<script>
/*
import GainWorklet from "../worklet/GainWorklet";
      let gainWorkletNode = null
      await context.audioWorklet.addModule(GainWorklet)
      gainWorkletNode = new AudioWorkletNode(context, 'gain-worklet')
      gainWorkletNode.port.onmessage = event => {
        console.log('Worklet Message:', event.data.msg)
      }
      */

export default {
  inject: ["root"],
  data: () => ({
    truc:60
  }),
  props:{
    audio : Object,
    loggerSizeInScreen : Object,
    loggerSizeInTime : Object
  },
  created() {
    
  },
  computed: {
    
  },
  mounted() {
    // TODO on first click because of permissions (autoplay)
    //this.configureAudioChain();
    //this.filledPlayerPist()
  },
  methods: {
    /* TODO modifier la longueur de l'audio */
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
