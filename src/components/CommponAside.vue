<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
  >
    <h3>{{ isCollapse ? "后台" : "通用后台管理" }}</h3>
    <div class="left-content"></div>
    <!-- 一级菜单 -->
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :key="item.name"
      v-bind:index="item.name"
    >
      <el-icon>
        <!-- elementPlus动态渲染icontu标 -->
        <component class="icons" :is="item.icon"></component>
      </el-icon>
      <template #title>{{ item.label }}</template>
    </el-menu-item>

    <!-- 一级菜单 -->
    <el-sub-menu
      v-for="item in haveChildren"
      :key="item.label"
      v-bind:index="item.name"
    >
      <template #title>
        <el-icon>
          <!-- elementPlus动态渲染icontu标 -->
          <component class="icons" :is="item.icon"></component>
        </el-icon>
        <span>{{ item.label }}</span>
      </template>
      <!-- 子菜单 -->
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup name="CommpinAside">
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useIndexStore } from "../store/index";
// 引入elementPlus图标
import {
  Location,
  House,
  ShoppingTrolley,
  UserFilled,
  CirclePlusFilled,
} from "@element-plus/icons-vue";
import { sortOrders } from "element-plus/es/components/table-v2/src/constants.mjs";

// 声明菜单栏数据
const menuData = reactive([
  {
    path: "/",
    name: "home",
    label: "首页",
    icon: `House`,
    url: "Home/Home",
  },
  {
    path: "/mall",
    name: "mall",
    label: "商品管理",
    icon: "ShoppingTrolley",
    url: "MallManage/MallManage",
  },
  {
    path: "/user",
    name: "user",
    label: "用户管理",
    icon: "UserFilled",
    url: "UserManage/UserManage",
  },
  {
    label: "其他",
    icon: "CirclePlusFilled",
    children: [
      {
        path: "/page1",
        name: "page1",
        label: "页面1",
        icon: "setting",
        url: "Other/PageOne",
      },
      {
        path: "/page2",
        name: "page2",
        label: "页面2",
        icon: "setting",
        url: "Other/PageTwo",
      },
    ],
  },
]);
// const isCollapse = ref(false);
const isCollapse = computed(() => useIndexStore().isCollapse);

// function handleMenu(){
//   isCollapse.value = !isCollapse.value;
// }

// 点击菜单跳转，并更改url
const router = useRouter();

const clickMenu = (item: any) => {
  // console.log(item);
  const store = useIndexStore();
  // 跳转页面，当前页面与跳转页面不一致才允许跳转
  if (
    router.currentRoute.value.path !== item.path &&
    !(router.currentRoute.value.path === "/" && item.path === "/")
  ) {
    router.push({
      path: item.path,
    });
  }

  store.selectMenu(router.currentRoute.value);

  // console.log(router.currentRoute.value.path);
  // console.log(router.currentRoute.value.params);
  
};

// 获取没有子菜单的菜单和有子菜单的菜单栏
let noChildren = computed(() => {
  // 没有子菜单
  return menuData.filter((item) => !item.children);
});
let haveChildren = computed(() => {
  // 有子菜单
  return menuData.filter((item) => item.children);
});
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  margin-top: -16px;
  border-right: 1px solid #333;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
