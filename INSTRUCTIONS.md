# Instructions

> Let's start with vue-cli:

`$ npm install -g vue-cli`

`$ vue init webpack my-simple-vue-blockchain-app`

`$ cd my-simple-vue-blockchain-app`

Let's get into dev mode:

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```

You should see a Vue page that looks pretty spiffy

One more install
`$ npm install web3`

#### Let's get coding!

> Open up your favorite text editor

Let's take a look at the file structure. We are only going to change the HelloWorld component so there is no need to change main.js.
We'll update the HelloWorld component name.

All of our work is going to be in the components/HelloWorld.vue file. Let's start by changing the name:
`SimpleVueExample.vue` or whatever you want to call it.

Now let's go into that file and start gutting anything in the template tag and the the script tag. We will update with our own code!

Make sure you already have testrpc installed. If not: `npm install -g ethereumjs-testrpc` then `testrpc`

Also, make sure you have metamask installed: [Metamask](https://metamask.io/)

Before we start hacking away let's create our contract in Remix (remix instructions will be in a separate readme, we will go over this in the session):

``` solidity
pragma solidity ^0.4.4;

contract VueExample {
    bytes32 storedData;

    function set(bytes32 x) public {
        storedData = x;
    }

    function get() public constant returns (bytes32) {
        return storedData;
    }
}
```

Basically all we will be doing is creating a transaction on the blockchain that will send some data and get back some data (in this case a word).

*Now at this point we should have the contract on the blockchain*

Let us go into our component and start templating and adding logic to our app:

The following goes into our `<script>` tag. This is all 'global', which for today is okay, since this is all in the Vue instance, we are still working with a
virtual DOM.   

``` javascript

import web3 from 'web3'

let provider = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')) // <--- this will be the address for our testrpc on metamask

provider.eth.defaultAccount = provider.eth.accounts[5]

let balance = provider.eth.getBalance(provider.eth.defaultAccount)

let MyContract = provider.eth.contract([{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"x","type":"bytes32"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
); // <---- we get this abi from Remix!

let contract = MyContract.at('0x5c4c67c327c3379566e08ae1adf3b7eddb072fc6'); // <---- update this with your contract's address

```
This is where we meet Web3 for the first time. Web3.js is a library that gives you access to the web3 object that allows the app to work on Ethereum. To abstract out the object methods on the ethereum network, we declare a provider, balance, and then contract variable. These are going to give us access to balances and to execute transactions through our solidity contract from remix. The abi and the contract address we can get directly from the remix console. 

When we create the methods in our vue instance we will use `provider`, `balance`, and `contract` to get data for us when we fire off an event. 

We will stay in our `<script>` to create a `data` object and and Vue instance also exposes methods and computed properties that will help us reactively render data. 

Let's take a look at the code starting with the data object: 

``` javascript

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
```
All of theses properties are going to render our data to the DOM.

``` javascript
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
```

These are the methods that we will use to set and get data. We will also use this to get information from accounts. 

``` javascript 
  computed: {
    showAccount: function() {
      return this.msg + provider.eth.defaultAccount
    },
    showBlockNumber: function () {
      return this.blockMsg + provider.eth.blockNumber
    }
  },
```

These are computed properties, which are data properties that can be bound like data properties, but with more logic beyond an assignment. This comes in handy when you want to declare a property that has complex logic multiple times. 

In order to bind the DOM to the Vue instance's data, we need to do this declaratively through an HTML-based template syntax: `<template> <template/>`. These templates are valid HTML. You can also write render functions with JSX support directly. But then we would have to do extra work that Vue takes care of under the hood. These templates are compiled into Virtual DOM render functions. 

Let's take a look at the template and see where the properties and computed properties are rendered. Also, it's good to pay close attention to where the methods are being called and how: 

``` HTML

<template>
  <div class="hello">
    <h1>{{ showAccount }}</h1> // computed property
    <input v-model="amount" placeholder="word?">
    <button type="button" @click="store()">Store Data </button> // ===> here is where we set the word and thus create a transaction (payable)
    <button type="button" @click="get()">Get Data</button> // ==> Notice that there is a method here that updates the data property below?
    <h3>{{ confirmWord }}</h3> // data property (we can see this through the get method without incurring costs)
    <h3>{{ transactionMsg }}</h3> // data property
    <h4>{{ showBlockNumber }}</h4> // computed property
    <button type="button" @click="showGasPrice()">Get Gas Price</button> // ==> Notice that there is a method here that updates the data property below?
    <h4>{{ gasPrice }}</h4> // data property 
    <button type="button" @click="balance()">Get Balance</button> // ==> Notice that there is a method here that updates the data property below? 
    <h4>{{ newBalance }}</h4> //data property
  </div>
</template>

```  
Read the comments next to each line, and you'll see the properties, methods, and computed properties that are bound to the DOM. 
This allows us to remain reactive and enables two-way data binding. You'll notice that the mustache tag is used here on all of the data properties. This text interpolation binds the data to the DOM. 

Also, notice `v-model` and `@click`. These are directives (like Angular) which are prefixed by a v to indicate that they are special to Vue. The `v-model` directive creates two way data binding on form input and textarea elements. This basically updates data on user input events. `@` is shorthand for `v-on`, which attaches an event handler to a directive. In this case `@click` is similar to `onClick`. So whenever a button is clicked in this template it will fire off its corresponding method. In this example we only have setters and getters, so if we click a button here we are either setting the data, or getting data, balance info, or gas prices. 

Here are some more resources to help you dissect this small example: 

- [Vue Documentation](https://vuejs.org/v2/guide/)
- [Solidity Documentation](http://solidity.readthedocs.io/en/develop/)
- [Web3 Documentation](https://github.com/ethereum/web3.js/)

