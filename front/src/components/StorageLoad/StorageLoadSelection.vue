<script lang="ts" setup>
import {useStorageFilesGroupCounts} from 'src/hooks/useStorageFilesGroupCounts';
import {useStorageGroupCountsByPointIndexes} from 'src/hooks/useStorageGroupCountsByPointIndexes';
import {useStorageGroupedFeatures} from 'src/hooks/useStorageGroupedFeatures';
import {useStorageGroupedFilenames} from 'src/hooks/useStorageGroupedFilenames';
import {useStorageIndicators} from 'src/hooks/useStorageIndicators';
import {useStorageMetaProperties} from 'src/hooks/useStorageMetaProperties';
import {useStorageMetas} from 'src/hooks/useStorageMetas';
import {useStorageMetaSets} from 'src/hooks/useStorageMetaSets';
import {useStorageTrajectories} from 'src/hooks/useStorageTrajectories';
import {useStorageVolumes} from 'src/hooks/useStorageVolumes';
import {useStorageGroupedMetas} from '../../hooks/useStorageGroupedMetas';
import {useStorageGroupedTimestamps} from '../../hooks/useStorageGroupedTimestamps';
import {useStorageReducedFeatures} from '../../hooks/useStorageReducedFeatures';
import {useScatterColorScale} from '.././Scatter/useScatterColorScale';
import {useScatterFilter} from '.././Scatter/useScatterFilter';
import {usePointIndexes} from '../Scatter/usePointIndexes';
import {useScatterReady} from '../Scatter/useScatterReady';

useStorageMetaSets();
useStorageMetaProperties();
useStorageMetas();

useStorageFilesGroupCounts();
useStorageGroupCountsByPointIndexes();

useStorageGroupedFilenames();
useStorageGroupedFeatures();
useStorageGroupedTimestamps();
useStorageGroupedMetas();

useStorageReducedFeatures();
useStorageTrajectories();

useStorageVolumes();
useStorageIndicators();

useScatterColorScale();
useScatterFilter();

useScatterReady();
usePointIndexes();
</script>

<template></template>
