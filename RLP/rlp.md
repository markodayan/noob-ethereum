## <b>Recursive Length Prefix (RLP)</b>

Guided by Medium article [here](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919). Will fully verify and consolidate after consulting more sources.

RLP is an encoding/decoding algorithm that helps Ethereum serialise data and reconstruct it quickly.

### <b>RLP Encoding</b>

RLP encoding function takes an argument (e.g. a string, array or some multi-level array). They get converted to byte array format.

```
These are all example input 'items' to the encoding function

- "dog"
- []
- ["dog"]
- [[], "dog", ["cat"], ""]

```

<u>RLP encoding is defined below:</u>

1. If input is a single byte in the `[0x00, 0x7f]` range, so itself is RLP encoding.

2. If the input is <b>a non-value</b> (0, []byte{}. string(""), empty pointer) then the <u>RLP encoding is `0x80`</u>. NOTE how <u>`0x00` is NOT a non-value</u>.

3. If input is a <b>special byte</b> in `[0x80, 0xff]` range, RLP encoding will concatenates 0x81 with the byte, [0x81, the_byte].

4. If input is <b>a string with 2–55 bytes long</b>, RLP encoding consists of a single byte with value `0x80` plus the length of the string in bytes and then array of hex value of string. It’s easy to see that the first byte is in [0x82, 0xb7] range.
   For example: `“hello world” = [0x8b, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64]` , because `“hello world”` has 11 bytes in dec or `0x0b` in hex, so the first byte of RLP encoding is `0x80 + 0x0b = 0x8b` , after that we concatenate the bytes of “hello world”.

5. If input is <b>a string with more than 55 bytes long</b>, RLP encoding consists of 3 parts from the left to the right. The first part is a single byte with value `0xb7` plus the length in bytes of the second part. The second part is hex value of the length of the string. The last one is the string in bytes. The range of the first byte is `[0xb8, 0xbf]`.
   For example: a string with 1024 “a” characters, so the encoding is `“aaa…” = [0xb9, 0x04, 0x00, 0x61, 0x61, …]`. As we can see, from the forth element of array `0x61` to the end is the string in bytes and this is the third part. The second part is `0x04, 0x00` and it is the length of the string 0x0400 = 1024. The first part is `0xb9 = 0xb7 + 0x02` with `0x02` being the length of the second part.

6. If <b>input is an empty array</b>, RLP encoding is a single byte `0xc0`.

7. If input is <b>a list with total payload in 0–55 bytes long</b>, RLP encoding consists of a single byte with value `0xc0` plus the length of the list and then the concatenation of RLP encodings of the items in list. The range of the first byte is `[0xc1, 0xf7]`.
   For example: `[“hello”, “world”] = [0xcc, 0x85, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x85, 0x77, 0x6f, 0x72, 0x6c, 0x64]`. In this RLP encoding, `[0x85, 0x68, 0x65, 0x6c, 0x6c, 0x6f]` is RLP encoding of `“hello”`, `[0x85, 0x77, 0x6f, 0x72, 0x6c, 0x64]` is RLP encoding of `“world”` and `0xcc = 0xc0 + 0x0c` with `0x0c = 0x06 + 0x06` being the length of total payload.

8. If input is <b>a list with total payload more than 55 bytes long</b>, RLP encoding includes 3 parts. The first one is a single byte with value `0xf7` plus the length in bytes of the second part. The second part is the length of total payload. The last part is the concatenation of RLP encodings of the items in list. The range of the first byte is `[0xf8, 0xff]`.

9. In Go source code, boolean type, `true = 0x01` and `false = 0x80`.

### <b>RLP Decoding (Ethereum Spec may be better source for this)</b>

RLP decoding is easier once you figure out how RLP encoding works.
RLP decoding simply receives encoded input and <u>decodes the type and the length of the data</u>.

1. According to the first byte of the input, RLP decoding analyses the `data`, the `type`, the `length of the data`, and the `offset`.
2. According to the `type` and the `offset` of the data, it can decode the data.
3. Decode the rest of the input if possible (?)

### <b>Diving into RLP</b>

RLP just focusses on byte, string and list.
So extra data types such as big number, boolean, pointer, slide are based on whatever language is used to implement RLP.

The first byte of encoded data decides what type the data is:

- `[0x00, 0x7f]`: byte
- `[0x80, 0xbf]`: string
- `[0xc0, 0xff]`: list

Q: <u>Why don't we use a fixed prefix instead of these ranges?</u>

> The data sometimes needs some bytes to describe the type, length of the data, but also sometimes the data also shows its type or the length itself. <u>So Why Then? -> To save memory space</u>.

Q: <u>Why was `0x7f, 0x80, 0xbf, 0xc0` chosen as the checkpoints?</u>

> We don’t wanna use any prefix with encoding a single byte, because it will be double (or triple, or more) the memory to store the encoded data if we use a fixed prefix as what I explained in the first question. So we need to determine a range in which, the byte is encoded by itself.

Q: <u>Why must we use a range to describe a type instead of the only one value of byte?</u>

> One value of byte is enough to represent a type of data but we need to know how long the data is to get the offset. In order to do that, we need to add more prefixes. We choose a range of bytes to not only encode the type of data but also the length of data.
