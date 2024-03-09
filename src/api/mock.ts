import Mock from 'mockjs' 
import homeApi from './MockServeDdata/home'
import user from './MockServeDdata/user'

Mock.mock('/api/home/getData', 'get', homeApi.getStatisticalData)


// 用户列表数据
 Mock.mock('/api/user/add','post',user.createUser)
 Mock.mock('/api/user/edit','post',user.updateUser)
 Mock.mock('/api/user/del','post',user.deleteUser)
 Mock.mock('/api/user/getUser',user.getUserList)
