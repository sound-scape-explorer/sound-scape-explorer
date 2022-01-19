<template>
  <div class="view-preview">
    <canvas
      width="800"
      height="512"
      ref="spectroCanvas"
      class="spectro-canvas"
    ></canvas>
    <audio ref="audio" controls crossorigin :src="previewURL"></audio>
    <div class="audio-tools">
      {{ showHz.toFixed(0) }}Hz <br />
      <label>
        <input type="checkbox" v-model="changePitch" /> listen to ultrasound
      </label>
    </div>
    <div class="band-spectro" v-for="(b, k) in root.cfg.bands" :key="k">
      <div class="band-name">
        <span>{{ k }}</span> ({{ bandInfo(b) }})
      </div>
      <img :src="bandPreviewImageURL(k)" @click="clickSpectro($event, b)" />
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

import { getBandBoundsFromSpec, mel2hz } from "@/utils.js";

export default {
  inject: ["root"],
  data: () => ({
    changePitch: false, /*permit to listen to ultrasound*/
    showHz: -1,
  }),
  computed: {
    previewURL() {
      const B = this.root.BASE + this.root.cfg.variables.generated_base;
      if (this.changePitch) {
        return B + "preview-audio/hzdiv10.wav";
      } else {
        return B + "preview-audio/normal.wav";
        //this.root.BASE + V.audio_base + V.preview_file + V.audio_suffix;
      }
    },
  },
  mounted() {
    // TODO on first click because of permissions (autoplay)
    this.configureAudioChain();
  },
  methods: {
    configureAudioChain() {
      if (this.audioContext) {
        this.audioContext.close();
      }
      const audioContext = new AudioContext({ sampleRate: 192000 });
      const track = audioContext.createMediaElementSource(this.$refs.audio); // it must be tagged as crossorigin or it will output silence...
      //const gainNode = audioContext.createGain();
      //gainNode.gain.value = 2;
      const freqFilter = (ty, freq, Q) => {
        const res = audioContext.createBiquadFilter();
        res.type = ty;
        res.frequency.value = freq;
        res.Q.value = Q;
        return res;
      };
      console.log(freqFilter); //

      /*
      const distortion = (amount) => {
        ////k=400 ; plt.plot(( 3 + k ) * x * 20 * np.pi/180 / ( np.pi + k * np.abs(x) ));plt.show()
        const res = audioContext.createWaveShaper();
        const k = typeof amount === "number" ? amount : 50;
        const n_samples = 1000;
        const curve = new Float32Array(n_samples);
        let i = 0,
          x = 0;
        for (; i < n_samples; ++i) {
          //x = (i * 2) / n_samples - 1;
          //curve[i] = ((3 + k) * x * 20 * Math.PI / 180) / (Math.PI + k * Math.abs(x));
          curve[i] = Math.max(
            0,
            -1 + (2 * i) / (n_samples - 1) + amount * k * x * 0
          );
        }
        res.curve = curve;
        return res;
      };
      console.log(distortion);
      */

      const analyser = audioContext.createAnalyser();
      analyser.smoothingTimeConstant = 0;
      analyser.fftSize = 2048;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);

      const canvas = this.$refs.spectroCanvas;
      const canvasCtx = canvas.getContext("2d");
      canvasCtx.fillStyle = `black`;
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
      let j = 0;
      // draw a spectrogram (relying on the relative regularity of raf (req. anim. frame))
      let a = this.$refs.audio;
      function draw() {
        if (a.paused) {
          setTimeout(() => {
            requestAnimationFrame(draw);
          }, 100);
          return;
        }

        analyser.getByteFrequencyData(dataArray);
        for (var i = 0; i < dataArray.length; i++) {
          // draw each pixel with the specific color
          var v = dataArray[i];
          canvasCtx.fillStyle = `rgb(${v},${v},${v})`; //hot.getColor(value).hex();
          canvasCtx.fillRect(j, 512 - i, 1, 1);
        }
        j = (j + 1) % canvas.width;
        canvasCtx.fillStyle = `red`;
        canvasCtx.fillRect(j, 0, 7, canvas.height);
        requestAnimationFrame(draw);
      }
      draw();
      track
        //.connect(freqFilter("bandpass", 6800, 25))
        //.connect(freqFilter("lowpass", 6000, 10))
        //.connect(distortion(400))
        .connect(analyser)
        .connect(audioContext.destination);
      this.track = track;
      this.audioContext = audioContext;
    },
    //////////
    bandPreviewImageURL(band) {
      const cfg = this.root.cfg;
      const BASE = this.root.BASE;
      return `${BASE}${cfg.variables.generated_base}preview-spectrogram/${band}.png`;
    },
    bandInfo(bstr) {
      const b = this.parseBand(bstr);
      const cfg = this.root.cfg;
      const sr = parseInt(cfg.variables.audio_expected_sample_rate);
      const [hzStart, hzEnd] = getBandBoundsFromSpec(b, sr, true);
      return `${hzStart.toFixed(0)}Hz-${hzEnd.toFixed(0)}Hz`;
    },
    //////////
    parseBand(bstr) {
      return bstr.split("-").map((s) => parseInt(s));
    },
    hzFromBandProp(b, prop) {
      const cfg = this.root.cfg;
      const sr = parseInt(cfg.variables.audio_expected_sample_rate);
      const [melStart, melEnd] = getBandBoundsFromSpec(b, sr, false);
      const m = melStart + (melEnd - melStart) * prop;
      return mel2hz(m);
    },
    clickSpectro(ev, bstr) {
      const e = ev.target;
      const dim = e.getBoundingClientRect();
      const posx = (ev.clientX - dim.left) / dim.width;
      const posy = (ev.clientY - dim.top) / dim.height;
      const b = this.parseBand(bstr);
      const hz = this.hzFromBandProp(b, 1 - posy);
      this.showHz = hz;
      if (ev.shiftKey) {
        return;
      }
      const audio = this.$refs.audio;
      audio.currentTime =
        //parseFloat(this.root.cfg.variables.preview_file_start) + // we now use precut audio
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
  /*
  width: 200px;
  transition: transform 300ms ease-out;
  */
}
.view-preview .spectro-canvas {
  width: 900px;
  height: 500px;
  margin: 0 -740px -410px 0;
  transform-origin: top left;
  transform: scale(calc(1 / 6), calc(1 / 6));
}
.view-preview .spectro-canvas:hover {
  transform: scale(1, 1);
}
.view-preview audio {
  transition: width 300ms ease-in-out;
  width: calc(100% - 300px);
  margin: 0;
}
.view-preview .audio-tools {
  width: 150px;
  display: inline-block;
}
.band-spectro img {
  width: 100%;
  cursor: crosshair;
  border: 1px solid black;
  box-sizing: border-box;
  border-top-width: 0;
}
.band-name {
  font-size: 75%;
  color: yellowgreen;
  background: #444;
  border: 1px solid black;
  border-bottom-width: 0;
  padding: 0.2em 0 0 0;
  text-align: center;
}
.band-name span {
  font-weight: bold;
}
</style>
