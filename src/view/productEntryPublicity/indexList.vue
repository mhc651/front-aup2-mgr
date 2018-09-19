<!-- 产品入围公示 首页 -->
<template>
  <div class="wrap">
    <div class="title">产品入围公示</div>
    <div class="contentWrap">
      <div class="filterWrap">

        <div class="gird20">
          <el-input v-model="param.registerCardNo" placeholder="注册证编号"> </el-input>
        </div>

        <div class="gird20">
          <el-input v-model="param.name" placeholder="产品名称"> </el-input>
        </div>

        <div class="gird20">
          <el-input v-model="param.manufactureName" placeholder="生产企业"> </el-input>
        </div>
        <div class="gird20">
          <el-input v-model="param.orgName" placeholder="申报企业"> </el-input>
        </div>

        <div class="gird20">
          <el-input v-model="param.standardOrModel" placeholder="规格/型号"> </el-input>
        </div>

        <div class="gird20">
          <el-select v-model="param.projectType" placeholder="请选择企业类型" style="width: 100%;">
            <el-option label="生产企业" :value="2"> </el-option>
            <el-option label="代理企业" :value="1"> </el-option>
          </el-select>
        </div>


        <div class="gird20">
          <el-select v-model="param.projectTypeId" placeholder="请选择分类目录" style="width: 100%;" @change="toGetGroupList">
            <el-option v-for="(item, i) in productList" :key="i" :label="item.text" :value="item.code"> </el-option>
          </el-select>
        </div>

        <div class="gird20">
          <el-select v-model="param.projectTypeGroupId" placeholder="请选择竞价分组" style="width: 100%;">
            <el-option v-for="(item, i) in groupList" :key="i" :label="item.text" :value="item.code"> </el-option>
          </el-select>
        </div>

        <div class="gird20">
          <el-select v-model="param.publicityStatus" placeholder="请选择公示状态" style="width: 100%;">
            <el-option label="未公示" :value="1"> </el-option>
            <el-option label="已公示" :value="2"> </el-option>
          </el-select>
        </div>

        <div class="gird20">
          <el-button type="primary" @click="toSearch">筛选</el-button>
          <el-button type="primary" @click="toClearForm">重置</el-button>
        </div>

      </div>
      <el-table :data="listData" style="width: 100%; margin-top: 20px" v-loading="mainLoading"  @selection-change="handleSelectionChange">
        <el-table-column type="index" width="50" label="序号"> </el-table-column>
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column prop="productName" label="产品名称"> </el-table-column>
        <el-table-column prop="authorizedName" label="生产企业"> </el-table-column> <!-- 没有 -->
        <el-table-column prop="registerCardNo" label="注册证编号"> </el-table-column>
        <el-table-column prop="subGroupName" label="组件名称"> </el-table-column>
        <el-table-column prop="standard" label="规格"> </el-table-column>
        <el-table-column prop="model" label="型号"> </el-table-column>
        <el-table-column prop="projectTypeGroupName" label="分组"> </el-table-column>
        <el-table-column prop="qualityName" label="质量层次"> </el-table-column>
        <el-table-column prop="submitDate" label="公示状态" width="150"> </el-table-column> <!-- 没有 -->
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
      <el-button type="primary" class="btnReview">公选所选</el-button>
      <el-button type="primary" class="btnReview">全部公选</el-button>
    </div>

  </div>
  
</template>

<script>
  export default {
    name: 'index-list',
    data () {
      return {
        param: {
          registerCardNo: '', //注册证编号,
          name: '', //产品名称,
          manufactureName: '', //生产企业名称,
          orgName: '', //报名企业名称,
          subGroupName: '', //组件名称,
          standardOrModel: '', //规格/型号,
          projectType: '', //企业类型,  （生产企业，代理企业）
          projectTypeId: '', //项目产品类别表Id,
          projectTypeGroupId: '', //竞价组Id,
          publicityStatus: '', //是否公示   1:未公示,2:已公示
          page: 1,                   // 页码, 1
          size: 25,                  // 每页数据条数, 20
          total: 0,                   // 总条数
        },
        multiSelect: [],
        listData: [],
        productList: [], // 产品分类列表
        groupList: [], // 竞价分组
        mainLoading: false
      }
    },
    created() {
      this.getList()
      this.getProductList()
    },
    methods: {
      // 获得列表
      async getList() {
        this.mainLoading = true
        let res = await this.post('aup2mgr/api/projectProduct/pagePublicData', this.param)
        this.mainLoading = false
        if (res.success) {
          this.listData = res.content.records
          this.param.total = res.content.total
        }
      },
      // 获得产品分类
      async getProductList() {
        let url = 'aup2mgr/api/codeItem/projectType'
        let res = await this.post(url, {})
        if (res.success) {
          this.productList = res.content
          // for (let key in res.content.auctionGroup) {
          //   this.productList.push({
          //     id: Number(key),
          //     value: res.content.auctionGroup[key]
          //   })
          // }
        }
      },
      // 通过分类id 获得竞价分组列表
      async toGetGroupList(typeId) {
        let res = await this.post('aup2mgr/api/codeItem/projectTypeGroup', {typeId})
        if (res.success) {
          this.groupList = res.content
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
          registerCardNo: '', //注册证编号,
          name: '', //产品名称,
          manufactureName: '', //生产企业名称,
          orgName: '', //报名企业名称,
          subGroupName: '', //组件名称,
          standardOrModel: '', //规格/型号,
          projectType: '', //企业类型,  （生产企业，代理企业）
          projectTypeId: '', //项目产品类别表Id,
          projectTypeGroupId: '', //竞价组Id,
          publicityStatus: '', //是否公示   1:未公示,2:已公示
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
      }
    }
  }
</script>

<style scoped>
  .title {
    height: 49px;
    line-height: 49px;
    border-bottom: 1px solid #e6e6e6;
  }
  .contentWrap {
    min-height: calc(100vh - 120px);
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #dcdfe6;
    padding: 15px 15px 30px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
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

  .gird40 {
    width: 40%;
    padding: 5px;
    box-sizing: border-box;
  }

  .btnReview {
    width: 150px;
    margin-top: 30px;
  }

</style>