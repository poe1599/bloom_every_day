<template>
  <vue-loading v-model:active="isLoading" :is-full-page="fullPage" :opacity="1"> </vue-loading>
  <div class="product container">
    <h5 class="admin_title_h5">商品管理頁面</h5>
    <div class="text-end my-4">
      <button class="btn btn-primary text-white add_btn">新增商品</button>
    </div>

    <div class="row mx-auto">
      <div class="col-sm-12 p-0">
        <table class="table product_table">
          <tr>
            <th class="col-2">分類</th>
            <th class="col-2">產品名稱</th>
            <th class="col-2">原價</th>
            <th class="col-2">售價</th>
            <th class="col-2">是否啟用</th>
            <th class="col-2">編輯</th>
          </tr>

          <!-- 所有商品渲染 -->
          <tr v-for="product in products" :key="product.id">
            <td data-th="分類">{{ product.category }}</td>
            <td data-th="產品名稱">{{ product.title }}</td>
            <td data-th="原價">{{ product.origin_price }}</td>
            <td data-th="售價">{{ product.price }}</td>
            <td data-th="是否啟用">
              <span v-if="product.is_enabled === 1">已啟用</span>
              <span v-else>未啟用</span>
            </td>

            <td class="btn_td" data-th="編輯">
              <div>
                <button class="btn btn_edit btn-outline-neutral me-3" type="button">編輯</button>
                <button class="btn btn_delete btn-outline-primary" type="button">刪除</button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!--row-->

    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="productModal"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增商品</span>
              <span>編輯商品</span>
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
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="image" class="form-label">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結" />
                </div>
                <div class="mb-3">
                  <label for="customFile" class="form-label"
                    >或 上傳圖片
                    <i class="fas fa-spinner fa-spin"></i>
                    <!-- <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i> -->
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="fileInput"
                  /><!--@change="uploadFile"-->
                </div>
                <img class="img-fluid" src="" />
                <!-- 延伸技巧，多圖 -->
                <div class="mt-5">
                  <div class="mb-3">
                    <input type="url" class="form-control form-control" placeholder="請輸入連結" />
                    <div>
                      <img class="img-fluid" src="" />
                    </div>
                    <button type="button" class="btn btn-outline-danger">移除</button>
                  </div>
                  <div>
                    <button class="btn btn-outline-primary btn-sm d-block w-100">新增圖片</button>
                  </div>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input type="text" class="form-control" id="title" placeholder="請輸入標題" />
                </div>

                <div class="row gx-2">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <input type="text" class="form-control" id="unit" placeholder="請輸入單位" />
                  </div>
                </div>

                <div class="row gx-2">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      min="0"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      min="0"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="mb-3">
                  <label for="description" class="form-label">商品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入商品描述"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入商品說明內容"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled"> 是否啟用 </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary">確認</button>
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
              <span>刪除 </span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            是否刪除 這項商品？<strong class="text-danger"></strong>
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
            <button type="button" class="btn btn-danger">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delete Modal -->
  </div>
</template>
<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import setAuthFactory from '@/methods/setAuthFactory.js'

import Swal from 'sweetalert2'

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      products: [], // 所有產品
      isLoading: false,
      fullPage:true
    }
  },
  methods: {
    // 取得所有商品列表
    getProducts() {
      this.isLoading = true
      this.$http.get(`${VITE_URL}v2/api/${VITE_PATH}/admin/products`).then((res) => {
        console.log(res.data)
        this.products = res.data.products

        this.isLoading = false
      })
    }
  },
  mounted() {
    // 登入驗證
    setAuthFactory(this.$http,this.$router)

    this.productModal = new bootstrap.Modal(this.$refs.productModal)

     console.log('prod');

    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.product.container {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
}

.admin_title_h5 {
  padding: 30px 0;
  text-align: center;
  border-bottom: 3px solid white;
}

/* table start */
.product_table tr {
  border-bottom: 3px solid #f5f5f5;
}

tr > th {
  padding: 3px 6px;
}

table.table.product_table th {
  white-space: nowrap;
}

.product_table th {
  /* 手機模式隱藏桌機大標 */
  display: none;
}

.product_table td {
  padding: 3px 6px;
  border-bottom: none;
}

.product_table td:before {
  /* 手機模式標題置於左側 */
  content: attr(data-th) '：';
  font-weight: bold;
  display: inline-block;
}

.product_table td:not(.btn_td) {
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

  .product_table th,
  .product_table td,
  .product_table td:not(.btn_td) {
    display: table-cell;
  }

  .product_table td:before {
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