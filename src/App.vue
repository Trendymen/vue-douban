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

<style lang="scss" scoped>
    .el-main {
        position: relative;
        margin: auto;
        max-width: 992px;
        width: 100%;
        padding: 0;
        .main-panel {
            /*padding-top: 5.5em;*/
        }
    }



</style>
