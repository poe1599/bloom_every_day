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
            <span class="caption text-primary" v-if="is_paid">(已付款)</span>
            <span class="caption text-primary" v-else>(未付款)</span>
          </h5>

          <div class="cart_table">
            <table class="table">
              <tr class="row mx-auto d-md-flex cart_table_title">
                <td class="col-7 col-sm-6">商品資訊</td>
                <td class="col-2 col-sm-2">數量</td>
                <td class="col-3 col-sm-4">小計</td>
              </tr>

              <tr
                class="row mx-auto order_control"
                v-for="item in orderInfo.products"
                :key="item.id"
              >
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
                  <div class="cart_total_price">NT ${{ orderInfo.total }}</div>
                </div>
              </tr>
            </table>
          </div>
        </div>

        <div class="buyer_form col-lg-7">
          <h5 class="cart_h5 bg-bg-2">訂單資訊</h5>
          <div class="orderList_table">
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
                <td class="col-7">{{ this.timeFinal }}</td>
              </tr>

              <tr class="row mx-auto">
                <td class="col-5">收件人姓名</td>
                <td class="col-7">{{ orderInfo.user.name }}</td>
              </tr>
              <tr class="row mx-auto">
                <td class="col-5">電話</td>
                <td class="col-7">{{ orderInfo.user.tel }}</td>
              </tr>
              <tr class="row mx-auto">
                <td class="col-5">信箱</td>
                <td class="col-7">{{ orderInfo.user.email }}</td>
              </tr>
              <tr class="row mx-auto">
                <td class="col-5">地址</td>
                <td class="col-7">{{ orderInfo.user.address }}</td>
              </tr>

              <tr class="row mx-auto">
                <td class="col-5">備註</td>
                <td class="col-7">{{ orderInfo.message }}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="d-flex justify-content-end py-4 mb-3">
          <button
            type="button"
            class="btn btn-outline-neutral pay_btn"
            @click="payOrder(orderInfo.id)"
          >
            信用卡付款
          </button>
        </div>

        <!-- paidModal -->
        <div
          class="modal fade"
          ref="paidModal"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{ paidFeedback }}！</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                您的商品將於下訂後三至五天寄出，商品寄出後將以 Email
                通知，請留意您提供的收件人信箱，日日是好日祝您購物愉快！
              </div>
              <div class="modal-footer justify-content-center">
                <button type="button" class="btn btn-secondary" @click="closeModal()">OK</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-body {
  text-align: justify;
}

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

  &::after {
    content: '';
    display: block;
    width: 44px;
    height: 1px;
    background: #f2e7e8; //#f2e7e8
    position: absolute;
    right: -44px;
  }

  &:last-child {
    &::after {
      content: none;
    }
  }
}

.step_item.active {
  background: #f2e7e8;
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

  > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
  
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

  > div {
  padding: 0;
}
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

  > .cart_total_text {
  padding: 10px 0;
}
}



.pay_btn {
  color: #121212;

  &:hover {
  background: #ff3d33;
  border: 1px solid white;
  color: white;
}
}



.orderList_table .table > tr,
td {
  padding: 12px;
}

@media screen and (min-width: 576px) {
  .step_item {
    width: 30%;

    &::after {
    width: 27px;
    right: -28px;
  }
  }

  

  .cart_h5 {
    margin: 12px 15px 0 15px;
  }

  .cart_table,
  .orderList_table {
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

  .pay_btn {
    margin-right: 15px;
  }
}

@media screen and (min-width: 768px) {
  .step_group {
    justify-content: space-around;
  }

  .step_item {
    width: 150px;

    &::after {
    width: 95px;
    right: -96px;
  }
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
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data() {
    return {
      timeFinal: '',
      orderInfo: {
        user: {},
        message: ''
      },
      paidFeedback: '',
      is_paid: ''
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
      const { id } = this.$route.params

      this.$http
        .get(`${VITE_URL}v2/api/${VITE_PATH}/order/${id}`)
        .then((res) => {
          this.orderInfo = res.data.order

          // DOM 準備完成後即先執行時間轉換
          const timeStamp = res.data.order.create_at
          this.timeSwitch(timeStamp)

          // 完成付款後再執行一次 getOrder 取得已付款狀態
          this.is_paid = res.data.order.is_paid
        })
        .catch((err) => {
          console.log(err)
        })
    },

    payOrder(orderId) {
      this.$http
        .post(`${VITE_URL}v2/api/${VITE_PATH}/pay/${orderId}`)
        .then((res) => {
          this.paidFeedback = res.data.message
          // 付款後彈出視窗
          this.paidModal.show()

          // 取得 is_paid 更新後狀態
          this.getOrder()
        })
        .catch((err) => {
          console.log(err)
        })
    },

    closeModal() {
      this.paidModal.hide()
    },

    // 時間轉換
    timeSwitch(timeStamp) {
      const newTime = new Date(timeStamp * 1000)
      this.timeFinal = newTime.toLocaleDateString()
    }
  },
  mounted() {
    this.getCarts()
    // 清空購物車：購物車 this.carts 在執行 .post(`${VITE_URL}/v2/api/${VITE_PATH}/order`, {data}) 之後，便會於後台清空，因此重新呼叫 this.getCarts()就會得到空的購物車資料
    this.getOrder()

    // 建立彈出視窗實體
    this.paidModal = new bootstrap.Modal(this.$refs.paidModal)
  }
}
</script>