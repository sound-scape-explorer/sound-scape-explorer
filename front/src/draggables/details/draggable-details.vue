<script lang="ts" setup="">
import {HeadsetOutline} from '@vicons/ionicons5';
import type {Dayjs} from 'dayjs';
import {NButton, NGi, NGrid, NIcon, NTag, NTooltip} from 'naive-ui';
import AppCondition from 'src/app/app-condition.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useBandSelection} from 'src/composables/band-selection';
import {useDate} from 'src/composables/date';
import {useExtractorStorage} from 'src/composables/extractor-storage';
import {useIntegrationSelection} from 'src/composables/integration-selection';
import {useStorageAggregatedIndicators} from 'src/composables/storage-aggregated-indicators';
import {useStorageLabels} from 'src/composables/storage-labels';
import {useAudioFile} from 'src/draggables/audio/audio-file';
import {useDetails} from 'src/draggables/details/details';
import {useScatterClick} from 'src/scatter/scatter-click';
import {computed, watch} from 'vue';

const {nonNnExtractors} = useExtractorStorage();
const {band} = useBandSelection();
const {integration} = useIntegrationSelection();
const {aggregatedIndicators} = useStorageAggregatedIndicators();
const {labelProperties} = useStorageLabels();
const {clickedIndex, hasClicked} = useScatterClick();

const {date, labelValues, site, blocks} = useDetails();

const {select} = useAudioFile();
const {convertTimestampToIsoDate, convertDateToIsoDate} = useDate();

const dateEndRef = computed<Dayjs | null>(() => {
  if (date.value === null || integration.value === null) {
    return null;
  }

  return date.value.add(integration.value.seconds, 'seconds');
});

watch(blocks, () => {
  if (blocks.value === null) {
    return;
  }

  if (blocks.value.length !== 1) {
    return;
  }

  const blockDetails = blocks.value[0];
  select(blockDetails);
});
</script>

<template>
  <AppDraggable draggable-key="details">
    <AppCondition
      :wait-if="!hasClicked"
      wait-message="please click a point"
    >
      <div class="file container">
        <div class="title">Selected interval index</div>
        <span class="file index">{{ clickedIndex ?? 'none' }}</span>
      </div>

      <div class="file container">
        <div class="title">Site</div>
        <span class="file index">{{ site?.site ?? '' }}</span>
      </div>

      <div class="file container">
        <div class="title">Audio blocks</div>
        <span class="file index">
          <NTooltip
            v-for="blockDetails in blocks"
            placement="bottom"
            trigger="hover"
          >
            <!--suppress VueUnrecognizedSlot -->
            <template #trigger>
              <NButton
                class="zoom"
                size="small"
                @click="() => select(blockDetails)"
              >
                <template #icon>
                  <NIcon>
                    <HeadsetOutline />
                  </NIcon>
                </template>
              </NButton>
            </template>

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
                {{ blockDetails.file }}
              </NGi>
              <NGi>
                <NTag
                  :bordered="false"
                  size="small"
                >
                  file start
                </NTag>
                {{ blockDetails.fileStart }} ms
              </NGi>
              <NGi>
                <NTag
                  :bordered="false"
                  size="small"
                >
                  start
                </NTag>
                {{ convertTimestampToIsoDate(blockDetails.start) }}
              </NGi>
            </NGrid>
          </NTooltip>
        </span>
      </div>

      <div class="separator" />

      <div class="file container">
        <div class="title">Date Start</div>
        <span class="file index">{{ date && convertDateToIsoDate(date) }}</span>
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
        v-if="hasClicked"
        class="file container details"
      >
        <span />
        <NGrid
          :cols="2"
          x-gap="12"
        >
          <!--suppress JSUnusedLocalSymbols -->
          <NGi v-for="(_, index) in labelProperties">
            <NTag
              :bordered="false"
              size="small"
            >
              {{ labelProperties?.[index] }}
            </NTag>

            {{ labelValues?.[index] }}
          </NGi>
        </NGrid>

        <div class="separator" />

        <div class="title">Indicators</div>

        <NGrid
          v-if="aggregatedIndicators !== null"
          :cols="2"
          x-gap="12"
        >
          <NGi v-for="(ex, index) in nonNnExtractors">
            <NTag
              :bordered="false"
              size="small"
            >
              {{ ex.name }}
            </NTag>

            {{ aggregatedIndicators[index].values[clickedIndex ?? 0] }}
          </NGi>
        </NGrid>
      </div>
    </AppCondition>
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
