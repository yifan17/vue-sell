<template>
  <div id="app">
    <div class="header">
      <Header :seller="seller"></Header>
    </div>
    <div class="tab">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <div class="content">
      <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>
<script>
import Header from './components/header/header.vue'
export default {
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this.$http.get('/api/seller').then((res) => {
      res = res.body
      const ERR_OK = 0
      if(res.errno === ERR_OK) {
        this.seller = res.data
      }
    })
  },
  components: {
    Header
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixin.styl';
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          font-size: 14px
          color: rgb(77,85,93)
          &.active
            color: rgb(240,20,20)
</style>
