<template>
  <div>
      <div v-if="!beforeScan">
        <span class="iconify" data-icon="eos-icons:loading"></span>
        <p>loading</p>
      </div>
      <div v-if="beforeScan">
        <label for="regex">Regex</label>
        <input :type="text" name="regex" v-model="root.regex" placeholder="a regex string">
        <label for="groupe">Regex groupe to catch the start time of record</label>
        <input type="number" name="groupe" v-model="root.groupe">
        <!--<div>{{this.root.groupe}} {{this.root.regex}}</div>-->
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
    this.scanData(this.root.BASE + "scanData");
    
  },
  methods: {
    async scanData(path){
      let body = await this.root.request(path)
      return body
    }
  },
};
</script>

<style scoped>

</style>
