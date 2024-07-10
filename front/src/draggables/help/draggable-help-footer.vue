<script lang="ts" setup="">
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
  <div class="footer">
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
        Open bug report <span class="light">requires GitHub</span>
      </AppButton>

      <AppButton
        :handle-click="openDiscord"
        grow-col
        size="small"
      >
        Open Discord
      </AppButton>
    </div>

    <div>
      <img
        alt="logo"
        class="image"
        src="/favicon.ico"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  width: 100%;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 100%;
  }
}

.image {
  width: 80px;
}

.light {
  font-size: 80%;
  font-style: italic;
  padding-left: 4px;
  transform: translateY(1px);
}
</style>
