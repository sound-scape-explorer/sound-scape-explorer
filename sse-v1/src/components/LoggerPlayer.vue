<template>
  <div>
    <div>{{loggerSizeinScreen+" "+loggerSizeinTime}}</div>
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
    audio: null,
    loggerSizeinScreen : "0px",
    loggerSizeinTime : 0 ,/*in seconds */
  }),
  computed: {
    
  },
  mounted() {
    // TODO on first click because of permissions (autoplay)
    //this.configureAudioChain();
    //this.filledPlayerPist()
  },
  methods: {
    
  },
};
</script>

<style scoped>

</style>
