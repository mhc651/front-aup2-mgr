<!--审核信息-->
<template>
  <div class="wrap">
    <div class="subTitle">审核信息</div>

    <div class="bd">
      <div class="dsf bdb tac">
        <div class="td15 bgg jcc"><b class="red">*</b>审核结果</div>
        <div class="td85 bdr">{{getAuditResult()}}</div>
      </div>

      <div class="dsf">
        <div class="w15 center bgg">审核意见</div>
        <div class="w85">
          <el-input type="textarea"
                    class="p10 bsbb"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="data.auditOpinion">
          </el-input>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    props: {
      data: {
        type: Object,
        default: () => {
        }
      },
    },
    methods: {
      getAuditResult() {
        switch (+this.data.auditStatus) {
          case 1:
            return '待提交';
          case 2:
            return '待审核';
          case 3:
            return '审核中';
          case 4:
            return '审核通过';
          case 5:
            return '审核未通过';
          case 6:
            return '已取消';
          default:
            return '未知'
        }
      }
    },
    created() {
    },
  }
</script>
<style scoped>
  .subTitle {
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    background: #195A91;
    box-sizing: border-box;
    color: #fff;
  }
</style>