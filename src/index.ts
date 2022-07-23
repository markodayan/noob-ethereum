import { Provider } from '@src/packages';

const { provider } = new Provider('infura', process.env.INFURA_PROJECT_ID as string);

// provider.getLatestBlock().then((block) => {
//   const blockNumber = parseInt(block.number, 16);
//   exportToJSONFile(block, blockNumber.toString(), '/src/junk/blocks/1559');
// });

// provider.seedLatestBlock();
provider.seedBlockByNumber(12964800);
// provider.seedBlockByNumber(400000);

// provider.getBlockByNumber(12_964_760).then((block) => {
//   const blockNumber = parseInt(block.number, 16);
//   exportToJSONFile(block, blockNumber.toString(), '/src/junk/blocks/legacy');
// });

import createKeccakHash from 'keccak';

// first level
let hash_0 = 'de838e9e0a4b3e84cad3a9d39f9fe437c20f318b30d3166f08c0cdbee96032ab';
let hash_1 = 'b8af24a884ce251f7b69c435d70b26b4d69041695ff24aab1b55d194a3fdd883';
let hash_2 = '22615f586e4a86b23ead367df957a03709c50c3e9f8d9d951d77eb93984a0744';
let hash_3 = 'e89799872416a62940a671d2617fca8be0977d1f52289bc3bc94933421343c70';
let hash_4 = 'f0222e4555f079f2fdbf570707db75ee508caa46321baeff622a993218303d10';
console.log(`------Level 3------`);
console.log(`hash_0: ${hash_0}`);
console.log(`hash_1: ${hash_1}`);
console.log(`hash_2: ${hash_2}`);
console.log(`hash_3: ${hash_3}`);
console.log(`hash_4: ${hash_4}`);

let hash_01 = createKeccakHash('keccak256')
  .update(hash_0 + hash_1)
  .digest('hex');

let hash_23 = createKeccakHash('keccak256')
  .update(hash_2 + hash_3)
  .digest('hex');

// 2nd level
console.log(`------Level 2-----`);
console.log(`hash_01: ${hash_01}`);
console.log(`hash_23: ${hash_23}`);
console.log(`hash_4: ${hash_4}`);

// 3rd level
let hash_0123 = createKeccakHash('keccak256')
  .update(hash_01 + hash_23)
  .digest('hex');

console.log(`----Level 1------`);
console.log(`hash_0123: ${hash_0123}`);
console.log(`hash_4: ${hash_4}`);

// 4th level
let hash_01234 = createKeccakHash('keccak256')
  .update(hash_0123 + hash_4)
  .digest('hex');
console.log(`----- Level 0 (Merkle Root) ------`);
console.log(`hash_01234: ${hash_01234}`);
