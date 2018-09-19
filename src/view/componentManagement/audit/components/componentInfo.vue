<!--基本信息-->
<template>
  <div class="wrap">
    <div class="subTitle">组件信息</div>
    <div class="bd">
      <div class="dsf bgg bdb tac">
        <div class="td15 bdr"></div>
        <div class="td35 bdr jcc">历史信息</div>
        <div class="td35 bdr jcc">当前信息</div>
        <div class="td15"></div>
      </div>

      <div class="dsf bdb tac">
        <div class="td15 bgg jcc">组件名称</div>
        <div class="td35 bdr jcc">{{detailData.buzData.subGroupName}}</div>
        <div class="td35 bdr jcc">{{detailData.subGroupName}}</div>
        <div class="td15 jcc"><tickGroup :audit="auditData" field="subGroupName" /></div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 bgg jcc">产品转换比</div>
        <div class="td35 bdr jcc">{{detailData.buzData.conversionRatio}}</div>
        <div class="td35 bdr jcc">{{detailData.conversionRatio}}</div>
        <div class="td15 jcc"><tickGroup :audit="auditData" field="conversionRatio"/></div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 bgg jcc">最小使用单位</div>
        <div class="td35 bdr jcc">{{detailData.buzData.minUnit}}</div>
        <div class="td35 bdr jcc">{{detailData.minUnit}}</div>
        <div class="td15 jcc"><tickGroup :audit="auditData" field="minUnit"/></div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 bgg jcc">包装单位</div>
        <div class="td35 bdr jcc">{{detailData.buzData.packUnit}}</div>
        <div class="td35 bdr jcc">{{detailData.packUnit}}</div>
        <div class="td15 jcc"><tickGroup :audit="auditData" field="packUnit"/></div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 bgg jcc">产品材质</div>
        <div class="td35 bdr jcc">{{detailData.buzData.productMaterial}}</div>
        <div class="td35 bdr jcc">{{detailData.productMaterial}}</div>
        <div class="td15 jcc"><tickGroup :audit="auditData" field="productMaterial"/></div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 bgg jcc">产品包装材质</div>
        <div class="td35 bdr jcc">{{detailData.buzData.productPackMaterial}}</div>
        <div class="td35 bdr jcc">{{detailData.productPackMaterial}}</div>
        <div class="td15 jcc"><tickGroup :audit="auditData" field="productPackMaterial"/></div>
      </div>
      <div class="dsf tac">
        <div class="td15 bgg jcc">适用范围</div>
        <div class="td35 bdr jcc">{{detailData.buzData.scope}}</div>
        <div class="td35 bdr jcc">{{detailData.scope}}</div>
        <div class="td15 jcc"><tickGroup :audit="auditData" field="scope"/></div>
      </div>

    </div>
  </div>
</template>
<script>
  import tickGroup from '@/components/tickGroup'
  export default {
    props: {
      detailData: {
        type: Object,
        default: {
          buzData: {}
        }
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
      // 判断名称是否不一致
      isDisName(name){ // true 不一致
        if (!this.detailData || !this.detailData.buzData) {
          return false
        }
        if (!this.detailData.buzData[name]) {
          return false
        }
        if ( this.detailData.buzData[name] !== this.detailData[name]) {
          return true
        }
        return false
      },
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