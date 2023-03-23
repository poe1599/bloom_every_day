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
    <div class="container">
      <div class="products_menu">
        <ul class="products_menu_list">
          <li>
            <a href="" class="products_menu_item fs-6"
            @click.prevent="filterCategory('')"
            >所有商品</a>
            </li>
          <li>
            <a href="" class="products_menu_item fs-6"
            @click.prevent="filterCategory('小型花束')"
            >小型花束</a>
            </li>
          <li>
            <a href="" class="products_menu_item fs-6"
            @click.prevent="filterCategory('季節花束')"
            >季節花束</a>
            </li>
          <li>
            <a href="" class="products_menu_item fs-6"
            @click.prevent="filterCategory('經典花束')"
            >經典花束</a>
            </li>
          <li>
            <a href="" class="products_menu_item fs-6"
            @click.prevent="filterCategory('好日特選')"
            >好日特選</a>
            </li>
        </ul>
      </div>

      <div class="products_group">
        <div class="row mx-auto">
          <div class="col-md-6 col-lg-4" v-for="product in products" :key="product.id">
            <a href="" class="products_card">
              <div class="products_card_head">
                <div class="head_img"><img class="img_hover" :src="product.imageUrl" alt="" /></div>
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
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Pagination 
    :pages="page"
    @change-page="getProducts"
  ></Pagination>
  
</template>

<style>
.banner_h2_pc {
  display: none;
}

.products_banner_position {
  position: relative;
}

.img_group {
  width: 100%;
  height: 320px;
}

.img_group img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
}

.products_menu_item:hover {
  color: #ff3d33;
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
}

.products_card:hover {
  color: #121212;
}

.head_img {
  width: 100%;
  height: 240px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
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
}

img.img_hover:hover {
  width: 120%;
  height: 120%;
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
}

.price_group > h6 {
  margin: 0;
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
  width: 100%;
  height: 330px;
  margin: auto;
  border-radius: 8px;
  overflow: hidden;
}

.head_img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  }

  .products_menu_item:hover {
    background: #f2e7e8;
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

  .card_time.caption {
    align-self: flex-end;
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
//import { RouterLink } from 'vue-router'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      products: [],
      page:{}, // 存入後台 pagination 的欄位資料
      category:''
    }
  },
  components: {
    // RouterLink
    Pagination
  },
  methods: {
    getProducts(page=1, category) { 
      // 以參數控制當前要呈現第幾頁
      // 參數預設值為 1
      this.$http
        .get(`${VITE_URL}v2/api/${VITE_PATH}/products/?page=${page}/?category=${category}`)
        .then((res) => {
          //console.log('res',res)
          this.products = res.data.products
          this.page=res.data.pagination //將後台 api 中取得的 pagination 欄位資料傳給 this.page
          
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // filterCategory(category){
    //   if(category===''){
    //     //this.getProducts();
    //     console.log('全部')
    //   }else if(category==='小型花束'){
    //     this.category=category
    //     //console.log(this.category);
    //     this.getProducts();
    //   }

    // }
  },

  mounted() {
    this.getProducts()
  }
}
</script>

