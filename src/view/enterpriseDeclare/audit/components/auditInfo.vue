<!--审核信息-->
<template>
  <div class="wrap">

    <div class="subTitle">审核信息</div>

    <div class="bd">
      <div class="dsf bdb">
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

      <div class="dsf">
        <div class="w35 p10">
          <uploadFile :filesList="data.filesList" />
        </div>
      </div>

    </div>

  </div>
</template>
<script>
  import uploadFile from '@/components/uploadFile'

  export default {
    components: {uploadFile},
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
    methods: {},
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