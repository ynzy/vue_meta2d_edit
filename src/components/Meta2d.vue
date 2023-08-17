<script lang="ts" setup>
import { Meta2d } from '@meta2d/core';
import { flowPens } from '@meta2d/flow-diagram'; // 流程图
import { activityDiagram, activityDiagramByCtx } from '@meta2d/activity-diagram'; // 活动图
import { sequencePens, sequencePensbyCtx } from '@meta2d/sequence-diagram'; // 时序图
import { classPens } from '@meta2d/class-diagram'; // 类图
import { formPens } from '@meta2d/form-diagram'; // 表单
import { register as registerEcharts, registerHighcharts, registerLightningChart } from '@meta2d/chart-diagram'; // 引入echarts注册函数，原函数名为register 为了与其他注册函数区分这里重命名为registerEcharts

const meta2dOptions = {
  grid: true,
  rule: true
};

onMounted(() => {
  new Meta2d('meta2d', meta2dOptions);
  // 注册流程图
  meta2d.register(flowPens());

  // 注册活动图元
  meta2d.register(activityDiagram());
  // 原生canvas绘画的图库，支持逻辑复杂的需求
  meta2d.registerCanvasDraw(activityDiagramByCtx());

  // 注册时序图
  meta2d.register(sequencePens());
  meta2d.registerCanvasDraw(sequencePensbyCtx());

  // 注册类图
  meta2d.register(classPens());

  // 注册表单
  meta2d.registerCanvasDraw(formPens());

  // 直接调用Echarts的注册函数
  registerEcharts();

  // 直接调用HightCharts的注册函数
  registerHighcharts();

  registerLightningChart();
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
