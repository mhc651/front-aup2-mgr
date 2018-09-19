<!--已取消-->
<template>
  <div class="wrap">
    <div class="filterWrap">

      <div class="gird20">
        <el-input v-model="param.orgInfoName" placeholder="企业名称"></el-input>
      </div>

      <div class="gird20">
        <el-input v-model="param.authorizedName" placeholder="授权人姓名"></el-input>
      </div>

      <div class="gird20">
        <el-input v-model="param.authorizedPhone" placeholder="手机号"></el-input>
      </div>

      <div class="gird40">
        <el-date-picker
            v-model="param.submitDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </div>

      <div class="gird20">
        <el-select v-model="param.projectType" placeholder="请选择企业类型" style="width: 100%;">
          <el-option label="生产企业" value="1"></el-option>
          <el-option label="医疗机构" value="2"></el-option>
        </el-select>
      </div>

      <div class="gird20">
        <el-button type="primary" @click="filterDeclareList">筛选</el-button>
        <el-button type="primary" @click="resetFilterForm">重置</el-button>
      </div>

    </div>

    <el-table
        :data="declareList"
        @cell-click="gotoDetail"
        style="width: 100%; margin-top: 20px"
        @selection-change="handleSelectionChange">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="orgInfoName" label="企业名称" width="250"></el-table-column>
      <el-table-column prop="authorizedName" label="被授权人姓名"></el-table-column>
      <el-table-column prop="authorizedPhone" label="手机号"></el-table-column>
      <el-table-column label="审核人">
        <template slot-scope="scope">
          {{ scope.row.acceptStatus === '1' ? '未分配':scope.row.acceptStatus }}
        </template>
      </el-table-column>
      <el-table-column prop="submitDate" label="审核时间" width="200"></el-table-column>
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

    <el-button type="primary" @click="withdraw" class="bottomButton">撤回重审</el-button>
    <!--<el-button type="primary" @click="disqualification" class="bottomButton">取消资格</el-button>-->

    <!--撤回审核-->
    <withdraw :id="currentId" v-model="showWithdrawDialog" url="aup2mgr/api/project/revokeOrgInfo" @success="getDeclareList"/>

    <el-dialog title="提示" :visible.sync="showDisqualificationDialog">
      <el-input type="textarea" rows="5" placeholder="请输入原因" v-model="disqualificationReason"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disqualificationCancel">取 消</el-button>
        <el-button type="primary" @click="disqualificationConfirm">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import withdraw from '@/components/withdraw'
  export default {
    components: {withdraw},
    data() {
      return {
        param: {
          orgInfoName: null,        // 企业名称,
          authorizedName: null,     // 被授权人姓名,
          authorizedPhone: null,    // 被授权人手机号,
          submitDate: null,         // 提交时间 数组,
          submitDate_start: null,   // 提交时间起,
          submitDate_end: null,     // 提交时间止,
          auditStatus: 6,           // 审核状态, 1:待提交,2:待审核,3:审核中,4:审核通过,5:审核未通过,6:已取消
          projectType: null,        // 企业类型,//1:生产企业,2:代理企业
          page: 1,                  // 页码, 1
          size: 25,                 // 每页数据条数, 20
          total: 0,                 // 总条数
        },

        declareList: [],            // 列表
        declareSelection: [],       // 选中的列表项

        currentId:'',               // 选中列表项的id
        showWithdrawDialog: false,  // 是否显示撤回对话框

        showDisqualificationDialog: false,  // 是否显示取消资格对话框
        disqualificationReason:'',          // 取消资格原因
      }
    },
    methods: {
      // 列表多选
      handleSelectionChange(val) {
        this.declareSelection = val;
      },
      // 重置过滤表单
      resetFilterForm() {
        this.param = {
          orgInfoName: null,        // 企业名称,
          authorizedName: null,     // 被授权人姓名,
          authorizedPhone: null,    // 被授权人手机号,
          submitDate: null,         // 提交时间 数组,
          submitDate_start: null,   // 提交时间起,
          submitDate_end: null,     // 提交时间止,
          auditStatus: 6,           // 审核状态, 1:待提交,2:待审核,3:审核中,4:审核通过,5:审核未通过,6:已取消
          projectType: null,        // 企业类型,//1:生产企业,2:代理企业
          page: 1,                  // 页码, 1
          size: 25,                 // 每页数据条数, 20
          total: 0,                 // 总条数
        }
        this.getDeclareList()
      },
      // 撤回审核
      withdraw() {
        if (this.declareSelection.length === 0) {
          this.$message.error('您没有选中任何记录！')
          return
        }
        if (this.declareSelection.length > 1) {
          this.$message.error('一次只能选择一条记录！')
          return
        }
        this.currentId = this.declareSelection[0].id
        this.showWithdrawDialog = true
      },

      // 取消资格
      disqualification() {
        if (this.declareSelection.length === 0) {
          this.$message.error('您没有选中任何记录！')
          return
        }
        if (this.declareSelection.length > 1) {
          this.$message.error('一次只能选择一条记录！')
          return
        }
        this.showDisqualificationDialog = true
      },
      // 取消 取消资格
      disqualificationCancel() {
        this.showDisqualificationDialog = false
      },
      // 确认 取消资格
      disqualificationConfirm() {
        this.showDisqualificationDialog = false
      },

      // 跳转去详情页
      gotoDetail(row, column) {
        if(column.type === 'selection') return
        this.$router.push('/enterpriseDeclareDetail?id=' + row.id)
      },
      // 分页条数切换
      handleSizeChange(val) {
        this.param.page = 1
        this.param.size = val
        this.getDeclareList()
      },
      // 当前页切换
      handleCurrentChange(val) {
        this.param.page = val
        this.getDeclareList()
      },
      // 根据条件过滤
      filterDeclareList() {
        this.param.page = 1
        this.getDeclareList()
      },
      // 获取申报列表
      async getDeclareList() {
        let url = 'aup2mgr/api/project/findOrgInfoApplyForPage'
        this.param.submitDate = this.param.submitDate || []
        if (this.param.submitDate.length) {
          this.param.submitDate_start = this.miment(this.param.submitDate[0]).format("YYYY-MM-DD")
          this.param.submitDate_end = this.miment(this.param.submitDate[1]).format("YYYY-MM-DD")
        }
        let res = await this.post(url, this.param)
        if (res.success) {
          this.declareList = res.content.records
          this.param.total = res.content.total
        } else {
          this.$message.error(res.errmsg)
        }
        // console.log("获取申报列表", res)
      }
    },
    created() {
      this.getDeclareList()
    },
  }
</script>
<style scoped>
  .filterWrap {
    display: flex;
    flex-wrap: wrap;
  }

  .gird20 {
    width: 20%;
    padding: 5px;
    box-sizing: border-box;
  }

  .gird40 {
    width: 40%;
    padding: 5px;
    box-sizing: border-box;
  }

  .btnReview {
    width: 150px;
    margin-top: 30px;
  }

  .bottomButton {
    width: 150px;
    margin-top: 30px;
  }
</style>