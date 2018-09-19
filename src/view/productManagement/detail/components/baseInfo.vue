<!--详情-审核信息-->
<template>
  <div class="wrap">
    <div class="mainBox">
      申报企业：<span>{{detailData.orgInfoName}}</span>  <!-- 没有 -->
      注册证编号：<span>{{detailData.registerCardNo}}</span>
    </div>
    <div class="bd tableBox">
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg"><b class="red">*</b>注册证编号</div>
        <div class="td35"> <el-input type="text" disabled size="mini" v-model="detailData.registerCardNo"> </el-input> </div>
        <div class="td15 jcc bgg"></div>
        <div class="td35"></div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg"><b class="red">*</b>组件名称</div>
        <div class="td35"> <el-input type="text" disabled size="mini" v-model="detailData.subGroupName"> </el-input> </div>
        <div class="td15 jcc bgg"><b class="red">*</b>型号</div>
        <div class="td35"> <el-input type="text" disabled size="mini" v-model="detailData.model"> </el-input> </div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg"><b class="red">*</b>规格</div>
        <div class="td35"> <el-input type="text" disabled size="mini" v-model="detailData.standard"> </el-input> </div>
        <div class="td15 jcc bgg"><b class="red">*</b>竞价分组</div>
        <div class="td35">
          <el-select :disabled="true"  size="mini" style="width: 100%;" v-model="detailData.aup2ProjectTypeGroupName">
            <option value=""></option>
          </el-select></div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">是否一次性使用</div>
        <div class="td35">
          <el-select :disabled="true"  size="mini" style="width: 100%;" v-model="detailData.disposable_flg">
            <option value=""></option>
          </el-select></div>
        <div class="td15 jcc bgg">灭菌方式</div>
        <div class="td35"><el-input type="text" disabled size="mini" v-model="detailData.sterilization"> </el-input> </div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">国际型号(口径大小)</div>
        <div class="td35"><el-input type="text" disabled size="mini" v-model="detailData.model_intl"> </el-input></div>
        <div class="td15 jcc bgg">国内型号(口径大小)</div>
        <div class="td35"><el-input type="text" disabled size="mini" v-model="detailData.model_cn"> </el-input> </div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">试用人群范围</div>
        <div class="td35"><el-input type="text" disabled size="mini" v-model="detailData.trial"> </el-input></div>
        <div class="td15 jcc bgg">是否带延长管</div>
        <div class="td35"><el-input type="text" disabled size="mini" v-model="detailData.extension_tube"> </el-input> </div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">翼的数目</div>
        <div class="td35"><el-input type="text" disabled size="mini" v-model="detailData.wing_number"> </el-input></div>
        <div class="td15 jcc bgg">导管长度（mm）</div>
        <div class="td35"><el-input type="text" disabled size="mini" v-model="detailData.catheter_length"> </el-input> </div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">针管外径（mm）</div>
        <div class="td35"><el-input type="text" disabled size="mini" v-model="detailData.needle"> </el-input></div>
        <div class="td15 jcc bgg">各部件材质</div>
        <div class="td35"><el-input type="textarea" size="mini" :autosize="{ minRows: 1, maxRows: 4}" resize="none" :disabled="true"  v-model="detailData.material"/> </div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">2018宁德最低价</div>
        <div class="td35"><el-input type="text" disabled size="mini" v-model="detailData.ndzdj_2018"> </el-input></div>
        <div class="td15 jcc bgg">2018宁德最低价采购医院</div>
        <div class="td35"><el-input type="text" disabled size="mini" v-model="detailData.ndzdjcgyy_2018"> </el-input> </div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">2018福建省最低价</div>
        <div class="td35"><el-input type="text" disabled size="mini" v-model="detailData.fjszdj_2018"> </el-input></div>
        <div class="td15 jcc bgg">2018福建省最低价采购医院</div>
        <div class="td35"><el-input type="text" disabled size="mini" v-model="detailData.fjszdjcgyy_2018"> </el-input> </div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">备注</div>
        <div class="td85"><el-input type="textarea" size="mini" :rows="4" resize="none" :disabled="true"  v-model="detailData.note"/></div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    props: {
      detailData: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        mainLoading: false
      }
    },
    created() {

    },
    methods: {

    }
  }
</script>
<style scoped>
  .wrap{
    min-height: calc( 100vh - 190px );
  }
  .mainBox{
    background: #fff;
    margin: 10px 0 20px;
  }
  .mainBox span{
    font-size: 16px;
    color: #666;
    margin: 0 50px 0 10px;
  }
  .redStar:before{
    content: '*';
    color: #F56C6C;
  }
  .td1,.td2, .td3, .td4, .td234{
    padding: 6px 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }

  .td1, .td2, .td3{
    border-right: 1px solid #e6e6e6;
  }
  .td1{
    width: 20%;
    min-height: 40px;
    background: #f5f5f5;
    justify-content: center;
  }
  .td2{
    width: 30%;
    min-height: 40px;
    justify-content: center;
  }
  .td234 {
    width: 80%;
    min-height: 40px;
    justify-content: center;
  }
  .td3{
    width: 20%;
    min-height: 40px;
    background: #f5f5f5;
    justify-content: center;
  }
  .td4{
    width: 30%;
    min-height: 60px;
    justify-content: center;
  }
</style>