<template>
  <div id="player">
    <div id="headPlayer">
      <span class="iconify" data-icon="carbon:play-filled-alt" style="color: #599;"></span>
      <select id="selectedLogger">
        <option v-for="(logger, k) in loggerList" :key="k" @click="filledPlayerPist">{{logger.name}}</option>
      </select>
      <span class="iconify" data-icon="carbon:settings"></span>
    </div>
    <div id="infoLogger">
      <div>{{('0'+loggerStartTime.getUTCDate()).slice(-2)}}/{{('0'+loggerStartTime.getUTCMonth()).slice(-2)}}/{{loggerStartTime.getUTCFullYear()}} {{('0'+loggerStartTime.getUTCHours()).slice(-2)}}:{{('0'+loggerStartTime.getUTCMinutes()).slice(-2)}}</div>
      <div>{{('0'+loggerEndTime.getUTCDate()).slice(-2)}}/{{('0'+loggerEndTime.getUTCMonth()).slice(-2)}}/{{loggerEndTime.getUTCFullYear()}} {{('0'+loggerEndTime.getUTCHours()).slice(-2)}}:{{('0'+loggerEndTime.getUTCMinutes()).slice(-2)}}</div>
    </div>
    <div id="globalPist">
      <div v-if="selectedLogger" id="allCanvas">
          <div :id="'audioLoggerPist'+audio.fileName" class="audioLoggerPist" v-for="audio in selectedLogger.audios" :key="audio">
            <AudioLoggerPlayer :audio="audio" :loggerSizeInScreen="loggerSizeInScreen" :loggerSizeInTime="loggerSizeInTime"></AudioLoggerPlayer>
          </div>
      </div>
    </div>
    <div id="zoomedPist">
      <div id="zoomedCanvas"></div>
    </div>
    <div>{{loggerSizeInScreen+" "+loggerSizeInTime}}</div>
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
import AudioLoggerPlayer from "./AudioLoggerPlayer.vue";
const OComponents = { AudioLoggerPlayer };

export default {
  inject: ["root"],
  components: { ...OComponents },
  data: () => ({
    changePitch: false, /*permit to listen to ultrasound*/
    showHz: -1,
    cursorPos : 0,
    loggerList: [{"name" : "Logger L42"},{"name" : "Logger L01"}],
    loggerStartTime: new Date(),
    loggerEndTime : new Date(),
    selectedLogger : null,
    loggerSizeInScreen : 0,
    loggerSizeInTime : 0 ,/*in seconds */
    truncate : 5 /*in pixel*/
  }),
  computed: {
    
  },
  mounted() {
    // TODO on first click because of permissions (autoplay)
    //this.configureAudioChain();
    this.clientWithPlayer()
    this.loggerAvailable()//[{"name" : "Logger L42"},{"name" : "Logger L05"}];
    //this.filledPlayerPist()
  },
  methods: {
    async loggerAvailable() {
      this.loggerList = await this.root.request(this.root.BASE + "availableLogger");
      //this.loggerList = await this.requestPost(this.root.BASE + "availableLogger","{'regex': '"+this.root.regex+"','groupe':'"+this.root.groupe+"'}");
      console.log(this.loggerList)
      let site = await this.root.cfg.variables['audio_base'].split('/')
      site = site[site.length-1]
      this.loggerList = this.loggerList[site] //TODO Edit this to see other location more than the studed site
      console.log(this.loggerList)
      this.filledPlayerPist()
    },
    filledPlayerPist(){
      // we need to know who is the selected logger
      // find in loggerList the seleected element
      let loggerSelected = this.loggerList.find(aLogger => aLogger.name===this.selectedLoggerInput())
      console.log("Selected logger : ")
      console.log(loggerSelected,this.loggerList)
      if(loggerSelected==undefined){ // to avoid time to load
        console.log("valeur de ",this.selectedLoggerInput())
        setTimeout(this.filledPlayerPist,500)
        return
      }else{
        this.selectedLogger= loggerSelected
        let first = true
        let val =null
        try{ val = loggerSelected.audios.length}catch(e){return}
        console.log(val)
        /*We assume that list is ordonated */
        for (let i = 0; i < val; i++) {
          const audio = loggerSelected.audios[i];
          let audioDuration = audio.timeDuration
          /* we take te start time for the fisrt audio recorded */
          if(first){
            this.loggerStartTime = audio.startTime
            let year=audio.startTime.substring(0, 4)
            let month=audio.startTime.substring(4, 6)
            let day=audio.startTime.substring(6, 8)
            let hours=audio.startTime.substring(9, 11)
            let minutes=audio.startTime.substring(11, 13)
            let seconds=audio.startTime.substring(13, 15)
            let d = new Date(Date.UTC(year, month, day, hours, minutes, seconds))
            this.loggerStartTime = new Date(d.toLocaleString("en-US", {timeZone: this.root.cfg.variables.display_locale,}))
            first=false
          }
          if (!(i+1 < val)){
            /*last time */
            /*TODO Add audioDuration */
            this.loggerEndTime = audio.startTime
            let year=audio.startTime.substring(0, 4)
            let month=audio.startTime.substring(4, 6)
            let day=audio.startTime.substring(6, 8)
            let hours=audio.startTime.substring(9, 11)
            let minutes=audio.startTime.substring(11, 13)
            let seconds=audio.startTime.substring(13, 15)
            let d = new Date(Date.UTC(year, month, day, hours, minutes, seconds))
            d.setSeconds(d.getSeconds() + audioDuration);
            this.loggerEndTime = new Date(d.toLocaleString("en-US", {timeZone: this.root.cfg.variables.display_locale,}))
          }
        }
        /* we know the equivalence to size-screen and Time of all audios logger */
        /*now we want to know duration time bewteen start and end time in seconds */
        this.loggerSizeInTime = Math.round((this.loggerEndTime-this.loggerStartTime)/1000)
        
      }
    },
    clientWithPlayer(){
      try{
        this.loggerSizeInScreen = document.getElementById("allCanvas").clientWidth
        return this.loggerSizeInScreen
      }catch(e){
        setTimeout(this.clientWithPlayer,500)
        return "0px"
      }
    },
    selectedLoggerInput() {
      let selectedLoggerInput = document.getElementById('selectedLogger')
      let str = selectedLoggerInput.options[selectedLoggerInput.options.selectedIndex].text
      console.log("Selected Logger by function : ",str,selectedLoggerInput.selectedIndex)
      return str
    },
  },
};
</script>

<style scoped>
#player>div{
  background-color: green;
}
#headPlayer{
  width: 250px;
  margin: auto;
  border-radius: 10px 10px 0px 0px;
}
#infoLogger{
  /*height: 60px;*/
  border-radius: 10px 10px 0px 0px;
}
#zoomedCanvas,#allCanvas{
  border: 1px solid black;
  width: 98%;
  height: 75px;
  margin: auto;
  display: block;
  background-color: white;
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
.audioLoggerPist{
  padding: 0px;
  width: 1px;
  height: 100%;
  display: inline-block;
}
table{
  border-collapse: collapse;
  width: 100%;
  height: 100%;
}
table tr{
  width: 100%;
  overflow: hidden;
}
</style>
