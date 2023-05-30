<script lang="ts" setup="">
import {NGi, NGrid, NTag} from 'naive-ui';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import {useDetails} from './useDetails';
import {clickedRef} from '../Scatter/useScatterClick';
import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';
import {bandRef} from 'src/hooks/useBand';
import {indicatorsRef} from 'src/hooks/useStorageIndicators';
import {integrationRef} from 'src/hooks/useIntegration';

const {filenameRef, dateRef, fileIndexRef, groupIndexRef, metasRef} =
  useDetails();
</script>

<template>
  <AppDraggable draggable-key="details">
    <div class="file container">
      <div class="title">Selected point index</div>
      <span class="file index">{{ clickedRef.value ?? 'none' }}</span>
    </div>

    <div class="file container">
      <div class="title">Selected file index</div>
      <span class="file index">{{ fileIndexRef ?? 'none' }}</span>
    </div>

    <div class="file container">
      <div class="title">Selected group index</div>
      <span class="file index">{{ groupIndexRef ?? 'none' }}</span>
    </div>

    <div class="file-details">
      <span class="src">{{ filenameRef }}</span>
      <span v-if="bandRef !== null">
        {{ bandRef.value }}
      </span>
      <span>
        {{ dateRef }}
      </span>
      <span>{{ integrationRef.value }}</span>
    </div>

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

          {{ metasRef?.[index] }}
        </n-gi>
      </n-grid>

      <div class="title">Indicators</div>

      <n-grid
        :cols="2"
        class="grid"
      >
        <n-gi v-for="indicator in indicatorsRef.value">
          <n-tag
            :bordered="false"
            class="tag"
            size="small"
          >
            {{ indicator.name }}
          </n-tag>

          {{ indicator.values[clickedRef.value ?? 0] }}
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
</style>
