const { Provider, utils } = require('@src/index');
const provider = Provider.init('http://localhost:8545');

async function seedOptimismBatches() {
  const REGENSIS_BLOCK = 13_597_529;
  const sequencer = '0x6887246668a3b87F54DeB3b94Ba47a6f63F32985'.toLowerCase();
  const ctc = '0x5E4e65926BA27467555EB562121fac00D24E9dD2'.toLowerCase();

  const batchTuples = await provider.fetchTransactionsOverBlocksByInteraction(
    REGENSIS_BLOCK,
    'latest',
    3000,
    sequencer,
    ctc
  );

  utils.exportToJSONFile(batchTuples, 'optimism_tx_tuples', '/optimism');
  console.log(`${batchTuples.length} batches posted to L1 by provided sequencer`);

  const receipts = await provider.fetchBatchReceipts(batchTuples, 4000);

  utils.exportToJSONFile(receipts, 'optimism_receipts', '/optimism');
}

async function seedOldInboxBatches() {
  const inbox_old = '0x4c6f947Ae67F572afa4ae0730947DE7C874F95Ef'.toLowerCase();
  const sequencer_old = '0xa4b10ac61E79Ea1e150DF70B8dda53391928fD14'.toLowerCase();

  const START_OLD = 14_177_798; // 10 February 22
  const END_OLD = 15_447_147; // 31 August 22

  const batchTuples = await provider.fetchTransactionsOverBlocksByInteraction(
    START_OLD,
    END_OLD,
    3000,
    sequencer_old,
    inbox_old
  );

  utils.exportToJSONFile(batchTuples, 'arbitrum_old_tx_tuples', '/arbitrum');
  console.log(`${batchTuples.length} batches posted to L1 by provided sequencer`);

  const receipts = await provider.fetchBatchReceipts(batchTuples, 4000);

  utils.exportToJSONFile(receipts, 'arbitrum_old_receipts', '/arbitrum');
}

async function seedLatestArbitrumSequencerBatches() {
  const inbox_current = '0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6'.toLowerCase();
  const sequencer_current = '0xa4b1E63Cb4901E327597bc35d36FE8a23e4C253f'.toLowerCase();

  const START_CURRENT = 15_447_728; // 31 August 22
  //   const END_CURRENT = 16_058_675; // 26 Novemeber 22

  const batchTuples = await provider.fetchTransactionsOverBlocksByInteraction(
    START_CURRENT,
    'latest',
    3000,
    sequencer_current,
    inbox_current
  );

  utils.exportToJSONFile(batchTuples, 'arbitrum_new_tx_tuples', '/arbitrum');
  console.log(`${batchTuples.length} batches posted to L1 by provided sequencer`);

  const receipts = await provider.fetchBatchReceipts(batchTuples, 4000);

  utils.exportToJSONFile(receipts, 'arbitrum_new_receipts', '/arbitrum');
}
