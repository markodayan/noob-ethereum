# Ethereum JSON-RPC

These are JSON-RPC methods that you can use to interact with an EVM-based Ethereum client.

## Methods

- `web3_clientVersion` → current client version
- `web3_sha3` → Hashes data
- `net_listening` → returns listening status
- `net_peerCount` → number of peers
- `net_version` → Network identifier associated with network
- `eth_blockNumber` → Returns the number of the most recent block
- `eth_call` → Executes a new message call (locally) immediately without creating a transaction on the blockchain.
- `eth_chainId` → Returns the currently configured chain id
- `eth_coinbase` → Returns the client coinbase address
- `eth_estimateGas` → Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction will not be added to the blockchain. Note that the estimate may be significantly more than the amount of gas actually used by the transaction, for a variety of reasons including EVM mechanics and node performance.
- `eth_gasPrice` → Returns the current price per gas in wei
- `eth_feeHistory` → Transaction fee history
- `eth_getBalance` → Returns Ether balance of a given or account or contract
- `eth_getBlockByHash` → Gets a block for a given hash
- `eth_getBlockByNumber` → Gets a block for a given number
- `eth_getBlockTransactionCountByHash` → Returns the number of transactions in a block from a block matching the given block hash
- `eth_getBlockTransactionCountByNumber` → Returns the number of transactions in a block from a block matching the given block number
- `eth_getCode` → Returns code at a given contract address
- `eth_getFilterChanges` → Polling method for a filter, which returns an array of logs which occurred since last poll
- `eth_getFilterLogs` → Returns an array of all logs matching filter with given id
- `eth_getRawTransactionByHash` → Returns raw transaction data of a transaction with the given hash
- `eth_getRawTransactionByBlockHashAndIndex` → Returns raw transaction data of a transaction with the block hash and index of which it was mined
- `eth_getLogs` → Returns an array of all logs matching a given filter object
- `eth_getStorageAt` → Gets a storage value from a contract address, a position, and an optional blockNumber
- `eth_getTransactionByBlockHashAndIndex` → Returns the information about a transaction requested by the block hash and index of which it was mined
- `eth_getTransactionByBlockNumberAndIndex` → Returns the information about a transaction requested by the block number and index of which it was mined
- `eth_getTransactionByHash` → Returns the information about a transaction requested by transaction hash
- `eth_GetTransactionCount` → Return the number of transaction sent from an address
- `eth_getTransactionReceipt` → Returns the number of transactions sent from an address
- `eth_getUncleByBlockHashAndIndex` → Returns information about a uncle of a block by hash and uncle index position
- `eth_getUncleByBlockNumberAndIndex` → Returns information about a uncle of a block by hash and uncle index position
- `eth_getUncleCountByBlockHash` → Returns the number of uncles in a block from a block matching the given block hash
- `eth_getUncleCountByBlockNumber` → Returns the number of uncles in a block from a block matching the given block number
- `eth_getProof` → Returns the account and storage values of the specified account including the Merkle-proof
- `eth_getWork` → Returns the hash of the current block, the seedHash, and the boundary condition to be met ('target')
- `eth_hashrate` → Returns the number of hashes per second that the node is mining with
- `eth_mining` → Returns true if client is actively mining new blocks
- `eth_newBlockFilter` → Creates a filter in the node, to notify when a new block arrives. To check if the state has changed , call `eth_getFilterChanges`
- `eth_newFilter` → Creates a filter object, based on filter options, to notify when the state changes (logs). To check if the state has changed, call `eth_getFilterChanges`
- `eth_newPendingTransactionFilter` → Creates a filter in the node, to notify when new pending transactions arrive. To check if the state has changed, call `eth_getFilterChanges`
- `eth_pendingTransactions` → Returns the transactions that are pending in the transaction pool and have a from address that is one of the accounts this node manages
- `eth_protocolVersion` → Returns the current Ethereum protocol version
- `eth_sendRawTransaction` → Creates a new message call transaction or a contract creation for signed transactions
- `eth_submitHashrate` → Used for submitting mining hashrate
- `eth_submitWork` → Used for submitting a proof-of-work solution
- `eth_syncing` → Returns an object with data about the sync status or false
- `eth_uninstallFilter` → Uninstalls a filter with given id. Should always be called when watch is no longer needed. Additionally Filters timeout when they are not requested with `eth_getFilterChanges` for a period of time

---

## Content Descriptors

`block`

The Block is the collection of relevant pieces of information (block header), together with information corresponding to comprised transactions, and a set of other block headers that are known to have a parent equal to the present block's grandparent

