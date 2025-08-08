<script lang="ts" setup>
import {NGi, NGrid, NTag} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppTooltip from 'src/app/app-tooltip.vue';
import {useDate} from 'src/composables/use-date';
import {type Interval} from 'src/composables/use-intervals';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';

interface Props {
  interval: Interval;
}

const props = defineProps<Props>();

const {select} = useAudioFile();
const {convertTimestampToDate} = useDate();
</script>

<template>
  <AppTooltip
    v-for="window in props.interval.windows"
    placement="bottom"
  >
    <template #body>
      <AppButton
        :handle-click="() => select(window)"
        size="small"
      >
        <AppIcon
          icon="audio"
          size="small"
        />
      </AppButton>
    </template>

    <template #tooltip>
      <NGrid
        :cols="1"
        x-gap="12"
      >
        <NGi>
          <NTag
            :bordered="false"
            size="small"
          >
            file
          </NTag>
          {{ window.file.Path }}
        </NGi>
        <NGi>
          <NTag
            :bordered="false"
            size="small"
          >
            file relative start
          </NTag>
          {{ window.relative.start }} ms
        </NGi>
        <NGi>
          <NTag
            :bordered="false"
            size="small"
          >
            date start
          </NTag>
          {{ convertTimestampToDate(window.absolute.start) }}
        </NGi>
      </NGrid>
    </template>
  </AppTooltip>
</template>
