<script lang="ts" setup>
import {NButton, NDropdown, NIcon, NP} from 'naive-ui';
import {PlayCircleOutline, SettingsOutline} from '@vicons/ionicons5';
import {convertToNaiveDropdownOptions} from '../utils/convert-to-naive-dropdown-options';
import {useLoggers} from '../composables/useLoggers';
import Title from '../components/Title.vue';

const {
  loggers,
  activeLogger,
  selectLogger,
} = useLoggers();

const options = convertToNaiveDropdownOptions(loggers.value);
</script>

<template>
  <Title text="Player" />

  <n-p class="p">
    <n-icon class="icon">
      <play-circle-outline />
    </n-icon>
    <n-dropdown
        :options="options"
        placement="bottom-start"
        trigger="hover"
        @select="selectLogger"
    >
      <n-button>{{ activeLogger }}</n-button>
    </n-dropdown>
    <n-icon class="icon">
      <settings-outline />
    </n-icon>
  </n-p>

  <n-p class="p spread">
    <span>
      Timestamp start (zoomed)
    </span>
    <span>
      File details
    </span>
    <span>
      Timestamp end (zoomed)
    </span>
  </n-p>

  <n-p class="p timeline timeline--big">
    Zoomed timeline
  </n-p>

  <n-p class="p timeline">
    Full timeline
  </n-p>

  <n-p class="p spread">
    <span>
      Timestamp start (full)
    </span>
    <span>
      Timestamp end (full)
    </span>
  </n-p>
</template>

<style lang="scss" scoped>
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
