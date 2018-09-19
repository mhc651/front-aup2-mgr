<!--审核中-->
<template>
  <div class="wrap">
    <div class="filterWrap">

      <div class="gird20">
        <el-input v-model="param.registerCardNo" placeholder="注册证编号"> </el-input>
      </div>
      <div class="gird20">
        <el-input v-model="param.subGroupName" placeholder="组件名称"> </el-input>
      </div>
      <div class="gird20">
        <el-input v-model="param.manufactureName" placeholder="生产企业"> </el-input>
      </div>
      <div class="gird20"></div>
      <div class="gird20"></div>
      <div class="gird20">
        <el-select v-model="param.aup2ProjectTypeId" placeholder="请选择分类目录" style="width: 100%;">
          <el-option v-for="(item, i) in productList" :key="i" :label="item.text" :value="item.code"> </el-option>
        </el-select>
      </div>
      <div class="gird20">
        <el-select v-model="param.managementType" placeholder="请选择管理类别" style="width: 100%;">
          <el-option v-for="(item, i) in managementTypeList" :key="i" :label="item.text" :value="item.code"> </el-option>
        </el-select>
      </div>

      <div class="gird20">
        <el-button type="primary" @click="toSearch">筛选</el-button>
        <el-button type="primary" @click="toClearForm">重置</el-button>
      </div>

    </div>

    <el-table :data="listData" style="width: 100%; margin-top: 20px" v-loading="mainLoading" @selection-change="handleSelectionChange" @row-click="toDetail">
      <el-table-column type="index" width="50" label="序号"> </el-table-column>
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column prop="registerCardNo" label="注册证编号"> </el-table-column>
      <el-table-column prop="subGroupName" label="组件名称">
        <!--<template slot-scope="scope">
          <router-link class="csp blue" :to="`/componentDetail?id=${scope.row.id}`" >{{scope.row.subGroupName}}</router-link>
        </template>-->
      </el-table-column>
      <el-table-column prop="conversionRatio" label="产品转换比"> </el-table-column> <!-- 这个没有 -->
      <el-table-column prop="minUnit" label="最小使用单位"> </el-table-column>
      <el-table-column prop="packUnit" label="包装单位"> </el-table-column>
      <el-table-column prop="proSum" label="产品数量"  width="100px"> </el-table-column>
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
      managementTypeList: {
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
          subGroupName: '', //组件名称,
          manufactureName: '',//生产企业
          aup2ProjectTypeId: '',//分类目录,
          managementType: '', // 管理类别
          auditStatus: 3, //审核状态,//1:待提交,2:待审核,3:审核中,4:审核通过,5:审核未通过
          page: 1,                   // 页码, 1
          size: 25,                  // 每页数据条数, 20
          total: 0,                   // 总条数
        },
        mainLoading: false,
        listData: [],
        multiSelect: [],
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 获得列表
      async getList() {
        let url = 'aup2mgr/api/project/findSubGroupMgrForPage'
        this.mainLoading = true
        let res = await this.post(url, this.param)
        this.mainLoading = false
        if (res.success) {
          this.listData = res.content.records
          this.param.total = res.content.total
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
          subGroupName: '', //组件名称,
          manufactureName: '',//生产企业
          aup2ProjectTypeId: '',//分类目录,
          managementType: '', // 管理类别
          auditStatus: 2, //审核状态,//1:待提交,2:待审核,3:审核中,4:审核通过,5:审核未通过
          page: 1,                   // 页码, 1
          size: 25,                  // 每页数据条数, 20
          total: 0,                   // 总条数
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
        this.$router.push(`/componentAuditIndex?id=${this.multiSelect[0].id}`)
      },
      // 到详情页
      toDetail(row) {
        this.$router.push(`/componentDetail?id=${row.id}`)
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

  .gird10 {
    width: 10%;
    padding: 5px;
    box-sizing: border-box;
  }
  .gird18 {
    width: 18%;
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