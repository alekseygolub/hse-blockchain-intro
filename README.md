# HSE AMI 2023 "BlockChain-Intro" Course

## Contracts

### MyMapper Contract
Simple mapper contract with client on JS `client/client.js` and `scripts/sendTransaction.js`
Contract was deployed to GOERLI testnet with address `0x3dE824069f1401eC32DB0be4Bd3eB793D720023F`

To run client:
1. Create `.env` file with `INFURA_API_KEY=` infura token
2. Run `node client.js`

To call mutable method use `npx hardhat run scripts/sendTransaction.js --network goerli`
example of transaction - https://goerli.etherscan.io/tx/0xc7dd2e2eafda661e82798a6226c31083740c383d79a265514562f0dee19beedb

### SimpleERC20Token
It is a simple ERC20 token with minting support

Token was deployed to GOERLI testnet with address: `0xa722E5b4100d84C85c21Ad13D48C66EF33d4B3cA`

```shell
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network goerli
```

## Deploy

To deploy any contract:
1. Create `.env` file and paste the copied item like:
```
API_URL="your-alchemy-https-url"
PRIVATE_KEY="your-metamask-private-key"
```
2. Specify contract name `getContractFactory("YourContractName")` in file `deploy/deploy.sh` 
3. run `npx hardhat run scripts/deploy.js --network <network>` from root of repository
