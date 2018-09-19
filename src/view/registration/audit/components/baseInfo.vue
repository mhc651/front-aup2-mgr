<!--基本信息-->
<template>
  <div class="wrap">
    <div class="subTitle">注册证信息</div>
    <div class="bd">
      <div class="dsf bgg bdb tac">
        <div class="td15"></div>
        <div class="td35 bdr jcc">历史信息</div>
        <div class="td35 bdr jcc">当前信息</div>
        <div class="td15"></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('registerCardNo')}">
        <div class="td15 bgg jcc">注册证编号</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.registerCardNo}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.registerCardNo}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="registerCardNo" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('registerCardName')}">
        <div class="td15 bgg jcc">注册证名称</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.registerCardName}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.registerCardName}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="registerCardName" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('origin')}">
        <div class="td15 bgg jcc">产地</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.origin}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.origin}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="origin" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('managementType')}">
        <div class="td15 bgg jcc">管理类别</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.managementType}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.managementType}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="managementType" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('name')}">
        <div class="td15 bgg jcc">产品名称（中文）</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.name}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.name}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="name" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('nameEn')}">
        <div class="td15 bgg jcc">产品名称（英文）</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.nameEn}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.nameEn}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="nameEn" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('model')}">
        <div class="td15 bgg jcc">注册证型号</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.model}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.model}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="model" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('standard')}">
        <div class="td15 bgg jcc">注册证规格</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.standard}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.standard}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="standard" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('aup2ProjectTypeId')}">
        <div class="td15 bgg jcc">分类目录</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.aup2ProjectTypeId}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.aup2ProjectTypeId}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="aup2ProjectTypeId" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('manufactureName')}">
        <div class="td15 bgg jcc">生产企业</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.manufactureName}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.manufactureName}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="manufactureName" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('manufactureNameEn')}">
        <div class="td15 bgg jcc">生产企业（英文）</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.manufactureNameEn}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.manufactureNameEn}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="manufactureNameEn" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('proxyName')}">
        <div class="td15 bgg jcc">代理企业</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.proxyName}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.proxyName}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="proxyName" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('validityStart')}">
        <div class="td15 bgg jcc">注册证有效期起</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.validityStart}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.validityStart}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="validityStart" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('validityEnd')}">
        <div class="td15 bgg jcc">注册证有效期止</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.validityEnd}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.validityEnd}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="validityEnd" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('structure')}">
        <div class="td15 bgg jcc">结构及组成</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.structure}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.structure}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="structure" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('scope')}">
        <div class="td15 bgg jcc">使用范围</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.scope}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.scope}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="scope" /></div>
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
      reaudit:{
        type:Boolean,
        default:false
      },
      data:{
        type:Object,
        default:() => {}
      },
      buz:{
        type:Object,
        default:() => {}
      },
      audit:{
        type:Object,
        default:() => {}
      }
    },
    methods: {
      competeValue (key) {
        return this.reaudit &&  this.buz[key] !== this.data[key]
      }
    },
    created() {
    },
  }
</script>
<style scoped>
  .bdRed{
    border:1px solid #f00;
  }
  .subTitle{
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    background: #195A91;
    box-sizing: border-box;
    color: #fff;
  }
</style>