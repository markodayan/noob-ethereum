import { Provider } from '@src/index';

const { provider } = new Provider('infura', process.env.INFURA_PROJECT_ID as string);

// provider.seedLatestBlock(true);
// provider.seedBlockByNumber(15122166, false);
provider.getLatestBlock().then(console.log);
// provider.seedBlockByNumber(400000);

// provider.getBlockByNumber(12_964_760).then((block) => {
//   const blockNumber = parseInt(block.number, 16);
//   exportToJSONFile(block, blockNumber.toString(), '/src/seeder/blocks/legacy');
// });
