<template>
    <v-toolbar
            app
            flat
            class="navigator"
            ref="navigator"
            :class="{fixed:isFixed}"
    >
        <span>
            <v-btn
                    icon
                    class="toolbar-btn"
                    @click="back"
            >
            <v-icon
              v-if="$route.name !== 'home'"
            >
                arrow_back
            </v-icon>
            </v-btn>
        </span>
        <v-toolbar-title
                class="toolbar-title"
                v-text="'豆瓣电影'"
        >
        </v-toolbar-title>
        <a></a>
        <!--</div>-->
    </v-toolbar>
</template>

<script>
import fakeSearch from './fake-search'
import { mapState } from 'vuex'

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
  },

  methods: {
    searchFade () {
      if (window.IntersectionObserver) {
        console.log(IntersectionObserver)
        new IntersectionObserver(
          (entries, observer) => {
            const ratio = entries[0].intersectionRatio
            this.isFixed = ratio < 36 / 66
          },
          { threshold: 36 / 66 }
        ).observe(this.$refs.navigator)
      }
    },
    back () {
      this.$route.name !== 'home' &&
        (this.backUrl
          ? this.$router.push({ path: this.backUrl })
          : this.$router.go(-1))
    }
  },
  beforeCreate () {},
  mounted () {
    // this.searchFade()
  }
}
</script>

<style lang="scss" scoped>
.navigator {
  * {
    margin: 0;
    color: white;
  }
  background-color: #2aac5e;
  .v-toolbar__content {
    > .toolbar-btn,
    a,
    span {
      flex: 1;
      font-size: 1.2em;
      font-weight: bold;
      cursor: pointer;
    }

    .tool-bar-title {
      flex: 3;
    }
  }
}
</style>
