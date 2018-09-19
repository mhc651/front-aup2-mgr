<!--详情-审核信息-->
<template>
  <div class="wrap">
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
        <div class="td15 jcc bgg"><b class="red">*</b>产品转换比</div>
        <div class="td35"><el-input type="text" disabled size="mini" v-model="detailData.conversionRatio"> </el-input></div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg"><b class="red">*</b>产品材质</div>
        <div class="td35"> <el-input type="text" disabled size="mini" v-model="detailData.productMaterial"> </el-input> </div>
        <div class="td15 jcc bgg"><b class="red">*</b>最小使用单位</div>
        <div class="td35"><el-input type="text" disabled size="mini" v-model="detailData.minUnit"> </el-input></div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">产品包装材质</div>
        <div class="td35"> <el-input type="text" disabled size="mini" v-model="detailData.productPackMaterial"> </el-input> </div>
        <div class="td15 jcc bgg"><b class="red">*</b>包装单位</div>
        <div class="td35"><el-input type="text" disabled size="mini" v-model="detailData.packUnit"> </el-input></div>
      </div>
      <div class="dsf bdb tac">
        <div class="td15 jcc bgg">适用范围</div>
        <div class="td85"> <el-input type="textarea" :rows="4" resize="none" :disabled="true" v-model="detailData.scope" /> </div>
      </div>
      <div class="dsf tac">
        <div class="td15 jcc bgg">说明书</div>
        <div class="td85">
          <div class="el-textarea fileBox" >
            <a v-for="(item, i) in detailData.jpgFileList" download :key="i" class="fileItem" :href="item.url">{{item.name}}</a>
            <!--<p class="csp blue" style="margin: 0"  v-for="(item, i) in detailData.jpgFileList" :key="i" @click="toDownloadFile(item.url)"> {{item.name}} </p>-->
          </div>
        </div>
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
      return {}
    },
    created() {},
    methods: {
      // 下载
      toDownloadFile (url) {
        window.location.href = url
        // window.open(url)
      }
    },
  }
</script>
<style scoped>
  .wrap{
    min-height: calc( 100vh - 190px );
  }
  .fileBox {
    min-height: 84px;
    padding: 5px 15px;
    line-height: 1.5;
    background-color: #f5f7fa;
    border: 1px solid #e4e7ed;
    color: #c0c4cc;
    border-radius: 4px;
    text-align: left;
  }
  .fileItem {
    display: block;
    text-decoration: none;
    color: #195A91;
  }
</style>