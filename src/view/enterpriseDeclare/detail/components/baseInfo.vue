<!--基本信息-->
<template>
  <div class="wrap">
    <div class="subTitle">基本资料</div>
    <div class="bd">

      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">企业名称</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.orgInfoName"></el-input>
        </div>
        <div class="td15 jcc bgg">注册地址</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.registerAddress"></el-input>
        </div>
      </div>

      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">企业类型</div>
        <div class="td35">
          <el-checkbox v-model="data.projectType==1" disabled>生产企业</el-checkbox>
          <el-checkbox v-model="data.projectType==2" disabled>代理企业</el-checkbox>
        </div>
        <div class="td15 jcc bgg">生产地址</div>
        <div class="td35 ">
          <el-input type="text" disabled size="mini" v-model="data.productAddress"></el-input>
        </div>
      </div>

      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">法人姓名</div>
        <div class="td35 ">
          <el-input type="text" disabled size="mini" v-model="data.legalName"></el-input>
        </div>
        <div class="td15 jcc bgg">法人身份证号</div>
        <div class="td35 ">
          <el-input type="text" disabled size="mini" v-model="data.legalCard"></el-input>
        </div>
      </div>

      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">法人联系电话</div>
        <div class="td35 ">
          <el-input type="text" disabled size="mini" v-model="data.legalPhone"></el-input>
        </div>
        <div class="td15 jcc bgg">通讯地址</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.mailingAddress"></el-input>
        </div>
      </div>

      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">电子信箱</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.legalEmail"></el-input>
        </div>
        <div class="td15 jcc bgg">传真</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.fax"></el-input>
        </div>
      </div>

      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">2017年营业额（万元）</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.turnover"></el-input>
        </div>
        <div class="td15 jcc bgg">网址</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.url"></el-input>
        </div>
      </div>

      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">被授权人姓名</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.authorizedName"></el-input>
        </div>
        <div class="td15 jcc bgg">注册资金（万元）</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.registeredCapital"></el-input>
        </div>
      </div>

      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">被授权人联系电话</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.authorizedPhone"></el-input>
        </div>
        <div class="td15 jcc bgg">邮政编码</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.postalCode"></el-input>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import tickGroup from '@/components/tickGroup'
  export default {
    components: {tickGroup},
    data() {
      return {
        checked1: false,
        checked2: true
      }
    },
    props: {
      data: {
        type: Object,
        default: () => {
        }
      }
    },
    methods: {
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