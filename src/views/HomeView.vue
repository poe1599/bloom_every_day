<template>
  <div class="wrapper">
    <section class="banner">
      <div class="container">
        <div class="banner_title">
          <h1 class="text-primary">
            用不凋的美感點綴生活
            <br />
            讓日日是好日
          </h1>
        </div>
        <button class="btn btn-primary banner_btn">
          走進有花的日子
          <i class="bi bi-chevron-right"></i>
        </button>

        <div class="banner_img"><img src="../assets/img/ImgSec1.png" alt="" /></div>
      </div>
    </section>
    <div class="bgSec1"><img src="../assets/img/BgSec1.svg" alt="" /></div>

    <section class="promote">
      <div class="container">
        <div class="row mx-auto">
          <div class="col-lg-6 promote_col_6">
            <div class="promote_img">
              <img src="../assets/img/ImgSec-pc-2-2.png" alt="" />
            </div>
          </div>
          <div class="col-lg-6 promote_text">
            <div class="promote_col_text">
              <h3 class="text-primary promote_col_h3">今天開始走入有花的日子裡...</h3>

              <p class="fs-5 promote_col_p">
                你已經看厭灰色城市的色調了嗎？
                <br />
                你渴望將自然的元素帶到你家嗎？
                <br />
                你是否無暇顧及住處環境、
                <br />
                卻又希望用一些美感妝點生活呢？
              </p>
              <div class="BgSec2"><img src="../assets/img/BgSec2.svg" alt="" /></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="intro">
      <div class="container">
        <div class="intro_text text-center">
          <h3 class="text-primary h3_mobile">我們是 日日是好日</h3>
          <h3 class="text-primary h3_mobile">讓我們用一朵花 一株草 一片葉 來打造你的新生活</h3>
          <h2 class="text-primary h2_pc">我們是 日日是好日</h2>
          <h2 class="text-primary h2_pc">
            讓我們用一朵花 一株草 一片葉
            <br />
            來打造你的新生活
          </h2>
        </div>
      </div>
    </section>

    <section class="about">
      <div class="container about_container">
        <div class="row mx-auto">
          <div class="col-lg-10">
            <div class="about_img">
              <img src="../assets/img/ImgSec4.png" alt="" />
            </div>
          </div>

          <div class="col-lg-6 about_col_6">
            <div class="about_text bg-bg-2">
              <h6 class="about_text_title_en">about us</h6>

              <div class="about_text_pc">
                <h2 class="text-primary about_text_title_ch">關於我們</h2>
                <div class="fs-5 py-2">
                  繁忙的都市生活裡，養花蒔草常受限於各種外在條件，想要用花草點綴生活中增加美感不該是一種奢望，日日是好日正是為此而誕生的。
                </div>
                <div class="fs-5 py-2">
                  我們提供的乾燥花商品比新鮮花草更易照顧，也更能延續美好的氛圍。
                </div>
                <div class="fs-5">請讓我們以一束不凋的花，為您的每一天帶來美好的氛圍。</div>
              </div>
              <div class="about_text_mobile">
                <h3 class="text-primary about_text_title_ch">關於我們</h3>
                <div class="fs-6 py-2">
                  繁忙的都市生活裡，養花蒔草常受限於各種外在條件，想要用花草點綴生活中增加美感不該是一種奢望，日日是好日正是為此而誕生的。
                </div>
                <div class="fs-6 py-2">
                  我們提供的乾燥花商品比新鮮花草更易照顧，也更能延續美好的氛圍。
                </div>
                <div class="fs-6">請讓我們以一束不凋的花，為您的每一天帶來美好的氛圍。</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section></section>
    <section></section>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  background: #f5f5f5;
  // position: relative;
  height: 665px;
}

.banner > .container {
  position: relative;
}

.banner_title {
  position: absolute;
  z-index: 1;
  top: 96px;
  white-space: nowrap;
}

.banner_title > h1 {
  font-size: 1.75rem;
  line-height: 2.125rem;
  margin-bottom: 0px;
}

