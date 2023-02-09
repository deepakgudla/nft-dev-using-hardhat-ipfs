require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
console.log(JSON.stringify(contract.abi));

const contractAddress = ""

const nftContract = new web3.eth.Contract(contract.abi,  contractAddress)

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction
    const tx = {
      'from': PUBLIC_KEY,
      'to': contractAddress,
      'nonce': nonce,
      'gas': 500000,
      'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    }
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}

mintNFT("ipfs://")   //QmYvYcFKwHTX4uXrrd9QH63xdDmWbsHQoT6VkepHam2xug  - for reference



///hash of txn - 0x0e73dcae018b0e93d8ea07bddee74c91c8574c668eb149f18a50fba8fbf00f8c

//@17:30 july 15 2022.....

//alchemy mempool - https://dashboard.alchemyapi.io/mempool/eth-goerli/tx/0x0e73dcae018b0e93d8ea07bddee74c91c8574c668eb149f18a50fba8fbf00f8c



