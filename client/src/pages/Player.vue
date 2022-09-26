<script lang="ts" setup>
import {ref} from 'vue';
import {NButton, NDropdown, NIcon, NP} from 'naive-ui';
import {PlayCircleOutline, SettingsOutline} from '@vicons/ionicons5';

const loggers = ['Logger L42', 'Logger L01'];

const activeLogger = ref<string | null>(loggers[0]);

const handleSelect = (logger: string) => {
  if (logger === activeLogger.value) {
    return;
  }

  activeLogger.value = logger;
};

const options = loggers.map((logger) => {
  return {
    label: logger,
    key: logger,
  };
});
</script>

<template>
  <n-p>
    Player
  </n-p>

  <n-p class="p">
    <n-icon class="icon">
      <play-circle-outline />
    </n-icon>
    <n-dropdown
        :options="options"
        placement="bottom-start"
        trigger="hover"
        @select="handleSelect"
    >
      <n-button>{{ activeLogger }}</n-button>
    </n-dropdown>
    <n-icon class="icon">
      <settings-outline />
    </n-icon>
  </n-p>

  <n-p class="p spread">
    <span>
      Timestamp start (full)
    </span>
    <span>
      File details
    </span>
    <span>
      Timestamp end (full)
    </span>
  </n-p>

  <n-p class="p timeline">
    Full timeline
  </n-p>

  <n-p class="p timeline timeline--big">
    Zoomed timeline
  </n-p>

  <n-p class="p spread">
    <span>
      Timestamp start (zoomed)
    </span>
    <span>
      Timestamp end (zoomed)
    </span>
  </n-p>
</template>

<style lang="scss">
.p {
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 0.5rem;

  user-select: none;
}

.spread {
  justify-content: space-between;
}

.timeline {
  height: 2rem;
  border: 1px solid black;
}

.timeline--big {
  height: 4rem;
}

.icon {
  font-size: 24px;
  cursor: pointer;
}
</style>
