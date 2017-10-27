<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button type="button" @click="generateConsoleLogTest()">Generate a console log</button>
  </div>
</template>

<script>
import web3 from 'web3'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'A Simple Blockchain Transaction',
    }
  },
  methods: {
    generateConsoleLogTest () {
      console.log(web3);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
