export type ByteArray = Uint8Array
export type Bytes32 = `0x${string}`
export type Hex = `0x${string}`
export type Hash = `0x${string}`
export type LogTopic = Hex | Hex[] | null
export type Signature = {
  r: Hex
  s: Hex
  v: bigint
}
