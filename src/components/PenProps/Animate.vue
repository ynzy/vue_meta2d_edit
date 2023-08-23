<script setup lang="ts">
import Form from '@/components/Form.vue';
import { computed, onMounted, reactive, ref, toRaw, watch } from 'vue';
import { animateProps } from '@/data/defaultsConfig';
import { mergeProps } from '@/data/utils';
import { deepClone } from '@meta2d/core';

// 记录是否有选中多个图元
const multiPen = ref(false);
const defaultConfig = deepClone(animateProps); //深拷贝保存默认配置
let m = reactive(animateProps); // 响应式数据源
let activePen = {};

// 更新属性方法
function updateFunc(prop) {
  return (value) => {
    if (multiPen.value) {
      for (let i of activePen) {
        meta2d.setValue(
          {
            id: i.id,
            [prop]: value
          },
          { render: false }
        );
      }
      meta2d.render();
    } else {
      meta2d.setValue({
        id: activePen.id,
        [prop]: value
      });
    }
  };
}

onMounted(() => {
  meta2d.on('active', (args) => {
    // 只修改一个
    if (args.length >= 1) {
      multiPen.value = args.length > 1;
      if (multiPen.value) {
        // 批量修改
        activePen = reactive(args);
        // 以最后一个图元信息为主
        for (let i of activePen) {
          mergeProps(m, i);
        }
      } else {
        // 修改一个
        activePen = reactive(args[0]);
        mergeProps(m, defaultConfig);
        mergeProps(m, activePen);
        const penRect = meta2d.getPenRect(toRaw(activePen));
        Object.assign(m, penRect);
      }
    }
  });
  // 更新数据  合并多个事件
  meta2d.on('update', () => {
    meta2d.emit('editPen');
  });
  meta2d.on('resizePens', () => {
    meta2d.emit('editPen');
  });
  meta2d.on('rotatePens', () => {
    meta2d.emit('editPen');
  });
  meta2d.on('valueUpdate', () => {
    meta2d.emit('editPen');
  });
  meta2d.on('editPen', () => {
    if (multiPen.value) {
      // 若有多个图元，则设置以最后一个图元为主
      for (let i of activePen) {
        mergeProps(m, i);
      }
    } else {
      mergeProps(m, activePen);
    }
  });
});

const map = [
  {
    title: '动画',
    multiShow: false,
    children: [
      {
        title: '动画效果',
        type: 'select',
        multiShow: true,
        option: {
          placeholder: '动画效果',
          list: [
            {
              label: '水流',
              value: 0
            },
            {
              label: '水珠流动',
              value: 1
            },
            {
              label: '圆点',
              value: 2
            }
          ]
        },
        prop: 'lineAnimateType',
        bindProp: m,
        event: 'change',
        func: updateFunc('lineAnimateType')
      },
      {
        title: '动画线条',
        type: 'select',
        multiShow: true,
        option: {
          placeholder: '动画线条',
          list: [
            {
              label: '点虚线',
              value: 0
            }
          ]
        },
        prop: 'animateDash',
        bindProp: m,
        event: 'change',
        func: updateFunc('animateDash')
      },
      {
        title: '动画时长',
        type: 'number',
        multiShow: true,
        prop: 'animateDuration',
        bindProp: m,
        option: {
          min: 0,
          step: 1,
          max: 60
        },
        event: 'change',
        func: updateFunc('animateDuration')
      },
      {
        title: '自动播放',
        type: 'switch',
        prop: 'autoPlay',
        bindProp: m,
        event: 'change',
        func: updateFunc('autoPlay')
      },
      {
        // title: '开始动画',
        type: 'button',
        option: {
          title: '开始动画',
          type: 'primary'
        },
        event: 'click',
        func: startAnimate
      },
      {
        // title: '暂停动画',
        type: 'button',
        option: {
          title: '暂停动画',
          type: 'danger'
        },
        event: 'click',
        func: pauseAnimate
      },
      {
        // title: '停止动画',
        type: 'button',
        option: {
          title: '停止动画',
          type: 'danger'
        },
        event: 'click',
        func: stopAnimate
      }
    ]
  }
];

// 计算展示字段列表
let showMap = computed(() => {
  if (multiPen.value) {
    return map.filter((i) => {
      i.multiShow ? (i.children = i.children.filter((item) => item.multiShow)) : '';
      return i.multiShow;
    });
  }

  return map;
});
// console.log(showMap);

function startAnimate() {
  activePen.animateName = m.animateName;
  activePen.animateDuration = m.frames[0]?.animateDuration;
  activePen.frames = m.frames;
  activePen.autoPlay = m.autoPlay;
  activePen.animateCycle = m.animateCycle;
  activePen.animateDash = m.animateDash;
  activePen.lineAnimateType = m.lineAnimateType;
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
  <div class="appearanceProps">
    <Form :form-list="showMap"></Form>
    <!-- <div class="event_button">
      <el-button @click="startAnimate" type="primary" style="width: 60px; font-size: 10px">开始动画</el-button>
      <el-button @click="pauseAnimate" type="danger" style="width: 60px; font-size: 10px">暂停动画</el-button>
      <el-button @click="stopAnimate" type="danger" style="width: 60px; font-size: 10px">停止动画</el-button>
    </div> -->
  </div>
</template>

<style scoped></style>
