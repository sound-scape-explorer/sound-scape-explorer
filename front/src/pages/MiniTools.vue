<script lang="ts" setup>
import {NCode} from 'naive-ui';
import Title from '../components/Title.vue';
//
</script>

<template>
  <Title text="MiniTools" />

  Link to
  <a class="link" href="https://dl.heeere.com/2022-lagon-bora/" target="_blank">legacy</a>
  <div class="minitools-tooltip">
    (Browse to
    <n-code code="MiniTools" inline />
    after click)
  </div>
</template>

<style lang="scss" scoped>
.link {
  text-decoration: underline;
  color: #18a058;
}

.minitools-tooltip {
  font-size: 0.8rem;

  & * {
    font-size: 0.8rem;
  }
}
</style>
