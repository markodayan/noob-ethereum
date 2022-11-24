import createKeccakHash from 'keccak';

const hexGreaterThan = (limit: string) => (val: string) => parseInt(val, 16) >= parseInt(limit, 16);
const hexGreaterThan8 = hexGreaterThan('8');
const toCapitalise = (hex: string) => hexGreaterThan8(hex);

/**
 * Compute the EIP-55 checksum of a supplied Ethereum address
 * @param {string} - address (e.g. 0x001d3f1ef827552ae1114027bd3ecf1f086ba0f9)
 * @returns {string} - (e.g. 0x001d3F1ef827552Ae1114027BD3ECF1f086bA0F9)
 */
const eip55Checksum = (address: string) => {
  const formatted = address.startsWith('0x') ? address.substring(2) : address;
  const keccakHash = createKeccakHash('keccak256').update(formatted).digest('hex');
  return (
    '0x' +
    formatted
      .split('')
      .map((v, i, arr) => (toCapitalise(keccakHash[i]) ? v.toUpperCase() : v))
      .join('')
  );
};

export { eip55Checksum as checksum };
