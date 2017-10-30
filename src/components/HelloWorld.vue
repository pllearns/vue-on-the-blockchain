<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button type="button" @click="generateContract()">Generate a contract</button>
  </div>
</template>

<script>
import web3 from 'web3'
let provider = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
let contract = require('truffle-contract')

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'A Simple Blockchain Transaction',
    }
  },
  methods: {
    generateContract () {
      let MyContract = contract({
        abi: '',
        unlinked_binary: '',
        address: '0x3ef102fabe4f17119f7759a6f51db8f8835f8062'
      })
      MyContract.setProvider(provider); // undefined!!!
      console.log('Is there a contract here? ', MyContract);
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
