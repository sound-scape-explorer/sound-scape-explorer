<template>
  <div id="player">
    <div id="headPlayer">
      <span class="iconify" data-icon="carbon:play-filled-alt" style="color: #599;"></span>
      <select>
        <option v-for="(logger, k) in loggerList" :key="k" value=""><!--todo un v-for-->{{logger.name}}</option>
      </select>
      <span class="iconify" data-icon="carbon:settings"></span>
    </div>
    <div id="infoLogger"></div>
    <div id="globalPist"></div>
    <div id="zoomedPist"></div>
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
    changePitch: false, /*permit to listen to ultrasound*/
    showHz: -1,
    cursorPos : 0,
    loggerList: [{"name" : "Logger L42"},{"name" : "Logger L01"}],
  }),
  computed: {
    logger() {
      const B = this.root.BASE + this.root.cfg.variables.generated_base;
      if (this.changePitch) {
        return B + "preview-audio/hzdiv10.wav#"+ new Date().getTime();
      } else {
        return B + "preview-audio/normal.wav#"+ new Date().getTime();
        //this.root.BASE + V.audio_base + V.preview_file + V.audio_suffix;
      }
    },
  },
  mounted() {
    // TODO on first click because of permissions (autoplay)
    //this.configureAudioChain();
    let externalScript = document.createElement('script')
    externalScript.setAttribute('src', 'https://code.iconify.design/2/2.1.2/iconify.min.js')
    document.head.appendChild(externalScript)

    this.loggerAvaiable()//[{"name" : "Logger L42"},{"name" : "Logger L05"}];

  },
  methods: {
    async loggerAvaiable() {
      this.loggerList = [{"name" : "Logger L42"},{"name" : "Logger L05"}];
      this.loggerList = await this.request(this.root.BASE + "avaiableLogger");
      console.log(this.loggerList)
      this.loggerList = this.loggerList['BORA_ANR_sons']

    },
    request: async function (path) {
      let res = await fetch(path);
      let body = await res.json();
      return body;
    },
  },
};
</script>

<style>
#player div{
  background-color: green;
}
#headPlayer{
  width: 200px;
  margin: auto;
  border-radius: 10px 10px 0px 0px;
}
#infoLogger{
  height: 170px;
  border-radius: 10px 10px 0px 0px;
}
#globalPist{
  height: 170px;
}
#zoomedPist{
  height: 170px;
}
</style>
