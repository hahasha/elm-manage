import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userInfo: {
    username: '',
    password: '',
    registerTime: '',
    limits: 'admin',
    id: (Math.random() + 1) * Math.pow(10, 4 - 1),
    avatorUrl: '../assets/images/avator.jpg'
  }
}

const mutations = {
  UPDATEUSERINFO(state, data) {
    state.userInfo = data;
  }
}

export default new Vuex.Store({
  state,
  mutations
})
