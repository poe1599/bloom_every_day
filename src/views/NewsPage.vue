<template>
  <div class="wrapper">
    <div class="container">
      <div class="news_head">
        <h2 class="text-primary news_h2_pc">最新消息</h2>
        <h3 class="text-primary text-center">最新消息</h3>
      </div>

      <div class="news_body">
        <div class="row">
          <div class="col-lg-6">
            <div class="news_card_group">
          <div class="news_card_head">
            <div class="news_img"><img src="../assets/img/img_1.jpg" alt="" /></div>
          </div>
          <div class="news_card_body">
            <div class="card_title">
              <h5 class="card_title_h5">用桌上型迷你花束點綴你的辦公桌吧~</h5>
              <div class="card_time caption">2023.02.01</div>
            </div>
            <div class="card_content">
              覺得辦公桌上缺少賞心悅目的療癒小物嗎？快來挑選迷你花束，打造你的桌上花園吧！
            </div>

            <div class="card_detail text-end caption">
              <a href="" class="fs-6">more</a>
            </div>
          </div>
        </div>
          </div>

          <div class="col-lg-6">
            <div class="news_card_group">
          <div class="news_card_head">
            <div class="news_img"><img src="../assets/img/img_30.jpg" alt="" /></div>
          </div>
          <div class="news_card_body">
            <div class="card_title">
              <h5 class="card_title_h5">廣受好評的春回大地系列花束</h5>
              <div class="card_time caption">2023.02.01</div>
            </div>
            <div class="card_content">
              覺得辦公桌上缺少賞心悅目的療癒小物嗎？快來挑選迷你花束，打造你的桌上花園吧！
            </div>

            <div class="card_detail text-end caption">
              <a href="" class="fs-6">more</a>
            </div>
          </div>
        </div>
          </div>
        </div>
        
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
.wrapper {
  background: #f5f5f5;
}

.news_head {
  padding: 80px 0 15px 0;
}

.news_h2_pc {
  display: none;
}

.news_card_group {
  background: white;
  padding: 0 12px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.news_card_head {
  padding: 10px 0;
}

.news_img {
  width: 320px;
  height: 330px;
  margin: auto;
  border-radius: 8px;
  overflow: hidden;
}

.news_img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news_card_body {
  padding: 10px 0;
}

.card_title_h5 {
  border-bottom: 1px solid #ff3d33;
  padding: 0 0 10px 0;
}

.card_content {
  padding: 12px 0;
}

.card_detail a {
  cursor: pointer;
  color: #121212;
}

.card_detail a:hover{
  color: #FF3D33;
}


</style>
