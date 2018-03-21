<template>
  <div class="wrap">
        <div class="total_goods">
            <span>12323</span>
            <i class="el-icon-goods"></i>商品总数
        </div>
        <div class="total_orders">
            <span>34545</span>
            <i class="el-icon-tickets"></i>订单总数
        </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.wrap {
  height: 100%;
  padding: 30px 5% 0;
}
.total_goods,
.total_orders {
  float: left;
  width: 44%;
  padding: 30px 0;
  background-color: aqua;
  text-align: center;
  font-size: 18px;
  color:#fff;
  cursor: pointer;
}
.total_orders {
  float: right;
  background-color: blueviolet;
}
.total_goods span,
.total_orders span {
    display: block;
    margin-bottom: 10px;
    font-size: 50px;
}
.total_goods:hover,
.total_orders:hover {
    text-decoration: none;
    color: #333;
    transform: scale(1.08);
    transition: all .3s;
}
@media only screen and (max-width: 991px){
    .total_goods,
    .total_orders {
        width: 100%;
        padding: 30px 0;
        background-color: aqua;
        text-align: center;
        font-size: 18px;
    }
    .total_orders {
        background-color: blueviolet;
    }
}
</style>
