const state = {
  menuItems: [
    {
      name: 'Content',
      path: '/admin/content',
      icon: 'fa-wrench',
      dropdown: [
        {
          name: 'New/Edit content',
          path: '/admin/content',
          icon: 'fa-file-text',
          supports: null
        }
      ]
    }
  ],
  menuItem: null
}

const getters = {
  menuItems: state => {
    return state.menuItems
  },
  menuItem: state => {
    return state.menuItem
  }
}

const mutations = {
  pushItem (state, item) {
    state.menuItems[0].dropdown.unshift(item)
  },
  popItem (state, item) {
    state.menuItems.splice(state.menuItems.indexOf(item), 1)
  },
  getMenuItem (state, path) {
    let item = state.menuItems[0].dropdown.filter(item => {
      return item.path === path
    })
    state.menuItem = item[0]
  },
  resetState: (s) => {
    const initial = state
    Object.keys(initial).forEach(key => { s[key] = initial[key] })
  }
}

const actions = {
  pushMenuItem ({ commit }, item) {
    commit('pushItem', item)
  },
  popMenuItem ({ commit }, item) {
    commit('popItem', item)
  },
  getMenuItem ({ commit }, path) {
    commit('getMenuItem', path)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
