<!--基本信息-->
<template>
  <div class="wrap">
    <div class="subTitle">基本资料</div>
    <div class="bd">
      <div class="dsf bgg bdb tac">
        <div class="td15 bdr"></div>
        <div class="td35 bdr jcc">当前信息</div>
        <div class="td35 bdr jcc">历史信息</div>
        <div class="td15"></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('orgInfoName')}">
        <div class="td15 bgg jcc">企业名称</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.orgInfoName}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.orgInfoName}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="orgInfoName" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('registerAddress')}">
        <div class="td15 bgg jcc">注册地址</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.registerAddress}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.registerAddress}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="registerAddress" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('productAddress')}">
        <div class="td15 bgg jcc">生产地址</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.productAddress}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.productAddress}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="productAddress" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('registeredCapital')}">
        <div class="td15 bgg jcc">注册资金（万元）</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.registeredCapital}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.registeredCapital}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="registeredCapital" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('turnover')}">
        <div class="td15 bgg jcc">2017年营业额（万元）</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.turnover}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.turnover}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="turnover" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('legalName')}">
        <div class="td15 bgg jcc">法人姓名</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.legalName}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.legalName}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="legalName" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('legalCard')}">
        <div class="td15 bgg jcc">法人身份证号</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.legalCard}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.legalCard}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="legalCard" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('legalPhone')}">
        <div class="td15 bgg jcc">法人联系电话</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.legalPhone}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.legalPhone}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="legalPhone" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('fax')}">
        <div class="td15 bgg jcc">传真</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.fax}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.fax}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="fax" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('mailingAddress')}">
        <div class="td15 bgg jcc">通讯地址</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.mailingAddress}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.mailingAddress}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="mailingAddress" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('postalCode')}">
        <div class="td15 bgg jcc">邮政编码</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.postalCode}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.postalCode}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="postalCode" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('url')}">
        <div class="td15 bgg jcc">网址</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.url}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.url}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="url" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('legalEmail')}">
        <div class="td15 bgg jcc">电子信箱</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.legalEmail}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.legalEmail}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="legalEmail" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('authorizedName')}">
        <div class="td15 bgg jcc">被授权人姓名</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.authorizedName}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.authorizedName}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="authorizedName" /></div>
      </div>

      <div class="dsf bdb tac" :class="{bdRed:competeValue('authorizedPhone')}">
        <div class="td15 bgg jcc">被授权人联系电话</div>
        <div class="td35 bdr jcc">
          <span v-if="reaudit">
            {{buz.authorizedPhone}}
          </span>
        </div>
        <div class="td35 bdr jcc">{{data.authorizedPhone}}</div>
        <div class="td15 jcc"><tickGroup :audit="audit" field="authorizedPhone" /></div>
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
      // 是否再审
      reaudit:{
        type:Boolean,
        default:false
      },
      // 数据
      data:{
        type:Object,
        default:() => {}
      },
      // 对比数据
      buz:{
        type:Object,
        default:() => {}
      },
      // 审核数据
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