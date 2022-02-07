<template>
  <div id="player">
    <div id="headPlayer">
      <span class="iconify" data-icon="carbon:play-filled-alt" style="color: #599;"></span>
      <select id="selectedLogger">
        <option v-for="(logger, k) in loggerList" :key="k" @click="filledCanvasLogger">{{logger.name}}</option>
      </select>
      <span class="iconify" data-icon="carbon:settings"></span>
    </div>
    <div id="infoLogger"></div>
    <div id="globalPist">
      <canvas id="allCanvas"></canvas>
    </div>
    <div id="zoomedPist">
      <canvas id="zoomedCanvas"></canvas>      
    </div>
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
    loggerStartTime: "20210428T060900",
    loggerEndTime : "20210428T060900",
    selectedLogger : null
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

    this.loggerAvaiable()//[{"name" : "Logger L42"},{"name" : "Logger L05"}];
    this.filledCanvasLogger()
  },
  methods: {
    async loggerAvaiable() {
      this.loggerList = [{"name" : "Logger L42"},{"name" : "Logger L05"}];
      this.loggerList = await this.request(this.root.BASE + "avaiableLogger");
      console.log(this.loggerList)
      this.loggerList = this.loggerList['BORA_ANR_sons'] //TODO Edit this to see other location more than the studed site
      this.filledCanvasLogger()
    },
    request: async function (path) {
      let res = await fetch(path);
      let body = await res.json();
      return body;
    },
    filledCanvasLogger(){
      let canvas = document.getElementById('allCanvas');
      let ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0,ctx.canvas.width, ctx.canvas.height)
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0,ctx.canvas.width, ctx.canvas.height);
      // we need to know who is the selected logger
      // find in loggerList the seleected element
      let loggerSelected = this.loggerList.find(this.selectedLoggerInput)
      if(loggerSelected==undefined){ // to avoid time to load
        console.log("valeur de ",this.selectedLoggerInput())
        setTimeout(this.filledCanvasLogger,500)
        return
      }
      this.selectedLogger= loggerSelected
      let first = true
      let val =null
      try{ val = loggerSelected.audios.length}catch(e){return}
      for (let i = 0; i < val; i++) {
        const audio = loggerSelected.audios[i];
        if(first){
          this.loggerStartTime = audio.startTime
          console.log(this.loggerStartTime,typeof(this.loggerStartTime))
          let year=audio.startTime.substring(0, 4)
          let month=audio.startTime.substring(4, 6)
          let day=audio.startTime.substring(6, 8)
          let hours=audio.startTime.substring(9, 11)
          let minutes=audio.startTime.substring(11, 13)
          let seconds=audio.startTime.substring(13, 15)
          this.loggerStartTime = new Date(year, month, day, hours, minutes, seconds)
          console.log(this.loggerStartTime)
          first=false
        }
        
      }
      canvas = document.getElementById('zoomedCanvas');
      ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0,ctx.canvas.width, ctx.canvas.height);
    },
    selectedLoggerInput() {
      let selectedLoggerInput = document.getElementById('selectedLogger')
      return selectedLoggerInput.options[selectedLoggerInput.options.selectedIndex].text
    },
  },
};
</script>

<style>
#player div{
  background-color: green;
}
#headPlayer{
  width: 250px;
  margin: auto;
  border-radius: 10px 10px 0px 0px;
}
#infoLogger{
  height: 60px;
  border-radius: 10px 10px 0px 0px;
}
#zoomedCanvas,#allCanvas{
  border: 1px solid black;
  width: 98%;
  height: 75px;
  margin: auto;
  display: block;
}

#zoomedCanvas{
  height: 150px;
}

#globalPist{
  padding-bottom: 30px;
}
#zoomedPist{
  padding-bottom :30px; 
}
</style>
