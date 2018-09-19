<!-- 详情-审核日志 -->
<template>
  <div class="wrap">
    <el-table :data="listData" v-loading="mainLoading" style="width: 100%; margin-top: 20px">
      <el-table-column type="index" width="50" label="序号"> </el-table-column>
      <el-table-column prop="userName" label="操作人姓名"> </el-table-column>
      <!--<el-table-column prop="orgInfoName" label="操作人账号"> </el-table-column>-->
      <el-table-column prop="createTime" label="操作时间"> </el-table-column> <!-- 这个没有 -->
      <el-table-column prop="auditDesc" label="操作类型"> </el-table-column>
      <el-table-column prop="auditContent" label="说明"> </el-table-column>
      <el-table-column label="附件" width="300px">
        <template slot-scope="scope">
          <!--<p class="csp blue" style="margin: 0" v-for="(item ,i) in scope.row.auditFileList" :key="i" @click="toDownloadFile(item.url)">{{item.name}}</p>-->
          <a class="csp blue" style="margin: 0" v-for="(item ,i) in scope.row.auditFileList" download :key="i" :href="item.url">{{item.name}}</a>
        </template>
      </el-table-column>
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

  </div>
  
</template>

<script>
  export default {
    name: 'declare-log',
    props: {
      id: {
        default: ''
      }
    },
    data () {
      return {
        param: {
          page: 1,                   // 页码, 1
          size: 25,                  // 每页数据条数, 20
          total: 0,                   // 总条数
        },
        mainLoading: false,
        listData: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      async getList() {
        let req = {
          id: this.id
        }
        req = Object.assign({}, this.param, req)
        this.mainLoading = true
        let res = await this.post('aup2mgr/api/project/findProAuditLogForPage', req)
        this.mainLoading = false
        if (res.success) {
          this.listData = res.content.records
          this.param.total = res.content.total
        }
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
      // 下载
      toDownloadFile (url) {
        window.location.href = url
        // window.open(url)
      }
    }
  }
</script>

<style scoped>
  .wrap{
    min-height: calc( 100vh - 220px);
  }

</style>