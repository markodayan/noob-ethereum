import { Provider, standardizeBlock } from '@src/index';

const { provider } = new Provider(process.env.INFURA_URL as string);

provider.getLatestBlock().then((res) => {
  const standardized = standardizeBlock(res);
  console.log(standardized);
});

/* Seed latest block to JSON file (include full transaction objects) */
provider.seedLatestBlock(true, 'src/junk').then();

/* Seed block by number to JSON file (only include transaction hashes - preferable if you are not interested in transaction data) */
provider.seedBlockByNumber(false, 12_964_760, 'src/junk').then();
