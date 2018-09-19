<template>
  <div class="wrap">
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      // 获取id
      async getId() {
        let url = 'aup2mgr/api/project/findProjectManageByOrgIdForPage'
        let data = {
          page: 1,
          size: 20,
        }
        let res = await this.postWithOldToken(url,data)
        if(res.success) {
          let id = res.content.records[0].id
          this.getToken(id)
        }
        // console.log(res)
      },
      // 获取token
      async getToken (id) {
        let url = 'portal/api/auth/tokenAddApiData'
        let data = {"apiData":id}
        console.log('轻巧参数',data)
        let res = await this.postWithOldToken(url,data)
        if(res.success) {
          localStorage.setItem('accesstoken',res.content)
          console.log('获取token',res)
        }
      }
    },
    created() {
      this.getId()
    },
  }
</script>
<style scoped>
</style>