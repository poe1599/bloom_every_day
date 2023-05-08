<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid d-flex">
      <a class="navbar-brand" href="#">
        <img src="../assets/img/Logo.svg " alt="" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        @click="navToggle"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav" ref="navContent">
        <ul class="navbar-nav text-center">
          <li class="nav-item">
            <RouterLink
              to="/admin/articles"
              class="nav-link"
              aria-current="page"
              @click="closeToggle"
              >文章</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/products" class="nav-link" @click="closeToggle">商品</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/orders" class="nav-link" @click="closeToggle">訂單</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" @click="logout">登出</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { RouterLink } from 'vue-router'
export default {
  data() {
    return {}
  },
  components: {
    RouterLink
  },
  methods: {
    navToggle() {
      this.navContent.toggle()
    },

    closeToggle() {
      this.navContent.hide()
    },

    // 管理者登出
    logout(){
      document.cookie = `loginToken=; expires=${new Date()};`;
    }
  },
  mounted() {
    this.navContent = new bootstrap.Collapse(this.$refs.navContent)
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

.nav-link {
  color: #121212;
}

a.nav-link.active {
  color: #ff3d33;
}

a.nav-link:not(.nav-link.active):hover {
  color: #ff3d33;
}
</style>