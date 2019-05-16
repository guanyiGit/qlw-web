<template>
  <!--wrap-->
  <div class="wrap pdt115">
    <router-view></router-view>
  </div>
</template>

<script>

  import '../static/css/common.css'
  import '../static/css/swiper.css'
  import '../static/css/css.css'

  export default {
    name: 'App'
  }
</script>
<style>
  .curpoint {
    cursor: pointer;
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
    height: 41px;
  }

  .w980 .mbx {
    margin-bottom: 15px;
    font-size: 15px;
  }

  .w980 .mbx a:hover {
    color: #3556CC;
    cursor: pointer;
  }
  .el-pagination__editor.el-input .el-input__inner{
    height: 21px;
    width: 40px;
  }
</style>
