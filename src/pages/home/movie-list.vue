<template>
    <div class="home-movie-list-pane">
        <p class="list-title">
            <span><slot name="title"></slot></span>
            <router-link
                    class="more"
                    :to="{name : 'movies-explore' , params : {type}}"
            >
                更多
            </router-link>
        </p>
        <swiper
                :options="swiperOption"
                class="movie-list"
        >
            <movie-list-item
                    class="horizontal"
                    v-for="(item,index) in list"
                    :item="item"
                    :index="index"
                    :key="item.title"
                    :updated="updated"
                    :to="`/movie-detail/${ index }`"
                    :is-slide="true"
            />
        </swiper>
    </div>
</template>

<script>
import {swiper} from 'vue-awesome-swiper'
import movieListItem from '../../components/movie-list-item'
import {mapState, mapActions} from 'vuex'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'home-movie-list',
  props: {
    type: {
      required: true,
      type: String
    }
  },
  data: function () {
    return {
      updated: true,
      swiperOption: {
        slidesPerView: 'auto',
        touchMoveStopPropagation: true,
        freeMode: true,
        mousewheel: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  computed: {
    ...mapState('movieRatingList', {
      list: function (state) {
        return state[this.type].slice(0, 10)
      }
    }),
    ...mapState({city: 'city'})
  },
  components: {
    swiper,
    movieListItem
  },
  methods: {
    ...mapActions('movieRatingList', ['getRatingList']),
    getList (params) {
      return this.getRatingList({type: this.type, ...params})
    },
    refreshFade () {
      this.updated = false
      this.$nextTick(() => {
        this.updated = true
      })
    }
  },
  created () {
    this.getList()
    console.log(this)
  },
  watch: {
    async city (to, from) {
      if (this.type === 'in_theaters' && from !== undefined) {
        console.log(to, from)
        await this.getList({refresh: true})
        this.refreshFade()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .home-movie-list-pane {
        color: #333;
        &:not(:last-child) {
            border-bottom: $divide-line;
        }
        .list-title {
            * {
                font-size: 1.2em
            }
            display: flex;
            position: relative;
            padding: {
                top: 0.5em;
                bottom: 0.5em;
            }
            //@include padding;
            @media only screen and (max-width: 950px) {
                padding: {
                    left: 16px;
                    right: 16px;
                }
            }
            span {
            }
            .more {
                margin-left: auto;
                color: #2aac5e;
                text-decoration: none;
            }
            /*&::before {*/
            /*position: absolute;*/
            /*display: block;*/
            /*left: 0;*/
            /*content: "";*/
            /*width: 6.67px;*/
            /*height: 100%;*/
            /*background-color: #2aac5e;*/
            /*}*/
        }

        .movie-list {
            $width: 100px;
            height: $width*1.43 + 42px;
            .movie-item {
                width: $width;
                margin-right: 2vmin;
                &:first-child {
                    margin-left: 16px;
                }
                &:last-child {
                    margin-right: 16px;
                }
            }
        }

    }
</style>
