import { log } from "echarts/types/src/util/log.js";
import { defineStore } from "pinia";

export const useIndexStore = defineStore("isCollapse", {
    state: () => {
        return{
            isCollapse:false,//控制菜单的展开和收起
            tabsList:[
                {
                    path: "/",
                    name: "home",
                    label: "首页",
                    icon: `House`,
                    url: "Home/Home",
                  },//默认数据
            ]//面包屑数据
        }
    },
    actions:{
        handleMenu(){
            this.isCollapse = !this.isCollapse;//取反
        },
        selectMenu(val:any){
            console.log(val.path);
        }
    }
})