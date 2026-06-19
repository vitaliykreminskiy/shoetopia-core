// Shared query/path param parsing for route handlers. Parsers throw ParamError
// on missing-required or malformed input; handlers map that to a 400 so invalid
// values never reach the DAL.

export class ParamError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ParamError'
  }
}

interface IntOptions {
  required?: boolean
  default?: number
}

// Parse an integer-ish query/path value. Missing + required → throw; missing +
// optional → the provided default (or undefined). Present but non-finite → throw.
export const toInt = (
  value: string | undefined,
  opts: IntOptions = {},
): number | undefined => {
  if (value === undefined || value === '') {
    if (opts.required) throw new ParamError('missing required numeric parameter')
    return opts.default
  }
  const n = Number(value)
  if (!Number.isFinite(n)) throw new ParamError(`invalid numeric parameter: ${value}`)
  return n
}

export const toBool = (value: string | undefined): boolean | undefined => {
  if (value === undefined) return undefined
  return value === 'true'
}

// DAL methods that require gender accept only these two literals.
export const parseGender = (value: string | undefined): 'womens' | 'mens' => {
  if (value === 'womens' || value === 'mens') return value
  throw new ParamError('gender must be "womens" or "mens"')
}

// Require a non-empty string param.
export const requireStr = (value: string | undefined, name: string): string => {
  if (value === undefined || value === '') throw new ParamError(`${name} is required`)
  return value
}
