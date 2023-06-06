<script setup lang="ts">
import {useStorageMetas} from 'src/hooks/useStorageMetas';
import {useStorageGroupedTimestamps} from '../../hooks/useStorageGroupedTimestamps';
import {useStorageGroupedMetas} from '../../hooks/useStorageGroupedMetas';
import {useStorageReducedFeatures} from '../../hooks/useStorageReducedFeatures';
import {useStorageMetaProperties} from 'src/hooks/useStorageMetaProperties';
import {useStorageMetaSets} from 'src/hooks/useStorageMetaSets';
import {useStorageSlicesPerGroup} from 'src/hooks/useStorageSlicesPerGroup';
import {useStorageVolumes} from 'src/hooks/useStorageVolumes';
import {useStorageIndicators} from 'src/hooks/useStorageIndicators';
import {useScatterDataset} from '../Scatter/useScatterDataset';
import {useScatterColorScale} from '../Scatter/useScatterColorScale';
import {useStorageGroupedAttributes} from 'src/hooks/useStorageGroupedAttributes';
import {useStorageGroupedFeatures} from 'src/hooks/useStorageGroupedFeatures';
import {useStorageFilenames} from 'src/hooks/useStorageFilenames';
import {useStorageGroupedFilenames} from 'src/hooks/useStorageGroupedFilenames';
import {useScatterFilter} from '../Scatter/useScatterFilter';

useStorageFilenames();
useStorageMetaSets();
useStorageMetaProperties();
useStorageMetas();

useStorageGroupedAttributes();
useStorageSlicesPerGroup();

useStorageGroupedFilenames();
useStorageGroupedFeatures();
useStorageGroupedTimestamps();
useStorageGroupedMetas();

useStorageReducedFeatures();

useStorageVolumes();
useStorageIndicators();

useScatterDataset();
useScatterColorScale();
useScatterFilter();
</script>

<template></template>
