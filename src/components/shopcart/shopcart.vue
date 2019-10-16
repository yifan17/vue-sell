<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <!-- :class="[totalPrice > minPrice ? 'enough': 'notenough']" -->
          <div class="pay" :class="payClass">
            {{payDesc}}
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
      // 在vue里面，如果传值是个array或者object，那么default是个函数
      type: Array,
      default() {
        return [
          {price: 10, count: 1},
          {price: 10, count: 2}
        ]
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
  },
  computed: {
    // 总价展示
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    // 选择商品数量展示
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    // 底边右侧按钮样式控制
    payDesc() {
      if(this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`
      }else if(this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差¥${diff}元起送`
      }else {
        return `去结算`
      }
    },
    // 结算按钮的样式控制
    payClass() {
      if(this.totalPrice < this.minPrice) {
        return 'not-enough'
      }else {
        return 'enough'
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './shopcart.styl'
</style>
