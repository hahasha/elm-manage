import { get, post } from './http'

// 登录

// 获取用户信息
export const getUserInfo = user_id => get('/v1/user/'+ user_id);

// 获取管理员列表
export const getAdminList = params => get('/admin/all', params);

// 获取管理员数量
export const getAdminCount = params => get('/admin/count', params);

// 获取订单列表
export const getOrderList = params => get('/bos/orders', params);

// 获取所有订单数量
export const getOrderCount = params => get('/bos/orders/count', params);

// 获取店铺详细信息
export const getShopDetail = shop_id => get('/shopping/restaurant/'+ shop_id);

// 获取地址详情
export const getAddressById = address_id => get('/v1/addresse/'+ address_id);

// 获取所有食品列表
export const getFoodList = params => get('/shopping/v2/foods', params);

// 获取食品数量
export const getFoodCount = params => get('/shopping/v2/foods/count', params);

// 根据商店ID获取店铺食品信息(如食品分类信息)
export const getFoodInfoById = shop_id => get('/shopping/v2/menu?restaurant_id='+ shop_id);

// 获取食品种类详情
export const getFoodCategory = category_id => get('/shopping/v2/menu/'+ category_id);