import http from "../utils/request";

// 请求首页数据
// export function getHome() {
//     return http.get("/home/getData");
// }
export const getData=()=>{
    // 放回一个promise对象
    return http.get("/home/getData");
}


export const getUser=(params:any)=>{
    return http.get("/user/getUser",params);
}
export const addUser=(data:any)=>{
    return http.post("/user/add",data);
}
export const editUser=(data:any)=>{
    return http.post("/user/edit",data);
}
export const delUser=(data:any)=>{
    return http.post("/user/del",data);
}