<script>
export default {
  props: ['pages'],
  data() {
    return {}
  }
}
</script>

<template>
  {{ pages }}
  <nav aria-label="Page navigation example" class="nav_block">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      
      <li class="page-item" v-for="page in pages.total_pages" :key="page">
        <a class="page-link" href="#">{{page}}</a>
      </li>
      
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
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
</style>