<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index">
      {{index}}
    </span>
  </div>
</template>

<script>
const LENGTH = 5
const MAX_SCORE = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      let result = [] // 星星存放
      let score =
        this.score > MAX_SCORE ? MAX_SCORE : Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0 // 检测有没有小数
      let integer = Math.floor(score) // 取出整数
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while(result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import './star.styl'
</style>
