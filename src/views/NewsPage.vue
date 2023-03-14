<template>
  <div class="wrapper">
    <div class="container">
      <div class="news_head">
        <h2 class="text-primary news_h2_pc">最新消息</h2>
        <h3 class="text-primary">最新消息</h3>
      </div>

      <div class="news_body">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    }
  },
  mounted() {
    this.$http.get('https://randomuser.me/api/').then((res) => {
      console.log(res)
      this.data = res.data.results[0]
    })
  }
}
</script>

<style>
.wrapper{
  background: #F5F5F5;
}
.news_h2_pc{
  display: none;
}
</style>
