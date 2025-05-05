<script lang="ts" setup>
import {useScatter} from 'src/components/scatter/use-scatter';
import {LassoSelector} from 'src/components/screen/lasso';
import {useScreen} from 'src/components/screen/use-screen';
import {useScreenCheck} from 'src/components/screen/use-screen-check';
import {useStorageReducedEmbeddings} from 'src/composables/use-storage-reduced-embeddings';
import {ref, watch} from 'vue';

import {project} from './project';

const {isEnabled, disable, selected} = useScreen();
const {isPointInPolygon} = useScreenCheck();
const {container: scatterContainer} = useScatter();

const container = ref<HTMLDivElement | null>(null);
const isDown = ref<boolean>(false);

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const {reducedEmbeddings} = useStorageReducedEmbeddings();

const selector = new LassoSelector(canvas);

watch([container, isEnabled], () => {
  if (
    container.value === null ||
    context === null ||
    isEnabled.value === false
  ) {
    return;
  }

  container.value.appendChild(canvas);

  container.value.onmousedown = () => {
    isDown.value = true;
  };

  container.value.onmouseup = () => {
    if (scatterContainer.value === null || reducedEmbeddings.value === null) {
      return;
    }

    const width = scatterContainer.value.clientWidth;
    const height = scatterContainer.value.clientHeight;

    const lassoPath = selector.getData(width, height);
    selector.close();
    isDown.value = false;
    disable();

    // @ts-ignore: undocumented api
    const scene = scatterContainer.value._fullLayout.scene;
    const gl = scene._scene.glplot;

    const firstTrace = Object.keys(scene._scene.traces)[0];
    const dataPoints = scene._scene.traces[firstTrace].dataPoints as [
      number,
      number,
      number,
    ][];

    // https://github.com/mrdoob/three.js/blob/master/src/math/Vector3.js#L273
    // https://github.com/plotly/plotly.js/blob/master/src/plots/gl3d/project.js
    const projectedPoints: [number, number][] = dataPoints.map((point) => {
      const v = project(gl.cameraParams, [point[0], point[1], point[2]]);
      const x = v[0] / v[3];
      const y = v[1] / v[3];
      const screenX = Math.round(((x + 1) * width) / 2);
      const screenY = Math.round(((-y + 1) * height) / 2);
      return [screenX, screenY];
    });

    const selectedPoints = projectedPoints.map((projectedPoint, i) =>
      isPointInPolygon(projectedPoint, lassoPath) ? i : null,
    );

    let filtered: number[] = [];

    for (const index of selectedPoints) {
      if (index === null) {
        continue;
      }

      filtered = [...filtered, index];
    }

    console.log({
      width,
      height,
      projectedPoints,
      lassoPath,
      filtered,
    });

    selected.value = filtered;
  };

  container.value.onmousemove = (e: MouseEvent) => {
    if (isDown.value === false) {
      return;
    }

    selector.mouseMove(e);
    selector.draw();
  };
});
</script>

<template>
  <div
    v-if="isEnabled"
    ref="container"
    :class="container"
  />
</template>

<style lang="scss" module>
@use 'src/styles/layers';

.container {
  position: fixed;
  z-index: layers.$screen-layer;
  top: 0;
  width: 100vw;
  height: 100vh;
  cursor: crosshair;
  background: red;
}
</style>
