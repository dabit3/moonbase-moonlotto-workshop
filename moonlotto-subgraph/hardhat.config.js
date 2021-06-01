require("@nomiclabs/hardhat-ethers");
const {
  deploy_moon_lotto
} = require("./tasks/deploy_contracts")

task("deploy_contracts", "Deploys the MoonLotto contract")
  .addOptionalParam("ticketPrice", "Price in ETH per submission to join the lottery")
  .addOptionalParam("lotteryRoundTime", "Seconds that a lottery round will be open for submissions")
  .addOptionalParam("minRoundPlayers", "Minimum number of players in a lottery round to pick a winner")
  .setAction(async (taskArgs) => {
    const ticketPrice = taskArgs.ticketPrice ? ethers.utils.parseUnits(taskArgs.ticketPrice, "ether") : ethers.utils.parseUnits("1", "gwei");
    const lotteryRoundTime = taskArgs.lotteryRoundTime || 1800;
    const minRoundPlayers = taskArgs.minRoundPlayers || 10;

    await deploy_moon_lotto(ticketPrice, lotteryRoundTime, minRoundPlayers);
  });

// Change private keys accordingly - ONLY FOR DEMOSTRATION PURPOSES - PLEASE STORE PRIVATE KEYS IN A SAFE PLACE
const developmentPK =
  "99b3c12287537e38c90a9219d4cb074a89a16e9cdb20bf85728ebd97c343e342";
const productionPK = process.env.MOON_PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "moonbase",
  networks: {
    moonbase: {
      url: "https://rpc.testnet.moonbeam.network",
      accounts: [productionPK],
      gasPrice: 1000000000,
      chainId: 1287,
    },
    dev: {
      url: "http://127.0.0.1:9933",
      accounts: [developmentPK],
      network_id: "1281",
      gasPrice: 0,
      chainId: 1281,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.3",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};