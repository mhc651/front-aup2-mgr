<!--资质与授权文件-->
<template>
  <div class="wrap">
    <div class="subTitle">组件说明书</div>

    <div class="bd">

      <div class="dsf">
        <div class="td15 bgg jcc">说明书</div>
        <div class="td70 bdr">
          <!--<p class="csp blue" style="margin: 0"  v-for="(item, i) in fileList" :key="i" @click="toDownloadFile(item.url)"> {{item.name}} </p>-->
          <a class="csp blue" style="margin: 0" v-for="(item ,i) in fileList" download :key="i" :href="item.url">{{item.name}}</a>
        </div>
        <div class="td15 jcc"><tickGroup :audit="auditData" field="jpgFileList"/></div>
      </div>
    </div>
  </div>
</template>
<script>
  import tickGroup from '@/components/tickGroup'
  export default {
    props:{
      fileList: {
        type: Array,
        default: []
      },
      auditData: {
        type: Object,
        default: {}
      }
    },
    components: {tickGroup},
    data() {
      return {}
    },
    methods: {
      // 下载
      toDownloadFile (url) {
        window.location.href = url
        // window.open(url)
      }
    },
    created() {
    },
  }
</script>
<style scoped>
  .subTitle{
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    background: #195A91;
    box-sizing: border-box;
    color: #fff;
  }
</style>