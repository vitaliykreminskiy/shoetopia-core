
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AdvertiserVote
 * 
 */
export type AdvertiserVote = $Result.DefaultSelection<Prisma.$AdvertiserVotePayload>
/**
 * Model Advertiser
 * 
 */
export type Advertiser = $Result.DefaultSelection<Prisma.$AdvertiserPayload>
/**
 * Model DealHealthVote
 * 
 */
export type DealHealthVote = $Result.DefaultSelection<Prisma.$DealHealthVotePayload>
/**
 * Model Feed
 * 
 */
export type Feed = $Result.DefaultSelection<Prisma.$FeedPayload>
/**
 * Model Variant
 * 
 */
export type Variant = $Result.DefaultSelection<Prisma.$VariantPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Promotion
 * 
 */
export type Promotion = $Result.DefaultSelection<Prisma.$PromotionPayload>
/**
 * Model SyncLog
 * 
 */
export type SyncLog = $Result.DefaultSelection<Prisma.$SyncLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more AdvertiserVotes
 * const advertiserVotes = await prisma.advertiserVote.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more AdvertiserVotes
   * const advertiserVotes = await prisma.advertiserVote.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.advertiserVote`: Exposes CRUD operations for the **AdvertiserVote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdvertiserVotes
    * const advertiserVotes = await prisma.advertiserVote.findMany()
    * ```
    */
  get advertiserVote(): Prisma.AdvertiserVoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.advertiser`: Exposes CRUD operations for the **Advertiser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Advertisers
    * const advertisers = await prisma.advertiser.findMany()
    * ```
    */
  get advertiser(): Prisma.AdvertiserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dealHealthVote`: Exposes CRUD operations for the **DealHealthVote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DealHealthVotes
    * const dealHealthVotes = await prisma.dealHealthVote.findMany()
    * ```
    */
  get dealHealthVote(): Prisma.DealHealthVoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.feed`: Exposes CRUD operations for the **Feed** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Feeds
    * const feeds = await prisma.feed.findMany()
    * ```
    */
  get feed(): Prisma.FeedDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.variant`: Exposes CRUD operations for the **Variant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Variants
    * const variants = await prisma.variant.findMany()
    * ```
    */
  get variant(): Prisma.VariantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.promotion`: Exposes CRUD operations for the **Promotion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Promotions
    * const promotions = await prisma.promotion.findMany()
    * ```
    */
  get promotion(): Prisma.PromotionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.syncLog`: Exposes CRUD operations for the **SyncLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SyncLogs
    * const syncLogs = await prisma.syncLog.findMany()
    * ```
    */
  get syncLog(): Prisma.SyncLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    AdvertiserVote: 'AdvertiserVote',
    Advertiser: 'Advertiser',
    DealHealthVote: 'DealHealthVote',
    Feed: 'Feed',
    Variant: 'Variant',
    Product: 'Product',
    Promotion: 'Promotion',
    SyncLog: 'SyncLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "advertiserVote" | "advertiser" | "dealHealthVote" | "feed" | "variant" | "product" | "promotion" | "syncLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AdvertiserVote: {
        payload: Prisma.$AdvertiserVotePayload<ExtArgs>
        fields: Prisma.AdvertiserVoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdvertiserVoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserVotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdvertiserVoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserVotePayload>
          }
          findFirst: {
            args: Prisma.AdvertiserVoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserVotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdvertiserVoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserVotePayload>
          }
          findMany: {
            args: Prisma.AdvertiserVoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserVotePayload>[]
          }
          create: {
            args: Prisma.AdvertiserVoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserVotePayload>
          }
          createMany: {
            args: Prisma.AdvertiserVoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdvertiserVoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserVotePayload>[]
          }
          delete: {
            args: Prisma.AdvertiserVoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserVotePayload>
          }
          update: {
            args: Prisma.AdvertiserVoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserVotePayload>
          }
          deleteMany: {
            args: Prisma.AdvertiserVoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdvertiserVoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdvertiserVoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserVotePayload>[]
          }
          upsert: {
            args: Prisma.AdvertiserVoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserVotePayload>
          }
          aggregate: {
            args: Prisma.AdvertiserVoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdvertiserVote>
          }
          groupBy: {
            args: Prisma.AdvertiserVoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdvertiserVoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdvertiserVoteCountArgs<ExtArgs>
            result: $Utils.Optional<AdvertiserVoteCountAggregateOutputType> | number
          }
        }
      }
      Advertiser: {
        payload: Prisma.$AdvertiserPayload<ExtArgs>
        fields: Prisma.AdvertiserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdvertiserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdvertiserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserPayload>
          }
          findFirst: {
            args: Prisma.AdvertiserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdvertiserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserPayload>
          }
          findMany: {
            args: Prisma.AdvertiserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserPayload>[]
          }
          create: {
            args: Prisma.AdvertiserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserPayload>
          }
          createMany: {
            args: Prisma.AdvertiserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdvertiserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserPayload>[]
          }
          delete: {
            args: Prisma.AdvertiserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserPayload>
          }
          update: {
            args: Prisma.AdvertiserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserPayload>
          }
          deleteMany: {
            args: Prisma.AdvertiserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdvertiserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdvertiserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserPayload>[]
          }
          upsert: {
            args: Prisma.AdvertiserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdvertiserPayload>
          }
          aggregate: {
            args: Prisma.AdvertiserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdvertiser>
          }
          groupBy: {
            args: Prisma.AdvertiserGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdvertiserGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdvertiserCountArgs<ExtArgs>
            result: $Utils.Optional<AdvertiserCountAggregateOutputType> | number
          }
        }
      }
      DealHealthVote: {
        payload: Prisma.$DealHealthVotePayload<ExtArgs>
        fields: Prisma.DealHealthVoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DealHealthVoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealHealthVotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DealHealthVoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealHealthVotePayload>
          }
          findFirst: {
            args: Prisma.DealHealthVoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealHealthVotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DealHealthVoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealHealthVotePayload>
          }
          findMany: {
            args: Prisma.DealHealthVoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealHealthVotePayload>[]
          }
          create: {
            args: Prisma.DealHealthVoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealHealthVotePayload>
          }
          createMany: {
            args: Prisma.DealHealthVoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DealHealthVoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealHealthVotePayload>[]
          }
          delete: {
            args: Prisma.DealHealthVoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealHealthVotePayload>
          }
          update: {
            args: Prisma.DealHealthVoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealHealthVotePayload>
          }
          deleteMany: {
            args: Prisma.DealHealthVoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DealHealthVoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DealHealthVoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealHealthVotePayload>[]
          }
          upsert: {
            args: Prisma.DealHealthVoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealHealthVotePayload>
          }
          aggregate: {
            args: Prisma.DealHealthVoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDealHealthVote>
          }
          groupBy: {
            args: Prisma.DealHealthVoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<DealHealthVoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.DealHealthVoteCountArgs<ExtArgs>
            result: $Utils.Optional<DealHealthVoteCountAggregateOutputType> | number
          }
        }
      }
      Feed: {
        payload: Prisma.$FeedPayload<ExtArgs>
        fields: Prisma.FeedFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPayload>
          }
          findFirst: {
            args: Prisma.FeedFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPayload>
          }
          findMany: {
            args: Prisma.FeedFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPayload>[]
          }
          create: {
            args: Prisma.FeedCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPayload>
          }
          createMany: {
            args: Prisma.FeedCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPayload>[]
          }
          delete: {
            args: Prisma.FeedDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPayload>
          }
          update: {
            args: Prisma.FeedUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPayload>
          }
          deleteMany: {
            args: Prisma.FeedDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeedUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPayload>[]
          }
          upsert: {
            args: Prisma.FeedUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedPayload>
          }
          aggregate: {
            args: Prisma.FeedAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeed>
          }
          groupBy: {
            args: Prisma.FeedGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedCountArgs<ExtArgs>
            result: $Utils.Optional<FeedCountAggregateOutputType> | number
          }
        }
      }
      Variant: {
        payload: Prisma.$VariantPayload<ExtArgs>
        fields: Prisma.VariantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VariantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VariantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>
          }
          findFirst: {
            args: Prisma.VariantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VariantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>
          }
          findMany: {
            args: Prisma.VariantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>[]
          }
          create: {
            args: Prisma.VariantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>
          }
          createMany: {
            args: Prisma.VariantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VariantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>[]
          }
          delete: {
            args: Prisma.VariantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>
          }
          update: {
            args: Prisma.VariantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>
          }
          deleteMany: {
            args: Prisma.VariantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VariantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VariantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>[]
          }
          upsert: {
            args: Prisma.VariantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VariantPayload>
          }
          aggregate: {
            args: Prisma.VariantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVariant>
          }
          groupBy: {
            args: Prisma.VariantGroupByArgs<ExtArgs>
            result: $Utils.Optional<VariantGroupByOutputType>[]
          }
          count: {
            args: Prisma.VariantCountArgs<ExtArgs>
            result: $Utils.Optional<VariantCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Promotion: {
        payload: Prisma.$PromotionPayload<ExtArgs>
        fields: Prisma.PromotionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PromotionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PromotionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload>
          }
          findFirst: {
            args: Prisma.PromotionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PromotionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload>
          }
          findMany: {
            args: Prisma.PromotionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload>[]
          }
          create: {
            args: Prisma.PromotionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload>
          }
          createMany: {
            args: Prisma.PromotionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PromotionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload>[]
          }
          delete: {
            args: Prisma.PromotionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload>
          }
          update: {
            args: Prisma.PromotionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload>
          }
          deleteMany: {
            args: Prisma.PromotionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PromotionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PromotionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload>[]
          }
          upsert: {
            args: Prisma.PromotionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload>
          }
          aggregate: {
            args: Prisma.PromotionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePromotion>
          }
          groupBy: {
            args: Prisma.PromotionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PromotionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PromotionCountArgs<ExtArgs>
            result: $Utils.Optional<PromotionCountAggregateOutputType> | number
          }
        }
      }
      SyncLog: {
        payload: Prisma.$SyncLogPayload<ExtArgs>
        fields: Prisma.SyncLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SyncLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SyncLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          findFirst: {
            args: Prisma.SyncLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SyncLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          findMany: {
            args: Prisma.SyncLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          create: {
            args: Prisma.SyncLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          createMany: {
            args: Prisma.SyncLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SyncLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          delete: {
            args: Prisma.SyncLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          update: {
            args: Prisma.SyncLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          deleteMany: {
            args: Prisma.SyncLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SyncLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SyncLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          upsert: {
            args: Prisma.SyncLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          aggregate: {
            args: Prisma.SyncLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSyncLog>
          }
          groupBy: {
            args: Prisma.SyncLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SyncLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SyncLogCountArgs<ExtArgs>
            result: $Utils.Optional<SyncLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    advertiserVote?: AdvertiserVoteOmit
    advertiser?: AdvertiserOmit
    dealHealthVote?: DealHealthVoteOmit
    feed?: FeedOmit
    variant?: VariantOmit
    product?: ProductOmit
    promotion?: PromotionOmit
    syncLog?: SyncLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AdvertiserCountOutputType
   */

  export type AdvertiserCountOutputType = {
    promotions: number
  }

  export type AdvertiserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    promotions?: boolean | AdvertiserCountOutputTypeCountPromotionsArgs
  }

  // Custom InputTypes
  /**
   * AdvertiserCountOutputType without action
   */
  export type AdvertiserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserCountOutputType
     */
    select?: AdvertiserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AdvertiserCountOutputType without action
   */
  export type AdvertiserCountOutputTypeCountPromotionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromotionWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    variants: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    variants?: boolean | ProductCountOutputTypeCountVariantsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountVariantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VariantWhereInput
  }


  /**
   * Models
   */

  /**
   * Model AdvertiserVote
   */

  export type AggregateAdvertiserVote = {
    _count: AdvertiserVoteCountAggregateOutputType | null
    _avg: AdvertiserVoteAvgAggregateOutputType | null
    _sum: AdvertiserVoteSumAggregateOutputType | null
    _min: AdvertiserVoteMinAggregateOutputType | null
    _max: AdvertiserVoteMaxAggregateOutputType | null
  }

  export type AdvertiserVoteAvgAggregateOutputType = {
    id: number | null
  }

  export type AdvertiserVoteSumAggregateOutputType = {
    id: number | null
  }

  export type AdvertiserVoteMinAggregateOutputType = {
    id: number | null
    advertiserName: string | null
    fingerprint: string | null
    vote: string | null
    createdAt: Date | null
  }

  export type AdvertiserVoteMaxAggregateOutputType = {
    id: number | null
    advertiserName: string | null
    fingerprint: string | null
    vote: string | null
    createdAt: Date | null
  }

  export type AdvertiserVoteCountAggregateOutputType = {
    id: number
    advertiserName: number
    fingerprint: number
    vote: number
    createdAt: number
    _all: number
  }


  export type AdvertiserVoteAvgAggregateInputType = {
    id?: true
  }

  export type AdvertiserVoteSumAggregateInputType = {
    id?: true
  }

  export type AdvertiserVoteMinAggregateInputType = {
    id?: true
    advertiserName?: true
    fingerprint?: true
    vote?: true
    createdAt?: true
  }

  export type AdvertiserVoteMaxAggregateInputType = {
    id?: true
    advertiserName?: true
    fingerprint?: true
    vote?: true
    createdAt?: true
  }

  export type AdvertiserVoteCountAggregateInputType = {
    id?: true
    advertiserName?: true
    fingerprint?: true
    vote?: true
    createdAt?: true
    _all?: true
  }

  export type AdvertiserVoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdvertiserVote to aggregate.
     */
    where?: AdvertiserVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdvertiserVotes to fetch.
     */
    orderBy?: AdvertiserVoteOrderByWithRelationInput | AdvertiserVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdvertiserVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdvertiserVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdvertiserVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdvertiserVotes
    **/
    _count?: true | AdvertiserVoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdvertiserVoteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdvertiserVoteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdvertiserVoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdvertiserVoteMaxAggregateInputType
  }

  export type GetAdvertiserVoteAggregateType<T extends AdvertiserVoteAggregateArgs> = {
        [P in keyof T & keyof AggregateAdvertiserVote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdvertiserVote[P]>
      : GetScalarType<T[P], AggregateAdvertiserVote[P]>
  }




  export type AdvertiserVoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdvertiserVoteWhereInput
    orderBy?: AdvertiserVoteOrderByWithAggregationInput | AdvertiserVoteOrderByWithAggregationInput[]
    by: AdvertiserVoteScalarFieldEnum[] | AdvertiserVoteScalarFieldEnum
    having?: AdvertiserVoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdvertiserVoteCountAggregateInputType | true
    _avg?: AdvertiserVoteAvgAggregateInputType
    _sum?: AdvertiserVoteSumAggregateInputType
    _min?: AdvertiserVoteMinAggregateInputType
    _max?: AdvertiserVoteMaxAggregateInputType
  }

  export type AdvertiserVoteGroupByOutputType = {
    id: number
    advertiserName: string
    fingerprint: string
    vote: string
    createdAt: Date | null
    _count: AdvertiserVoteCountAggregateOutputType | null
    _avg: AdvertiserVoteAvgAggregateOutputType | null
    _sum: AdvertiserVoteSumAggregateOutputType | null
    _min: AdvertiserVoteMinAggregateOutputType | null
    _max: AdvertiserVoteMaxAggregateOutputType | null
  }

  type GetAdvertiserVoteGroupByPayload<T extends AdvertiserVoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdvertiserVoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdvertiserVoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdvertiserVoteGroupByOutputType[P]>
            : GetScalarType<T[P], AdvertiserVoteGroupByOutputType[P]>
        }
      >
    >


  export type AdvertiserVoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    advertiserName?: boolean
    fingerprint?: boolean
    vote?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["advertiserVote"]>

  export type AdvertiserVoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    advertiserName?: boolean
    fingerprint?: boolean
    vote?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["advertiserVote"]>

  export type AdvertiserVoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    advertiserName?: boolean
    fingerprint?: boolean
    vote?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["advertiserVote"]>

  export type AdvertiserVoteSelectScalar = {
    id?: boolean
    advertiserName?: boolean
    fingerprint?: boolean
    vote?: boolean
    createdAt?: boolean
  }

  export type AdvertiserVoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "advertiserName" | "fingerprint" | "vote" | "createdAt", ExtArgs["result"]["advertiserVote"]>

  export type $AdvertiserVotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdvertiserVote"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      advertiserName: string
      fingerprint: string
      vote: string
      createdAt: Date | null
    }, ExtArgs["result"]["advertiserVote"]>
    composites: {}
  }

  type AdvertiserVoteGetPayload<S extends boolean | null | undefined | AdvertiserVoteDefaultArgs> = $Result.GetResult<Prisma.$AdvertiserVotePayload, S>

  type AdvertiserVoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdvertiserVoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdvertiserVoteCountAggregateInputType | true
    }

  export interface AdvertiserVoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdvertiserVote'], meta: { name: 'AdvertiserVote' } }
    /**
     * Find zero or one AdvertiserVote that matches the filter.
     * @param {AdvertiserVoteFindUniqueArgs} args - Arguments to find a AdvertiserVote
     * @example
     * // Get one AdvertiserVote
     * const advertiserVote = await prisma.advertiserVote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdvertiserVoteFindUniqueArgs>(args: SelectSubset<T, AdvertiserVoteFindUniqueArgs<ExtArgs>>): Prisma__AdvertiserVoteClient<$Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdvertiserVote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdvertiserVoteFindUniqueOrThrowArgs} args - Arguments to find a AdvertiserVote
     * @example
     * // Get one AdvertiserVote
     * const advertiserVote = await prisma.advertiserVote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdvertiserVoteFindUniqueOrThrowArgs>(args: SelectSubset<T, AdvertiserVoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdvertiserVoteClient<$Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdvertiserVote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserVoteFindFirstArgs} args - Arguments to find a AdvertiserVote
     * @example
     * // Get one AdvertiserVote
     * const advertiserVote = await prisma.advertiserVote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdvertiserVoteFindFirstArgs>(args?: SelectSubset<T, AdvertiserVoteFindFirstArgs<ExtArgs>>): Prisma__AdvertiserVoteClient<$Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdvertiserVote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserVoteFindFirstOrThrowArgs} args - Arguments to find a AdvertiserVote
     * @example
     * // Get one AdvertiserVote
     * const advertiserVote = await prisma.advertiserVote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdvertiserVoteFindFirstOrThrowArgs>(args?: SelectSubset<T, AdvertiserVoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdvertiserVoteClient<$Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdvertiserVotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserVoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdvertiserVotes
     * const advertiserVotes = await prisma.advertiserVote.findMany()
     * 
     * // Get first 10 AdvertiserVotes
     * const advertiserVotes = await prisma.advertiserVote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const advertiserVoteWithIdOnly = await prisma.advertiserVote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdvertiserVoteFindManyArgs>(args?: SelectSubset<T, AdvertiserVoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdvertiserVote.
     * @param {AdvertiserVoteCreateArgs} args - Arguments to create a AdvertiserVote.
     * @example
     * // Create one AdvertiserVote
     * const AdvertiserVote = await prisma.advertiserVote.create({
     *   data: {
     *     // ... data to create a AdvertiserVote
     *   }
     * })
     * 
     */
    create<T extends AdvertiserVoteCreateArgs>(args: SelectSubset<T, AdvertiserVoteCreateArgs<ExtArgs>>): Prisma__AdvertiserVoteClient<$Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdvertiserVotes.
     * @param {AdvertiserVoteCreateManyArgs} args - Arguments to create many AdvertiserVotes.
     * @example
     * // Create many AdvertiserVotes
     * const advertiserVote = await prisma.advertiserVote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdvertiserVoteCreateManyArgs>(args?: SelectSubset<T, AdvertiserVoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdvertiserVotes and returns the data saved in the database.
     * @param {AdvertiserVoteCreateManyAndReturnArgs} args - Arguments to create many AdvertiserVotes.
     * @example
     * // Create many AdvertiserVotes
     * const advertiserVote = await prisma.advertiserVote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdvertiserVotes and only return the `id`
     * const advertiserVoteWithIdOnly = await prisma.advertiserVote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdvertiserVoteCreateManyAndReturnArgs>(args?: SelectSubset<T, AdvertiserVoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AdvertiserVote.
     * @param {AdvertiserVoteDeleteArgs} args - Arguments to delete one AdvertiserVote.
     * @example
     * // Delete one AdvertiserVote
     * const AdvertiserVote = await prisma.advertiserVote.delete({
     *   where: {
     *     // ... filter to delete one AdvertiserVote
     *   }
     * })
     * 
     */
    delete<T extends AdvertiserVoteDeleteArgs>(args: SelectSubset<T, AdvertiserVoteDeleteArgs<ExtArgs>>): Prisma__AdvertiserVoteClient<$Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdvertiserVote.
     * @param {AdvertiserVoteUpdateArgs} args - Arguments to update one AdvertiserVote.
     * @example
     * // Update one AdvertiserVote
     * const advertiserVote = await prisma.advertiserVote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdvertiserVoteUpdateArgs>(args: SelectSubset<T, AdvertiserVoteUpdateArgs<ExtArgs>>): Prisma__AdvertiserVoteClient<$Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdvertiserVotes.
     * @param {AdvertiserVoteDeleteManyArgs} args - Arguments to filter AdvertiserVotes to delete.
     * @example
     * // Delete a few AdvertiserVotes
     * const { count } = await prisma.advertiserVote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdvertiserVoteDeleteManyArgs>(args?: SelectSubset<T, AdvertiserVoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdvertiserVotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserVoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdvertiserVotes
     * const advertiserVote = await prisma.advertiserVote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdvertiserVoteUpdateManyArgs>(args: SelectSubset<T, AdvertiserVoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdvertiserVotes and returns the data updated in the database.
     * @param {AdvertiserVoteUpdateManyAndReturnArgs} args - Arguments to update many AdvertiserVotes.
     * @example
     * // Update many AdvertiserVotes
     * const advertiserVote = await prisma.advertiserVote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdvertiserVotes and only return the `id`
     * const advertiserVoteWithIdOnly = await prisma.advertiserVote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdvertiserVoteUpdateManyAndReturnArgs>(args: SelectSubset<T, AdvertiserVoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AdvertiserVote.
     * @param {AdvertiserVoteUpsertArgs} args - Arguments to update or create a AdvertiserVote.
     * @example
     * // Update or create a AdvertiserVote
     * const advertiserVote = await prisma.advertiserVote.upsert({
     *   create: {
     *     // ... data to create a AdvertiserVote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdvertiserVote we want to update
     *   }
     * })
     */
    upsert<T extends AdvertiserVoteUpsertArgs>(args: SelectSubset<T, AdvertiserVoteUpsertArgs<ExtArgs>>): Prisma__AdvertiserVoteClient<$Result.GetResult<Prisma.$AdvertiserVotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdvertiserVotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserVoteCountArgs} args - Arguments to filter AdvertiserVotes to count.
     * @example
     * // Count the number of AdvertiserVotes
     * const count = await prisma.advertiserVote.count({
     *   where: {
     *     // ... the filter for the AdvertiserVotes we want to count
     *   }
     * })
    **/
    count<T extends AdvertiserVoteCountArgs>(
      args?: Subset<T, AdvertiserVoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdvertiserVoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdvertiserVote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserVoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdvertiserVoteAggregateArgs>(args: Subset<T, AdvertiserVoteAggregateArgs>): Prisma.PrismaPromise<GetAdvertiserVoteAggregateType<T>>

    /**
     * Group by AdvertiserVote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserVoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdvertiserVoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdvertiserVoteGroupByArgs['orderBy'] }
        : { orderBy?: AdvertiserVoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdvertiserVoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdvertiserVoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdvertiserVote model
   */
  readonly fields: AdvertiserVoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdvertiserVote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdvertiserVoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdvertiserVote model
   */
  interface AdvertiserVoteFieldRefs {
    readonly id: FieldRef<"AdvertiserVote", 'Int'>
    readonly advertiserName: FieldRef<"AdvertiserVote", 'String'>
    readonly fingerprint: FieldRef<"AdvertiserVote", 'String'>
    readonly vote: FieldRef<"AdvertiserVote", 'String'>
    readonly createdAt: FieldRef<"AdvertiserVote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdvertiserVote findUnique
   */
  export type AdvertiserVoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: AdvertiserVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: AdvertiserVoteOmit<ExtArgs> | null
    /**
     * Filter, which AdvertiserVote to fetch.
     */
    where: AdvertiserVoteWhereUniqueInput
  }

  /**
   * AdvertiserVote findUniqueOrThrow
   */
  export type AdvertiserVoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: AdvertiserVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: AdvertiserVoteOmit<ExtArgs> | null
    /**
     * Filter, which AdvertiserVote to fetch.
     */
    where: AdvertiserVoteWhereUniqueInput
  }

  /**
   * AdvertiserVote findFirst
   */
  export type AdvertiserVoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: AdvertiserVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: AdvertiserVoteOmit<ExtArgs> | null
    /**
     * Filter, which AdvertiserVote to fetch.
     */
    where?: AdvertiserVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdvertiserVotes to fetch.
     */
    orderBy?: AdvertiserVoteOrderByWithRelationInput | AdvertiserVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdvertiserVotes.
     */
    cursor?: AdvertiserVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdvertiserVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdvertiserVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdvertiserVotes.
     */
    distinct?: AdvertiserVoteScalarFieldEnum | AdvertiserVoteScalarFieldEnum[]
  }

  /**
   * AdvertiserVote findFirstOrThrow
   */
  export type AdvertiserVoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: AdvertiserVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: AdvertiserVoteOmit<ExtArgs> | null
    /**
     * Filter, which AdvertiserVote to fetch.
     */
    where?: AdvertiserVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdvertiserVotes to fetch.
     */
    orderBy?: AdvertiserVoteOrderByWithRelationInput | AdvertiserVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdvertiserVotes.
     */
    cursor?: AdvertiserVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdvertiserVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdvertiserVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdvertiserVotes.
     */
    distinct?: AdvertiserVoteScalarFieldEnum | AdvertiserVoteScalarFieldEnum[]
  }

  /**
   * AdvertiserVote findMany
   */
  export type AdvertiserVoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: AdvertiserVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: AdvertiserVoteOmit<ExtArgs> | null
    /**
     * Filter, which AdvertiserVotes to fetch.
     */
    where?: AdvertiserVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdvertiserVotes to fetch.
     */
    orderBy?: AdvertiserVoteOrderByWithRelationInput | AdvertiserVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdvertiserVotes.
     */
    cursor?: AdvertiserVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdvertiserVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdvertiserVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdvertiserVotes.
     */
    distinct?: AdvertiserVoteScalarFieldEnum | AdvertiserVoteScalarFieldEnum[]
  }

  /**
   * AdvertiserVote create
   */
  export type AdvertiserVoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: AdvertiserVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: AdvertiserVoteOmit<ExtArgs> | null
    /**
     * The data needed to create a AdvertiserVote.
     */
    data: XOR<AdvertiserVoteCreateInput, AdvertiserVoteUncheckedCreateInput>
  }

  /**
   * AdvertiserVote createMany
   */
  export type AdvertiserVoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdvertiserVotes.
     */
    data: AdvertiserVoteCreateManyInput | AdvertiserVoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdvertiserVote createManyAndReturn
   */
  export type AdvertiserVoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: AdvertiserVoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: AdvertiserVoteOmit<ExtArgs> | null
    /**
     * The data used to create many AdvertiserVotes.
     */
    data: AdvertiserVoteCreateManyInput | AdvertiserVoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdvertiserVote update
   */
  export type AdvertiserVoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: AdvertiserVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: AdvertiserVoteOmit<ExtArgs> | null
    /**
     * The data needed to update a AdvertiserVote.
     */
    data: XOR<AdvertiserVoteUpdateInput, AdvertiserVoteUncheckedUpdateInput>
    /**
     * Choose, which AdvertiserVote to update.
     */
    where: AdvertiserVoteWhereUniqueInput
  }

  /**
   * AdvertiserVote updateMany
   */
  export type AdvertiserVoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdvertiserVotes.
     */
    data: XOR<AdvertiserVoteUpdateManyMutationInput, AdvertiserVoteUncheckedUpdateManyInput>
    /**
     * Filter which AdvertiserVotes to update
     */
    where?: AdvertiserVoteWhereInput
    /**
     * Limit how many AdvertiserVotes to update.
     */
    limit?: number
  }

  /**
   * AdvertiserVote updateManyAndReturn
   */
  export type AdvertiserVoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: AdvertiserVoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: AdvertiserVoteOmit<ExtArgs> | null
    /**
     * The data used to update AdvertiserVotes.
     */
    data: XOR<AdvertiserVoteUpdateManyMutationInput, AdvertiserVoteUncheckedUpdateManyInput>
    /**
     * Filter which AdvertiserVotes to update
     */
    where?: AdvertiserVoteWhereInput
    /**
     * Limit how many AdvertiserVotes to update.
     */
    limit?: number
  }

  /**
   * AdvertiserVote upsert
   */
  export type AdvertiserVoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: AdvertiserVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: AdvertiserVoteOmit<ExtArgs> | null
    /**
     * The filter to search for the AdvertiserVote to update in case it exists.
     */
    where: AdvertiserVoteWhereUniqueInput
    /**
     * In case the AdvertiserVote found by the `where` argument doesn't exist, create a new AdvertiserVote with this data.
     */
    create: XOR<AdvertiserVoteCreateInput, AdvertiserVoteUncheckedCreateInput>
    /**
     * In case the AdvertiserVote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdvertiserVoteUpdateInput, AdvertiserVoteUncheckedUpdateInput>
  }

  /**
   * AdvertiserVote delete
   */
  export type AdvertiserVoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: AdvertiserVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: AdvertiserVoteOmit<ExtArgs> | null
    /**
     * Filter which AdvertiserVote to delete.
     */
    where: AdvertiserVoteWhereUniqueInput
  }

  /**
   * AdvertiserVote deleteMany
   */
  export type AdvertiserVoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdvertiserVotes to delete
     */
    where?: AdvertiserVoteWhereInput
    /**
     * Limit how many AdvertiserVotes to delete.
     */
    limit?: number
  }

  /**
   * AdvertiserVote without action
   */
  export type AdvertiserVoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdvertiserVote
     */
    select?: AdvertiserVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdvertiserVote
     */
    omit?: AdvertiserVoteOmit<ExtArgs> | null
  }


  /**
   * Model Advertiser
   */

  export type AggregateAdvertiser = {
    _count: AdvertiserCountAggregateOutputType | null
    _avg: AdvertiserAvgAggregateOutputType | null
    _sum: AdvertiserSumAggregateOutputType | null
    _min: AdvertiserMinAggregateOutputType | null
    _max: AdvertiserMaxAggregateOutputType | null
  }

  export type AdvertiserAvgAggregateOutputType = {
    advertiserId: number | null
    healthScore: number | null
  }

  export type AdvertiserSumAggregateOutputType = {
    advertiserId: number | null
    healthScore: number | null
  }

  export type AdvertiserMinAggregateOutputType = {
    advertiserId: number | null
    name: string | null
    slug: string | null
    logoUrl: string | null
    url: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    healthScore: number | null
  }

  export type AdvertiserMaxAggregateOutputType = {
    advertiserId: number | null
    name: string | null
    slug: string | null
    logoUrl: string | null
    url: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    healthScore: number | null
  }

  export type AdvertiserCountAggregateOutputType = {
    advertiserId: number
    name: number
    slug: number
    logoUrl: number
    url: number
    description: number
    isActive: number
    createdAt: number
    updatedAt: number
    healthScore: number
    _all: number
  }


  export type AdvertiserAvgAggregateInputType = {
    advertiserId?: true
    healthScore?: true
  }

  export type AdvertiserSumAggregateInputType = {
    advertiserId?: true
    healthScore?: true
  }

  export type AdvertiserMinAggregateInputType = {
    advertiserId?: true
    name?: true
    slug?: true
    logoUrl?: true
    url?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    healthScore?: true
  }

  export type AdvertiserMaxAggregateInputType = {
    advertiserId?: true
    name?: true
    slug?: true
    logoUrl?: true
    url?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    healthScore?: true
  }

  export type AdvertiserCountAggregateInputType = {
    advertiserId?: true
    name?: true
    slug?: true
    logoUrl?: true
    url?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    healthScore?: true
    _all?: true
  }

  export type AdvertiserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Advertiser to aggregate.
     */
    where?: AdvertiserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Advertisers to fetch.
     */
    orderBy?: AdvertiserOrderByWithRelationInput | AdvertiserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdvertiserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Advertisers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Advertisers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Advertisers
    **/
    _count?: true | AdvertiserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdvertiserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdvertiserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdvertiserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdvertiserMaxAggregateInputType
  }

  export type GetAdvertiserAggregateType<T extends AdvertiserAggregateArgs> = {
        [P in keyof T & keyof AggregateAdvertiser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdvertiser[P]>
      : GetScalarType<T[P], AggregateAdvertiser[P]>
  }




  export type AdvertiserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdvertiserWhereInput
    orderBy?: AdvertiserOrderByWithAggregationInput | AdvertiserOrderByWithAggregationInput[]
    by: AdvertiserScalarFieldEnum[] | AdvertiserScalarFieldEnum
    having?: AdvertiserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdvertiserCountAggregateInputType | true
    _avg?: AdvertiserAvgAggregateInputType
    _sum?: AdvertiserSumAggregateInputType
    _min?: AdvertiserMinAggregateInputType
    _max?: AdvertiserMaxAggregateInputType
  }

  export type AdvertiserGroupByOutputType = {
    advertiserId: number
    name: string
    slug: string | null
    logoUrl: string | null
    url: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    healthScore: number | null
    _count: AdvertiserCountAggregateOutputType | null
    _avg: AdvertiserAvgAggregateOutputType | null
    _sum: AdvertiserSumAggregateOutputType | null
    _min: AdvertiserMinAggregateOutputType | null
    _max: AdvertiserMaxAggregateOutputType | null
  }

  type GetAdvertiserGroupByPayload<T extends AdvertiserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdvertiserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdvertiserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdvertiserGroupByOutputType[P]>
            : GetScalarType<T[P], AdvertiserGroupByOutputType[P]>
        }
      >
    >


  export type AdvertiserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    advertiserId?: boolean
    name?: boolean
    slug?: boolean
    logoUrl?: boolean
    url?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    healthScore?: boolean
    promotions?: boolean | Advertiser$promotionsArgs<ExtArgs>
    _count?: boolean | AdvertiserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["advertiser"]>

  export type AdvertiserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    advertiserId?: boolean
    name?: boolean
    slug?: boolean
    logoUrl?: boolean
    url?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    healthScore?: boolean
  }, ExtArgs["result"]["advertiser"]>

  export type AdvertiserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    advertiserId?: boolean
    name?: boolean
    slug?: boolean
    logoUrl?: boolean
    url?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    healthScore?: boolean
  }, ExtArgs["result"]["advertiser"]>

  export type AdvertiserSelectScalar = {
    advertiserId?: boolean
    name?: boolean
    slug?: boolean
    logoUrl?: boolean
    url?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    healthScore?: boolean
  }

  export type AdvertiserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"advertiserId" | "name" | "slug" | "logoUrl" | "url" | "description" | "isActive" | "createdAt" | "updatedAt" | "healthScore", ExtArgs["result"]["advertiser"]>
  export type AdvertiserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    promotions?: boolean | Advertiser$promotionsArgs<ExtArgs>
    _count?: boolean | AdvertiserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AdvertiserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AdvertiserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AdvertiserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Advertiser"
    objects: {
      promotions: Prisma.$PromotionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      advertiserId: number
      name: string
      slug: string | null
      logoUrl: string | null
      url: string | null
      description: string | null
      isActive: boolean | null
      createdAt: Date | null
      updatedAt: Date | null
      healthScore: number | null
    }, ExtArgs["result"]["advertiser"]>
    composites: {}
  }

  type AdvertiserGetPayload<S extends boolean | null | undefined | AdvertiserDefaultArgs> = $Result.GetResult<Prisma.$AdvertiserPayload, S>

  type AdvertiserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdvertiserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdvertiserCountAggregateInputType | true
    }

  export interface AdvertiserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Advertiser'], meta: { name: 'Advertiser' } }
    /**
     * Find zero or one Advertiser that matches the filter.
     * @param {AdvertiserFindUniqueArgs} args - Arguments to find a Advertiser
     * @example
     * // Get one Advertiser
     * const advertiser = await prisma.advertiser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdvertiserFindUniqueArgs>(args: SelectSubset<T, AdvertiserFindUniqueArgs<ExtArgs>>): Prisma__AdvertiserClient<$Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Advertiser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdvertiserFindUniqueOrThrowArgs} args - Arguments to find a Advertiser
     * @example
     * // Get one Advertiser
     * const advertiser = await prisma.advertiser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdvertiserFindUniqueOrThrowArgs>(args: SelectSubset<T, AdvertiserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdvertiserClient<$Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Advertiser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserFindFirstArgs} args - Arguments to find a Advertiser
     * @example
     * // Get one Advertiser
     * const advertiser = await prisma.advertiser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdvertiserFindFirstArgs>(args?: SelectSubset<T, AdvertiserFindFirstArgs<ExtArgs>>): Prisma__AdvertiserClient<$Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Advertiser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserFindFirstOrThrowArgs} args - Arguments to find a Advertiser
     * @example
     * // Get one Advertiser
     * const advertiser = await prisma.advertiser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdvertiserFindFirstOrThrowArgs>(args?: SelectSubset<T, AdvertiserFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdvertiserClient<$Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Advertisers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Advertisers
     * const advertisers = await prisma.advertiser.findMany()
     * 
     * // Get first 10 Advertisers
     * const advertisers = await prisma.advertiser.findMany({ take: 10 })
     * 
     * // Only select the `advertiserId`
     * const advertiserWithAdvertiserIdOnly = await prisma.advertiser.findMany({ select: { advertiserId: true } })
     * 
     */
    findMany<T extends AdvertiserFindManyArgs>(args?: SelectSubset<T, AdvertiserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Advertiser.
     * @param {AdvertiserCreateArgs} args - Arguments to create a Advertiser.
     * @example
     * // Create one Advertiser
     * const Advertiser = await prisma.advertiser.create({
     *   data: {
     *     // ... data to create a Advertiser
     *   }
     * })
     * 
     */
    create<T extends AdvertiserCreateArgs>(args: SelectSubset<T, AdvertiserCreateArgs<ExtArgs>>): Prisma__AdvertiserClient<$Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Advertisers.
     * @param {AdvertiserCreateManyArgs} args - Arguments to create many Advertisers.
     * @example
     * // Create many Advertisers
     * const advertiser = await prisma.advertiser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdvertiserCreateManyArgs>(args?: SelectSubset<T, AdvertiserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Advertisers and returns the data saved in the database.
     * @param {AdvertiserCreateManyAndReturnArgs} args - Arguments to create many Advertisers.
     * @example
     * // Create many Advertisers
     * const advertiser = await prisma.advertiser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Advertisers and only return the `advertiserId`
     * const advertiserWithAdvertiserIdOnly = await prisma.advertiser.createManyAndReturn({
     *   select: { advertiserId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdvertiserCreateManyAndReturnArgs>(args?: SelectSubset<T, AdvertiserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Advertiser.
     * @param {AdvertiserDeleteArgs} args - Arguments to delete one Advertiser.
     * @example
     * // Delete one Advertiser
     * const Advertiser = await prisma.advertiser.delete({
     *   where: {
     *     // ... filter to delete one Advertiser
     *   }
     * })
     * 
     */
    delete<T extends AdvertiserDeleteArgs>(args: SelectSubset<T, AdvertiserDeleteArgs<ExtArgs>>): Prisma__AdvertiserClient<$Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Advertiser.
     * @param {AdvertiserUpdateArgs} args - Arguments to update one Advertiser.
     * @example
     * // Update one Advertiser
     * const advertiser = await prisma.advertiser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdvertiserUpdateArgs>(args: SelectSubset<T, AdvertiserUpdateArgs<ExtArgs>>): Prisma__AdvertiserClient<$Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Advertisers.
     * @param {AdvertiserDeleteManyArgs} args - Arguments to filter Advertisers to delete.
     * @example
     * // Delete a few Advertisers
     * const { count } = await prisma.advertiser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdvertiserDeleteManyArgs>(args?: SelectSubset<T, AdvertiserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Advertisers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Advertisers
     * const advertiser = await prisma.advertiser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdvertiserUpdateManyArgs>(args: SelectSubset<T, AdvertiserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Advertisers and returns the data updated in the database.
     * @param {AdvertiserUpdateManyAndReturnArgs} args - Arguments to update many Advertisers.
     * @example
     * // Update many Advertisers
     * const advertiser = await prisma.advertiser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Advertisers and only return the `advertiserId`
     * const advertiserWithAdvertiserIdOnly = await prisma.advertiser.updateManyAndReturn({
     *   select: { advertiserId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdvertiserUpdateManyAndReturnArgs>(args: SelectSubset<T, AdvertiserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Advertiser.
     * @param {AdvertiserUpsertArgs} args - Arguments to update or create a Advertiser.
     * @example
     * // Update or create a Advertiser
     * const advertiser = await prisma.advertiser.upsert({
     *   create: {
     *     // ... data to create a Advertiser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Advertiser we want to update
     *   }
     * })
     */
    upsert<T extends AdvertiserUpsertArgs>(args: SelectSubset<T, AdvertiserUpsertArgs<ExtArgs>>): Prisma__AdvertiserClient<$Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Advertisers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserCountArgs} args - Arguments to filter Advertisers to count.
     * @example
     * // Count the number of Advertisers
     * const count = await prisma.advertiser.count({
     *   where: {
     *     // ... the filter for the Advertisers we want to count
     *   }
     * })
    **/
    count<T extends AdvertiserCountArgs>(
      args?: Subset<T, AdvertiserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdvertiserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Advertiser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdvertiserAggregateArgs>(args: Subset<T, AdvertiserAggregateArgs>): Prisma.PrismaPromise<GetAdvertiserAggregateType<T>>

    /**
     * Group by Advertiser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertiserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdvertiserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdvertiserGroupByArgs['orderBy'] }
        : { orderBy?: AdvertiserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdvertiserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdvertiserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Advertiser model
   */
  readonly fields: AdvertiserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Advertiser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdvertiserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    promotions<T extends Advertiser$promotionsArgs<ExtArgs> = {}>(args?: Subset<T, Advertiser$promotionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Advertiser model
   */
  interface AdvertiserFieldRefs {
    readonly advertiserId: FieldRef<"Advertiser", 'Int'>
    readonly name: FieldRef<"Advertiser", 'String'>
    readonly slug: FieldRef<"Advertiser", 'String'>
    readonly logoUrl: FieldRef<"Advertiser", 'String'>
    readonly url: FieldRef<"Advertiser", 'String'>
    readonly description: FieldRef<"Advertiser", 'String'>
    readonly isActive: FieldRef<"Advertiser", 'Boolean'>
    readonly createdAt: FieldRef<"Advertiser", 'DateTime'>
    readonly updatedAt: FieldRef<"Advertiser", 'DateTime'>
    readonly healthScore: FieldRef<"Advertiser", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Advertiser findUnique
   */
  export type AdvertiserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: AdvertiserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: AdvertiserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvertiserInclude<ExtArgs> | null
    /**
     * Filter, which Advertiser to fetch.
     */
    where: AdvertiserWhereUniqueInput
  }

  /**
   * Advertiser findUniqueOrThrow
   */
  export type AdvertiserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: AdvertiserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: AdvertiserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvertiserInclude<ExtArgs> | null
    /**
     * Filter, which Advertiser to fetch.
     */
    where: AdvertiserWhereUniqueInput
  }

  /**
   * Advertiser findFirst
   */
  export type AdvertiserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: AdvertiserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: AdvertiserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvertiserInclude<ExtArgs> | null
    /**
     * Filter, which Advertiser to fetch.
     */
    where?: AdvertiserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Advertisers to fetch.
     */
    orderBy?: AdvertiserOrderByWithRelationInput | AdvertiserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Advertisers.
     */
    cursor?: AdvertiserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Advertisers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Advertisers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Advertisers.
     */
    distinct?: AdvertiserScalarFieldEnum | AdvertiserScalarFieldEnum[]
  }

  /**
   * Advertiser findFirstOrThrow
   */
  export type AdvertiserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: AdvertiserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: AdvertiserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvertiserInclude<ExtArgs> | null
    /**
     * Filter, which Advertiser to fetch.
     */
    where?: AdvertiserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Advertisers to fetch.
     */
    orderBy?: AdvertiserOrderByWithRelationInput | AdvertiserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Advertisers.
     */
    cursor?: AdvertiserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Advertisers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Advertisers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Advertisers.
     */
    distinct?: AdvertiserScalarFieldEnum | AdvertiserScalarFieldEnum[]
  }

  /**
   * Advertiser findMany
   */
  export type AdvertiserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: AdvertiserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: AdvertiserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvertiserInclude<ExtArgs> | null
    /**
     * Filter, which Advertisers to fetch.
     */
    where?: AdvertiserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Advertisers to fetch.
     */
    orderBy?: AdvertiserOrderByWithRelationInput | AdvertiserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Advertisers.
     */
    cursor?: AdvertiserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Advertisers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Advertisers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Advertisers.
     */
    distinct?: AdvertiserScalarFieldEnum | AdvertiserScalarFieldEnum[]
  }

  /**
   * Advertiser create
   */
  export type AdvertiserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: AdvertiserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: AdvertiserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvertiserInclude<ExtArgs> | null
    /**
     * The data needed to create a Advertiser.
     */
    data: XOR<AdvertiserCreateInput, AdvertiserUncheckedCreateInput>
  }

  /**
   * Advertiser createMany
   */
  export type AdvertiserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Advertisers.
     */
    data: AdvertiserCreateManyInput | AdvertiserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Advertiser createManyAndReturn
   */
  export type AdvertiserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: AdvertiserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: AdvertiserOmit<ExtArgs> | null
    /**
     * The data used to create many Advertisers.
     */
    data: AdvertiserCreateManyInput | AdvertiserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Advertiser update
   */
  export type AdvertiserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: AdvertiserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: AdvertiserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvertiserInclude<ExtArgs> | null
    /**
     * The data needed to update a Advertiser.
     */
    data: XOR<AdvertiserUpdateInput, AdvertiserUncheckedUpdateInput>
    /**
     * Choose, which Advertiser to update.
     */
    where: AdvertiserWhereUniqueInput
  }

  /**
   * Advertiser updateMany
   */
  export type AdvertiserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Advertisers.
     */
    data: XOR<AdvertiserUpdateManyMutationInput, AdvertiserUncheckedUpdateManyInput>
    /**
     * Filter which Advertisers to update
     */
    where?: AdvertiserWhereInput
    /**
     * Limit how many Advertisers to update.
     */
    limit?: number
  }

  /**
   * Advertiser updateManyAndReturn
   */
  export type AdvertiserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: AdvertiserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: AdvertiserOmit<ExtArgs> | null
    /**
     * The data used to update Advertisers.
     */
    data: XOR<AdvertiserUpdateManyMutationInput, AdvertiserUncheckedUpdateManyInput>
    /**
     * Filter which Advertisers to update
     */
    where?: AdvertiserWhereInput
    /**
     * Limit how many Advertisers to update.
     */
    limit?: number
  }

  /**
   * Advertiser upsert
   */
  export type AdvertiserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: AdvertiserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: AdvertiserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvertiserInclude<ExtArgs> | null
    /**
     * The filter to search for the Advertiser to update in case it exists.
     */
    where: AdvertiserWhereUniqueInput
    /**
     * In case the Advertiser found by the `where` argument doesn't exist, create a new Advertiser with this data.
     */
    create: XOR<AdvertiserCreateInput, AdvertiserUncheckedCreateInput>
    /**
     * In case the Advertiser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdvertiserUpdateInput, AdvertiserUncheckedUpdateInput>
  }

  /**
   * Advertiser delete
   */
  export type AdvertiserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: AdvertiserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: AdvertiserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvertiserInclude<ExtArgs> | null
    /**
     * Filter which Advertiser to delete.
     */
    where: AdvertiserWhereUniqueInput
  }

  /**
   * Advertiser deleteMany
   */
  export type AdvertiserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Advertisers to delete
     */
    where?: AdvertiserWhereInput
    /**
     * Limit how many Advertisers to delete.
     */
    limit?: number
  }

  /**
   * Advertiser.promotions
   */
  export type Advertiser$promotionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotion
     */
    omit?: PromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
    where?: PromotionWhereInput
    orderBy?: PromotionOrderByWithRelationInput | PromotionOrderByWithRelationInput[]
    cursor?: PromotionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PromotionScalarFieldEnum | PromotionScalarFieldEnum[]
  }

  /**
   * Advertiser without action
   */
  export type AdvertiserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: AdvertiserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: AdvertiserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvertiserInclude<ExtArgs> | null
  }


  /**
   * Model DealHealthVote
   */

  export type AggregateDealHealthVote = {
    _count: DealHealthVoteCountAggregateOutputType | null
    _avg: DealHealthVoteAvgAggregateOutputType | null
    _sum: DealHealthVoteSumAggregateOutputType | null
    _min: DealHealthVoteMinAggregateOutputType | null
    _max: DealHealthVoteMaxAggregateOutputType | null
  }

  export type DealHealthVoteAvgAggregateOutputType = {
    id: number | null
  }

  export type DealHealthVoteSumAggregateOutputType = {
    id: number | null
  }

  export type DealHealthVoteMinAggregateOutputType = {
    id: number | null
    productSlug: string | null
    vote: string | null
    fingerprint: string | null
    createdAt: Date | null
  }

  export type DealHealthVoteMaxAggregateOutputType = {
    id: number | null
    productSlug: string | null
    vote: string | null
    fingerprint: string | null
    createdAt: Date | null
  }

  export type DealHealthVoteCountAggregateOutputType = {
    id: number
    productSlug: number
    vote: number
    fingerprint: number
    createdAt: number
    _all: number
  }


  export type DealHealthVoteAvgAggregateInputType = {
    id?: true
  }

  export type DealHealthVoteSumAggregateInputType = {
    id?: true
  }

  export type DealHealthVoteMinAggregateInputType = {
    id?: true
    productSlug?: true
    vote?: true
    fingerprint?: true
    createdAt?: true
  }

  export type DealHealthVoteMaxAggregateInputType = {
    id?: true
    productSlug?: true
    vote?: true
    fingerprint?: true
    createdAt?: true
  }

  export type DealHealthVoteCountAggregateInputType = {
    id?: true
    productSlug?: true
    vote?: true
    fingerprint?: true
    createdAt?: true
    _all?: true
  }

  export type DealHealthVoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DealHealthVote to aggregate.
     */
    where?: DealHealthVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DealHealthVotes to fetch.
     */
    orderBy?: DealHealthVoteOrderByWithRelationInput | DealHealthVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DealHealthVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DealHealthVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DealHealthVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DealHealthVotes
    **/
    _count?: true | DealHealthVoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DealHealthVoteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DealHealthVoteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DealHealthVoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DealHealthVoteMaxAggregateInputType
  }

  export type GetDealHealthVoteAggregateType<T extends DealHealthVoteAggregateArgs> = {
        [P in keyof T & keyof AggregateDealHealthVote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDealHealthVote[P]>
      : GetScalarType<T[P], AggregateDealHealthVote[P]>
  }




  export type DealHealthVoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DealHealthVoteWhereInput
    orderBy?: DealHealthVoteOrderByWithAggregationInput | DealHealthVoteOrderByWithAggregationInput[]
    by: DealHealthVoteScalarFieldEnum[] | DealHealthVoteScalarFieldEnum
    having?: DealHealthVoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DealHealthVoteCountAggregateInputType | true
    _avg?: DealHealthVoteAvgAggregateInputType
    _sum?: DealHealthVoteSumAggregateInputType
    _min?: DealHealthVoteMinAggregateInputType
    _max?: DealHealthVoteMaxAggregateInputType
  }

  export type DealHealthVoteGroupByOutputType = {
    id: number
    productSlug: string
    vote: string
    fingerprint: string | null
    createdAt: Date | null
    _count: DealHealthVoteCountAggregateOutputType | null
    _avg: DealHealthVoteAvgAggregateOutputType | null
    _sum: DealHealthVoteSumAggregateOutputType | null
    _min: DealHealthVoteMinAggregateOutputType | null
    _max: DealHealthVoteMaxAggregateOutputType | null
  }

  type GetDealHealthVoteGroupByPayload<T extends DealHealthVoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DealHealthVoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DealHealthVoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DealHealthVoteGroupByOutputType[P]>
            : GetScalarType<T[P], DealHealthVoteGroupByOutputType[P]>
        }
      >
    >


  export type DealHealthVoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productSlug?: boolean
    vote?: boolean
    fingerprint?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["dealHealthVote"]>

  export type DealHealthVoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productSlug?: boolean
    vote?: boolean
    fingerprint?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["dealHealthVote"]>

  export type DealHealthVoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productSlug?: boolean
    vote?: boolean
    fingerprint?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["dealHealthVote"]>

  export type DealHealthVoteSelectScalar = {
    id?: boolean
    productSlug?: boolean
    vote?: boolean
    fingerprint?: boolean
    createdAt?: boolean
  }

  export type DealHealthVoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productSlug" | "vote" | "fingerprint" | "createdAt", ExtArgs["result"]["dealHealthVote"]>

  export type $DealHealthVotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DealHealthVote"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      productSlug: string
      vote: string
      fingerprint: string | null
      createdAt: Date | null
    }, ExtArgs["result"]["dealHealthVote"]>
    composites: {}
  }

  type DealHealthVoteGetPayload<S extends boolean | null | undefined | DealHealthVoteDefaultArgs> = $Result.GetResult<Prisma.$DealHealthVotePayload, S>

  type DealHealthVoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DealHealthVoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DealHealthVoteCountAggregateInputType | true
    }

  export interface DealHealthVoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DealHealthVote'], meta: { name: 'DealHealthVote' } }
    /**
     * Find zero or one DealHealthVote that matches the filter.
     * @param {DealHealthVoteFindUniqueArgs} args - Arguments to find a DealHealthVote
     * @example
     * // Get one DealHealthVote
     * const dealHealthVote = await prisma.dealHealthVote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DealHealthVoteFindUniqueArgs>(args: SelectSubset<T, DealHealthVoteFindUniqueArgs<ExtArgs>>): Prisma__DealHealthVoteClient<$Result.GetResult<Prisma.$DealHealthVotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DealHealthVote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DealHealthVoteFindUniqueOrThrowArgs} args - Arguments to find a DealHealthVote
     * @example
     * // Get one DealHealthVote
     * const dealHealthVote = await prisma.dealHealthVote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DealHealthVoteFindUniqueOrThrowArgs>(args: SelectSubset<T, DealHealthVoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DealHealthVoteClient<$Result.GetResult<Prisma.$DealHealthVotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DealHealthVote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealHealthVoteFindFirstArgs} args - Arguments to find a DealHealthVote
     * @example
     * // Get one DealHealthVote
     * const dealHealthVote = await prisma.dealHealthVote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DealHealthVoteFindFirstArgs>(args?: SelectSubset<T, DealHealthVoteFindFirstArgs<ExtArgs>>): Prisma__DealHealthVoteClient<$Result.GetResult<Prisma.$DealHealthVotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DealHealthVote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealHealthVoteFindFirstOrThrowArgs} args - Arguments to find a DealHealthVote
     * @example
     * // Get one DealHealthVote
     * const dealHealthVote = await prisma.dealHealthVote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DealHealthVoteFindFirstOrThrowArgs>(args?: SelectSubset<T, DealHealthVoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__DealHealthVoteClient<$Result.GetResult<Prisma.$DealHealthVotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DealHealthVotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealHealthVoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DealHealthVotes
     * const dealHealthVotes = await prisma.dealHealthVote.findMany()
     * 
     * // Get first 10 DealHealthVotes
     * const dealHealthVotes = await prisma.dealHealthVote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dealHealthVoteWithIdOnly = await prisma.dealHealthVote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DealHealthVoteFindManyArgs>(args?: SelectSubset<T, DealHealthVoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealHealthVotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DealHealthVote.
     * @param {DealHealthVoteCreateArgs} args - Arguments to create a DealHealthVote.
     * @example
     * // Create one DealHealthVote
     * const DealHealthVote = await prisma.dealHealthVote.create({
     *   data: {
     *     // ... data to create a DealHealthVote
     *   }
     * })
     * 
     */
    create<T extends DealHealthVoteCreateArgs>(args: SelectSubset<T, DealHealthVoteCreateArgs<ExtArgs>>): Prisma__DealHealthVoteClient<$Result.GetResult<Prisma.$DealHealthVotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DealHealthVotes.
     * @param {DealHealthVoteCreateManyArgs} args - Arguments to create many DealHealthVotes.
     * @example
     * // Create many DealHealthVotes
     * const dealHealthVote = await prisma.dealHealthVote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DealHealthVoteCreateManyArgs>(args?: SelectSubset<T, DealHealthVoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DealHealthVotes and returns the data saved in the database.
     * @param {DealHealthVoteCreateManyAndReturnArgs} args - Arguments to create many DealHealthVotes.
     * @example
     * // Create many DealHealthVotes
     * const dealHealthVote = await prisma.dealHealthVote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DealHealthVotes and only return the `id`
     * const dealHealthVoteWithIdOnly = await prisma.dealHealthVote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DealHealthVoteCreateManyAndReturnArgs>(args?: SelectSubset<T, DealHealthVoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealHealthVotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DealHealthVote.
     * @param {DealHealthVoteDeleteArgs} args - Arguments to delete one DealHealthVote.
     * @example
     * // Delete one DealHealthVote
     * const DealHealthVote = await prisma.dealHealthVote.delete({
     *   where: {
     *     // ... filter to delete one DealHealthVote
     *   }
     * })
     * 
     */
    delete<T extends DealHealthVoteDeleteArgs>(args: SelectSubset<T, DealHealthVoteDeleteArgs<ExtArgs>>): Prisma__DealHealthVoteClient<$Result.GetResult<Prisma.$DealHealthVotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DealHealthVote.
     * @param {DealHealthVoteUpdateArgs} args - Arguments to update one DealHealthVote.
     * @example
     * // Update one DealHealthVote
     * const dealHealthVote = await prisma.dealHealthVote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DealHealthVoteUpdateArgs>(args: SelectSubset<T, DealHealthVoteUpdateArgs<ExtArgs>>): Prisma__DealHealthVoteClient<$Result.GetResult<Prisma.$DealHealthVotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DealHealthVotes.
     * @param {DealHealthVoteDeleteManyArgs} args - Arguments to filter DealHealthVotes to delete.
     * @example
     * // Delete a few DealHealthVotes
     * const { count } = await prisma.dealHealthVote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DealHealthVoteDeleteManyArgs>(args?: SelectSubset<T, DealHealthVoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DealHealthVotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealHealthVoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DealHealthVotes
     * const dealHealthVote = await prisma.dealHealthVote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DealHealthVoteUpdateManyArgs>(args: SelectSubset<T, DealHealthVoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DealHealthVotes and returns the data updated in the database.
     * @param {DealHealthVoteUpdateManyAndReturnArgs} args - Arguments to update many DealHealthVotes.
     * @example
     * // Update many DealHealthVotes
     * const dealHealthVote = await prisma.dealHealthVote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DealHealthVotes and only return the `id`
     * const dealHealthVoteWithIdOnly = await prisma.dealHealthVote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DealHealthVoteUpdateManyAndReturnArgs>(args: SelectSubset<T, DealHealthVoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealHealthVotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DealHealthVote.
     * @param {DealHealthVoteUpsertArgs} args - Arguments to update or create a DealHealthVote.
     * @example
     * // Update or create a DealHealthVote
     * const dealHealthVote = await prisma.dealHealthVote.upsert({
     *   create: {
     *     // ... data to create a DealHealthVote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DealHealthVote we want to update
     *   }
     * })
     */
    upsert<T extends DealHealthVoteUpsertArgs>(args: SelectSubset<T, DealHealthVoteUpsertArgs<ExtArgs>>): Prisma__DealHealthVoteClient<$Result.GetResult<Prisma.$DealHealthVotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DealHealthVotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealHealthVoteCountArgs} args - Arguments to filter DealHealthVotes to count.
     * @example
     * // Count the number of DealHealthVotes
     * const count = await prisma.dealHealthVote.count({
     *   where: {
     *     // ... the filter for the DealHealthVotes we want to count
     *   }
     * })
    **/
    count<T extends DealHealthVoteCountArgs>(
      args?: Subset<T, DealHealthVoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DealHealthVoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DealHealthVote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealHealthVoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DealHealthVoteAggregateArgs>(args: Subset<T, DealHealthVoteAggregateArgs>): Prisma.PrismaPromise<GetDealHealthVoteAggregateType<T>>

    /**
     * Group by DealHealthVote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealHealthVoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DealHealthVoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DealHealthVoteGroupByArgs['orderBy'] }
        : { orderBy?: DealHealthVoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DealHealthVoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDealHealthVoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DealHealthVote model
   */
  readonly fields: DealHealthVoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DealHealthVote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DealHealthVoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DealHealthVote model
   */
  interface DealHealthVoteFieldRefs {
    readonly id: FieldRef<"DealHealthVote", 'Int'>
    readonly productSlug: FieldRef<"DealHealthVote", 'String'>
    readonly vote: FieldRef<"DealHealthVote", 'String'>
    readonly fingerprint: FieldRef<"DealHealthVote", 'String'>
    readonly createdAt: FieldRef<"DealHealthVote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DealHealthVote findUnique
   */
  export type DealHealthVoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealHealthVote
     */
    select?: DealHealthVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealHealthVote
     */
    omit?: DealHealthVoteOmit<ExtArgs> | null
    /**
     * Filter, which DealHealthVote to fetch.
     */
    where: DealHealthVoteWhereUniqueInput
  }

  /**
   * DealHealthVote findUniqueOrThrow
   */
  export type DealHealthVoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealHealthVote
     */
    select?: DealHealthVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealHealthVote
     */
    omit?: DealHealthVoteOmit<ExtArgs> | null
    /**
     * Filter, which DealHealthVote to fetch.
     */
    where: DealHealthVoteWhereUniqueInput
  }

  /**
   * DealHealthVote findFirst
   */
  export type DealHealthVoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealHealthVote
     */
    select?: DealHealthVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealHealthVote
     */
    omit?: DealHealthVoteOmit<ExtArgs> | null
    /**
     * Filter, which DealHealthVote to fetch.
     */
    where?: DealHealthVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DealHealthVotes to fetch.
     */
    orderBy?: DealHealthVoteOrderByWithRelationInput | DealHealthVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DealHealthVotes.
     */
    cursor?: DealHealthVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DealHealthVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DealHealthVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DealHealthVotes.
     */
    distinct?: DealHealthVoteScalarFieldEnum | DealHealthVoteScalarFieldEnum[]
  }

  /**
   * DealHealthVote findFirstOrThrow
   */
  export type DealHealthVoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealHealthVote
     */
    select?: DealHealthVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealHealthVote
     */
    omit?: DealHealthVoteOmit<ExtArgs> | null
    /**
     * Filter, which DealHealthVote to fetch.
     */
    where?: DealHealthVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DealHealthVotes to fetch.
     */
    orderBy?: DealHealthVoteOrderByWithRelationInput | DealHealthVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DealHealthVotes.
     */
    cursor?: DealHealthVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DealHealthVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DealHealthVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DealHealthVotes.
     */
    distinct?: DealHealthVoteScalarFieldEnum | DealHealthVoteScalarFieldEnum[]
  }

  /**
   * DealHealthVote findMany
   */
  export type DealHealthVoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealHealthVote
     */
    select?: DealHealthVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealHealthVote
     */
    omit?: DealHealthVoteOmit<ExtArgs> | null
    /**
     * Filter, which DealHealthVotes to fetch.
     */
    where?: DealHealthVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DealHealthVotes to fetch.
     */
    orderBy?: DealHealthVoteOrderByWithRelationInput | DealHealthVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DealHealthVotes.
     */
    cursor?: DealHealthVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DealHealthVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DealHealthVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DealHealthVotes.
     */
    distinct?: DealHealthVoteScalarFieldEnum | DealHealthVoteScalarFieldEnum[]
  }

  /**
   * DealHealthVote create
   */
  export type DealHealthVoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealHealthVote
     */
    select?: DealHealthVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealHealthVote
     */
    omit?: DealHealthVoteOmit<ExtArgs> | null
    /**
     * The data needed to create a DealHealthVote.
     */
    data: XOR<DealHealthVoteCreateInput, DealHealthVoteUncheckedCreateInput>
  }

  /**
   * DealHealthVote createMany
   */
  export type DealHealthVoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DealHealthVotes.
     */
    data: DealHealthVoteCreateManyInput | DealHealthVoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DealHealthVote createManyAndReturn
   */
  export type DealHealthVoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealHealthVote
     */
    select?: DealHealthVoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DealHealthVote
     */
    omit?: DealHealthVoteOmit<ExtArgs> | null
    /**
     * The data used to create many DealHealthVotes.
     */
    data: DealHealthVoteCreateManyInput | DealHealthVoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DealHealthVote update
   */
  export type DealHealthVoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealHealthVote
     */
    select?: DealHealthVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealHealthVote
     */
    omit?: DealHealthVoteOmit<ExtArgs> | null
    /**
     * The data needed to update a DealHealthVote.
     */
    data: XOR<DealHealthVoteUpdateInput, DealHealthVoteUncheckedUpdateInput>
    /**
     * Choose, which DealHealthVote to update.
     */
    where: DealHealthVoteWhereUniqueInput
  }

  /**
   * DealHealthVote updateMany
   */
  export type DealHealthVoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DealHealthVotes.
     */
    data: XOR<DealHealthVoteUpdateManyMutationInput, DealHealthVoteUncheckedUpdateManyInput>
    /**
     * Filter which DealHealthVotes to update
     */
    where?: DealHealthVoteWhereInput
    /**
     * Limit how many DealHealthVotes to update.
     */
    limit?: number
  }

  /**
   * DealHealthVote updateManyAndReturn
   */
  export type DealHealthVoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealHealthVote
     */
    select?: DealHealthVoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DealHealthVote
     */
    omit?: DealHealthVoteOmit<ExtArgs> | null
    /**
     * The data used to update DealHealthVotes.
     */
    data: XOR<DealHealthVoteUpdateManyMutationInput, DealHealthVoteUncheckedUpdateManyInput>
    /**
     * Filter which DealHealthVotes to update
     */
    where?: DealHealthVoteWhereInput
    /**
     * Limit how many DealHealthVotes to update.
     */
    limit?: number
  }

  /**
   * DealHealthVote upsert
   */
  export type DealHealthVoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealHealthVote
     */
    select?: DealHealthVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealHealthVote
     */
    omit?: DealHealthVoteOmit<ExtArgs> | null
    /**
     * The filter to search for the DealHealthVote to update in case it exists.
     */
    where: DealHealthVoteWhereUniqueInput
    /**
     * In case the DealHealthVote found by the `where` argument doesn't exist, create a new DealHealthVote with this data.
     */
    create: XOR<DealHealthVoteCreateInput, DealHealthVoteUncheckedCreateInput>
    /**
     * In case the DealHealthVote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DealHealthVoteUpdateInput, DealHealthVoteUncheckedUpdateInput>
  }

  /**
   * DealHealthVote delete
   */
  export type DealHealthVoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealHealthVote
     */
    select?: DealHealthVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealHealthVote
     */
    omit?: DealHealthVoteOmit<ExtArgs> | null
    /**
     * Filter which DealHealthVote to delete.
     */
    where: DealHealthVoteWhereUniqueInput
  }

  /**
   * DealHealthVote deleteMany
   */
  export type DealHealthVoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DealHealthVotes to delete
     */
    where?: DealHealthVoteWhereInput
    /**
     * Limit how many DealHealthVotes to delete.
     */
    limit?: number
  }

  /**
   * DealHealthVote without action
   */
  export type DealHealthVoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DealHealthVote
     */
    select?: DealHealthVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DealHealthVote
     */
    omit?: DealHealthVoteOmit<ExtArgs> | null
  }


  /**
   * Model Feed
   */

  export type AggregateFeed = {
    _count: FeedCountAggregateOutputType | null
    _avg: FeedAvgAggregateOutputType | null
    _sum: FeedSumAggregateOutputType | null
    _min: FeedMinAggregateOutputType | null
    _max: FeedMaxAggregateOutputType | null
  }

  export type FeedAvgAggregateOutputType = {
    id: number | null
    programId: number | null
    totalProducts: number | null
    productsImported: number | null
  }

  export type FeedSumAggregateOutputType = {
    id: number | null
    programId: number | null
    totalProducts: number | null
    productsImported: number | null
  }

  export type FeedMinAggregateOutputType = {
    id: number | null
    programId: number | null
    programName: string | null
    catalogId: string | null
    catalogName: string | null
    httpsLink: string | null
    country: string | null
    totalProducts: number | null
    status: string | null
    sourceUpdatedAt: Date | null
    lastImportedAt: Date | null
    productsImported: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeedMaxAggregateOutputType = {
    id: number | null
    programId: number | null
    programName: string | null
    catalogId: string | null
    catalogName: string | null
    httpsLink: string | null
    country: string | null
    totalProducts: number | null
    status: string | null
    sourceUpdatedAt: Date | null
    lastImportedAt: Date | null
    productsImported: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeedCountAggregateOutputType = {
    id: number
    programId: number
    programName: number
    catalogId: number
    catalogName: number
    httpsLink: number
    country: number
    totalProducts: number
    status: number
    sourceUpdatedAt: number
    lastImportedAt: number
    productsImported: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FeedAvgAggregateInputType = {
    id?: true
    programId?: true
    totalProducts?: true
    productsImported?: true
  }

  export type FeedSumAggregateInputType = {
    id?: true
    programId?: true
    totalProducts?: true
    productsImported?: true
  }

  export type FeedMinAggregateInputType = {
    id?: true
    programId?: true
    programName?: true
    catalogId?: true
    catalogName?: true
    httpsLink?: true
    country?: true
    totalProducts?: true
    status?: true
    sourceUpdatedAt?: true
    lastImportedAt?: true
    productsImported?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeedMaxAggregateInputType = {
    id?: true
    programId?: true
    programName?: true
    catalogId?: true
    catalogName?: true
    httpsLink?: true
    country?: true
    totalProducts?: true
    status?: true
    sourceUpdatedAt?: true
    lastImportedAt?: true
    productsImported?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeedCountAggregateInputType = {
    id?: true
    programId?: true
    programName?: true
    catalogId?: true
    catalogName?: true
    httpsLink?: true
    country?: true
    totalProducts?: true
    status?: true
    sourceUpdatedAt?: true
    lastImportedAt?: true
    productsImported?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FeedAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feed to aggregate.
     */
    where?: FeedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feeds to fetch.
     */
    orderBy?: FeedOrderByWithRelationInput | FeedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feeds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Feeds
    **/
    _count?: true | FeedCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FeedAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FeedSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedMaxAggregateInputType
  }

  export type GetFeedAggregateType<T extends FeedAggregateArgs> = {
        [P in keyof T & keyof AggregateFeed]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeed[P]>
      : GetScalarType<T[P], AggregateFeed[P]>
  }




  export type FeedGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedWhereInput
    orderBy?: FeedOrderByWithAggregationInput | FeedOrderByWithAggregationInput[]
    by: FeedScalarFieldEnum[] | FeedScalarFieldEnum
    having?: FeedScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedCountAggregateInputType | true
    _avg?: FeedAvgAggregateInputType
    _sum?: FeedSumAggregateInputType
    _min?: FeedMinAggregateInputType
    _max?: FeedMaxAggregateInputType
  }

  export type FeedGroupByOutputType = {
    id: number
    programId: number
    programName: string
    catalogId: string | null
    catalogName: string | null
    httpsLink: string | null
    country: string | null
    totalProducts: number | null
    status: string | null
    sourceUpdatedAt: Date | null
    lastImportedAt: Date | null
    productsImported: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    _count: FeedCountAggregateOutputType | null
    _avg: FeedAvgAggregateOutputType | null
    _sum: FeedSumAggregateOutputType | null
    _min: FeedMinAggregateOutputType | null
    _max: FeedMaxAggregateOutputType | null
  }

  type GetFeedGroupByPayload<T extends FeedGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedGroupByOutputType[P]>
            : GetScalarType<T[P], FeedGroupByOutputType[P]>
        }
      >
    >


  export type FeedSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    programId?: boolean
    programName?: boolean
    catalogId?: boolean
    catalogName?: boolean
    httpsLink?: boolean
    country?: boolean
    totalProducts?: boolean
    status?: boolean
    sourceUpdatedAt?: boolean
    lastImportedAt?: boolean
    productsImported?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["feed"]>

  export type FeedSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    programId?: boolean
    programName?: boolean
    catalogId?: boolean
    catalogName?: boolean
    httpsLink?: boolean
    country?: boolean
    totalProducts?: boolean
    status?: boolean
    sourceUpdatedAt?: boolean
    lastImportedAt?: boolean
    productsImported?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["feed"]>

  export type FeedSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    programId?: boolean
    programName?: boolean
    catalogId?: boolean
    catalogName?: boolean
    httpsLink?: boolean
    country?: boolean
    totalProducts?: boolean
    status?: boolean
    sourceUpdatedAt?: boolean
    lastImportedAt?: boolean
    productsImported?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["feed"]>

  export type FeedSelectScalar = {
    id?: boolean
    programId?: boolean
    programName?: boolean
    catalogId?: boolean
    catalogName?: boolean
    httpsLink?: boolean
    country?: boolean
    totalProducts?: boolean
    status?: boolean
    sourceUpdatedAt?: boolean
    lastImportedAt?: boolean
    productsImported?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FeedOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "programId" | "programName" | "catalogId" | "catalogName" | "httpsLink" | "country" | "totalProducts" | "status" | "sourceUpdatedAt" | "lastImportedAt" | "productsImported" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["feed"]>

  export type $FeedPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Feed"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      programId: number
      programName: string
      catalogId: string | null
      catalogName: string | null
      httpsLink: string | null
      country: string | null
      totalProducts: number | null
      status: string | null
      sourceUpdatedAt: Date | null
      lastImportedAt: Date | null
      productsImported: number | null
      isActive: boolean | null
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["feed"]>
    composites: {}
  }

  type FeedGetPayload<S extends boolean | null | undefined | FeedDefaultArgs> = $Result.GetResult<Prisma.$FeedPayload, S>

  type FeedCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeedFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeedCountAggregateInputType | true
    }

  export interface FeedDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Feed'], meta: { name: 'Feed' } }
    /**
     * Find zero or one Feed that matches the filter.
     * @param {FeedFindUniqueArgs} args - Arguments to find a Feed
     * @example
     * // Get one Feed
     * const feed = await prisma.feed.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedFindUniqueArgs>(args: SelectSubset<T, FeedFindUniqueArgs<ExtArgs>>): Prisma__FeedClient<$Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Feed that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeedFindUniqueOrThrowArgs} args - Arguments to find a Feed
     * @example
     * // Get one Feed
     * const feed = await prisma.feed.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedClient<$Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feed that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedFindFirstArgs} args - Arguments to find a Feed
     * @example
     * // Get one Feed
     * const feed = await prisma.feed.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedFindFirstArgs>(args?: SelectSubset<T, FeedFindFirstArgs<ExtArgs>>): Prisma__FeedClient<$Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feed that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedFindFirstOrThrowArgs} args - Arguments to find a Feed
     * @example
     * // Get one Feed
     * const feed = await prisma.feed.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedClient<$Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Feeds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Feeds
     * const feeds = await prisma.feed.findMany()
     * 
     * // Get first 10 Feeds
     * const feeds = await prisma.feed.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedWithIdOnly = await prisma.feed.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedFindManyArgs>(args?: SelectSubset<T, FeedFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Feed.
     * @param {FeedCreateArgs} args - Arguments to create a Feed.
     * @example
     * // Create one Feed
     * const Feed = await prisma.feed.create({
     *   data: {
     *     // ... data to create a Feed
     *   }
     * })
     * 
     */
    create<T extends FeedCreateArgs>(args: SelectSubset<T, FeedCreateArgs<ExtArgs>>): Prisma__FeedClient<$Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Feeds.
     * @param {FeedCreateManyArgs} args - Arguments to create many Feeds.
     * @example
     * // Create many Feeds
     * const feed = await prisma.feed.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedCreateManyArgs>(args?: SelectSubset<T, FeedCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Feeds and returns the data saved in the database.
     * @param {FeedCreateManyAndReturnArgs} args - Arguments to create many Feeds.
     * @example
     * // Create many Feeds
     * const feed = await prisma.feed.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Feeds and only return the `id`
     * const feedWithIdOnly = await prisma.feed.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Feed.
     * @param {FeedDeleteArgs} args - Arguments to delete one Feed.
     * @example
     * // Delete one Feed
     * const Feed = await prisma.feed.delete({
     *   where: {
     *     // ... filter to delete one Feed
     *   }
     * })
     * 
     */
    delete<T extends FeedDeleteArgs>(args: SelectSubset<T, FeedDeleteArgs<ExtArgs>>): Prisma__FeedClient<$Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Feed.
     * @param {FeedUpdateArgs} args - Arguments to update one Feed.
     * @example
     * // Update one Feed
     * const feed = await prisma.feed.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedUpdateArgs>(args: SelectSubset<T, FeedUpdateArgs<ExtArgs>>): Prisma__FeedClient<$Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Feeds.
     * @param {FeedDeleteManyArgs} args - Arguments to filter Feeds to delete.
     * @example
     * // Delete a few Feeds
     * const { count } = await prisma.feed.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedDeleteManyArgs>(args?: SelectSubset<T, FeedDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feeds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Feeds
     * const feed = await prisma.feed.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedUpdateManyArgs>(args: SelectSubset<T, FeedUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feeds and returns the data updated in the database.
     * @param {FeedUpdateManyAndReturnArgs} args - Arguments to update many Feeds.
     * @example
     * // Update many Feeds
     * const feed = await prisma.feed.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Feeds and only return the `id`
     * const feedWithIdOnly = await prisma.feed.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FeedUpdateManyAndReturnArgs>(args: SelectSubset<T, FeedUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Feed.
     * @param {FeedUpsertArgs} args - Arguments to update or create a Feed.
     * @example
     * // Update or create a Feed
     * const feed = await prisma.feed.upsert({
     *   create: {
     *     // ... data to create a Feed
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Feed we want to update
     *   }
     * })
     */
    upsert<T extends FeedUpsertArgs>(args: SelectSubset<T, FeedUpsertArgs<ExtArgs>>): Prisma__FeedClient<$Result.GetResult<Prisma.$FeedPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Feeds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedCountArgs} args - Arguments to filter Feeds to count.
     * @example
     * // Count the number of Feeds
     * const count = await prisma.feed.count({
     *   where: {
     *     // ... the filter for the Feeds we want to count
     *   }
     * })
    **/
    count<T extends FeedCountArgs>(
      args?: Subset<T, FeedCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Feed.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeedAggregateArgs>(args: Subset<T, FeedAggregateArgs>): Prisma.PrismaPromise<GetFeedAggregateType<T>>

    /**
     * Group by Feed.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeedGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedGroupByArgs['orderBy'] }
        : { orderBy?: FeedGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeedGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Feed model
   */
  readonly fields: FeedFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Feed.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Feed model
   */
  interface FeedFieldRefs {
    readonly id: FieldRef<"Feed", 'Int'>
    readonly programId: FieldRef<"Feed", 'Int'>
    readonly programName: FieldRef<"Feed", 'String'>
    readonly catalogId: FieldRef<"Feed", 'String'>
    readonly catalogName: FieldRef<"Feed", 'String'>
    readonly httpsLink: FieldRef<"Feed", 'String'>
    readonly country: FieldRef<"Feed", 'String'>
    readonly totalProducts: FieldRef<"Feed", 'Int'>
    readonly status: FieldRef<"Feed", 'String'>
    readonly sourceUpdatedAt: FieldRef<"Feed", 'DateTime'>
    readonly lastImportedAt: FieldRef<"Feed", 'DateTime'>
    readonly productsImported: FieldRef<"Feed", 'Int'>
    readonly isActive: FieldRef<"Feed", 'Boolean'>
    readonly createdAt: FieldRef<"Feed", 'DateTime'>
    readonly updatedAt: FieldRef<"Feed", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Feed findUnique
   */
  export type FeedFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: FeedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feed
     */
    omit?: FeedOmit<ExtArgs> | null
    /**
     * Filter, which Feed to fetch.
     */
    where: FeedWhereUniqueInput
  }

  /**
   * Feed findUniqueOrThrow
   */
  export type FeedFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: FeedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feed
     */
    omit?: FeedOmit<ExtArgs> | null
    /**
     * Filter, which Feed to fetch.
     */
    where: FeedWhereUniqueInput
  }

  /**
   * Feed findFirst
   */
  export type FeedFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: FeedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feed
     */
    omit?: FeedOmit<ExtArgs> | null
    /**
     * Filter, which Feed to fetch.
     */
    where?: FeedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feeds to fetch.
     */
    orderBy?: FeedOrderByWithRelationInput | FeedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feeds.
     */
    cursor?: FeedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feeds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feeds.
     */
    distinct?: FeedScalarFieldEnum | FeedScalarFieldEnum[]
  }

  /**
   * Feed findFirstOrThrow
   */
  export type FeedFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: FeedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feed
     */
    omit?: FeedOmit<ExtArgs> | null
    /**
     * Filter, which Feed to fetch.
     */
    where?: FeedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feeds to fetch.
     */
    orderBy?: FeedOrderByWithRelationInput | FeedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feeds.
     */
    cursor?: FeedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feeds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feeds.
     */
    distinct?: FeedScalarFieldEnum | FeedScalarFieldEnum[]
  }

  /**
   * Feed findMany
   */
  export type FeedFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: FeedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feed
     */
    omit?: FeedOmit<ExtArgs> | null
    /**
     * Filter, which Feeds to fetch.
     */
    where?: FeedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feeds to fetch.
     */
    orderBy?: FeedOrderByWithRelationInput | FeedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Feeds.
     */
    cursor?: FeedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feeds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feeds.
     */
    distinct?: FeedScalarFieldEnum | FeedScalarFieldEnum[]
  }

  /**
   * Feed create
   */
  export type FeedCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: FeedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feed
     */
    omit?: FeedOmit<ExtArgs> | null
    /**
     * The data needed to create a Feed.
     */
    data: XOR<FeedCreateInput, FeedUncheckedCreateInput>
  }

  /**
   * Feed createMany
   */
  export type FeedCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Feeds.
     */
    data: FeedCreateManyInput | FeedCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Feed createManyAndReturn
   */
  export type FeedCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: FeedSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feed
     */
    omit?: FeedOmit<ExtArgs> | null
    /**
     * The data used to create many Feeds.
     */
    data: FeedCreateManyInput | FeedCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Feed update
   */
  export type FeedUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: FeedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feed
     */
    omit?: FeedOmit<ExtArgs> | null
    /**
     * The data needed to update a Feed.
     */
    data: XOR<FeedUpdateInput, FeedUncheckedUpdateInput>
    /**
     * Choose, which Feed to update.
     */
    where: FeedWhereUniqueInput
  }

  /**
   * Feed updateMany
   */
  export type FeedUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Feeds.
     */
    data: XOR<FeedUpdateManyMutationInput, FeedUncheckedUpdateManyInput>
    /**
     * Filter which Feeds to update
     */
    where?: FeedWhereInput
    /**
     * Limit how many Feeds to update.
     */
    limit?: number
  }

  /**
   * Feed updateManyAndReturn
   */
  export type FeedUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: FeedSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feed
     */
    omit?: FeedOmit<ExtArgs> | null
    /**
     * The data used to update Feeds.
     */
    data: XOR<FeedUpdateManyMutationInput, FeedUncheckedUpdateManyInput>
    /**
     * Filter which Feeds to update
     */
    where?: FeedWhereInput
    /**
     * Limit how many Feeds to update.
     */
    limit?: number
  }

  /**
   * Feed upsert
   */
  export type FeedUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: FeedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feed
     */
    omit?: FeedOmit<ExtArgs> | null
    /**
     * The filter to search for the Feed to update in case it exists.
     */
    where: FeedWhereUniqueInput
    /**
     * In case the Feed found by the `where` argument doesn't exist, create a new Feed with this data.
     */
    create: XOR<FeedCreateInput, FeedUncheckedCreateInput>
    /**
     * In case the Feed was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedUpdateInput, FeedUncheckedUpdateInput>
  }

  /**
   * Feed delete
   */
  export type FeedDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: FeedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feed
     */
    omit?: FeedOmit<ExtArgs> | null
    /**
     * Filter which Feed to delete.
     */
    where: FeedWhereUniqueInput
  }

  /**
   * Feed deleteMany
   */
  export type FeedDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feeds to delete
     */
    where?: FeedWhereInput
    /**
     * Limit how many Feeds to delete.
     */
    limit?: number
  }

  /**
   * Feed without action
   */
  export type FeedDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feed
     */
    select?: FeedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feed
     */
    omit?: FeedOmit<ExtArgs> | null
  }


  /**
   * Model Variant
   */

  export type AggregateVariant = {
    _count: VariantCountAggregateOutputType | null
    _avg: VariantAvgAggregateOutputType | null
    _sum: VariantSumAggregateOutputType | null
    _min: VariantMinAggregateOutputType | null
    _max: VariantMaxAggregateOutputType | null
  }

  export type VariantAvgAggregateOutputType = {
    id: number | null
    programId: number | null
    groupId: number | null
    price: Decimal | null
    finalPrice: Decimal | null
    discountPct: number | null
  }

  export type VariantSumAggregateOutputType = {
    id: number | null
    programId: number | null
    groupId: number | null
    price: Decimal | null
    finalPrice: Decimal | null
    discountPct: number | null
  }

  export type VariantMinAggregateOutputType = {
    id: number | null
    programId: number | null
    productId: string | null
    groupId: number | null
    country: string | null
    currency: string | null
    name: string | null
    brand: string | null
    description: string | null
    price: Decimal | null
    finalPrice: Decimal | null
    discountPct: number | null
    isOnSale: boolean | null
    gender: string | null
    category: string | null
    subCategory: string | null
    color: string | null
    size: string | null
    sku: string | null
    url: string | null
    imageUrl: string | null
    inStock: boolean | null
    visibility: string | null
    createdAt: Date | null
    updatedAt: Date | null
    parentSlug: string | null
    variantSlug: string | null
    normalizedName: string | null
    advertiserName: string | null
    region: string | null
  }

  export type VariantMaxAggregateOutputType = {
    id: number | null
    programId: number | null
    productId: string | null
    groupId: number | null
    country: string | null
    currency: string | null
    name: string | null
    brand: string | null
    description: string | null
    price: Decimal | null
    finalPrice: Decimal | null
    discountPct: number | null
    isOnSale: boolean | null
    gender: string | null
    category: string | null
    subCategory: string | null
    color: string | null
    size: string | null
    sku: string | null
    url: string | null
    imageUrl: string | null
    inStock: boolean | null
    visibility: string | null
    createdAt: Date | null
    updatedAt: Date | null
    parentSlug: string | null
    variantSlug: string | null
    normalizedName: string | null
    advertiserName: string | null
    region: string | null
  }

  export type VariantCountAggregateOutputType = {
    id: number
    programId: number
    productId: number
    groupId: number
    country: number
    currency: number
    name: number
    brand: number
    description: number
    price: number
    finalPrice: number
    discountPct: number
    isOnSale: number
    gender: number
    category: number
    subCategory: number
    color: number
    size: number
    sku: number
    url: number
    imageUrl: number
    inStock: number
    visibility: number
    createdAt: number
    updatedAt: number
    parentSlug: number
    variantSlug: number
    normalizedName: number
    advertiserName: number
    region: number
    _all: number
  }


  export type VariantAvgAggregateInputType = {
    id?: true
    programId?: true
    groupId?: true
    price?: true
    finalPrice?: true
    discountPct?: true
  }

  export type VariantSumAggregateInputType = {
    id?: true
    programId?: true
    groupId?: true
    price?: true
    finalPrice?: true
    discountPct?: true
  }

  export type VariantMinAggregateInputType = {
    id?: true
    programId?: true
    productId?: true
    groupId?: true
    country?: true
    currency?: true
    name?: true
    brand?: true
    description?: true
    price?: true
    finalPrice?: true
    discountPct?: true
    isOnSale?: true
    gender?: true
    category?: true
    subCategory?: true
    color?: true
    size?: true
    sku?: true
    url?: true
    imageUrl?: true
    inStock?: true
    visibility?: true
    createdAt?: true
    updatedAt?: true
    parentSlug?: true
    variantSlug?: true
    normalizedName?: true
    advertiserName?: true
    region?: true
  }

  export type VariantMaxAggregateInputType = {
    id?: true
    programId?: true
    productId?: true
    groupId?: true
    country?: true
    currency?: true
    name?: true
    brand?: true
    description?: true
    price?: true
    finalPrice?: true
    discountPct?: true
    isOnSale?: true
    gender?: true
    category?: true
    subCategory?: true
    color?: true
    size?: true
    sku?: true
    url?: true
    imageUrl?: true
    inStock?: true
    visibility?: true
    createdAt?: true
    updatedAt?: true
    parentSlug?: true
    variantSlug?: true
    normalizedName?: true
    advertiserName?: true
    region?: true
  }

  export type VariantCountAggregateInputType = {
    id?: true
    programId?: true
    productId?: true
    groupId?: true
    country?: true
    currency?: true
    name?: true
    brand?: true
    description?: true
    price?: true
    finalPrice?: true
    discountPct?: true
    isOnSale?: true
    gender?: true
    category?: true
    subCategory?: true
    color?: true
    size?: true
    sku?: true
    url?: true
    imageUrl?: true
    inStock?: true
    visibility?: true
    createdAt?: true
    updatedAt?: true
    parentSlug?: true
    variantSlug?: true
    normalizedName?: true
    advertiserName?: true
    region?: true
    _all?: true
  }

  export type VariantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Variant to aggregate.
     */
    where?: VariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Variants to fetch.
     */
    orderBy?: VariantOrderByWithRelationInput | VariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Variants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Variants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Variants
    **/
    _count?: true | VariantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VariantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VariantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VariantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VariantMaxAggregateInputType
  }

  export type GetVariantAggregateType<T extends VariantAggregateArgs> = {
        [P in keyof T & keyof AggregateVariant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVariant[P]>
      : GetScalarType<T[P], AggregateVariant[P]>
  }




  export type VariantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VariantWhereInput
    orderBy?: VariantOrderByWithAggregationInput | VariantOrderByWithAggregationInput[]
    by: VariantScalarFieldEnum[] | VariantScalarFieldEnum
    having?: VariantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VariantCountAggregateInputType | true
    _avg?: VariantAvgAggregateInputType
    _sum?: VariantSumAggregateInputType
    _min?: VariantMinAggregateInputType
    _max?: VariantMaxAggregateInputType
  }

  export type VariantGroupByOutputType = {
    id: number
    programId: number | null
    productId: string
    groupId: number | null
    country: string | null
    currency: string | null
    name: string
    brand: string | null
    description: string | null
    price: Decimal | null
    finalPrice: Decimal | null
    discountPct: number | null
    isOnSale: boolean | null
    gender: string | null
    category: string | null
    subCategory: string | null
    color: string | null
    size: string | null
    sku: string | null
    url: string | null
    imageUrl: string | null
    inStock: boolean | null
    visibility: string | null
    createdAt: Date | null
    updatedAt: Date | null
    parentSlug: string | null
    variantSlug: string | null
    normalizedName: string | null
    advertiserName: string | null
    region: string | null
    _count: VariantCountAggregateOutputType | null
    _avg: VariantAvgAggregateOutputType | null
    _sum: VariantSumAggregateOutputType | null
    _min: VariantMinAggregateOutputType | null
    _max: VariantMaxAggregateOutputType | null
  }

  type GetVariantGroupByPayload<T extends VariantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VariantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VariantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VariantGroupByOutputType[P]>
            : GetScalarType<T[P], VariantGroupByOutputType[P]>
        }
      >
    >


  export type VariantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    programId?: boolean
    productId?: boolean
    groupId?: boolean
    country?: boolean
    currency?: boolean
    name?: boolean
    brand?: boolean
    description?: boolean
    price?: boolean
    finalPrice?: boolean
    discountPct?: boolean
    isOnSale?: boolean
    gender?: boolean
    category?: boolean
    subCategory?: boolean
    color?: boolean
    size?: boolean
    sku?: boolean
    url?: boolean
    imageUrl?: boolean
    inStock?: boolean
    visibility?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parentSlug?: boolean
    variantSlug?: boolean
    normalizedName?: boolean
    advertiserName?: boolean
    region?: boolean
    group?: boolean | Variant$groupArgs<ExtArgs>
    bestFor?: boolean | Variant$bestForArgs<ExtArgs>
  }, ExtArgs["result"]["variant"]>

  export type VariantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    programId?: boolean
    productId?: boolean
    groupId?: boolean
    country?: boolean
    currency?: boolean
    name?: boolean
    brand?: boolean
    description?: boolean
    price?: boolean
    finalPrice?: boolean
    discountPct?: boolean
    isOnSale?: boolean
    gender?: boolean
    category?: boolean
    subCategory?: boolean
    color?: boolean
    size?: boolean
    sku?: boolean
    url?: boolean
    imageUrl?: boolean
    inStock?: boolean
    visibility?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parentSlug?: boolean
    variantSlug?: boolean
    normalizedName?: boolean
    advertiserName?: boolean
    region?: boolean
    group?: boolean | Variant$groupArgs<ExtArgs>
  }, ExtArgs["result"]["variant"]>

  export type VariantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    programId?: boolean
    productId?: boolean
    groupId?: boolean
    country?: boolean
    currency?: boolean
    name?: boolean
    brand?: boolean
    description?: boolean
    price?: boolean
    finalPrice?: boolean
    discountPct?: boolean
    isOnSale?: boolean
    gender?: boolean
    category?: boolean
    subCategory?: boolean
    color?: boolean
    size?: boolean
    sku?: boolean
    url?: boolean
    imageUrl?: boolean
    inStock?: boolean
    visibility?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parentSlug?: boolean
    variantSlug?: boolean
    normalizedName?: boolean
    advertiserName?: boolean
    region?: boolean
    group?: boolean | Variant$groupArgs<ExtArgs>
  }, ExtArgs["result"]["variant"]>

  export type VariantSelectScalar = {
    id?: boolean
    programId?: boolean
    productId?: boolean
    groupId?: boolean
    country?: boolean
    currency?: boolean
    name?: boolean
    brand?: boolean
    description?: boolean
    price?: boolean
    finalPrice?: boolean
    discountPct?: boolean
    isOnSale?: boolean
    gender?: boolean
    category?: boolean
    subCategory?: boolean
    color?: boolean
    size?: boolean
    sku?: boolean
    url?: boolean
    imageUrl?: boolean
    inStock?: boolean
    visibility?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parentSlug?: boolean
    variantSlug?: boolean
    normalizedName?: boolean
    advertiserName?: boolean
    region?: boolean
  }

  export type VariantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "programId" | "productId" | "groupId" | "country" | "currency" | "name" | "brand" | "description" | "price" | "finalPrice" | "discountPct" | "isOnSale" | "gender" | "category" | "subCategory" | "color" | "size" | "sku" | "url" | "imageUrl" | "inStock" | "visibility" | "createdAt" | "updatedAt" | "parentSlug" | "variantSlug" | "normalizedName" | "advertiserName" | "region", ExtArgs["result"]["variant"]>
  export type VariantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | Variant$groupArgs<ExtArgs>
    bestFor?: boolean | Variant$bestForArgs<ExtArgs>
  }
  export type VariantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | Variant$groupArgs<ExtArgs>
  }
  export type VariantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | Variant$groupArgs<ExtArgs>
  }

  export type $VariantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Variant"
    objects: {
      group: Prisma.$ProductPayload<ExtArgs> | null
      bestFor: Prisma.$ProductPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      programId: number | null
      productId: string
      groupId: number | null
      country: string | null
      currency: string | null
      name: string
      brand: string | null
      description: string | null
      price: Prisma.Decimal | null
      finalPrice: Prisma.Decimal | null
      discountPct: number | null
      isOnSale: boolean | null
      gender: string | null
      category: string | null
      subCategory: string | null
      color: string | null
      size: string | null
      sku: string | null
      url: string | null
      imageUrl: string | null
      inStock: boolean | null
      visibility: string | null
      createdAt: Date | null
      updatedAt: Date | null
      parentSlug: string | null
      variantSlug: string | null
      normalizedName: string | null
      advertiserName: string | null
      region: string | null
    }, ExtArgs["result"]["variant"]>
    composites: {}
  }

  type VariantGetPayload<S extends boolean | null | undefined | VariantDefaultArgs> = $Result.GetResult<Prisma.$VariantPayload, S>

  type VariantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VariantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VariantCountAggregateInputType | true
    }

  export interface VariantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Variant'], meta: { name: 'Variant' } }
    /**
     * Find zero or one Variant that matches the filter.
     * @param {VariantFindUniqueArgs} args - Arguments to find a Variant
     * @example
     * // Get one Variant
     * const variant = await prisma.variant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VariantFindUniqueArgs>(args: SelectSubset<T, VariantFindUniqueArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Variant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VariantFindUniqueOrThrowArgs} args - Arguments to find a Variant
     * @example
     * // Get one Variant
     * const variant = await prisma.variant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VariantFindUniqueOrThrowArgs>(args: SelectSubset<T, VariantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Variant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantFindFirstArgs} args - Arguments to find a Variant
     * @example
     * // Get one Variant
     * const variant = await prisma.variant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VariantFindFirstArgs>(args?: SelectSubset<T, VariantFindFirstArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Variant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantFindFirstOrThrowArgs} args - Arguments to find a Variant
     * @example
     * // Get one Variant
     * const variant = await prisma.variant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VariantFindFirstOrThrowArgs>(args?: SelectSubset<T, VariantFindFirstOrThrowArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Variants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Variants
     * const variants = await prisma.variant.findMany()
     * 
     * // Get first 10 Variants
     * const variants = await prisma.variant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const variantWithIdOnly = await prisma.variant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VariantFindManyArgs>(args?: SelectSubset<T, VariantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Variant.
     * @param {VariantCreateArgs} args - Arguments to create a Variant.
     * @example
     * // Create one Variant
     * const Variant = await prisma.variant.create({
     *   data: {
     *     // ... data to create a Variant
     *   }
     * })
     * 
     */
    create<T extends VariantCreateArgs>(args: SelectSubset<T, VariantCreateArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Variants.
     * @param {VariantCreateManyArgs} args - Arguments to create many Variants.
     * @example
     * // Create many Variants
     * const variant = await prisma.variant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VariantCreateManyArgs>(args?: SelectSubset<T, VariantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Variants and returns the data saved in the database.
     * @param {VariantCreateManyAndReturnArgs} args - Arguments to create many Variants.
     * @example
     * // Create many Variants
     * const variant = await prisma.variant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Variants and only return the `id`
     * const variantWithIdOnly = await prisma.variant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VariantCreateManyAndReturnArgs>(args?: SelectSubset<T, VariantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Variant.
     * @param {VariantDeleteArgs} args - Arguments to delete one Variant.
     * @example
     * // Delete one Variant
     * const Variant = await prisma.variant.delete({
     *   where: {
     *     // ... filter to delete one Variant
     *   }
     * })
     * 
     */
    delete<T extends VariantDeleteArgs>(args: SelectSubset<T, VariantDeleteArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Variant.
     * @param {VariantUpdateArgs} args - Arguments to update one Variant.
     * @example
     * // Update one Variant
     * const variant = await prisma.variant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VariantUpdateArgs>(args: SelectSubset<T, VariantUpdateArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Variants.
     * @param {VariantDeleteManyArgs} args - Arguments to filter Variants to delete.
     * @example
     * // Delete a few Variants
     * const { count } = await prisma.variant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VariantDeleteManyArgs>(args?: SelectSubset<T, VariantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Variants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Variants
     * const variant = await prisma.variant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VariantUpdateManyArgs>(args: SelectSubset<T, VariantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Variants and returns the data updated in the database.
     * @param {VariantUpdateManyAndReturnArgs} args - Arguments to update many Variants.
     * @example
     * // Update many Variants
     * const variant = await prisma.variant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Variants and only return the `id`
     * const variantWithIdOnly = await prisma.variant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VariantUpdateManyAndReturnArgs>(args: SelectSubset<T, VariantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Variant.
     * @param {VariantUpsertArgs} args - Arguments to update or create a Variant.
     * @example
     * // Update or create a Variant
     * const variant = await prisma.variant.upsert({
     *   create: {
     *     // ... data to create a Variant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Variant we want to update
     *   }
     * })
     */
    upsert<T extends VariantUpsertArgs>(args: SelectSubset<T, VariantUpsertArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Variants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantCountArgs} args - Arguments to filter Variants to count.
     * @example
     * // Count the number of Variants
     * const count = await prisma.variant.count({
     *   where: {
     *     // ... the filter for the Variants we want to count
     *   }
     * })
    **/
    count<T extends VariantCountArgs>(
      args?: Subset<T, VariantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VariantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Variant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VariantAggregateArgs>(args: Subset<T, VariantAggregateArgs>): Prisma.PrismaPromise<GetVariantAggregateType<T>>

    /**
     * Group by Variant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VariantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VariantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VariantGroupByArgs['orderBy'] }
        : { orderBy?: VariantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VariantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVariantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Variant model
   */
  readonly fields: VariantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Variant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VariantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends Variant$groupArgs<ExtArgs> = {}>(args?: Subset<T, Variant$groupArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    bestFor<T extends Variant$bestForArgs<ExtArgs> = {}>(args?: Subset<T, Variant$bestForArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Variant model
   */
  interface VariantFieldRefs {
    readonly id: FieldRef<"Variant", 'Int'>
    readonly programId: FieldRef<"Variant", 'Int'>
    readonly productId: FieldRef<"Variant", 'String'>
    readonly groupId: FieldRef<"Variant", 'Int'>
    readonly country: FieldRef<"Variant", 'String'>
    readonly currency: FieldRef<"Variant", 'String'>
    readonly name: FieldRef<"Variant", 'String'>
    readonly brand: FieldRef<"Variant", 'String'>
    readonly description: FieldRef<"Variant", 'String'>
    readonly price: FieldRef<"Variant", 'Decimal'>
    readonly finalPrice: FieldRef<"Variant", 'Decimal'>
    readonly discountPct: FieldRef<"Variant", 'Int'>
    readonly isOnSale: FieldRef<"Variant", 'Boolean'>
    readonly gender: FieldRef<"Variant", 'String'>
    readonly category: FieldRef<"Variant", 'String'>
    readonly subCategory: FieldRef<"Variant", 'String'>
    readonly color: FieldRef<"Variant", 'String'>
    readonly size: FieldRef<"Variant", 'String'>
    readonly sku: FieldRef<"Variant", 'String'>
    readonly url: FieldRef<"Variant", 'String'>
    readonly imageUrl: FieldRef<"Variant", 'String'>
    readonly inStock: FieldRef<"Variant", 'Boolean'>
    readonly visibility: FieldRef<"Variant", 'String'>
    readonly createdAt: FieldRef<"Variant", 'DateTime'>
    readonly updatedAt: FieldRef<"Variant", 'DateTime'>
    readonly parentSlug: FieldRef<"Variant", 'String'>
    readonly variantSlug: FieldRef<"Variant", 'String'>
    readonly normalizedName: FieldRef<"Variant", 'String'>
    readonly advertiserName: FieldRef<"Variant", 'String'>
    readonly region: FieldRef<"Variant", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Variant findUnique
   */
  export type VariantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * Filter, which Variant to fetch.
     */
    where: VariantWhereUniqueInput
  }

  /**
   * Variant findUniqueOrThrow
   */
  export type VariantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * Filter, which Variant to fetch.
     */
    where: VariantWhereUniqueInput
  }

  /**
   * Variant findFirst
   */
  export type VariantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * Filter, which Variant to fetch.
     */
    where?: VariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Variants to fetch.
     */
    orderBy?: VariantOrderByWithRelationInput | VariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Variants.
     */
    cursor?: VariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Variants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Variants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Variants.
     */
    distinct?: VariantScalarFieldEnum | VariantScalarFieldEnum[]
  }

  /**
   * Variant findFirstOrThrow
   */
  export type VariantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * Filter, which Variant to fetch.
     */
    where?: VariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Variants to fetch.
     */
    orderBy?: VariantOrderByWithRelationInput | VariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Variants.
     */
    cursor?: VariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Variants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Variants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Variants.
     */
    distinct?: VariantScalarFieldEnum | VariantScalarFieldEnum[]
  }

  /**
   * Variant findMany
   */
  export type VariantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * Filter, which Variants to fetch.
     */
    where?: VariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Variants to fetch.
     */
    orderBy?: VariantOrderByWithRelationInput | VariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Variants.
     */
    cursor?: VariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Variants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Variants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Variants.
     */
    distinct?: VariantScalarFieldEnum | VariantScalarFieldEnum[]
  }

  /**
   * Variant create
   */
  export type VariantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * The data needed to create a Variant.
     */
    data: XOR<VariantCreateInput, VariantUncheckedCreateInput>
  }

  /**
   * Variant createMany
   */
  export type VariantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Variants.
     */
    data: VariantCreateManyInput | VariantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Variant createManyAndReturn
   */
  export type VariantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * The data used to create many Variants.
     */
    data: VariantCreateManyInput | VariantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Variant update
   */
  export type VariantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * The data needed to update a Variant.
     */
    data: XOR<VariantUpdateInput, VariantUncheckedUpdateInput>
    /**
     * Choose, which Variant to update.
     */
    where: VariantWhereUniqueInput
  }

  /**
   * Variant updateMany
   */
  export type VariantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Variants.
     */
    data: XOR<VariantUpdateManyMutationInput, VariantUncheckedUpdateManyInput>
    /**
     * Filter which Variants to update
     */
    where?: VariantWhereInput
    /**
     * Limit how many Variants to update.
     */
    limit?: number
  }

  /**
   * Variant updateManyAndReturn
   */
  export type VariantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * The data used to update Variants.
     */
    data: XOR<VariantUpdateManyMutationInput, VariantUncheckedUpdateManyInput>
    /**
     * Filter which Variants to update
     */
    where?: VariantWhereInput
    /**
     * Limit how many Variants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Variant upsert
   */
  export type VariantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * The filter to search for the Variant to update in case it exists.
     */
    where: VariantWhereUniqueInput
    /**
     * In case the Variant found by the `where` argument doesn't exist, create a new Variant with this data.
     */
    create: XOR<VariantCreateInput, VariantUncheckedCreateInput>
    /**
     * In case the Variant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VariantUpdateInput, VariantUncheckedUpdateInput>
  }

  /**
   * Variant delete
   */
  export type VariantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    /**
     * Filter which Variant to delete.
     */
    where: VariantWhereUniqueInput
  }

  /**
   * Variant deleteMany
   */
  export type VariantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Variants to delete
     */
    where?: VariantWhereInput
    /**
     * Limit how many Variants to delete.
     */
    limit?: number
  }

  /**
   * Variant.group
   */
  export type Variant$groupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
  }

  /**
   * Variant.bestFor
   */
  export type Variant$bestForArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
  }

  /**
   * Variant without action
   */
  export type VariantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    id: number | null
    bestVariantId: number | null
    bestPrice: Decimal | null
    discountPct: number | null
  }

  export type ProductSumAggregateOutputType = {
    id: number | null
    bestVariantId: number | null
    bestPrice: Decimal | null
    discountPct: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: number | null
    slug: string | null
    name: string | null
    normalizedName: string | null
    brand: string | null
    gender: string | null
    category: string | null
    subCategory: string | null
    country: string | null
    region: string | null
    bestVariantId: number | null
    bestPrice: Decimal | null
    imageUrl: string | null
    url: string | null
    inStock: boolean | null
    isOnSale: boolean | null
    discountPct: number | null
    visibility: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: number | null
    slug: string | null
    name: string | null
    normalizedName: string | null
    brand: string | null
    gender: string | null
    category: string | null
    subCategory: string | null
    country: string | null
    region: string | null
    bestVariantId: number | null
    bestPrice: Decimal | null
    imageUrl: string | null
    url: string | null
    inStock: boolean | null
    isOnSale: boolean | null
    discountPct: number | null
    visibility: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    slug: number
    name: number
    normalizedName: number
    brand: number
    gender: number
    category: number
    subCategory: number
    country: number
    region: number
    bestVariantId: number
    bestPrice: number
    imageUrl: number
    url: number
    inStock: number
    isOnSale: number
    discountPct: number
    visibility: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    id?: true
    bestVariantId?: true
    bestPrice?: true
    discountPct?: true
  }

  export type ProductSumAggregateInputType = {
    id?: true
    bestVariantId?: true
    bestPrice?: true
    discountPct?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    normalizedName?: true
    brand?: true
    gender?: true
    category?: true
    subCategory?: true
    country?: true
    region?: true
    bestVariantId?: true
    bestPrice?: true
    imageUrl?: true
    url?: true
    inStock?: true
    isOnSale?: true
    discountPct?: true
    visibility?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    normalizedName?: true
    brand?: true
    gender?: true
    category?: true
    subCategory?: true
    country?: true
    region?: true
    bestVariantId?: true
    bestPrice?: true
    imageUrl?: true
    url?: true
    inStock?: true
    isOnSale?: true
    discountPct?: true
    visibility?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    normalizedName?: true
    brand?: true
    gender?: true
    category?: true
    subCategory?: true
    country?: true
    region?: true
    bestVariantId?: true
    bestPrice?: true
    imageUrl?: true
    url?: true
    inStock?: true
    isOnSale?: true
    discountPct?: true
    visibility?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: number
    slug: string
    name: string
    normalizedName: string | null
    brand: string | null
    gender: string | null
    category: string | null
    subCategory: string | null
    country: string | null
    region: string | null
    bestVariantId: number | null
    bestPrice: Decimal | null
    imageUrl: string | null
    url: string | null
    inStock: boolean | null
    isOnSale: boolean | null
    discountPct: number | null
    visibility: string | null
    createdAt: Date | null
    updatedAt: Date | null
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    normalizedName?: boolean
    brand?: boolean
    gender?: boolean
    category?: boolean
    subCategory?: boolean
    country?: boolean
    region?: boolean
    bestVariantId?: boolean
    bestPrice?: boolean
    imageUrl?: boolean
    url?: boolean
    inStock?: boolean
    isOnSale?: boolean
    discountPct?: boolean
    visibility?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    variants?: boolean | Product$variantsArgs<ExtArgs>
    bestVariant?: boolean | Product$bestVariantArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    normalizedName?: boolean
    brand?: boolean
    gender?: boolean
    category?: boolean
    subCategory?: boolean
    country?: boolean
    region?: boolean
    bestVariantId?: boolean
    bestPrice?: boolean
    imageUrl?: boolean
    url?: boolean
    inStock?: boolean
    isOnSale?: boolean
    discountPct?: boolean
    visibility?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bestVariant?: boolean | Product$bestVariantArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    normalizedName?: boolean
    brand?: boolean
    gender?: boolean
    category?: boolean
    subCategory?: boolean
    country?: boolean
    region?: boolean
    bestVariantId?: boolean
    bestPrice?: boolean
    imageUrl?: boolean
    url?: boolean
    inStock?: boolean
    isOnSale?: boolean
    discountPct?: boolean
    visibility?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bestVariant?: boolean | Product$bestVariantArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    slug?: boolean
    name?: boolean
    normalizedName?: boolean
    brand?: boolean
    gender?: boolean
    category?: boolean
    subCategory?: boolean
    country?: boolean
    region?: boolean
    bestVariantId?: boolean
    bestPrice?: boolean
    imageUrl?: boolean
    url?: boolean
    inStock?: boolean
    isOnSale?: boolean
    discountPct?: boolean
    visibility?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "name" | "normalizedName" | "brand" | "gender" | "category" | "subCategory" | "country" | "region" | "bestVariantId" | "bestPrice" | "imageUrl" | "url" | "inStock" | "isOnSale" | "discountPct" | "visibility" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    variants?: boolean | Product$variantsArgs<ExtArgs>
    bestVariant?: boolean | Product$bestVariantArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bestVariant?: boolean | Product$bestVariantArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bestVariant?: boolean | Product$bestVariantArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      variants: Prisma.$VariantPayload<ExtArgs>[]
      bestVariant: Prisma.$VariantPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug: string
      name: string
      normalizedName: string | null
      brand: string | null
      gender: string | null
      category: string | null
      subCategory: string | null
      country: string | null
      region: string | null
      bestVariantId: number | null
      bestPrice: Prisma.Decimal | null
      imageUrl: string | null
      url: string | null
      inStock: boolean | null
      isOnSale: boolean | null
      discountPct: number | null
      visibility: string | null
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    variants<T extends Product$variantsArgs<ExtArgs> = {}>(args?: Subset<T, Product$variantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bestVariant<T extends Product$bestVariantArgs<ExtArgs> = {}>(args?: Subset<T, Product$bestVariantArgs<ExtArgs>>): Prisma__VariantClient<$Result.GetResult<Prisma.$VariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'Int'>
    readonly slug: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly normalizedName: FieldRef<"Product", 'String'>
    readonly brand: FieldRef<"Product", 'String'>
    readonly gender: FieldRef<"Product", 'String'>
    readonly category: FieldRef<"Product", 'String'>
    readonly subCategory: FieldRef<"Product", 'String'>
    readonly country: FieldRef<"Product", 'String'>
    readonly region: FieldRef<"Product", 'String'>
    readonly bestVariantId: FieldRef<"Product", 'Int'>
    readonly bestPrice: FieldRef<"Product", 'Decimal'>
    readonly imageUrl: FieldRef<"Product", 'String'>
    readonly url: FieldRef<"Product", 'String'>
    readonly inStock: FieldRef<"Product", 'Boolean'>
    readonly isOnSale: FieldRef<"Product", 'Boolean'>
    readonly discountPct: FieldRef<"Product", 'Int'>
    readonly visibility: FieldRef<"Product", 'String'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.variants
   */
  export type Product$variantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    where?: VariantWhereInput
    orderBy?: VariantOrderByWithRelationInput | VariantOrderByWithRelationInput[]
    cursor?: VariantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VariantScalarFieldEnum | VariantScalarFieldEnum[]
  }

  /**
   * Product.bestVariant
   */
  export type Product$bestVariantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variant
     */
    select?: VariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Variant
     */
    omit?: VariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VariantInclude<ExtArgs> | null
    where?: VariantWhereInput
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model Promotion
   */

  export type AggregatePromotion = {
    _count: PromotionCountAggregateOutputType | null
    _avg: PromotionAvgAggregateOutputType | null
    _sum: PromotionSumAggregateOutputType | null
    _min: PromotionMinAggregateOutputType | null
    _max: PromotionMaxAggregateOutputType | null
  }

  export type PromotionAvgAggregateOutputType = {
    id: number | null
    advertiserId: number | null
    discountPercent: Decimal | null
    discountAmount: Decimal | null
    minimumPurchase: Decimal | null
  }

  export type PromotionSumAggregateOutputType = {
    id: number | null
    advertiserId: number | null
    discountPercent: Decimal | null
    discountAmount: Decimal | null
    minimumPurchase: Decimal | null
  }

  export type PromotionMinAggregateOutputType = {
    id: number | null
    advertiserId: number | null
    title: string | null
    description: string | null
    couponCode: string | null
    discountPercent: Decimal | null
    discountAmount: Decimal | null
    minimumPurchase: Decimal | null
    terms: string | null
    url: string | null
    startDate: Date | null
    endDate: Date | null
    isActive: boolean | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PromotionMaxAggregateOutputType = {
    id: number | null
    advertiserId: number | null
    title: string | null
    description: string | null
    couponCode: string | null
    discountPercent: Decimal | null
    discountAmount: Decimal | null
    minimumPurchase: Decimal | null
    terms: string | null
    url: string | null
    startDate: Date | null
    endDate: Date | null
    isActive: boolean | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PromotionCountAggregateOutputType = {
    id: number
    advertiserId: number
    title: number
    description: number
    couponCode: number
    discountPercent: number
    discountAmount: number
    minimumPurchase: number
    terms: number
    url: number
    startDate: number
    endDate: number
    isActive: number
    isVerified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PromotionAvgAggregateInputType = {
    id?: true
    advertiserId?: true
    discountPercent?: true
    discountAmount?: true
    minimumPurchase?: true
  }

  export type PromotionSumAggregateInputType = {
    id?: true
    advertiserId?: true
    discountPercent?: true
    discountAmount?: true
    minimumPurchase?: true
  }

  export type PromotionMinAggregateInputType = {
    id?: true
    advertiserId?: true
    title?: true
    description?: true
    couponCode?: true
    discountPercent?: true
    discountAmount?: true
    minimumPurchase?: true
    terms?: true
    url?: true
    startDate?: true
    endDate?: true
    isActive?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PromotionMaxAggregateInputType = {
    id?: true
    advertiserId?: true
    title?: true
    description?: true
    couponCode?: true
    discountPercent?: true
    discountAmount?: true
    minimumPurchase?: true
    terms?: true
    url?: true
    startDate?: true
    endDate?: true
    isActive?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PromotionCountAggregateInputType = {
    id?: true
    advertiserId?: true
    title?: true
    description?: true
    couponCode?: true
    discountPercent?: true
    discountAmount?: true
    minimumPurchase?: true
    terms?: true
    url?: true
    startDate?: true
    endDate?: true
    isActive?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PromotionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Promotion to aggregate.
     */
    where?: PromotionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promotions to fetch.
     */
    orderBy?: PromotionOrderByWithRelationInput | PromotionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PromotionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promotions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Promotions
    **/
    _count?: true | PromotionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PromotionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PromotionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PromotionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PromotionMaxAggregateInputType
  }

  export type GetPromotionAggregateType<T extends PromotionAggregateArgs> = {
        [P in keyof T & keyof AggregatePromotion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePromotion[P]>
      : GetScalarType<T[P], AggregatePromotion[P]>
  }




  export type PromotionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromotionWhereInput
    orderBy?: PromotionOrderByWithAggregationInput | PromotionOrderByWithAggregationInput[]
    by: PromotionScalarFieldEnum[] | PromotionScalarFieldEnum
    having?: PromotionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PromotionCountAggregateInputType | true
    _avg?: PromotionAvgAggregateInputType
    _sum?: PromotionSumAggregateInputType
    _min?: PromotionMinAggregateInputType
    _max?: PromotionMaxAggregateInputType
  }

  export type PromotionGroupByOutputType = {
    id: number
    advertiserId: number | null
    title: string
    description: string | null
    couponCode: string | null
    discountPercent: Decimal | null
    discountAmount: Decimal | null
    minimumPurchase: Decimal | null
    terms: string | null
    url: string | null
    startDate: Date | null
    endDate: Date | null
    isActive: boolean | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    _count: PromotionCountAggregateOutputType | null
    _avg: PromotionAvgAggregateOutputType | null
    _sum: PromotionSumAggregateOutputType | null
    _min: PromotionMinAggregateOutputType | null
    _max: PromotionMaxAggregateOutputType | null
  }

  type GetPromotionGroupByPayload<T extends PromotionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PromotionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PromotionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PromotionGroupByOutputType[P]>
            : GetScalarType<T[P], PromotionGroupByOutputType[P]>
        }
      >
    >


  export type PromotionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    advertiserId?: boolean
    title?: boolean
    description?: boolean
    couponCode?: boolean
    discountPercent?: boolean
    discountAmount?: boolean
    minimumPurchase?: boolean
    terms?: boolean
    url?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    advertiser?: boolean | Promotion$advertiserArgs<ExtArgs>
  }, ExtArgs["result"]["promotion"]>

  export type PromotionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    advertiserId?: boolean
    title?: boolean
    description?: boolean
    couponCode?: boolean
    discountPercent?: boolean
    discountAmount?: boolean
    minimumPurchase?: boolean
    terms?: boolean
    url?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    advertiser?: boolean | Promotion$advertiserArgs<ExtArgs>
  }, ExtArgs["result"]["promotion"]>

  export type PromotionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    advertiserId?: boolean
    title?: boolean
    description?: boolean
    couponCode?: boolean
    discountPercent?: boolean
    discountAmount?: boolean
    minimumPurchase?: boolean
    terms?: boolean
    url?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    advertiser?: boolean | Promotion$advertiserArgs<ExtArgs>
  }, ExtArgs["result"]["promotion"]>

  export type PromotionSelectScalar = {
    id?: boolean
    advertiserId?: boolean
    title?: boolean
    description?: boolean
    couponCode?: boolean
    discountPercent?: boolean
    discountAmount?: boolean
    minimumPurchase?: boolean
    terms?: boolean
    url?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PromotionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "advertiserId" | "title" | "description" | "couponCode" | "discountPercent" | "discountAmount" | "minimumPurchase" | "terms" | "url" | "startDate" | "endDate" | "isActive" | "isVerified" | "createdAt" | "updatedAt", ExtArgs["result"]["promotion"]>
  export type PromotionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    advertiser?: boolean | Promotion$advertiserArgs<ExtArgs>
  }
  export type PromotionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    advertiser?: boolean | Promotion$advertiserArgs<ExtArgs>
  }
  export type PromotionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    advertiser?: boolean | Promotion$advertiserArgs<ExtArgs>
  }

  export type $PromotionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Promotion"
    objects: {
      advertiser: Prisma.$AdvertiserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      advertiserId: number | null
      title: string
      description: string | null
      couponCode: string | null
      discountPercent: Prisma.Decimal | null
      discountAmount: Prisma.Decimal | null
      minimumPurchase: Prisma.Decimal | null
      terms: string | null
      url: string | null
      startDate: Date | null
      endDate: Date | null
      isActive: boolean | null
      isVerified: boolean | null
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["promotion"]>
    composites: {}
  }

  type PromotionGetPayload<S extends boolean | null | undefined | PromotionDefaultArgs> = $Result.GetResult<Prisma.$PromotionPayload, S>

  type PromotionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PromotionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PromotionCountAggregateInputType | true
    }

  export interface PromotionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Promotion'], meta: { name: 'Promotion' } }
    /**
     * Find zero or one Promotion that matches the filter.
     * @param {PromotionFindUniqueArgs} args - Arguments to find a Promotion
     * @example
     * // Get one Promotion
     * const promotion = await prisma.promotion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PromotionFindUniqueArgs>(args: SelectSubset<T, PromotionFindUniqueArgs<ExtArgs>>): Prisma__PromotionClient<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Promotion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PromotionFindUniqueOrThrowArgs} args - Arguments to find a Promotion
     * @example
     * // Get one Promotion
     * const promotion = await prisma.promotion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PromotionFindUniqueOrThrowArgs>(args: SelectSubset<T, PromotionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PromotionClient<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Promotion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionFindFirstArgs} args - Arguments to find a Promotion
     * @example
     * // Get one Promotion
     * const promotion = await prisma.promotion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PromotionFindFirstArgs>(args?: SelectSubset<T, PromotionFindFirstArgs<ExtArgs>>): Prisma__PromotionClient<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Promotion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionFindFirstOrThrowArgs} args - Arguments to find a Promotion
     * @example
     * // Get one Promotion
     * const promotion = await prisma.promotion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PromotionFindFirstOrThrowArgs>(args?: SelectSubset<T, PromotionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PromotionClient<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Promotions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Promotions
     * const promotions = await prisma.promotion.findMany()
     * 
     * // Get first 10 Promotions
     * const promotions = await prisma.promotion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const promotionWithIdOnly = await prisma.promotion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PromotionFindManyArgs>(args?: SelectSubset<T, PromotionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Promotion.
     * @param {PromotionCreateArgs} args - Arguments to create a Promotion.
     * @example
     * // Create one Promotion
     * const Promotion = await prisma.promotion.create({
     *   data: {
     *     // ... data to create a Promotion
     *   }
     * })
     * 
     */
    create<T extends PromotionCreateArgs>(args: SelectSubset<T, PromotionCreateArgs<ExtArgs>>): Prisma__PromotionClient<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Promotions.
     * @param {PromotionCreateManyArgs} args - Arguments to create many Promotions.
     * @example
     * // Create many Promotions
     * const promotion = await prisma.promotion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PromotionCreateManyArgs>(args?: SelectSubset<T, PromotionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Promotions and returns the data saved in the database.
     * @param {PromotionCreateManyAndReturnArgs} args - Arguments to create many Promotions.
     * @example
     * // Create many Promotions
     * const promotion = await prisma.promotion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Promotions and only return the `id`
     * const promotionWithIdOnly = await prisma.promotion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PromotionCreateManyAndReturnArgs>(args?: SelectSubset<T, PromotionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Promotion.
     * @param {PromotionDeleteArgs} args - Arguments to delete one Promotion.
     * @example
     * // Delete one Promotion
     * const Promotion = await prisma.promotion.delete({
     *   where: {
     *     // ... filter to delete one Promotion
     *   }
     * })
     * 
     */
    delete<T extends PromotionDeleteArgs>(args: SelectSubset<T, PromotionDeleteArgs<ExtArgs>>): Prisma__PromotionClient<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Promotion.
     * @param {PromotionUpdateArgs} args - Arguments to update one Promotion.
     * @example
     * // Update one Promotion
     * const promotion = await prisma.promotion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PromotionUpdateArgs>(args: SelectSubset<T, PromotionUpdateArgs<ExtArgs>>): Prisma__PromotionClient<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Promotions.
     * @param {PromotionDeleteManyArgs} args - Arguments to filter Promotions to delete.
     * @example
     * // Delete a few Promotions
     * const { count } = await prisma.promotion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PromotionDeleteManyArgs>(args?: SelectSubset<T, PromotionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Promotions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Promotions
     * const promotion = await prisma.promotion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PromotionUpdateManyArgs>(args: SelectSubset<T, PromotionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Promotions and returns the data updated in the database.
     * @param {PromotionUpdateManyAndReturnArgs} args - Arguments to update many Promotions.
     * @example
     * // Update many Promotions
     * const promotion = await prisma.promotion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Promotions and only return the `id`
     * const promotionWithIdOnly = await prisma.promotion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PromotionUpdateManyAndReturnArgs>(args: SelectSubset<T, PromotionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Promotion.
     * @param {PromotionUpsertArgs} args - Arguments to update or create a Promotion.
     * @example
     * // Update or create a Promotion
     * const promotion = await prisma.promotion.upsert({
     *   create: {
     *     // ... data to create a Promotion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Promotion we want to update
     *   }
     * })
     */
    upsert<T extends PromotionUpsertArgs>(args: SelectSubset<T, PromotionUpsertArgs<ExtArgs>>): Prisma__PromotionClient<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Promotions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionCountArgs} args - Arguments to filter Promotions to count.
     * @example
     * // Count the number of Promotions
     * const count = await prisma.promotion.count({
     *   where: {
     *     // ... the filter for the Promotions we want to count
     *   }
     * })
    **/
    count<T extends PromotionCountArgs>(
      args?: Subset<T, PromotionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PromotionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Promotion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PromotionAggregateArgs>(args: Subset<T, PromotionAggregateArgs>): Prisma.PrismaPromise<GetPromotionAggregateType<T>>

    /**
     * Group by Promotion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PromotionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PromotionGroupByArgs['orderBy'] }
        : { orderBy?: PromotionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PromotionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromotionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Promotion model
   */
  readonly fields: PromotionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Promotion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PromotionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    advertiser<T extends Promotion$advertiserArgs<ExtArgs> = {}>(args?: Subset<T, Promotion$advertiserArgs<ExtArgs>>): Prisma__AdvertiserClient<$Result.GetResult<Prisma.$AdvertiserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Promotion model
   */
  interface PromotionFieldRefs {
    readonly id: FieldRef<"Promotion", 'Int'>
    readonly advertiserId: FieldRef<"Promotion", 'Int'>
    readonly title: FieldRef<"Promotion", 'String'>
    readonly description: FieldRef<"Promotion", 'String'>
    readonly couponCode: FieldRef<"Promotion", 'String'>
    readonly discountPercent: FieldRef<"Promotion", 'Decimal'>
    readonly discountAmount: FieldRef<"Promotion", 'Decimal'>
    readonly minimumPurchase: FieldRef<"Promotion", 'Decimal'>
    readonly terms: FieldRef<"Promotion", 'String'>
    readonly url: FieldRef<"Promotion", 'String'>
    readonly startDate: FieldRef<"Promotion", 'DateTime'>
    readonly endDate: FieldRef<"Promotion", 'DateTime'>
    readonly isActive: FieldRef<"Promotion", 'Boolean'>
    readonly isVerified: FieldRef<"Promotion", 'Boolean'>
    readonly createdAt: FieldRef<"Promotion", 'DateTime'>
    readonly updatedAt: FieldRef<"Promotion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Promotion findUnique
   */
  export type PromotionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotion
     */
    omit?: PromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
    /**
     * Filter, which Promotion to fetch.
     */
    where: PromotionWhereUniqueInput
  }

  /**
   * Promotion findUniqueOrThrow
   */
  export type PromotionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotion
     */
    omit?: PromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
    /**
     * Filter, which Promotion to fetch.
     */
    where: PromotionWhereUniqueInput
  }

  /**
   * Promotion findFirst
   */
  export type PromotionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotion
     */
    omit?: PromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
    /**
     * Filter, which Promotion to fetch.
     */
    where?: PromotionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promotions to fetch.
     */
    orderBy?: PromotionOrderByWithRelationInput | PromotionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Promotions.
     */
    cursor?: PromotionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promotions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Promotions.
     */
    distinct?: PromotionScalarFieldEnum | PromotionScalarFieldEnum[]
  }

  /**
   * Promotion findFirstOrThrow
   */
  export type PromotionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotion
     */
    omit?: PromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
    /**
     * Filter, which Promotion to fetch.
     */
    where?: PromotionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promotions to fetch.
     */
    orderBy?: PromotionOrderByWithRelationInput | PromotionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Promotions.
     */
    cursor?: PromotionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promotions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Promotions.
     */
    distinct?: PromotionScalarFieldEnum | PromotionScalarFieldEnum[]
  }

  /**
   * Promotion findMany
   */
  export type PromotionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotion
     */
    omit?: PromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
    /**
     * Filter, which Promotions to fetch.
     */
    where?: PromotionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promotions to fetch.
     */
    orderBy?: PromotionOrderByWithRelationInput | PromotionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Promotions.
     */
    cursor?: PromotionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promotions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Promotions.
     */
    distinct?: PromotionScalarFieldEnum | PromotionScalarFieldEnum[]
  }

  /**
   * Promotion create
   */
  export type PromotionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotion
     */
    omit?: PromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
    /**
     * The data needed to create a Promotion.
     */
    data: XOR<PromotionCreateInput, PromotionUncheckedCreateInput>
  }

  /**
   * Promotion createMany
   */
  export type PromotionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Promotions.
     */
    data: PromotionCreateManyInput | PromotionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Promotion createManyAndReturn
   */
  export type PromotionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Promotion
     */
    omit?: PromotionOmit<ExtArgs> | null
    /**
     * The data used to create many Promotions.
     */
    data: PromotionCreateManyInput | PromotionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Promotion update
   */
  export type PromotionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotion
     */
    omit?: PromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
    /**
     * The data needed to update a Promotion.
     */
    data: XOR<PromotionUpdateInput, PromotionUncheckedUpdateInput>
    /**
     * Choose, which Promotion to update.
     */
    where: PromotionWhereUniqueInput
  }

  /**
   * Promotion updateMany
   */
  export type PromotionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Promotions.
     */
    data: XOR<PromotionUpdateManyMutationInput, PromotionUncheckedUpdateManyInput>
    /**
     * Filter which Promotions to update
     */
    where?: PromotionWhereInput
    /**
     * Limit how many Promotions to update.
     */
    limit?: number
  }

  /**
   * Promotion updateManyAndReturn
   */
  export type PromotionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Promotion
     */
    omit?: PromotionOmit<ExtArgs> | null
    /**
     * The data used to update Promotions.
     */
    data: XOR<PromotionUpdateManyMutationInput, PromotionUncheckedUpdateManyInput>
    /**
     * Filter which Promotions to update
     */
    where?: PromotionWhereInput
    /**
     * Limit how many Promotions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Promotion upsert
   */
  export type PromotionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotion
     */
    omit?: PromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
    /**
     * The filter to search for the Promotion to update in case it exists.
     */
    where: PromotionWhereUniqueInput
    /**
     * In case the Promotion found by the `where` argument doesn't exist, create a new Promotion with this data.
     */
    create: XOR<PromotionCreateInput, PromotionUncheckedCreateInput>
    /**
     * In case the Promotion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PromotionUpdateInput, PromotionUncheckedUpdateInput>
  }

  /**
   * Promotion delete
   */
  export type PromotionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotion
     */
    omit?: PromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
    /**
     * Filter which Promotion to delete.
     */
    where: PromotionWhereUniqueInput
  }

  /**
   * Promotion deleteMany
   */
  export type PromotionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Promotions to delete
     */
    where?: PromotionWhereInput
    /**
     * Limit how many Promotions to delete.
     */
    limit?: number
  }

  /**
   * Promotion.advertiser
   */
  export type Promotion$advertiserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Advertiser
     */
    select?: AdvertiserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Advertiser
     */
    omit?: AdvertiserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdvertiserInclude<ExtArgs> | null
    where?: AdvertiserWhereInput
  }

  /**
   * Promotion without action
   */
  export type PromotionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Promotion
     */
    omit?: PromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
  }


  /**
   * Model SyncLog
   */

  export type AggregateSyncLog = {
    _count: SyncLogCountAggregateOutputType | null
    _avg: SyncLogAvgAggregateOutputType | null
    _sum: SyncLogSumAggregateOutputType | null
    _min: SyncLogMinAggregateOutputType | null
    _max: SyncLogMaxAggregateOutputType | null
  }

  export type SyncLogAvgAggregateOutputType = {
    id: number | null
    durationMs: number | null
    feedsSynced: number | null
    totalImported: number | null
    staleHidden: number | null
  }

  export type SyncLogSumAggregateOutputType = {
    id: number | null
    durationMs: number | null
    feedsSynced: number | null
    totalImported: number | null
    staleHidden: number | null
  }

  export type SyncLogMinAggregateOutputType = {
    id: number | null
    runId: string | null
    startedAt: Date | null
    completedAt: Date | null
    durationMs: number | null
    feedsSynced: number | null
    totalImported: number | null
    staleHidden: number | null
  }

  export type SyncLogMaxAggregateOutputType = {
    id: number | null
    runId: string | null
    startedAt: Date | null
    completedAt: Date | null
    durationMs: number | null
    feedsSynced: number | null
    totalImported: number | null
    staleHidden: number | null
  }

  export type SyncLogCountAggregateOutputType = {
    id: number
    runId: number
    startedAt: number
    completedAt: number
    durationMs: number
    feedsSynced: number
    totalImported: number
    staleHidden: number
    errors: number
    results: number
    _all: number
  }


  export type SyncLogAvgAggregateInputType = {
    id?: true
    durationMs?: true
    feedsSynced?: true
    totalImported?: true
    staleHidden?: true
  }

  export type SyncLogSumAggregateInputType = {
    id?: true
    durationMs?: true
    feedsSynced?: true
    totalImported?: true
    staleHidden?: true
  }

  export type SyncLogMinAggregateInputType = {
    id?: true
    runId?: true
    startedAt?: true
    completedAt?: true
    durationMs?: true
    feedsSynced?: true
    totalImported?: true
    staleHidden?: true
  }

  export type SyncLogMaxAggregateInputType = {
    id?: true
    runId?: true
    startedAt?: true
    completedAt?: true
    durationMs?: true
    feedsSynced?: true
    totalImported?: true
    staleHidden?: true
  }

  export type SyncLogCountAggregateInputType = {
    id?: true
    runId?: true
    startedAt?: true
    completedAt?: true
    durationMs?: true
    feedsSynced?: true
    totalImported?: true
    staleHidden?: true
    errors?: true
    results?: true
    _all?: true
  }

  export type SyncLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncLog to aggregate.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SyncLogs
    **/
    _count?: true | SyncLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SyncLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SyncLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SyncLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SyncLogMaxAggregateInputType
  }

  export type GetSyncLogAggregateType<T extends SyncLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSyncLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSyncLog[P]>
      : GetScalarType<T[P], AggregateSyncLog[P]>
  }




  export type SyncLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncLogWhereInput
    orderBy?: SyncLogOrderByWithAggregationInput | SyncLogOrderByWithAggregationInput[]
    by: SyncLogScalarFieldEnum[] | SyncLogScalarFieldEnum
    having?: SyncLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SyncLogCountAggregateInputType | true
    _avg?: SyncLogAvgAggregateInputType
    _sum?: SyncLogSumAggregateInputType
    _min?: SyncLogMinAggregateInputType
    _max?: SyncLogMaxAggregateInputType
  }

  export type SyncLogGroupByOutputType = {
    id: number
    runId: string
    startedAt: Date
    completedAt: Date
    durationMs: number
    feedsSynced: number
    totalImported: number
    staleHidden: number
    errors: JsonValue | null
    results: JsonValue | null
    _count: SyncLogCountAggregateOutputType | null
    _avg: SyncLogAvgAggregateOutputType | null
    _sum: SyncLogSumAggregateOutputType | null
    _min: SyncLogMinAggregateOutputType | null
    _max: SyncLogMaxAggregateOutputType | null
  }

  type GetSyncLogGroupByPayload<T extends SyncLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SyncLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SyncLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SyncLogGroupByOutputType[P]>
            : GetScalarType<T[P], SyncLogGroupByOutputType[P]>
        }
      >
    >


  export type SyncLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    startedAt?: boolean
    completedAt?: boolean
    durationMs?: boolean
    feedsSynced?: boolean
    totalImported?: boolean
    staleHidden?: boolean
    errors?: boolean
    results?: boolean
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    startedAt?: boolean
    completedAt?: boolean
    durationMs?: boolean
    feedsSynced?: boolean
    totalImported?: boolean
    staleHidden?: boolean
    errors?: boolean
    results?: boolean
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    startedAt?: boolean
    completedAt?: boolean
    durationMs?: boolean
    feedsSynced?: boolean
    totalImported?: boolean
    staleHidden?: boolean
    errors?: boolean
    results?: boolean
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectScalar = {
    id?: boolean
    runId?: boolean
    startedAt?: boolean
    completedAt?: boolean
    durationMs?: boolean
    feedsSynced?: boolean
    totalImported?: boolean
    staleHidden?: boolean
    errors?: boolean
    results?: boolean
  }

  export type SyncLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "runId" | "startedAt" | "completedAt" | "durationMs" | "feedsSynced" | "totalImported" | "staleHidden" | "errors" | "results", ExtArgs["result"]["syncLog"]>

  export type $SyncLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SyncLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      runId: string
      startedAt: Date
      completedAt: Date
      durationMs: number
      feedsSynced: number
      totalImported: number
      staleHidden: number
      errors: Prisma.JsonValue | null
      results: Prisma.JsonValue | null
    }, ExtArgs["result"]["syncLog"]>
    composites: {}
  }

  type SyncLogGetPayload<S extends boolean | null | undefined | SyncLogDefaultArgs> = $Result.GetResult<Prisma.$SyncLogPayload, S>

  type SyncLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SyncLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SyncLogCountAggregateInputType | true
    }

  export interface SyncLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SyncLog'], meta: { name: 'SyncLog' } }
    /**
     * Find zero or one SyncLog that matches the filter.
     * @param {SyncLogFindUniqueArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SyncLogFindUniqueArgs>(args: SelectSubset<T, SyncLogFindUniqueArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SyncLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SyncLogFindUniqueOrThrowArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SyncLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SyncLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindFirstArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SyncLogFindFirstArgs>(args?: SelectSubset<T, SyncLogFindFirstArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindFirstOrThrowArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SyncLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SyncLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SyncLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SyncLogs
     * const syncLogs = await prisma.syncLog.findMany()
     * 
     * // Get first 10 SyncLogs
     * const syncLogs = await prisma.syncLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SyncLogFindManyArgs>(args?: SelectSubset<T, SyncLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SyncLog.
     * @param {SyncLogCreateArgs} args - Arguments to create a SyncLog.
     * @example
     * // Create one SyncLog
     * const SyncLog = await prisma.syncLog.create({
     *   data: {
     *     // ... data to create a SyncLog
     *   }
     * })
     * 
     */
    create<T extends SyncLogCreateArgs>(args: SelectSubset<T, SyncLogCreateArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SyncLogs.
     * @param {SyncLogCreateManyArgs} args - Arguments to create many SyncLogs.
     * @example
     * // Create many SyncLogs
     * const syncLog = await prisma.syncLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SyncLogCreateManyArgs>(args?: SelectSubset<T, SyncLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SyncLogs and returns the data saved in the database.
     * @param {SyncLogCreateManyAndReturnArgs} args - Arguments to create many SyncLogs.
     * @example
     * // Create many SyncLogs
     * const syncLog = await prisma.syncLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SyncLogs and only return the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SyncLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SyncLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SyncLog.
     * @param {SyncLogDeleteArgs} args - Arguments to delete one SyncLog.
     * @example
     * // Delete one SyncLog
     * const SyncLog = await prisma.syncLog.delete({
     *   where: {
     *     // ... filter to delete one SyncLog
     *   }
     * })
     * 
     */
    delete<T extends SyncLogDeleteArgs>(args: SelectSubset<T, SyncLogDeleteArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SyncLog.
     * @param {SyncLogUpdateArgs} args - Arguments to update one SyncLog.
     * @example
     * // Update one SyncLog
     * const syncLog = await prisma.syncLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SyncLogUpdateArgs>(args: SelectSubset<T, SyncLogUpdateArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SyncLogs.
     * @param {SyncLogDeleteManyArgs} args - Arguments to filter SyncLogs to delete.
     * @example
     * // Delete a few SyncLogs
     * const { count } = await prisma.syncLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SyncLogDeleteManyArgs>(args?: SelectSubset<T, SyncLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SyncLogs
     * const syncLog = await prisma.syncLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SyncLogUpdateManyArgs>(args: SelectSubset<T, SyncLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncLogs and returns the data updated in the database.
     * @param {SyncLogUpdateManyAndReturnArgs} args - Arguments to update many SyncLogs.
     * @example
     * // Update many SyncLogs
     * const syncLog = await prisma.syncLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SyncLogs and only return the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SyncLogUpdateManyAndReturnArgs>(args: SelectSubset<T, SyncLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SyncLog.
     * @param {SyncLogUpsertArgs} args - Arguments to update or create a SyncLog.
     * @example
     * // Update or create a SyncLog
     * const syncLog = await prisma.syncLog.upsert({
     *   create: {
     *     // ... data to create a SyncLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SyncLog we want to update
     *   }
     * })
     */
    upsert<T extends SyncLogUpsertArgs>(args: SelectSubset<T, SyncLogUpsertArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SyncLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogCountArgs} args - Arguments to filter SyncLogs to count.
     * @example
     * // Count the number of SyncLogs
     * const count = await prisma.syncLog.count({
     *   where: {
     *     // ... the filter for the SyncLogs we want to count
     *   }
     * })
    **/
    count<T extends SyncLogCountArgs>(
      args?: Subset<T, SyncLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SyncLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SyncLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SyncLogAggregateArgs>(args: Subset<T, SyncLogAggregateArgs>): Prisma.PrismaPromise<GetSyncLogAggregateType<T>>

    /**
     * Group by SyncLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SyncLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SyncLogGroupByArgs['orderBy'] }
        : { orderBy?: SyncLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SyncLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSyncLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SyncLog model
   */
  readonly fields: SyncLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SyncLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SyncLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SyncLog model
   */
  interface SyncLogFieldRefs {
    readonly id: FieldRef<"SyncLog", 'Int'>
    readonly runId: FieldRef<"SyncLog", 'String'>
    readonly startedAt: FieldRef<"SyncLog", 'DateTime'>
    readonly completedAt: FieldRef<"SyncLog", 'DateTime'>
    readonly durationMs: FieldRef<"SyncLog", 'Int'>
    readonly feedsSynced: FieldRef<"SyncLog", 'Int'>
    readonly totalImported: FieldRef<"SyncLog", 'Int'>
    readonly staleHidden: FieldRef<"SyncLog", 'Int'>
    readonly errors: FieldRef<"SyncLog", 'Json'>
    readonly results: FieldRef<"SyncLog", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * SyncLog findUnique
   */
  export type SyncLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog findUniqueOrThrow
   */
  export type SyncLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog findFirst
   */
  export type SyncLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncLogs.
     */
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog findFirstOrThrow
   */
  export type SyncLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncLogs.
     */
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog findMany
   */
  export type SyncLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLogs to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncLogs.
     */
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog create
   */
  export type SyncLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data needed to create a SyncLog.
     */
    data: XOR<SyncLogCreateInput, SyncLogUncheckedCreateInput>
  }

  /**
   * SyncLog createMany
   */
  export type SyncLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SyncLogs.
     */
    data: SyncLogCreateManyInput | SyncLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncLog createManyAndReturn
   */
  export type SyncLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data used to create many SyncLogs.
     */
    data: SyncLogCreateManyInput | SyncLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncLog update
   */
  export type SyncLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data needed to update a SyncLog.
     */
    data: XOR<SyncLogUpdateInput, SyncLogUncheckedUpdateInput>
    /**
     * Choose, which SyncLog to update.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog updateMany
   */
  export type SyncLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SyncLogs.
     */
    data: XOR<SyncLogUpdateManyMutationInput, SyncLogUncheckedUpdateManyInput>
    /**
     * Filter which SyncLogs to update
     */
    where?: SyncLogWhereInput
    /**
     * Limit how many SyncLogs to update.
     */
    limit?: number
  }

  /**
   * SyncLog updateManyAndReturn
   */
  export type SyncLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data used to update SyncLogs.
     */
    data: XOR<SyncLogUpdateManyMutationInput, SyncLogUncheckedUpdateManyInput>
    /**
     * Filter which SyncLogs to update
     */
    where?: SyncLogWhereInput
    /**
     * Limit how many SyncLogs to update.
     */
    limit?: number
  }

  /**
   * SyncLog upsert
   */
  export type SyncLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The filter to search for the SyncLog to update in case it exists.
     */
    where: SyncLogWhereUniqueInput
    /**
     * In case the SyncLog found by the `where` argument doesn't exist, create a new SyncLog with this data.
     */
    create: XOR<SyncLogCreateInput, SyncLogUncheckedCreateInput>
    /**
     * In case the SyncLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SyncLogUpdateInput, SyncLogUncheckedUpdateInput>
  }

  /**
   * SyncLog delete
   */
  export type SyncLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter which SyncLog to delete.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog deleteMany
   */
  export type SyncLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncLogs to delete
     */
    where?: SyncLogWhereInput
    /**
     * Limit how many SyncLogs to delete.
     */
    limit?: number
  }

  /**
   * SyncLog without action
   */
  export type SyncLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AdvertiserVoteScalarFieldEnum: {
    id: 'id',
    advertiserName: 'advertiserName',
    fingerprint: 'fingerprint',
    vote: 'vote',
    createdAt: 'createdAt'
  };

  export type AdvertiserVoteScalarFieldEnum = (typeof AdvertiserVoteScalarFieldEnum)[keyof typeof AdvertiserVoteScalarFieldEnum]


  export const AdvertiserScalarFieldEnum: {
    advertiserId: 'advertiserId',
    name: 'name',
    slug: 'slug',
    logoUrl: 'logoUrl',
    url: 'url',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    healthScore: 'healthScore'
  };

  export type AdvertiserScalarFieldEnum = (typeof AdvertiserScalarFieldEnum)[keyof typeof AdvertiserScalarFieldEnum]


  export const DealHealthVoteScalarFieldEnum: {
    id: 'id',
    productSlug: 'productSlug',
    vote: 'vote',
    fingerprint: 'fingerprint',
    createdAt: 'createdAt'
  };

  export type DealHealthVoteScalarFieldEnum = (typeof DealHealthVoteScalarFieldEnum)[keyof typeof DealHealthVoteScalarFieldEnum]


  export const FeedScalarFieldEnum: {
    id: 'id',
    programId: 'programId',
    programName: 'programName',
    catalogId: 'catalogId',
    catalogName: 'catalogName',
    httpsLink: 'httpsLink',
    country: 'country',
    totalProducts: 'totalProducts',
    status: 'status',
    sourceUpdatedAt: 'sourceUpdatedAt',
    lastImportedAt: 'lastImportedAt',
    productsImported: 'productsImported',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FeedScalarFieldEnum = (typeof FeedScalarFieldEnum)[keyof typeof FeedScalarFieldEnum]


  export const VariantScalarFieldEnum: {
    id: 'id',
    programId: 'programId',
    productId: 'productId',
    groupId: 'groupId',
    country: 'country',
    currency: 'currency',
    name: 'name',
    brand: 'brand',
    description: 'description',
    price: 'price',
    finalPrice: 'finalPrice',
    discountPct: 'discountPct',
    isOnSale: 'isOnSale',
    gender: 'gender',
    category: 'category',
    subCategory: 'subCategory',
    color: 'color',
    size: 'size',
    sku: 'sku',
    url: 'url',
    imageUrl: 'imageUrl',
    inStock: 'inStock',
    visibility: 'visibility',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    parentSlug: 'parentSlug',
    variantSlug: 'variantSlug',
    normalizedName: 'normalizedName',
    advertiserName: 'advertiserName',
    region: 'region'
  };

  export type VariantScalarFieldEnum = (typeof VariantScalarFieldEnum)[keyof typeof VariantScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    name: 'name',
    normalizedName: 'normalizedName',
    brand: 'brand',
    gender: 'gender',
    category: 'category',
    subCategory: 'subCategory',
    country: 'country',
    region: 'region',
    bestVariantId: 'bestVariantId',
    bestPrice: 'bestPrice',
    imageUrl: 'imageUrl',
    url: 'url',
    inStock: 'inStock',
    isOnSale: 'isOnSale',
    discountPct: 'discountPct',
    visibility: 'visibility',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const PromotionScalarFieldEnum: {
    id: 'id',
    advertiserId: 'advertiserId',
    title: 'title',
    description: 'description',
    couponCode: 'couponCode',
    discountPercent: 'discountPercent',
    discountAmount: 'discountAmount',
    minimumPurchase: 'minimumPurchase',
    terms: 'terms',
    url: 'url',
    startDate: 'startDate',
    endDate: 'endDate',
    isActive: 'isActive',
    isVerified: 'isVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PromotionScalarFieldEnum = (typeof PromotionScalarFieldEnum)[keyof typeof PromotionScalarFieldEnum]


  export const SyncLogScalarFieldEnum: {
    id: 'id',
    runId: 'runId',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    durationMs: 'durationMs',
    feedsSynced: 'feedsSynced',
    totalImported: 'totalImported',
    staleHidden: 'staleHidden',
    errors: 'errors',
    results: 'results'
  };

  export type SyncLogScalarFieldEnum = (typeof SyncLogScalarFieldEnum)[keyof typeof SyncLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AdvertiserVoteWhereInput = {
    AND?: AdvertiserVoteWhereInput | AdvertiserVoteWhereInput[]
    OR?: AdvertiserVoteWhereInput[]
    NOT?: AdvertiserVoteWhereInput | AdvertiserVoteWhereInput[]
    id?: IntFilter<"AdvertiserVote"> | number
    advertiserName?: StringFilter<"AdvertiserVote"> | string
    fingerprint?: StringFilter<"AdvertiserVote"> | string
    vote?: StringFilter<"AdvertiserVote"> | string
    createdAt?: DateTimeNullableFilter<"AdvertiserVote"> | Date | string | null
  }

  export type AdvertiserVoteOrderByWithRelationInput = {
    id?: SortOrder
    advertiserName?: SortOrder
    fingerprint?: SortOrder
    vote?: SortOrder
    createdAt?: SortOrderInput | SortOrder
  }

  export type AdvertiserVoteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    advertiserName_fingerprint?: AdvertiserVoteAdvertiserNameFingerprintCompoundUniqueInput
    AND?: AdvertiserVoteWhereInput | AdvertiserVoteWhereInput[]
    OR?: AdvertiserVoteWhereInput[]
    NOT?: AdvertiserVoteWhereInput | AdvertiserVoteWhereInput[]
    advertiserName?: StringFilter<"AdvertiserVote"> | string
    fingerprint?: StringFilter<"AdvertiserVote"> | string
    vote?: StringFilter<"AdvertiserVote"> | string
    createdAt?: DateTimeNullableFilter<"AdvertiserVote"> | Date | string | null
  }, "id" | "advertiserName_fingerprint">

  export type AdvertiserVoteOrderByWithAggregationInput = {
    id?: SortOrder
    advertiserName?: SortOrder
    fingerprint?: SortOrder
    vote?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    _count?: AdvertiserVoteCountOrderByAggregateInput
    _avg?: AdvertiserVoteAvgOrderByAggregateInput
    _max?: AdvertiserVoteMaxOrderByAggregateInput
    _min?: AdvertiserVoteMinOrderByAggregateInput
    _sum?: AdvertiserVoteSumOrderByAggregateInput
  }

  export type AdvertiserVoteScalarWhereWithAggregatesInput = {
    AND?: AdvertiserVoteScalarWhereWithAggregatesInput | AdvertiserVoteScalarWhereWithAggregatesInput[]
    OR?: AdvertiserVoteScalarWhereWithAggregatesInput[]
    NOT?: AdvertiserVoteScalarWhereWithAggregatesInput | AdvertiserVoteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AdvertiserVote"> | number
    advertiserName?: StringWithAggregatesFilter<"AdvertiserVote"> | string
    fingerprint?: StringWithAggregatesFilter<"AdvertiserVote"> | string
    vote?: StringWithAggregatesFilter<"AdvertiserVote"> | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"AdvertiserVote"> | Date | string | null
  }

  export type AdvertiserWhereInput = {
    AND?: AdvertiserWhereInput | AdvertiserWhereInput[]
    OR?: AdvertiserWhereInput[]
    NOT?: AdvertiserWhereInput | AdvertiserWhereInput[]
    advertiserId?: IntFilter<"Advertiser"> | number
    name?: StringFilter<"Advertiser"> | string
    slug?: StringNullableFilter<"Advertiser"> | string | null
    logoUrl?: StringNullableFilter<"Advertiser"> | string | null
    url?: StringNullableFilter<"Advertiser"> | string | null
    description?: StringNullableFilter<"Advertiser"> | string | null
    isActive?: BoolNullableFilter<"Advertiser"> | boolean | null
    createdAt?: DateTimeNullableFilter<"Advertiser"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Advertiser"> | Date | string | null
    healthScore?: IntNullableFilter<"Advertiser"> | number | null
    promotions?: PromotionListRelationFilter
  }

  export type AdvertiserOrderByWithRelationInput = {
    advertiserId?: SortOrder
    name?: SortOrder
    slug?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    healthScore?: SortOrderInput | SortOrder
    promotions?: PromotionOrderByRelationAggregateInput
  }

  export type AdvertiserWhereUniqueInput = Prisma.AtLeast<{
    advertiserId?: number
    slug?: string
    AND?: AdvertiserWhereInput | AdvertiserWhereInput[]
    OR?: AdvertiserWhereInput[]
    NOT?: AdvertiserWhereInput | AdvertiserWhereInput[]
    name?: StringFilter<"Advertiser"> | string
    logoUrl?: StringNullableFilter<"Advertiser"> | string | null
    url?: StringNullableFilter<"Advertiser"> | string | null
    description?: StringNullableFilter<"Advertiser"> | string | null
    isActive?: BoolNullableFilter<"Advertiser"> | boolean | null
    createdAt?: DateTimeNullableFilter<"Advertiser"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Advertiser"> | Date | string | null
    healthScore?: IntNullableFilter<"Advertiser"> | number | null
    promotions?: PromotionListRelationFilter
  }, "advertiserId" | "slug">

  export type AdvertiserOrderByWithAggregationInput = {
    advertiserId?: SortOrder
    name?: SortOrder
    slug?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    healthScore?: SortOrderInput | SortOrder
    _count?: AdvertiserCountOrderByAggregateInput
    _avg?: AdvertiserAvgOrderByAggregateInput
    _max?: AdvertiserMaxOrderByAggregateInput
    _min?: AdvertiserMinOrderByAggregateInput
    _sum?: AdvertiserSumOrderByAggregateInput
  }

  export type AdvertiserScalarWhereWithAggregatesInput = {
    AND?: AdvertiserScalarWhereWithAggregatesInput | AdvertiserScalarWhereWithAggregatesInput[]
    OR?: AdvertiserScalarWhereWithAggregatesInput[]
    NOT?: AdvertiserScalarWhereWithAggregatesInput | AdvertiserScalarWhereWithAggregatesInput[]
    advertiserId?: IntWithAggregatesFilter<"Advertiser"> | number
    name?: StringWithAggregatesFilter<"Advertiser"> | string
    slug?: StringNullableWithAggregatesFilter<"Advertiser"> | string | null
    logoUrl?: StringNullableWithAggregatesFilter<"Advertiser"> | string | null
    url?: StringNullableWithAggregatesFilter<"Advertiser"> | string | null
    description?: StringNullableWithAggregatesFilter<"Advertiser"> | string | null
    isActive?: BoolNullableWithAggregatesFilter<"Advertiser"> | boolean | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"Advertiser"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Advertiser"> | Date | string | null
    healthScore?: IntNullableWithAggregatesFilter<"Advertiser"> | number | null
  }

  export type DealHealthVoteWhereInput = {
    AND?: DealHealthVoteWhereInput | DealHealthVoteWhereInput[]
    OR?: DealHealthVoteWhereInput[]
    NOT?: DealHealthVoteWhereInput | DealHealthVoteWhereInput[]
    id?: IntFilter<"DealHealthVote"> | number
    productSlug?: StringFilter<"DealHealthVote"> | string
    vote?: StringFilter<"DealHealthVote"> | string
    fingerprint?: StringNullableFilter<"DealHealthVote"> | string | null
    createdAt?: DateTimeNullableFilter<"DealHealthVote"> | Date | string | null
  }

  export type DealHealthVoteOrderByWithRelationInput = {
    id?: SortOrder
    productSlug?: SortOrder
    vote?: SortOrder
    fingerprint?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
  }

  export type DealHealthVoteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DealHealthVoteWhereInput | DealHealthVoteWhereInput[]
    OR?: DealHealthVoteWhereInput[]
    NOT?: DealHealthVoteWhereInput | DealHealthVoteWhereInput[]
    productSlug?: StringFilter<"DealHealthVote"> | string
    vote?: StringFilter<"DealHealthVote"> | string
    fingerprint?: StringNullableFilter<"DealHealthVote"> | string | null
    createdAt?: DateTimeNullableFilter<"DealHealthVote"> | Date | string | null
  }, "id">

  export type DealHealthVoteOrderByWithAggregationInput = {
    id?: SortOrder
    productSlug?: SortOrder
    vote?: SortOrder
    fingerprint?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    _count?: DealHealthVoteCountOrderByAggregateInput
    _avg?: DealHealthVoteAvgOrderByAggregateInput
    _max?: DealHealthVoteMaxOrderByAggregateInput
    _min?: DealHealthVoteMinOrderByAggregateInput
    _sum?: DealHealthVoteSumOrderByAggregateInput
  }

  export type DealHealthVoteScalarWhereWithAggregatesInput = {
    AND?: DealHealthVoteScalarWhereWithAggregatesInput | DealHealthVoteScalarWhereWithAggregatesInput[]
    OR?: DealHealthVoteScalarWhereWithAggregatesInput[]
    NOT?: DealHealthVoteScalarWhereWithAggregatesInput | DealHealthVoteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DealHealthVote"> | number
    productSlug?: StringWithAggregatesFilter<"DealHealthVote"> | string
    vote?: StringWithAggregatesFilter<"DealHealthVote"> | string
    fingerprint?: StringNullableWithAggregatesFilter<"DealHealthVote"> | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"DealHealthVote"> | Date | string | null
  }

  export type FeedWhereInput = {
    AND?: FeedWhereInput | FeedWhereInput[]
    OR?: FeedWhereInput[]
    NOT?: FeedWhereInput | FeedWhereInput[]
    id?: IntFilter<"Feed"> | number
    programId?: IntFilter<"Feed"> | number
    programName?: StringFilter<"Feed"> | string
    catalogId?: StringNullableFilter<"Feed"> | string | null
    catalogName?: StringNullableFilter<"Feed"> | string | null
    httpsLink?: StringNullableFilter<"Feed"> | string | null
    country?: StringNullableFilter<"Feed"> | string | null
    totalProducts?: IntNullableFilter<"Feed"> | number | null
    status?: StringNullableFilter<"Feed"> | string | null
    sourceUpdatedAt?: DateTimeNullableFilter<"Feed"> | Date | string | null
    lastImportedAt?: DateTimeNullableFilter<"Feed"> | Date | string | null
    productsImported?: IntNullableFilter<"Feed"> | number | null
    isActive?: BoolNullableFilter<"Feed"> | boolean | null
    createdAt?: DateTimeNullableFilter<"Feed"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Feed"> | Date | string | null
  }

  export type FeedOrderByWithRelationInput = {
    id?: SortOrder
    programId?: SortOrder
    programName?: SortOrder
    catalogId?: SortOrderInput | SortOrder
    catalogName?: SortOrderInput | SortOrder
    httpsLink?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    totalProducts?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    sourceUpdatedAt?: SortOrderInput | SortOrder
    lastImportedAt?: SortOrderInput | SortOrder
    productsImported?: SortOrderInput | SortOrder
    isActive?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
  }

  export type FeedWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    programId?: number
    AND?: FeedWhereInput | FeedWhereInput[]
    OR?: FeedWhereInput[]
    NOT?: FeedWhereInput | FeedWhereInput[]
    programName?: StringFilter<"Feed"> | string
    catalogId?: StringNullableFilter<"Feed"> | string | null
    catalogName?: StringNullableFilter<"Feed"> | string | null
    httpsLink?: StringNullableFilter<"Feed"> | string | null
    country?: StringNullableFilter<"Feed"> | string | null
    totalProducts?: IntNullableFilter<"Feed"> | number | null
    status?: StringNullableFilter<"Feed"> | string | null
    sourceUpdatedAt?: DateTimeNullableFilter<"Feed"> | Date | string | null
    lastImportedAt?: DateTimeNullableFilter<"Feed"> | Date | string | null
    productsImported?: IntNullableFilter<"Feed"> | number | null
    isActive?: BoolNullableFilter<"Feed"> | boolean | null
    createdAt?: DateTimeNullableFilter<"Feed"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Feed"> | Date | string | null
  }, "id" | "programId">

  export type FeedOrderByWithAggregationInput = {
    id?: SortOrder
    programId?: SortOrder
    programName?: SortOrder
    catalogId?: SortOrderInput | SortOrder
    catalogName?: SortOrderInput | SortOrder
    httpsLink?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    totalProducts?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    sourceUpdatedAt?: SortOrderInput | SortOrder
    lastImportedAt?: SortOrderInput | SortOrder
    productsImported?: SortOrderInput | SortOrder
    isActive?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: FeedCountOrderByAggregateInput
    _avg?: FeedAvgOrderByAggregateInput
    _max?: FeedMaxOrderByAggregateInput
    _min?: FeedMinOrderByAggregateInput
    _sum?: FeedSumOrderByAggregateInput
  }

  export type FeedScalarWhereWithAggregatesInput = {
    AND?: FeedScalarWhereWithAggregatesInput | FeedScalarWhereWithAggregatesInput[]
    OR?: FeedScalarWhereWithAggregatesInput[]
    NOT?: FeedScalarWhereWithAggregatesInput | FeedScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Feed"> | number
    programId?: IntWithAggregatesFilter<"Feed"> | number
    programName?: StringWithAggregatesFilter<"Feed"> | string
    catalogId?: StringNullableWithAggregatesFilter<"Feed"> | string | null
    catalogName?: StringNullableWithAggregatesFilter<"Feed"> | string | null
    httpsLink?: StringNullableWithAggregatesFilter<"Feed"> | string | null
    country?: StringNullableWithAggregatesFilter<"Feed"> | string | null
    totalProducts?: IntNullableWithAggregatesFilter<"Feed"> | number | null
    status?: StringNullableWithAggregatesFilter<"Feed"> | string | null
    sourceUpdatedAt?: DateTimeNullableWithAggregatesFilter<"Feed"> | Date | string | null
    lastImportedAt?: DateTimeNullableWithAggregatesFilter<"Feed"> | Date | string | null
    productsImported?: IntNullableWithAggregatesFilter<"Feed"> | number | null
    isActive?: BoolNullableWithAggregatesFilter<"Feed"> | boolean | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"Feed"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Feed"> | Date | string | null
  }

  export type VariantWhereInput = {
    AND?: VariantWhereInput | VariantWhereInput[]
    OR?: VariantWhereInput[]
    NOT?: VariantWhereInput | VariantWhereInput[]
    id?: IntFilter<"Variant"> | number
    programId?: IntNullableFilter<"Variant"> | number | null
    productId?: StringFilter<"Variant"> | string
    groupId?: IntNullableFilter<"Variant"> | number | null
    country?: StringNullableFilter<"Variant"> | string | null
    currency?: StringNullableFilter<"Variant"> | string | null
    name?: StringFilter<"Variant"> | string
    brand?: StringNullableFilter<"Variant"> | string | null
    description?: StringNullableFilter<"Variant"> | string | null
    price?: DecimalNullableFilter<"Variant"> | Decimal | DecimalJsLike | number | string | null
    finalPrice?: DecimalNullableFilter<"Variant"> | Decimal | DecimalJsLike | number | string | null
    discountPct?: IntNullableFilter<"Variant"> | number | null
    isOnSale?: BoolNullableFilter<"Variant"> | boolean | null
    gender?: StringNullableFilter<"Variant"> | string | null
    category?: StringNullableFilter<"Variant"> | string | null
    subCategory?: StringNullableFilter<"Variant"> | string | null
    color?: StringNullableFilter<"Variant"> | string | null
    size?: StringNullableFilter<"Variant"> | string | null
    sku?: StringNullableFilter<"Variant"> | string | null
    url?: StringNullableFilter<"Variant"> | string | null
    imageUrl?: StringNullableFilter<"Variant"> | string | null
    inStock?: BoolNullableFilter<"Variant"> | boolean | null
    visibility?: StringNullableFilter<"Variant"> | string | null
    createdAt?: DateTimeNullableFilter<"Variant"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Variant"> | Date | string | null
    parentSlug?: StringNullableFilter<"Variant"> | string | null
    variantSlug?: StringNullableFilter<"Variant"> | string | null
    normalizedName?: StringNullableFilter<"Variant"> | string | null
    advertiserName?: StringNullableFilter<"Variant"> | string | null
    region?: StringNullableFilter<"Variant"> | string | null
    group?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
    bestFor?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
  }

  export type VariantOrderByWithRelationInput = {
    id?: SortOrder
    programId?: SortOrderInput | SortOrder
    productId?: SortOrder
    groupId?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    currency?: SortOrderInput | SortOrder
    name?: SortOrder
    brand?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    finalPrice?: SortOrderInput | SortOrder
    discountPct?: SortOrderInput | SortOrder
    isOnSale?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    subCategory?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    sku?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    inStock?: SortOrderInput | SortOrder
    visibility?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    parentSlug?: SortOrderInput | SortOrder
    variantSlug?: SortOrderInput | SortOrder
    normalizedName?: SortOrderInput | SortOrder
    advertiserName?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    group?: ProductOrderByWithRelationInput
    bestFor?: ProductOrderByWithRelationInput
  }

  export type VariantWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    programId_productId?: VariantProgramIdProductIdCompoundUniqueInput
    AND?: VariantWhereInput | VariantWhereInput[]
    OR?: VariantWhereInput[]
    NOT?: VariantWhereInput | VariantWhereInput[]
    programId?: IntNullableFilter<"Variant"> | number | null
    productId?: StringFilter<"Variant"> | string
    groupId?: IntNullableFilter<"Variant"> | number | null
    country?: StringNullableFilter<"Variant"> | string | null
    currency?: StringNullableFilter<"Variant"> | string | null
    name?: StringFilter<"Variant"> | string
    brand?: StringNullableFilter<"Variant"> | string | null
    description?: StringNullableFilter<"Variant"> | string | null
    price?: DecimalNullableFilter<"Variant"> | Decimal | DecimalJsLike | number | string | null
    finalPrice?: DecimalNullableFilter<"Variant"> | Decimal | DecimalJsLike | number | string | null
    discountPct?: IntNullableFilter<"Variant"> | number | null
    isOnSale?: BoolNullableFilter<"Variant"> | boolean | null
    gender?: StringNullableFilter<"Variant"> | string | null
    category?: StringNullableFilter<"Variant"> | string | null
    subCategory?: StringNullableFilter<"Variant"> | string | null
    color?: StringNullableFilter<"Variant"> | string | null
    size?: StringNullableFilter<"Variant"> | string | null
    sku?: StringNullableFilter<"Variant"> | string | null
    url?: StringNullableFilter<"Variant"> | string | null
    imageUrl?: StringNullableFilter<"Variant"> | string | null
    inStock?: BoolNullableFilter<"Variant"> | boolean | null
    visibility?: StringNullableFilter<"Variant"> | string | null
    createdAt?: DateTimeNullableFilter<"Variant"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Variant"> | Date | string | null
    parentSlug?: StringNullableFilter<"Variant"> | string | null
    variantSlug?: StringNullableFilter<"Variant"> | string | null
    normalizedName?: StringNullableFilter<"Variant"> | string | null
    advertiserName?: StringNullableFilter<"Variant"> | string | null
    region?: StringNullableFilter<"Variant"> | string | null
    group?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
    bestFor?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
  }, "id" | "programId_productId">

  export type VariantOrderByWithAggregationInput = {
    id?: SortOrder
    programId?: SortOrderInput | SortOrder
    productId?: SortOrder
    groupId?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    currency?: SortOrderInput | SortOrder
    name?: SortOrder
    brand?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    finalPrice?: SortOrderInput | SortOrder
    discountPct?: SortOrderInput | SortOrder
    isOnSale?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    subCategory?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    sku?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    inStock?: SortOrderInput | SortOrder
    visibility?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    parentSlug?: SortOrderInput | SortOrder
    variantSlug?: SortOrderInput | SortOrder
    normalizedName?: SortOrderInput | SortOrder
    advertiserName?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    _count?: VariantCountOrderByAggregateInput
    _avg?: VariantAvgOrderByAggregateInput
    _max?: VariantMaxOrderByAggregateInput
    _min?: VariantMinOrderByAggregateInput
    _sum?: VariantSumOrderByAggregateInput
  }

  export type VariantScalarWhereWithAggregatesInput = {
    AND?: VariantScalarWhereWithAggregatesInput | VariantScalarWhereWithAggregatesInput[]
    OR?: VariantScalarWhereWithAggregatesInput[]
    NOT?: VariantScalarWhereWithAggregatesInput | VariantScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Variant"> | number
    programId?: IntNullableWithAggregatesFilter<"Variant"> | number | null
    productId?: StringWithAggregatesFilter<"Variant"> | string
    groupId?: IntNullableWithAggregatesFilter<"Variant"> | number | null
    country?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    currency?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    name?: StringWithAggregatesFilter<"Variant"> | string
    brand?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    description?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    price?: DecimalNullableWithAggregatesFilter<"Variant"> | Decimal | DecimalJsLike | number | string | null
    finalPrice?: DecimalNullableWithAggregatesFilter<"Variant"> | Decimal | DecimalJsLike | number | string | null
    discountPct?: IntNullableWithAggregatesFilter<"Variant"> | number | null
    isOnSale?: BoolNullableWithAggregatesFilter<"Variant"> | boolean | null
    gender?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    category?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    subCategory?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    color?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    size?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    sku?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    url?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    inStock?: BoolNullableWithAggregatesFilter<"Variant"> | boolean | null
    visibility?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"Variant"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Variant"> | Date | string | null
    parentSlug?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    variantSlug?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    normalizedName?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    advertiserName?: StringNullableWithAggregatesFilter<"Variant"> | string | null
    region?: StringNullableWithAggregatesFilter<"Variant"> | string | null
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: IntFilter<"Product"> | number
    slug?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    normalizedName?: StringNullableFilter<"Product"> | string | null
    brand?: StringNullableFilter<"Product"> | string | null
    gender?: StringNullableFilter<"Product"> | string | null
    category?: StringNullableFilter<"Product"> | string | null
    subCategory?: StringNullableFilter<"Product"> | string | null
    country?: StringNullableFilter<"Product"> | string | null
    region?: StringNullableFilter<"Product"> | string | null
    bestVariantId?: IntNullableFilter<"Product"> | number | null
    bestPrice?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    imageUrl?: StringNullableFilter<"Product"> | string | null
    url?: StringNullableFilter<"Product"> | string | null
    inStock?: BoolNullableFilter<"Product"> | boolean | null
    isOnSale?: BoolNullableFilter<"Product"> | boolean | null
    discountPct?: IntNullableFilter<"Product"> | number | null
    visibility?: StringNullableFilter<"Product"> | string | null
    createdAt?: DateTimeNullableFilter<"Product"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Product"> | Date | string | null
    variants?: VariantListRelationFilter
    bestVariant?: XOR<VariantNullableScalarRelationFilter, VariantWhereInput> | null
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    normalizedName?: SortOrderInput | SortOrder
    brand?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    subCategory?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    bestVariantId?: SortOrderInput | SortOrder
    bestPrice?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    inStock?: SortOrderInput | SortOrder
    isOnSale?: SortOrderInput | SortOrder
    discountPct?: SortOrderInput | SortOrder
    visibility?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    variants?: VariantOrderByRelationAggregateInput
    bestVariant?: VariantOrderByWithRelationInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    bestVariantId?: number
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    normalizedName?: StringNullableFilter<"Product"> | string | null
    brand?: StringNullableFilter<"Product"> | string | null
    gender?: StringNullableFilter<"Product"> | string | null
    category?: StringNullableFilter<"Product"> | string | null
    subCategory?: StringNullableFilter<"Product"> | string | null
    country?: StringNullableFilter<"Product"> | string | null
    region?: StringNullableFilter<"Product"> | string | null
    bestPrice?: DecimalNullableFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    imageUrl?: StringNullableFilter<"Product"> | string | null
    url?: StringNullableFilter<"Product"> | string | null
    inStock?: BoolNullableFilter<"Product"> | boolean | null
    isOnSale?: BoolNullableFilter<"Product"> | boolean | null
    discountPct?: IntNullableFilter<"Product"> | number | null
    visibility?: StringNullableFilter<"Product"> | string | null
    createdAt?: DateTimeNullableFilter<"Product"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Product"> | Date | string | null
    variants?: VariantListRelationFilter
    bestVariant?: XOR<VariantNullableScalarRelationFilter, VariantWhereInput> | null
  }, "id" | "slug" | "bestVariantId">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    normalizedName?: SortOrderInput | SortOrder
    brand?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    subCategory?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    bestVariantId?: SortOrderInput | SortOrder
    bestPrice?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    inStock?: SortOrderInput | SortOrder
    isOnSale?: SortOrderInput | SortOrder
    discountPct?: SortOrderInput | SortOrder
    visibility?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Product"> | number
    slug?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    normalizedName?: StringNullableWithAggregatesFilter<"Product"> | string | null
    brand?: StringNullableWithAggregatesFilter<"Product"> | string | null
    gender?: StringNullableWithAggregatesFilter<"Product"> | string | null
    category?: StringNullableWithAggregatesFilter<"Product"> | string | null
    subCategory?: StringNullableWithAggregatesFilter<"Product"> | string | null
    country?: StringNullableWithAggregatesFilter<"Product"> | string | null
    region?: StringNullableWithAggregatesFilter<"Product"> | string | null
    bestVariantId?: IntNullableWithAggregatesFilter<"Product"> | number | null
    bestPrice?: DecimalNullableWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Product"> | string | null
    url?: StringNullableWithAggregatesFilter<"Product"> | string | null
    inStock?: BoolNullableWithAggregatesFilter<"Product"> | boolean | null
    isOnSale?: BoolNullableWithAggregatesFilter<"Product"> | boolean | null
    discountPct?: IntNullableWithAggregatesFilter<"Product"> | number | null
    visibility?: StringNullableWithAggregatesFilter<"Product"> | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"Product"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Product"> | Date | string | null
  }

  export type PromotionWhereInput = {
    AND?: PromotionWhereInput | PromotionWhereInput[]
    OR?: PromotionWhereInput[]
    NOT?: PromotionWhereInput | PromotionWhereInput[]
    id?: IntFilter<"Promotion"> | number
    advertiserId?: IntNullableFilter<"Promotion"> | number | null
    title?: StringFilter<"Promotion"> | string
    description?: StringNullableFilter<"Promotion"> | string | null
    couponCode?: StringNullableFilter<"Promotion"> | string | null
    discountPercent?: DecimalNullableFilter<"Promotion"> | Decimal | DecimalJsLike | number | string | null
    discountAmount?: DecimalNullableFilter<"Promotion"> | Decimal | DecimalJsLike | number | string | null
    minimumPurchase?: DecimalNullableFilter<"Promotion"> | Decimal | DecimalJsLike | number | string | null
    terms?: StringNullableFilter<"Promotion"> | string | null
    url?: StringNullableFilter<"Promotion"> | string | null
    startDate?: DateTimeNullableFilter<"Promotion"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Promotion"> | Date | string | null
    isActive?: BoolNullableFilter<"Promotion"> | boolean | null
    isVerified?: BoolNullableFilter<"Promotion"> | boolean | null
    createdAt?: DateTimeNullableFilter<"Promotion"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Promotion"> | Date | string | null
    advertiser?: XOR<AdvertiserNullableScalarRelationFilter, AdvertiserWhereInput> | null
  }

  export type PromotionOrderByWithRelationInput = {
    id?: SortOrder
    advertiserId?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    couponCode?: SortOrderInput | SortOrder
    discountPercent?: SortOrderInput | SortOrder
    discountAmount?: SortOrderInput | SortOrder
    minimumPurchase?: SortOrderInput | SortOrder
    terms?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    isActive?: SortOrderInput | SortOrder
    isVerified?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    advertiser?: AdvertiserOrderByWithRelationInput
  }

  export type PromotionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PromotionWhereInput | PromotionWhereInput[]
    OR?: PromotionWhereInput[]
    NOT?: PromotionWhereInput | PromotionWhereInput[]
    advertiserId?: IntNullableFilter<"Promotion"> | number | null
    title?: StringFilter<"Promotion"> | string
    description?: StringNullableFilter<"Promotion"> | string | null
    couponCode?: StringNullableFilter<"Promotion"> | string | null
    discountPercent?: DecimalNullableFilter<"Promotion"> | Decimal | DecimalJsLike | number | string | null
    discountAmount?: DecimalNullableFilter<"Promotion"> | Decimal | DecimalJsLike | number | string | null
    minimumPurchase?: DecimalNullableFilter<"Promotion"> | Decimal | DecimalJsLike | number | string | null
    terms?: StringNullableFilter<"Promotion"> | string | null
    url?: StringNullableFilter<"Promotion"> | string | null
    startDate?: DateTimeNullableFilter<"Promotion"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Promotion"> | Date | string | null
    isActive?: BoolNullableFilter<"Promotion"> | boolean | null
    isVerified?: BoolNullableFilter<"Promotion"> | boolean | null
    createdAt?: DateTimeNullableFilter<"Promotion"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Promotion"> | Date | string | null
    advertiser?: XOR<AdvertiserNullableScalarRelationFilter, AdvertiserWhereInput> | null
  }, "id">

  export type PromotionOrderByWithAggregationInput = {
    id?: SortOrder
    advertiserId?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    couponCode?: SortOrderInput | SortOrder
    discountPercent?: SortOrderInput | SortOrder
    discountAmount?: SortOrderInput | SortOrder
    minimumPurchase?: SortOrderInput | SortOrder
    terms?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    isActive?: SortOrderInput | SortOrder
    isVerified?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: PromotionCountOrderByAggregateInput
    _avg?: PromotionAvgOrderByAggregateInput
    _max?: PromotionMaxOrderByAggregateInput
    _min?: PromotionMinOrderByAggregateInput
    _sum?: PromotionSumOrderByAggregateInput
  }

  export type PromotionScalarWhereWithAggregatesInput = {
    AND?: PromotionScalarWhereWithAggregatesInput | PromotionScalarWhereWithAggregatesInput[]
    OR?: PromotionScalarWhereWithAggregatesInput[]
    NOT?: PromotionScalarWhereWithAggregatesInput | PromotionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Promotion"> | number
    advertiserId?: IntNullableWithAggregatesFilter<"Promotion"> | number | null
    title?: StringWithAggregatesFilter<"Promotion"> | string
    description?: StringNullableWithAggregatesFilter<"Promotion"> | string | null
    couponCode?: StringNullableWithAggregatesFilter<"Promotion"> | string | null
    discountPercent?: DecimalNullableWithAggregatesFilter<"Promotion"> | Decimal | DecimalJsLike | number | string | null
    discountAmount?: DecimalNullableWithAggregatesFilter<"Promotion"> | Decimal | DecimalJsLike | number | string | null
    minimumPurchase?: DecimalNullableWithAggregatesFilter<"Promotion"> | Decimal | DecimalJsLike | number | string | null
    terms?: StringNullableWithAggregatesFilter<"Promotion"> | string | null
    url?: StringNullableWithAggregatesFilter<"Promotion"> | string | null
    startDate?: DateTimeNullableWithAggregatesFilter<"Promotion"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"Promotion"> | Date | string | null
    isActive?: BoolNullableWithAggregatesFilter<"Promotion"> | boolean | null
    isVerified?: BoolNullableWithAggregatesFilter<"Promotion"> | boolean | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"Promotion"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Promotion"> | Date | string | null
  }

  export type SyncLogWhereInput = {
    AND?: SyncLogWhereInput | SyncLogWhereInput[]
    OR?: SyncLogWhereInput[]
    NOT?: SyncLogWhereInput | SyncLogWhereInput[]
    id?: IntFilter<"SyncLog"> | number
    runId?: StringFilter<"SyncLog"> | string
    startedAt?: DateTimeFilter<"SyncLog"> | Date | string
    completedAt?: DateTimeFilter<"SyncLog"> | Date | string
    durationMs?: IntFilter<"SyncLog"> | number
    feedsSynced?: IntFilter<"SyncLog"> | number
    totalImported?: IntFilter<"SyncLog"> | number
    staleHidden?: IntFilter<"SyncLog"> | number
    errors?: JsonNullableFilter<"SyncLog">
    results?: JsonNullableFilter<"SyncLog">
  }

  export type SyncLogOrderByWithRelationInput = {
    id?: SortOrder
    runId?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    durationMs?: SortOrder
    feedsSynced?: SortOrder
    totalImported?: SortOrder
    staleHidden?: SortOrder
    errors?: SortOrderInput | SortOrder
    results?: SortOrderInput | SortOrder
  }

  export type SyncLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SyncLogWhereInput | SyncLogWhereInput[]
    OR?: SyncLogWhereInput[]
    NOT?: SyncLogWhereInput | SyncLogWhereInput[]
    runId?: StringFilter<"SyncLog"> | string
    startedAt?: DateTimeFilter<"SyncLog"> | Date | string
    completedAt?: DateTimeFilter<"SyncLog"> | Date | string
    durationMs?: IntFilter<"SyncLog"> | number
    feedsSynced?: IntFilter<"SyncLog"> | number
    totalImported?: IntFilter<"SyncLog"> | number
    staleHidden?: IntFilter<"SyncLog"> | number
    errors?: JsonNullableFilter<"SyncLog">
    results?: JsonNullableFilter<"SyncLog">
  }, "id">

  export type SyncLogOrderByWithAggregationInput = {
    id?: SortOrder
    runId?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    durationMs?: SortOrder
    feedsSynced?: SortOrder
    totalImported?: SortOrder
    staleHidden?: SortOrder
    errors?: SortOrderInput | SortOrder
    results?: SortOrderInput | SortOrder
    _count?: SyncLogCountOrderByAggregateInput
    _avg?: SyncLogAvgOrderByAggregateInput
    _max?: SyncLogMaxOrderByAggregateInput
    _min?: SyncLogMinOrderByAggregateInput
    _sum?: SyncLogSumOrderByAggregateInput
  }

  export type SyncLogScalarWhereWithAggregatesInput = {
    AND?: SyncLogScalarWhereWithAggregatesInput | SyncLogScalarWhereWithAggregatesInput[]
    OR?: SyncLogScalarWhereWithAggregatesInput[]
    NOT?: SyncLogScalarWhereWithAggregatesInput | SyncLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SyncLog"> | number
    runId?: StringWithAggregatesFilter<"SyncLog"> | string
    startedAt?: DateTimeWithAggregatesFilter<"SyncLog"> | Date | string
    completedAt?: DateTimeWithAggregatesFilter<"SyncLog"> | Date | string
    durationMs?: IntWithAggregatesFilter<"SyncLog"> | number
    feedsSynced?: IntWithAggregatesFilter<"SyncLog"> | number
    totalImported?: IntWithAggregatesFilter<"SyncLog"> | number
    staleHidden?: IntWithAggregatesFilter<"SyncLog"> | number
    errors?: JsonNullableWithAggregatesFilter<"SyncLog">
    results?: JsonNullableWithAggregatesFilter<"SyncLog">
  }

  export type AdvertiserVoteCreateInput = {
    advertiserName: string
    fingerprint: string
    vote: string
    createdAt?: Date | string | null
  }

  export type AdvertiserVoteUncheckedCreateInput = {
    id?: number
    advertiserName: string
    fingerprint: string
    vote: string
    createdAt?: Date | string | null
  }

  export type AdvertiserVoteUpdateInput = {
    advertiserName?: StringFieldUpdateOperationsInput | string
    fingerprint?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AdvertiserVoteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    advertiserName?: StringFieldUpdateOperationsInput | string
    fingerprint?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AdvertiserVoteCreateManyInput = {
    id?: number
    advertiserName: string
    fingerprint: string
    vote: string
    createdAt?: Date | string | null
  }

  export type AdvertiserVoteUpdateManyMutationInput = {
    advertiserName?: StringFieldUpdateOperationsInput | string
    fingerprint?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AdvertiserVoteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    advertiserName?: StringFieldUpdateOperationsInput | string
    fingerprint?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AdvertiserCreateInput = {
    name: string
    slug?: string | null
    logoUrl?: string | null
    url?: string | null
    description?: string | null
    isActive?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    healthScore?: number | null
    promotions?: PromotionCreateNestedManyWithoutAdvertiserInput
  }

  export type AdvertiserUncheckedCreateInput = {
    advertiserId?: number
    name: string
    slug?: string | null
    logoUrl?: string | null
    url?: string | null
    description?: string | null
    isActive?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    healthScore?: number | null
    promotions?: PromotionUncheckedCreateNestedManyWithoutAdvertiserInput
  }

  export type AdvertiserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthScore?: NullableIntFieldUpdateOperationsInput | number | null
    promotions?: PromotionUpdateManyWithoutAdvertiserNestedInput
  }

  export type AdvertiserUncheckedUpdateInput = {
    advertiserId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthScore?: NullableIntFieldUpdateOperationsInput | number | null
    promotions?: PromotionUncheckedUpdateManyWithoutAdvertiserNestedInput
  }

  export type AdvertiserCreateManyInput = {
    advertiserId?: number
    name: string
    slug?: string | null
    logoUrl?: string | null
    url?: string | null
    description?: string | null
    isActive?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    healthScore?: number | null
  }

  export type AdvertiserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthScore?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AdvertiserUncheckedUpdateManyInput = {
    advertiserId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthScore?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DealHealthVoteCreateInput = {
    productSlug: string
    vote: string
    fingerprint?: string | null
    createdAt?: Date | string | null
  }

  export type DealHealthVoteUncheckedCreateInput = {
    id?: number
    productSlug: string
    vote: string
    fingerprint?: string | null
    createdAt?: Date | string | null
  }

  export type DealHealthVoteUpdateInput = {
    productSlug?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    fingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DealHealthVoteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    productSlug?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    fingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DealHealthVoteCreateManyInput = {
    id?: number
    productSlug: string
    vote: string
    fingerprint?: string | null
    createdAt?: Date | string | null
  }

  export type DealHealthVoteUpdateManyMutationInput = {
    productSlug?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    fingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DealHealthVoteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    productSlug?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    fingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FeedCreateInput = {
    programId: number
    programName: string
    catalogId?: string | null
    catalogName?: string | null
    httpsLink?: string | null
    country?: string | null
    totalProducts?: number | null
    status?: string | null
    sourceUpdatedAt?: Date | string | null
    lastImportedAt?: Date | string | null
    productsImported?: number | null
    isActive?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type FeedUncheckedCreateInput = {
    id?: number
    programId: number
    programName: string
    catalogId?: string | null
    catalogName?: string | null
    httpsLink?: string | null
    country?: string | null
    totalProducts?: number | null
    status?: string | null
    sourceUpdatedAt?: Date | string | null
    lastImportedAt?: Date | string | null
    productsImported?: number | null
    isActive?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type FeedUpdateInput = {
    programId?: IntFieldUpdateOperationsInput | number
    programName?: StringFieldUpdateOperationsInput | string
    catalogId?: NullableStringFieldUpdateOperationsInput | string | null
    catalogName?: NullableStringFieldUpdateOperationsInput | string | null
    httpsLink?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    totalProducts?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastImportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    productsImported?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FeedUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    programId?: IntFieldUpdateOperationsInput | number
    programName?: StringFieldUpdateOperationsInput | string
    catalogId?: NullableStringFieldUpdateOperationsInput | string | null
    catalogName?: NullableStringFieldUpdateOperationsInput | string | null
    httpsLink?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    totalProducts?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastImportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    productsImported?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FeedCreateManyInput = {
    id?: number
    programId: number
    programName: string
    catalogId?: string | null
    catalogName?: string | null
    httpsLink?: string | null
    country?: string | null
    totalProducts?: number | null
    status?: string | null
    sourceUpdatedAt?: Date | string | null
    lastImportedAt?: Date | string | null
    productsImported?: number | null
    isActive?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type FeedUpdateManyMutationInput = {
    programId?: IntFieldUpdateOperationsInput | number
    programName?: StringFieldUpdateOperationsInput | string
    catalogId?: NullableStringFieldUpdateOperationsInput | string | null
    catalogName?: NullableStringFieldUpdateOperationsInput | string | null
    httpsLink?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    totalProducts?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastImportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    productsImported?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FeedUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    programId?: IntFieldUpdateOperationsInput | number
    programName?: StringFieldUpdateOperationsInput | string
    catalogId?: NullableStringFieldUpdateOperationsInput | string | null
    catalogName?: NullableStringFieldUpdateOperationsInput | string | null
    httpsLink?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    totalProducts?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastImportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    productsImported?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VariantCreateInput = {
    programId?: number | null
    productId: string
    country?: string | null
    currency?: string | null
    name: string
    brand?: string | null
    description?: string | null
    price?: Decimal | DecimalJsLike | number | string | null
    finalPrice?: Decimal | DecimalJsLike | number | string | null
    discountPct?: number | null
    isOnSale?: boolean | null
    gender?: string | null
    category?: string | null
    subCategory?: string | null
    color?: string | null
    size?: string | null
    sku?: string | null
    url?: string | null
    imageUrl?: string | null
    inStock?: boolean | null
    visibility?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    parentSlug?: string | null
    variantSlug?: string | null
    normalizedName?: string | null
    advertiserName?: string | null
    region?: string | null
    group?: ProductCreateNestedOneWithoutVariantsInput
    bestFor?: ProductCreateNestedOneWithoutBestVariantInput
  }

  export type VariantUncheckedCreateInput = {
    id?: number
    programId?: number | null
    productId: string
    groupId?: number | null
    country?: string | null
    currency?: string | null
    name: string
    brand?: string | null
    description?: string | null
    price?: Decimal | DecimalJsLike | number | string | null
    finalPrice?: Decimal | DecimalJsLike | number | string | null
    discountPct?: number | null
    isOnSale?: boolean | null
    gender?: string | null
    category?: string | null
    subCategory?: string | null
    color?: string | null
    size?: string | null
    sku?: string | null
    url?: string | null
    imageUrl?: string | null
    inStock?: boolean | null
    visibility?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    parentSlug?: string | null
    variantSlug?: string | null
    normalizedName?: string | null
    advertiserName?: string | null
    region?: string | null
    bestFor?: ProductUncheckedCreateNestedOneWithoutBestVariantInput
  }

  export type VariantUpdateInput = {
    programId?: NullableIntFieldUpdateOperationsInput | number | null
    productId?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    finalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discountPct?: NullableIntFieldUpdateOperationsInput | number | null
    isOnSale?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: NullableBoolFieldUpdateOperationsInput | boolean | null
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentSlug?: NullableStringFieldUpdateOperationsInput | string | null
    variantSlug?: NullableStringFieldUpdateOperationsInput | string | null
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    advertiserName?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    group?: ProductUpdateOneWithoutVariantsNestedInput
    bestFor?: ProductUpdateOneWithoutBestVariantNestedInput
  }

  export type VariantUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    programId?: NullableIntFieldUpdateOperationsInput | number | null
    productId?: StringFieldUpdateOperationsInput | string
    groupId?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    finalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discountPct?: NullableIntFieldUpdateOperationsInput | number | null
    isOnSale?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: NullableBoolFieldUpdateOperationsInput | boolean | null
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentSlug?: NullableStringFieldUpdateOperationsInput | string | null
    variantSlug?: NullableStringFieldUpdateOperationsInput | string | null
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    advertiserName?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    bestFor?: ProductUncheckedUpdateOneWithoutBestVariantNestedInput
  }

  export type VariantCreateManyInput = {
    id?: number
    programId?: number | null
    productId: string
    groupId?: number | null
    country?: string | null
    currency?: string | null
    name: string
    brand?: string | null
    description?: string | null
    price?: Decimal | DecimalJsLike | number | string | null
    finalPrice?: Decimal | DecimalJsLike | number | string | null
    discountPct?: number | null
    isOnSale?: boolean | null
    gender?: string | null
    category?: string | null
    subCategory?: string | null
    color?: string | null
    size?: string | null
    sku?: string | null
    url?: string | null
    imageUrl?: string | null
    inStock?: boolean | null
    visibility?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    parentSlug?: string | null
    variantSlug?: string | null
    normalizedName?: string | null
    advertiserName?: string | null
    region?: string | null
  }

  export type VariantUpdateManyMutationInput = {
    programId?: NullableIntFieldUpdateOperationsInput | number | null
    productId?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    finalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discountPct?: NullableIntFieldUpdateOperationsInput | number | null
    isOnSale?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: NullableBoolFieldUpdateOperationsInput | boolean | null
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentSlug?: NullableStringFieldUpdateOperationsInput | string | null
    variantSlug?: NullableStringFieldUpdateOperationsInput | string | null
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    advertiserName?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VariantUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    programId?: NullableIntFieldUpdateOperationsInput | number | null
    productId?: StringFieldUpdateOperationsInput | string
    groupId?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    finalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discountPct?: NullableIntFieldUpdateOperationsInput | number | null
    isOnSale?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: NullableBoolFieldUpdateOperationsInput | boolean | null
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentSlug?: NullableStringFieldUpdateOperationsInput | string | null
    variantSlug?: NullableStringFieldUpdateOperationsInput | string | null
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    advertiserName?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductCreateInput = {
    slug: string
    name: string
    normalizedName?: string | null
    brand?: string | null
    gender?: string | null
    category?: string | null
    subCategory?: string | null
    country?: string | null
    region?: string | null
    bestPrice?: Decimal | DecimalJsLike | number | string | null
    imageUrl?: string | null
    url?: string | null
    inStock?: boolean | null
    isOnSale?: boolean | null
    discountPct?: number | null
    visibility?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    variants?: VariantCreateNestedManyWithoutGroupInput
    bestVariant?: VariantCreateNestedOneWithoutBestForInput
  }

  export type ProductUncheckedCreateInput = {
    id?: number
    slug: string
    name: string
    normalizedName?: string | null
    brand?: string | null
    gender?: string | null
    category?: string | null
    subCategory?: string | null
    country?: string | null
    region?: string | null
    bestVariantId?: number | null
    bestPrice?: Decimal | DecimalJsLike | number | string | null
    imageUrl?: string | null
    url?: string | null
    inStock?: boolean | null
    isOnSale?: boolean | null
    discountPct?: number | null
    visibility?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    variants?: VariantUncheckedCreateNestedManyWithoutGroupInput
  }

  export type ProductUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    bestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isOnSale?: NullableBoolFieldUpdateOperationsInput | boolean | null
    discountPct?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    variants?: VariantUpdateManyWithoutGroupNestedInput
    bestVariant?: VariantUpdateOneWithoutBestForNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    bestVariantId?: NullableIntFieldUpdateOperationsInput | number | null
    bestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isOnSale?: NullableBoolFieldUpdateOperationsInput | boolean | null
    discountPct?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    variants?: VariantUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type ProductCreateManyInput = {
    id?: number
    slug: string
    name: string
    normalizedName?: string | null
    brand?: string | null
    gender?: string | null
    category?: string | null
    subCategory?: string | null
    country?: string | null
    region?: string | null
    bestVariantId?: number | null
    bestPrice?: Decimal | DecimalJsLike | number | string | null
    imageUrl?: string | null
    url?: string | null
    inStock?: boolean | null
    isOnSale?: boolean | null
    discountPct?: number | null
    visibility?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type ProductUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    bestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isOnSale?: NullableBoolFieldUpdateOperationsInput | boolean | null
    discountPct?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    bestVariantId?: NullableIntFieldUpdateOperationsInput | number | null
    bestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isOnSale?: NullableBoolFieldUpdateOperationsInput | boolean | null
    discountPct?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PromotionCreateInput = {
    title: string
    description?: string | null
    couponCode?: string | null
    discountPercent?: Decimal | DecimalJsLike | number | string | null
    discountAmount?: Decimal | DecimalJsLike | number | string | null
    minimumPurchase?: Decimal | DecimalJsLike | number | string | null
    terms?: string | null
    url?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    isActive?: boolean | null
    isVerified?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    advertiser?: AdvertiserCreateNestedOneWithoutPromotionsInput
  }

  export type PromotionUncheckedCreateInput = {
    id?: number
    advertiserId?: number | null
    title: string
    description?: string | null
    couponCode?: string | null
    discountPercent?: Decimal | DecimalJsLike | number | string | null
    discountAmount?: Decimal | DecimalJsLike | number | string | null
    minimumPurchase?: Decimal | DecimalJsLike | number | string | null
    terms?: string | null
    url?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    isActive?: boolean | null
    isVerified?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type PromotionUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    discountPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discountAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    minimumPurchase?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    advertiser?: AdvertiserUpdateOneWithoutPromotionsNestedInput
  }

  export type PromotionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    advertiserId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    discountPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discountAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    minimumPurchase?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PromotionCreateManyInput = {
    id?: number
    advertiserId?: number | null
    title: string
    description?: string | null
    couponCode?: string | null
    discountPercent?: Decimal | DecimalJsLike | number | string | null
    discountAmount?: Decimal | DecimalJsLike | number | string | null
    minimumPurchase?: Decimal | DecimalJsLike | number | string | null
    terms?: string | null
    url?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    isActive?: boolean | null
    isVerified?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type PromotionUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    discountPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discountAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    minimumPurchase?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PromotionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    advertiserId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    discountPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discountAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    minimumPurchase?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncLogCreateInput = {
    runId: string
    startedAt: Date | string
    completedAt: Date | string
    durationMs: number
    feedsSynced: number
    totalImported: number
    staleHidden: number
    errors?: NullableJsonNullValueInput | InputJsonValue
    results?: NullableJsonNullValueInput | InputJsonValue
  }

  export type SyncLogUncheckedCreateInput = {
    id?: number
    runId: string
    startedAt: Date | string
    completedAt: Date | string
    durationMs: number
    feedsSynced: number
    totalImported: number
    staleHidden: number
    errors?: NullableJsonNullValueInput | InputJsonValue
    results?: NullableJsonNullValueInput | InputJsonValue
  }

  export type SyncLogUpdateInput = {
    runId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMs?: IntFieldUpdateOperationsInput | number
    feedsSynced?: IntFieldUpdateOperationsInput | number
    totalImported?: IntFieldUpdateOperationsInput | number
    staleHidden?: IntFieldUpdateOperationsInput | number
    errors?: NullableJsonNullValueInput | InputJsonValue
    results?: NullableJsonNullValueInput | InputJsonValue
  }

  export type SyncLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    runId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMs?: IntFieldUpdateOperationsInput | number
    feedsSynced?: IntFieldUpdateOperationsInput | number
    totalImported?: IntFieldUpdateOperationsInput | number
    staleHidden?: IntFieldUpdateOperationsInput | number
    errors?: NullableJsonNullValueInput | InputJsonValue
    results?: NullableJsonNullValueInput | InputJsonValue
  }

  export type SyncLogCreateManyInput = {
    id?: number
    runId: string
    startedAt: Date | string
    completedAt: Date | string
    durationMs: number
    feedsSynced: number
    totalImported: number
    staleHidden: number
    errors?: NullableJsonNullValueInput | InputJsonValue
    results?: NullableJsonNullValueInput | InputJsonValue
  }

  export type SyncLogUpdateManyMutationInput = {
    runId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMs?: IntFieldUpdateOperationsInput | number
    feedsSynced?: IntFieldUpdateOperationsInput | number
    totalImported?: IntFieldUpdateOperationsInput | number
    staleHidden?: IntFieldUpdateOperationsInput | number
    errors?: NullableJsonNullValueInput | InputJsonValue
    results?: NullableJsonNullValueInput | InputJsonValue
  }

  export type SyncLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    runId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMs?: IntFieldUpdateOperationsInput | number
    feedsSynced?: IntFieldUpdateOperationsInput | number
    totalImported?: IntFieldUpdateOperationsInput | number
    staleHidden?: IntFieldUpdateOperationsInput | number
    errors?: NullableJsonNullValueInput | InputJsonValue
    results?: NullableJsonNullValueInput | InputJsonValue
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AdvertiserVoteAdvertiserNameFingerprintCompoundUniqueInput = {
    advertiserName: string
    fingerprint: string
  }

  export type AdvertiserVoteCountOrderByAggregateInput = {
    id?: SortOrder
    advertiserName?: SortOrder
    fingerprint?: SortOrder
    vote?: SortOrder
    createdAt?: SortOrder
  }

  export type AdvertiserVoteAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AdvertiserVoteMaxOrderByAggregateInput = {
    id?: SortOrder
    advertiserName?: SortOrder
    fingerprint?: SortOrder
    vote?: SortOrder
    createdAt?: SortOrder
  }

  export type AdvertiserVoteMinOrderByAggregateInput = {
    id?: SortOrder
    advertiserName?: SortOrder
    fingerprint?: SortOrder
    vote?: SortOrder
    createdAt?: SortOrder
  }

  export type AdvertiserVoteSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type PromotionListRelationFilter = {
    every?: PromotionWhereInput
    some?: PromotionWhereInput
    none?: PromotionWhereInput
  }

  export type PromotionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AdvertiserCountOrderByAggregateInput = {
    advertiserId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoUrl?: SortOrder
    url?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    healthScore?: SortOrder
  }

  export type AdvertiserAvgOrderByAggregateInput = {
    advertiserId?: SortOrder
    healthScore?: SortOrder
  }

  export type AdvertiserMaxOrderByAggregateInput = {
    advertiserId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoUrl?: SortOrder
    url?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    healthScore?: SortOrder
  }

  export type AdvertiserMinOrderByAggregateInput = {
    advertiserId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoUrl?: SortOrder
    url?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    healthScore?: SortOrder
  }

  export type AdvertiserSumOrderByAggregateInput = {
    advertiserId?: SortOrder
    healthScore?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DealHealthVoteCountOrderByAggregateInput = {
    id?: SortOrder
    productSlug?: SortOrder
    vote?: SortOrder
    fingerprint?: SortOrder
    createdAt?: SortOrder
  }

  export type DealHealthVoteAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DealHealthVoteMaxOrderByAggregateInput = {
    id?: SortOrder
    productSlug?: SortOrder
    vote?: SortOrder
    fingerprint?: SortOrder
    createdAt?: SortOrder
  }

  export type DealHealthVoteMinOrderByAggregateInput = {
    id?: SortOrder
    productSlug?: SortOrder
    vote?: SortOrder
    fingerprint?: SortOrder
    createdAt?: SortOrder
  }

  export type DealHealthVoteSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FeedCountOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    programName?: SortOrder
    catalogId?: SortOrder
    catalogName?: SortOrder
    httpsLink?: SortOrder
    country?: SortOrder
    totalProducts?: SortOrder
    status?: SortOrder
    sourceUpdatedAt?: SortOrder
    lastImportedAt?: SortOrder
    productsImported?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeedAvgOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    totalProducts?: SortOrder
    productsImported?: SortOrder
  }

  export type FeedMaxOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    programName?: SortOrder
    catalogId?: SortOrder
    catalogName?: SortOrder
    httpsLink?: SortOrder
    country?: SortOrder
    totalProducts?: SortOrder
    status?: SortOrder
    sourceUpdatedAt?: SortOrder
    lastImportedAt?: SortOrder
    productsImported?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeedMinOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    programName?: SortOrder
    catalogId?: SortOrder
    catalogName?: SortOrder
    httpsLink?: SortOrder
    country?: SortOrder
    totalProducts?: SortOrder
    status?: SortOrder
    sourceUpdatedAt?: SortOrder
    lastImportedAt?: SortOrder
    productsImported?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeedSumOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    totalProducts?: SortOrder
    productsImported?: SortOrder
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type ProductNullableScalarRelationFilter = {
    is?: ProductWhereInput | null
    isNot?: ProductWhereInput | null
  }

  export type VariantProgramIdProductIdCompoundUniqueInput = {
    programId: number
    productId: string
  }

  export type VariantCountOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    productId?: SortOrder
    groupId?: SortOrder
    country?: SortOrder
    currency?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    description?: SortOrder
    price?: SortOrder
    finalPrice?: SortOrder
    discountPct?: SortOrder
    isOnSale?: SortOrder
    gender?: SortOrder
    category?: SortOrder
    subCategory?: SortOrder
    color?: SortOrder
    size?: SortOrder
    sku?: SortOrder
    url?: SortOrder
    imageUrl?: SortOrder
    inStock?: SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parentSlug?: SortOrder
    variantSlug?: SortOrder
    normalizedName?: SortOrder
    advertiserName?: SortOrder
    region?: SortOrder
  }

  export type VariantAvgOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    groupId?: SortOrder
    price?: SortOrder
    finalPrice?: SortOrder
    discountPct?: SortOrder
  }

  export type VariantMaxOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    productId?: SortOrder
    groupId?: SortOrder
    country?: SortOrder
    currency?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    description?: SortOrder
    price?: SortOrder
    finalPrice?: SortOrder
    discountPct?: SortOrder
    isOnSale?: SortOrder
    gender?: SortOrder
    category?: SortOrder
    subCategory?: SortOrder
    color?: SortOrder
    size?: SortOrder
    sku?: SortOrder
    url?: SortOrder
    imageUrl?: SortOrder
    inStock?: SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parentSlug?: SortOrder
    variantSlug?: SortOrder
    normalizedName?: SortOrder
    advertiserName?: SortOrder
    region?: SortOrder
  }

  export type VariantMinOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    productId?: SortOrder
    groupId?: SortOrder
    country?: SortOrder
    currency?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    description?: SortOrder
    price?: SortOrder
    finalPrice?: SortOrder
    discountPct?: SortOrder
    isOnSale?: SortOrder
    gender?: SortOrder
    category?: SortOrder
    subCategory?: SortOrder
    color?: SortOrder
    size?: SortOrder
    sku?: SortOrder
    url?: SortOrder
    imageUrl?: SortOrder
    inStock?: SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parentSlug?: SortOrder
    variantSlug?: SortOrder
    normalizedName?: SortOrder
    advertiserName?: SortOrder
    region?: SortOrder
  }

  export type VariantSumOrderByAggregateInput = {
    id?: SortOrder
    programId?: SortOrder
    groupId?: SortOrder
    price?: SortOrder
    finalPrice?: SortOrder
    discountPct?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type VariantListRelationFilter = {
    every?: VariantWhereInput
    some?: VariantWhereInput
    none?: VariantWhereInput
  }

  export type VariantNullableScalarRelationFilter = {
    is?: VariantWhereInput | null
    isNot?: VariantWhereInput | null
  }

  export type VariantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    normalizedName?: SortOrder
    brand?: SortOrder
    gender?: SortOrder
    category?: SortOrder
    subCategory?: SortOrder
    country?: SortOrder
    region?: SortOrder
    bestVariantId?: SortOrder
    bestPrice?: SortOrder
    imageUrl?: SortOrder
    url?: SortOrder
    inStock?: SortOrder
    isOnSale?: SortOrder
    discountPct?: SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    id?: SortOrder
    bestVariantId?: SortOrder
    bestPrice?: SortOrder
    discountPct?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    normalizedName?: SortOrder
    brand?: SortOrder
    gender?: SortOrder
    category?: SortOrder
    subCategory?: SortOrder
    country?: SortOrder
    region?: SortOrder
    bestVariantId?: SortOrder
    bestPrice?: SortOrder
    imageUrl?: SortOrder
    url?: SortOrder
    inStock?: SortOrder
    isOnSale?: SortOrder
    discountPct?: SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    normalizedName?: SortOrder
    brand?: SortOrder
    gender?: SortOrder
    category?: SortOrder
    subCategory?: SortOrder
    country?: SortOrder
    region?: SortOrder
    bestVariantId?: SortOrder
    bestPrice?: SortOrder
    imageUrl?: SortOrder
    url?: SortOrder
    inStock?: SortOrder
    isOnSale?: SortOrder
    discountPct?: SortOrder
    visibility?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    id?: SortOrder
    bestVariantId?: SortOrder
    bestPrice?: SortOrder
    discountPct?: SortOrder
  }

  export type AdvertiserNullableScalarRelationFilter = {
    is?: AdvertiserWhereInput | null
    isNot?: AdvertiserWhereInput | null
  }

  export type PromotionCountOrderByAggregateInput = {
    id?: SortOrder
    advertiserId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    couponCode?: SortOrder
    discountPercent?: SortOrder
    discountAmount?: SortOrder
    minimumPurchase?: SortOrder
    terms?: SortOrder
    url?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PromotionAvgOrderByAggregateInput = {
    id?: SortOrder
    advertiserId?: SortOrder
    discountPercent?: SortOrder
    discountAmount?: SortOrder
    minimumPurchase?: SortOrder
  }

  export type PromotionMaxOrderByAggregateInput = {
    id?: SortOrder
    advertiserId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    couponCode?: SortOrder
    discountPercent?: SortOrder
    discountAmount?: SortOrder
    minimumPurchase?: SortOrder
    terms?: SortOrder
    url?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PromotionMinOrderByAggregateInput = {
    id?: SortOrder
    advertiserId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    couponCode?: SortOrder
    discountPercent?: SortOrder
    discountAmount?: SortOrder
    minimumPurchase?: SortOrder
    terms?: SortOrder
    url?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PromotionSumOrderByAggregateInput = {
    id?: SortOrder
    advertiserId?: SortOrder
    discountPercent?: SortOrder
    discountAmount?: SortOrder
    minimumPurchase?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SyncLogCountOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    durationMs?: SortOrder
    feedsSynced?: SortOrder
    totalImported?: SortOrder
    staleHidden?: SortOrder
    errors?: SortOrder
    results?: SortOrder
  }

  export type SyncLogAvgOrderByAggregateInput = {
    id?: SortOrder
    durationMs?: SortOrder
    feedsSynced?: SortOrder
    totalImported?: SortOrder
    staleHidden?: SortOrder
  }

  export type SyncLogMaxOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    durationMs?: SortOrder
    feedsSynced?: SortOrder
    totalImported?: SortOrder
    staleHidden?: SortOrder
  }

  export type SyncLogMinOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    durationMs?: SortOrder
    feedsSynced?: SortOrder
    totalImported?: SortOrder
    staleHidden?: SortOrder
  }

  export type SyncLogSumOrderByAggregateInput = {
    id?: SortOrder
    durationMs?: SortOrder
    feedsSynced?: SortOrder
    totalImported?: SortOrder
    staleHidden?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PromotionCreateNestedManyWithoutAdvertiserInput = {
    create?: XOR<PromotionCreateWithoutAdvertiserInput, PromotionUncheckedCreateWithoutAdvertiserInput> | PromotionCreateWithoutAdvertiserInput[] | PromotionUncheckedCreateWithoutAdvertiserInput[]
    connectOrCreate?: PromotionCreateOrConnectWithoutAdvertiserInput | PromotionCreateOrConnectWithoutAdvertiserInput[]
    createMany?: PromotionCreateManyAdvertiserInputEnvelope
    connect?: PromotionWhereUniqueInput | PromotionWhereUniqueInput[]
  }

  export type PromotionUncheckedCreateNestedManyWithoutAdvertiserInput = {
    create?: XOR<PromotionCreateWithoutAdvertiserInput, PromotionUncheckedCreateWithoutAdvertiserInput> | PromotionCreateWithoutAdvertiserInput[] | PromotionUncheckedCreateWithoutAdvertiserInput[]
    connectOrCreate?: PromotionCreateOrConnectWithoutAdvertiserInput | PromotionCreateOrConnectWithoutAdvertiserInput[]
    createMany?: PromotionCreateManyAdvertiserInputEnvelope
    connect?: PromotionWhereUniqueInput | PromotionWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PromotionUpdateManyWithoutAdvertiserNestedInput = {
    create?: XOR<PromotionCreateWithoutAdvertiserInput, PromotionUncheckedCreateWithoutAdvertiserInput> | PromotionCreateWithoutAdvertiserInput[] | PromotionUncheckedCreateWithoutAdvertiserInput[]
    connectOrCreate?: PromotionCreateOrConnectWithoutAdvertiserInput | PromotionCreateOrConnectWithoutAdvertiserInput[]
    upsert?: PromotionUpsertWithWhereUniqueWithoutAdvertiserInput | PromotionUpsertWithWhereUniqueWithoutAdvertiserInput[]
    createMany?: PromotionCreateManyAdvertiserInputEnvelope
    set?: PromotionWhereUniqueInput | PromotionWhereUniqueInput[]
    disconnect?: PromotionWhereUniqueInput | PromotionWhereUniqueInput[]
    delete?: PromotionWhereUniqueInput | PromotionWhereUniqueInput[]
    connect?: PromotionWhereUniqueInput | PromotionWhereUniqueInput[]
    update?: PromotionUpdateWithWhereUniqueWithoutAdvertiserInput | PromotionUpdateWithWhereUniqueWithoutAdvertiserInput[]
    updateMany?: PromotionUpdateManyWithWhereWithoutAdvertiserInput | PromotionUpdateManyWithWhereWithoutAdvertiserInput[]
    deleteMany?: PromotionScalarWhereInput | PromotionScalarWhereInput[]
  }

  export type PromotionUncheckedUpdateManyWithoutAdvertiserNestedInput = {
    create?: XOR<PromotionCreateWithoutAdvertiserInput, PromotionUncheckedCreateWithoutAdvertiserInput> | PromotionCreateWithoutAdvertiserInput[] | PromotionUncheckedCreateWithoutAdvertiserInput[]
    connectOrCreate?: PromotionCreateOrConnectWithoutAdvertiserInput | PromotionCreateOrConnectWithoutAdvertiserInput[]
    upsert?: PromotionUpsertWithWhereUniqueWithoutAdvertiserInput | PromotionUpsertWithWhereUniqueWithoutAdvertiserInput[]
    createMany?: PromotionCreateManyAdvertiserInputEnvelope
    set?: PromotionWhereUniqueInput | PromotionWhereUniqueInput[]
    disconnect?: PromotionWhereUniqueInput | PromotionWhereUniqueInput[]
    delete?: PromotionWhereUniqueInput | PromotionWhereUniqueInput[]
    connect?: PromotionWhereUniqueInput | PromotionWhereUniqueInput[]
    update?: PromotionUpdateWithWhereUniqueWithoutAdvertiserInput | PromotionUpdateWithWhereUniqueWithoutAdvertiserInput[]
    updateMany?: PromotionUpdateManyWithWhereWithoutAdvertiserInput | PromotionUpdateManyWithWhereWithoutAdvertiserInput[]
    deleteMany?: PromotionScalarWhereInput | PromotionScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutVariantsInput = {
    create?: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutVariantsInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutBestVariantInput = {
    create?: XOR<ProductCreateWithoutBestVariantInput, ProductUncheckedCreateWithoutBestVariantInput>
    connectOrCreate?: ProductCreateOrConnectWithoutBestVariantInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUncheckedCreateNestedOneWithoutBestVariantInput = {
    create?: XOR<ProductCreateWithoutBestVariantInput, ProductUncheckedCreateWithoutBestVariantInput>
    connectOrCreate?: ProductCreateOrConnectWithoutBestVariantInput
    connect?: ProductWhereUniqueInput
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type ProductUpdateOneWithoutVariantsNestedInput = {
    create?: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutVariantsInput
    upsert?: ProductUpsertWithoutVariantsInput
    disconnect?: ProductWhereInput | boolean
    delete?: ProductWhereInput | boolean
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutVariantsInput, ProductUpdateWithoutVariantsInput>, ProductUncheckedUpdateWithoutVariantsInput>
  }

  export type ProductUpdateOneWithoutBestVariantNestedInput = {
    create?: XOR<ProductCreateWithoutBestVariantInput, ProductUncheckedCreateWithoutBestVariantInput>
    connectOrCreate?: ProductCreateOrConnectWithoutBestVariantInput
    upsert?: ProductUpsertWithoutBestVariantInput
    disconnect?: ProductWhereInput | boolean
    delete?: ProductWhereInput | boolean
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutBestVariantInput, ProductUpdateWithoutBestVariantInput>, ProductUncheckedUpdateWithoutBestVariantInput>
  }

  export type ProductUncheckedUpdateOneWithoutBestVariantNestedInput = {
    create?: XOR<ProductCreateWithoutBestVariantInput, ProductUncheckedCreateWithoutBestVariantInput>
    connectOrCreate?: ProductCreateOrConnectWithoutBestVariantInput
    upsert?: ProductUpsertWithoutBestVariantInput
    disconnect?: ProductWhereInput | boolean
    delete?: ProductWhereInput | boolean
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutBestVariantInput, ProductUpdateWithoutBestVariantInput>, ProductUncheckedUpdateWithoutBestVariantInput>
  }

  export type VariantCreateNestedManyWithoutGroupInput = {
    create?: XOR<VariantCreateWithoutGroupInput, VariantUncheckedCreateWithoutGroupInput> | VariantCreateWithoutGroupInput[] | VariantUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: VariantCreateOrConnectWithoutGroupInput | VariantCreateOrConnectWithoutGroupInput[]
    createMany?: VariantCreateManyGroupInputEnvelope
    connect?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
  }

  export type VariantCreateNestedOneWithoutBestForInput = {
    create?: XOR<VariantCreateWithoutBestForInput, VariantUncheckedCreateWithoutBestForInput>
    connectOrCreate?: VariantCreateOrConnectWithoutBestForInput
    connect?: VariantWhereUniqueInput
  }

  export type VariantUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<VariantCreateWithoutGroupInput, VariantUncheckedCreateWithoutGroupInput> | VariantCreateWithoutGroupInput[] | VariantUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: VariantCreateOrConnectWithoutGroupInput | VariantCreateOrConnectWithoutGroupInput[]
    createMany?: VariantCreateManyGroupInputEnvelope
    connect?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
  }

  export type VariantUpdateManyWithoutGroupNestedInput = {
    create?: XOR<VariantCreateWithoutGroupInput, VariantUncheckedCreateWithoutGroupInput> | VariantCreateWithoutGroupInput[] | VariantUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: VariantCreateOrConnectWithoutGroupInput | VariantCreateOrConnectWithoutGroupInput[]
    upsert?: VariantUpsertWithWhereUniqueWithoutGroupInput | VariantUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: VariantCreateManyGroupInputEnvelope
    set?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    disconnect?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    delete?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    connect?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    update?: VariantUpdateWithWhereUniqueWithoutGroupInput | VariantUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: VariantUpdateManyWithWhereWithoutGroupInput | VariantUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: VariantScalarWhereInput | VariantScalarWhereInput[]
  }

  export type VariantUpdateOneWithoutBestForNestedInput = {
    create?: XOR<VariantCreateWithoutBestForInput, VariantUncheckedCreateWithoutBestForInput>
    connectOrCreate?: VariantCreateOrConnectWithoutBestForInput
    upsert?: VariantUpsertWithoutBestForInput
    disconnect?: VariantWhereInput | boolean
    delete?: VariantWhereInput | boolean
    connect?: VariantWhereUniqueInput
    update?: XOR<XOR<VariantUpdateToOneWithWhereWithoutBestForInput, VariantUpdateWithoutBestForInput>, VariantUncheckedUpdateWithoutBestForInput>
  }

  export type VariantUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<VariantCreateWithoutGroupInput, VariantUncheckedCreateWithoutGroupInput> | VariantCreateWithoutGroupInput[] | VariantUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: VariantCreateOrConnectWithoutGroupInput | VariantCreateOrConnectWithoutGroupInput[]
    upsert?: VariantUpsertWithWhereUniqueWithoutGroupInput | VariantUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: VariantCreateManyGroupInputEnvelope
    set?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    disconnect?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    delete?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    connect?: VariantWhereUniqueInput | VariantWhereUniqueInput[]
    update?: VariantUpdateWithWhereUniqueWithoutGroupInput | VariantUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: VariantUpdateManyWithWhereWithoutGroupInput | VariantUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: VariantScalarWhereInput | VariantScalarWhereInput[]
  }

  export type AdvertiserCreateNestedOneWithoutPromotionsInput = {
    create?: XOR<AdvertiserCreateWithoutPromotionsInput, AdvertiserUncheckedCreateWithoutPromotionsInput>
    connectOrCreate?: AdvertiserCreateOrConnectWithoutPromotionsInput
    connect?: AdvertiserWhereUniqueInput
  }

  export type AdvertiserUpdateOneWithoutPromotionsNestedInput = {
    create?: XOR<AdvertiserCreateWithoutPromotionsInput, AdvertiserUncheckedCreateWithoutPromotionsInput>
    connectOrCreate?: AdvertiserCreateOrConnectWithoutPromotionsInput
    upsert?: AdvertiserUpsertWithoutPromotionsInput
    disconnect?: AdvertiserWhereInput | boolean
    delete?: AdvertiserWhereInput | boolean
    connect?: AdvertiserWhereUniqueInput
    update?: XOR<XOR<AdvertiserUpdateToOneWithWhereWithoutPromotionsInput, AdvertiserUpdateWithoutPromotionsInput>, AdvertiserUncheckedUpdateWithoutPromotionsInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PromotionCreateWithoutAdvertiserInput = {
    title: string
    description?: string | null
    couponCode?: string | null
    discountPercent?: Decimal | DecimalJsLike | number | string | null
    discountAmount?: Decimal | DecimalJsLike | number | string | null
    minimumPurchase?: Decimal | DecimalJsLike | number | string | null
    terms?: string | null
    url?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    isActive?: boolean | null
    isVerified?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type PromotionUncheckedCreateWithoutAdvertiserInput = {
    id?: number
    title: string
    description?: string | null
    couponCode?: string | null
    discountPercent?: Decimal | DecimalJsLike | number | string | null
    discountAmount?: Decimal | DecimalJsLike | number | string | null
    minimumPurchase?: Decimal | DecimalJsLike | number | string | null
    terms?: string | null
    url?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    isActive?: boolean | null
    isVerified?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type PromotionCreateOrConnectWithoutAdvertiserInput = {
    where: PromotionWhereUniqueInput
    create: XOR<PromotionCreateWithoutAdvertiserInput, PromotionUncheckedCreateWithoutAdvertiserInput>
  }

  export type PromotionCreateManyAdvertiserInputEnvelope = {
    data: PromotionCreateManyAdvertiserInput | PromotionCreateManyAdvertiserInput[]
    skipDuplicates?: boolean
  }

  export type PromotionUpsertWithWhereUniqueWithoutAdvertiserInput = {
    where: PromotionWhereUniqueInput
    update: XOR<PromotionUpdateWithoutAdvertiserInput, PromotionUncheckedUpdateWithoutAdvertiserInput>
    create: XOR<PromotionCreateWithoutAdvertiserInput, PromotionUncheckedCreateWithoutAdvertiserInput>
  }

  export type PromotionUpdateWithWhereUniqueWithoutAdvertiserInput = {
    where: PromotionWhereUniqueInput
    data: XOR<PromotionUpdateWithoutAdvertiserInput, PromotionUncheckedUpdateWithoutAdvertiserInput>
  }

  export type PromotionUpdateManyWithWhereWithoutAdvertiserInput = {
    where: PromotionScalarWhereInput
    data: XOR<PromotionUpdateManyMutationInput, PromotionUncheckedUpdateManyWithoutAdvertiserInput>
  }

  export type PromotionScalarWhereInput = {
    AND?: PromotionScalarWhereInput | PromotionScalarWhereInput[]
    OR?: PromotionScalarWhereInput[]
    NOT?: PromotionScalarWhereInput | PromotionScalarWhereInput[]
    id?: IntFilter<"Promotion"> | number
    advertiserId?: IntNullableFilter<"Promotion"> | number | null
    title?: StringFilter<"Promotion"> | string
    description?: StringNullableFilter<"Promotion"> | string | null
    couponCode?: StringNullableFilter<"Promotion"> | string | null
    discountPercent?: DecimalNullableFilter<"Promotion"> | Decimal | DecimalJsLike | number | string | null
    discountAmount?: DecimalNullableFilter<"Promotion"> | Decimal | DecimalJsLike | number | string | null
    minimumPurchase?: DecimalNullableFilter<"Promotion"> | Decimal | DecimalJsLike | number | string | null
    terms?: StringNullableFilter<"Promotion"> | string | null
    url?: StringNullableFilter<"Promotion"> | string | null
    startDate?: DateTimeNullableFilter<"Promotion"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Promotion"> | Date | string | null
    isActive?: BoolNullableFilter<"Promotion"> | boolean | null
    isVerified?: BoolNullableFilter<"Promotion"> | boolean | null
    createdAt?: DateTimeNullableFilter<"Promotion"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Promotion"> | Date | string | null
  }

  export type ProductCreateWithoutVariantsInput = {
    slug: string
    name: string
    normalizedName?: string | null
    brand?: string | null
    gender?: string | null
    category?: string | null
    subCategory?: string | null
    country?: string | null
    region?: string | null
    bestPrice?: Decimal | DecimalJsLike | number | string | null
    imageUrl?: string | null
    url?: string | null
    inStock?: boolean | null
    isOnSale?: boolean | null
    discountPct?: number | null
    visibility?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    bestVariant?: VariantCreateNestedOneWithoutBestForInput
  }

  export type ProductUncheckedCreateWithoutVariantsInput = {
    id?: number
    slug: string
    name: string
    normalizedName?: string | null
    brand?: string | null
    gender?: string | null
    category?: string | null
    subCategory?: string | null
    country?: string | null
    region?: string | null
    bestVariantId?: number | null
    bestPrice?: Decimal | DecimalJsLike | number | string | null
    imageUrl?: string | null
    url?: string | null
    inStock?: boolean | null
    isOnSale?: boolean | null
    discountPct?: number | null
    visibility?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type ProductCreateOrConnectWithoutVariantsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
  }

  export type ProductCreateWithoutBestVariantInput = {
    slug: string
    name: string
    normalizedName?: string | null
    brand?: string | null
    gender?: string | null
    category?: string | null
    subCategory?: string | null
    country?: string | null
    region?: string | null
    bestPrice?: Decimal | DecimalJsLike | number | string | null
    imageUrl?: string | null
    url?: string | null
    inStock?: boolean | null
    isOnSale?: boolean | null
    discountPct?: number | null
    visibility?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    variants?: VariantCreateNestedManyWithoutGroupInput
  }

  export type ProductUncheckedCreateWithoutBestVariantInput = {
    id?: number
    slug: string
    name: string
    normalizedName?: string | null
    brand?: string | null
    gender?: string | null
    category?: string | null
    subCategory?: string | null
    country?: string | null
    region?: string | null
    bestPrice?: Decimal | DecimalJsLike | number | string | null
    imageUrl?: string | null
    url?: string | null
    inStock?: boolean | null
    isOnSale?: boolean | null
    discountPct?: number | null
    visibility?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    variants?: VariantUncheckedCreateNestedManyWithoutGroupInput
  }

  export type ProductCreateOrConnectWithoutBestVariantInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutBestVariantInput, ProductUncheckedCreateWithoutBestVariantInput>
  }

  export type ProductUpsertWithoutVariantsInput = {
    update: XOR<ProductUpdateWithoutVariantsInput, ProductUncheckedUpdateWithoutVariantsInput>
    create: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutVariantsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutVariantsInput, ProductUncheckedUpdateWithoutVariantsInput>
  }

  export type ProductUpdateWithoutVariantsInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    bestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isOnSale?: NullableBoolFieldUpdateOperationsInput | boolean | null
    discountPct?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bestVariant?: VariantUpdateOneWithoutBestForNestedInput
  }

  export type ProductUncheckedUpdateWithoutVariantsInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    bestVariantId?: NullableIntFieldUpdateOperationsInput | number | null
    bestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isOnSale?: NullableBoolFieldUpdateOperationsInput | boolean | null
    discountPct?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductUpsertWithoutBestVariantInput = {
    update: XOR<ProductUpdateWithoutBestVariantInput, ProductUncheckedUpdateWithoutBestVariantInput>
    create: XOR<ProductCreateWithoutBestVariantInput, ProductUncheckedCreateWithoutBestVariantInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutBestVariantInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutBestVariantInput, ProductUncheckedUpdateWithoutBestVariantInput>
  }

  export type ProductUpdateWithoutBestVariantInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    bestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isOnSale?: NullableBoolFieldUpdateOperationsInput | boolean | null
    discountPct?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    variants?: VariantUpdateManyWithoutGroupNestedInput
  }

  export type ProductUncheckedUpdateWithoutBestVariantInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    bestPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isOnSale?: NullableBoolFieldUpdateOperationsInput | boolean | null
    discountPct?: NullableIntFieldUpdateOperationsInput | number | null
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    variants?: VariantUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type VariantCreateWithoutGroupInput = {
    programId?: number | null
    productId: string
    country?: string | null
    currency?: string | null
    name: string
    brand?: string | null
    description?: string | null
    price?: Decimal | DecimalJsLike | number | string | null
    finalPrice?: Decimal | DecimalJsLike | number | string | null
    discountPct?: number | null
    isOnSale?: boolean | null
    gender?: string | null
    category?: string | null
    subCategory?: string | null
    color?: string | null
    size?: string | null
    sku?: string | null
    url?: string | null
    imageUrl?: string | null
    inStock?: boolean | null
    visibility?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    parentSlug?: string | null
    variantSlug?: string | null
    normalizedName?: string | null
    advertiserName?: string | null
    region?: string | null
    bestFor?: ProductCreateNestedOneWithoutBestVariantInput
  }

  export type VariantUncheckedCreateWithoutGroupInput = {
    id?: number
    programId?: number | null
    productId: string
    country?: string | null
    currency?: string | null
    name: string
    brand?: string | null
    description?: string | null
    price?: Decimal | DecimalJsLike | number | string | null
    finalPrice?: Decimal | DecimalJsLike | number | string | null
    discountPct?: number | null
    isOnSale?: boolean | null
    gender?: string | null
    category?: string | null
    subCategory?: string | null
    color?: string | null
    size?: string | null
    sku?: string | null
    url?: string | null
    imageUrl?: string | null
    inStock?: boolean | null
    visibility?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    parentSlug?: string | null
    variantSlug?: string | null
    normalizedName?: string | null
    advertiserName?: string | null
    region?: string | null
    bestFor?: ProductUncheckedCreateNestedOneWithoutBestVariantInput
  }

  export type VariantCreateOrConnectWithoutGroupInput = {
    where: VariantWhereUniqueInput
    create: XOR<VariantCreateWithoutGroupInput, VariantUncheckedCreateWithoutGroupInput>
  }

  export type VariantCreateManyGroupInputEnvelope = {
    data: VariantCreateManyGroupInput | VariantCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type VariantCreateWithoutBestForInput = {
    programId?: number | null
    productId: string
    country?: string | null
    currency?: string | null
    name: string
    brand?: string | null
    description?: string | null
    price?: Decimal | DecimalJsLike | number | string | null
    finalPrice?: Decimal | DecimalJsLike | number | string | null
    discountPct?: number | null
    isOnSale?: boolean | null
    gender?: string | null
    category?: string | null
    subCategory?: string | null
    color?: string | null
    size?: string | null
    sku?: string | null
    url?: string | null
    imageUrl?: string | null
    inStock?: boolean | null
    visibility?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    parentSlug?: string | null
    variantSlug?: string | null
    normalizedName?: string | null
    advertiserName?: string | null
    region?: string | null
    group?: ProductCreateNestedOneWithoutVariantsInput
  }

  export type VariantUncheckedCreateWithoutBestForInput = {
    id?: number
    programId?: number | null
    productId: string
    groupId?: number | null
    country?: string | null
    currency?: string | null
    name: string
    brand?: string | null
    description?: string | null
    price?: Decimal | DecimalJsLike | number | string | null
    finalPrice?: Decimal | DecimalJsLike | number | string | null
    discountPct?: number | null
    isOnSale?: boolean | null
    gender?: string | null
    category?: string | null
    subCategory?: string | null
    color?: string | null
    size?: string | null
    sku?: string | null
    url?: string | null
    imageUrl?: string | null
    inStock?: boolean | null
    visibility?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    parentSlug?: string | null
    variantSlug?: string | null
    normalizedName?: string | null
    advertiserName?: string | null
    region?: string | null
  }

  export type VariantCreateOrConnectWithoutBestForInput = {
    where: VariantWhereUniqueInput
    create: XOR<VariantCreateWithoutBestForInput, VariantUncheckedCreateWithoutBestForInput>
  }

  export type VariantUpsertWithWhereUniqueWithoutGroupInput = {
    where: VariantWhereUniqueInput
    update: XOR<VariantUpdateWithoutGroupInput, VariantUncheckedUpdateWithoutGroupInput>
    create: XOR<VariantCreateWithoutGroupInput, VariantUncheckedCreateWithoutGroupInput>
  }

  export type VariantUpdateWithWhereUniqueWithoutGroupInput = {
    where: VariantWhereUniqueInput
    data: XOR<VariantUpdateWithoutGroupInput, VariantUncheckedUpdateWithoutGroupInput>
  }

  export type VariantUpdateManyWithWhereWithoutGroupInput = {
    where: VariantScalarWhereInput
    data: XOR<VariantUpdateManyMutationInput, VariantUncheckedUpdateManyWithoutGroupInput>
  }

  export type VariantScalarWhereInput = {
    AND?: VariantScalarWhereInput | VariantScalarWhereInput[]
    OR?: VariantScalarWhereInput[]
    NOT?: VariantScalarWhereInput | VariantScalarWhereInput[]
    id?: IntFilter<"Variant"> | number
    programId?: IntNullableFilter<"Variant"> | number | null
    productId?: StringFilter<"Variant"> | string
    groupId?: IntNullableFilter<"Variant"> | number | null
    country?: StringNullableFilter<"Variant"> | string | null
    currency?: StringNullableFilter<"Variant"> | string | null
    name?: StringFilter<"Variant"> | string
    brand?: StringNullableFilter<"Variant"> | string | null
    description?: StringNullableFilter<"Variant"> | string | null
    price?: DecimalNullableFilter<"Variant"> | Decimal | DecimalJsLike | number | string | null
    finalPrice?: DecimalNullableFilter<"Variant"> | Decimal | DecimalJsLike | number | string | null
    discountPct?: IntNullableFilter<"Variant"> | number | null
    isOnSale?: BoolNullableFilter<"Variant"> | boolean | null
    gender?: StringNullableFilter<"Variant"> | string | null
    category?: StringNullableFilter<"Variant"> | string | null
    subCategory?: StringNullableFilter<"Variant"> | string | null
    color?: StringNullableFilter<"Variant"> | string | null
    size?: StringNullableFilter<"Variant"> | string | null
    sku?: StringNullableFilter<"Variant"> | string | null
    url?: StringNullableFilter<"Variant"> | string | null
    imageUrl?: StringNullableFilter<"Variant"> | string | null
    inStock?: BoolNullableFilter<"Variant"> | boolean | null
    visibility?: StringNullableFilter<"Variant"> | string | null
    createdAt?: DateTimeNullableFilter<"Variant"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Variant"> | Date | string | null
    parentSlug?: StringNullableFilter<"Variant"> | string | null
    variantSlug?: StringNullableFilter<"Variant"> | string | null
    normalizedName?: StringNullableFilter<"Variant"> | string | null
    advertiserName?: StringNullableFilter<"Variant"> | string | null
    region?: StringNullableFilter<"Variant"> | string | null
  }

  export type VariantUpsertWithoutBestForInput = {
    update: XOR<VariantUpdateWithoutBestForInput, VariantUncheckedUpdateWithoutBestForInput>
    create: XOR<VariantCreateWithoutBestForInput, VariantUncheckedCreateWithoutBestForInput>
    where?: VariantWhereInput
  }

  export type VariantUpdateToOneWithWhereWithoutBestForInput = {
    where?: VariantWhereInput
    data: XOR<VariantUpdateWithoutBestForInput, VariantUncheckedUpdateWithoutBestForInput>
  }

  export type VariantUpdateWithoutBestForInput = {
    programId?: NullableIntFieldUpdateOperationsInput | number | null
    productId?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    finalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discountPct?: NullableIntFieldUpdateOperationsInput | number | null
    isOnSale?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: NullableBoolFieldUpdateOperationsInput | boolean | null
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentSlug?: NullableStringFieldUpdateOperationsInput | string | null
    variantSlug?: NullableStringFieldUpdateOperationsInput | string | null
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    advertiserName?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    group?: ProductUpdateOneWithoutVariantsNestedInput
  }

  export type VariantUncheckedUpdateWithoutBestForInput = {
    id?: IntFieldUpdateOperationsInput | number
    programId?: NullableIntFieldUpdateOperationsInput | number | null
    productId?: StringFieldUpdateOperationsInput | string
    groupId?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    finalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discountPct?: NullableIntFieldUpdateOperationsInput | number | null
    isOnSale?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: NullableBoolFieldUpdateOperationsInput | boolean | null
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentSlug?: NullableStringFieldUpdateOperationsInput | string | null
    variantSlug?: NullableStringFieldUpdateOperationsInput | string | null
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    advertiserName?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AdvertiserCreateWithoutPromotionsInput = {
    name: string
    slug?: string | null
    logoUrl?: string | null
    url?: string | null
    description?: string | null
    isActive?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    healthScore?: number | null
  }

  export type AdvertiserUncheckedCreateWithoutPromotionsInput = {
    advertiserId?: number
    name: string
    slug?: string | null
    logoUrl?: string | null
    url?: string | null
    description?: string | null
    isActive?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    healthScore?: number | null
  }

  export type AdvertiserCreateOrConnectWithoutPromotionsInput = {
    where: AdvertiserWhereUniqueInput
    create: XOR<AdvertiserCreateWithoutPromotionsInput, AdvertiserUncheckedCreateWithoutPromotionsInput>
  }

  export type AdvertiserUpsertWithoutPromotionsInput = {
    update: XOR<AdvertiserUpdateWithoutPromotionsInput, AdvertiserUncheckedUpdateWithoutPromotionsInput>
    create: XOR<AdvertiserCreateWithoutPromotionsInput, AdvertiserUncheckedCreateWithoutPromotionsInput>
    where?: AdvertiserWhereInput
  }

  export type AdvertiserUpdateToOneWithWhereWithoutPromotionsInput = {
    where?: AdvertiserWhereInput
    data: XOR<AdvertiserUpdateWithoutPromotionsInput, AdvertiserUncheckedUpdateWithoutPromotionsInput>
  }

  export type AdvertiserUpdateWithoutPromotionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthScore?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AdvertiserUncheckedUpdateWithoutPromotionsInput = {
    advertiserId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthScore?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PromotionCreateManyAdvertiserInput = {
    id?: number
    title: string
    description?: string | null
    couponCode?: string | null
    discountPercent?: Decimal | DecimalJsLike | number | string | null
    discountAmount?: Decimal | DecimalJsLike | number | string | null
    minimumPurchase?: Decimal | DecimalJsLike | number | string | null
    terms?: string | null
    url?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    isActive?: boolean | null
    isVerified?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type PromotionUpdateWithoutAdvertiserInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    discountPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discountAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    minimumPurchase?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PromotionUncheckedUpdateWithoutAdvertiserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    discountPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discountAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    minimumPurchase?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PromotionUncheckedUpdateManyWithoutAdvertiserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    couponCode?: NullableStringFieldUpdateOperationsInput | string | null
    discountPercent?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discountAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    minimumPurchase?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VariantCreateManyGroupInput = {
    id?: number
    programId?: number | null
    productId: string
    country?: string | null
    currency?: string | null
    name: string
    brand?: string | null
    description?: string | null
    price?: Decimal | DecimalJsLike | number | string | null
    finalPrice?: Decimal | DecimalJsLike | number | string | null
    discountPct?: number | null
    isOnSale?: boolean | null
    gender?: string | null
    category?: string | null
    subCategory?: string | null
    color?: string | null
    size?: string | null
    sku?: string | null
    url?: string | null
    imageUrl?: string | null
    inStock?: boolean | null
    visibility?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    parentSlug?: string | null
    variantSlug?: string | null
    normalizedName?: string | null
    advertiserName?: string | null
    region?: string | null
  }

  export type VariantUpdateWithoutGroupInput = {
    programId?: NullableIntFieldUpdateOperationsInput | number | null
    productId?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    finalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discountPct?: NullableIntFieldUpdateOperationsInput | number | null
    isOnSale?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: NullableBoolFieldUpdateOperationsInput | boolean | null
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentSlug?: NullableStringFieldUpdateOperationsInput | string | null
    variantSlug?: NullableStringFieldUpdateOperationsInput | string | null
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    advertiserName?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    bestFor?: ProductUpdateOneWithoutBestVariantNestedInput
  }

  export type VariantUncheckedUpdateWithoutGroupInput = {
    id?: IntFieldUpdateOperationsInput | number
    programId?: NullableIntFieldUpdateOperationsInput | number | null
    productId?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    finalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discountPct?: NullableIntFieldUpdateOperationsInput | number | null
    isOnSale?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: NullableBoolFieldUpdateOperationsInput | boolean | null
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentSlug?: NullableStringFieldUpdateOperationsInput | string | null
    variantSlug?: NullableStringFieldUpdateOperationsInput | string | null
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    advertiserName?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    bestFor?: ProductUncheckedUpdateOneWithoutBestVariantNestedInput
  }

  export type VariantUncheckedUpdateManyWithoutGroupInput = {
    id?: IntFieldUpdateOperationsInput | number
    programId?: NullableIntFieldUpdateOperationsInput | number | null
    productId?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    finalPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    discountPct?: NullableIntFieldUpdateOperationsInput | number | null
    isOnSale?: NullableBoolFieldUpdateOperationsInput | boolean | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: NullableBoolFieldUpdateOperationsInput | boolean | null
    visibility?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parentSlug?: NullableStringFieldUpdateOperationsInput | string | null
    variantSlug?: NullableStringFieldUpdateOperationsInput | string | null
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    advertiserName?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}