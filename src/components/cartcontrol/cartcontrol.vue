<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: Object
  },
  created() {
    console.log(this.food)
  },
  computed: {

  },
  methods: {
    addCart(event) {
      // 解决在pc端点击会触发两下的bug
      if(!event._constructed) {
        return
      }
      // 这里点击加界面并不实时改变,因为count并不是原数据有的
      // Vue.set( target, key, value )/target：要更改的数据源(可以是对象或者数组)/key：要更改的具体数据/value ：重新赋的值
      if(!this.food.count) {
        Vue.set(this.food, 'count', 1)
      }else{
        this.food.count++
      }
    },
    decreaseCart(event) {
      if(!event._constructed) {
        return
      }
      if(this.food.count > 0) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './cartcontrol.styl'
</style>
