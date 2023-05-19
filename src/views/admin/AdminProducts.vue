<template>
  <vue-loading v-model:active="isLoading" :is-full-page="fullPage" :opacity="1"> </vue-loading>
  <div class="product container">
    <h5 class="admin_title_h5">商品管理頁面</h5>
    <div class="text-end my-4">
      <button class="btn btn-primary text-white add_btn" @click="openModal('create')">
        新增商品
      </button>
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
                <button
                  class="btn btn_edit btn-outline-neutral me-3"
                  type="button"
                  @click="openModal('edit', product)"
                >
                  編輯
                </button>
                <button
                  class="btn btn_delete btn-outline-primary"
                  type="button"
                  @click="openModal('delete', product)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!--row-->

    <Pagination :pages="page" @change-page="getProducts"></Pagination>

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
          <div class="modal-header  bg-bg-2 text-dark-text">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew">新增商品</span>
              <span v-else>編輯商品</span>
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
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <div class="mb-3">
                  <label for="customFile" class="form-label"
                    >或 上傳圖片
                    <i class="bi bi-cloud-arrow-up" v-if="status.fileUploading"></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="fileInput"
                    @change="uploadFile"
                  />
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" />
                <!-- 判斷 tempProduct.imagesUrl 是否為陣列，若是才顯示此區塊 -->
                <div class="mt-5" v-if="Array.isArray(tempProduct.imagesUrl)">
                  <div class="mb-3" v-for="(image, key) in tempProduct.imagesUrl" :key="key + 133">
                    <input
                      type="url"
                      class="form-control form-control"
                      placeholder="請輸入連結"
                      v-model="tempProduct.imagesUrl[key]"
                    />
                    <div>
                      <img class="img-fluid" :src="tempProduct.imagesUrl[key]" />
                    </div>
                  </div>

                  <div style="margin-bottom: 20px">
                    <!-- 新增：
                    1. 沒有任何 input 欄位 (陣列空著時) 可以按新增
                    2. 新增的欄位中的最後一欄必須有值，才可以再按新增
                       [0,1,2]
                     -->
                    <button
                      class="btn btn-outline-primary btn-sm d-block w-100 add_img_btn"
                      v-if="
                        !tempProduct.imagesUrl.length ||
                        tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                      "
                      @click="tempProduct.imagesUrl.push('')"
                    >
                      新增圖片
                    </button>

                    <!-- 刪除：
                    1. 沒有任何 input 欄位 (陣列空著時) 不可以按刪除

                     -->
                    <button
                      type="button"
                      class="my-2 btn btn-sm d-block w-100 btn-outline-neutral remove_img_btn"
                      @click="tempProduct.imagesUrl.pop('')"
                    >
                      移除
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title"
                  />
                </div>

                <div class="row gx-2">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <input
                      type="text"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
                    />
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
                      v-model.number="tempProduct.origin_price"
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
                      v-model.number="tempProduct.price"
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
                    v-model="tempProduct.content"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入商品說明內容"
                    v-model="tempProduct.description"
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
                      v-model="tempProduct.is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled"> 是否啟用 </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn_cancel btn-outline-neutral"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn_confirm btn-outline-primary"
              @click="confirmUpdate(tempProduct)"
            >
              確認
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
            是否刪除
            <span class="text-primary"
              ><b>{{ tempProduct.title }}</b></span
            >
            這項商品？<strong class="text-danger"></strong>
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
            <button type="button" class="btn btn-danger" @click="deleteProduct(tempProduct.id)">
              確認刪除
            </button>
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

import Pagination from '../../components/PaginationComponent.vue'

import Swal from 'sweetalert2'

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      products: [], // 所有產品
      tempProduct: {
        imagesUrl: []
      },
      isLoading: false,
      fullPage: true,
      isNew: true,
      status: {
        fileUploading: false // 控制是否出現上傳 icon
      },
      page: {} // 以 props 傳給 Pagination 元件
    }
  },
  components: {
    Pagination
  },
  methods: {
    // 取得所有商品列表
    getProducts(page = 1) {
      this.isLoading = true
      this.$http.get(`${VITE_URL}v2/api/${VITE_PATH}/admin/products/?page=${page}`).then((res) => {
        
        this.products = res.data.products
        this.page = res.data.pagination //將後台 api 中取得的 pagination 物件的欄位資料傳給 this.page

        this.isLoading = false
      })
      .catch((err)=>{
        console.log(err);
      })
    },

    // 上傳圖片
    uploadFile() {
      // 取得傳入 input 欄位中的第一個圖檔
      const uploadedFile = this.$refs.fileInput.files[0]
      // console.log(uploadedFile)

      const formData = new FormData()
      // console.log(formData)

      formData.append('file-to-upload', uploadedFile) // 將從 uploadedFile 取得的資料傳給 input name="file-to-upload" 的表單元素上

      this.status.fileUploading = true

      // 準備上傳圖片打 api，傳入兩個參數：formData & 設定請求標頭內容的值為 multipart/form-data
      this.$http
        .post(`${VITE_URL}v2/api/${VITE_PATH}/admin/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          this.status.fileUploading = false
          // console.log(res)
          if (res.data.success) {
            this.tempProduct.imageUrl = res.data.imageUrl
            this.$refs.fileInput.value = ''
            Swal.fire({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 2000,
              title: `<h6 class="mb-0" style="color:#FF3D33; text-align:center;">成功上傳圖片！</h6>`
            })
          }
        })
        .catch(() => {
          this.status.fileUploading = false
          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            title: `<h6 class="mb-0" style="background:#FF3D33; color:white; text-align:center;">圖片上傳失敗！</h6>`
          })
        })
    },

    // 開啟彈出視窗
    openModal(status, product) {
      if (status === 'create') {
        this.productModal.show()
        this.isNew = true
        // 帶入初始化資料
        this.tempProduct = {
          imagesUrl: []
        }
      } else if (status === 'edit') {
        this.productModal.show()
        this.isNew = false
        // 帶入當前資料
        this.tempProduct = { ...product }
      } else {
        this.delModal.show()
        this.isNew = false
        this.tempProduct = { ...product }
      }
    },

    // 確認「新增」、「編輯」
    confirmUpdate(item) {
      // 新增
      let url = `${VITE_URL}v2/api/${VITE_PATH}/admin/product`
      let method = 'post'

      if (!this.isNew) {
        // 編輯
        url = `${VITE_URL}v2/api/${VITE_PATH}/admin/product/${item.id}`
        method = 'put'
      }

      // item 為傳入的參數 tempProduct
      this.$http[method](url, { data: item })
        .then(() => {
          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            title: this.isNew
              ? `<h6 class="mb-0" style="color:#FF3D33; text-align:center;">已新增商品！</h6>`
              : `<h6 class="mb-0" style="color:#FF3D33; text-align:center;">已更新商品！</h6>`
          })
          this.productModal.hide()
          this.getProducts()
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 刪除商品
    deleteProduct(id) {
      this.$http
        .delete(`${VITE_URL}v2/api/${VITE_PATH}/admin/product/${id}`)
        .then(() => {
          Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            title: `<h6 class="mb-0" style="color:#FF3D33; text-align:center;">已刪除商品！</h6>`
          })
          this.delModal.hide()
          this.getProducts()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted() {
    // 登入驗證
    setAuthFactory(this.$http, this.$router)

    this.productModal = new bootstrap.Modal(this.$refs.productModal)

    this.delModal = new bootstrap.Modal(this.$refs.deleteModal)

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