# MoonLotto Subgraph

An example Subgraph initially forked from The Graph [example subgraph](https://github.com/graphprotocol/example-subgraph). Created by PureStake to get you started with The Graph on Moonbeam.

## Setup

Install the node dependencies using `yarn`:

```shell
yarn
```

Create the TS types for The Graph (requires the `artifacts` folder created by contract compilation):

```shell
yarn codegen
```

## Deploying contracts

For deploying contracts on Moonbase Alpha, you'll need a funded account and its private key. Store your private key for Moonbase Alpha deployment as an ENV variable:

```shell
export MOON_PRIVATE_KEY="YOUR-PRIVATE-KEY-HERE"  
```

Compile the contracts:

```shell
# compiles using hardhat and solc 0.8.3
yarn contract-build
```

To deploy to a development Moonbeam node you can run:

```
# deploys to moonbase alpha
yarn contract-deploy-local
```

To deploy to Moonbase Alpha you can run:

```
# deploys to moonbase alpha
yarn contract-deploy
```

> For more information see The Graph docs on https://thegraph.com/docs/.
> Or the Moonbeam docs on https://docs.moonbeam.network/.
