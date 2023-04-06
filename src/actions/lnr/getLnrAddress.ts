import type { PublicClient, Transport } from '../../clients'
import {
  singleAddressResolverAbiLNR,
  universalResolverAbiLNR
} from '../../constants/abis'
import type { Address, Chain, Prettify } from '../../types'
import {
  decodeFunctionResult,
  encodeFunctionData,
  getChainContractAddress,
  toHex,
  trim
} from '../../utils'
import { readContract, ReadContractParameters } from '../public';
import { toBytes32 } from '../../utils/encoding/toBytes';

export type GetLnrAddressParameters = Prettify<
  Pick<ReadContractParameters, 'blockNumber' | 'blockTag'> & {
    /** LNR name to get address. */
    name: string
    /** Address of LNR Universal Resolver Contract */
    universalResolverAddress?: Address
  }
>

export type GetLnrAddressReturnType = Address | null

/**
 * @description Gets address for LNR name.
 *
 * - Calls `resolve(bytes, bytes)` on LNR Universal Resolver Contract.
 * - Since LNR names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize LNR names](https://docs.lnr.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getLnrAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/lnr/utilities/normalize.html) function for this.
 */
export async function getLnrAddress<TChain extends Chain | undefined,>(
  client: PublicClient<Transport, TChain>,
  {
    blockNumber,
    blockTag,
    name,
    universalResolverAddress: universalResolverAddress_,
  }: GetLnrAddressParameters,
): Promise<GetLnrAddressReturnType> {
  let universalResolverAddress = universalResolverAddress_
  if (!universalResolverAddress) {
    if (!client.chain)
      throw new Error(
        'client chain not configured. universalResolverAddress is required.',
      )

    universalResolverAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: 'lnrUniversalResolver',
    })
  }

  const res = await readContract(client, {
    address: universalResolverAddress,
    abi: singleAddressResolverAbiLNR,
    functionName: 'getResolveAddress',
    args: [toBytes32(name)],
    blockNumber,
    blockTag,
  })

  if (res[0] === '0x') return null
 
  const address = decodeFunctionResult({
    abi: singleAddressResolverAbiLNR,
    functionName: 'getResolveAddress',
    data: res[0],
  })

  return trim(address) === '0x0' ? null : address
}
