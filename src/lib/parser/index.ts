import { hexify, decimal, toISO, toGwei } from '@lib/utils';

/**
 * Return gas utilisation ratio for the block
 * @param {number} used  - gas used (cummulative gas used by txs included in block)
 * @param {number} limit - gas limit (according to block received)
 * @returns {number} - percentage-readable value by default (e.g. 97% therefore 0.97)
 */
function gasUsedRatio(used: string, limit = '0x0'): number {
  const num = decimal(used);
  const den = decimal(limit);
  const ratio = Math.floor((num / den) * 100);

  return +(ratio * 0.01).toFixed(2);
}

function getERC20Value(input: string, decimals: number): string[] {
  const address = '0x' + input.slice(2).slice(8).slice(24, -64);
  const value = input.slice(2).slice(8).slice(24).slice(40);
  const amount = parseInt(value, 16) * Math.pow(10, -1 * decimals);
  return [address, JSON.stringify(amount)];
}

function standardizeBlock(block: IRawBlock, verbose = false): IStandardizedBlock {
  const standardized: IStandardizedBlock = {
    gasLimit: decimal(block.gasLimit),
    gasUsed: decimal(block.gasUsed),
    nonce: decimal(block.nonce),
    number: decimal(block.number),
    size: decimal(block.size),
    timestamp: toISO(decimal(block.timestamp)),
    uncles: block.uncles,
    gasUtilizationRatio: gasUsedRatio(block.gasUsed, block.gasLimit),
    txCount: block.transactions.length,
    basefee: toGwei(block.baseFeePerGas, 'wei'),
  };

  return standardized;
}

export { standardizeBlock };
