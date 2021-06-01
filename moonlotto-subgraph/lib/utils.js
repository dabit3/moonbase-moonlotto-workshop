const fs = require('fs');

const CONTRACT_ADDR_FILEPATH = __dirname + "/../build/contract_deployment.json";

/**
 * Writes the contract addresses to a file.
 */
 function save_deployment_to_file(contracts, network) {
  const json_output = {};

  contracts.forEach(contract => {
    json_output[network.chainId] = {
      [contract.name]: contract.address
    }
  });

  fs.writeFileSync(
    // file where the addresses will be written
    CONTRACT_ADDR_FILEPATH,
    // str with the actual address of the contract
    JSON.stringify(json_output, null, 2),
    // options to write the file
    {
      encoding: 'utf8',
      flag: 'w+'
    }
  );
}

/**
 * Returns the correct name of the networks for 
 */
function parseNetwork(network) {
  if (network.chainId === 1281) {
    network.name = "dev";
  }
  else if (network.chainId === 1287) {
    network.name = "moonbase";
  }

  return network;
}

module.exports = {
  save_deployment_to_file,
  parseNetwork 
}