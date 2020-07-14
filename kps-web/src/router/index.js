import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import ArticleManage from "../views/article/ArticleManage";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/article',
      name: 'article',
      component: Home,
      children: [
        {
          path: 'list',
          name: 'list',
          meta: {
            icon: 'ios-paper',
            title: '字典维护',
            code: 'system-manage-dict'
          },
          component: ArticleManage
        }
      ]
    }
  ]
})
