<!-- 注册证审核-->
<template>
  <div class="wrap">

    <div class="title">
      <div>注册证审核</div>
      <div>
        <el-button type="primary" @click="auditPass">通过</el-button>
        <el-button type="primary" @click="auditNotPass">不通过</el-button>
        <el-button type="primary" @click="$router.back()">返回</el-button>
      </div>
    </div>

    <!--申报企业：浙江康康医疗器械有限公司     注册证编号：国械注进20163150365-->

    <div class="main">
      <div class="mb20 mt10">
        申报企业：<span class="ml10 mr20 fc6">{{registrationData.orgInfoName}}</span>
        注册证编号：<span class="ml10 mr20 fc6">{{registrationData.registerCardNo}}</span>
      </div>
      <!--审核信息-->
      <auditInfo :data="registrationData" />

      <!--基本信息-->
      <baseInfo class="mt10"
                :data="registrationData"
                :reaudit="reaudit"
                :buz="registrationData.buzData"
                :audit="auditData.auditDetail"/>

      <!--动态模块-->
      <div v-for="(item,index) in registrationData.attributeConfigJson">
        <dynamicModule class="mt10"
                       v-if="reaudit"
                       :key="index"
                       :reaudit="reaudit"
                       :dataField="item"
                       :valueField="registrationData.attributeJson"
                       :buz="registrationData.buzData.attributeJson"
                       :audit="auditData.auditDetail.attributeJson"/>

        <dynamicModule class="mt10"
                       v-else
                       :key="index"
                       :dataField="item"
                       :valueField="registrationData.attributeJson"
                       :audit="auditData.auditDetail.attributeJson"/>
      </div>


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
        reaudit: false,           // 是否是再审
        registrationData: {},     // 注册证申报数据
        auditData: {              // 审核数据
          id: '',
          auditStatus: null,
          auditOpinion: null,
          auditDetail: {
            attributeJson: {}
          }
        },
      }
    },
    methods: {

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
      // 提取文件的id,并拼接成字符串
      getIds(arr) {
        let ids = []
        arr.map(item => {
          ids.push(item.info.id)
        })
        return ids.join(',')
      },

      // 审核通过
      auditPass() {
        let isNull = this.checkDataIsNull(this.auditData.auditDetail)
        if (!isNull) {
          this.$message.error("您有审核不通过的数据，取消掉再操作")
          return
        }
        let text = this.auditOpinion && this.auditOpinion!== '' ? '您的审核信息中包含审核意见，确定还要执行通过？' : '确定是否提交审核结果?'

        this.$confirm(text, '提示').then(async () => {
          this.auditData.fileIds = this.getIds(this.auditData.filesList)
          this.auditData.auditStatus = 4
          let url = 'aup2mgr/api/project/regiseterAuditUpdate'
          let res = await this.post(url, this.auditData)
          if (res.success) {
            this.$message.success('保存成功！')
            this.$router.push('/registrationIndex')
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
          this.auditData.fileIds = this.getIds(this.auditData.filesList)
          this.auditData.auditStatus = 5
          let url = 'aup2mgr/api/project/regiseterAuditUpdate'
          let res = await this.post(url, this.auditData)
          if (res.success) {
            this.$message.success('保存成功！')
            this.$router.push('/registrationIndex')
          } else {
            this.$message.error(res.errmsg)
          }
          // console.log('审核不通过', res)
        })
      },

      // 获取注册证申报数据
      async getRegistrationData() {
        let id = this.$route.query.id || ''


        this.auditData.id = id
        let url = 'aup2mgr/api/project/toRegisterAudit'
        let body = {
          registerId:id,
          type:'audit',  //‘detail’查看详情，'audit'审核操作
        }
        let res = await  this.post(url, body)
        if (res.success) {
          this.registrationData = res.content.data
          if(!this.registrationData.buzData) {
            this.registrationData.buzData = {}
          }
          if (this.reaudit) {
            this.registrationData.buzData.attributeJson = JSON.parse(this.registrationData.buzData.attributeJson)
          }
          localStorage.setItem('2222',JSON.stringify(res.content.data))
        } else {
          this.$message.error(res.errmsg)
        }
        console.log("获取注册证申报数据", res)
      },
    }
    ,
    created() {
      // 获取注册证申报数据
      this.getRegistrationData();

      this.reaudit = Boolean(this.$route.query.reaudit)
      console.log('this.reaudit', this.reaudit)

      // let data = JSON.parse(localStorage.getItem('2222'))
      // this.registrationData = data.content.data
      // this.registrationData.buzData.attributeJson = JSON.parse(this.registrationData.buzData.attributeJson)
      // console.log(this.registrationData)
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
  .mb20{
    margin-bottom: 20px;
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