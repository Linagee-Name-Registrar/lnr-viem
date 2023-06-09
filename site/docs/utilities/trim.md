---
head:
  - - meta
    - property: og:title
      content: trim
  - - meta
    - name: description
      content: Trims the leading or trailing zeros from a hex value or byte array.
  - - meta
    - property: og:description
      content: Trims the leading or trailing zeros from a hex value or byte array.

---

# trim

Trims the leading or trailing zeros from a hex value or byte array.

## Install

```ts
import { trim } from 'viem'
```

## Usage

By default, `trim` will trim the leading zeros from a hex value or byte array.

```ts
import { trim } from 'viem'

trim('0x00000000000000000000000000000000000000000000000000000000a4e12a45')
// 0xa4e12a45

trim(new Uint8Array([0, 0, 0, 0, 0, 0, 1, 122, 51, 123]))
// Uint8Array [1,122,51,123]
```

## Returns

`Hex | ByteArray`

The trimmed value.

## Parameters

### dir

- **Type:** `"left" | "right"`
- **Default:** `"left"`

The direction in which to trim the zeros – either leading (left), or trailing (right).

```ts
trim('0xa4e12a4500000000000000000000000000000000000000000000000000000000', {
  dir: 'right'
})
// 0xa4e12a45
```

