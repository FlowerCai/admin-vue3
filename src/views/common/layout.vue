<!-- dashboard 整体框架渲染 -->

<template>
  <div>
    <t-layout class="main-layout">
      <!-- 边侧栏 -->
      <sidebar></sidebar>
      <t-layout>
        <!-- 头部区域 -->
        <global-header></global-header>
        <t-content class="content-layout">
          <router-view></router-view>
        </t-content>
        <t-footer style="text-align: center"
          >Copyright @ 2022-2023 Admin.</t-footer
        >
      </t-layout>
    </t-layout>
  </div>
</template>

<script lang="ts" setup>
import GlobalHeader from "./header.vue"
import Sidebar from "@/views/common/sidebar.vue"
</script>

<style lang="less" scoped>
.main-layout {
  height: 100vh;

  .content-layout {
    padding: 24px;
  }
}
</style>
