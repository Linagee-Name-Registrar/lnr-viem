---
head:
  - - meta
    - property: og:title
      content: isHex
  - - meta
    - name: description
      content: Checks whether the value is a hex value or not.
  - - meta
    - property: og:description
      content: Checks whether the value is a hex value or not.

---

# isHex

Checks whether the value is a hex value or not.

## Install

```ts
import { isHex } from 'viem'
```

## Usage

```ts
import { isHex } from 'viem'

isHex('0x1a4')
// true

isHex('0x1a4z')
isHex('foo')
// false
```

## Returns

`boolean`

Returns truthy is the value is a hex value.