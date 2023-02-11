# HSE AMI 2023 "Blockchain-Intro" Course

### SimpleERC20Token
It is a simple ERC20 token with minting support

Token was deployed to GOERLI testnet with address: `0xa722E5b4100d84C85c21Ad13D48C66EF33d4B3cA`

```shell
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network goerli
```

To deploy create `.env` file and paste the copied item like:
```
API_URL="your-alchemy-https-url"
PRIVATE_KEY="your-metamask-private-key"
```