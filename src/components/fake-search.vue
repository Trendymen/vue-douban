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
        box-sizing: border-box;
        width: 100%;
        transition: opacity 0.2s ease-in-out;
    }

    .fake-search-wrapper {
        @include padding;
        margin: auto;
        padding: {
            top: 0.5em;
            bottom: 0.5em;
        }
        * {
            color: #a9a9a9;
        }
        border: {
            bottom: $divide-line
        }
        .fake-search {
            text-align: center;
            line-height: 2.5em;
            height: 2.5em;
            background-color: #dedede;
            border-radius: 1em;
        }
    }
</style>
