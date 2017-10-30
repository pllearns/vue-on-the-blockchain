<template>
  <div id="web3-confirm">
    <div class="message-container">
      <div class="message">
        <div v-if="dapp.hasWeb3InjectedBrowser">
            Your Browser is Web3 Injected!
        </div>
        <div v-if="dapp.isConnectedToApprovedNetwork">
          You are connected to {{ approvedNetworkName }} (in test mode)
        </div>
        <div v-else>
          You are not connected to an approved network<br>
          Go ahead and create an account through metamask.
        </div>
        <div v-else>
          Your browser is not web3 injected. Please install <a href='https://metamask.io/'>Metamask</a>.
          <div class="metamask-resource"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // import networks from a utils folder and 
}
</script>

<style lang="css">
</style>
