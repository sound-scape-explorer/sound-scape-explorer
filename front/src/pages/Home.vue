<script lang="ts" setup>
import {ref} from 'vue';
import Button from '../components/Button.vue';
import Title from '../components/Title.vue';
import {useStorage} from '../composables/useStorage';

const inputRef = ref<HTMLInputElement>();
const {
  importUploadedFile,
  getFiles,
  getBands,
  getIntegrations,
  getRanges,
  getReducers,
} = await useStorage();

async function handleChange() {
  const file = inputRef.value?.files?.[0];

  if (!file) {
    return;
  }

  await importUploadedFile(file);
}

async function handleRead() {
  const files = await getFiles();
  const bands = await getBands();
  const integrations = await getIntegrations();
  const ranges = await getRanges();
  const reducers = await getReducers();

  console.log({
    files,
    bands,
    integrations,
    ranges,
    reducers,
  });
}
</script>

<template>
  <Title text="Sound Scape Explorer" />
  <input ref="inputRef" type="file" @change="handleChange" />
  <Button :handle-click="handleRead" text="Print files to console" />
</template>
