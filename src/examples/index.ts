import { Provider, standardizeBlock, Searcher, utils } from '@src/index';
import zlib from 'zlib';
import fs from 'fs';
import path from 'path';

const { provider } = new Provider(process.env.INFURA_URL as string);

// Optimism Sequencer EOA: 0x6887246668a3b87F54DeB3b94Ba47a6f63F32985
// CTC contract: 0x5E4e65926BA27467555EB562121fac00D24E9dD2
const sequencer = '0x6887246668a3b87F54DeB3b94Ba47a6f63F32985'.toLowerCase();
const ctc = '0x5E4e65926BA27467555EB562121fac00D24E9dD2'.toLowerCase();

// provider.getLatestBlock(true).then((res) => {
//   const batchTxs = Searcher.findTransactionInteraction(res, sequencer, ctc);
//   console.log(`batch tx hashes (from block ${utils.decimal(res.number)})`, batchTxs);
// });

// provider.prepareBlockRangeQuery(13_597_529, 100).then();
// provider.prepareBlockRangeQuery(16042126, 1000).then();
// provider.fetchTransactionsOverBlockRange(13_597_529, 100).then((res) => {
//   // console.dir(res, { maxArrayLength: null });
//   console.log(res.length);
// });

/* Seed 400 blocks worth of transaction records in array tuple (around 21000 compressed tuples with block number, tx index, tx hash) */
// provider.fetchTransactionsOverBlockRange(13_597_529, 400).then((res) => {
//   res.map((tuple: any, i: number) => {
//     console.log(13_597_529 + i, tuple[0]);
//   });

//   utils.exportToJSONFile(res, '400__raw', '/');
// });

/* Go over 400 blocks of transactions and record transaction tuples for transactions that were sent by the Optimism sequencer to the CTC contract */
/* 400 transactions from regenesis (3 batches apparently) */
// provider.fetchTransactionsOverBlocksByInteraction(13_597_529, 400, sequencer, ctc).then((res) => {
//   utils.exportToJSONFile(res, 'sequencer_batch_txs', '/');
// });

// 400 blocks for searching for sequencer txs from block 16_018_521
provider.fetchTransactionsOverBlocksByInteraction(16_018_521, 400, sequencer, ctc).then((res) => {
  utils.exportToJSONFile(res, 'sequencer_batch_txs_16_018_521', '/');
});

// Seed 400 blocks to txt file (raw)
// provider.fetchTransactionsOverBlockRange(13_597_529, 400).then((res) => {
//   utils.exportToTextFile(JSON.stringify(res), '400__raw', '/');
// });

// zlib compression applied to 400 blocks worth of transactions (around 21000 transaction tuples)
// provider.fetchTransactionsOverBlockRange(13_597_529, 400).then((res) => {
//   zlib.gzip(Buffer.from(res.toString()), (err, buffer) => {
//     if (!err) {
//       console.log(buffer);
//       // Convert data buffer to base64 encoded string to write to text file
//       utils.exportToTextFile(buffer.toString(), '400_zlib', '/');
//     } else {
//       console.error(err);
//     }
//   });
// });

// read and deflate gzip
// const filePath = path.join(process.cwd(), '');
// fs.readFile(`${filePath}/400_zlib.txt`, 'utf8', (err, data) => {
//   if (!err) {
//     // need to first convert from base64 string to buffer, then buffer to ascii string, then finally parse the string into javascript
//     let str = JSON.parse(data)
//     console.log(str);
//     const decrypted = JSON.parse(str);
//     decrypted.map((tuple: any, i: number) => {
//       console.log(13_597_529 + i, tuple[0]);
//     });
//   } else {
//     console.error(err);
//   }
// });

// let str =
//   'Lorem impsum sdfdsfsdfdsfdsfdsfsdfsdfsd fksdklfsdkl fksdfksdekl lfksdkldfklsd k lf dkls f kl sdk f k sdkl f klsd  fk ds klf k lsd klf  dkls  fkl sd kl f klds fkl  sdklf  klsdf kl sdf kl df skl d klsf kl dsf md sf k ldmsklmfklsdlfklsdkmlfkmldskmlfkmldsfklmsdfkmlsdkmlkmlsdfkmldfkmlsfkmldskmlfklsdkmlfklmsfkmldskmlfskmldfkmlskmlfsdkmldflkmsdfk';
// let input = Buffer.from(str);
// zlib.deflate(input, (err, res) => {
//   utils.exportToJSONFile(res, 'compressed_string', '/');
//   utils.exportToJSONFile(input, 'uncompressed_string', '/');
// });

// provider.getBlockByNumber(13_597_529, true).then((res) => {
//   const batchTxs = Searcher.findTransactionInteraction(res, sequencer, ctc);
//   console.log('batch tx hashes', batchTxs);
// });

// provider.getLatestBlock(true).then((res) => {
//   const standardized = standardizeBlock(res);
//   console.log(standardized);
// });

// /* Seed latest block to JSON file (include full transaction objects) */
// provider.seedLatestBlock(true, 'src/junk').then();

// /* Seed block by number to JSON file (only include transaction hashes - preferable if you are not interested in transaction data) */
// provider.seedBlockByNumber(false, 12_964_760, 'src/junk').then();

/////// Full Node Testing ////////
// 10 000 L1 blocks from regenesis
provider.fetchTransactionsOverBlocksByInteraction(13_597_529, 10_000, sequencer, ctc).then((res) => {
  utils.exportToJSONFile(res, 'sequencer_batch_txs_13_597_529', '/');
});
