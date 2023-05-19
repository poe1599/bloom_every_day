<script>
export default {
  props: ['pages'],
  emits: ['change-page'],
  data() {
    return {
     
    }
  },
  
}
</script>

<template>
  <nav aria-label="Page navigation example" class="nav_block">
    <ul class="pagination justify-content-center">

      <li class="page-item" :class="{disabled: !pages.has_pre}">
        <a class="page-link" href="#" aria-label="Previous"
        @click.prevent="$emit('change-page',pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li class="page-item" 
      v-for="page in pages.total_pages" :key="page+'page'"
      :class="{active: page===pages.current_page }"
      >
        <a class="page-link" href="#"
        @click.prevent="$emit('change-page', page)"
        >{{page}}</a>
        <!-- $emit 事件去觸發父元件的 getProducts 函式 -->
      </li>
      
      <li class="page-item" :class="{disabled: !pages.has_next}">
        <a class="page-link" href="#" aria-label="Next"
        @click.prevent="$emit('change-page',pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>



<style lang="scss" scoped>
.nav_block {
  padding: 12px 0 50px 0;
}

/* 客製 pagination style */
.pagination {
  --bs-pagination-color: #121212;
  --bs-pagination-border-color: #f2e7e8;
  --bs-pagination-hover-color: white;
  --bs-pagination-hover-bg: #ff3d33;
  --bs-pagination-hover-border-color: #f2e7e8;
  --bs-pagination-focus-box-shadow: none;
}

.page-link.active,
.active > .page-link {
  background-color: #ff3d33;
  border-color: #f2e7e8;
}
</style>