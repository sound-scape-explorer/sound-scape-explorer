<template>
  <div id="firstPlan">
      <div v-if="!beforeScan">
        <span class="iconify" data-icon="eos-icons:loading"></span>
        <p>loading</p>
      </div>
      <div v-if="beforeScan">
        <label for="regex">Regex</label>
        <input :type="text" name="regex" v-model="root.regex" placeholder="regex i.e: ([a-zA-Z0-9_]+)">
        <label for="groupe">Regex groupe to catch the start time of record</label>
        <input type="number" name="groupe" v-model="root.groupe" min="0">
        <div>{{this.root.groupe}} {{this.root.regex}}</div>
        <input type="submit" @click="scanData" value="Scan and Write it!">
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
  }),
  computed: {
    
  },
  mounted() {
    // TODO on first click because of permissions (autoplay)
    //this.scanData(this.root.BASE + "scanData");
    
  },
  methods: {
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
</style>
