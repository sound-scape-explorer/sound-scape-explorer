<script lang="ts" setup>
import Title from '../components/Title.vue';

interface Link {
  target: string;
  name: string;
}

const links: Link[] = [
  {
    target: 'https://github.com/sound-scape-explorer/sound-scape-explorer',
    name: 'Repository',
  },
  {
    target: 'https://github.com/sound-scape-explorer/sound-scape-explorer/blob/main/README.md',
    name: 'Readme',
  },
  {
    target: 'https://github.com/sound-scape-explorer/sound-scape-explorer/blob/main/CHANGELOG.md',
    name: 'Changelog',
  },
];
</script>

<template>
  <Title text="Help" />

  <ul class="list">
    <li v-for="link in links">
      <a
          :href="link.target"
          target="_blank"
      >
        {{ link.name }}
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.list {
  list-style: disc inside;
}
</style>
