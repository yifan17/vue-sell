<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo">
              <span class="icon-shopping_cart"></span>
            </div>
            <div class="num">{{totalCount}}</div>
          </div>
          <div class="price">¥{{totalPrice}}</div>
          <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay">
            ¥20元起送
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return []
      }
    },
    minPrice: {
      type: Number,
      default: 0
    },
    deliveryPrice: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './shopcart.styl'
</style>
