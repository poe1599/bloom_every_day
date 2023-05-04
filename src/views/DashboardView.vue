<template>
  <div>dashboard</div>
  <div class="admin_layout">
    <div id="admin_header">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
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
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled">Disabled</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data() {
    return {}
  },
  methods: {
    // 驗證是否成功登入
    checkLogin() {
      this.$http
        .post(`${VITE_URL}v2/api/user/check`)
        .then(() => {
          //   console.log('登入成功', res)
          Swal.fire({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 2000,
            title: `<h6 class="mb-0" style="color:#FF3D33; text-align:center;">登入成功，管理員你好！</h6>`
          })
        })
        .catch(() => {
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
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)krisToken\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common['Authorization'] = token

    //this.checkLogin()
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