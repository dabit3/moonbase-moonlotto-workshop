const {
  parseNetwork,
  save_deployment_to_file
} = require('../lib/utils');

async function deploy_moon_lotto(ticketPrice, lotteryRoundTime, minRoundPlayers) {
  const [issuer] = await ethers.getSigners();
  let network = parseNetwork(await ethers.provider.getNetwork());

  console.log(`Deploying MoonLotto using ${issuer.address} on network ${network.name.toUpperCase()} (${network.chainId})`);

  // get contract factory
  const moonlotto = await ethers.getContractFactory("MoonLotto");
  // deploy contract
  const moonlottoInstance = await moonlotto.deploy(ticketPrice.toString(), lotteryRoundTime, minRoundPlayers);
  // wait for confirmation
  await moonlottoInstance.deployed();

  console.log(` ✔ MoonLotto deployed to : ${moonlottoInstance.address}`);

  save_deployment_to_file([{name: "MoonLotto", address: moonlottoInstance.address}], network)

  return true;
}

module.exports = {
  deploy_moon_lotto
}