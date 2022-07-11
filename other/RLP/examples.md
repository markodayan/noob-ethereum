# Examples

- "dog" = `[ 0x83, 'd', 'o', 'g']`
- ["cat", "dog"] = `[0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g']`
- Empty string ('null') = `[ 0x80 ]`
- Integer 0 = `[ 0x80 ]`
- Encoded integer 0 ('\x00') = `[ 0x00 ]`
- Encoded integer 15 ('\x0f') = `[ 0x0f ]`
