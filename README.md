## The Graph - MoonLotto Subgraph Workshop

Learn how to build a GraphQL API to query data for a Lottery contract on Moonbase Alpha.

> See also [Using The Graph on Moonbeam](https://docs.moonbeam.network/integrations/thegraph/)

![Subgraph Workshop](images/header.png)

### Prerequisites

To be successful in this workshop, you should have [Node.js](https://github.com/nvm-sh/nvm#node-version-manager---) installed on your machine.

## Getting started

### Creating the Graph project in the Graph console

To get started, open the [Graph Console](https://thegraph.com/explorer/dashboard) and either sign in or create a new account.

Next, go to [the dashboard](https://thegraph.com/explorer/dashboard) and click on __Add Subgraph__ to create a new subgraph.

Here, set your graph up with the following properties:

- Subgraph Name - __Moonbeamsubgraph__ (or your preferred name)
- Subtitle - __A subgraph for querying data from Moonbase__
- Optional - Fill the description and GITHUB URL properties

Once the subgraph is created, we will initialize the subgraph locally.

### Clone the example project

Next, we'll be using the example [Moonlotto subgraph](https://github.com/PureStake/moonlotto-subgraph)

Clone the repo locally, then change into the new directory and install the dependencies:

```sh
git clone git@github.com:PureStake/moonlotto-subgraph.git

cd moonlotto-subgraph
```

