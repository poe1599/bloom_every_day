<template>
  <div>
    <div class="articles container">
      <h5 class="admin_title_h5">文章管理頁面</h5>
      <div class="text-end my-4">
        <button class="btn btn-primary text-white" @click="openModal">新增文章</button>
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

            <tr v-for="article in articles" :key="article.id">
              <td data-th="標題">{{ article.title }}</td>
              <td data-th="作者">{{ article.author }}</td>
              <td data-th="描述">{{ article.description }}</td>
              <td data-th="建立時間">{{ article.dateString }}</td>
              <td data-th="是否公開">
                <span v-if="article.isPublic">已公開</span>
                <span v-else>未公開</span>
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
        ref="articleModal"
      >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-bg-2 text-dark-text">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>新增貼文</span>
                <span>編輯貼文</span>
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
                    <input type="text" class="form-control" id="title" placeholder="請輸入標題" />
                  </div>
                  <div class="mb-3">
                    <label for="image" class="form-label">輸入圖片網址</label>
                    <input
                      type="text"
                      class="form-control"
                      id="image"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="author" class="form-label">作者</label>
                    <input type="text" class="form-control" id="author" placeholder="請輸入標題" />
                  </div>
                  <div class="mb-3">
                    <label for="create_at">文章建立日期</label>
                    <input type="date" class="form-control" id="create_at" />
                  </div>
                </div>
                <div class="col-sm-8">
                  <!-- <label for="tag" class="form-label">標籤</label>
              <div class="row gx-1 mb-3">
                <div
                  class="col-md-2 mb-1"
                  v-for="(label, key) in tempArticle.tag"
                  :key="key"
                >
                  <div class="input-group input-group-sm">
                    <input
                      type="text"
                      class="form-control form-control"
                      id="tag"
                      v-model="tempArticle.tag[key]"
                      placeholder="請輸入標籤"
                    />
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="tempArticle.tag.splice(key, 1)"
                    >
                      <i class="bi bi-x"></i>
                    </button>
                  </div>
                </div>
                <div
                  class="col-md-2 mb-1"
                  v-if="
                    tempArticle.tag[tempArticle.tag.length - 1] ||
                    !tempArticle.tag.length
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    type="button"
                    @click="tempArticle.tag.push('')"
                  >
                    新增標籤
                  </button>
                </div>
              </div> -->
                  <div class="mb-3">
                    <label for="description" class="form-label">文章描述</label>
                    <textarea
                      type="text"
                      class="form-control"
                      id="description"
                      placeholder="請輸入文章描述"
                    ></textarea>
                  </div>
                  <div class="mb-3">
                    <!-- <ckeditor
                  :editor="editor"
                  :config="editorConfig"
                  v-model="tempArticle.content"
                ></ckeditor> -->
                  </div>
                  <div class="mb-3">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="isPublic" />
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
              <button type="button" class="btn btn_confirm btn-outline-primary">確認</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data() {
    return {
      articles: []
    }
  },
  methods: {
    // 取得所有文章
    getArticles() {
      this.$http
        .get(`${VITE_URL}v2/api/${VITE_PATH}/admin/articles`)
        .then((res) => {
          this.articles = res.data.articles

          this.articles = res.data.articles.map((item) => {
            const time = item.create_at
            const date = new Date(time * 1000)
            const dateString = date.toLocaleDateString()
            return {
              ...item,
              dateString
            }
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },

    openModal() {
      this.articleModal.show()
    },

    closeModal() {
      this.articleModal.hide()
    }
  },
  mounted() {
    // 登入驗證
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common['Authorization'] = token

    this.articleModal = new bootstrap.Modal(this.$refs.articleModal)

    this.getArticles()
  }
}
</script>

<style lang="scss" scoped>
.admin_title_h5 {
  padding: 30px 0;
  text-align: center;
  background: url('../../assets/img/ImgSec3.png') no-repeat center center;
}

/* table start */
.article_table tr {
  border-bottom: 3px solid #f5f5f5;
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
.btn.btn_delete:hover, .btn.btn_cancel:hover, .btn.btn_confirm:hover {
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

@media screen and (min-width: 768px) {
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