# Smart Contracts

## Setup Development Environment

Setup Truffle Suite:
* Install truffle: `npm install -g truffle`
 
Setup Ganache:
* `npm install -g ganache`
* When deploying or testing with ganache, a seperate terminal must be running using the `ganache` command.

Setup for Volta Test Network:
* In the `truffle` folder, create a `.env` file using the contents of the `.env.example` file
* Replace the sample mnemonic in your `.env` file, with your actual mnemonic for the wallet you would like to use to deploy the contract
* Goto [Volta Faucet](https://voltafaucet.energyweb.org/) to receive free volta coins (used for deploying and calling contract functions)
* Configure MetaMask wallet for Volta network by adding new network with 
    * NewRPC URL: `https://volta-rpc.energyweb.org/`
    * Chain ID: `73799`
    * Block Explorer URL: `http://volta-explorer.energywe.org`

### Project Commands
Deploy Smart Contracts to Ganache (also compiles):
* In `truffle` folder, run `npm run dev:local` or `yarn dev:local`

Test Smart Contracts on Ganache:
* In `truffle` folder, run `npm run test:local` or `yarn test:local`

Deploy Smart Contracts to Volta (also compiles):
* In `truffle` folder, run `npm run dev:volta` or `yarn dev:volta`

* Volta won't deploy again if their are no changes to the contract when executing `yarn dev:volta` in order to prevent spending unnecessary tokens, therefore use `npm run dev:volta-reset` to force the deployment.

Test Smart Contracts on Volta:
* In `truffle` folder, run `npm run test:volta` or `yarn test:volta`

### Truffle Specific Commands

Compiling smart contracts: `truffle compile`

Running tests:
* Execute smart contract `truffle develop` and `truffle test`

### Generating Unit Test Coverage Reports
Required packages: `solidity-coverage`, `ganache-core` ensure they are installed.
* In `truffle` folder, run `npm install`

Generate coverage report:
* In `truffle` folder, run `npx truffle run coverage`

Viewing report:
* In `truffle` folder, navigate to the newly create `coverage` directory and open `index.html` in browser.

