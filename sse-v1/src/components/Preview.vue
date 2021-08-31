<template>
  <div class="view-preview">
    <audio ref="audio" controls :src="previewURL"></audio>
    <div class="band-spectro" v-for="(b, k) in root.cfg.bands" :key="k">
      <div class="band-name">{{ k }}</div>
      <img :src="bandPreviewImageURL(k)" @click="clickSpectro($event)" />
    </div>
  </div>
</template>

<script>
export default {
  inject: ["root"],
  computed: {
    previewURL() {
      const V = this.root.cfg.variables;
      return this.root.BASE + V.audio_base + V.preview_file + V.audio_suffix;
    },
  },
  methods: {
    bandPreviewImageURL(band) {
      const cfg = this.root.cfg;
      const BASE = this.root.BASE;
      return `${BASE}${cfg.variables.generated_base}preview-spectrogram/${band}.png`;
    },
    //////////
    clickSpectro(ev) {
      const e = ev.target;
      const dim = e.getBoundingClientRect();
      const posx = (ev.clientX - dim.left) / dim.width;
      //const posy = (ev.clientY - dim.top) / dim.height;
      const audio = this.$refs.audio;
      audio.currentTime =
        parseFloat(this.root.cfg.variables.preview_file_start) +
        posx * parseFloat(this.root.cfg.variables.preview_file_dur);
      //audio.playbackRate = 0.5;
      //audio.mozPreservesPitch = audio.webkitPreservesPitch = false;
      audio.play();
      audio.focus();
    },
  },
};
</script>

<style>
.view-preview {
  position: relative;
}
.view-preview audio:not(:hover) {
  width: 200px;
}
.view-preview audio {
  transition: width 300ms ease-in-out;
  width: calc(100% - 300px);
  margin: 0 150px;
}
.band-spectro img {
  width: 100%;
  cursor: crosshair;
  border: 1px solid black;
  box-sizing: border-box;
  border-top-width: 0;
}
.band-name {
  font-size: 50%;
  font-weight: bold;
  color: yellowgreen;
  background: #444;
  border: 1px solid black;
  border-bottom-width: 0;
  padding: 0.2em 0 0 0;
  text-align: center;
}
</style>
