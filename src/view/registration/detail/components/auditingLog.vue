<!--审计日志-->
<template>
  <div class="wrap">

    <!--主表-->
    <el-table
        :data="auditingLogList"
        style="width: 100%; margin-top: 20px"
        @selection-change="handleSelectionChange">
      <el-table-column type="index" width="50" label="序号"> </el-table-column>
      <el-table-column prop="userName" label="操作人姓名"> </el-table-column>
      <!--<el-table-column prop="userId" label="操作人账号"> </el-table-column>-->
      <el-table-column prop="createTime" label="操作时间"> </el-table-column>
      <el-table-column prop="auditDesc" label="操作类型"> </el-table-column>
      <el-table-column prop="auditContent" label="说明"></el-table-column>
      <el-table-column prop="auditContent" label="说明"></el-table-column>
      <el-table-column label="附件" width="300px">
        <template slot-scope="scope">
          <a class="csp blue" style="margin: 0" v-for="(item ,i) in scope.row.auditFileList" download :key="i" :href="item.url">{{item.name}}</a>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
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

  </div>
</template>
<script>
  export default {
    data() {
      return {
        param: {
          id: null,             // 企业名称,
          page: 1,              // 页码, 1
          size: 25,             // 每页数据条数, 20
          total: 0,             // 总条数
        },
        auditingLogList: [],     // 列表
      }
    },
    props:{
      id:{
        type:String,
        default:''
      }
    },
    methods: {
      // 列表多选
      handleSelectionChange(val) {
        this.declareSelection = val;
      },
      // 分页条数切换
      handleSizeChange(val) {
        this.param.page = 1
        this.param.size = val
        this.getAuditingLogList()
      },
      // 当前页切换
      handleCurrentChange(val) {
        this.param.page = val
        this.getAuditingLogList()
      },
      // 获取审计日志列表
      async getAuditingLogList() {
        this.param.id = this.id
        let url = 'aup2mgr/api/project/findRegisterAuditLogForPage'
        let res = await this.post(url, this.param)
        if (res.success) {
          this.auditingLogList = res.content.records
          this.param.total = res.content.total
        } else {
          this.$message.error(res.errmsg)
        }
        console.log("获取审计日志列表", res)
      }
    },
    created() {
      // 获取审计日志列表
      this.getAuditingLogList()
    },
  }
</script>
<style scoped>
</style>