<template>
  <div class="wrap">
    <i class="el-icon-success iconSuccess" v-if="!isNotPass" @click="auditPass"></i>
    <i class="el-icon-error iconError" v-if="!isPass" @click="auditNotPass"></i>

    <el-dialog title="审核意见" :visible.sync="ShowDialog">
      <div slot="title" class="tal">审核意见</div>
      <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="auditOpinion"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="auditCancel">取消</el-button>
        <el-button type="primary" @click="auditConfirm">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        ShowDialog: false,
        isPass:false,
        isNotPass:false,
        auditOpinion:'',
      }
    },
    props:{
      field:{
        type:String,
        default:''
      },
      audit:{
        type:Object,
        default:() => {}
      }
    },
    methods: {
      // 审核通过
      auditPass () {
        this.isPass = !this.isPass
      },
      // 审核不通过
      auditNotPass () {
        if(!this.isNotPass){
          this.ShowDialog = true
        } else {
          this.isNotPass = false
          this.audit[this.field] = null
        }
      },
      // 取消审核
      auditCancel () {
        this.isNotPass = false
        this.ShowDialog = false
        this.audit[this.field] = null
      },
      // 确认审核
      auditConfirm () {
        if(!this.auditOpinion.length) {
          this.$message.error("请输入审核意见！")
          return
        }
        this.isNotPass = true
        this.ShowDialog = false
        this.audit[this.field] = this.auditOpinion
      },
    },
    created() {
    },
  }
</script>
<style scoped>
  .iconSuccess {
    font-size: 20px;
    line-height: 20px;
    color: green;
    padding: 0 10px ;
  }
  .iconError{
    font-size: 20px;
    line-height: 20px;
    color: red;
    padding: 0 10px ;
  }
</style>