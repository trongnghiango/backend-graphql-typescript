export type PayAtherEventData = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  tongtien: string;
  vi: string;
  tien: string;
};

export type CreateNftEventData = {
  "0": string;
  "1": string;
  "2": string;
  amount: string;
  tokenId: string;
};

export type SMEventType = {
  removed: false;
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  address: string;
  id: string;
  returnValues: PayAtherEventData | CreateNftEventData | any;
  event: string;
  signature: string;
  raw: {
    data: string;
    topics: string[];
  };
};
