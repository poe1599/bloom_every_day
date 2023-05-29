<template>
  <div class="login_wrapper">
    <div class="login container">
      <div class="row mx-auto">
        <div class="col-md-8 mx-auto">
          <div class="login_logo">
            <img src="../assets/img/Logo.svg " alt="" class="logo_img" />
          </div>
          <h5 class="login_h5 text-center mt-4">後台管理系統</h5>

          <!-- form -->
          <VForm class="login_form" v-slot="{ errors }" @submit="login">
            <div class="form-group">
              <label for="email" class="form-label label_style">登入信箱</label>
              <VField
                id="email"
                name="email"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
                placeholder="請輸入信箱"
                rules="required"
                v-model="user.username"
              ></VField>
              <ErrorMessage name="email" class="invalid_feedback"></ErrorMessage>
            </div>

            <div class="form-group">
              <label for="password" class="form-label label_style">登入密碼</label>
              <VField
                id="password"
                name="password"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': errors.password }"
                placeholder="請輸入密碼"
                rules="required"
                v-model="user.password"
              ></VField>
              <ErrorMessage name="password" class="invalid_feedback"></ErrorMessage>
            </div>

            <div class="py-3">
              <button type="submit" class="btn btn-primary login_btn col-12" style="color: white">
                送出
              </button>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { Field, Form, ErrorMessage } from 'vee-validate'

const { VITE_URL } = import.meta.env

export default {
  data() {
    return {
      user: {
        username: '', // 取得email欄位的值
        password: '' // 取得password欄位的值
      }
    }
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage
  },
  methods: {
    login() {
      this.$http
        .post(`${VITE_URL}v2/admin/signin`, this.user)
        .then((res) => {
          console.log('login', res)
          const {expired, token} =res.data
          

          // 將 token 和 expired 存到 cookie 裡
          document.cookie = `loginToken=${token}; expires=${new Date(expired)};`;


          this.$router.push('/admin')
        })
        .catch((err) => {
          const errMessage = err.response.data.message
          Swal.fire({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 2000,
            title: `<h6 class="mb-0" style="color:white;">${errMessage}，請檢查帳號密碼是否正確</h6>`,
            background: '#FF3D33'
          })
        })
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.login_wrapper {
  padding: 40px 15px;
  min-height: 100vh;
  background: url('../assets/img/products_banner.jpg') no-repeat center center;
  background-size: cover;
}

.login.container {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
}

.login > .row {
  padding: 30px 0 70px;
}

.login_logo {
  text-align: center;
  padding: 12px;
}

.login_h5 {
  background: white;
  padding: 8px 0;
  border-radius: 8px;
}

/* VForm */
.form-group {
  padding: 10px 0;
  border-bottom: 2px solid white;

  &:nth-child(2) {
  border: 0;
}
}


.label_style {
  padding: 10px 0 0;
}

.invalid_feedback {
  color: #ff3d33;
}

@media screen and (min-width: 576px) {
  .login.container {
    max-width: 560px;
  }
}

@media screen and (min-width: 992px) {
  .login.container {
    max-width: 768px;
  }

  img.logo_img {
    width: 200px;
  }
}
</style>