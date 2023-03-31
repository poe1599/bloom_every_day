<template>
  <div class="cart_wrapper">
    <div class="container">
      <div class="step_group">
        <div class="step_item active">
          <div class="caption">訂單資訊</div>
        </div>
        <div class="step_item">
          <div class="caption">填寫資訊</div>
        </div>
        <div class="step_item">
          <div class="caption">完成訂單</div>
        </div>
      </div>

      <h5 class="cart_h5 bg-bg-2">訂單資訊</h5>
      <div class="cart_table">
        <table class="table">
          <tr class="d-none d-md-flex cart_table_title">
            <td class="col-5">商品資訊</td>
            <td class="col-2">單價</td>
            <td class="col-2">數量</td>
            <td class="col-2">小計</td>
            <td class="col-1">刪除</td>
          </tr>
          <tr class="row mx-auto order_control">
            <!-- 塞資料 -->
            <td class="col-10 col-md-5">
              <div class="cart_product_info">
                <div class="cart_product_img">
                  <img src="../../assets/img/img_11.jpg" alt="" />
                </div>
                <h6 class="cart_product_title">一隅花語</h6>
              </div>
            </td>
            <td class="col-5 col-md-2 order_4 order_md_0 cart_product_price">
              <div>NT $1050</div>
            </td>
            <td class="col-12 col-md-2 order_3 order_md_0 cart_select">
              <select name="" id="" class="form-select">
                <option :value="i" v-for="i in 5" :key="`${i}1235`">
                  {{ i }}
                </option>
              </select>
            </td>
            <td class="col-7 col-md-2 order_4 order_md_0">
              <div class="cart_subtotal">
                <span class="d-md-none cart_span">小計：</span>
                NT $1050
              </div>
            </td>
            <td class="col-2 col-md-1 order_2 order_md_0 cart_delete">
              <i class="bi bi-trash3"></i>
            </td>
          </tr>
          
          <tr>
            <div class="cart_count">
              <div class="cart_total_text">總計：</div>
              <div class="cart_total_price">NT $1050</div>
            </div>
          </tr>
        </table>
        <div class="d-flex justify-content-between py-4 mb-3">
        <a href="" class="btn btn-outline-neutral cart_btn">繼續購物</a>
        <a href="" class="btn btn-outline-neutral cart_btn">下一步</a>
      </div>
      </div>

      
    </div>
  </div>
</template>

<style lang="scss" scoped>
.step_group {
  display: flex;
  justify-content: space-between;
  padding: 60px 15px;
}

.step_item {
  width: 25%;
  padding: 6px 8px;
  white-space: nowrap;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid #f2e7e8;
}

.step_item.active {
  background: #f2e7e8;
}

.step_item::after {
  content: '';
  display: block;
  width: 44px;
  height: 1px;
  background: #f2e7e8; //#f2e7e8
  position: absolute;
  right: -44px;
}

.step_item:last-child::after {
  content: none;
}

/* table */
table.table {
  background: #f5f5f5;
}

.table,
tr,
td {
  border: none;
}

.cart_h5 {
  padding: 12px;
  margin: 0;
  border-bottom: 2px solid white;
}

.cart_product_info {
  display: flex;
  align-items: center;
}

.cart_product_img {
  width: 143px;
  height: auto;
  object-fit: cover;
  padding: 0 10px 0 0;
}

.cart_product_img > img {
  width: 100%;
}

.cart_product_title {
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
}

.form-select {
  color: #121212;
  border: 1px solid #808080;
}

.form-select:focus {
  border-color: #808080;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(128, 128, 128, 0.25);
}

.cart_select {
  padding: 12px;
}

.cart_span {
  display: block;
}

/* table order */
.order_control {
  display: flex;
  padding: 20px 0;
  border-bottom: 2px solid white;
}
.order_2 {
  order: 2;
}

.order_3 {
  order: 3;
}

.order_4 {
  order: 4;
}

.order_5 {
  order: 5;
}

.cart_delete {
  align-self: center;
  text-align: center;
  font-size: 16px;
  justify-content: center;
}

.cart_product_price {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart_count {
    padding: 12px 15px;
    display: flex;
    justify-content: end;
}


.cart_count>.cart_total_text {
    padding: 10px 0;
}

.cart_btn{
  color: #121212;
}

.cart_btn:hover {
  background:#ff3d33;
  border: 1px solid white;
  color: white;
}

@media screen and (min-width: 576px) {
  .step_item {
    width: 30%;
  }

  .step_item::after {
    width: 27px;
    right: -28px;
  }

  .cart_h5 {
    margin: 12px 15px 0 15px;
  }

  .cart_table {
    margin: auto 15px;
  }

  .cart_product_img {
    width: 50%;
  }

  .cart_product_price {
    justify-content: start;
  }

  .cart_subtotal {
    text-align: right;
}

  .cart_span {
    display: inline;
  }

  .cart_count{  
    justify-content: space-between;
}
}

@media screen and (min-width: 768px) {
  .step_group {
    justify-content: space-around;
  }

  .step_item {
    width: 150px;
  }

  .step_item::after {
    width: 95px;
    right: -96px;
  }

  .d-md-flex {
    display: flex;
  }

  .order_md_0 {
    order: 0;
  }

  .table > tr > td {
    padding: 0;
  }

  .cart_table_title {
    padding: 12px 10px;
    border-bottom: 2px solid white;
    text-align: center;
  }

  .order_control {
    align-items: center;
  }

  i.bi.bi-trash3 {
    font-size: 20px;
  }
}

@media screen and (min-width: 992px) {
  .step_group {
    max-width: 768px;
    margin: auto;
  }

  .step_item {
    padding: 12px 24px;
  }

  .cart_product_info {
    padding: 0 15px;
  }

  .cart_product_img {
    padding: 0;
  }

  .cart_table {
    padding: 0 0 40px 0;
}
}
</style>


<script>
// import { RouterLink } from 'vue-router'
// const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data() {
    return {}
  },
  components: {
    // RouterLink
  },
  methods: {},
  mounted() {}
}
</script>