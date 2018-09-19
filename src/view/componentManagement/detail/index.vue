<!--产品详情页面-->
<template>
  <div class="wrap">
    <div class="titleWrap">
      <div class="title">组件详情</div>
      <div class="btnWrap">
        <el-button  size="medium"  @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="申报信息">
        <baseInfo :detailData="detailData"/>
      </el-tab-pane>
      <el-tab-pane label="审计日志">
        <declareLog :id="id"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import baseInfo from './components/baseInfo'
  import declareLog from './components/declareLog'

  export default {
    components: {baseInfo, declareLog},
    data() {
      return {
        id: this.$route.query.id || 0,
        detailData: {}
      }
    },
    created() {
      this.getDetail();
    },
    methods: {
      // 获取审核
      async getDetail() {
        let req = {
          id: this.id,
          type: 'detail'
        }
        let res = await  this.post('aup2mgr/api/project/toSubGroupAudit', req)
        if (res.success) {
          this.detailData = res.content.data
        } else {
          res.errmsg ? this.$message.error(res.errmsg) : ''
        }
      },
    }
  }
</script>
<style scoped>
  .titleWrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #e6e6e6;
  }
  .btnWrap .el-button{
    width: 100px;
  }
  .title {
    height: 49px;
    line-height: 49px;
  }
</style>