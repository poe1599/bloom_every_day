<template>
  <div class="cart_check_wrapper">
    <div class="container">
      <div class="step_group">
        <div class="step_item">
          <div class="caption">訂單資訊</div>
        </div>
        <div class="step_item">
          <div class="caption">填寫資訊</div>
        </div>
        <div class="step_item active">
          <div class="caption">完成訂單</div>
        </div>
      </div>
      <div class="row mx-auto">
        <div class="order_info col-lg-5">
          <h5 class="cart_h5 bg-bg-2">
            訂單明細
            <span class="caption text-primary">(未付款)</span>
            <span class="caption">(已付款)</span>
          </h5>

          <div class="cart_table">
            <table class="table">
              <tr class="row mx-auto d-md-flex cart_table_title">
                <td class="col-7 col-sm-6">商品資訊</td>
                <td class="col-2 col-sm-2">數量</td>
                <td class="col-3 col-sm-4">小計</td>
              </tr>

              <tr class="row mx-auto order_control" v-for="item in orderInfo.products" :key="item.id">
                <td class="col-7 col-sm-6">
                  <div class="cart_product_info">
                    <div class="cart_product_img">
                      <img :src="item.product.imageUrl" alt="" />
                    </div>
                    <h6 class="cart_product_title">{{ item.product.title }}</h6>
                  </div>
                </td>

                <td class="col-2 col-sm-2 order_2 order_md_0 selected_qty">
                  <div>{{ item.qty }}</div>
                </td>
                <td class="col-3 col-sm-4 order_2 order_md_0 selected_subtotal">
                  <div>NT ${{ item.product.price }}</div>
                </td>
              </tr>

              <tr>
                <div class="cart_count">
                  <div class="cart_total_text">總計：</div>
                  <div class="cart_total_price">NT ${{orderInfo.total}}</div>
                </div>
              </tr>
            </table>
          </div>
        </div>

        <div class="buyer_form col-lg-7">
          <h5 class="cart_h5 bg-bg-2">訂單資訊</h5>
          <table class="table">
            <tr class="row mx-auto">
              <td class="col-5">訂單金額</td>
              <td class="col-7">
                <span class="text-primary"> NT ${{ orderInfo.total }} </span>
              </td>
            </tr>
            <tr class="row mx-auto">
              <td class="col-5">訂單編號</td>
              <td class="col-7" style="word-break: break-word">{{ orderInfo.id }}</td>
            </tr>

            <tr class="row mx-auto">
              <td class="col-5">訂購時間</td>
              <td class="col-7"></td>
            </tr>

            <tr class="row mx-auto">
              <td class="col-5">收件人姓名</td>
              <td class="col-7">{{orderInfo.user.name}}</td>
            </tr>
            <tr class="row mx-auto">
              <td class="col-5">電話</td>
              <td class="col-7">{{orderInfo.user.tel}}</td>
            </tr>
            <tr class="row mx-auto">
              <td class="col-5">信箱</td>
              <td class="col-7">{{orderInfo.user.email}}</td>
            </tr>
            <tr class="row mx-auto">
              <td class="col-5">地址</td>
              <td class="col-7">{{orderInfo.user.address}}</td>
            </tr>

            <tr class="row mx-auto">
              <td class="col-5">備註</td>
              <td class="col-7">{{orderInfo.message}}</td>
            </tr>
          </table>
        </div>

        <div class="d-flex justify-content-end py-4 mb-3">
          <button type="submit" class="btn btn-outline-neutral cart_btn">信用卡付款</button>
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

.cart_table_title {
  white-space: nowrap;
  text-align: center;
  border-bottom: 2px solid white;
}

.cart_h5 {
  padding: 12px;
  margin: 0;
  border-bottom: 2px solid white;
}

.cart_product_info {
  display: flex;
  flex-direction: column-reverse;
}

.cart_product_img {
  width: auto;
  height: 100px;
  // padding: 0 10px 0 0;
}

.cart_product_img > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart_product_title {
  margin-bottom: 12px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.selected_qty {
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 0;
}

.selected_qty > div {
  padding: 0;
}

.selected_subtotal {
  display: flex;
  align-self: center;
  padding: 0;
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

.cart_count > .cart_total_text {
  padding: 10px 0;
}

.cart_btn {
  color: #121212;
}

.cart_btn:hover {
  background: #ff3d33;
  border: 1px solid white;
  color: white;
}

/* VForm */
.cart_form {
  background: #f5f5f5;
  padding: 0 15px;
}

.form-group {
  padding: 12px 0;
  border-bottom: 2px solid white;
}

.label_style {
  padding: 10px 0 0;
}

.invalid_feedback {
  color: #ff3d33;
}

.cart_textarea {
  background: #f5f5f5;
  padding: 12px 0 20px;
}

textarea {
  resize: none;
  height: 150px;
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

  .cart_table,
  .cart_form {
    margin: auto 15px;
  }

  .cart_product_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
  }

  .cart_product_title {
    margin-bottom: 0;
    margin-left: 12px;
  }

  .cart_product_img {
    width: 50%;
  }

  .cart_product_price {
    justify-content: start;
  }

  .selected_subtotal {
    justify-content: center;
  }

  .cart_count {
    justify-content: space-between;
  }

  .cart_btn {
    margin-right: 15px;
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

  .cart_product_info {
    padding: 12px;
  }

  .cart_product_img {
    width: 140px;
    height: 120px;
  }

  .order_control {
    align-items: center;
    padding: 5px 0;
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

  .cart_product_price > div {
    margin: auto;
  }
}
</style>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '../../stores/cartStore.js'

import Swal from 'sweetalert2'
//import { RouterLink } from 'vue-router'

const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data() {
    return {
      orderInfo: {
        user:{},
        message:''
      },
    }
  },
  components: {},
  computed: {
    ...mapState(cartStore, ['carts', 'final_total'])
    // 購物車當前列表 / 購物車所有商品總金額
  },
  methods: {
    ...mapActions(cartStore, ['getCarts']),
    // 取得購物車當前所有品項

    // 取得下訂訂單資料
    getOrder() {
      // 防呆
      if (this.carts.length === 0) {
        this.$router.push('/products')
        Swal.fire({
          title: '<h6 class="text-primary">購物車中沒有商品，即將返回商品頁面</h6>',
          showConfirmButton:false,
          timer:1000
        })

        return
      } else {
        const { id } = this.$route.params
        console.log('id', id) // 取得訂單 id
        this.$http
          .get(`${VITE_URL}v2/api/${VITE_PATH}/order/${id}`)
          .then((res) => {
            console.log('訂單資訊', res)
            this.orderInfo = res.data.order
            
            
          })
          .catch((err) => {
            console.log(err)
          })
      }
      
    }
  },
  mounted() {
    this.getOrder()
  }
}
</script>