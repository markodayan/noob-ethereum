/** Only attempt this with a full node */
import { Provider, utils } from '@src/index';
import async from 'async';

const { provider } = new Provider(process.env.INFURA_URL as string);

/* Constants */
const REGENSIS_BLOCK = 13_597_529;
const sequencer = '0x6887246668a3b87F54DeB3b94Ba47a6f63F32985'.toLowerCase();
const ctc = '0x5E4e65926BA27467555EB562121fac00D24E9dD2'.toLowerCase();

// const arr = provider.fetchTransactionsOverBlockRange(REGENSIS_BLOCK, 10000, 100).then((res) => {
//   utils.exportToJSONFile(res, 'sample', '/');
//   console.log('arr.length (should be 10000):', res.length);
// });

provider.fetchTransactionsOverBlocksByInteraction(REGENSIS_BLOCK, 500, 37, sequencer, ctc).then((res) => {
  utils.exportToJSONFile(res, 'sequencer_500_from_regen', '/');
});
// provider.fetchTransactionsOverBlocksByInteraction(REGENSIS_BLOCK, 2_900_000, 100, sequencer, ctc).then((res) => {
//   utils.exportToJSONFile(res, 'sequencer_1000_from_regen', '/');
// });
