<template>
  <div id="app">
    <Header :seller="seller"></Header><!--这里的冒号是v-bind的缩写-->
    <div class="tab">
      <div class="tab-item">
        <router-link to='/goods' class="tab-item-text">商品</router-link><!--https://router.vuejs.org/zh/guide/essentials/named-routes.html-->
      </div>
      <div class="tab-item">
        <router-link to='/ratings' class="tab-item-text">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/seller' class="tab-item-text">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view><!--这里把seller传递到goods组件，和上面把seller传入header一个道理，可以看看这个https://blog.csdn.net/qq_22317389/article/details/80391176-->
  </div>
</template>

<script>
import {urlParse} from './common/js/util'
import Header from './components/header/header'
import axios from 'axios'

export default {
  components: {
    Header
  }, // component和components的区别
  name: 'APP',
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      }// 定义seller为一个对象，因为data.json文件里面seller是对象
    }
  },
  methods: {
    getData () {
      axios.get('../static/mock/data.json?id=' + this.seller.id).then(this.getDataInfo)
    },
    getDataInfo (res) {
      this.seller = res.data.seller // res就是返回的全部信息,res.data返回data.json文件里面的全部数据
    }// 给seller对象赋上res.data.seller的值
  },
  mounted () {
    this.getData()
  }
}
</script>

<style>
.tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 0.5px solid rgba(7,17,27,0.1);
  }
.tab-item{
  flex: 1;
  text-align: center;
    }
.tab-item-text{
  display: block;
  text-decoration: none;
  font-size: 14px;
  font-weight: 350;
  color: rgb(77,85,93);
}
.is-active{
  color: rgb(240, 20, 20);
}
</style>
