import Vue from 'vue'
import VueRouter from 'vue-router'
import TvPlay from '../views/tvplay/TvPlay.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/tvplay',
    name: 'TvPlay',
    component: TvPlay
  },
  {
    path: '/tvplayer/:id',
    name: 'TvPlayer',
    component: () => import( '../views/tvplay/TvPlayer.vue')
  },
  {
    path: '/music',
    name: 'Music',
    component: () => import( '../views/music/Music.vue')
  },
  {
    path: '/book',
    name: 'Book',
    component: () => import( '../views/book/Book.vue')
  },
  {
    path: '/talk',
    name: 'Talk',
    component: () => import( '../views/talk/Talk.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
