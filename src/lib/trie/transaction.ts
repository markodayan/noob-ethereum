import { Trie as ethjsTrie } from '@ethereumjs/trie';
import { rlp } from 'ethereumjs-util';

import { serialiseTransaction, calculateTransactionHash } from '@lib/rlp/transaction';
import { hexify } from '@lib/utils/conversion';

class TransactionTrie {
  private trie: ethjsTrie;

  constructor() {
    this.trie = new ethjsTrie();
  }

  /**
   * Fetch the decoded data corresponding to a transactionIndex key from the trie
   * @param {string | number} key - transaction index (in hex string form or integer)
   * @returns {Promise<string[]>}
   */
  public async get(key: string | number): Promise<string[]> {
    if (typeof key === 'number') {
      key = hexify(key);
    }

    const raw = await this.trie.get(rlp.encode(key));
    const data = rlp.decode(raw) as Buffer[];

    return data.map((elem) => hexify(elem));
  }

  /**
   * Insert transaction into trie
   * @param {RawTransaction} tx - transaction body (must be signed - aka including v,r,s)
   * @returns {Promise<boolean>}
   */
  public async put(tx: RawTransaction): Promise<boolean> {
    try {
      const serialised = serialiseTransaction(tx);
      await this.trie.put(rlp.encode(tx.transactionIndex), serialised);
      return true;
    } catch (err) {
      return false;
    }
  }
}

export default TransactionTrie;
