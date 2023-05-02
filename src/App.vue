<template>
  <RouterView />
</template>


<script>
import {  RouterView } from 'vue-router'

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      
    }
  },
  components: {RouterView},

  mounted() {  
  }
}
</script>


<style scope></style>
