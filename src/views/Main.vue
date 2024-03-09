<template>
  <div class="common-layout">
    <el-container>
      <RouterLink to="/"></RouterLink>
      <el-aside width="atuo">
        <commpon-aside />
      </el-aside>
      <el-container>
        <el-header>
          <CommponHeader />
        </el-header>
        <el-main>
          <!-- 路由出口 -->
          <Router-view></Router-view>
          <!-- <img class="user-avatar" src="../assets/images/立本.jpg" alt=""> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts" name="Main">
import { RouterView } from "vue-router";
import CommponAside from "../components/CommponAside.vue";
import CommponHeader from "../components/CommponHeader.vue";
</script>

<style scoped>
.el-header {
  margin: 0;
  padding: 0;
}
</style>
