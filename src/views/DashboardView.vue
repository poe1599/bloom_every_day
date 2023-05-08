<template>
  <div class="admin_layout">
    <div id="admin_header" class="container">
      <AdminNav></AdminNav>
    </div>

    <div>
      <RouterView></RouterView>
    </div>

    <vue-loading v-model:active="isLoading" :is-full-page="fullPage" :opacity="1">
      <div class="loading_brand">
        <img src="../assets/icon/bloomEveryDay.svg" alt="" />

        <div class="loading_flower">
          <img src="../assets/icon/logo_flower.svg" alt="" />
        </div>
      </div>
    </vue-loading>
  </div>
</template>

<script>
import AdminNav from '../components/AdminNav.vue'
import { RouterView } from 'vue-router'
import Swal from 'sweetalert2'

const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data() {
    return {
      isLoading: false
    }
  },
  components: {
    AdminNav,
    RouterView
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
          
          this.isLoading = true
          setTimeout(() => {
            Swal.fire({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 2000,
            title: `<h6 class="mb-0" style="color:white; text-align:center;">驗證錯誤，請重新登入！</h6>`,
            background: '#FF3D33'
          })
            this.isLoading = false
            this.$router.push('/login')
          }, 2000)
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
</style>