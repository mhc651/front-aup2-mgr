<!--基本信息-->
<template>
  <div class="wrap">
    <div class="subTitle">基本资料</div>
    <div class="bd">

      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">注册证编号</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.registerCardNo"></el-input>
        </div>
        <div class="td15 jcc bgg">注册证有效期起</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.validityStart"></el-input>
        </div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">注册证名称</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.registerCardName"></el-input>
        </div>
        <div class="td15 jcc bgg">注册证有效期止</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.validityEnd"></el-input>
        </div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">产品名称（中文）</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.name"></el-input>
        </div>
        <div class="td15 jcc bgg">产品名称（英文）</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.nameEn"></el-input>
        </div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">生产企业（中文）</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.manufactureName"></el-input>
        </div>
        <div class="td15 jcc bgg">生产企业（英文）</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.manufactureNameEn"></el-input>
        </div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">产地</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.origin"></el-input>
        </div>
        <div class="td15 jcc bgg">代理企业</div>
        <div class="td35">
          <el-input type="text" disabled size="mini" v-model="data.proxyName"></el-input>
        </div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">管理类别</div>
        <div class="td35">
          <el-select :disabled="true"  size="mini" style="width: 100%;" v-model="data.managementType">
            <option value=""></option>
          </el-select>
        </div>
        <div class="td15 jcc bgg">分类目录</div>
        <div class="td35">
          <el-select :disabled="true"  size="mini" style="width: 100%;" v-model="data.aup2ProjectTypeId"> <!-- 需要名称 -->
            <option value=""></option>
          </el-select>
        </div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">注册证型号</div>
        <div class="td85"> <el-input type="textarea" :rows="2" resize="none" :disabled="true" v-model="data.model" /> </div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">注册证规格</div>
        <div class="td85"> <el-input type="textarea" :rows="2" resize="none" :disabled="true" v-model="data.standard" /> </div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">结构及组成</div>
        <div class="td85"> <el-input type="textarea" :rows="2" resize="none" :disabled="true" v-model="data.structure" /> </div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">使用范围</div>
        <div class="td85"> <el-input type="textarea" :rows="2" resize="none" :disabled="true" v-model="data.scope" /> </div>
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