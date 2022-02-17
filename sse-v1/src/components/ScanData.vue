<template>
  <div id="firstPlan">
      <div v-if="!beforeScan">
        <span class="iconify" data-icon="eos-icons:loading"></span>
        <p>loading</p>
      </div>
        <div v-if="beforeScan">
          <div id="part1">
            <h3>Part 1 : tell us the audio base (site to study)</h3>
            <input type="button" value="refresh"> 
            <select id="selectedLogger">
              <option v-for="(site, k) in siteList" :key="k" @click="filledCanvasLogger">{{site.name}}</option>
            </select>
          </div>
          <div>
            <h3>Part 2 : tell us the format of start file</h3>
            <iframe src="https://pythex.org/?regex=%5E(%5Ba-zA-Z0-9%5D%2B)(%3F%3A)&test_string=20210428T081000_2614231112834446&ignorecase=0&multiline=0&dotall=0&verbose=0"></iframe>
            <label for="regex">Regex</label>
            <input :type="text" name="regex" v-model="root.regex" placeholder="regex i.e: ([a-zA-Z0-9_]+)">
            <label for="groupe">Regex groupe to catch the start time of record in file name</label>
            <input type="number" name="groupe" v-model="root.groupe" min="0">
            <div>{{this.root.groupe}} {{this.root.regex}}</div>
            <input type="submit" @click="scanData" value="Scan and Write it!">
        </div>
      </div>
  </div> 
</template>

<script>
import { NTable, NForm, NSelect } from "naive-ui";
const NComponents = { NTable, NForm, NSelect };

export default {
  inject: ["root"],
  components: { ...NComponents },
  data: () => ({
    beforeScan : true,
    audio_base : "",
    siteList: [{"name" : "BoraBora"},{"name" : "Coridor"}],
  }),
  computed: {
    
  },
  mounted() {
    // this.siteAvailable();
  },
  methods: {
    async siteAvailable() {
      this.siteList = await this.root.request(this.root.BASE + "availableSite");
      //this.siteList = await this.requestPost(this.root.BASE + "availableLogger","{'regex': '"+this.root.regex+"','groupe':'"+this.root.groupe+"'}");
      console.log(this.siteList)
      let site = await this.root.cfg.variables['audio_base'].split('/')
      site = site[site.length-1]
      this.siteList = this.siteList[site] //TODO Edit this to see other location more than the studed site
      console.log(this.siteList)
      this.filledCanvasLogger()
    },
    async scanData(){
      let path = this.root.BASE + "scanData"
      let str = {'regex' : this.root.regex,'groupe': this.root.groupe}
      let jsoned = JSON.stringify(str)
      let body = await this.root.requestPost(path,jsoned)
      console.log(body)
      return body
    }
  },
};
</script>

<style scoped>
#firstPlan{
  background-color: burlywood;
}
iframe{
  border: 0px solid;
  width: 100%;
  height: 500px;
}
</style>
