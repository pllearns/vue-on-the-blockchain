<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button type="button" @click="deployContract()">Deploy a contract</button>
  </div>
</template>

<script>
import web3 from 'web3'

let provider = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
let contract = require('truffle-contract')
let MyContract = contract({
  abi: '[{"constant":true,"inputs":[],"name":"getState","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getSecret","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newState","type":"string"}],"name":"setState","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"you_awesome","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]',
  contractName: 'VueExample',
  address: '0x3ef102fabe4f17119f7759a6f51db8f8835f8062'
})
MyContract.setProvider(provider)

let deployed;

MyContract.deployed().then((instance) => {
  console.log('do I get an instance here? ', instance)
  let deployed = instance
  console.log('what instance do I get? ', instance)
  return instance
})

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'A Simple Blockchain Transaction',
    }
  },
  methods: {
    deployContract () {
      console.log('MyContract???', MyContract)
      console.log('provider? ', provider)
      return MyContract
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
