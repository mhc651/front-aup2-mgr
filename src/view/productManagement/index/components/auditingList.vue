<!--审核中-->
<template>
  <div class="wrap">
    <div class="filterWrap">

      <div class="gird20">
        <el-input v-model="param.registerCardNo" placeholder="注册证编号"> </el-input>
      </div>
      <div class="gird20">
        <el-input v-model="param.productName" placeholder="产品名称"> </el-input>
      </div>
      <div class="gird20">
        <el-input v-model="param.manufactureName" placeholder="生产企业"> </el-input>
      </div>
      <div class="gird20">
        <el-input v-model="param.orgInfoName" placeholder="申报企业"> </el-input>
      </div>
      <div class="gird20">
        <el-input v-model="param.standard" placeholder="规格"> </el-input>
      </div>
      <div class="gird20">
        <el-input v-model="param.model" placeholder="型号"> </el-input>
      </div>
      <div class="gird20">
        <el-select v-model="param.projectType" placeholder="请选择企业类型" style="width: 100%;">
          <el-option label="生产企业" :value="1"> </el-option>
          <el-option label="代理企业" :value="2"> </el-option>
        </el-select>
      </div>
      <div class="gird20">
        <el-select v-model="param.aup2ProjectTypeId" placeholder="请选择分类目录" style="width: 100%;" @change="toGetGroupList">
          <el-option v-for="(item, i) in productList" :key="i" :label="item.text" :value="item.code"> </el-option>
        </el-select>
      </div>
      <div class="gird20">
        <el-select v-model="param.aup2ProjectTypeGroupId" placeholder="请选择竞价分组" style="width: 100%;">
          <el-option v-for="(item, i) in groupList" :key="i" :label="item.text" :value="item.code"> </el-option>
        </el-select>
      </div>

      <div class="gird20">
        <el-button type="primary" @click="toSearch">筛选</el-button>
        <el-button type="primary" @click="toClearForm">重置</el-button>
      </div>

    </div>

    <el-table :data="listData" style="width: 100%; margin-top: 20px" @selection-change="handleSelectionChange" v-loading="mainLoading" @row-click="toDetail">
      <el-table-column type="index" width="50" label="序号"> </el-table-column>
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column prop="manufactureName" label="生产企业"> </el-table-column>
      <el-table-column prop="orgInfoName" label="申报企业"> </el-table-column>
      <el-table-column prop="productName" label="产品名称"> </el-table-column>
      <el-table-column prop="registerCardNo" label="注册证编号">
        <!--<template slot-scope="scope">
          <router-link class="csp blue" :to="`/productDetail?id=${scope.row.id}`" >{{scope.row.registerCardNo}}</router-link>
        </template>-->
      </el-table-column>
      <el-table-column prop="subGroupName" label="组件名称">
        <!--template slot-scope="scope">
          <router-link class="csp blue" :to="`/productDetail?id=${scope.row.id}`" >{{scope.row.subGroupName}}</router-link>
        </template>-->
      </el-table-column>
      <el-table-column prop="standard" label="规格" width="100px">
        <!--template slot-scope="scope">
          <router-link class="csp blue" :to="`/productDetail?id=${scope.row.id}`" >{{scope.row.standard}}</router-link>
        </template>-->
      </el-table-column>
      <el-table-column prop="model" label="型号" width="100px">
        <!--<template slot-scope="scope">
          <router-link class="csp blue" :to="`/productDetail?id=${scope.row.id}`" >{{scope.row.model}}</router-link>
        </template>-->
      </el-table-column>
      <el-table-column prop="aup2ProjectTypeGroupName" label="分组" > </el-table-column>
      <el-table-column prop="qualityName" label="质量层次" > </el-table-column>
    </el-table>

    <el-pagination
       v-if="param.total"
       style="margin-top: 30px;"
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :current-page="param.page"
       :page-sizes="[25, 50, 100, 500,1000]"
       :page-size="param.size"
       layout="total, sizes, prev, pager, next, jumper"
       :total="param.total">
    </el-pagination>

    <!--<el-popover placement="bottom" width="150" trigger="click" >
      <el-button slot="reference" type="primary" class="btnReview" @click="toAudit">审核</el-button>
    </el-popover>-->

    <el-button type="primary" class="btnReview" @click="toAudit">审核</el-button>

  </div>
