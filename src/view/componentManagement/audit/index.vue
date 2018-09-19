<!-- 企业申报审核 - 初始 -->
<template>
  <div class="wrap">

    <div class="title">
      <div>组件审核</div>
      <div>
        <el-button type="primary" :loading="passLoading" v-if="detailData.auditStatus == 3" @click="toPass">通过</el-button>
        <el-button type="primary" :loading="notPassLoading" v-if="detailData.auditStatus == 3" @click="toNotPass">不通过</el-button>
        <el-button type="primary" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>


    <div class="main" v-loading="mainLoading">
      <div class="mb20 mt10">
        申报企业：<span class="ml10 mr20 fc6">{{detailData.orgInfoName}}</span>
        注册证编号：<span class="ml10 mr20 fc6">{{detailData.registerCardNo}}</span>
      </div>
      <!--审核信息 开始-->
      <div class="subTitle">审核信息</div>
      <div class="dsf bd">
        <div class="w15 center bgg">审核意见</div>
        <div class="w85">
          <el-input type="textarea" class="p10 bsbb" :rows="4" placeholder="请输入内容" v-model="auditOpinion"> </el-input>
        </div>
      </div>
      <!-- 附件 -->
      <div class="dsf bd" style="margin-top: -1px">
        <div class="p10 w100">
          <uploadFile :filesList="filesList" />
        </div>
      </div>

      <!--审核信息 结束-->

      <componentInfo :detailData="detailData" :auditData="auditData" class="mt10"/>
      <componentFiles class="mt10" :fileList="detailData.jpgFileList" :auditData="auditData"/>

    </div>
  </div>
</template>
<script>
  import componentFiles from './components/componentFiles'
  import componentInfo from './components/componentInfo'
  import uploadFile from '@/components/uploadFile'

  export default {
    components: {componentInfo, componentFiles, uploadFile},
    data() {
      return {
        detailData:{
          buzData: {},
          jpgFileList: []
        },
        auditOpinion: '',      // 审核意见
        auditData: {}, // 审核的详情
        mainLoading: false,
        passLoading: false,
        notPassLoading: false,
        filesList: []
      }
    },
    created() {
      this.getDetail();
    },
    methods: {
      // 获取审核
      async getDetail() {
        let req = {
          id: this.$route.query.id || 0,
          type: 'audit'
        }
        let res = await  this.post('aup2mgr/api/project/toSubGroupAudit', req)
        if (res.success) {
          this.detailData = res.content.data
          this.auditOpinion = res.content.data.auditOpinion || ''
          if (!this.detailData.buzData) {
            this.detailData.buzData = {}
          }
          if (!this.detailData.jpgFileList) {
            this.detailData.jpgFileList = []
          }
        } else {
          res.errmsg ? this.$message.error(res.errmsg) : ''
        }
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
      // 提取文件的id,并拼接成字符串
      getIds() {
        let ids = []
        this.filesList.map(item => {
          ids.push(item.info.id)
        })
        return ids.join(',')
      },
      // 审核通过
      toPass() {
        let isNull = this.checkDataIsNull(this.auditData)
        if (!isNull) {
          this.$message.error("您有审核不通过的数据，取消掉再操作")
          return
        }
        this.toSubmitPass(4)
      },
      // 不通过
      toNotPass() {
        if (!this.auditOpinion || this.auditOpinion==='') {
          this.$message.error('审核不通过需提交审核意见，请填写您的审核意见，再提交回复！')
          return
        }
        this.toSubmitPass(5)
      },
      // 通过 、 不通过
      async toSubmitPass(auditStatus) { // 4 是通过 5是不通过
        let text = auditStatus === 4 && this.auditOpinion && this.auditOpinion!== '' ? '您的审核信息中包含审核意见，确定还要执行通过？': '确定是否提交审核结果?'
        this.$confirm(text, '提示').then(async () => {
          let reqData = {
            id: this.$route.query.id || 0,
            auditStatus,
            auditData: this.auditData,
            auditOpinion: this.auditOpinion,
            fileIds: this.getIds(),
          }
          let res = await this.post('aup2mgr/api/project/subGroupAuditUpdate', reqData)
          if (res.success) {
            this.$message.success('保存成功！')
            setTimeout(() => {
              this.$router.push('componentIndex')
            }, 1000)
          } else {
            res.errmsg ? this.$message.error(res.errmsg) : ''
          }
        }).catch(() => {
          return
        })

      }
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

  .main {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
  }
  .mb20{
    margin-bottom: 20px;
  }
  .fc6{
    color: #666;
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