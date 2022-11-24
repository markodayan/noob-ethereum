type Input = string | number | bigint | Uint8Array | Array<Input> | null | undefined | any;
type NestedUint8Array = Array<Uint8Array | NestedUint8Array>;

function encode(input: Input): Uint8Array {
  /* (1) Non-value input */
  if (input === '' || input === false || input === null) {
    const value = parseInt('0x80', 16);
    return Uint8Array.from([value]);
  }

  /* (2) Empty list input */
  if (Array.isArray(input) && input.length === 0) {
    const value = parseInt('0xc0', 16);
    return Uint8Array.from([value]);
  }

  /* For decimal value inputs */
  if (typeof input === 'number') {
    if (input < 0) {
      throw new Error('Integer must be unsigned (provide decimal value greater than or equal to 0');
    }

    if (input === 0) {
      const value = parseInt('0x80', 16);
      return Uint8Array.from([value]);
    }

    /* (3) A single byte with value within range [0x00, 0x7f] as input */
    if (input <= 127) {
      return Uint8Array.from([input]);
    }

    if (input > 127) {
      const hexStr = input.toString(16);
      const byteArr = hexStringToByteArr(hexStr);
      const first = parseInt('0x80', 16) + byteArr.length;
      return Uint8Array.from([first, ...byteArr]);
    }
  }

  /* true boolean input */
  if (input === true) {
    const value = parseInt('0x01', 16);
    return Uint8Array.from([value]);
  }

  /* For hexadecimal escape sequence inputs */
  if (isEscapedFormat(input)) {
    // @ts-ignore
    const payload: any[] = (input as string)
      .split('')
      .reduce((acc, v) => acc + encodeURI(v).slice(1), '')
      .match(/.{1,2}/g);

    if (payload.length === 1) {
      const value = parseInt(payload[0], 16);
      return Uint8Array.from([value]);
    }

    if (payload.length <= 55) {
      const first = parseInt('0x80', 16) + payload.length;
      return Uint8Array.from([first, ...payload]);
    }
  }

  /* For hexadecimal strings prefixed by '0x' */
  if (typeof input === 'string' && input.startsWith('0x')) {
    const payload = stripHexPrefix(input);

    // If odd number of digits in hexadecimal string -> append '0' prefix
    const padded = payload.length % 2 === 0 ? payload : '0' + payload;
    // Create array of hex values where each element is prefixed by '0x' (we do this so byte array can convert these hex values to decimal byte values in the return statement)
    const hexArr: any[] = padded.match(/.{1,2}/g)!.map((x) => '0x' + x);

    // This is for hexadecimal strings with length greater than 55 bytes
    if (hexArr.length > 55) {
      const lengthInHex = hexArr.length.toString(16);
      const bytesToStoreLengthInHex = hexStringToByteArr(lengthInHex);
      const first = parseInt('0xb7', 16) + bytesToStoreLengthInHex.length;
      return Uint8Array.from([first, ...bytesToStoreLengthInHex, ...hexArr]);
    }

    const first = parseInt('0x80', 16) + hexArr.length;
    return Uint8Array.from([first, ...hexArr]);
  }

  /* (4) Input is string with length of 1 byte */
  if (typeof input === 'string' && input.length === 1) {
    const value = input.charCodeAt(0);
    return Uint8Array.from([value]);
  }

  /* (5) Input is string between 2-55 bytes in length */
  if (typeof input === 'string' && input.length <= 55) {
    const first = parseInt('0x80', 16) + input.length;
    const encoded = input.split('').map((c) => c.charCodeAt(0));

    return Uint8Array.from([first, ...encoded]);
  }

  /* (6) Input is string greater than 55 bytes in length */
  if (typeof input === 'string' && input.length > 55) {
    const lengthInHex = stripHexPrefix(input).length.toString(16);
    const bytesToStoreLengthInHex = hexStringToByteArr(lengthInHex);

    const first = parseInt('0xb7', 16) + bytesToStoreLengthInHex.length;
    const encoded = input.split('').map((c) => c.charCodeAt(0));

    return Uint8Array.from([first, ...bytesToStoreLengthInHex, ...encoded]);
  }

  if (Array.isArray(input)) {
    const encoded = [];
    let encodedLength = 0;

    for (const item of input) {
      const enc = encode(item);
      encoded.push(...enc);
      encodedLength += enc.length;
    }

    /* (7) Input is list with the sum of its RLP-encoded contents being between 1–55 bytes  */
    if (encodedLength <= 55) {
      const first = parseInt('0xc0', 16) + encodedLength;
      return Uint8Array.from([first, ...encoded]);
    }

    /* (8) Input is list with the sum of its RLP-encoded contents being greater than 55 bytes */
    if (encodedLength > 55) {
      const lengthInHex = encodedLength.toString(16);
      const bytesToStoreLengthInHex = hexStringToByteArr(lengthInHex);

      const first = parseInt('0xf7', 16) + bytesToStoreLengthInHex.length;
      return Uint8Array.from([first, ...bytesToStoreLengthInHex, ...encoded]);
    }
  }

  throw new Error(
    'Unhandled input payload (if bigint payload, then encode method requires an update) - no encoding scheme available (perhaps stringify or encode as a list)'
  );
}

/** Method to detect whether input is escaped hexadecimal sequence */
function isEscapedFormat(input: Input): boolean {
  if (typeof input === 'string') {
    return encodeURI(input[0]).startsWith('%');
  }

  return false;
}

function stripHexPrefix(input: string): string {
  if (input.startsWith('0x')) {
    input = input.slice(2);
  }

  return input;
}

function hexStringToByteArr(input: string): Uint8Array {
  input = stripHexPrefix(input);

  let arr: string[] = [];

  if (input.length % 2 === 0) {
    // if even number of hex digits -> input doesn't require prefixing for splitting into hex byte values
    arr = input.match(/.{1,2}/g)! as string[];
  } else {
    // if odd number of hex digits -> prefix with 0 digit before splitting into hex byte values
    arr = ('0' + input).match(/.{1,2}/g)! as string[];
  }

  // Convert hexadecimal value array to decimal value array
  const decimalArr = arr.map((h) => parseInt(h, 16));

  // Create byte array from decimal value array
  return Uint8Array.from(decimalArr);
}

// const a = '0xabff';
// const b = '0xabf';
// const c = '0x0abf';

// console.log('a', hexStringToByteArr('abff')); // Uint8Array(2) [ 171, 255 ]
// console.log('b', hexStringToByteArr('abf')); // Uint8Array(2) [ 10, 191 ]
// console.log('c', hexStringToByteArr('0abf')); // Uint8Array(2) [ 10, 191 ]

// console.log('a (improved)', hexStringToByteArr('abff')); // Uint8Array(2) [ 171, 255 ]
// console.log('b (hexStringToByteArr)', hexStringToByteArr('abf')); // Uint8Array(2) [ 10, 191 ]
// console.log('c (hexStringToByteArr)', hexStringToByteArr('0abf')); //  Uint8Array(2) [ 10, 191 ]

// console.log('a (hexStringToByteArr with prefix)', hexStringToByteArr(a)); // Uint8Array(2) [ 171, 255 ]
// console.log('b (hexStringToByteArr with prefix)', hexStringToByteArr(b)); // Uint8Array(2) [ 10, 191 ]
// console.log('c (hexStringToByteArr with prefix)', hexStringToByteArr(c)); //  Uint8Array(2) [ 10, 191 ]

export { encode };
