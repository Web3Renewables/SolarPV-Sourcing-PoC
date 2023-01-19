const { chainConfig } = require("@config/environment")
const Web3 = require('web3')

const matchChain = async () => {
  const web3 = new Web3(Web3.givenProvider)
  const currentChainId = await web3.eth.getChainId()
  // Check if the current chain is EWC or Volta
  // depending on if the environment is production or development
  return chainConfig.chainId === currentChainId
}

export {
  matchChain
}