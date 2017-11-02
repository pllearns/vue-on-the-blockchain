<template>
  <div id="app">
    <img src="./assets/logo.png">
    <SimpleVueExample/>
  </div>
</template>

<script>
import SimpleVueExample from './components/SimpleVueExample'

export default {
  name: 'app',
  components: {
    SimpleVueExample
  }
}
</script>

<style>
#app {
  font-family: 'SF Pro display', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