```
number -> hex representation of the block's height

hash -> hex representation of a Keccak 256 hash

parentHash -> hex representation of the Keccak 256 of the RLP encoded block

nonce -> A number only to be used once

sha3Uncles -> Keccak hash of the uncles data in the block

logsBloom -> The bloom filter for the logs of the block or null when its the pending block

transactionsRoot -> The root of the transactions trie of the block

stateRoot -> The root of the final state trie of the block

receiptsRoot -> The root of the receipt's trie of the block

miner -> address of the miner

difficulty -> Integer of the difficulty for this block

totalDifficulty -> Hex representation of the ineger

extraData -> The 'extra data' field of this block

size -> Integer size of this block in bytes

gasLimit -> The maximum gas allowed in this block

gasUsed -> The total used gas by all transactions in this block

timestamp -> The unix timestamp for when the block was collated

transactions -> [Array - discussed below]

uncles -> Array of uncle hashes (Block hash of the RLP encoding of an uncle block[])

baseFeePerGas -> The block's baseline network fee per gas
```

`Null`

JSON Null value

`signature`

The signature. A hex representation of a byte array between 2 and 65 characters long.

`gasPrice`

Integer of the current gas price

`transaction`

```
blockHash -> Hex representation of a Keccak 256 hash

blockNumber -> Hex representation of the block's height

type -> The transaction's EIP-2718 type byte (if applicable)

from -> The sender of the transaction

gas -> The gas limit provided by the sender in Wei

hash -> Keccak 256 hash of the RLP encoding of a transaction

input -> The data field sent with the transaction

accessList -> Array of accessListEntry objects with address and storage keys proproperties

nonce -> The total number of prior transactions made by the sender

to -> address of account being sent to

transactionIndex -> Hex representation of the integer

value -> Value of ether being transferred in Wei

v -> transactionSigV (ECDSA recovery id)

r -> transactionSigR (ECDSA signature r)

s -> transactionSigS (ECDSA signature s)

////// One of these 2 objects will be a property depending on TX Type /////

Object (EIP-1559 parameters)
	- gasPrice
	- maxPriorityFeePerGas
	- maxFeePerGas

Object (Legacy)
	- gasPrice
```

`transactionResult`

Returns a transaction or null

Transaction results object properties:

```
blockHash -> Hex representation of a Keccak 256 hash

blockNumber -> Hex representation of the block's height

type -> The transaction's EIP-2718 type byte (if applicable)

from -> The sender of the transaction

gas -> The gas limit provided by the sender in Wei

hash -> Keccak 256 hash of the RLP encoding of a transaction

input -> The data field sent with the transaction

accessList -> Array of accessListEntry objects with address and storage keys proproperties

nonce -> The total number of prior transactions made by the sender

to -> address of account being sent to

transactionIndex -> Hex representation of the integer

value -> Value of ether being transferred in Wei

v -> transactionSigV (ECDSA recovery id)

r -> transactionSigR (ECDSA signature r)

s -> transactionSigS (ECDSA signature s)

////// One of these 2 objects will be a property depending on TX Type /////

Object (EIP-1559 parameters)
	- gasPrice
	- maxPriorityFeePerGas
	- maxFeePerGas

Object (Legacy)
	- gasPrice
```

`uncleCountResult`

The number of total uncles in the given block

`message`

Hex representation of a variable length byte array

`filter`

A filter used to monitor the blockchain for logs/events (An Object)

Properties:

```
fromBlock -> The hex representation of the block's height

toBlock -> The hex representatin of the block's height

address -> string of address (can be an array of contract addresses from which we want to monitor events)

topics -> Topics are order-dependent. Each topic can also be an array of DATA with 'or' options.

```

`address`

The address

`blockHash`

The hex representation of the Keccak 256 of the RLP encoded block

`nonce`

A number only to be used once

`key`

Hex position of the storage slot where the variable exists

`logs`

An array of all logs matching filter with given id

```
Array contains Object (an indexed event generated during a transaction)

Object:
- address -> Sender of the transaction
- blockHash -> The hex representation of the Keccak 256 of the RLP encoded block
- blockNumber -> The hex representation of the block's height
- data -> The data/input string sent along with the transaction
- logIndex -> The index of the event within its transaction, null when its pending
- removed -> Boolean that shows whether the log was orphaned off the main chain
- topics -> An array of topics. Topics are order-dependent. Each topic can also be an array of DATA with 'or' options. 32 Bytes DATA of indexed log arguments. (In Solidity, the first topic is the hash of the signature of the event)
- transactionHash -> Keccak 256 hash of the RLP encoding of a transaction
- transactionIndex -> Hex representation of the integer

```

`filterId`

An identifier used to reference the filter

`blockNumber`

The hex representation of the block's height. There is also an optional block height description

`transactionHash`

Keccak 256 Hash of the RLP encoding of a transaction
