<!--待审核-->
<template>
  <div class="wrap">
    <div class="filterWrap">

      <div class="gird25">
        <el-input v-model="param.registerCardNo" placeholder="注册证编号"></el-input>
      </div>

      <div class="gird25">
        <el-input v-model="param.productName" placeholder="产品名称"></el-input>
      </div>

      <div class="gird25">
        <el-input v-model="param.manufactureName" placeholder="生产企业/申报企业"></el-input>
      </div>

      <div class="gird25">
        <el-select v-model="param.aup2ProjectTypeId" placeholder="请选择分类目录" style="width: 100%;">
          <el-option v-for="(item, i) in productList" :key="i" :label="item.text" :value="item.code"> </el-option>
        </el-select>
      </div>

      <div class="gird25">
        <el-select v-model="param.managementType" placeholder="请选择管理类别" style="width: 100%;">
          <el-option v-for="(item, i) in managementTypeList" :key="i" :label="item.text" :value="item.code"> </el-option>
        </el-select>
      </div>

      <div class="gird25">
        <el-button type="primary" @click="filterRegistrationList">筛选</el-button>
        <el-button type="primary" @click="resetFilterForm">重置</el-button>
      </div>

    </div>

    <el-table
        :data="registrationList"
        @cell-click="gotoDetail"
        style="width: 100%; margin-top: 20px"
        @selection-change="handleSelectionChange">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="registerCardNo" label="注册证编号"></el-table-column>
      <el-table-column prop="registerCardName" label="注册证名称"></el-table-column>
      <el-table-column prop="origin" label="产地"></el-table-column>
      <el-table-column label="管理类别">
        <template  slot-scope="scope">
          {{renderManagementType(scope.row.managementType)}}
          <!--{{scope.row.managementType}}-->
        </template>
      </el-table-column>
      <el-table-column prop="productName" label="产品名称（中文）"></el-table-column>
      <el-table-column prop="groupSum" label="待审核组件总数"></el-table-column>
      <el-table-column prop="proSum" label="待审核单一规格总数"></el-table-column>
      <el-table-column prop="qualityName" label="质量层次"></el-table-column>
      <el-table-column prop="orgInfoName" label="申报企业"></el-table-column>
    </el-table>

    <el-pagination
        style="margin-top: 30px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="param.page"
        :page-sizes="[25, 50, 100, 500,1000]"
        :page-size="param.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="param.total">
    </el-pagination>


    <el-button type="primary" class="bottomButton" @click.native="audit" >审核</el-button>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        param: {
          registerCardNo: '',       // 注册证编号,
          productName: '',          // 产品名称,
          manufactureName: '',      // 生产企业
          orgInfoName: '',          // 申报企业,
          aup2ProjectTypeId: '',    // 产品分类,
          auditStatus: 2,           // 审核状态,//1:待提交,2:待审核,3:审核中,4:审核通过,5:审核未通过
          page: 1,                  // 页码-1
          size: 25,                 // 每页数据条数-20
          total: 0,                 // 总条数
        },

        registrationList: [],       // 列表
        registrationSelection: [],  // 选中的列表项
      }
    },
    props: {
      productList: {
        type: Array,
        default: []
      },
      managementTypeList: {
        type: Array,
        default: []
      }
    },
    methods: {
      // 回显 管理类别 数据
      renderManagementType (code) {
        return this.managementTypeList.find(item => item.code === code).text
      },

      // 列表多选
      handleSelectionChange(val) {
        this.registrationSelection = val;
      },

      // 重置过滤表单
      resetFilterForm() {
        this.param = {
          registerCardNo: '',       // 注册证编号,
          productName: '',          // 产品名称,
          manufactureName: '',      // 生产企业
          orgInfoName: '',          // 申报企业,
          aup2ProjectTypeId: '',    // 产品分类,
          auditStatus: 2,           // 审核状态,//1:待提交,2:待审核,3:审核中,4:审核通过,5:审核未通过
          page: 1,                  // 页码-1
          size: 25,                 // 每页数据条数-20
          total: 0,                 // 总条数
        }
        this.getRegistrationList()
      },

      // 审核
      audit(e) {
        if (this.registrationSelection.length === 0) {
          this.$message.error('您没有选中任何记录！')
          return
        }
        if (this.registrationSelection.length > 1) {
          this.$message.error('一次只能选择一条记录！')
          return
        }
      },

      // 初审
      auditInit() {
        let id = this.registrationSelection[0].id
        this.$router.push('/registrationAudit?id=' + id)
      },

      // 审核不通过后再审
      reaudit() {
        let id = this.registrationSelection[0].id
        this.$router.push('/registrationAudit?reaudit=1&id=' + id)
      },

      // 跳转去详情页
      gotoDetail(row, column) {
        if(column.type === 'selection') return
        this.$router.push('/registrationDetail?id=' + row.id)
      },

      // 分页条数切换
      handleSizeChange(val) {
        this.param.page = 1
        this.param.size = val
        this.getRegistrationList()
      },

      // 当前页切换
      handleCurrentChange(val) {
        this.param.page = val
        this.getRegistrationList()
      },

      // 根据条件过滤
      filterRegistrationList() {
        this.param.page = 1
        this.getRegistrationList()
      },

      // 获取注册证申报列表
      async getRegistrationList() {
        let url = 'aup2mgr/api/project/findRegisterMgrForPage'
        let res = await this.post(url, this.param)
        if (res.success) {
          this.registrationList = res.content.records
          this.param.total = res.content.total
        } else {
          this.$message.error(res.errmsg)
        }
        console.log("获取注册证申报列表", res)
      }
    },
    created() {
      this.getRegistrationList()
    },
  }
</script>
<style scoped>
  .filterWrap {
    display: flex;
    flex-wrap: wrap;
  }

  .gird25 {
    width: 25%;
    padding: 5px;
    box-sizing: border-box;
  }

  .gird40 {
    width: 40%;
    padding: 5px;
    box-sizing: border-box;
  }

  .bottomButton {
    width: 150px;
    margin-top: 30px;
  }

</style>