<style scoped>
  .layout{
    /*border: 1px solid #d7dde4;*/
    border: 1px solid red;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  /*.layout-logo{*/
  /*  width: 100px;*/
  /*  height: 30px;*/
  /*  background: #5b6270;*/
  /*  border-radius: 3px;*/
  /*  float: left;*/
  /*  position: relative;*/
  /*  top: 15px;*/
  /*  left: 20px;*/
  /*}*/
  /*.layout-nav{*/
  /*  width: 420px;*/
  /*  margin: 0 auto;*/
  /*  margin-right: 20px;*/
  /*}*/
  .layout-logo {
    width: 100px;
    height: 30px;
    border-radius: 10px;
    float: left;
    position: relative;
    left: 20px;
    top: 5px;
  }

  .layout-nav {
    width: auto;
    float: right;
    margin: 0 auto;
    margin-right: 20px;
  }
</style>
<template>
  <div class="layout">
    <Layout>
      <Header id="layout-header-scroll">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <!--头部左侧添加图标-->
          <div class="layout-logo"><img height="50px" width="50px" src="../assets/logo.png"/>
          </div>
          <!--头部右侧添加图标-->
          <div class="layout-nav"><img height="50px" width="50px" src="../assets/logo.png"/></div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              Item 1
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>
              Item 3
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper"></Icon>
              Item 4
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout style="height:91vh">
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu :active-name="activeMenuName" :open-names="openMenuNames" theme="light" width="auto" >
            <template v-for="(item,index) in menus">
              <!--有子菜单-->
              <template v-if="item.children">
                <Submenu :name=item.id
                         :key="item.id"
                >
                  <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    {{item.title}}
                  </template>
                  <template v-for="(childrenItem,childrenIndex) in item.children">
                    <MenuItem :name="childrenItem.id" :key="childrenItem.id">{{childrenItem.title}}</MenuItem>
                  </template>
                </Submenu>
              </template>
              <!--无子菜单-->
              <template v-else>
                <!--                <Submenu :name=item.id-->
                <!--                         :key="item.id"-->
                <!--                >-->
                <!--                  {{item.title}}-->
                <!--                </Submenu>-->
                <MenuItem :name="item.id" :key="item.id">{{item.title}}</MenuItem>
              </template>
            </template>
          </Menu>
        </Sider>
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
      </Layout>
    </Layout>
  </div>
</template>
<script>
  export default {
    name: "Home",
    data(){
      return {
        activeMenuName: "1-2",
        openMenuNames:['1'],
        menus:[
          {
            id: "1",
            title: "一级菜单1",
            path: "",
            url: "",
            children: [
              {
                id: "1-1",
                title: "二级菜单1-1",
                path: "",
                url: "",
                children:[]
              },
              {
                id: "1-2",
                title: "二级菜单1-2",
                path: "",
                url: "",
                children:[]
              }
            ]
          },
          {
            id: "2",
            title: "一级菜单2",
            path: "",
            url: "",
            children:[]
          }
        ]
      }
    },
    methods:{
      /**
       * 顶部跟随着滚动条的变化而滚动
       */
      handleScroll(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop >= 60) {
          document.querySelector('#layout-header-scroll').style.top = scrollTop + 'px';
        } else {
          document.querySelector('#layout-header-scroll').style.top = '0px';
        }
      }
    },
    mounted() {
      /**
       * 监听滚动条的滚动事件
       */
      // window.addEventListener('scroll', this.handleScroll)
    }
  }
</script>
