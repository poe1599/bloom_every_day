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
          <div class="modal-header bg-dark text-white">
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
            <div class="row">
              <div class="col-md-4">
                <h4 class="bg-bg-2" style="padding: 0 0 0 6px">用戶資料</h4>
                <table class="table">
                  <tbody>
                    <tr>
                      <th style="width: 100px">姓名</th>
                      <td>{{ tempOrder.user.name }}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{{ tempOrder.user.email }}</td>
                    </tr>
                    <tr>
                      <th>電話</th>
                      <td>{{ tempOrder.user.tel }}</td>
                    </tr>
                    <tr>
                      <th>地址</th>
                      <td>{{ tempOrder.user.address }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-8">
                <h4 class="bg-bg-2" style="padding: 0 0 0 6px;s">訂單細節</h4>
                <table class="table">
                  <tbody>
                    <tr>
                      <th style="width: 100px">訂單編號</th>
                      <td>{{ tempOrder.id }}</td>
                    </tr>
                    <tr>
                      <th>下單時間</th>
                      <td>{{ date(tempOrder.create_at) }}</td>
                    </tr>
                    <tr>
                      <th>付款時間</th>
                      <td>
                        <span>{{ date(tempOrder.paid_date) }}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>付款狀態</th>
                      <td>
                        <span class="text-neutral" v-if="tempOrder.is_paid">已付款</span>
                        <span v-else class="text-primary">尚未付款</span>
                      </td>
                    </tr>
                    <tr>
                      <th>總金額</th>
                      <td>{{ tempOrder.total }}</td>
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
                <div class="text-end">
                  <span class="text-neutral" v-if="tempOrder.is_paid">已付款</span>
                  <span class="text-primary" v-else>未付款</span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn_confirm btn-outline-primary" @click="closeModal">
              關閉
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
            <button type="button" class="btn btn-danger" @click="deleteOrder()">確認刪除</button>
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

    closeModal() {
      this.orderModal.hide()
    },

    openDeleteModal(order) {
      this.tempOrder = { ...order }
      this.delModal.show()
    },

    deleteOrder() {
      this.$http
        .delete(`${VITE_URL}v2/api/${VITE_PATH}/admin/order/${this.tempOrder.id}`)
        .then(() => {
          this.delModal.hide()
          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            title: `<h6 class="mb-0" style="color:#FF3D33; text-align:center;">已刪除訂單！</h6>`
          })
          this.getOrderList()
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
.order_table tr {
  border-bottom: 3px solid #f5f5f5;
}

tr > th {
  padding: 3px 6px;
}

table.table.order_table th {
  white-space: nowrap;
}

.order_table th {
  /* 手機模式隱藏桌機大標 */
  display: none;
}

.order_table td {
  padding: 3px 6px;
  border-bottom: none;
}

.order_table td:before {
  /* 手機模式標題置於左側 */
  content: attr(data-th) '：';
  font-weight: bold;
  display: inline-block;
}

.order_table td:not(.btn_td) {
  /* btn 欄位以外的 td 全改為 display: block; */
  display: block;
}

.btn_td {
  display: flex;
  justify-content: space-between;
}

.btn_td div {
  display: flex;
  justify-content: space-between;
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

  .order_table th,
  .order_table td,
  .order_table td:not(.btn_td) {
    display: table-cell;
  }

  .order_table td:before {
    display: none;
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