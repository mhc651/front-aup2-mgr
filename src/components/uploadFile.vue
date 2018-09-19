<template>
  <div>
    <el-upload
        class="upload-demo"
        action=""
        multiple
        :http-request="uploadToServer"
        :on-remove="removeFile"
        name="file"
        :file-list="filesList">
      <el-button size="small" type="primary">上传附件</el-button>
    </el-upload>

  </div>
</template>

<script>
  export default {
    name: 'upload-file',
    data() {
      return {}
    },
    props: {
      filesList: {
        type:Array,
        default: () =>[]
      }
    },
    methods: {
      // 移除文件
      removeFile(file) {
        this.filesList.map((item, index) => {
          if (item.info.id === file.info.id) {
            this.filesList.splice(index, 1)
            return
          }
        })
        // console.log("filesList",this.filesList)
      },

      // 上传文件
      async uploadToServer(e) {
        let file = e.file
        let res = await this.upload(file)
        if (res.success) {
          file.info = res.content
          this.filesList.push(file)
        } else {
          this.$message.error(res.errmsg)
        }
      }
    }
  }
</script>

<style scoped>

</style>