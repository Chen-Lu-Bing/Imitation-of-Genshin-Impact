<template>
  <!-- 导航 -->
  <div>
    <RouterLink to="/"></RouterLink>
  </div>
  <!-- 展示 -->
  <div>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts" name="App">
import {RouterView,RouterLink} from 'vue-router'
</script>
<style lang="less">
html,body,p{
  margin: 0;
  padding:0;
}
</style>
