<template>
  <div class="inner_news_wrapper">
    <div class="container">
      <div class="news_body">
        <div class="row mx-auto">
          <div class="col-md-10 col-lg-8 mx-auto">
            <div class="inner_card_group">
              <div class="inner_card_head">
                <div class="inner_news_img"><img :src="perNews.imageUrl
" alt="" /></div>
              </div>
              <div class="inner_card_body">
                <div class="inner_card_title">
                  <h5 class="inner_card_title_h5">{{perNews.title}}</h5>
                  <div class="inner_sub_info">
                    <div class="inner_card_time caption">{{perNews.create_at}}</div>
                    <small class="inner_author caption text-neutral">{{perNews.author}}</small>
                  </div>
                </div>
                <div v-html="perNews.content" class="inner_card_content">
                 
                </div>

                <div class="inner_back text-end caption">
                  <RouterLink to="/news" class="fs-6">back</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.inner_news_wrapper {
  background: #f5f5f5;
  padding: 40px 0;
}
.inner_card_group {
  background: white;
  padding: 0 12px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.inner_card_head {
  padding: 10px 0;
}

.inner_news_img {
  width: 100%;
  height: 330px;
  margin: auto;
  border-radius: 8px;
  overflow: hidden;
}

.inner_news_img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.inner_card_body {
  padding: 10px 0;
}

.inner_card_title_h5 {
  border-bottom: 1px solid #ff3d33;
  padding: 0 0 10px 0;
}

.inner_card_content {
  padding: 12px 0;
}

.inner_back a {
  cursor: pointer;
  color: #121212;
}

.inner_back a:hover {
  color: #ff3d33;
}

@media screen and (min-width: 576px) {
  .inner_card_group {
    width: 500px;
    margin: 0 auto 30px auto;
  }

  .inner_card_head {
    padding: 40px 0px;
  }

  .inner_news_img {
    width: 420px;
    height: 430px;
  }

  .inner_card_body {
    padding: 10px 30px;
  }
}

@media screen and (min-width: 768px) {
  .col-md-6 {
    margin-bottom: 30px;
  }

  .inner_card_group {
    width: 100%;
    height: 100%;
    margin-bottom: 0;
  }

  .inner_news_img {
    width: 100%;
  }

  .inner_card_head {
    padding: 12px 0px;
  }

  .inner_card_body {
    padding: 10px 0;
  }
}

@media screen and (min-width: 992px) {
  .inner_card_group {
    padding: 0 20px;
  }

  .inner_news_img {
    margin: 0;
  }

  h5.inner_card_title_h5 {
    border-bottom: 1px solid #ff3d34;
    padding: 0 0 12px 0;
    margin-bottom: 10px;
  }

  .inner_sub_info {
    display: flex;
  }

  .inner_card_time::after {
    content: '/';
    margin-left: 16px;
    margin-right: 16px;
  }
}

// @media screen and (min-width: 1200px) {
//   // .inner_news_img {
//   //   width: 380px;
//   //   height: 280px;
//   //   margin: 0;
//   // }
// }

// @media screen and (min-width: 1400px) {
//   .inner_card_head {
//     width: 38%;
//   }

//   .inner_news_img {
//     width: 360px;
//     height: 280px;
//     margin: 0;
//   }

//   .inner_card_body {
//     width: 58%;
//   }
// }
</style>

<script>
import { RouterLink } from 'vue-router'
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data() {
    return {
      perNews:{}
    }
  },
  components: {
    RouterLink
  },
  methods: {
    // 取得 id
    getDetail() {
      const{id}=this.$route.params
      console.log('id',id)
      this.$http
        .get(`${VITE_URL}/api/${VITE_PATH}/article/${id}`)
        .then((res) => {
          console.log('res',res.data.article)
          this.perNews=res.data.article
        })
        .catch((err) => {
          console.log(err.data.message)
        })
    }
  },
  mounted() {
    this.getDetail();
  }
}
</script>