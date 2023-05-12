<template>
  <div>
    <div class="articles container">
      <h5 class="admin_title_h5">文章管理頁面</h5>
      <div class="text-end my-4">
        <button class="btn btn-primary text-white add_btn" @click="openModal(true)">
          新增文章
        </button>
      </div>
      <div class="row mx-auto">
        <div class="col-sm-12 p-0">
          <table class="table article_table">
            <tr>
              <th class="col-3">標題</th>
              <th class="col-2">作者</th>
              <th class="col-4">描述</th>
              <th class="col-1">建立時間</th>
              <th class="col-1">是否公開</th>
              <th class="col-1">編輯</th>
            </tr>

            <!-- 所有文章渲染 -->
            <tr v-for="article in articles" :key="article.id">
              <td data-th="標題">{{ article.title }}</td>
              <td data-th="作者">{{ article.author }}</td>
              <td data-th="描述">{{ article.description }}</td>
              <td data-th="建立時間">{{ date(article.create_at) }}</td>
              <td data-th="是否公開">
                <span v-if="article.isPublic">已公開</span>
                <span v-else>未公開</span>
              </td>

              <td class="btn_td" data-th="編輯">
                <div>
                  <button
                    class="btn btn_edit btn-outline-neutral me-3"
                    type="button"
                    @click="getArticleDetail(article.id)"
                  >
                    編輯
                  </button>
                  <button
                    class="btn btn_delete btn-outline-primary"
                    type="button"
                    @click="openDeleteModal(article)"
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

      <!-- Modal -->
      <div
        class="modal fade"
        id="articleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref="articleModal"
      >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-bg-2 text-dark-text">
              <h5 class="modal-title" id="exampleModalLabel">
                <span v-if="isNew">新增貼文</span>
                <span v-else>編輯貼文</span>
              </h5>
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                @click="closeModal"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row mx-auto">
                <div class="col-sm-4">
                  <div class="mb-3">
                    <label for="title" class="form-label">標題</label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      v-model="tempArticle.title"
                      placeholder="請輸入標題"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="image" class="form-label">輸入圖片網址</label>
                    <input
                      type="text"
                      class="form-control"
                      id="image"
                      v-model="tempArticle.imageUrl"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="author" class="form-label">作者</label>
                    <input
                      type="text"
                      class="form-control"
                      id="author"
                      v-model="tempArticle.author"
                      placeholder="請輸入標題"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="create_at">文章建立日期{{tempArticle.create_at}}</label>
                    <input
                      type="date"
                      class="form-control"
                      id="create_at"
                      v-model="create_at"
                    />
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="mb-3">
                    <label for="description" class="form-label">文章描述</label>
                    <textarea
                      type="text"
                      class="form-control"
                      id="description"
                      v-model="tempArticle.description"
                      placeholder="請輸入文章描述"
                    ></textarea>
                  </div>
                  <div class="mb-3">
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      v-model="tempArticle.content"
                    ></ckeditor>
                  </div>
                  <div class="mb-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="isPublic"
                        v-model="tempArticle.isPublic"
                      />
                      <label class="form-check-label" for="isPublic"> 是否公開 </label>
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
                @click="confirmUpdate(tempArticle)"
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
                <span>刪除 {{ this.tempArticle.title }}</span>
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              是否刪除 {{ this.tempArticle.title }} 這篇文章？<strong class="text-danger"></strong>
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
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteArticle(this.tempArticle.id)"
              >
                確認刪除
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- delete Modal -->
    </div>
  </div>
</template>
<script>
import {date} from '../../methods/date.js'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

import ClassicEditor from '@ckeditor/ckeditor5-build-classic' // 載入 CKEditor UI 庫

import Swal from 'sweetalert2'

