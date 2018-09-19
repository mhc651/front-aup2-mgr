<!--产品管理管理首页-->
<template>
  <div class="wrap">
    <div class="title">组件管理</div>
    <el-tabs type="border-card"  v-model="activeIndex" @tab-click="toClickTab">
      <el-tab-pane label="待审核" name="1">
        <pendingList :productList="productList" :managementTypeList="managementTypeList"/>
      </el-tab-pane>
      <el-tab-pane label="审核中" name="2">
        <auditingList :productList="productList" :managementTypeList="managementTypeList" :toChange="toChange"/>
      </el-tab-pane>
      <el-tab-pane label="未通过" name="3">
        <notPassList :productList="productList" :managementTypeList="managementTypeList"  @change="change"/>
      </el-tab-pane>
      <el-tab-pane label="已通过" name="4">
        <hasPassList :productList="productList" :managementTypeList="managementTypeList"  @change="change"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import pendingList from './components/pendingList'
  import auditingList from './components/auditingList'
  import notPassList from './components/notPassList'
  import hasPassList from './components/hasPassList'

  export default {
    components: {pendingList, auditingList, notPassList, hasPassList},
    data() {
      return {
        productList: [], // 产品分类列表
        managementTypeList: [], // 管理类别列表
        activeIndex: '1',
        toChange: false // 是否重新渲染列表
      }
    },
    created() {
      this.getProductList()
      this.getManagementType()
      this.toChange = false
    },
    methods: {
      // 获得产品分类
      async getProductList() {
        let url = 'aup2mgr/api/codeItem/projectType'
        let res = await this.post(url, {})
        if (res.success) {
          this.productList = res.content
        }
      },

      // 获得管理类别列表
      async getManagementType () {
        let url = 'aup2mgr/api/codeItem/productManagementType'
        let res = await this.post(url, {})
        if (res.success) {
          this.managementTypeList = res.content
        }
      },

      // 切换到审核中
      change() {
        this.activeIndex = '2'
        this.toChange = true
      },
      toClickTab() {
        this.toChange = false
      }
    },
  }
</script>
<style scoped>
  .title {
    height: 49px;
    line-height: 49px;
    border-bottom: 1px solid #e6e6e6;
  }
</style>