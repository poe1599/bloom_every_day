<template>
  <div class="cart_check_wrapper">
    <div class="container">
      <div class="step_group">
        <div class="step_item">
          <div class="caption">訂單資訊</div>
        </div>
        <div class="step_item active">
          <div class="caption">填寫資訊</div>
        </div>
        <div class="step_item">
          <div class="caption">完成訂單</div>
        </div>
      </div>
      <div class="row mx-auto">
        <div class="order_info col-lg-5">
          <h5 class="cart_h5 bg-bg-2">訂單明細</h5>

          <div class="cart_table">
            <table class="table">
              <tr class="row mx-auto d-md-flex cart_table_title">
                <td class="col-7 col-sm-6">商品資訊</td>
                <td class="col-2 col-sm-2">數量</td>
                <td class="col-3 col-sm-4">小計</td>
              </tr>
              <tr class="row mx-auto order_control" v-for="item in carts" :key="item.id">
                <!-- 塞資料 -->
                <td class="col-7 col-sm-6">
                  <div class="cart_product_info">
                    <div class="cart_product_img">
                      <img :src="item.product.imageUrl" alt="" />
                    </div>
                    <h6 class="cart_product_title">{{ item.product.title }}</h6>
                  </div>
                </td>

                <td class="col-2 col-sm-2 order_2 order_md_0 selected_qty">
                  <div>x {{ item.qty }}</div>
                </td>
                <td class="col-3 col-sm-4 order_2 order_md_0 selected_subtotal">
                  <div>NT ${{ item.total }}</div>
                </td>
              </tr>

              <tr>
                <div class="cart_count">
                  <div class="cart_total_text">總計：</div>
                  <div class="cart_total_price">NT ${{ final_total }}</div>
                </div>
              </tr>
            </table>
          </div>
        </div>

        <vue-loading
          v-model:active="isLoading"
          :is-full-page="fullPage"
          :opacity="1"
        >
          <div class="loading_brand">
            <img src="../../assets/icon/bloomEveryDay.svg" alt="" />

            <div class="loading_flower">
              <img src="../../assets/icon/logo_flower.svg" alt="" />
            </div>
          </div>
        </vue-loading>

        <div class="buyer_form col-lg-7">
          <h5 class="cart_h5 bg-bg-2">訂購人資訊</h5>
          <VForm class="cart_form" v-slot="{ errors }">
            <div class="form-group">
              <label for="name" class="form-label label_style">收件人姓名</label>
              <VField
                id="name"
                name="姓名"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.姓名 }"
                placeholder="請輸入姓名"
                rules="required"
                v-model="order.user.name"
              ></VField>
              <ErrorMessage name="姓名" class="invalid_feedback"></ErrorMessage>
            </div>

            <div class="form-group">
              <label for="tel" class="form-label label_style">電話</label>
              <VField
                id="tel"
                name="電話"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.電話 }"
                placeholder="請輸入手機號碼"
                v-model="order.user.tel"
                :rules="isPhone"
              ></VField>
              <ErrorMessage name="電話" class="invalid_feedback"></ErrorMessage>
            </div>

            <div class="form-group">
              <label for="email" class="form-label label_style">信箱</label>
              <VField
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
                placeholder="請輸入信箱"
                rules="email|required"
                v-model="order.user.email"
              ></VField>
              <ErrorMessage name="email" class="invalid_feedback"></ErrorMessage>
            </div>

            <div class="form-group">
              <label for="address" class="form-label label_style">地址</label>
              <VField
                id="address"
                name="地址"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.地址 }"
                placeholder="請輸入地址"
                rules="required"
                v-model="order.user.address"
              ></VField>
              <ErrorMessage name="地址" class="invalid_feedback"></ErrorMessage>
            </div>

            <div class="cart_textarea">
              <label for="message" class="form-label label_style">備註</label>
              <textarea
                name="備註"
                id="message"
                class="w-100 form-control"
                cols="10"
                rows="10"
                v-model="order.message"
              ></textarea>
            </div>
          </VForm>
        </div>

        <div class="d-flex justify-content-end py-4 mb-3">
          <button type="button" class="btn btn-outline-neutral cart_btn" @click="onSubmit">
            送出訂單
          </button>
        </div>
      </div>
    </div>
  </div>
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
}

.loading_brand > img {
  width: 100%;
  height: auto;
  object-fit: cover;
  @media screen and (min-width: 576px) {
    width: 80%;
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
}

.loading_flower > img {
  width: 100%;
  height: auto;
  object-fit: cover;
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
import { Field, Form, ErrorMessage } from 'vee-validate'
import Swal from 'sweetalert2'

const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data() {
    return {
      isLoading: false,
      fullPage:true,
      order: {
        // 儲存表單購買人資料
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage
    // RouterLink
  },
  computed: {
    ...mapState(cartStore, ['carts', 'final_total'])
    // 購物車當前列表 / 購物車所有商品總金額
  },
  methods: {
    ...mapActions(cartStore, ['getCarts']),
    // 取得購物車當前所有品項

    // 電話驗證規則
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },

    // 送出表單 & 儲存訂購人資料
    onSubmit() {
      this.isLoading = true

      const data = this.order
      this.$http
        .post(`${VITE_URL}/v2/api/${VITE_PATH}/order`, { data })
        .then((res) => {
          const isOrderId = res.data.orderId // 取得訂單 id

          setTimeout(() => {
            this.isLoading = false
          }, 1000)

          if (isOrderId === undefined) {
            Swal.fire({
              toast: true,
              position: 'center',
              showConfirmButton: false,
              timer: 1500,
              title: '請填妥表單再按送出！',
              background: '#F2E7E8'
            })
          } else {
            this.$router.push(`/cartPay/${isOrderId}`)
            Swal.fire({
              toast: true,
              position: 'center',
              showConfirmButton: false,
              timer: 1500,
              title: '成功送單！',
              background: '#F2E7E8'
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted() {}
}
</script>