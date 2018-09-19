<template>
  <div class="indexWrap">
    <!--头部栏 开始-->
    <header class="topWrap">
      <!--顶部栏 左侧-->
      <div class="dsf">
        <!--logo 开始-->
        <div class="AppName">
          <img src="@/assets/logo.png" class="logoImg">
        </div>
        <!--logo 结束-->

        <!--项目名称 开始-->
        <div class="projectName">
          耗材联采限价采购-宁德耗材联合谈判
        </div>
        <!--项目名称 结束-->
      </div>

      <!--顶部栏 右侧-->
      <div class="dsf">
        <div class="userInfo">
          <el-dropdown>
          <span class="mr10 dsf aic white">
            <img src="@/assets/default.jpg" class="avatar">
            用户名
            <i class="el-icon-arrow-down ml10"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </header>
    <!--头部栏 结束-->

    <!--主框架 开始-->
    <div class="middleWrap">
      <!--左侧 开始-->
      <transition name="left">
        <aside class="left" v-if="showMenu">
          <div class="loginEnterpriseName">此处显示登陆企业名称</div>
          <!--左侧主菜单 开始-->
          <el-menu default-active="2" :default-openeds="['1','2','3','4','5']" class="el-menu-vertical-demo">

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>项目管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click.native="to('/')">项目管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>报名管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click.native="to('/enterpriseDeclareIndex')">企业申报管理</el-menu-item>
                <el-menu-item index="2-2" @click.native="to('/registrationIndex')">注册证管理</el-menu-item>
                <el-menu-item index="2-3" @click.native="to('/componentIndex')">组件管理</el-menu-item>
                <el-menu-item index="2-3" @click.native="to('/productIndex')">产品管理</el-menu-item>
                <!--<el-menu-item index="2-3" @click.native="to('/productEntryPublicityIndex')">产品入围公示</el-menu-item>-->
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>报价管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">报价管理</el-menu-item>
                <el-menu-item index="3-2">报价查询</el-menu-item>
                <el-menu-item index="3-3">解密公示</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>最终入选管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1">分组入选</el-menu-item>
                <el-menu-item index="4-2">入选结果</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
          <!--左侧主菜单 结束-->

          <!--左侧 隐藏菜单按钮 开始-->
          <div class="hideMenuButton" v-if="showMenu" @click="showHideMenu(false)">
            <i class="el-icon-arrow-left"></i>
          </div>
          <!--左侧 隐藏菜单按钮 结束-->

        </aside>
      </transition>
      <!--左侧 结束-->

      <!--左侧 显示菜单按钮 开始-->
      <transition name="showMenu" v-if="!showMenu">
        <div class="showMenuButton" @click="showHideMenu(true)">
          <i class="el-icon-arrow-right"></i>
        </div>
      </transition>
      <!--左侧 显示菜单按钮 结束-->

      <!--右侧 开始-->
      <div class="right">
        <router-view class="routerView"></router-view>
      </div>
      <!--右侧 结束-->
    </div>
    <!--主框架 结束-->

  </div>
</template>
<script>
  export default {
    data() {
      return {
        showMenu: true,       // 是否显示左侧菜单
      }
    },
    methods: {
      // 显示/隐藏 主菜单
      showHideMenu(bool) {
        this.showMenu = bool
      },
      // 页面跳转
      to(url) {
        this.$router.push(url)
      }
    },
    created() {
    },
  }
</script>

<!--公共样式-->
<style>
  @import "./assets/common.css";
</style>

<!--私有样式-->
<style scoped>
  /*总容器*/
  .indexWrap {
    min-width: 1200px;
  }

  /*顶部栏*/
  .topWrap {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    /*border-bottom: 1px solid #e6e6e6;*/
    box-sizing: border-box;
    background: #195a91;
  }

  /*头部logo*/
  .AppName {
    width: 200px;
    height: 100%;
    background: #144874;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }

  .logoImg {
    width: 160px;
  }

  /*项目选择*/
  .projectName {
    margin: 0 20px;
    display: flex;
    align-items: center;
    color: #fff;

  }

  /*个人信息*/
  .userInfo {
    display: flex;
    align-items: center;
  }

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  /*主容器*/
  .middleWrap {
    width: 100%;
    height: calc(100vh - 60px);
    overflow: hidden;
    display: flex;
    position: relative;
  }

  /*主菜单*/
  .left {
    width: 200px;
    height: 100%;
    display: block;
    background: #081526;
    /*border-right: 1px solid #364250;*/
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0;
    margin: 0;
    position: relative;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .left::-webkit-scrollbar {
    display: none;
  }

  /*菜单显示/隐藏 动画*/
  .left-enter-active, .left-leave-active {
    transition: width .5s;
  }

  .left-enter, .left-leave-to {
    width: 0px;
  }

  .loginEnterpriseName {
    width: 100%;
    display: flex;
    background: #0A1C31;
    height: 50px;
    color: #fff;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    white-space: nowrap;
  }

  /*隐藏菜单 按钮*/
  .hideMenuButton {
    height: 40px;
    width: 15px;
    background: #000;
    position: absolute;
    top: 50%;
    left: 185px;
    transform: translate(0, -50%);
    border-radius: 2px 0 0 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    z-index: 9999;
  }

  /*显示菜单 按钮*/
  .showMenuButton {
    height: 40px;
    width: 15px;
    background: #000;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    border-radius: 0 2px 2px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    z-index: 9999;
  }

  /*显示/隐藏 按鈕 动画*/
  .showMenu-enter-active, .showMenu-leave-active {
    transition: opacity .5s;
  }

  .showMenu-enter, .showMenu-leave-to {
    opacity: 0;
  }

  /*右侧布局*/
  .right {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    background: #f5f5f5;
  }

  .right::-webkit-scrollbar {
    display: none;
  }

  .routerView {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
  }
</style>