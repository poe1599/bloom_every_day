<template>
  <div class="products_wrapper">
    <div class="products_banner">
      <div class="products_banner_position">
        <div class="img_group">
          <img src="../../assets/img/products_banner.jpg" alt="" />
          <div class="img_cover"></div>
        </div>

        <div class="banner_text">
          <h2 class="text-primary banner_h2_pc">走進有花的日子裡</h2>
          <h3 class="text-primary banner_h3_mobile">走進有花的日子裡</h3>
        </div>
      </div>
    </div>

    <!-- loading -->
    <vue-loading v-model:active="isLoading" :is-full-page="fullPage" :opacity="1">
      <div class="loading_brand">
        <img src="../../assets/icon/bloomEveryDay.svg" alt="" />

        <div class="loading_flower">
          <img src="../../assets/icon/logo_flower.svg" alt="" />
        </div>
      </div>
    </vue-loading>

    <div class="container">
      <div class="products_menu">
        <ul class="products_menu_list">
          <li v-for="link in menuList" :key="link.category">
            <RouterLink
              :to="{ query: { page: '1', category: link.category } }"
              class="products_menu_item fs-6"
              >{{ link.text }}</RouterLink
            >
          </li>
        </ul>
      </div>

      <div class="products_group">
        <div class="row mx-auto">
          <div class="col-md-6 col-lg-4" v-for="product in products" :key="product.id">
            <RouterLink :to="`/products/${product.id}`" class="products_card">
              <div class="products_card_head">
                <div class="head_img">
                  <img class="img_hover" :src="product.imageUrl" alt="" />
                </div>
              </div>
              <div class="products_card_body">
                <h5 class="product_title">{{ product.title }}</h5>
                <div class="badge_group">
                  <h6 class="badge_item text-primary">{{ product.category }}</h6>
                </div>
                <div class="price_group">
                  <h6 class="product_origin_price">NT ${{ product.origin_price }}</h6>
                  <h6 class="product_price text-primary">NT ${{ product.price }}</h6>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Pagination :pages="page" @change-page="pageChange"></Pagination>
</template>

<style lang="scss" scoped>
/* loading start */

.loading_brand {
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 61, 51, 0.1);
  padding: 12px;
  border-radius: 8px;
  @media screen and (min-width: 576px) {
    width: 250px;
    text-align: center;
  }

  > img {
    width: 100%;
    height: auto;
    object-fit: cover;
    @media screen and (min-width: 576px) {
      width: 80%;
    }
  }
}

.loading_flower {
  position: absolute;
  top: -30px;
  left: 115px;
  z-index: -1;
  width: 50px;
  animation-name: rotating;
  animation-duration: 1.5s;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @media screen and (min-width: 576px) {
    left: 210px;
    width: 70px;
  }

  > img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}

@keyframes rotating {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

/* loading end */

.banner_h2_pc {
  display: none;
}

.products_banner_position {
  position: relative;
}

.img_group {
  width: 100%;
  height: 320px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.img_cover {
  background: rgba(245, 245, 245, 0.2);
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.banner_text {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 5px;
  white-space: nowrap;
}

.banner_h3_mobile {
  margin-bottom: 0;
}

/* products_menu 分類面版 */

.products_menu {
  text-align: center;
  background: white;
  margin: 20px 0;
}

a.products_menu_item {
  display: block;
  padding: 12px;
  color: #121212;
  cursor: pointer;

  &:hover {
    color: #ff3d33;
  }
}

/* products_group 卡片區 */
.products_group {
  padding: 60px 0;
}

.products_card {
  display: block;
  border: 1px solid #f2e7e8;
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 15px;
  color: #121212;

  &:hover {
    color: #121212;
  }
}

img.img_hover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease-in-out;

  &:hover {
    width: 120%;
    height: 120%;
  }
}

.product_title {
  margin: 0;
  padding: 12px 0;
}

.badge_group {
  padding: 12px 0;
}

.badge_item {
  width: 96px;
  padding: 5px;
  background: #f2e7e8;
}

.price_group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  > h6 {
    margin: 0;
  }
}

.product_origin_price {
  text-decoration: line-through;
}

.products_card {
  border: 1px solid #f2e7e8;
  background: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.head_img {
  position: relative;
  width: 100%;
  height: 330px;
  margin: auto;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.products_card_body {
  padding: 10px 0;
}

.product_title {
  padding: 0 0 10px 0;
}

.card_content {
  padding: 12px 0;
}

@media screen and (min-width: 576px) {
  .products_card {
    width: 500px;
    margin: 0 auto 30px auto;
  }

  .products_card_head {
    padding: 32px 0px;
  }

  .head_img {
    width: 420px;
    height: 430px;
  }

  .products_card_body {
    padding: 10px 30px;
  }
}

@media screen and (min-width: 768px) {
  .banner_text {
    padding: 10px;
  }

  .banner_h2_pc {
    display: block;
    margin-bottom: 0;
  }

  .banner_h3_mobile {
    display: none;
  }

  .products_menu_list {
    display: flex;
    justify-content: space-between;
    padding: 0 12px;
  }

  .products_menu_item {
    transition: all 0.2s ease-in-out;

    &:hover {
      background: #f2e7e8;
    }
  }

  .col-md-6 {
    margin-bottom: 30px;
  }

  .products_card {
    width: 100%;
    height: 100%;
    margin-bottom: 0;
  }

  .head_img {
    width: 100%;
  }

  .products_card_head {
    padding: 0;
  }

  .products_card_body {
    padding: 10px 0;
  }
}

@media screen and (min-width: 992px) {
  .products_card {
    padding: 20px;
  }

  .head_img {
    height: 230px;
    margin: 0;
  }

  h5.product_title {
    border: none;
    padding: 0;
    margin-bottom: 0;
  }
}

@media screen and (min-width: 1200px) {
  .head_img {
    height: 280px;
    margin: 0;
  }
}

@media screen and (min-width: 1400px) {
  .head_img {
    width: 360px;
    height: 280px;
    margin: 0;
  }
}
</style>

<script>
import Pagination from '../../components/PaginationComponent.vue'
import { RouterLink } from 'vue-router'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      products: [],
      page: {}, // 存入後台 pagination 的欄位資料
      isLoading: false,
      fullPage: true,
      menuList: [
        { category: '', text: '所有商品' },
        { category: '小型花束', text: '小型花束' },
        { category: '季節花束', text: '季節花束' },
        { category: '經典花束', text: '經典花束' },
        { category: '好日特選', text: '好日特選' }
      ]
    }
  },
  components: {
    RouterLink,
    Pagination
  },
  methods: {
    getProducts() {
      this.isLoading = true
      const { page = '1', category = '' } = this.$route.query
      this.$http
        .get(`${VITE_URL}v2/api/${VITE_PATH}/products/?page=${page}&category=${category}`)
        .then((res) => {
          this.products = res.data.products
          this.page = res.data.pagination //將後台 api 中取得的 pagination 欄位資料傳給 this.page
          this.isLoading = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    pageChange(page) {
      const { category = '' } = this.$route.query
      this.$router.push({ query: { page, category } })
    }
  },
  watch: {
    '$route.query': {
      handler() {
        this.getProducts()
      },
      immediate: true
    }
  }
}
</script>

