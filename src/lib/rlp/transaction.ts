import { rlp } from 'ethereumjs-util';
import { utils } from 'ethers';
import createKeccakHash from 'keccak';

function convertToByteArray(field: string | any[]): any {
  const isNested = Array.isArray(field);
  const emptyArr = Array.isArray(field) && field.length === 0;

  if (emptyArr) return [];

  if (!isNested) {
    if (field === '0x0') {
      return Uint8Array.from([]);
    } else {
      return toByteArr(field as string);
    }
  } else {
    return convertToByteArray(field);
  }
}

function toByteArr(field: string) {
  const arr = [];
  const suffix = field.slice(2);
  const byteLength = Math.ceil(suffix.length / 2);
  const padded = utils.hexZeroPad(field, byteLength).slice(2);

  for (let i = 0; i < padded.length; i += 2) {
    arr.push(parseInt(padded.slice(i, i + 2), 16));
  }

  return new Uint8Array(arr);
}

function toByteTuple(tuple: string[] | any[]): Uint8Array[] {
  return tuple.map((field) => convertToByteArray(field));
}

function serialiseTransaction(tx: RawLegacyTransaction | Raw1559Transaction | Raw2930Transaction): Buffer | string {
  switch (tx.type) {
    /* Legacy transaction */
    case '0x0':
    default: {
      const { nonce, gasPrice, gas, to, value, input, v, r, s } = tx as RawLegacyTransaction;
      const tuple = [nonce, gasPrice, gas, to, value, input, v, r, s];
      const byteTuple = toByteTuple(tuple);
      return rlp.encode(byteTuple);
    }
    /* EIP-2930 transaction */
    case '0x1': {
      // Need to figure out how to encode accessList string array
      const { chainId, nonce, gasPrice, gas, to, value, input, accessList, v, r, s } = tx as Raw2930Transaction;
      const tuple = [chainId, nonce, gasPrice, gas, to, value, input, accessList, v, r, s];
      const byteTuple = toByteTuple(tuple);
      const encodedPayload = rlp.encode(byteTuple);

      const type = Buffer.from('01', 'hex');
      return Buffer.concat([type, encodedPayload]);
    }

    /* EIP-1559 transaction */
    case '0x2': {
      const { chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gas, to, value, input, accessList, v, r, s } =
        tx as Raw1559Transaction;
      const tuple = [chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gas, to, value, input, accessList, v, r, s];
      const byteTuple = toByteTuple(tuple);
      const encodedPayload = rlp.encode(byteTuple);

      const type = Buffer.from('02', 'hex');
      return Buffer.concat([type, encodedPayload]);
    }
  }
}

function calculateTransactionHash(tx: RawLegacyTransaction): string {
  const serialised = serialiseTransaction(tx);
  return '0x' + createKeccakHash('keccak256').update(serialised).digest('hex');
}

function calculateBlockTransactionHashes(block: IRawBlock): string[] {
  const hashes: string[] = [];

  if (typeof block.transactions[0] !== 'string') {
    block.transactions.forEach((t) => hashes.push(calculateTransactionHash(t as RawTransaction)));
  }

  return hashes;
}

/* ---------------------------- Local Testing ---------------------------------- */

import legacyBlock from '@src/seeder/blocks/legacy/10467135.json';
import eip1559Block from '@src/seeder/blocks/1559/15122054.json';

// const testBlock = legacyBlock3;
// const testBlock = legacyBlock;
const testBlock = eip1559Block;

const calculatedHashes = calculateBlockTransactionHashes(testBlock as IRawBlock);
const transactionHashesFetched = testBlock.transactions.map((tx) => tx.hash);

let count = 0;
const equalIndexes = [];

for (let i = 0; i < transactionHashesFetched.length; i++) {
  const { value, type } = testBlock.transactions[i];

  if (calculatedHashes[i] === transactionHashesFetched[i]) {
    count++;
    equalIndexes.push('0x' + i.toString(16));
  }

  console.log(
    '0x' + i.toString(16),
    `type: ${type}`,
    calculatedHashes[i] === transactionHashesFetched[i],
    calculatedHashes[i],
    transactionHashesFetched[i],
    testBlock.transactions[i].input === '0x' ? 'input = 0x' : value !== '0x0' ? 'Contract Call with ETH included' : ''
  );
}

console.log('\n---------------');
console.log(`Block ${parseInt(testBlock.number, 16)}`);
console.log('---------------');
console.log(`count: ${count}`);
console.log(`equalIndexes: ${equalIndexes}`);

export {};
