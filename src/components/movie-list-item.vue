<template>
    <component :is="isSlide?'swiper-slide':'div'"
               class="movie-item"
    >
        <router-link
                :to="to"
        >
            <div class="img-wp">
                <img
                        ref="img"
                        v-lazy="item.images.small"
                        alt=""
                        :key="updated"
                >
            </div>

            <div class="info">
                <p>{{ item.title }}</p>
                <p
                        :class="['rating',{'none': !item.rating.average}]"
                >
                    {{ item.rating.average ? item.rating.average.toFixed(1) : '暂无评分' }}
                </p>
            </div>
        </router-link>
    </component>
</template>

<script>
import {swiperSlide} from 'vue-awesome-swiper'

export default {
  name: 'movie-item',
  props: {
    item: {
      required: true,
      type: Object
    },
    index: {
      required: true,
      type: Number
    },
    updated: {
      default: false,
      type: Boolean
    },
    to: {
      default: '',
      type: String
    },
    isSlide: {
      default: false,
      type: Boolean
    }
  },
  components: {
    swiperSlide
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
    .movie-item {
        display: block;
        width: 100%;
        a {
            display: inline-block;
            color: #333;
            text-decoration: none;
            width: 100%;
            .img-wp {
                position: relative;
                overflow: hidden;
                &::before{
                    content: '';
                    display: block;
                    padding-top: 143%;
                }
                img {
                    display: block;
                    width: 100%;
                    min-height: 100%;
                    position: absolute;
                    top: -100%;
                    left: -100%;
                    right: -100%;
                    bottom: -100%;
                    margin: auto;
                    filter: opacity(0);
                    transition: filter 0.5s ease-in-out;
                    &[lazy=loaded] {
                        filter: opacity(100%);
                    }
                    &.update {
                        filter: opacity(0);
                    }
                }
            }
            .info {
                p {
                    padding-top: 2px;
                    font-size: 1.2em;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-align: left;
                    &.rating {
                        font-weight: normal;
                        font-size: 1em;
                        color: gray;
                        text-align: left;
                    }
                }
            }

        }
    }
</style>
