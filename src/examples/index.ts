import { Provider, Searcher, utils } from '@src/index';

const provider = Provider.init(process.env.INFURA_URL as string);

/* Get Ethereum block by number */
provider.getBlockByNumber(15_447_147, true).then(console.log);

/* Detect for Optimism batch publication from latest block */
provider.getLatestBlock(true).then((res) => {
  const sequencer = '0x6887246668a3b87F54DeB3b94Ba47a6f63F32985'.toLowerCase();
  const ctc = '0x5E4e65926BA27467555EB562121fac00D24E9dD2'.toLowerCase();

  const batchTxs = Searcher.findTransactionInteraction(res, sequencer, ctc);
  console.log(`batch tx hashes (from block ${utils.decimal(res.number)})`, batchTxs);
});
