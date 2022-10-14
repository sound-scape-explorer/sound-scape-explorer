<template>
  <div class="content">
    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>

<style lang="scss" scoped>
.content {
  height: 100%;
  padding: 1rem 1rem;
}
</style>
