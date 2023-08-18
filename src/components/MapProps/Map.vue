<script setup lang="ts">
import Form from '@/components/Form.vue';
import { computed, onMounted, reactive } from 'vue';
import { mapProps } from '@/data/defaultsConfig';
import { useEventbus } from '@/hooks/useEventbus';

let m = reactive(mapProps); // 声明为响应式

const eventbus = useEventbus();

/**
 * 将设置的属性赋值到变量上
 * @param options  选项配置
 * @param target 目标配置
 */
function loadOptionsFromMeta2d(options: any, target: any) {
  for (let i in target) {
    target[i] = options[i] || target[i];
  }
}
onMounted(() => {
  //监听opened事件用于监听文件打开，根据文件属性赋值对应设置
  meta2d.on('opened', () => {
    const options = meta2d.data();
    loadOptionsFromMeta2d(options, m); // 同步到当前设置
    loadOptionsFromMeta2d(options, meta2d.getOptions()); // 同步到meta2d设置
    eventbus.customEmit('opened');
  });
  // 初始化
  const options = meta2d.getOptions();
  loadOptionsFromMeta2d(options, m);
  meta2d.fileName = m.fileName; // 文件名 默认为 “未命名”
});

// map数据 用于传递给Form组件的数据
const map = computed(() => {
  return [
    {
      title: '文件', //显示名 title属性 显示一级菜单标题
      children: [
        {
          title: '文件名', // 元素标题
          type: 'input', // form类型  与Form组件的v-if对应
          option: {
            //  表单组件的配置信息 具体配置项根据对应的组件有所不同
            type: 'text',
            placeholder: '请输入文件名'
          },
          prop: 'fileName', // 指定该组件绑定的属性
          bindProp: m, // 该组件绑定的对象
          event: 'change', // 监听事件类型
          // 事件回调函数
          func: function arg1(value: string) {
            meta2d.fileName = value;
          }
        }
      ]
    },
    {
      title: '画布', //显示名
      children: [
        {
          title: '默认颜色',
          type: 'color',
          prop: 'color',
          event: 'change',
          bindProp: m, // 绑定的属性
          func(value: string) {
            meta2d.setOptions({
              color: value
            });
            meta2d.render();
          }
        },
        {
          title: '画笔填充颜色',
          type: 'color',
          prop: 'penBackground',
          bindProp: m, // 绑定的属性
          event: 'change',
          func(value: string) {
            meta2d.store.data.penBackground = value;
            meta2d.render();
          }
        },
        {
          title: '背景颜色',
          type: 'color',
          prop: 'background',
          bindProp: m, // 绑定的属性
          event: 'change',
          func(value: string) {
            meta2d.setBackgroundColor(value);
            meta2d.render();
          }
        },
        {
          title: '背景图片',
          type: 'file',
          prop: 'backGroundImage',
          bindProp: m, // 绑定的属性
          event: 'change',
          option: {
            accept: 'image/*'
          },
          func(e: any) {
            let file = e?.target?.files[0];
            let fileUrl = URL.createObjectURL(file); // 创建文件引用
            meta2d.setBackgroundImage(fileUrl);
            meta2d.render();
          }
        },
        {
          title: '标尺',
          type: 'switch',
          prop: 'rule',
          bindProp: m, // 绑定的属性
          event: 'change',
          func(value: boolean) {
            meta2d.setRule({
              rule: value
            });
            meta2d.render();
          }
        },
        {
          title: '标尺颜色',
          type: 'color',
          prop: 'ruleColor',
          bindProp: m, // 绑定的属性
          event: 'change',
          func(value: string) {
            meta2d.setRule({
              ruleColor: value
            });
            meta2d.render();
          }
        },
        {
          title: '网格',
          type: 'switch',
          prop: 'grid',
          bindProp: m, // 绑定的属性
          event: 'change',
          func(value: boolean) {
            meta2d.setGrid({
              grid: value
            });
            meta2d.render();
          }
        },
        {
          title: '网格颜色',
          type: 'color',
          prop: 'gridColor',
          bindProp: m, // 绑定的属性
          event: 'change',
          func(value: string) {
            meta2d.setGrid({
              gridColor: value
            });
            meta2d.render();
          }
        },
        {
          title: '网格大小',
          type: 'number',
          prop: 'gridSize',
          bindProp: m, // 绑定的属性
          event: 'change',
          option: {
            min: 1,
            max: 100
          },
          func(value: number) {
            meta2d.setGrid({
              gridSize: +value
            });
            meta2d.render();
          }
        },
        {
          title: '网格角度',
          type: 'number',
          prop: 'gridRotate',
          bindProp: m, // 绑定的属性
          event: 'change',
          option: {
            min: -Infinity,
            max: Infinity
          },
          func(value: number) {
            meta2d.setGrid({
              gridRotate: +value
            });
            meta2d.render();
          }
        }
      ]
    }
  ];
});
</script>

<template>
  <div class="mapProps">
    <Form :form-list="map"></Form>
  </div>
</template>

<style scoped></style>
