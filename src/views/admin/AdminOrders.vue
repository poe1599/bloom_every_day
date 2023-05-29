<template>
  <vue-loading v-model:active="isLoading" :is-full-page="fullPage" :opacity="1"> </vue-loading>

  <div class="order container">
    <h5 class="admin_title_h5">訂單管理頁面</h5>
    <div class="row mx-auto">
      <div class="col-sm-12 p-0">
        <table class="table mt-4 order_table">
          <tr>
            <th>購買時間</th>
            <th>Email</th>
            <th>購買款項</th>
            <th>應付金額</th>
            <th>是否付款</th>
            <th>編輯</th>
          </tr>

          <tr v-for="order in orders" :key="order.id">
            <td data-th="購買時間">{{ date(order.create_at) }}</td>
            <td data-th="Email">{{ order.user.email }}</td>
            <td data-th="購買款項">
              <ol class="order_item" style="list-style-position: inside; margin-bottom: 0px">
                <li v-for="(item, i) in order.products" :key="i">
                  {{ item.product.title }} 數量：{{ item.qty }}
                </li>
              </ol>
            </td>
            <td data-th="應付金額">{{ order.total }}</td>
            <td data-th="是否付款">
              <span v-if="order.is_paid" class="text-neutral"> 已付款 </span>
              <span v-else class="text-primary" style="font-weight: bold"> 未付款 </span>
            </td>

            <td class="btn_td" data-th="編輯">
              <div>
                <button
                  class="btn btn_edit btn-outline-neutral me-3"
                  type="button"
                  @click="openModal(order)"
                >
                  檢視
                </button>
                <button
                  class="btn btn_delete btn-outline-primary"
                  type="button"
                  @click="openDeleteModal(order)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- row -->

    <Pagination :pages="page" @change-page="getOrderList"></Pagination>

    <!-- Modal -->
    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="orderModal"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-bg-2 text-dark-text">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>訂單細節</span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <div class="row mx-auto">
              <div class="col-md-5">
                <h4 class="bg-bg-2" style="padding: 0 0 0 6px">用戶資料</h4>
                <table class="table">
                  <tbody>
                    <tr class="row mx-auto">
                      <td class="col-3 col-md-5">姓名</td>
                      <td class="col-9 col-md-7 wordBreak">{{ tempOrder.user.name }}</td>
                    </tr>
                    <tr class="row mx-auto">
                      <td class="col-3 col-md-5">Email</td>
                      <td class="col-9 col-md-7 wordBreak">{{ tempOrder.user.email }}</td>
                    </tr>
                    <tr class="row mx-auto">
                      <td class="col-3 col-md-5">電話</td>
                      <td class="col-9 col-md-7 wordBreak">{{ tempOrder.user.tel }}</td>
                    </tr>
                    <tr class="row mx-auto">
                      <td class="col-3 col-md-5">地址</td>
                      <td class="col-9 col-md-7 wordBreak">{{ tempOrder.user.address }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-7">
                <h4 class="bg-bg-2" style="padding: 0 0 0 6px;s">訂單細節</h4>
                <table class="table">
                  <tbody>
                    <tr class="row mx-auto">
                      <td class="col-5 col-md-6">訂單編號</td>
                      <td class="col-7 col-md-6 wordBreak">{{ tempOrder.id }}</td>
                    </tr>
                    <tr class="row mx-auto">
                      <td class="col-5 col-md-6">下單時間</td>
                      <td class="col-7 col-md-6 wordBreak">{{ date(tempOrder.create_at) }}</td>
                    </tr>
                    <tr class="row mx-auto">
                      <td class="col-5 col-md-6">付款時間</td>
                      <td class="col-7 col-md-6 wordBreak">
                        <span v-if="tempOrder.paid_date">{{ date(tempOrder.paid_date) }}</span>
                        <span v-else class="text-primary">時間不正確</span>
                      </td>
                    </tr>
                    <tr class="row mx-auto">
                      <td class="col-5 col-md-6">付款狀態</td>
                      <td class="col-7 col-md-6 wordBreak">
                        <span class="text-neutral" v-if="tempOrder.is_paid">已付款</span>
                        <span v-else class="text-primary">尚未付款</span>
                      </td>
                    </tr>
                    <tr class="row mx-auto">
                      <td class="col-5 col-md-6">總金額</td>
                      <td class="col-7 col-md-6">{{ tempOrder.total }}</td>
                    </tr>
                  </tbody>
                </table>
                <h4 class="bg-bg-2" style="padding: 0 0 0 6px">選購商品清單</h4>
                <table class="table">
                  <tbody>
                    <tr>
                      <td>
                        <ol
                          class="order_item"
                          style="list-style-position: inside; margin-bottom: 0px; padding: 0"
                        >
                          <li v-for="(item, i) in tempOrder.products" :key="i">
                            {{ item.product.title }} 數量：{{ item.qty }}
                          </li>
                        </ol>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="d-flex justify-content-end">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      v-model="tempOrder.is_paid"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      <span v-if="tempOrder.is_paid">已付款</span>
                      <span v-else>未付款</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-neutral btn_cancel"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-outline-primary btn_confirm"
              @click="confirmUpdate(tempOrder)"
            >
              修改付款狀態
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- delete Modal -->
    <div
      class="modal fade"
      id="delModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="deleteModal"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">
              <span>刪除</span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            是否刪除這筆訂單？<strong class="text-danger"></strong>
            (刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn_cancel btn-outline-neutral"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="deleteOrder">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import setAuthFactory from '@/methods/setAuthFactory.js'
import { date } from '@/methods/date.js'
import dayjs from 'dayjs'
import Pagination from '../../components/PaginationComponent.vue'

import Swal from 'sweetalert2'

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      orders: [],
      tempOrder: {
        user: {}
      },
      isLoading: false,
      fullPage: true,
      page: {}
    }
  },
  components: {
    Pagination
  },
  methods: {
    date,

    // 取得所有訂單資料
    getOrderList(page = 1) {
      this.isLoading = true
      this.$http
        .get(`${VITE_URL}v2/api/${VITE_PATH}/admin/orders/?page=${page}`)
        .then((res) => {
          console.log(res.data)
          this.orders = res.data.orders
          this.page = res.data.pagination

          this.isLoading = false
        })
        .catch((err) => {
          console.log(err)
        })
    },

    openModal(order) {
      this.tempOrder = { ...order }
      this.orderModal.show()
    },

    // 修改付款狀態
    confirmUpdate(tempOrder) {
      console.log(tempOrder)
      this.isLoading = true

      const id = tempOrder.id

      // 將傳入的 tempOrder 物件中 is_paid 得到的值 (隨 checkbox 勾選、v-model 綁定而不同) 賦值給 is_paid，要更新資料用
      const data = {
        is_paid: tempOrder.is_paid,
        paid_date: dayjs() / 1000
        // 當管理員勾選「已付款」後，將當下時間作為付款時間打 api
      }

      // 準備 put api
      this.$http
        .put(`${VITE_URL}v2/api/${VITE_PATH}/admin/order/${id}`, { data })
        .then((res) => {
          this.isLoading = false
          this.getOrderList()
          this.orderModal.hide()

          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            title: `<h6 class="mb-0" style="color:#FF3D33; text-align:center;">已更新訂單付款狀態！</h6>`
          })
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    openDeleteModal(order) {
      this.tempOrder = { ...order }
      this.delModal.show()
    },

    deleteOrder() {
      this.isLoading = true
      this.$http
        .delete(`${VITE_URL}v2/api/${VITE_PATH}/admin/order/${this.tempOrder.id}`)
        .then(() => {
          this.isLoading = false
          this.delModal.hide()
          this.getOrderList()

          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            title: `<h6 class="mb-0" style="color:#FF3D33; text-align:center;">已刪除訂單！</h6>`
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted() {
    // 登入驗證
    setAuthFactory(this.$http, this.$router)

    this.orderModal = new bootstrap.Modal(this.$refs.orderModal)

    this.delModal = new bootstrap.Modal(this.$refs.deleteModal)

    this.getOrderList()
  }
}
</script>

<style lang="scss" scoped>
.order.container {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
}

.admin_title_h5 {
  padding: 30px 0;
  text-align: center;
  border-bottom: 3px solid white;
}

/* table start */
.wordBreak {
  word-break: break-word;
}

.order_table {
  tr {
    border-bottom: 3px solid #f5f5f5;
  }

  th {
    /* 手機模式隱藏桌機大標 */
    display: none;
  }

  td {
    padding: 3px 6px;
    border-bottom: none;

    &:before {
      /* 手機模式標題置於左側 */
      content: attr(data-th) '：';
      font-weight: bold;
      display: inline-block;
    }

    &:not(.btn_td) {
      /* btn 欄位以外的 td 全改為 display: block; */
      display: block;
    }
  }
}

.btn_td {
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    justify-content: space-between;
  }
}

tr > th {
  padding: 3px 6px;
}

table.table.order_table th {
  white-space: nowrap;
}

.btn.btn_edit:hover,
.btn.add_img_btn:hover,
.btn.remove_img_btn:hover,
.btn.btn_delete:hover,
.btn.btn_cancel:hover,
.btn.btn_confirm:hover {
  color: white;
}

/* Modal start */
.modal-header {
  padding: 8px 15px;
}

.btn_cancel,
.btn_confirm {
  margin: 2px;
}

.modal-footer {
  padding: 20px 15px;
  border-top: 1px solid #eee;
}
/* Modal end */

@media screen and (min-width: 576px) {
  .add_btn {
    margin-right: 16px;
  }
}

@media screen and (min-width: 768px) {
  .add_btn {
    margin-right: 36px;
  }

  .order_table {
    th,
    td,
    td:not(.btn_td) {
      display: table-cell;
    }

    td:before {
      display: none;
    }
  }

  .btn_td div {
    display: block;
  }
  .btn_edit,
  .btn_delete {
    white-space: nowrap;
    margin: 0px auto 6px;
  }
}
</style>