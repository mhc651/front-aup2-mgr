<!--动态模块-->
<template>
  <div class="wrap">
    <div class="subTitle">{{dataField.name}}</div>

    <div class="bd">

      <div class="dsf bdb" v-for="(item,index) in dataField.attributes" :key="index">
        <div class="td15 bgg fdc jcc">
          <div class="tac">
            <b class="red" v-if="!item.allowBlank">*</b>
            {{item.name}}
          </div>
          <div>{{item.note}}</div>
        </div>
        <div class="td85 bdr fdc ais jcc">
          <!--文件类型-->
          <div v-if="item.type==='file' && valueField[item.code + '_fileInfos']">
            <div v-for="(i,idx) in valueField[item.code + '_fileInfos']" :key="idx">
              <a v-if="i"  class="fileLink" :href="i.url">{{i.name}}</a>
            </div>
          </div>
          <!--字符串类型-->
          <div v-if="item.type==='string' && valueField[item.code]">
            <el-input type="text" v-model="valueField[item.code]" size="mini" disabled></el-input>
          </div>
          <!--日期时间类型-->
          <div v-if="(item.type==='date' || item.type==='datatime') && valueField[item.code]">
            <el-date-picker v-model="valueField[item.code]" :type="item.type" size="mini" disabled></el-date-picker>
          </div>
          <!--int float boolean 类型-->
          <div v-if="item.type==='int' || item.type==='float' || item.type==='boolean'">
            {{valueField[item.code]}}
          </div>

          <!--子内容 开始-->
          <div class="subFields" v-if="item.subFields">
            <div v-for="(i,idx) in item.subFields">
              <!--文件类型-->
              <div v-if="i.type==='file' && valueField[i.code + '_fileInfos']">
                <div v-for="(j,jidx) in valueField[i.code + '_fileInfos']" :key="jidx">
                  <a v-if="j" class="fileLink" :href="j.url">{{j.name}}</a>
                </div>
              </div>
              <!--字符串类型-->
              <div v-if="i.type==='string' && valueField[i.code]">
                <el-input type="text" v-model="valueField[i.code]" size="mini" disabled></el-input>
              </div>
              <!--日期时间类型-->
              <div v-if="(i.type==='date' || i.type==='datatime') && valueField[i.code]">
                {{i.name}}:
                <el-date-picker v-model="valueField[i.code]" :type="i.type" size="mini" disabled class="mr10"></el-date-picker>
              </div>
              <!--int float boolean 类型-->
              <div v-if="item.type==='int' || item.type==='float' || item.type==='boolean'">
                {{valueField[item.code]}}
              </div>
            </div>
          </div>
          <!--子内容 结束-->

        </div>

        <div class="td15 jcc">
          <a v-for="(i,idx) in item.templates" :key="idx" href="i.url">{{i.name}}</a>
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
      return {}
    },
    props:{
      dataField:{
        type:Object,
        default:() => {}
      },
      valueField:{
        type:Object,
        default:() => {}
      },
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
  .subFields{
    padding: 10px 0;
    line-height: 30px;
    display: flex;
  }
  .fileLink{
    color: #195A91;
    text-decoration: none;
    font-size: 14px;
    line-height: 30px;
  }
</style>