<template>
  <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false" index:1>
    <div v-for="(item, index) in menu.left" :key="index">
      <el-sub-menu v-if="item.children" :index="index + 1 + ''">
        <template #title>{{ item.name }}</template>
        <el-menu-item route="" v-for="(c, i) in item.children" :key="`${index + 1}-${i + 1}`" :index="`${index + 1}-${i + 1}`" @click="dispatchFunc(c.action)">
          {{ c.name }}
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item route="" v-else @click="dispatchFunc(item.action)" :index="index + 1 + ''">{{ item.name }}</el-menu-item>
    </div>
    <el-menu-item @click="onView" route="">预览</el-menu-item>

    <div class="flex-grow"></div>
    <div v-for="(item, index) in menu.right" :key="index">
      <el-sub-menu v-if="item.children" :index="index + 1 + ''">
        <template #title>
          <div class="title">
            <!-- <svg v-if="item.icon" class="l-icon" aria-hidden="true" :class="[item.icon, item.name ? 'format' : '']">
              <use :xlink:href="`#${item.icon}`"></use>
            </svg> -->
            <i :title="item.name" class="t-icon font-size format" :class="item.icon"></i>
            {{ item.name }}
          </div>
        </template>
        <el-menu-item route="" v-for="(c, i) in item.children" :key="`${index + 1}-${i + 1}`" :index="`${index + 1}-${i + 1}`" @click="dispatchFunc(c.action, c.value, c.icon)">
          <i :title="item.name" class="t-icon" :class="c.icon" style="margin-left: 20px; margin-right: 30px"></i>
          {{ c.name }}
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else @click="dispatchFunc(item.action, item.value, item.icon)" :index="index + 1 + ''">
        <i v-if="item.icon" :title="item.name" class="t-icon font-size" :class="item.icon"></i>{{ item.name }}
      </el-menu-item>
    </div>
    <!-- 缩放 -->
    <el-sub-menu>
      <template #title> 缩放 </template>
      <el-menu-item index="100" route="">
        <el-slider v-model="scaleValue" @input="scaleView" />
      </el-menu-item>
    </el-sub-menu>
    <!-- 锁定 -->
    <el-menu-item @click="changeLock" route=""> <i class="t-icon" :class="lockIcon"></i>{{ lockStatus }} </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { menu, dispatchFunc } from '@/data/defaultsConfig';
import { onMounted, ref } from 'vue';
import { useEventbus } from '@/hooks/useEventbus';
import { useRouter } from 'vue-router';
const router = useRouter();

let lockNumber = 0;
let lockStatus = ref('锁定');
let lockIcon = ref('t-unlock');
let scaleValue = ref(10);

const lockIcons = ['t-unlock', 't-lock', 't-wufayidong'];
const lockStatusList = ['编辑', '预览', '锁定'];
function changeLock() {
  lockNumber += 1;
  lockNumber = lockNumber % 3;
  meta2d.store.data.locked = lockNumber;
  lockIcon.value = lockIcons[lockNumber];
  lockStatus.value = lockStatusList[lockNumber];
}

const eventbus = useEventbus();

/**
 * 预览
 */
function onView() {
  // 先停止动画，避免数据波动
  meta2d.stopAnimate();
  // 本地存储
  const data: any = meta2d.data();
  localStorage.setItem('meta2d', JSON.stringify(data));
  // 跳转到预览页面
  router.push({
    path: '/preview',
    query: {
      r: Date.now() + '',
      id: data._id
    }
  });
}
/**
 *
 * @param val 缩放视图
 */
function scaleView(val: any) {
  // @ts-ignore
  meta2d.scale(((meta2d.store.options.maxScale - meta2d.store.options.minScale) / 100) * val);
  meta2d.centerView();
}
function syncData() {
  // @ts-ignore
  menu.right.find((i) => i.key === 'start').icon = window.meta2d.store.data.fromArrow ? 'l-to-' + window.meta2d.store.data.fromArrow : 'l-line';
  // @ts-ignore
  menu.right.find((i) => i.key === 'end').icon = window.meta2d.store.data.toArrow ? 'l-to-' + window.meta2d.store.data.toArrow : 'l-line';
}

// 更新属性方法
function updateFunc(activePen, props) {
  Object.entries(props).forEach(([key, value]) => {
    meta2d.setValue(
      {
        id: activePen.id,
        [key]: value
      },
      { render: false }
    );
  });

  meta2d.render();
}

onMounted(() => {
  // 监听meta2d打开状态
  eventbus.customOn('opened', () => {
    syncData();
    // 监听缩放
    meta2d.on('scale', (data) => {
      // @ts-ignore
      scaleValue.value = +(data.toFixed(1) * (meta2d.store.options.maxScale - meta2d.store.options.minScale)).toFixed();
    });

    // 监听锁定状态
    meta2d.on('lock', () => {
      meta2d.store.data.locked = 2;
      lockIcon.value = lockIcons[2];
      lockStatus.value = lockStatusList[2];
    });

    meta2d.on('active', (args) => {
      console.log('args', args);
      // 设置线路默认样式
      if (args.length && args[0].name === 'line') {
        const activePen = reactive(args[0]);
        updateFunc(activePen, {
          // 'lineWidth': 10,
          // 'borderWidth': 5,
          // 'lineAnimateType': 1,
          // 'animateDash': 0,
          // 'autoPlay': true
          // 'color': 'rgba(179, 152, 162, 1)',
          // 'borderColor': 'rgba(98, 52, 52, 1)',
          // 'animateColor': 'rgba(98, 52, 52, 1)'
          // 'color': 'rgba(145, 171, 163, 1)',
          // 'borderColor': 'rgba(49, 71, 28, 1)',
          // 'animateColor': 'rgba(49, 71, 28, 1)'
        });
      }
    });
  });
});
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
.font-size {
  font-size: 20px;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
}
.t-icon {
  width: 30px;
  height: 30px;
  line-height: 30px;
}
.format {
  position: absolute;
  top: -0px;
  left: 25px;
}
</style>
