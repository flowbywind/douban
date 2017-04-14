import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Movie state
    movieTags: [
      {
        title: '同时入选IMDB250和豆瓣电影250的电影',
        href: 'https://m.douban.com/doulist/968362/',
        color: '#FFAC2D'
      },
      {
        title: '带你进入不正常的世界',
        href: 'https://m.douban.com/doulist/16002',
        color: '#FF4055'
      },
      {
        title: '用电【影】来祭奠逝去的岁月',
        href: 'https://m.douban.com/doulist/190343',
        color: '#4F9DED'
      },
      {
        title: '女孩们的故事【电影】',
        href: 'https://m.douban.com/doulist/1125971',
        color: '#FFC46C'
      },
      {
        line: true
      },
      {
        title: '科幻是未来的钥匙——科幻启示录【科幻题材】',
        href: 'https://m.douban.com/doulist/4253902',
        color: '#2384E8'
      },
      {
        title: '美国生活面面观',
        href: 'https://m.douban.com/doulist/121326',
        color: '#3BA94D'
      },
      {
        title: '2015终极期待',
        href: 'https://m.douban.com/doulist/37479562',
        color: '#42BD56'
      },
      {
        title: '经典韩国电影——收集100部',
        href: 'https://m.douban.com/doulist/458087',
        color: '#CC3344'
      }
    ],
    hotMovies: [],
    newMovies: [],
    topMovies: [],
    // Home events state
    events: [],
    temp: [],
    skip: 0,
    // Detail state
    bannerTitle: '每天看点好内容',
    eventItem: {}
  },
  mutations: {
    getMovie (state, payload) {
      switch (payload.tag) {
        case 'hotMovies':
          state.hotMovies = payload.res
          break
        case 'newMovies':
          state.newMovies = payload.res
          break
        case 'topMovies':
          state.topMovies = payload.res
          break
        default:
          state.hotMovies = payload.res
      }
    },
    // Home events state
    getEvent (state, payload) {
      state.events = payload.res
    },
    loadMore (state, payload) {
      state.skip += 2
      state.events = state.events.concat(payload.res)
    },
    getSingleEvent (state, payload) {
      state.eventItem = payload.res
    }
  },
  actions: {
    getMovie ({ commit }) {
      Vue.http.jsonp('https://api.douban.com/v2/movie/in_theaters?count=8')
              .then(res => {
                commit({
                  type: 'getMovie',
                  tag: 'hotMovies',
                  res: res.body.subjects
                })
              })
      Vue.http.jsonp('https://api.douban.com/v2/movie/coming_soon?count=8')
              .then(res => {
                commit({
                  type: 'getMovie',
                  tag: 'newMovies',
                  res: res.body.subjects
                })
              })
      Vue.http.jsonp('https://api.douban.com/v2/movie/top250?count=8')
              .then(res => {
                commit({
                  type: 'getMovie',
                  tag: 'topMovies',
                  res: res.body.subjects
                })
              })
    },
    getEvent ({commit}) {
      Vue.http.jsonp('https://api.douban.com/v2/event/list?loc=108288&count=5')
              .then(res => {
                commit({
                  type: 'getEvent',
                  res: res.body.events
                })
              })
    },
    loadMore ({commit, state}) {
      Vue.http.jsonp('https://api.douban.com/v2/event/list?loc=108288&start=' +
                        state.skip + '&count=5')
              .then(res => {
                commit({
                  type: 'loadMore',
                  res: res.body.events
                })
              })
    },
    getSingleEvent ({commit, state}, payload) {
      Vue.http.jsonp('https://api.douban.com/v2/event/' + payload.id)
              .then(res => {
                commit({
                  type: 'getSingleEvent',
                  res: res.body
                })
              })
    }
  }
})
