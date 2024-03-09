<template>
  <div class="header-container">
    <!-- 左侧-->
    <div class="left-content">
      <el-button @click="handleMenu" :icon="Menu" />
      <!-- 面包屑 -->
      <span class="bread-crumbs" > </span>
    </div>
    <!-- 右侧 -->
    <div class="right-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user-avatar" src="../assets/images/立本.jpg" alt="" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts" name="CommponHeader">
import { Menu } from "@element-plus/icons-vue";
import { useIndexStore } from "../store/index";

// 定义事件handleMenu来调用store中的方法
function handleMenu() {
  const store = useIndexStore();
  store.handleMenu();
}
// function handleMenu(){
//   store.commit("collapseMenu")
//   console.log(store);
// }
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  display: flex;
  height: 60px;
  // width: 120%;
  // margin-left: -20% ;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  .bread-crumbs {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  .user-avatar {
    width: 40px;
    height: 40px;
    margin-right: 10%;
    border-radius: 50%;
  }
}
</style>
