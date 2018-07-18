<template>
    <el-container id="app" direction="vertical">
        <nav-header/>
        <el-main>
            <fake-search></fake-search>
            <transition name="fade" mode="out-in">
                <keep-alive>
                    <router-view class="main-panel"/>
                </keep-alive>
            </transition>
        </el-main>
    </el-container>
</template>

<script>
import navHeader from './components/nav-header'
import fakeSearch from './components/fake-search'
import _ from 'lodash'
import {mapMutations, mapActions} from 'vuex'

const {changeVmin} = mapMutations(['changeVmin'])
const getVmin = _.debounce(changeVmin, 250)

export default {
  name: 'App',
  created () {
    this.changeVmin()
  },
  mounted () {
    window.addEventListener('resize', this.getVmin)
  },
  methods: {
    ...mapActions(['getCityName']),
    changeVmin,
    getVmin
  },
  components:
    {
      navHeader,
      fakeSearch
    }
}
</script>

<style>
    * {
        padding: 0;
        margin: 0;
        font-size: 12px;
    }

    #app {
    }
</style>
<style lang="scss" scoped>
    .el-main {
        margin: auto;
        max-width: 992px;
        width: 100%;
        padding: 0;
        .main-panel {
            /*padding-top: 5.5em;*/
        }
    }

    $fe: 'fade-enter';
    $fl: 'fade-leave';
    .#{$fe},
    .#{$fl}-to {
        opacity: 0;
    }

    .#{$fe}-to,
    .#{$fl} {
        opacity: 1;
    }

    .#{$fe}-active,
    .#{$fl}-active {
        transition: all 0.2s ease-in-out;
    }
</style>
