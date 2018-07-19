<template>
    <div>
        <div class="movie-list-pane-wrapper">
            <div>
                <movie-list type="in_theaters">
                    <template slot="title">正在热映</template>
                </movie-list>
                <movie-list type="coming_soon">
                    <template slot="title">即将上映</template>
                </movie-list>
            </div>
        </div>
    </div>
</template>

<script>
import movieList from './movie-list'
import fakeSearch from '../../components/fake-search'

export default {
  name: 'home',
  components: {
    movieList,
    fakeSearch
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>
