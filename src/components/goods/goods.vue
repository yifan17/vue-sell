<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" v-for="(good, index) in goods"
            :key="index" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span class="icon" v-if="good.type>=0" :class="classMap[good.type]"></span>
            {{good.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="food-list food-list-hook" :key="index">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item border-1px" v-for="(food, index) in item.foods" :key="index">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span>好评率:{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food = "food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 购物车 -->
  <shopcart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice"
            :minPrice="seller.minPrice"></shopcart>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from 'components/cartcontrol/cartcontrol'
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  computed: {
    // 获取右侧当前展示商品的index，然后和template循环的index做比较，相等增加current属性
    currentIndex() {
      for(let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods() {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if(food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },

  created() {
    // 这里面一般调接口
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then((res) => {
      res = res.body
      if(res.errno === ERR_OK) {
        this.goods = res.data
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
  },
  methods: {
    // 这里面一般写函数方法
    // 点击左侧menu右侧滚动
    selectMenu(index, event) {
      // 浏览器原生点击事件没有_constructed属性，这样设置可以解决在pc端点击的时候会点击两次的问题
      if(!event._constructed) {
        return
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    // selectFood() {
    //   this.selectedFood = food
    //   this.$refs.food.show();
    // },
    // 页面滚动
    _initScroll() {
      // $refs取得dom对象
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })

      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3 // 希望在滚动的时候告诉我们滚动的位置/1:及时触发/3:为延迟到事件完毕后触发
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    // 计算右侧的高度
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for(let i = 0; i < foodList.length; i++) {
        // 获取li的高度，放入数组里
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  components: {
    shopcart,
    cartcontrol
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './goods.styl'
</style>
