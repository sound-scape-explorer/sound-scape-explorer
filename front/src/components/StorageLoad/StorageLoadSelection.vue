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

useStorageMetas();
useStorageMetaProperties();
useStorageMetaSets();
useStorageVolumes();

useStorageSlicesPerGroup();

useStorageReducedFeatures();
useStorageGroupedTimestamps();
useStorageGroupedMetas();

useStorageIndicators();
</script>
