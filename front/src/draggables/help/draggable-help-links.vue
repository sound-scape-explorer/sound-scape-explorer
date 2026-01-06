<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import {
  LINK_BUG_REPORT,
  LINK_CHANGELOG,
  LINK_DISCORD,
  LINK_DOCS,
} from 'src/constants';

const openDocumentation = () => window.open(LINK_DOCS);
const openBugReport = () => window.open(LINK_BUG_REPORT);
const openChangelog = () => window.open(LINK_CHANGELOG);
const openDiscord = () => window.open(LINK_DISCORD);
</script>

<template>
  <div :class="$style.container">
    <div>
      <AppButton
        :handle-click="openDocumentation"
        grow-col
        size="small"
      >
        Open documentation
      </AppButton>

      <AppButton
        :handle-click="openChangelog"
        grow-col
        size="small"
      >
        Open changelog
      </AppButton>

      <AppButton
        :handle-click="openBugReport"
        grow-col
        size="small"
      >
        Open bug report
        <span :class="$style.light">requires GitHub</span>
      </AppButton>

      <AppButton
        :handle-click="openDiscord"
        grow-col
        size="small"
      >
        Join Discord
      </AppButton>
    </div>

    <div>
      <img
        :class="$style.image"
        alt="logo"
        src="/favicon.ico"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.container {
  display: flex;
  width: 100%;

  & > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    gap: sizes.$p0;
  }
}

.image {
  width: sizes.$p0 * 12;
}

.light {
  font-size: 0.8em;
  font-style: italic;
  padding-left: sizes.$g0;
  transform: translate3d(0, 1px, 0);
}
</style>
