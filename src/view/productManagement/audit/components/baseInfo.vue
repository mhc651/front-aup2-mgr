<!--基本信息-->
<template>
  <div class="wrap">
    <div class="bd">
      <div class="dsf bgg bdb tac">
        <div class="td15 bdr"></div>
        <div class="td35 bdr jcc">历史信息</div>
        <div class="td35 bdr jcc">当前信息</div>
        <div class="td15"></div>
      </div>

      <div v-if="!detailData.attributeConfigJson || !detailData.attributeConfigJson.length">
        <div class="td100 jcc center" style="height: 60px">
          暂无数据
        </div>
      </div>
      <div v-else class="dsf tac" v-for="(item, i) in detailData.attributeConfigJson" :key="i" :class="{'bdb' : i < detailData.attributeConfigJson.length-1}">
        <div class="td15 bgg jcc">{{item.name}}</div>
        <div class="td35 bdr jcc">{{detailData.buzData[item.code]}}</div>
        <div class="td35 bdr jcc">{{detailData.currentInfo[item.code]}}</div>
        <div class="td15 jcc"><tickGroup :audit="auditData" :field="item.code"/></div>
      </div>
    </div>
  </div>
</template>
<script>
  import tickGroup from '@/components/tickGroup'
  export default {
    components: {tickGroup},
    props: {
      detailData: {
        type: Object,
        default: {}
      },
      auditData: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {}
    },
    methods: {
    },
    created() {
    },
  }
</script>
<style scoped>
  .wrap{
    /*min-height: calc( 100vh - 400px);*/
  }
</style>