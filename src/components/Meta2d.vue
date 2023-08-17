<script lang="ts" setup>
import { onMounted } from 'vue';

import { Meta2d } from '@meta2d/core';

const meta2dOptions = {
  grid: true,
  rule: true
};

onMounted(() => {
  new Meta2d('meta2d', meta2dOptions);
});

onUnmounted(() => {
  meta2d.destroy();
});
</script>

<template>
  <!--  meta2d图纸所站位置-->
  <div id="meta2d"></div>
</template>

<style scoped>
#meta2d {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #eee;
}
</style>
