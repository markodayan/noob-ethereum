function findTransactionInteraction(block: IRawBlock, from: string, to: string) {
  return (block.transactions as RawTransactions).reduce((acc: string[], tx: RawTransaction) => {
    if (isTransactionInteractionMatch(tx, from, to)) {
      acc.push(tx.hash!);
    }
    return acc;
  }, []);
}

function isTransactionInteractionMatch(tx: RawTransaction, from: string, to: string): boolean {
  return tx.from === from && tx.to === to ? true : false;
}

export { findTransactionInteraction };
