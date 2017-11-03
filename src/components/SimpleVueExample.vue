<template>
  <div class="hello">
    <h1>{{ showAccount }}</h1>
    <input v-model="amount" placeholder="word?">
    <button type="button" @click="store()">Store Data </button>
    <button type="button" @click="get()">Get Data</button>
    <h3>{{ confirmWord }}</h3>
    <h3>{{ transactionMsg }}</h3>
    <h4>{{ showBlockNumber }}</h4>
    <button type="button" @click="showGasPrice()">Get Gas Price</button>
    <h4>{{ gasPrice }}</h4>
    <button type="button" @click="balance()">Get Balance</button>
    <h4>{{ newBalance }}</h4>
  </div>
</template>

<script>
import web3 from 'web3'

let provider = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

provider.eth.defaultAccount = provider.eth.accounts[5]

let balance = provider.eth.getBalance(provider.eth.defaultAccount)

let MyContract = provider.eth.contract([{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"x","type":"bytes32"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
);

let contract = MyContract.at('0x5c4c67c327c3379566e08ae1adf3b7eddb072fc6');

export default {
  name: 'SimpleVueExample',

  data () {
    return {
      amount: '',
      confirmWord: '',
      msg: 'Your Account ',
      transactionMsg: 'Transaction ',
      blockMsg: 'Which Block Number? ',
      newBalance: null,
      gasPrice: null
    }
  },

  methods: {
    store () {
      contract.set(this.amount)
      alert(contract.set(this.amount))
    },
    get () {
      this.confirmWord = provider.toAscii(contract.get())
    },
    balance() {
      this.newBalance = Number(balance)
    },
    showGasPrice() {
     this.gasPrice = Number(provider.eth.gasPrice)
    }
  },
    computed: {
      showAccount: function() {
        return this.msg + provider.eth.defaultAccount
      },
      showBlockNumber: function () {
        return this.blockMsg + provider.eth.blockNumber
      }
    },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2, h3, h4 {
  font-weight: normal;
  font-family: 'SF Pro Display'
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
