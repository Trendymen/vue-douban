<template>
    <div class="home-movie-list-pane">
        <p class="list-title">
            <span><slot name="title"></slot></span>
            <button @click="$store.commit('changeCity',{city:'怀化'})">change city</button>
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
        padding: 7px 0;
        border-top: 1px solid gainsboro;
        font-weight: bold;
        .list-title {
            .more {
                margin-left: auto;
                color: #2aac5e;
                text-decoration: none;
            }
            display: flex;
            position: relative;
            padding-left: 10px;
            margin: 0 7px 7px 0;
            &::before {
                position: absolute;
                display: block;
                left: 0;
                content: "";
                width: 6.67px;
                height: 100%;
                background-color: #2aac5e;
            }
        }

        .movie-list {
            $width: 100px;
            height: $width*1.43 + 39px;
            .horizontal {
                width: $width;
                margin-right: 2vmin;
                &:first-child {
                    margin-left: 2vmin;
                }
            }
            .vertical {
            }
        }

    }
</style>
