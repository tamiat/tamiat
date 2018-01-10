import api from '../../services/api/posts'

const state = {
  posts: []
}

const getters = {
  posts: state => state.posts
}

const mutations = {
  setPosts (state, { posts }) {
    state.posts = posts
  }
}

const actions = {
  getPosts ({ commit }, { id }) {
    
  }
}

export default { state, getters, mutations, actions }
