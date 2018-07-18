<template>
    <transition name="search-fade">
    <div class="fake-search-wrapper">
        <div class="fake-search">
            <span>搜索电影</span>
        </div>
    </div>
    </transition>
</template>

<script>
export default {
  name: 'fake-search'
}
</script>

<style lang="scss" scoped>
    .search-fade-leave-active,
    .search-fade-enter-active
    {
        transition: all 0.2s ease-in-out;
    }
    .search-fade-leave,
    .search-fade-enter-to
    {
        transform: translateY(0);
    }
    .search-fade-leave-to,
    .search-fade-enter
    {
        transform: translateY(100%);
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
