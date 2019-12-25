import { get, post } from './http'

// 登录

// 获取管理员列表
export const getAdminList = params => get('/admin/all', params);

// 获取管理员数量
export const getAdminCount = params => get('/admin/count', params);

// 获取订单列表
export const getOrderList = params => get('/bos/orders', params);