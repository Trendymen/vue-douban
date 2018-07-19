<template>
    <header
            class="navigator"
            ref="navigator"
            :class="{fixed:isFixed}"
            v-sticky="{zIndex:999,stickyTop:0,disabled:false}"
    >
        <div class="sticky-wrapper">
            <a
                    v-if="$route.name !== 'home'"
                    @click="back"
            >
                {{$route.name !== 'home'?'返回':''}}
            </a>
            <span v-else></span>
            <h1 class="title">
                豆瓣电影
            </h1>
            <a></a>
        </div>
    </header>
</template>

<script>
import fakeSearch from './fake-search'
import vueSticky from 'vue-sticky'
import {mapState} from 'vuex'

export default {
  name: 'nav-header',
  data () {
    return {
      isFixed: false
    }
  },
  components: {
    fakeSearch
  },
  computed: {
    ...mapState(['backUrl'])
  }
  ,
  methods: {
    searchFade () {
      if (window.IntersectionObserver) {
        console.log(IntersectionObserver)
        new IntersectionObserver((entries, observer) => {
          const ratio = entries[0].intersectionRatio
          this.isFixed = ratio < 36 / 66
        }, {threshold: 36 / 66}).observe(this.$refs.navigator)
      }
    },
    back () {
      this.backUrl ? this.$router.push({path: this.backUrl}) : this.$router.go(-1)
    }
  },
  beforeCreate () {

  },
  mounted () {
    // this.searchFade()
  },
  directives: {
    sticky: vueSticky
  }
}
</script>

<style lang="scss" scoped>
    .navigator {
        /*position: sticky;*/
        color: white;
        .sticky-wrapper {
            display: flex;
            background-color: #2aac5e;
            padding: 0 1rem;
            height: 3rem;
            line-height: 3rem;
            text-align: center;
            box-sizing: border-box;
            z-index: 1000;
            a, span {
                flex: 1;
                font-size: 1.2em;
                font-weight: bold;
                cursor: pointer;
            }
            &.fixed {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 10000;
            }
            .title {
                flex: 3;
                font-size: 1.5em;
                font-weight: bold;
                transition: all 0.2s ease-in-out;
            }
        }

    }

</style>
