<template>
  <div class="layout">
    <!--最外層-->
    <!-- header -->
    <div id="header">
      <div class="navbar d-flex justify-content-between">
        <div class="container">
          <div class="logo align-self-start" style="width: 133px">
            <img src="../assets/img/Logo.svg " alt="" class="logo_img" />
          </div>

          <ul class="nav_ul">
            <li><a class="nav_link" href="">首頁</a></li>
            <li><a class="nav_link" href="">最新消息</a></li>
            <li><a class="nav_link" href="">所有商品</a></li>
            <li><a class="nav_link" href="">購物車 </a></li>
          </ul>
          <div class="nav_menu"> <!--@click="openMobileMenu"-->
            <span class="menu_span span1"></span>
            <span class="menu_span span2"></span>
            <span class="menu_span span3"></span>
          </div>
        </div>
      </div>

      <div class="mobile_menu text-center">
        <ul>
            <li class="py-3"><a class="mobile_nav" href="">首頁</a></li>
            <li class="py-3"><a class="mobile_nav" href="">最新消息</a></li>
            <li class="py-3"><a class="mobile_nav" href="">所有商品</a></li>
            <li class="py-3"><a class="mobile_nav" href="">購物車 </a></li>
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
            <div class="copyright" style="color: #F6F6F6;">日日是好日 @ Copyright | Kris</div>
            <div class="social_media d-flex justify-content-between">
                <a href="" class="fb">
                    <i class="bi bi-facebook" style="color: white;"></i>
                </a>

                <a href="" class="ig" style="color: white;">
                   <i class="bi bi-instagram"></i>
                </a>
            </div>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar{
    position: relative;
    padding: 10px;
}

.nav_ul {
  display: none;
}

.nav_menu{
    display: flex;
    height: 25px;
    flex-direction: column;
    justify-content: space-between;
}

.menu_span{
    display: block;
    width: 2rem;
    height: 1px;
    background: #FF3D33;
}


.mobile_menu{
   position: absolute;
   width: 100%;
   top: 98px;
}

.mobile_nav{
    display: none;
    // display: block;  //記得改回block
    color: #121212; 
}

.mobile_nav:hover {
  color: #ff3d33;
}

#footer{
    background-color: #ff3d33;
    padding: 24px 12px;
}

.footer{
  padding: 0;
}

.fb{
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

  .mobile_menu{
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .nav_link {
    padding: 0.5rem 1.5rem;
  }

  #footer{
    background-color: #ff3d33;
    padding: 36px;
}

  .fb{
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
    components:{
        RouterView,
    }
}
</script>