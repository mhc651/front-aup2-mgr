<!--企业申报详情-->
<template>
  <div class="wrap">

    <div class="title">
      <div>企业申报详情</div>
      <div>
        <el-button type="primary">返回</el-button>
      </div>
    </div>

    <el-tabs type="border-card">
      <el-tab-pane label="申报信息">

        <!--审核信息-->
        <auditInfo :data="declareData"/>

        <!--基本信息-->
        <baseInfo class="mt10" :data="declareData"/>

        <!--动态模块-->
        <dynamicModule class="mt10" v-for="(item,index) in declareData.attributeConfigJson"
                       :key="index"
                       :dataField="item"
                       :valueField="declareData.attributeJson"/>

      </el-tab-pane>

      <el-tab-pane label="审计日志">
        <auditingLog :id="id"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import auditInfo from './components/auditInfo'
  import baseInfo from './components/baseInfo'
  import auditingLog from './components/auditingLog'
  import dynamicModule from './components/dynamicModule'

  export default {
    components: {auditInfo, baseInfo, auditingLog, dynamicModule},
    data() {
      return {
        id:'',             // 申报id
        declareData: {},   // 申报数据
      }
    },
    methods: {
      // 获取申报详情
      async getDeclareDetail() {
        let url = 'aup2mgr/api/project/toDetail'
        let res = await  this.post(url, {id:this.id})
        if (res.success) {
          this.declareData = res.content.data
        } else {
          this.$message.error(res.errmsg)
        }
        console.log("获取申报详情", res)
      },
    },
    created() {
      this.id = this.$route.query.id || ''
      this.getDeclareDetail()
    },
  }
</script>
<style scoped>
  .title {
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    box-sizing: border-box;
    padding: 0 10px;
  }

  .subTitle {
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    background: #195A91;
    box-sizing: border-box;
    color: #fff;
  }
</style>