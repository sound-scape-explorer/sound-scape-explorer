<script lang="ts" setup="">
import {NGi, NGrid, NTag} from 'naive-ui';
import {bandRef} from 'src/hooks/useBands';
import {nonNnExtractorsRef} from 'src/hooks/useExtractors';
import {integrationRef} from 'src/hooks/useIntegrations';
import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';

import {clickedRef} from '.././Scatter/useScatterClick';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import {useDetails} from './useDetails';

const {
  intervalDateRef,
  intervalLabelsRef,
  intervalSiteRef,
  intervalDetailsRef,
} = useDetails();
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
      <div class="title">File indexes</div>
      <span class="file index">{{ intervalDetailsRef ?? '' }}</span>
    </div>

    <div class="file container">
      <div class="title">Timestamp</div>
      <span class="file index">{{ intervalDateRef }}</span>
    </div>

    <div class="file container">
      <div class="title">Band</div>
      <span class="file index">{{ bandRef.value?.name ?? '' }}</span>
    </div>

    <div class="file container">
      <div class="title">Integration</div>
      <span class="file index">{{ integrationRef.value?.name ?? '' }}</span>
    </div>

    <div class="separator" />

    <div class="title">Labels</div>

    <div
      v-if="clickedRef !== null"
      class="file container details"
    >
      <span />
      <n-grid
        :cols="2"
        class="grid"
        x-gap="12"
      >
        <!--suppress JSUnusedLocalSymbols -->
        <n-gi v-for="(_, index) in metaPropertiesRef.value">
          <n-tag
            :bordered="false"
            class="tag"
            size="small"
          >
            {{ metaPropertiesRef.value?.[index] }}
          </n-tag>

          {{ intervalLabelsRef?.[index] }}
        </n-gi>
      </n-grid>

      <div class="separator" />

      <div class="title">Extracted Data</div>

      <n-grid
        :cols="2"
        class="grid"
      >
        <n-gi v-for="ex in nonNnExtractorsRef.value">
          <n-tag
            :bordered="false"
            class="tag"
            size="small"
          >
            {{ ex.name }}
          </n-tag>

          <!-- TODO: Add -->
          <!-- {{ indicator.values[clickedRef.value ?? 0] }} -->
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
  gap: 0.5rem;
}

.title {
  font-weight: bold;
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
