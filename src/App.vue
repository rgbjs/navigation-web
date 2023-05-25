<template>
  <div id="app">
    <!-- <TopNav></TopNav> -->
    <router-view></router-view>
  </div>
</template>

<script>
import TopNav from './components/TopNav'
export default {
  name: 'App',
  components: { TopNav }
}
</script>


