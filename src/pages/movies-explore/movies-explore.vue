<template>
    <v-layout column class="container">
        <h1 class="title">{{typeName[type]}}</h1>
        <div
                v-infinite-scroll="getList"
                :infinite-scroll-disabled="false"
                infinite-scroll-distance="20"
                infinite-scroll-immediate-check="false"
        >
            <v-container
                    class="movies-explore-wrapper"
                    fluid
                    v-bind="{[`grid-list-${$vuetify.breakpoint.width>1264?$vuetify.breakpoint.name:'lg'}`]:true}"
            >
                <v-layout row wrap
                          class="movie-list"
                          tag="ul"
                          fluid
                >
                    <v-flex
                            class="movie-item"
                            v-for="(item,index) in list"
                            :key="item.title"
                            xs4
                            sm3
                            md2
                            tag="li"
                    >
                        <movie-list-item
                                :item="item"
                                :index="index"
                                :to="`/movie-detail/${ index }`"
                        />
                    </v-flex>
                </v-layout>
                <p class="text-xs-center always-loading">loading...</p>
            </v-container>
        </div>
    </v-layout>
</template>

<script>

import fakeSearch from '../../components/fake-search'
import movieListItem from '../../components/movie-list-item'
import {mapState, mapActions} from 'vuex'

function changeDataOnReuse (ctx, propsObj) {
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
      loading: {},
      type: null,
      typeName: {'in_theaters': '正在热映', 'coming_soon': '即将上映'}
    }
  },
  computed: {
    ...mapState(`movieRatingList`, {
      list (state) {
        return state[this.type]
      }
    })
  },
  beforeCreate () {
  },
  created () {
  },
  methods: {
    ...mapActions('movieRatingList', ['getRatingList']),
    getList (params) {
      if (!this.loading[this.type]) {
        this.loading[this.type] = true
        this.getRatingList({type: this.type, ...params}).then(({isEnd}) => {
          this.loading[this.type] = isEnd
        })
      }
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
    .container {
        padding: {
            top: 0;
            bottom: 0;
        }
        .title {
            padding: 16px 0;
        }
        .movies-explore-wrapper {
            padding: 0;
            .movie-list {
                list-style: none;
                .movie-item {

                }
            }
            .always-loading{
              font-size: 1.5rem;
            }
        }
    }
</style>
