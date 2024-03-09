import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import Mock from 'mockjs'// mock数据模拟


// 图表数据
let List: any = []
export const homeDatasStore = defineStore("homeDatas", {
  state: () => {
    //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          苹果: Mock.Random.float(100, 8000, 0, 0),
          vivo: Mock.Random.float(100, 8000, 0, 0),
          oppo: Mock.Random.float(100, 8000, 0, 0),
          魅族: Mock.Random.float(100, 8000, 0, 0),
          三星: Mock.Random.float(100, 8000, 0, 0),
          小米: Mock.Random.float(100, 8000, 0, 0)
        })
      )
    }
    return {
      countDatas: ([
        {
          name: "今日支付订单",
          value: 1234,
          icon: "CircleCheckFilled",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "StarFilled",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "GoodsFilled",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "CircleCheckFilled",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "StarFilled",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "GoodsFilled",
          color: "#5ab1ef",
        },
      ]),// 书签（bookmark）的初始化数据

      // 饼图
      videoData: [
        {
          name: '小米',
          value: 2999
        },
        {
          name: '苹果',
          value: 5999
        },
        {
          name: 'vivo',
          value: 1500
        },
        {
          name: 'oppo',
          value: 1999
        },
        {
          name: '魅族',
          value: 2200
        },
        {
          name: '三星',
          value: 4500
        }
      ],

      // 柱状图
      userData: ([
        {
          date: '周一',
          new: 5,
          active: 200
        },
        {
          date: '周二',
          new: 10,
          active: 500
        },
        {
          date: '周三',
          new: 12,
          active: 550
        },
        {
          date: '周四',
          new: 60,
          active: 800
        },
        {
          date: '周五',
          new: 65,
          active: 550
        },
        {
          date: '周六',
          new: 53,
          active: 770
        },
        {
          date: '周日',
          new: 33,
          active: 170
        }
      ]),

      // 折线图
      orderData: {
        date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
        data: List
      },
      tablerLabelName: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },

      tableData: [
        {
          name: 'oppo',
          todayBuy: 500,
          monthBuy: 4500,
          totalBuy: 22000
        },
        {
          name: 'vivo',
          todayBuy: 300,
          monthBuy: 2200,
          totalBuy: 24000
        },
        {
          name: '苹果',
          todayBuy: 800,
          monthBuy: 4500,
          totalBuy: 65000
        },
        {
          name: '小米',
          todayBuy: 1200,
          monthBuy: 6500,
          totalBuy: 45000
        },
        {
          name: '三星',
          todayBuy: 300,
          monthBuy: 2000,
          totalBuy: 34000
        },
        {
          name: '魅族',
          todayBuy: 350,
          monthBuy: 3000,
          totalBuy: 22000
        }
      ],
      // 用户管理的数据
      operateFormLabel: [
        {
            model: 'name',
            label: '姓名',
            type: 'input'
        },
        {
            model: 'age',
            label: '年龄',
            type: 'input'
        },
        {
            model: 'sex',
            label: '性别',
            type: 'select',
            opts: [
                {
                    label: '男',
                    value: 1
                },
                {
                    label: '女',
                    value: 0
                }
            ]
        },
        {
            model: 'birth',
            label: '出生日期',
            type: 'date'
        },
        {
            model: 'addr',
            label: '地址',
            type: 'input'
        }
    ],
    }
  },
  actions: {}
})