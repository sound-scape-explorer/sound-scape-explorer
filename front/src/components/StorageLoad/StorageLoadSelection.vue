<script lang="ts" setup>
import {useAggregatedSites} from 'src/hooks/useAggregatedSites';
import {useLabels} from 'src/hooks/useLabels';
import {useStorageGroupedFeatures} from 'src/hooks/useStorageGroupedFeatures';
import {useStorageGroupedFilenames} from 'src/hooks/useStorageGroupedFilenames';
import {useStorageIndicators} from 'src/hooks/useStorageIndicators';
import {useStorageMetaProperties} from 'src/hooks/useStorageMetaProperties';
import {useStorageMetaSets} from 'src/hooks/useStorageMetaSets';
import {useStorageVolumes} from 'src/hooks/useStorageVolumes';
import {useTraced} from 'src/hooks/useTraced';

import {useAggregatedLabels} from '../../hooks/useAggregatedLabels';
import {useAggregatedTimestamps} from '../../hooks/useAggregatedTimestamps';
import {useReducedFeatures} from '../../hooks/useReducedFeatures';
import {useScatterColorScale} from '.././Scatter/useScatterColorScale';
import {useScatterFilter} from '.././Scatter/useScatterFilter';
import {useScatterStatus} from '../Scatter/useScatterStatus';

useStorageMetaSets();
useStorageMetaProperties();
useLabels();

useStorageGroupedFilenames();
useStorageGroupedFeatures();
useAggregatedTimestamps();
useAggregatedLabels();
useAggregatedSites();

useReducedFeatures();
useTraced();

useStorageVolumes();
useStorageIndicators();

useScatterColorScale();
useScatterFilter();

useScatterStatus();
</script>

<template></template>
