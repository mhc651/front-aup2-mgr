<!--注册证管理首页-->
<template>
  <div class="wrap">
    <div class="title">注册证管理</div>
    <el-tabs type="border-card" @tab-click="showTabs" v-model="currentTabName">
      <el-tab-pane label="待审核" name="showPendingList">
        <pendingList v-if="showPendingList" :productList="productList" :managementTypeList="managementTypeList" />
      </el-tab-pane>
      <el-tab-pane label="审核中" name="showAuditingList">
        <auditingList v-if="showAuditingList" :productList="productList" :managementTypeList="managementTypeList" />
      </el-tab-pane>
      <el-tab-pane label="未通过" name="showNotpassList">
        <notpassList v-if="showNotpassList" :productList="productList" :managementTypeList="managementTypeList" />
      </el-tab-pane>
      <el-tab-pane label="已通过" name="showPassedList">
        <passedList v-if="showPassedList" :productList="productList" :managementTypeList="managementTypeList" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import pendingList from './components/pendingList'
  import auditingList from './components/auditingList'
  import notpassList from './components/notpassList'
  import passedList from './components/passedList'

  export default {
    components: {pendingList, auditingList, notpassList, passedList},
    data() {
      return {
        currentTabName:'showPendingList',  // 当前标签名
        showPendingList:true,     // 显示 待审核 列表
        showAuditingList:false,   // 显示 审核中 列表
        showNotpassList:false,    // 显示 不通过 列表
        showPassedList:false,     // 显示 已通过 列表

        productList: [],          // 产品分类列表
        managementTypeList: [],   // 管理类别列表
      }
    },
    methods: {

      // 切换tab栏
      showTabs () {
        this[this.currentTabName] = true
      },

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
    },
    created() {
      this.getProductList()
      this.getManagementType()
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