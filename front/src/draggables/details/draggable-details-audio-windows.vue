<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {headsetOutline} from 'ionicons/icons';
import {NButton, NGi, NGrid, NTag} from 'naive-ui';
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
      <NButton
        size="tiny"
        @click="() => select(window)"
      >
        <IonIcon :icon="headsetOutline" />
      </NButton>
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