const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data() {
    return {
      articles: [],

      tempArticle: {
        // 新增 & 編輯文章用
      },
      isNew: false, // 判斷是「編輯」或「新增」所使用的

      // CKEditor
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', 'link']
      }
    }
  },

  methods: {
    date, // 引入處理時間的函式

    // 取得所有文章
    getArticles() {
      this.$http
        .get(`${VITE_URL}v2/api/${VITE_PATH}/admin/articles`)
        .then((res) => {
          this.articles = res.data.articles

          
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // timeChange(time) {
    //   // 轉成 yyyy/mm/dd 格式

    //     const dateObj = new Date(time * 1000)

    //     const year = dateObj.getFullYear()

    //     const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')

    //     const date = dateObj.getDate().toString().padStart(2, '0')
    //     this.newTime = `${year}/${month}/${date}`

    //     console.log('this.newTime', this.newTime)

    // },

    // 取得指定文章 (id)：取得的單一文章內容要賦值給 this.tempArticle
    getArticleDetail(articleId) {
      this.$http
        .get(`${VITE_URL}v2/api/${VITE_PATH}/admin/article/${articleId}`)
        .then((res) => {
          const articleDetail = res.data.article
          this.openModal(false, articleDetail) // 將false 和點中的單一文章資料作為參數傳給 openModal，表示要進行這篇文章的「編輯」行為
          this.isNew = false
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 確認更新文章：含「新增」、「編輯」兩行為
    confirmUpdate(item) {
      // console.log('點擊編輯後取得當下的文章資料', item)

      this.tempArticle = item

      // 準備「新增」的 api & method (put)
      let newUrl = `${VITE_URL}v2/api/${VITE_PATH}/admin/article`
      let method = 'post'

      if (!this.isNew) {
        // 如果 !this.isNew 的值為 true，表示 isNew 為 false，代表不是「新增」的文章，而是要進行「編輯」行為
        newUrl = `${VITE_URL}v2/api/${VITE_PATH}/admin/article/${this.tempArticle.id}`
        method = 'put'
      }

      this.$http[method](newUrl, { data: this.tempArticle })
        // post 與 put api 都要帶相同格式的 data 參數。
        // 如果是「新增」，則 data 物件中的 this.tempArticle 為 openModal 函式中的 if 的 this.tempArticle
        .then((res) => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            title: `<h6 class="mb-0" style="color:#FF3D33; text-align:center;">${res.data.message}</h6>`
          })
          this.articleModal.hide()
          this.getArticles() // 更新後重新取得全部文章資料
        })
        .catch((err) => {
          const wrongMessage = err.response.data.message
          Swal.fire({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 2000,
            title: `<h6 class="mb-0" style="color:white; text-align:center;">${wrongMessage}</h6>`,
            background: '#FF3D33'
          })
        })
    },

    // 打開彈出視窗
    openModal(isNew, articleDetail) {
      // 參1-isNew：若 isNew 的值為 true，表示要進行「新增」，modal 的格式是新增樣式。若為 false，表示要進行「編輯」
      // 參2-article：若為「編輯」，要將選中的文章的資料帶入 modal 格式中

      if (isNew) {
        // 若為新增：給予預設 isPublic
        this.isNew = true
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000
        }
      } else {
        // 若為編輯，將傳入的 articleDetail 拷貝賦值給 this.tempArticle，並渲染到 Modal 視窗上
        this.tempArticle = { ...articleDetail }
        this.isNew = false // 讓彈出視窗最上方改顯示「編輯貼文」文字
      }

      this.articleModal.show() // 上述判斷結束後，打開相應格式的 Modal 視窗
    },

    // 關閉彈出視窗
    closeModal() {
      this.articleModal.hide()
    },

    // 開啟「刪除」彈出視窗
    openDeleteModal(article) {
      this.tempArticle = { ...article }
      this.deleteModal.show()
    },

    // 刪除文章
    deleteArticle(articleId) {
      // console.log('articleId',articleId)
      this.$http
        .delete(`${VITE_URL}v2/api/${VITE_PATH}/admin/article/${articleId}`)
        .then((res) => {
          console.log('刪除', res.data.message)
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            title: `<h6 class="mb-0" style="color:#FF3D33; text-align:center;">${res.data.message}</h6>`
          })
          this.getArticles()
          this.deleteModal.hide()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted() {
    // 登入驗證
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common['Authorization'] = token

    // 建立「新增」、「編輯」共用彈出視窗實體
    this.articleModal = new bootstrap.Modal(this.$refs.articleModal)

    // 建立「刪除」彈出視窗實體
    this.deleteModal = new bootstrap.Modal(this.$refs.deleteModal)

    this.getArticles()
  }
}
</script>

<style lang="scss" scoped>
.articles.container {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
}

.admin_title_h5 {
  padding: 30px 0;
  text-align: center;
  border-bottom: 3px solid white;
}

/* table start */
.article_table tr {
  border-bottom: 3px solid #f5f5f5;
}

tr > th {
  padding: 3px 6px;
}

table.table.article_table th {
  white-space: nowrap;
}

.article_table th {
  /* 手機模式隱藏桌機大標 */
  display: none;
}

.article_table td {
  padding: 3px 6px;
  border-bottom: none;
}

.article_table td:before {
  /* 手機模式標題置於左側 */
  content: attr(data-th) '：';
  font-weight: bold;
  display: inline-block;
}

.article_table td:not(.btn_td) {
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

  .article_table th,
  .article_table td,
  .article_table td:not(.btn_td) {
    display: table-cell;
  }

  .article_table td:before {
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