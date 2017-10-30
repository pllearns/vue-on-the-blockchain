import web3 from 'web3'

const getWeb3 = new Promise((resolve, reject) => {
  window.addEventListener('load', () => {
    let web3 = window.web3

    if (web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider)
      resolve({
        hasInjectedWeb3: web3.isConnected(),
        web3
      })
    } else {
      reject({
        result: null,
        err: 'Unable to connect!'
      })
    }
  })
})
.then((result) => {
  return new Promise((resolve, reject) => {
    result.web3.version.getNetwork((err, networkId) => {
      if (err) {
        result = Object.assign({}, result)
        reject({
          result,
          err
        })
      } else {
        networkId = networkId.toString()
        result = Object.assign({}, result, { networkId })
        resolve(result)
      }
    })
  })
})

module.exports = getWeb3
