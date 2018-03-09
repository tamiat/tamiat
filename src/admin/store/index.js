/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

/**
 * Module Scope of VUEX
 */
import persist from 'vuex-localstorage'
import menu from './modules/menu'

/**
 * Config
 */
Vue.use(Vuex)

/**
 * Export
 */
export default new Vuex.Store({
	modules: {
		menu
	},
	plugins: [persist({
		namespace: 'tamiat',
		initialState: {},
		expires: 7 * 24 * 60 * 60 * 1e3 // 1 week
	})],
  strict: false
})
