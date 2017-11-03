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
