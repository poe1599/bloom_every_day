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
    <div class="container"></div>
  </div>
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
</style>

<script>
//import { RouterLink } from 'vue-router'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      products: []
    }
  },
  components: {
    // RouterLink
  },

  mounted() {
    this.$http
      .get(`${VITE_URL}v2/api/${VITE_PATH}/products/all`)
      .then((res) => {
        //console.log(res);
        this.products = res.data.products
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

