require("dotenv").config();
const Web3 = require("web3");

const url = 'https://goerli.infura.io/v3/' + process.env.INFURA_API_KEY;

console.log(url);

const web3 = new Web3(new Web3.providers.HttpProvider(url));

const contractAddress = '0x06E2Fd86bc89F40e036caCeD12a1cb23CADB3014';

let myContract = new web3.eth.Contract([
    {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "_from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "_key",
            "type": "address"
          }
        ],
        "name": "Delete",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "_from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "_key",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "text",
                "type": "string"
              },
              {
                "internalType": "int256",
                "name": "num",
                "type": "int256"
              },
              {
                "internalType": "bool",
                "name": "flag",
                "type": "bool"
              }
            ],
            "indexed": false,
            "internalType": "struct MyMapper.MyStructItem",
            "name": "_value",
            "type": "tuple"
          }
        ],
        "name": "Set",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "key",
            "type": "address"
          }
        ],
        "name": "deleteValue",
        "outputs": [
          {
            "internalType": "bool",
            "name": "ok",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "key",
            "type": "address"
          }
        ],
        "name": "getValue",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "text",
                "type": "string"
              },
              {
                "internalType": "int256",
                "name": "num",
                "type": "int256"
              },
              {
                "internalType": "bool",
                "name": "flag",
                "type": "bool"
              }
            ],
            "internalType": "struct MyMapper.MyStructItem",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "key",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "str",
            "type": "string"
          },
          {
            "internalType": "int256",
            "name": "num",
            "type": "int256"
          },
          {
            "internalType": "bool",
            "name": "flag",
            "type": "bool"
          }
        ],
        "name": "setValue",
        "outputs": [
          {
            "internalType": "bool",
            "name": "ok",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
], contractAddress);

const myAddress = '0x0479d5d8774BfBdf8B151C14C925493F2234496B';
myContract.methods.setValue(myAddress, 'teststr', 15, false).call();
myContract.methods.getValue(myAddress).call().then(console.log);
myContract.methods.deleteValue(myAddress).call().then(console.log);

myContract.getPastEvents(
    'AllEvents', 
    {
        filter: { '_caller': myAddress},
        fromBlock: 0,
        toBlock: 'latest'
    },
    async (err, events) => { console.log(events)}
);

myContract.getPastEvents('AllEvents', {}, async (err, events) => { console.log(events)});