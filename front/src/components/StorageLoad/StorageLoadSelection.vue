<script lang="ts" setup>
import {useAggregatedFeatures} from 'src/hooks/useAggregatedFeatures';
import {useAggregatedIndicators} from 'src/hooks/useAggregatedIndicators';
import {useAggregatedIntervalDetails} from 'src/hooks/useAggregatedIntervalDetails';
import {useAggregatedSites} from 'src/hooks/useAggregatedSites';
import {useLabels} from 'src/hooks/useLabels';
import {useStorageMetaProperties} from 'src/hooks/useStorageMetaProperties';
import {useStorageMetaSets} from 'src/hooks/useStorageMetaSets';
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

useAggregatedFeatures();
useAggregatedTimestamps();
useAggregatedLabels();
useAggregatedSites();
useAggregatedIntervalDetails();
useAggregatedIndicators();

useReducedFeatures();
useTraced();

useScatterColorScale();
useScatterFilter();

useScatterStatus();
</script>

<template></template>
