<template>
  <div class="layout">
    <!--最外層-->
    <!-- header -->
    <div id="header">
      <div class="navbar d-flex justify-content-between">
        <div class="container">
          <div class="logo align-self-start" style="width: 133px">
            <RouterLink to="/" class="logo_link" style="display: block"
              ><img src="../assets/img/Logo.svg " alt="" class="logo_img"
            /></RouterLink>
          </div>

          <ul class="nav_ul">
            <li><RouterLink class="nav_link" to="/">首頁</RouterLink></li>
            <li><RouterLink class="nav_link" to="/news">最新消息</RouterLink></li>
            <li><RouterLink class="nav_link" to="/products">所有商品</RouterLink></li>
            <li>
              <RouterLink class="nav_link" to="/cart">
                <i class="bi bi-cart3 nav_cart pc_cart_btn position-relative">
                  <span class="position-absolute badge rounded-pill bg-danger pc_badge">
                    {{ carts.length }}
                  </span>
                </i>
              </RouterLink>
            </li>
          </ul>

          <RouterLink class="cart_icon" to="/cart">
            <i class="bi bi-cart3 position-relative mobile_cart_btn">
              <span class="position-absolute badge rounded-pill bg-danger mobile_badge">
                {{ carts.length }}
              </span>
            </i>
          </RouterLink>

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
          <li class="py-3">
            <RouterLink class="mobile_nav" to="/" @click="changePage">首頁</RouterLink>
          </li>
          <li class="py-3">
            <RouterLink class="mobile_nav" to="/news" @click="changePage">最新消息</RouterLink>
          </li>
          <li class="py-3">
            <RouterLink class="mobile_nav" to="/products" @click="changePage">所有商品</RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="layout_content">
      <!--除 header & footer 外的內容區-->
      <RouterView></RouterView>
    </div>
    <!-- footer -->
    <div id="footer">
      <div class="footer container">
        <div class="social_media">
          <a href="" class="fb">
            <i class="bi bi-facebook" style="color: white"></i>
          </a>

          <a href="" class="ig" style="color: white">
            <i class="bi bi-instagram"></i>
          </a>

          <RouterLink to="/login" style="color: white">
            <i class="bi bi-door-open"></i>
          </RouterLink>
        </div>

        <div class="copyright" style="color: #f6f6f6">日日是好日 @ Copyright | Kris</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  position: relative;
  padding: 12px;
}

.navbar > .container {
  padding: 0;
}

.nav_ul {
  display: none;
}

.nav_cart {
  display: block;
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

.cart_icon {
  position: absolute;
  right: 90px;
  color: #121212;
}

.cart_icon > i.mobile_cart_btn {
  display: block;
  font-size: 26px;
}

i.mobile_cart_btn {
  font-style: normal;
}

.mobile_badge {
  font-size: 10px;
  top: -4px;
  right: -12px;
}

.mobile_menu {
  display: none;
  position: absolute;
  width: 100%;
  top: 68px;
  z-index: 2;
  background: white;
  height: 210px;
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

.layout_content {
  height: 100%;
  min-height: 100vh;
}

#footer {
  background-color: #ff3d33;
  padding: 24px 12px;
  top: 100%;
  position: sticky;
}

.footer {
  padding: 0;
}

.social_media {
  display: flex;
  justify-content: space-around;
  margin-bottom: 8px;
}

.social_media > a {
  margin-right: 8px;
}

.social_media>a:last-child{
  margin-right: 0;
}

.copyright {
  text-align: center;
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

  .cart_icon {
    display: none;
  }

  .mobile_menu {
    display: none;
  }

  i.pc_cart_btn {
    font-style: normal;
  }

  .pc_badge {
    top: -6px;
    right: -10px;
    font-size: 10px;
  }

  .footer {
    display: flex;
    justify-content: space-between;
  }

  .copyright {
    order: 1;
  }

  .social_media {
    margin-bottom: 0;
    order: 2;
  }

  .social_media > a {
    margin-right: 12px;
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
}
</style>


<script>
import { RouterView, RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import cartStore from '../stores/cartStore.js'

export default {
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },

    changePage() {
      this.isOpen = false
    },

    ...mapActions(cartStore, ['getCarts'])
  },
  components: {
    RouterView,
    RouterLink
  },
  computed: {
    ...mapState(cartStore, ['carts'])
  },

  mounted() {
    this.getCarts()
  }
}
</script>