async function main() {
    let abi = [
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
    ];

    let provider = new ethers.providers.InfuraProvider('goerli', process.env.INFURA_API_KEY);
    let contractAddress = '0x3dE824069f1401eC32DB0be4Bd3eB793D720023F';

    let contract = new ethers.Contract(contractAddress, abi, provider);
    let myAddress = '0x0479d5d8774BfBdf8B151C14C925493F2234496B';

    let wallet = new ethers.Wallet(process.env.GOERLI_PRIVATE_KEY, provider);

    let contractWithSigner = contract.connect(wallet);

    let tx = await contractWithSigner.setValue(myAddress, "teststr", 15, false);

    console.log(tx)
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });