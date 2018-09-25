<template>
    <v-app id="app" direction="vertical">
        <nav-header/>
        <v-content>
            <fake-search></fake-search>
            <transition name="fade" mode="out-in">
                <keep-alive>
                    <router-view class="main-panel"/>
                </keep-alive>
            </transition>
        </v-content>
    </v-app>
</template>

<script>
import navHeader from './components/nav-header'
import fakeSearch from './components/fake-search'
import debounce from 'lodash/debounce'
import {mapMutations, mapActions} from 'vuex'

const {changeVmin} = mapMutations(['changeVmin'])
const getVmin = debounce(changeVmin, 250)

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
<style lang="scss">
    .el-main {
        position: relative;
        margin: auto;
        max-width: 992px;
        width: 100%;
        padding: 0 5%;
        .main-panel {
            /*padding-top: 5.5em;*/
        }
    }
</style>
