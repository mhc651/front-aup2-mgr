<!--企业申报管理首页-->
<template>
  <div class="wrap">
    <div class="title">企业申报管理</div>
    <el-tabs type="border-card" @tab-click="showTabs" v-model="currentTabName">
      <el-tab-pane label="待审核" name="showPendingList">
        <pendingList v-if="showPendingList" />
      </el-tab-pane>
      <el-tab-pane label="审核中" name="showAuditingList">
        <auditingList v-if="showAuditingList" />
      </el-tab-pane>
      <el-tab-pane label="未通过" name="showNotpassList">
        <notpassList v-if="showNotpassList" />
      </el-tab-pane>
      <el-tab-pane label="已通过" name="showPassedList">
        <passedList v-if="showPassedList" />
      </el-tab-pane>
      <el-tab-pane label="已取消" name="showCancelledList">
        <cancelledList v-if="showCancelledList" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import pendingList from './components/pendingList'
  import auditingList from './components/auditingList'
  import notpassList from './components/notpassList'
  import passedList from './components/passedList'
  import cancelledList from './components/cancelledList'

  export default {
    components: {pendingList, auditingList, notpassList, passedList, cancelledList},
    data() {
      return {
        currentTabName:'showPendingList',  // 当前标签名
        showPendingList:true,     // 显示 待审核 列表
        showAuditingList:false,   // 显示 审核中 列表
        showNotpassList:false,    // 显示 不通过 列表
        showPassedList:false,     // 显示 已通过 列表
        showCancelledList:false,  // 显示 已取消 列表
      }
    },
    methods: {
      showTabs () {
        this[this.currentTabName] = true
      }
    },
    created() {
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