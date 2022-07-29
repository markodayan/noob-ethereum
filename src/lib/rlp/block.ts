import { LONDON_HARDFORK_BLOCK } from '@src/constants';
import { rlp } from 'ethereumjs-util';
import createKeccakHash from 'keccak';

function prepareBlockTuple(block: IRawBlock): ILegacyBlockTuple | IPost1559Tuple {
  const blockNumber = parseInt(block.number, 16);

  const tuple = [
    block.parentHash,
    block.sha3Uncles,
    block.miner,
    block.stateRoot,
    block.transactionsRoot,
    block.receiptsRoot,
    block.logsBloom,
    block.difficulty,
    block.number,
    block.gasLimit,
    block.gasUsed,
    block.timestamp,
    block.extraData,
    block.mixHash,
    block.nonce,
  ];

  // If a block after London Hardfork, add base fee to block tuple prior to encoding
  if (blockNumber >= LONDON_HARDFORK_BLOCK) tuple.push(block.baseFeePerGas as string);

  return tuple as ILegacyBlockTuple | IPost1559Tuple;
}

function calculateBlockHeader(block: IRawBlock): string {
  const tuple = prepareBlockTuple(block);
  const encoded = rlp.encode(tuple);

  // could also do keccak256(encoded).toString('hex') using the ethereum library
  const calculated = createKeccakHash('keccak256').update(encoded).digest('hex');
  return '0x' + calculated;
}

function verifyBlockHeader(block: IRawBlock): boolean {
  const expected = block.hash;
  const calculated = calculateBlockHeader(block);

  return expected === calculated;
}

export { calculateBlockHeader, verifyBlockHeader };
