import { Provider, standardizeBlock } from '@src/index';

const { provider } = new Provider('infura', process.env.INFURA_PROJECT_ID as string);

provider.getLatestBlock().then((res) => {
  let standardized = standardizeBlock(res);
  console.log(standardized);
});
