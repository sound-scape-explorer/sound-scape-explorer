<script setup lang="ts">
import {useDigesters} from 'src/hooks/useDigesters';
import {useFiles} from 'src/hooks/useFiles';
import {useRanges} from 'src/hooks/useRanges';
import {useSelection} from 'src/hooks/useSelection';
import {useSites} from 'src/hooks/useSites';

import {useStorageSettings} from '../../hooks/useStorageSettings';

useSelection();
useStorageSettings();
useFiles();
useSites();
useRanges();
useDigesters();
</script>

<template></template>