.banner_img {
  width: 100%; //375px
  height: 500px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.banner_img > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner_btn {
  position: absolute;
  z-index: 1;
  padding: 1rem;
  font-size: 1rem;
  top: 212px;
  color: white;
}

.bgSec1 {
  position: absolute;
  width: 370px;
  height: 439px;
  left: -90px;
  top: 337px;
}

// promote section
.promote {
  background: #f5f5f5;
  padding: 0 0 72px 0;
}

// .promote_col_6 {
//   padding: 0;
// }

.promote_img {
  // padding: 0;
  margin-bottom: 72px;
}

.promote_img > img {
  width: 100%;
}

.promote_col_text {
  position: relative;
  // padding: 0 12px;
}

.promote_col_h3 {
  margin-bottom: 24px;
  z-index: 1;
}

.promote_col_p {
  z-index: 1;
}

.BgSec2 {
  position: absolute;
  top: -54px;
  right: -14px;
}

// intro section
.intro {
  padding: 24px 12px;
  background: url('../assets/img/ImgSec3.png') center center no-repeat;
}

.intro_text {
  border: 1px solid white;
  padding: 64px 12px;
}

.h2_pc {
  display: none;
}

// about section
.about {
  height: 780px;
  padding: 74px 0;
  background: #f5f5f5;
}

.about_container {
  position: relative;
}


.about_img {
  // margin: 0 0 0 -12px;
  position: absolute;
  width: calc(100% - 16px);
  height: 300px;
  left: -16px;
}

.about_img > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 0% 50%;
}

.about_text {
  position: absolute;
  width: calc(100% - 16px);
  padding: 24px 12px;
  border-radius: 8px 0px 0px 8px;
  top: 200px;
  left: 16px; // 等同於 right: 0px;
}

.about_text_title_en {
  text-transform: uppercase;
  margin-bottom: 12px;
}

.about_text_pc {
  display: none;
}

.about_text_title_ch_mobile {
  margin-bottom: 24px;
}

@media screen and (min-width: 576px) {
  // .promote_col_6{
  //   padding: 0 15px;
  // }
  .promote_col_text {
    padding: 0 20px;
  }
  .BgSec2 {
    top: -54px;
    right: 20px;
  }

  .about_img {
    width: calc(100% - 32px);
  }

  .about_text {
    padding: 24px 32px;
    width: calc(100% - 32px);
    right: 0;
    left: auto;
  }
}

@media screen and (min-width: 768px) {
  .banner_title,
  .banner_btn {
    left: 20px;
  }

  .banner_img {
    width: 70%;
    right: 0;
    left: auto;
  }

  .banner_title {
    // position: absolute;
    z-index: 1;
    top: 120px;
  }

  .bgSec1 {
    left: 108px;
    top: 269px;
  }

  .about_img {
    height: 400px;
}

.about_text {
    top: 250px;
    width: calc(100% - 200px);
}
}

@media screen and (min-width: 992px) {
  .banner {
    height: 852px;
  }

  .banner_title > h1 {
    font-size: 3rem;
    line-height: 3.6rem;
  }

  .banner_btn {
    // position: absolute;
    top: 324px;
    font-size: 1.125rem;
  }

  .bgSec1 {
    left: 136px;
    top: 376px;
  }

  .promote {
    padding: 0 0 120px 0;
  }

  .promote_img {
    padding: 0 15px;
    margin-bottom: 0;
  }

  .promote_text {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .promote_col_text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .h3_mobile {
    display: none;
  }
  .h2_pc {
    display: block;
  }

  .about {
    padding: 120px 0;
  }

  .about_img {
    left: 0;
    width: calc(100% - 250px);
}


.about_text {
    width: calc(100% - 350px);
}

  
}

@media screen and (min-width: 1200px) {
  .banner_img {
    width: 856px;
  }
  .bgSec1 {
    left: 294px;
    top: 355px;
  }

  .about {
  height: 912px;
  }

  .about_text_mobile {
    display: none;
  }
  .about_text_pc {
    display: block;
  }

  .about_text {
    width: calc(100% - 650px);
}
}
</style>

<script>
export default {}
</script>