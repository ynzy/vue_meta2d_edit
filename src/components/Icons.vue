<script setup>
import { icons as iconData } from '@/data/icons';
import { Search } from '@element-plus/icons';

import { ref } from 'vue';
const activeNames = ref(1);
const inputValue = ref('');
function dragPen(data, e) {
  const json = JSON.stringify(data);
  e.dataTransfer.setData('meta2d', json);
}
</script>

<template>
  <div class="icons">
    <div class="icon_search">
      <el-input v-model="inputValue" size="small" placeholder="搜索图元" :prefix-icon="Search" />
    </div>
    <div class="icon_list">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基本图元" name="1">
          <div class="icon_container">
            <div class="icon_item" v-for="(item, index) in iconData" :key="index" draggable="true" @dragstart="dragPen(item.data, $event)" :index="index">
              {{ item.title }}
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="icon_manage">
      <el-button> 管理图元 </el-button>
    </div>
  </div>
</template>

<style scoped>
.icons {
  width: 300px;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
.icon_search {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
}
.icon_list {
  padding: 5px 0px;
  overflow: auto;
  flex: 1;
}
.W-10 {
  width: 100px;
}
.icon_manage {
  border-top: 1px solid #eee;
  display: flex;
  padding: 16px 0;
  justify-content: center;
  align-items: center;
}
.icon_container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: center;
}
.icon_item {
  padding: 5px;
  cursor: pointer;
}
.icon_list::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.icon_list::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  height: 20px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #4e4e4e;
}
.icon_list::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ffffff;
}
</style>
