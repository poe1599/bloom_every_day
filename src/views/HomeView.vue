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
        <div class="row">
          <div class="col-lg-6 promote_img">
            <img src="../assets/img/ImgSec2-2.png" alt="" />
          </div>
          <div class="col-lg-6 promote_text">
            <div class="promote_col_text">
              <h3 class="text-primary promote_col_h3">今天開始走入有花的日子裡...</h3>

              <p class="fs-5">
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
    <section></section>
    <section></section>
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
}

.BgSec2 {
  position: absolute;
  top: -54px;
  right: -14px;
}

@media screen and (min-width: 576px) {
  .promote_col_text {
    padding: 0 20px;
  }
  .BgSec2 {
    top: -54px;
    right: 20px;
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

  .promote_img {
    margin-bottom: 0;
  }

  .promote_text {
    display: flex;
    align-items: center;
  }

  .promote_col_text {
    display: flex;
    flex-direction: column;
    align-items: center;
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
}
</style>

<script>
export default {}
</script>