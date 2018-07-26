<template>
    <v-container fluid class="container">
        <div class="movie-list-pane-wrapper">
            <movie-list type="in_theaters">
                <template slot="title">正在热映</template>
            </movie-list>
            <movie-list type="coming_soon">
                <template slot="title">即将上映</template>
            </movie-list>
        </div>
    </v-container>
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

<style lang="scss" scoped>
    .container {
        @include padding;
        @media only screen and (max-width: 960px) {
            padding: 0;
        }
    }
</style>
