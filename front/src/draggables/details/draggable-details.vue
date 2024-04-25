<script lang="ts" setup="">
import {HeadsetOutline} from '@vicons/ionicons5';
import type {Dayjs} from 'dayjs';
import {NButton, NGi, NGrid, NIcon, NTag, NTooltip} from 'naive-ui';
import AppDraggable from 'src/app/app-draggable.vue';
import {useBandSelection} from 'src/composables/band-selection';
import {useDate} from 'src/composables/date';
import {useExtractorStorage} from 'src/composables/extractor-storage';
import {useIntegrationSelection} from 'src/composables/integration-selection';
import {useStorageAggregatedIndicators} from 'src/composables/storage-aggregated-indicators';
import {useStorageLabels} from 'src/composables/storage-labels';
import {useAudioFile} from 'src/draggables/audio/audio-file';
import {useDetails} from 'src/draggables/details/details';
import {clickedRef} from 'src/scatter/scatter-click';
import {computed, watch} from 'vue';

const {nonNnExtractors} = useExtractorStorage();
const {band} = useBandSelection();
const {integration} = useIntegrationSelection();
const {aggregatedIndicators} = useStorageAggregatedIndicators();
const {labelsProperties} = useStorageLabels();

const {
  intervalDateRef,
  intervalLabelsRef,
  intervalSiteRef,
  intervalDetailsRef,
} = useDetails();

const {selectAudioBlock} = useAudioFile();
const {convertTimestampToIsoDate, convertDateToIsoDate} = useDate();

const dateEndRef = computed<Dayjs | null>(() => {
  if (intervalDateRef.value === null || integration.value === null) {
    return null;
  }

  return intervalDateRef.value.add(integration.value.seconds, 'seconds');
});

watch(intervalDetailsRef, () => {
  if (intervalDetailsRef.value === null) {
    return;
  }

  if (intervalDetailsRef.value.length !== 1) {
    return;
  }

  const blockDetails = intervalDetailsRef.value[0];
  selectAudioBlock(blockDetails);
});
</script>

<template>
  <AppDraggable draggable-key="details">
    <div class="file container">
      <div class="title">Selected interval index</div>
      <span class="file index">{{ clickedRef.value ?? 'none' }}</span>
    </div>

    <div class="file container">
      <div class="title">Site</div>
      <span class="file index">{{ intervalSiteRef?.site ?? '' }}</span>
    </div>

    <div class="file container">
      <div class="title">Audio blocks</div>
      <span class="file index">
        <n-tooltip
          v-for="blockDetails in intervalDetailsRef"
          placement="bottom"
          trigger="hover"
        >
          <template #trigger>
            <n-button
              class="zoom"
              size="small"
              @click="() => selectAudioBlock(blockDetails)"
            >
              <template #icon>
                <n-icon>
                  <HeadsetOutline />
                </n-icon>
              </template>
            </n-button>
          </template>

          <n-grid
            :cols="1"
            x-gap="12"
          >
            <n-gi>
              <n-tag
                :bordered="false"
                size="small"
              >
                file
              </n-tag>
              {{ blockDetails.file }}
            </n-gi>
            <n-gi>
              <n-tag
                :bordered="false"
                size="small"
              >
                file start
              </n-tag>
              {{ blockDetails.fileStart }} ms
            </n-gi>
            <n-gi>
              <n-tag
                :bordered="false"
                size="small"
              >
                start
              </n-tag>
              {{ convertTimestampToIsoDate(blockDetails.start) }}
            </n-gi>
          </n-grid>
        </n-tooltip>
      </span>
    </div>

    <div class="separator" />

    <div class="file container">
      <div class="title">Date Start</div>
      <span class="file index">{{
        intervalDateRef && convertDateToIsoDate(intervalDateRef)
      }}</span>
    </div>

    <div class="file container">
      <div class="title">Date End</div>
      <span class="file index">{{
        dateEndRef && convertDateToIsoDate(dateEndRef)
      }}</span>
    </div>

    <div class="file container">
      <div class="title">Band</div>
      <span class="file index">{{ band?.name ?? '' }}</span>
    </div>

    <div class="file container">
      <div class="title">Integration</div>
      <span class="file index">{{ integration?.name ?? '' }}</span>
    </div>

    <div class="separator" />

    <div class="title">Labels</div>

    <div
      v-if="clickedRef.value !== null"
      class="file container details"
    >
      <span />
      <n-grid
        :cols="2"
        x-gap="12"
      >
        <!--suppress JSUnusedLocalSymbols -->
        <n-gi v-for="(_, index) in labelsProperties">
          <n-tag
            :bordered="false"
            size="small"
          >
            {{ labelsProperties?.[index] }}
          </n-tag>

          {{ intervalLabelsRef?.[index] }}
        </n-gi>
      </n-grid>

      <div class="separator" />

      <div class="title">Indicators</div>

      <n-grid
        v-if="aggregatedIndicators !== null"
        :cols="2"
        x-gap="12"
      >
        <n-gi v-for="(ex, index) in nonNnExtractors">
          <n-tag
            :bordered="false"
            size="small"
          >
            {{ ex.name }}
          </n-tag>

          {{ aggregatedIndicators[index].values[clickedRef.value ?? 0] }}
        </n-gi>
      </n-grid>
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.index {
  font-style: italic;
}

.container {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.title {
  font-weight: bold;
  display: flex;
  align-items: center;
}

.file.container.details {
  flex-direction: column;
  gap: 2px;

  div {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }
}

.meta.container {
  display: grid;
  flex-direction: column;
}

.file-details {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr 1fr;
  gap: 0 0.5rem;
}

.src {
  overflow: hidden;
}

.separator {
  height: 1rem;
}
</style>
