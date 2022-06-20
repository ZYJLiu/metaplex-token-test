/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

type ErrorWithCode = Error & { code: number }
type MaybeErrorWithCode = ErrorWithCode | null | undefined

const createErrorFromCodeLookup: Map<number, () => ErrorWithCode> = new Map()
const createErrorFromNameLookup: Map<string, () => ErrorWithCode> = new Map()

/**
 * PDA: 'PDA not match'
 *
 * @category Errors
 * @category generated
 */
export class PDAError extends Error {
  readonly code: number = 0x1770
  readonly name: string = 'PDA'
  constructor() {
    super('PDA not match')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, PDAError)
    }
  }
}

createErrorFromCodeLookup.set(0x1770, () => new PDAError())
createErrorFromNameLookup.set('PDA', () => new PDAError())

/**
 * MATH: 'Math Error'
 *
 * @category Errors
 * @category generated
 */
export class MATHError extends Error {
  readonly code: number = 0x1771
  readonly name: string = 'MATH'
  constructor() {
    super('Math Error')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MATHError)
    }
  }
}

createErrorFromCodeLookup.set(0x1771, () => new MATHError())
createErrorFromNameLookup.set('MATH', () => new MATHError())

/**
 * Attempts to resolve a custom program error from the provided error code.
 * @category Errors
 * @category generated
 */
export function errorFromCode(code: number): MaybeErrorWithCode {
  const createError = createErrorFromCodeLookup.get(code)
  return createError != null ? createError() : null
}

/**
 * Attempts to resolve a custom program error from the provided error name, i.e. 'Unauthorized'.
 * @category Errors
 * @category generated
 */
export function errorFromName(name: string): MaybeErrorWithCode {
  const createError = createErrorFromNameLookup.get(name)
  return createError != null ? createError() : null
}