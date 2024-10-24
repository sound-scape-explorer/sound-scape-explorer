<script lang="ts" setup>
import {computed, onMounted, ref, watch} from 'vue';

const props = defineProps({
  value: {type: Number, default: 0},
  peakValue: {type: Number, default: 0},
  refreshRate: {type: Number, default: 100},
  clipSize: {type: Number, default: 10},
  width: {type: Number, default: 10},
  height: {type: Number, default: 150},
  showPeaks: {type: Boolean, default: false},
});

const peakVal = ref(props.peakValue);

const dbValue = computed(() => 20 * Math.log10(props.value));
const dbPeakValue = computed(() => 20 * Math.log10(peakVal.value));
const canvas = ref<HTMLCanvasElement | null>(null);
const smoothingFactor = 50;

const smoothPeak = (newVal: number) => {
  if (!props.showPeaks) {
    return;
  }

  if (newVal > peakVal.value) {
    peakVal.value = newVal;
    return;
  }

  peakVal.value =
    newVal * (1 / smoothingFactor) +
    peakVal.value * ((smoothingFactor - 1) / smoothingFactor);
};

const draw = () => {
  if (canvas.value === null) {
    return;
  }

  const ctx = canvas.value.getContext('2d');
  if (!ctx) {
    return;
  }

  const clipSize = props.clipSize;
  const showPeaks = props.showPeaks;
  const amp = dbValue.value;
  const peak = dbPeakValue.value;

  const w = canvas.value.width;
  const h = canvas.value.height;

  const hInRange = h - clipSize;
  const gradient = ctx.createLinearGradient(0, 0, 0, h);

  gradient.addColorStop(0, 'red');
  gradient.addColorStop(clipSize / h, 'orange');
  gradient.addColorStop(clipSize / h, 'greenyellow');
  gradient.addColorStop(1, 'lime');

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, h - hInRange * (amp / 76 + 1), w, hInRange * (amp / 76 + 1));

  if (showPeaks) {
    ctx.fillStyle = peak / 76 + 1 >= 1 ? 'red' : 'greenyellow';
    ctx.fillRect(0, Math.round(h - hInRange * (peak / 76 + 1)), w, 1);
  }

  // 0 dB
  ctx.fillStyle = 'gainsboro';
  ctx.fillRect(0, clipSize, w, 1);
};

onMounted(draw);

watch(
  () => props.value,
  (newValue: number) => {
    smoothPeak(newValue);
    draw();
  },
);
</script>

<template>
  <canvas
    ref="canvas"
    :height="height"
    :width="width"
  />
</template>
