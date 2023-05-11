<script setup lang="ts">
import {useStorageMetas} from 'src/hooks/useStorageMetas';
import {useStorageGroupedTimestamps} from '../../hooks/useStorageGroupedTimestamps';
import {useStorageGroupedMetas} from '../../hooks/useStorageGroupedMetas';
import {useStorageReducedFeatures} from '../../hooks/useStorageReducedFeatures';
import {useStorageMetaProperties} from 'src/hooks/useStorageMetaProperties';
import {useStorageMetaSets} from 'src/hooks/useStorageMetaSets';
import {useStorageSlicesPerGroup} from 'src/hooks/useStorageSlicesPerGroup';

useStorageMetas();
useStorageMetaProperties();
useStorageMetaSets();

useStorageSlicesPerGroup();

useStorageReducedFeatures();
useStorageGroupedTimestamps();
useStorageGroupedMetas();
</script>
