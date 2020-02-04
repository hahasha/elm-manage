import Vue from 'vue'
import Vuex from 'vuex'
import { getAdminInfo } from '@/api/api'

Vue.use(Vuex)

const state = {
  adminInfo: {
    avator: 'default.jpg'
  }
}

const mutations = {
  saveAdminInfo(state, data) {
    state.adminInfo = data
  }
}

const actions = {
  getAdminData({ commit }) {
    getAdminInfo((res) => {
      if (res.status == 1) {
        commit('saveAdminInfo', res.data)
      }
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
