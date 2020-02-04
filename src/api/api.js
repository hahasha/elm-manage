import { get, post } from './http'

// 管理员登录
export const login = params => post('/admin/login', params)

// 管理员退出登录
export const logout = params => get('/admin/singout', params)

// 获取管理员信息
export const getAdminInfo = id => get('/v1/user/'+ id);

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

// 获取食品种类列表
// export const getCategoryList = params => get('/shopping/v2/menu/', params);
export const getCategoryList = restaurant_id => get('/shopping/getcategory/'+ restaurant_id);

// 获取食品种类详情
export const getCategoryById = category_id => get('/shopping/v2/menu/'+ category_id);

// 更新食品信息
export const updateFoodInfo = params => post('/shopping/v2/updatefood', params);

// 删除食品
export const deleteFoodById = food_id => post('shopping/v2/food/'+ food_id);

// 获取餐馆详细信息
export const getResturantDetail = restaurant_id => get('/shopping/restaurant/'+ restaurant_id);

// 获取用户信息
export const getUserInfo = user_id => get('/v1/user/'+ user_id)