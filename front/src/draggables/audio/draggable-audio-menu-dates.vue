<script lang="ts" setup="">
import {copyToClipboard} from '@shared/browser';
import {NGi, NGrid, NTag} from 'naive-ui';
import AppTooltip from 'src/app/app-tooltip.vue';
import {useDate} from 'src/composables/use-date';
import {useInterval} from 'src/composables/use-interval';
import {useThemeColors} from 'src/composables/use-theme-colors';

const {currentInterval} = useInterval();
const {convertTimestampToIsoDate} = useDate();
const {colors} = useThemeColors();
</script>

<template>
  <span>Dates</span>
  <div
    v-if="currentInterval"
    :class="$style.container"
  >
    <NGrid
      cols="2"
      x-gap="4"
    >
      <NGi>
        <NTag
          :bordered="false"
          :class="$style.copy"
          size="small"
          @click="
            copyToClipboard(convertTimestampToIsoDate(currentInterval.start))
          "
        >
          <AppTooltip>
            <template #tooltip>Copy</template>
            <template #body>Start</template>
          </AppTooltip>
        </NTag>

        {{ convertTimestampToIsoDate(currentInterval.start) }}
      </NGi>

      <NGi>
        <NTag
          :bordered="false"
          :class="$style.copy"
          size="small"
          @click="
            copyToClipboard(convertTimestampToIsoDate(currentInterval.end))
          "
        >
          <AppTooltip>
            <template #tooltip>Copy</template>
            <template #body>End</template>
          </AppTooltip>
        </NTag>

        {{ convertTimestampToIsoDate(currentInterval.end) }}
      </NGi>
    </NGrid>
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.container {
  > div {
    display: grid;
    gap: sizes.$g0;
    grid-template-columns: 1fr 1fr;
  }
}

.copy {
  &:hover {
    cursor: pointer;
  }

  &:active {
    background: v-bind('colors.actionColor');
  }
}
</style>
