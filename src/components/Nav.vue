<template>
  <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false" index:1>
    <div v-for="(item, index) in menu.left" :key="index">
      <el-sub-menu v-if="item.children" :index="index + 1 + ''">
        <template #title>{{ item.name }}</template>
        <el-menu-item v-for="(c, i) in item.children" :index="`${index + 1}-${i + 1}`" :key="`${index + 1}-${i + 1}`" @click="dispatchFunc(c.action)">{{ c.name }}</el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else @click="dispatchFunc(item.action)" :index="index + 1 + ''">{{ item.name }}</el-menu-item>
    </div>
  </el-menu>
</template>

<script lang="ts" setup>
import { menu, dispatchFunc } from '@/data/defalutsConfig';
</script>
