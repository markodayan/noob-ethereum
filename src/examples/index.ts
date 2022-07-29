import { Provider } from '@src/index';

const { provider } = new Provider('infura', process.env.INFURA_PROJECT_ID as string);

provider.getLatestBlock().then(console.log);
