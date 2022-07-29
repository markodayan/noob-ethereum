declare type IStandardizedBlock = {
  gasLimit: number;
  gasUsed: number;
  nonce: number;
  number: number;
  size: number;
  timestamp: string;
  uncles: string[];
  gasUtilizationRatio: number;
  txCount: number;
  basefee: number | null /* null for blocks prior to London hardfork */;
  transactions?: IProcessedTransaction[];
  priorityFees?: IStandardizedPriorityFees;
  analytics?: {
    eip1559Ratio: number;
    burntETH: number;
    minerFees: number;
    blockPieChart?: {
      [key: string]: number;
    };
  };
};

declare interface IStandardizedPriorityFees {
  fast: number;
  average: number;
  slow: number;
}

declare type IFeeHistory = {
  priorityFees: number[];
};

declare interface IProcessedTransaction {
  blockNumber: number;
  txHash: string;
  txNonce: number;
  gasUsed: number;
  gasPrice: number;
  tipPrice: number /* tip price in Gwei */;
  feesInETH: {
    burnt: number /* burnt ETH (gas-used * basefee) -> then convert gwei to ETH */;
    tip: number /* tip value in ETH (gas-used * tipPrice) -> then convert gwei to ETH */;
    total: number /* above 2 properties added together */;
  };
  from: string;
  to: string;
  value: string;
  input?: string;
  transactionIndex: number;
  is1559: boolean;
  transfer: null | {
    to: string;
    from: string;
    asset: string;
    value: number;
  };
  type: string;
}
