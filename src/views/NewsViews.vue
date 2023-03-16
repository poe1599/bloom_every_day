<template>
  <div class="wrapper">
    <div class="container">
      <div class="news_head">
        <h2 class="text-primary news_h2_pc">最新消息</h2>
        <h3 class="text-primary text-center news_h3_mobile">最新消息</h3>
      </div>

      <div class="deco"><img src="../assets/img/BgSec2.svg" alt="" /></div>

      <div class="news_body">
        <div class="row mx-auto">
          <div class="col-md-6 col-lg-12" v-for="article in articles" :key="article.id">
            <div class="news_card_group">
              <div class="news_card_head">
                <div class="news_img"><img :src="article.imageUrl" alt="" /></div>
              </div>
              <div class="news_card_body">
                <div class="card_title">
                  <h5 class="card_title_h5">{{ article.title }}</h5>
                  <div class="card_time caption">2023.02.01</div>
                </div>
                <div class="card_content">
                  {{ article.description }}
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
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      articles: []
    }
  },
  mounted() {
    this.$http.get(`${VITE_URL}v2/api/${VITE_PATH}/articles`).then((res) => {
      console.log(res.data.articles)
      this.articles = res.data.articles
    })
  }
}
</script>

<style>
.wrapper {
  padding: 0 0 120px 0;
  background: #f5f5f5;
}

.news_head {
  position: relative;
  z-index: 1;
  padding: 80px 0 40px 0;
}

.deco {
  position: absolute;
  top: 120px;
  right: 90px;
  height: 100px;
}

.deco img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  rotate: 15deg;
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
  width: 100%;
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

.card_detail a:hover {
  color: #ff3d33;
}

@media screen and (min-width: 576px) {
  .deco {
    right: 160px;
  }
  .news_card_group {
    width: 500px;
    margin: 0 auto 30px auto;
  }

  .news_card_head {
    padding: 40px 0px;
  }

  .news_img {
    width: 420px;
    height: 430px;
  }

  .news_card_body {
    padding: 10px 30px;
  }
}

@media screen and (min-width: 768px) {
  .col-md-6 {
    margin-bottom: 30px;
  }

  .deco {
    right: 260px;
  }

  .news_card_group {
    width: 100%;
    height: 100%;
    margin-bottom: 0;
  }

  .news_img {
    width: 100%;
  }

  .news_card_head {
    padding: 12px 0px;
  }

  .news_card_body {
    padding: 10px 0;
  }
}

@media screen and (min-width: 992px) {
  .news_h2_pc {
    display: block;
    padding: 0 12px;
  }
  .news_h3_mobile {
    display: none;
  }

  .deco {
    left: 160px;
    right: auto;
  }

  .news_card_group {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
  }

  .news_card_head {
    width: 40%;
  }

  .news_img {
    width: 288px;
    height: 230px;
    margin: 0;
  }

  .news_card_body {
    width: 60%;
  }

  .card_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ff3d33;
    padding: 0 0 10px 0;
  }

  h5.card_title_h5 {
    border: none;
    padding: 0;
    margin-bottom: 0;
  }

  .card_time.caption {
    align-self: flex-end;
  }
}

@media screen and (min-width: 1200px) {
  .deco {
    left: 200px;
  }
  .news_img {
    width: 380px;
    height: 280px;
    margin: 0;
  }
}

@media screen and (min-width: 1400px) {
  .deco {
    left: 240px;
  }
  .news_card_head {
    width: 38%;
  }

  .news_img {
    width: 360px;
    height: 280px;
    margin: 0;
  }

  .news_card_body {
    width: 58%;
  }
}

@media screen and (min-width: 1920px) {
  .deco {
    left: 320px;
  }
}
</style>
