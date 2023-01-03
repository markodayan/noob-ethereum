<div align="center">
<br />
    <img src="./assets/ethereum.png" alt="Ethereum" width="80" >

<br />
  <h2 align="center">Noob-Ethereum</h2>
  <p align="center">
    JavaScript utilities to help you understand how Ethereum works
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br /> -->
    <!-- <br /> -->
    <!-- <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a> -->
    ·
    <a href="https://github.com/markodayan/noob-ethereum/issues">Report Bug</a>
    ·
    <a href="https://github.com/markodayan/noob-ethereum/issues">Request Feature</a>
  </p>
</div>

<br />

<!-- ABOUT THE PROJECT -->

# About The Project

This repository was made to provide various utilities for interacting with Ethereum along with implementation of methods
highlighting crucial tasks conducted by in the permissionless environment inherent with blockchain networks.

The goal of this repository is to educate developers about how various aspects of Ethereum (and blockchain protocols in
general) and to provide modules to not re-invent the wheel when dealing with Ethereum.

# What Can I Do?

- Use either your local full node or Alchemy/Infura for making JSON-RPC queries (and getting sanitised results).
- Seed blocks or transaction receipts (based on certain conditions).
- Verify Merkle root integrity and compute Merkle proofs.
- RLP serialisation utilities

# Getting Started

Install the package with:

```bash
npm i noob-ethereum
```

## Provider Use

You can instantiate a provider as shown below (you will require a JSON-RPC endpoint which you can get from your full
node or a JSON-RPC provider like Alchemy, Infura etc):

```typescript
import { Provider, Searcher, utils } from 'noob-ethereum';

// Insert RPC URL as argument (e.g. http://localhost:8545 for full node, or any Alchemy or Infura endpoint)
const provider = Provider.init('<RPC-URL>');
// or
const provider = Provider.init(process.env.INFURA_URL as string);

/* Fetch latest block */
const block = await provider.getLatestBlock();
/* Fetch block by number */
const query = await provider.getBlockByNumber(12_964_760, true);

/* Seed latest block to JSON file (include full transaction objects)  */
await provider.seedLatestBlock(true, 'src/junk').then();

/* Seed block by number to JSON file (only include transaction hashes - preferable if you are not interested in transaction data) */
await provider.seedBlockByNumber(false, 12_964_760, 'src/junk').then();

/* Get Ethereum block by number */
provider.getBlockByNumber(15_447_147, true).then(console.log);

/* Detect for Optimism batch publication from latest block */
provider.getLatestBlock(true).then((res) => {
  const sequencer = '0x6887246668a3b87F54DeB3b94Ba47a6f63F32985'.toLowerCase();
  const ctc = '0x5E4e65926BA27467555EB562121fac00D24E9dD2'.toLowerCase();

  const batchTxs = Searcher.findTransactionInteraction(res, sequencer, ctc);
  console.log(`batch tx hashes (from block ${utils.decimal(res.number)})`, batchTxs);
});
```

# Other Dependencies

This library aims to be as local as possible, hence dependencies are kept to a minimum, the wheel is only re-invented
where it is determined to be relevant. Stuff like cryptographic hash functions like SHA3 (keccak256) are best left to
the professionals hence it is required as a dependency here.

<br />

<!-- LICENSE --->

# License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT --->

# Contact

Mark Odayan - [@mark_mkzo](https://twitter.com/mark_mkzo)

<p align="right">(<a href="#top">back to top</a>)</p>
