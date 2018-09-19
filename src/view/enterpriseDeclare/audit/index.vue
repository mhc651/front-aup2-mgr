<!-- 企业申报审核-->
<template>
  <div class="wrap">

    <div class="title">
      <div>企业申报审核</div>
      <div>
        <el-button type="primary" @click="auditPass">通过</el-button>
        <el-button type="primary" @click="auditNotPass">不通过</el-button>
        <el-button type="primary" @click="$router.back()">返回</el-button>
      </div>
    </div>

    <div class="main">
      <!--审核信息-->
      <auditInfo :data="auditData"/>

      <!--基本信息-->
      <baseInfo class="mt10"
                :data="declareData"
                :reaudit="reaudit"
                :buz="declareData.buzData"
                :audit="auditData"/>

      <!--动态模块-->
      <dynamicModule class="mt10"
                     v-for="(item,index) in declareData.attributeConfigJson"
                     :key="index"
                     :reaudit="reaudit"
                     :dataField="item"
                     :valueField="declareData.attributeJson"
                     :history="declareData.buzData.attributeJson"
                     :audit="auditData.auditDetail.attributeJson"/>

    </div>
  </div>
</template>
<script>
  import auditInfo from './components/auditInfo'
  import baseInfo from './components/baseInfo'
  import dynamicModule from './components/dynamicModule'

  export default {
    components: {auditInfo, baseInfo, dynamicModule},
    data() {
      return {
        reaudit: false,       // 是否是再审
        declareData: {},     // 申报数据
        auditData: {         // 审核数据
          id: '',
          auditStatus: null,
          auditOpinion: null,
          fileIds: '',
          filesList: [],
          auditDetail: {
            attributeJson: {}
          }
        },
      }
    },
    methods: {

      // 提取文件的id,并拼接成字符串
      getIds(arr) {
        let ids = []
        arr.map(item => {
          ids.push(item.info.id)
        })
        return ids.join(',')
      },

      // 检查审核数据
      checkDataIsNull(data) {
        let result = true
        Object.keys(data).forEach((key) => {
          if (data[key] !== null) {
            if (typeof data[key] === 'object') {
              this.checkDataIsNull(data[key])
            }
            if (typeof data[key] === 'string') {
              result = false
            }
          }
        });
        return result
      },

      // 审核通过
      auditPass() {
        let isNull = this.checkDataIsNull(this.auditData.auditDetail)
        if (!isNull) {
          this.$message.error("您有审核不通过的数据，取消掉再操作")
          return
        }

        this.$confirm('确定是否提交审核结果？', '提示').then(async () => {
          this.auditData.fileIds = this.getIds(this.auditData.filesList)
          this.auditData.auditStatus = 4
          let url = 'aup2mgr/api/project/saveOrUpdate'
          let res = await this.post(url, this.auditData)
          if (res.success) {
            this.$message.success('保存成功！')
            this.$router.push('/enterpriseDeclareIndex')
          } else {
            this.$message.error(res.errmsg)
          }
          // console.log('审核通过', res)
        })
      },

      // 审核不通过
      auditNotPass() {
        if (!this.auditData.auditOpinion) {
          this.$message.error("审核不通过需提交审核意见，请填写您的审核意见，再提交回复！")
          return
        }

        this.$confirm('确定是否提交审核结果？', '提示').then(async () => {
          this.auditData.auditStatus = 5
          let url = 'aup2mgr/api/project/saveOrUpdate'
          let res = await this.post(url, this.auditData)
          if (res.success) {
            this.$message.success('保存成功！')
            this.$router.push('/enterpriseDeclareIndex')
          } else {
            this.$message.error(res.errmsg)
          }
          // console.log('审核不通过', res)
        })
      },

      // 获取申报数据
      async getDeclareData() {
        let id = this.$route.query.id || ''

        this.auditData.id = id
        let url = 'aup2mgr/api/project/toAudit'
        let res = await  this.post(url, {id})
        if (res.success) {
          this.declareData = res.content.data

          if (this.declareData.id) {
            this.reaudit = true
          }

          if (this.declareData.buzData) {
            this.declareData.buzData.attributeJson = JSON.parse(this.declareData.buzData.attributeJson)
          } else {
            this.declareData.buzData = {attributeJson: {}}
          }

        } else {
          this.$message.error(res.errmsg)
        }
        console.log("获取申报数据", res)
      },
    }
    ,
    created() {
      // 获取申报数据
      this.getDeclareData();
    }
    ,
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

  .main {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
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