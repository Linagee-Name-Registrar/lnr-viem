import type { PublicClient, Transport } from '../../clients'
import { panicReasons } from '../../constants'
import {
  ContractFunctionExecutionError,
  ContractFunctionRevertedError,
} from '../../errors'
import type { Address, Chain, Prettify } from '../../types'
import { getChainContractAddress, toHex } from '../../utils'
import { readContract, ReadContractParameters } from '../public'

export type GetLnrNameParameters = Prettify<
  Pick<ReadContractParameters, 'blockNumber' | 'blockTag'> & {
    /** Address to get LNR name for. */
    address: Address
    /** Address of LNR Universal Resolver Contract. */
    universalResolverAddress?: Address
  }
>

export type GetLnrNameReturnType = string | null

/**
 * @description Gets primary name for specified address.
 *
 * - Calls `reverse(bytes)` on LNR Universal Resolver Contract.
 *
 * @example
 * const lnrName = await getLnrName(publicClient, {
 *   address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
 * })
 * // 'wagmi-dev.eth'
 */
export async function getLnrName<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  {
    address,
    blockNumber,
    blockTag,
    universalResolverAddress: universalResolverAddress_,
  }: GetLnrNameParameters,
): Promise<GetLnrNameReturnType> {
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

  try {
    const res = await readContract(client, {
      address: universalResolverAddress,
      abi: [
        {
          name: 'primary',
          type: 'function',
          stateMutability: 'view',
          inputs: [{ type: 'address', name: 'address' }],
          outputs: [{ type: 'bytes32', name: 'name' }],
        },
      ],
      functionName: 'primary',
      args: [address],
      blockNumber,
      blockTag,
    })
    return res[0]
  } catch (error) {
    if (
      error instanceof ContractFunctionExecutionError &&
      (error.cause as ContractFunctionRevertedError).reason === panicReasons[50]
    )
      // No primary name set for address.
      return null
    throw error
  }
}
