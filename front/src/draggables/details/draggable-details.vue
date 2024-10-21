<script lang="ts" setup="">
import {HeadsetOutline} from '@vicons/ionicons5';
import {NButton, NGi, NGrid, NIcon, NTag, NTooltip} from 'naive-ui';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useBandSelection} from 'src/composables/use-band-selection';
import {useDate} from 'src/composables/use-date';
import {useExtractors} from 'src/composables/use-extractors';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useStorageAggregatedIndicators} from 'src/composables/use-storage-aggregated-indicators';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {useIntervalSelector} from 'src/draggables/audio/use-interval-selector';
import {useDetails} from 'src/draggables/details/use-details';
import {useDetailsAutoselectAudio} from 'src/draggables/details/use-details-autoselect-audio';
import {watch} from 'vue';

const {nonNnExtractors} = useExtractors();
const {band} = useBandSelection();
const {integration} = useIntegrationSelection();
const {aggregatedIndicators} = useStorageAggregatedIndicators();
const {labelProperties} = useStorageLabels();
const {currentIntervalIndex, hasClicked} = useIntervalSelector();
const {select} = useAudioFile();
const {convertTimestampToIsoDate, convertDateToIsoDate} = useDate();
const {autoselect} = useDetailsAutoselectAudio();
const {
  date,
  dateEnd,
  labelValues,
  site,
  blocks,
  readDetails,
  timeshift,
  updateDates,
} = useDetails();

watch(blocks, autoselect);
watch(currentIntervalIndex, readDetails);
watch(timeshift, updateDates);
</script>

<template>
  <AppDraggable
    draggable-key="details"
    suspense="scatterClick"
  >
    <div :class="[$style.file, $style.container]">
      <div :class="$style.title">Selected interval index</div>
      <span :class="[$style.file, $style.index]">{{
        currentIntervalIndex ?? 'none'
      }}</span>
    </div>

    <div :class="[$style.file, $style.container]">
      <div :class="$style.title">Site</div>
      <span :class="[$style.file, $style.index]">{{ site?.site ?? '' }}</span>
    </div>

    <div :class="[$style.file, $style.container]">
      <div :class="$style.title">Audio blocks</div>
      <span :class="[$style.file, $style.index]">
        <NTooltip
          v-for="blockDetails in blocks"
          placement="bottom"
          trigger="hover"
        >
          <!--suppress VueUnrecognizedSlot -->
          <template #trigger>
            <NButton
              :class="$style.zoom"
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

    <div :class="$style.separator" />

    <div :class="[$style.file, $style.container]">
      <div :class="$style.title">Date Start</div>
      <span :class="[$style.file, $style.index]">{{
        date && convertDateToIsoDate(date)
      }}</span>
    </div>

    <div :class="[$style.file, $style.container]">
      <div :class="$style.title">Date End</div>
      <span :class="[$style.file, $style.index]">{{
        dateEnd && convertDateToIsoDate(dateEnd)
      }}</span>
    </div>

    <div :class="[$style.file, $style.container]">
      <div :class="$style.title">Band</div>
      <span :class="[$style.file, $style.index]">{{ band?.name ?? '' }}</span>
    </div>

    <div :class="[$style.file, $style.container]">
      <div :class="$style.title">Integration</div>
      <span :class="[$style.file, $style.index]">{{
        integration?.name ?? ''
      }}</span>
    </div>

    <div :class="$style.separator" />

    <div :class="$style.title">Labels</div>

    <div
      v-if="hasClicked"
      :class="[$style.file, $style.container, $style.details]"
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

      <div :class="$style.separator" />

      <div :class="$style.title">Indicators</div>

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

          {{ aggregatedIndicators[index].values[currentIntervalIndex ?? 0] }}
        </NGi>
      </NGrid>
    </div>
  </AppDraggable>
</template>

<style lang="scss" module>
.index {
  font-style: italic;
}

.container {
  display: flex;
  justify-content: space-between;
  width: $s2;
  padding-right: $g0;
}

.title {
  font-weight: bold;
  display: flex;
  align-items: center;
  padding-left: 1px;
}

.file.container.details {
  flex-direction: column;
  gap: $g0;

  div {
    display: flex;
    justify-content: space-between;
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
}

.src {
  overflow: hidden;
}

.separator {
  height: $p0;
}
</style>
