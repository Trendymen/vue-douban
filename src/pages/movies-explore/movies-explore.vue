<template>
    <div class="wrapper">
        <div class="movies-explore-wrapper">
            <!--<ul class="movie-list">-->
            <!--<movie-list-item-->
            <!--class="movie-item"-->
            <!--v-for="(item,index) in list"-->
            <!--:key="item.title"-->
            <!--:item="item"-->
            <!--:index="index"-->
            <!--:to="`/movie-detail/${ index }`"-->
            <!--&gt;-->
            <!--</movie-list-item>-->
            <!--</ul>-->
            <el-row
                    class="movie-list"
                    :gutter="25"
                    tag="ul"
            >
                <el-col
                        class="movie-item"
                        v-for="(item,index) in list"
                        :key="item.title"
                        :xs="8"
                        :sm="6"
                        :md="4"
                        tag="li"
                >
                    <movie-list-item
                            :item="item"
                            :index="index"
                            :to="`/movie-detail/${ index }`"
                    />
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import fakeSearch from '../../components/fake-search'
import movieListItem from '../../components/movie-list-item'
import {mapState, mapActions} from 'vuex'

function changeDataOnReuse (ctx, propsObj) {
  console.log(ctx.$data, propsObj)
  Object.assign(ctx.$data, propsObj)
}

function firstLoad (ctx, {...propsObj}) {
  changeDataOnReuse(ctx, propsObj)
  const len = ctx.list.length
  len < 20 && ctx.getList({count: 20 - len})
}

export default {
  props: {},
  name: 'movies-explore',
  components: {
    fakeSearch,
    movieListItem
  },
  data () {
    return {
      updated: false,
      type: null
    }
  },
  computed: {
    ...mapState(`movieRatingList`, {
      list: function (state) {
        return state[this.type]
      }
    })
  },
  methods: {
    ...mapActions('movieRatingList', ['getRatingList']),
    getList (params) {
      return this.getRatingList({type: this.type, ...params})
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      firstLoad(vm, {type: to.params.type})
    })
  },
  beforeRouteUpdate (to, from, next) {
    firstLoad(this, {type: to.params.type})
    next()
  }
}
</script>

<style lang="scss" scoped>
    .wrapper {
        padding: 0 4%;
        .movies-explore-wrapper {
            height: 100%;
            overflow: hidden;
            .movie-list {
                list-style: none;
                .movie-item {
                    /*display: inline-block;*/
                    /*width: 33.33%;*/
                    /*box-sizing: border-box;*/
                    /*padding-left: 4%;*/
                    /*padding-right: 4%;*/
                    /*margin-top: 2%;*/
                    /*@media screen and (min-width: 600px) {*/
                    /*width: 25%;*/
                    /*}*/
                    &.el-col-xs-8 {
                        @media only screen and (max-width: 600px) {
                            width: 33.33333%;
                        }
                    }
                    &.el-col-sm-6 {
                        @media only screen and (min-width: 600px) and (max-width: 768px) {
                            width: 25%;
                        }
                    }
                    &:last-child {
                    }
                }
            }
        }
    }
</style>