</template>
<script>
  export default {
    props: {
      productList: {
        type: Array,
        default: []
      },
      toChange: {
        type: Boolean,
        default: () => false
      }
    },
    data() {
      return {
        param: {
          registerCardNo: '', // 注册证编号,
          productName: '',  //产品名称,
          manufactureName: '',//生产企业
          orgInfoName: '', //申报企业,
          aup2ProjectTypeId: '', //分类目录,
          auditStatus: 3,  //审核状态,//2:待审核,3:审核中,4:通过,5:未通过
          projectType: '', //企业类型,//1:生产企业,2:代理企业
          page: 1,                   // 页码, 1
          size: 25,                  // 每页数据条数, 20
          total: 0,                   // 总条数
        },
        mainLoading: false,
        listData: [],
        multiSelect: [],
        groupList: [] // 竞价分组
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 获得列表
      async getList() {
        let url = 'aup2mgr/api/project/findProductMgrForPage'
        this.mainLoading = true
        let res = await this.post(url, this.param)
        this.mainLoading = false
        if (res.success) {
          this.listData = res.content.records
          this.param.total = res.content.total
        }
      },
      // 通过分类id 获得竞价分组列表
      async toGetGroupList(typeId) {
        let res = await this.post('aup2mgr/api/codeItem/projectTypeGroup', {typeId})
        if (res.success) {
          this.groupList =res.content
        }
      },
      // 搜索
      toSearch () {
        this.param.page = 1
        this.getList()
      },
      // 重置
      toClearForm() {
        this.param = {
          registerCardNo: '', // 注册证编号,
          productName: '',  //产品名称,
          manufactureName: '',//生产企业
          orgInfoName: '', //申报企业,
          aup2ProjectTypeId: '', //分类目录,
          auditStatus: 3,  //审核状态,//2:待审核,3:审核中,4:通过,5:未通过
          projectType: '', //企业类型,//1:生产企业,2:代理企业
          page: 1,                   // 页码, 1
          size: 25,                  // 每页数据条数, 20
        }
        this.getList()
      },
      // 多选的结果
      handleSelectionChange (val) {
        this.multiSelect = val
      },
      // 页显示数改变
      handleSizeChange (val) {
        this.param.page = 1
        this.param.size = val
        document.querySelector('.routerView').scrollTo(0, 0)
        this.getList()
      },
      // 页码数改变
      handleCurrentChange (val) {
        this.param.page = val
        document.querySelector('.routerView').scrollTo(0, 0)
        this.getList()
      },
      // 审核
      toAudit() {
        if(this.multiSelect.length === 0) {
          this.$message.error('您没有选中任何记录！')
          return
        }
        if(this.multiSelect.length > 1) {
          this.$message.error('一次只能选择一条数据进行审核！')
          return
        }
        this.$router.push(`/productAuditIndex?id=${this.multiSelect[0].id}`)
      },
      // 到详情页
      toDetail(row) {
        this.$router.push(`/productDetail?id=${row.id}`)
      }
    },
    watch: {
      // 重新渲染列表
      toChange (val, oldVal) {
        console.log(val, oldVal)
        if (val) {
          this.getList()
        }
      }
    }
  }
</script>
<style scoped>
  .wrap{
    min-height: calc( 100vh - 190px );
  }
  .filterWrap {
    display: flex;
    flex-wrap: wrap;
  }

  .gird20 {
    width: 20%;
    padding: 5px;
    box-sizing: border-box;
  }

  .blueTextBtn{
    color: #195A91;
    text-decoration: none;
  }

  .btnReview {
    width: 150px;
    margin-top: 30px;
  }
</style>