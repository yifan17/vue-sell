<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li class="menu-item" v-for="(good, index) in goods" :key="index">
          <span class="text border-1px">
            <span class="icon" v-if="good.type>=0" :class="classMap[good.type]"></span>
            {{good.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">

    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then((res) => {
      res = res.body
      const ERR_OK = 0
      if(res.errno === ERR_OK) {
        this.goods = res.data
      }
    })
  }
}
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  @import './goods.styl'
</style>
