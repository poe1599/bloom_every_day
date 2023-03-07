<template>
  <div class="layout">
    <!--最外層-->
    <!-- header -->
<div id="header">
    <div class="container">
        <div class="navbar d-flex justify-content-between">
            <div class="logo align-self-start" style="width:133px;">
                <img src="../assets/img/Logo.svg " alt="" class="logo_img">
            </div>

            <ul class="nav_ul d-flex align-self-end">
                <li><a class="nav_link" href="">首頁</a></li>
                <li><a class="nav_link" href="">最新消息</a></li>
                <li><a class="nav_link" href="">所有商品</a></li>
                <li><a class="nav_link" href="">購物車 </a></li>
            </ul>
        </div>
    </div>
</div>
    <div class="layout_content">
      <!--除 header & footer 外的內容區-->
      <RouterView></RouterView>
    </div>
    <!-- footer -->
  </div>
</template>

<style lang="scss" scoped>

.nav_ul{
    display: none;
}

@media screen and (min-width:768px){
.nav_ul{
    display: block;
}
}


.layout {
  width: 100%;
  min-height: 100vh;
}


.nav_link{
  display: block;
  padding: 8px 24px;
  color:#121212;
}

.nav_link:hover{
    color: #FF3D33
}

.layout_content {
  margin: auto;
  max-width: 1296px;
}



</style>


<script>
import { RouterView, RouterLink } from 'vue-router'

export default {}
</script>