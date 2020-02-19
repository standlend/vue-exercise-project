<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      tpye: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  data () {
    return {
      typeSelected: this.selectType, // 重新把selectType赋值给一个属性而不直接用的原因是vue2.0一个父组件更新，子组件中的prop值也会更新，但子组件不能修改由父组件传递过来的值
      contOnly: this.onlyContent // 重新把onlyContent赋值给一个属性而不直接用的原因是vue2.0一个父组件更新，子组件中的prop值也会更新，但子组件不能修改由父组件传递过来的值
    }
  },
  computed: {
    positives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negatives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    select (type, event) {
      if (!event._constructed) {
        return
      }
      this.typeSelected = type
      this.$emit('change', type)
    },
    toggleContent (event) {
      if (!event._constructed) {
        return
      }
      this.contOnly = !this.contOnly
      this.$emit('toggle', this.contOnly)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .ratingselect{
    .rating-type{
      padding: 18px 0;
      margin: 0 18px;
      border-1px(rgba(7,17,27,0.1));
      font-size: 0;
      .block{
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        line-height: 16px;
        border-radius: 1px;
        font-size: 12px;
        color: rgb(77,85,93);
        &.active{
          color: #fff;
        }
        .count{
          margin-left: 2px;
          font-size: 8px;
        }
        &.positive{
          background: rgba(0,160,220,0.2);
          &.active{
            background: rgb(0,160,220);
          }
        }
        &.negative{
          background: rgba(77,85,83,0.2);
          &.active{
            background: rgb(77,85,93);
          }
        }
      }
    }
    .switch{
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      color: rgb(147,153,159);
      font-size: 0;
      &.on{
        .icon-check_circle{
          color: #00c850;
        }
      }
      .icon-check_circle{
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        font-size: 24px;
      }
      .text{
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
      }
    }
  }
</style>
