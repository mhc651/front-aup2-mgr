<template>
  <el-dialog title="提示" :visible="value" @close="withdrawCancel">
    <el-input type="textarea" rows="5" placeholder="请输入原因" v-model="revokeOpinion"></el-input>
    <uploadFile :filesList="filesList" class="mt20"/>
    <div slot="footer" class="dialog-footer">
      <el-button @click="withdrawCancel">取 消</el-button>
      <el-button type="primary" @click="withdrawConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import uploadFile from './uploadFile'

  export default {
    components: {uploadFile},
    data() {
      return {
        revokeOpinion: '',   // 撤回理由
        filesList: []        // 文件列表
      }
    },
    props: {
      value: false,
      id: {
        type: String,
        default: ''
      },
      url: {
        type: String,
        default: ''
      }
    },
    methods: {

      // 提取文件的id,并拼接成字符串
      getIds() {
        let ids = []
        this.filesList.map(item => {
          ids.push(item.info.id)
        })
        return ids.join(',')
      },

      // 取消撤回
      withdrawCancel() {
        this.$emit('input', false)
      },

      // 确认撤回
      async withdrawConfirm() {
        if(!this.revokeOpinion.length) {
          this.$message.error('请输入撤回原因！')
          return
        }

        let body = {
          id: this.id,
          revokeOpinion: this.revokeOpinion,
          fileIds: this.getIds(),
        }
        let res = await this.post(this.url,body)

        if(res.success) {
          this.$message.success("撤回成功!")
          this.$emit('input', false)
          this.$emit('success')
        } else {
          this.$message.error(res.errmsg)
        }
      },
    }
  }
</script>

<style scoped>

</style>