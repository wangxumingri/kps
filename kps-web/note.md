
## 配置i18n

修改`main.js`

```
import i18n from './local'

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})

new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
```



## 布局配置


### 配置content

当我们在页面中跳转时，希望头，侧边菜单，尾都是固定的，变化的是content

新建一个测试组件

```$xslt
<template>
  <div>
    这是文章管理页面的列表
  </div>
</template>

<script>
    export default {
        name: "ArticleManage"
    }
</script>

<style scoped>

</style>

```
接着我们打开我们的router文件夹底下的index.js进行改造
```$xslt

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
      // 这里
      component: Home,
      children: {
        path: 'list',
        name: 'list',
        meta: {
          icon: 'ios-paper',
          title: '字典维护',
          code: 'system-manage-dict'
        },
        // 这里
        component: ArticleManage
      }
    }
  ]
})

```
将 home.vue中下述代码处的 内容 替换为<router-view/>
```
 <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view/>
          </Content>
 </Layout>
```

在浏览器中访问http://localhost:8080/#/article/list
