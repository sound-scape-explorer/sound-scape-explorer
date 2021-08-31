<template>
  <div>
    <img class="logo" alt="SoundScapeExplorer logo" src="./assets/logo.png" />
    <Preview></Preview>
    <pre>{{ JSON.stringify(cfg, null, 2) }}</pre>
  </div>
</template>

<script>
import Preview from "./components/Preview.vue";

export default {
  name: "App",
  components: { Preview },
  data: () => ({
    BASE: "http://localhost:9876/",
    cfg: {},
  }),
  provide() {
    return {
      root: this,
    };
  },
  mounted() {
    this.asyncLoadConfig();
  },
  methods: {
    async asyncLoadConfig() {
      const req = await fetch(this.BASE + "generated/ghost-config.json");
      this.cfg = await req.json();
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  position: fixed;
  width: 100px;
  top: 0;
  left: 0;
}
</style>
