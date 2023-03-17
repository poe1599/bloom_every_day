<template>
  <div class="layout">
    <!--最外層-->
    <!-- header -->
    <div id="header">
      <div class="navbar d-flex justify-content-between">
        <div class="container">
          <div class="logo align-self-start" style="width: 133px">
            <RouterLink to="/" class="logo_link" style="display:block;"><img src="../assets/img/Logo.svg " alt="" class="logo_img" /></RouterLink>            
          </div>

          <ul class="nav_ul">
            <li><RouterLink class="nav_link" to="/">首頁</RouterLink></li>
            <li><RouterLink class="nav_link" to="/news">最新消息</RouterLink></li>
            <li><RouterLink class="nav_link" to="/">所有商品</RouterLink></li>
            <li><RouterLink class="nav_link" to="/">購物車 </RouterLink></li>
          </ul>
          <div class="nav_menu" @click="toggleMenu">
            <div v-if="!isOpen">
              <img src="../assets/icon/IconMenu.svg" alt="" />
            </div>

            <div class="menu_close" v-else><img src="../assets/icon/IconClose.svg" alt="" /></div>
            
          </div>
        </div>
      </div>

      <div class="mobile_menu text-center" :class="{ show: isOpen }">
        <ul>
          <li class="py-3"><RouterLink class="mobile_nav" to="/">首頁</RouterLink></li>
          <li class="py-3"><RouterLink class="mobile_nav" to="/news">最新消息</RouterLink></li>
          <li class="py-3"><RouterLink class="mobile_nav" to="/">所有商品</RouterLink></li>
          <li class="py-3"><RouterLink class="mobile_nav" to="/">購物車 </RouterLink></li>
        </ul>
      </div>
    </div>
    <div class="layout_content">
      <!--除 header & footer 外的內容區-->
      <RouterView></RouterView>
    </div>
    <!-- footer -->
    <div id="footer">
      <div class="footer d-flex justify-content-between container">
        <div class="copyright" style="color: #f6f6f6">日日是好日 @ Copyright | Kris</div>
        <div class="social_media d-flex justify-content-between">
          <a href="" class="fb">
            <i class="bi bi-facebook" style="color: white"></i>
          </a>

          <a href="" class="ig" style="color: white">
            <i class="bi bi-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  position: relative;
  padding: 12px;
}

.nav_ul {
  display: none;
}

.nav_menu {
  height: 48px;
  width: 48px;
  cursor: pointer;
}

.nav_menu img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mobile_menu {
  display: none;
  position: absolute;
  width: 100%;
  top: 68px;
  z-index: 2;
  background: white;
  height: 300px;
}

.mobile_menu.show {
  display: block;
}

a.mobile_nav {
  display: block;
  color: #121212;
}

.mobile_nav:hover {
  color: #ff3d33;
}

#footer {
  background-color: #ff3d33;
  padding: 24px 12px;
}

.footer {
  padding: 0;
}

.fb {
  margin-right: 8px;
}

@media screen and (min-width: 576px) {
  // 576px 以上
  .nav_ul {
    display: flex;
    align-self: flex-end;
  }

  .nav_link {
    display: block;
    padding: 0.5rem;
    color: #121212;
  }

  .nav_menu {
    display: none;
  }

  .mobile_menu {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .nav_link {
    padding: 0.5rem 1.5rem;
  }

  #footer {
    background-color: #ff3d33;
    padding: 36px;
  }

  .fb {
    margin-right: 28px;
  }
}

.layout {
  width: 100%;
  min-height: 100vh;
}

.nav_link:hover {
  color: #ff3d33;
}

.layout_content {
  margin: auto;
  //   max-width: 1296px;
}
</style>


<script>
import { RouterView, RouterLink } from 'vue-router'

export default {
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    }
  },
  components: {
    RouterView,
    RouterLink
  }
}
</script>