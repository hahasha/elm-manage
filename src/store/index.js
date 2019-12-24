import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userInfo: {
    id: '',
    username: '',
    password: '',
    registerTime: '',
    limits: '',
    avatorUrl: ''
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
