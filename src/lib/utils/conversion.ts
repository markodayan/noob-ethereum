function stringifiedIntToHexDecimal(num: string): string {
  return '0x' + (+num).toString(16);
}

export { stringifiedIntToHexDecimal };
