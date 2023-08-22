<script setup lang="ts">
import { animateType, lineAnimateType, animateDash } from '@/data/defaultsConfig';
import { onMounted, reactive, ref, toRaw } from 'vue';

let m = reactive(animateType);
const lineAnimateTypeRef = ref(lineAnimateType);
const animateDashRef = ref(animateDash);
let animate = ref({
  name: '',
  frames: [],
  key: '',
  duration: 0,
  autoPlay: false,
  animateCycle: Infinity,
  lineAnimateType: 0,
  animateDash: null
});

let activePen = {};

onMounted(() => {
  meta2d.on('active', (pens) => {
    animate.value = {
      name: '',
      frames: [],
      key: '',
      duration: 0,
      autoPlay: false,
      animateCycle: Infinity,
      lineAnimateType: 0,
      animateDash: null
    };
    if (pens.length === 1) {
      activePen = reactive(pens[0]);
    }
    if (pens[0]) {
      animate.value.autoPlay = activePen.autoPlay || false;
      animate.value.animateCycle = activePen.animateCycle || Infinity;
      animate.value.frames = activePen.frames || [];
      animate.value.name = activePen.animateName || '';
      animate.value.duration = activePen.animateDuration || 0;
      animate.value.animateDash = activePen.animateDash || 0;
      animate.value.lineAnimateType = activePen.lineAnimateType || 0;
    }
  });
});
function changeAnimate(f) {
  animate.value.duration = f[0].duration;
}

/**
 * 修改线动画类型
 */
function changeLineAnimateType(e) {
  console.log(e);
  animate.value.lineAnimateType = e;
}

/**
 * 修改动画线样式
 */
function changeAnimateDash(e) {
  animate.value.animateDash = e;
}

function startAnimate() {
  activePen.animateName = animate.value.name;
  activePen.animateDuration = animate.value.frames[0]?.duration;
  activePen.frames = animate.value.frames;
  activePen.autoPlay = animate.value.autoPlay;
  activePen.animateCycle = animate.value.animateCycle;
  activePen.animateDash = animate.value.animateDash;
  activePen.lineAnimateType = animate.value.lineAnimateType;
  meta2d.startAnimate(activePen.id);
}

function pauseAnimate() {
  meta2d.pauseAnimate(activePen.id);
}

function stopAnimate() {
  meta2d.stopAnimate(activePen.id);
}
</script>

<template>
  <div class="animate">
    <el-form @submit="(e) => e.preventDefault()">
      <el-form-item label="动画效果">
        <el-select v-model="animate.lineAnimateType" placeholder="选择线动画类型">
          <el-option v-for="e in lineAnimateTypeRef" :key="e.key" :label="e.name" :value="e.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="动画线条">
        <el-select v-model="animate.animateDash" placeholder="选择动画线样式类型">
          <el-option v-for="e in animateDashRef" :key="e.key" :label="e.name" :value="e.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="动画类型">
        <el-select v-model="animate.frames" value-key="id" placeholder="选择事件类型" @change="changeAnimate">
          <el-option v-for="e in m" :key="e.key" :label="e.name" :value="e.frames"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="动画时长">
        <el-input v-model="animate.duration" disabled />
      </el-form-item>

      <el-form-item label="自动播放">
        <el-switch v-model="animate.autoPlay" />
      </el-form-item>
      <div class="event_button">
        <el-button @click="startAnimate" type="primary" style="width: 60px; font-size: 10px">开始动画</el-button>
        <el-button @click="pauseAnimate" type="danger" style="width: 60px; font-size: 10px">暂停动画</el-button>
        <el-button @click="stopAnimate" type="danger" style="width: 60px; font-size: 10px">停止动画</el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.animate {
  margin: 10px;
}

.event_button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>
