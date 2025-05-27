<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {headsetOutline} from 'ionicons/icons';
import {NButton, NGi, NGrid, NTag} from 'naive-ui';
import AppTooltip from 'src/app/app-tooltip.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useDate} from 'src/composables/use-date';
import {DraggableKey} from 'src/composables/use-draggables';
import {useIntervalSelector} from 'src/composables/use-interval-selector';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {useViewSelection} from 'src/composables/use-view-selection';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {useDetails} from 'src/draggables/details/use-details';
import {useDetailsAutoselectAudio} from 'src/draggables/details/use-details-autoselect-audio';
import {watch} from 'vue';

const {band, integration} = useViewSelection();
// const {indices} = useExtractors();
// const {aggregatedIndices} = useStorageAggregatedIndices();
const {allUniques} = useTagUniques();
const {currentIntervalIndex, hasClicked} = useIntervalSelector();
const {select} = useAudioFile();
const {convertTimestampToIsoDate, convertDateToIsoDate} = useDate();
const {autoselect} = useDetailsAutoselectAudio();
const {
  date,
  dateEnd,
  labelValues,
  site,
  windows,
  readDetails,
  timeshift,
  updateDates,
} = useDetails();

watch(windows, autoselect);
watch(currentIntervalIndex, readDetails);
watch(timeshift, updateDates);
</script>

<template>
  <AppDraggable
    :draggable-key="DraggableKey.enum.details"
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
      <span :class="[$style.file, $style.index]">{{ site ?? '' }}</span>
    </div>

    <div :class="[$style.file, $style.container]">
      <div :class="$style.title">Audio blocks</div>
      <span :class="[$style.file, $style.index]">
        <AppTooltip
          v-for="window in windows"
          placement="bottom"
        >
          <template #body>
            <NButton
              :class="$style.zoom"
              size="small"
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
                {{ convertTimestampToIsoDate(window.absolute.start) }}
              </NGi>
            </NGrid>
          </template>
        </AppTooltip>
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
        <NGi v-for="(_, index) in Object.keys(allUniques)">
          <NTag
            :bordered="false"
            size="small"
          >
            {{ Object.keys(allUniques)[index] }}
          </NTag>

          <!-- todo: fix me -->
          {{ labelValues[index] }}
        </NGi>
      </NGrid>

      <div :class="$style.separator" />

      <!--      <div :class="$style.title">Indicators</div>-->

      <!-- TODO: update me -->
      <!--      <NGrid-->
      <!--        v-if="aggregatedIndices !== null"-->
      <!--        :cols="2"-->
      <!--        x-gap="12"-->
      <!--      >-->
      <!--        <NGi v-for="(index, i) in indices">-->
      <!--          <NTag-->
      <!--            :bordered="false"-->
      <!--            size="small"-->
      <!--          >-->
      <!--            {{ index.impl }}-->
      <!--          </NTag>-->
      <!--          {{ aggregatedIndices[i].values[currentIntervalIndex ?? 0] }}-->
      <!--        </NGi>-->
      <!--      </NGrid>-->
    </div>
  </AppDraggable>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.index {
  font-style: italic;
}

.container {
  display: flex;
  justify-content: space-between;
  width: sizes.$w1;
  padding-right: sizes.$g0;
}

.title {
  font-weight: bold;
  display: flex;
  align-items: center;
  padding-left: 1px;
}

.file.container.details {
  flex-direction: column;
  gap: sizes.$g0;

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
  height: sizes.$p0;
}
</style>
