<script setup lang="ts">
import {useStorageMetas} from 'src/hooks/useStorageMetas';
import {useStorageGroupedTimestamps} from '../../hooks/useStorageGroupedTimestamps';
import {useStorageGroupedMetas} from '../../hooks/useStorageGroupedMetas';
import {useStorageReducedFeatures} from '../../hooks/useStorageReducedFeatures';
import {useStorageMetaProperties} from 'src/hooks/useStorageMetaProperties';
import {useStorageMetaSets} from 'src/hooks/useStorageMetaSets';
import {useStorageVolumes} from 'src/hooks/useStorageVolumes';
import {useStorageIndicators} from 'src/hooks/useStorageIndicators';
import {useScatterDataset} from '../Scatter/useScatterDataset';
import {useScatterColorScale} from '../Scatter/useScatterColorScale';
import {useStorageGroupedFeatures} from 'src/hooks/useStorageGroupedFeatures';
import {useStorageGroupedFilenames} from 'src/hooks/useStorageGroupedFilenames';
import {useScatterFilter} from '../Scatter/useScatterFilter';
import {useStorageFilesGroupCounts} from 'src/hooks/useStorageFilesGroupCounts';
import {useStorageGroupCountsByPointIndexes} from 'src/hooks/useStorageGroupCountsByPointIndexes';
import {useStorageTrajectories} from 'src/hooks/useStorageTrajectories';

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

useScatterDataset();
useScatterColorScale();
useScatterFilter();
</script>

<template></template>
