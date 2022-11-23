<script lang="ts" setup>
import {NAlert} from 'naive-ui';
import {configStore} from '../store/config.store';
import Modal from './Modal.vue';
//
</script>

<template>
  <Modal v-if="configStore.isError">
    <n-alert
        title="Warning"
        type="warning"
    >
      <div>
        Configuration could not be loaded.
      </div>
      <div>
        Please wait a few seconds and refresh the page.
      </div>
      <div>
        If the problem persists, submit your errors
        <a
            class="link"
            href="https://github.com/sound-scape-explorer/sound-scape-explorer/issues"
            target="_blank"
        >
          here
        </a>
      </div>
    </n-alert>
  </Modal>
</template>

<style lang="scss" scoped>
.link {
  text-decoration: underline;
  font-weight: bold;
  display: inline-block;
}
</style>
