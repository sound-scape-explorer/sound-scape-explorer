<script lang="ts" setup>
import {onBeforeMount, ref, watch} from 'vue';
import {NAlert} from 'naive-ui';
import {configStore} from '../store/config.store';

/**
 * State
 */

const isLoading = ref<boolean>(true);

/**
 * Handlers
 */

function updateReadiness() {
  isLoading.value = !configStore.isLoaded;
}

/**
 * Lifecycles
 */

onBeforeMount(() => {
  updateReadiness();
});

watch(configStore, () => {
  updateReadiness();
});
</script>

<template>
  <div v-if="isLoading" class="container">
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
        If the problem persists, submit an issue
        <a
            class="link"
            href="https://github.com/sound-scape-explorer/sound-scape-explorer/issues/new"
            target="_blank"
        >
          here
        </a>
      </div>
    </n-alert>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;

  width: 100%;
  height: 100%;

  padding: 0 1rem;
  margin-bottom: 1rem;

  z-index: 100;

  background: rgba(0, 0, 0, 0.7);

  user-select: none;

  animation: FadeIn 1s ease-in-out;
}

.link {
  text-decoration: underline;
  font-weight: bold;
  display: inline-block;
}

@keyframes FadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes FadeOut {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
