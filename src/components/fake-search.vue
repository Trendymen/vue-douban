<template>
    <transition name="fade" mode="out-in">
        <div v-show="show" class="fake-search-wrapper">
            <div class="fake-search">
                <span>搜索电影</span>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  name: 'fake-search',
  data () {
    return {
      show: true
    }
  },
  watch: {
    $route (to, from) {
      this.show = to.name === 'home' || to.name === 'search' || to.name === 'movies-explore'
    }
  }
}
</script>

<style lang="scss" scoped>
    .fade-enter-active {
        position: absolute;
        width: 100%;
        transition: opacity 0.2s  ease-in-out;
    }
    .fake-search-wrapper {
        box-sizing: border-box;
        /*background-color: #2aac5e;*/
        padding: 0.5em 4%;
        /*padding-top: 0;*/
        height: 3em;
        color: #a9a9a9;
        .fake-search {
            text-align: center;
            line-height: 2em;
            background-color: #dedede;
            border-radius: 1em;
            height: 100%;
        }
    }
</style>
