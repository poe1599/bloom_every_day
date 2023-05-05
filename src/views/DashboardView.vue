<template>
  <div class="admin_layout">
    <div id="admin_header" class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid d-flex">
          <a class="navbar-brand" href="#">
            <img src="../assets/img/Logo.svg " alt="" />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav text-center">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">文章</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">商品</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">訂單</a>
              </li>
              <li class="nav-item">
                <a class="nav-link">登出</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

    <div class="container">
        <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import { RouterView, RouterLink } from 'vue-router'
import Swal from 'sweetalert2'
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data() {
    return {}
  },
  components: {
    RouterView,
    // RouterLink
  },
  methods: {
    // 驗證是否成功登入
    checkLogin() {
      this.$http
        .post(`${VITE_URL}v2/api/user/check`)
        .then((res) => {
          //   console.log('登入成功', res)
          Swal.fire({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 2000,
            title: `<h6 class="mb-0" style="color:#FF3D33; text-align:center;">登入成功，管理員你好！</h6>`
          })
        })
        .catch((err) => {
          Swal.fire({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 2000,
            title: `<h6 class="mb-0" style="color:white; text-align:center;">驗證錯誤，請重新登入！</h6>`,
            background: '#FF3D33'
          })
        })
    }
  },
  mounted() {
    // 登入驗證
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common['Authorization'] = token

    this.checkLogin()
  }
}
</script>

<style lang="scss" scoped>
.navbar-brand {
  padding: 0;
}

button.navbar-toggler {
  color: #ff3d33;
}

.navbar-toggler:focus {
  box-shadow: 0 0 0 1px;
}

.navbar-toggler-icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  background-image: url('../assets/icon/IconMenu.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
</style>