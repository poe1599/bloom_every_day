<template>
  <div class="inner_news_wrapper">
    <div class="container">
      <div class="news_body">
        <div class="row mx-auto">
          <div class="col-md-10 col-lg-8 mx-auto">
            <div class="inner_card_group">
              <div class="inner_card_head">
                <div class="inner_news_img"><img src="../assets/img/img_30.jpg" alt="" /></div>
              </div>
              <div class="inner_card_body">
                <div class="inner_card_title">
                  <h5 class="inner_card_title_h5">廣受好評的春回大地系列花束</h5>
                  <div class="inner_sub_info">
                    <div class="inner_card_time caption">2023.02.01</div>
                    <small class="inner_author caption text-neutral">好日小編</small>
                  </div>
                </div>
                <div class="inner_card_content">
                  <!-- 放item.content -->
                  當春天來臨，精美的花卉和草本植物開始盛開，這是保存這些美麗的春季花草，成為精美的乾燥花束的最佳時機。在這個花束中，我們精選了數種春季花草，包括白繡球花、迷你玫瑰和馬鞭草。
                  白繡球花是一種受歡迎的花卉，具有經典的白色花朵，潔白無瑕。迷你玫瑰是一種小巧玲瓏的玫瑰花，花朵色彩豐富，多樣化，可以為花束帶來更多元化的風格。馬鞭草，也被稱為峨眉山馬鞭草，是一種美麗的花卉，具有深紫色的花朵和帶有香氣的葉子。
                  這些乾燥花束不僅美麗，而且可以用於多種場合，例如婚禮、派對、節日慶祝和家居裝飾。無論您想要在哪裡展示這些乾燥花束，它們都會為您帶來舒適的氛圍和美好的回憶，快來把春天帶回家吧！
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

  .inner_sub_info{
    display: flex;
  }

  .inner_card_time::after{
    content:'/';
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
export default {}
</script>