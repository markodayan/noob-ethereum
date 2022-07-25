function stringifiedIntToHexDecimal(num: string): string {
  return '0x' + (+num).toString(16);
}

/**
 * Convert hex string/Buffer to 0x-prefixed hex string OR convert decimal number to 0x-prefixed hex string
 * @param {string | Buffer | number} exp - hex string (e.g. 'a2'), hex Buffer, decimal number (e.g. 22)
 * @returns {string} - 0x-prefixed hex string (e.g. 'ab' -> '0xab',  22 -> '0x16)
 */
function hexify(exp: string | Buffer | number): string {
  if (Buffer.isBuffer(exp)) {
    return '0x' + exp.toString('hex');
  }

  if (typeof exp === 'number') {
    return '0x' + exp.toString(16);
  }

  return '0x' + exp;
}

export { stringifiedIntToHexDecimal, hexify };
