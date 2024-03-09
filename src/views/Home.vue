<template>
  <el-row>
    <!-- 左侧三分之一 -->
    <el-col :span="8" style="padding-right: 10px">
      <!-- 名片部分 -->
      <div class="Avatar-frame">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <!-- 头像部分 -->
              <span class="user">
                <img src="../assets/images/立本.jpg" />
                <!-- 头像左侧账户名称 -->
                <div class="userinfo">
                  <p class="name">Admin</p>
                  <p class="acess">超级管理员</p>
                </div>
              </span>
            </div>
          </template>

          <!-- 名片下半部分 -->
          <div class="login-info">
            <p>上次登录时间：<span>2024-2-19</span></p>
            <p>上次登录地点：<span>江西</span></p>
          </div>
        </el-card>

        <!-- 数据统计部分 -->
        <el-card style="margin-top: 20px; height: 60%">
          <div class="sheet">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column
                v-for="(val, key) in tablerLabelName"
                :prop="key"
                :label="val"
              />
            </el-table>
          </div>
        </el-card>
      </div>
    </el-col>

    <!-- 右侧三分之二 -->
    <el-col :span="16" style="padding-left: 10px">
      <!-- 书签区 -->
      <div class="bookmark">
        <el-card
          shadow="always"
          v-for="item in countDatas"
          :key="item"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <el-icon class="icon" :style="{ background: item.color }">
            <component :is="item.icon"></component>
          </el-icon>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>

      <!-- 中间的折线图 -->
      <el-card shadow="always" style="height: 280px">
        <div id="lineChart" style="height: 280px"></div>
      </el-card>

      <!-- 右侧下边两个小的扇形图-->
      <div2 class="faChart">
        <el-card shadow="always">
          <div id="barChart" style="height: 260px"></div>
        </el-card>
        <el-card shadow="always" style="padding: 0; text-align: center; margin-top: ">
          <div id="pieChart" style="height: 260px; margin-top: -5%"></div>
        </el-card>
      </div2>
    </el-col>
  </el-row>
</template>

<script setup lang="ts" name="Home">
import { onMounted, reactive, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { getData } from "../api/index";
import * as echarts from "echarts";
import {
  CircleCheckFilled,
  StarFilled,
  GoodsFilled,
} from "@element-plus/icons-vue";
import { it } from "element-plus/es/locale/index.mjs";
import { homeDatasStore } from "../store/home";

// 创建数据
let tabularData = reactive(computed(() => homeDatasStore().tableData)); //左侧三分之一下面表单的数据来源
let tableData = reactive(Object(tabularData.value)); //左侧三分之一下面表单的数据，用来参与遍历
let tablerLabelName = reactive(
  Object(computed(() => homeDatasStore().tablerLabelName).value)
); // 该数据用于遍历渲染到表单上渲染名片下面的那个表单
let countDatas = reactive(computed(() => homeDatasStore().countDatas)); // 书签（bookmark）的数据
let ordeData = reactive(computed(() => homeDatasStore().orderData)); //右侧中间的折线图
let videoData = ref(computed(() => homeDatasStore().videoData)); //右侧下边两个小的扇形图饼状图
let userData = ref(computed(() => homeDatasStore().userData)); //用于下边两个小的扇形图的柱状图

// console.log(tabularData, "tabularData");
// console.log(tablerLabelName, "tablerLabelName");
// console.log(tableData, "tableData");
// console.log(countDatas, "countDatas");

// 创建折线图
let lineChart = () => {
  //  基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(document.getElementById("lineChart")!);
  // 以下数据用于渲染到页面上的数据(渲染统计表用，中间折线图数据)
  let AxisData = ordeData.value; // 直接从pinia中获取数据
  let legendData = reactive(Object.keys(AxisData.data[0])); // 初始化xAxis数据
  let xAxis = reactive(Object.values(AxisData.date)); // 初始化yAxis数据
  let series: any[] = reactive([]); // 初始化series数据
  legendData.forEach((key) => {
    series.push({
      name: key,
      type: "line",
      stack: "x",
      data: Object.values(AxisData.data.map((item: any) => item[key])),
    });
  });

  // 指定图表的配置项和数据
  let option = {
    tooltip: {},
    legend: {
      data: legendData,
    },
    xAxis: {
      data: xAxis,
    },
    yAxis: {},
    series: series,
  };
  option && myChart.setOption(option);
};

// 创建柱状图
let barChart = () => {
  //  基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(document.getElementById("barChart")!);
  // 以下数据用于渲染到页面上的数据(渲染统计表用，折线图数据)
  let AxisData = userData.value; // 直接从pinia中获取数据
  let xAxis: any[] = reactive([]); // 初始化yAxis数据
  let series1: any[] = reactive([]); // 初始化series数据
  let series2: any[] = reactive([]); // 初始化series数据
  for (let i = 0; i < AxisData.length; i++) {
    xAxis[i] = Object.values(AxisData[i])[0]; // 通过循环把相对于的值赋值给xAxis数组
    series1[i] = Object.values(AxisData[i])[1];
    series2[i] = Object.values(AxisData[i])[2];
  }
  let series: any[] = reactive([
    {
      name: "新增用户",
      type: "bar",
      data: series1,
    },
    {
      name: "活跃用户",
      type: "bar",
      data: series2,
    },
  ]); // 初始化series数据

  let option = {
    legend: {
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
    },
    grid: {
      left: "20%",
    },
    // 提示框
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      data: xAxis,
    },
    yAxis: {},
    series: series,
  };

  option && myChart.setOption(option);
};
// 创建饼状图
let pieChart = () => {
  //  基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(document.getElementById("pieChart")!);
  // 以下数据用于渲染到页面上的数据(渲染统计表用，折线图数据)
  let seriesData = videoData.value; // 初始化seriesData，这个可以直接从pinia中获取数据不用另外加工
  let option = {
    series: [
      {
        type: "pie",
        data: seriesData,
        radius: "70%",
      },
    ],
  };
  option && myChart.setOption(option);
};

// 在挂载前完成数据的赋值
onMounted(() => {
  // 使用刚指定的配置项和数据显示图表。
  lineChart();
  barChart();
  pieChart();
});
</script>

<style lang="less" scoped>
// 左半部分的样式
.Avatar-frame {
  height: 100%;
  .user {
    display: flex;
    align-items: center;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
    .userinfo {
      .name {
        font-size: 32px;
        margin-bottom: 10px;
      }
      .acess {
        color: #999;
      }
    }
  }
  .login-info {
    p {
      line-height: 28px;
      font-size: 12px;
      color: #999;
      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }
  // 左半部分下面的表单
  .sheet {
    height: 60%;
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
  }
}

// 右边三分之二的部分
// 六个小的书签栏样式
.bookmark {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .icon {
    width: 80px;
    height: 80px;
    margin-right: 15px;
    font-size: 30px;
    color: white;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      height: 30px;
      line-height: 30px;
      font-size: 30px;
      margin-bottom: 10px;
    }
    .desc {
      color: #999;
      font-size: 14px;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
// 中间折线图样式
// .lineChartBox {
// }
// 下面的两个小小图标样式
.faChart {
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
    height: 260px;
    margin-top: 2%;
  }
}
</style>
