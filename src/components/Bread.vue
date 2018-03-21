<template>
    <div>
      <div class="nav-breadcrumb-wrap">
        <div class="container">
          <nav class="nav-breadcrumb">
            <a href="/">主页</a>
            <slot></slot>
          </nav>
        </div>
      </div>
    </div>
</template>
<style>
  .nav-breadcrumb-wrap{
    margin-top: 80px;
  }
</style>
<script>

    export default {
        data() {
            return {
                msg: 'hello vue'
            }
        }
    }
</script>
