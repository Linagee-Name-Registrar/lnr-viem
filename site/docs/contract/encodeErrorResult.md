---
head:
  - - meta
    - property: og:title
      content: encodeDeployData
  - - meta
    - name: description
      content: Encodes a reverted error from a function call.
  - - meta
    - property: og:description
      content: Encodes a reverted error from a function call.

---

# encodeErrorResult

Encodes a reverted error from a function call. The opposite of [`decodeErrorResult`](/docs/contract/decodeErrorResult).

## Install

```ts
import { encodeErrorResult } from 'viem'
```

## Usage

::: code-group

```ts [example.tsencodert { decodeErrorResult } from 'viem'

const value = encodeErrorResult({
  abi: wagmiAbi,
  errorName: 'InvalidTokenError',
  args: ['sold out']
})
// 0xb758934b000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b68656c6c6f20776f726c64000000000000000000000000000000000000000000
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
		inputs: [
			{
				name: "reason",
				type: "string"
			}
		],
		name: "InvalidTokenError",
		type: "error"
	},
  ...
] as const;
```

```ts [client.ts]
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

## Return Value

[`Hex`](/docs/glossary/types#hex)

The encoded error.

## Parameters

### abi

- **Type:** [`Abi`](/docs/glossary/types#abi)

The contract's ABI.

```ts
const value = decodeErrorResult({
  abi: wagmiAbi, // [!code focus]
  errorName: 'InvalidTokenError',
  args: ['sold out']
})
```

### errorName

- **Type:** `string`

The error name on the ABI.

```ts
const value = encodeErrorResult({
  abi: wagmiAbi,
  errorName: 'InvalidTokenError', // [!code focus]
  args: ['sold out']
})
```

### args (optional)

- **Type:** Inferred.

Arguments (if required) to pass to the error.

```ts
const value = encodeErrorResult({
  abi: wagmiAbi,
  errorName: 'InvalidTokenError',
  args: ['sold out'] // [!code focus]
})
```