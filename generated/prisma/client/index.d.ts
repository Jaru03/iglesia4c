
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Area
 * 
 */
export type Area = $Result.DefaultSelection<Prisma.$AreaPayload>
/**
 * Model Activities
 * 
 */
export type Activities = $Result.DefaultSelection<Prisma.$ActivitiesPayload>
/**
 * Model Preachs
 * 
 */
export type Preachs = $Result.DefaultSelection<Prisma.$PreachsPayload>
/**
 * Model LastActivities
 * 
 */
export type LastActivities = $Result.DefaultSelection<Prisma.$LastActivitiesPayload>
/**
 * Model Joven
 * 
 */
export type Joven = $Result.DefaultSelection<Prisma.$JovenPayload>
/**
 * Model Asistencia
 * 
 */
export type Asistencia = $Result.DefaultSelection<Prisma.$AsistenciaPayload>
/**
 * Model AllowedUser
 * 
 */
export type AllowedUser = $Result.DefaultSelection<Prisma.$AllowedUserPayload>
/**
 * Model Persona
 * 
 */
export type Persona = $Result.DefaultSelection<Prisma.$PersonaPayload>
/**
 * Model Peticion
 * 
 */
export type Peticion = $Result.DefaultSelection<Prisma.$PeticionPayload>
/**
 * Model Grupo
 * 
 */
export type Grupo = $Result.DefaultSelection<Prisma.$GrupoPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  SUPERADMIN: 'SUPERADMIN',
  ADMIN: 'ADMIN',
  LIDER: 'LIDER',
  REGISTRO: 'REGISTRO'
};

export type Role = (typeof Role)[keyof typeof Role]


export const EstadoPeticion: {
  PENDIENTE: 'PENDIENTE',
  ORANDO: 'ORANDO',
  RESPONDIDA: 'RESPONDIDA'
};

export type EstadoPeticion = (typeof EstadoPeticion)[keyof typeof EstadoPeticion]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type EstadoPeticion = $Enums.EstadoPeticion

export const EstadoPeticion: typeof $Enums.EstadoPeticion

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.area`: Exposes CRUD operations for the **Area** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Areas
    * const areas = await prisma.area.findMany()
    * ```
    */
  get area(): Prisma.AreaDelegate<ExtArgs>;

  /**
   * `prisma.activities`: Exposes CRUD operations for the **Activities** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activities.findMany()
    * ```
    */
  get activities(): Prisma.ActivitiesDelegate<ExtArgs>;

  /**
   * `prisma.preachs`: Exposes CRUD operations for the **Preachs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Preachs
    * const preachs = await prisma.preachs.findMany()
    * ```
    */
  get preachs(): Prisma.PreachsDelegate<ExtArgs>;

  /**
   * `prisma.lastActivities`: Exposes CRUD operations for the **LastActivities** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LastActivities
    * const lastActivities = await prisma.lastActivities.findMany()
    * ```
    */
  get lastActivities(): Prisma.LastActivitiesDelegate<ExtArgs>;

  /**
   * `prisma.joven`: Exposes CRUD operations for the **Joven** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jovens
    * const jovens = await prisma.joven.findMany()
    * ```
    */
  get joven(): Prisma.JovenDelegate<ExtArgs>;

  /**
   * `prisma.asistencia`: Exposes CRUD operations for the **Asistencia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Asistencias
    * const asistencias = await prisma.asistencia.findMany()
    * ```
    */
  get asistencia(): Prisma.AsistenciaDelegate<ExtArgs>;

  /**
   * `prisma.allowedUser`: Exposes CRUD operations for the **AllowedUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AllowedUsers
    * const allowedUsers = await prisma.allowedUser.findMany()
    * ```
    */
  get allowedUser(): Prisma.AllowedUserDelegate<ExtArgs>;

  /**
   * `prisma.persona`: Exposes CRUD operations for the **Persona** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Personas
    * const personas = await prisma.persona.findMany()
    * ```
    */
  get persona(): Prisma.PersonaDelegate<ExtArgs>;

  /**
   * `prisma.peticion`: Exposes CRUD operations for the **Peticion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Peticions
    * const peticions = await prisma.peticion.findMany()
    * ```
    */
  get peticion(): Prisma.PeticionDelegate<ExtArgs>;

  /**
   * `prisma.grupo`: Exposes CRUD operations for the **Grupo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Grupos
    * const grupos = await prisma.grupo.findMany()
    * ```
    */
  get grupo(): Prisma.GrupoDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    User: 'User',
    Area: 'Area',
    Activities: 'Activities',
    Preachs: 'Preachs',
    LastActivities: 'LastActivities',
    Joven: 'Joven',
    Asistencia: 'Asistencia',
    AllowedUser: 'AllowedUser',
    Persona: 'Persona',
    Peticion: 'Peticion',
    Grupo: 'Grupo',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "area" | "activities" | "preachs" | "lastActivities" | "joven" | "asistencia" | "allowedUser" | "persona" | "peticion" | "grupo" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Area: {
        payload: Prisma.$AreaPayload<ExtArgs>
        fields: Prisma.AreaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AreaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AreaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AreaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AreaPayload>
          }
          findFirst: {
            args: Prisma.AreaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AreaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AreaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AreaPayload>
          }
          findMany: {
            args: Prisma.AreaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AreaPayload>[]
          }
          create: {
            args: Prisma.AreaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AreaPayload>
          }
          createMany: {
            args: Prisma.AreaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AreaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AreaPayload>[]
          }
          delete: {
            args: Prisma.AreaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AreaPayload>
          }
          update: {
            args: Prisma.AreaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AreaPayload>
          }
          deleteMany: {
            args: Prisma.AreaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AreaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AreaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AreaPayload>
          }
          aggregate: {
            args: Prisma.AreaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArea>
          }
          groupBy: {
            args: Prisma.AreaGroupByArgs<ExtArgs>
            result: $Utils.Optional<AreaGroupByOutputType>[]
          }
          count: {
            args: Prisma.AreaCountArgs<ExtArgs>
            result: $Utils.Optional<AreaCountAggregateOutputType> | number
          }
        }
      }
      Activities: {
        payload: Prisma.$ActivitiesPayload<ExtArgs>
        fields: Prisma.ActivitiesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivitiesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivitiesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivitiesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivitiesPayload>
          }
          findFirst: {
            args: Prisma.ActivitiesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivitiesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivitiesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivitiesPayload>
          }
          findMany: {
            args: Prisma.ActivitiesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivitiesPayload>[]
          }
          create: {
            args: Prisma.ActivitiesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivitiesPayload>
          }
          createMany: {
            args: Prisma.ActivitiesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivitiesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivitiesPayload>[]
          }
          delete: {
            args: Prisma.ActivitiesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivitiesPayload>
          }
          update: {
            args: Prisma.ActivitiesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivitiesPayload>
          }
          deleteMany: {
            args: Prisma.ActivitiesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivitiesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ActivitiesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivitiesPayload>
          }
          aggregate: {
            args: Prisma.ActivitiesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivities>
          }
          groupBy: {
            args: Prisma.ActivitiesGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivitiesGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivitiesCountArgs<ExtArgs>
            result: $Utils.Optional<ActivitiesCountAggregateOutputType> | number
          }
        }
      }
      Preachs: {
        payload: Prisma.$PreachsPayload<ExtArgs>
        fields: Prisma.PreachsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PreachsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreachsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PreachsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreachsPayload>
          }
          findFirst: {
            args: Prisma.PreachsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreachsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PreachsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreachsPayload>
          }
          findMany: {
            args: Prisma.PreachsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreachsPayload>[]
          }
          create: {
            args: Prisma.PreachsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreachsPayload>
          }
          createMany: {
            args: Prisma.PreachsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PreachsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreachsPayload>[]
          }
          delete: {
            args: Prisma.PreachsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreachsPayload>
          }
          update: {
            args: Prisma.PreachsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreachsPayload>
          }
          deleteMany: {
            args: Prisma.PreachsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PreachsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PreachsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreachsPayload>
          }
          aggregate: {
            args: Prisma.PreachsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePreachs>
          }
          groupBy: {
            args: Prisma.PreachsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PreachsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PreachsCountArgs<ExtArgs>
            result: $Utils.Optional<PreachsCountAggregateOutputType> | number
          }
        }
      }
      LastActivities: {
        payload: Prisma.$LastActivitiesPayload<ExtArgs>
        fields: Prisma.LastActivitiesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LastActivitiesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LastActivitiesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LastActivitiesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LastActivitiesPayload>
          }
          findFirst: {
            args: Prisma.LastActivitiesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LastActivitiesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LastActivitiesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LastActivitiesPayload>
          }
          findMany: {
            args: Prisma.LastActivitiesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LastActivitiesPayload>[]
          }
          create: {
            args: Prisma.LastActivitiesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LastActivitiesPayload>
          }
          createMany: {
            args: Prisma.LastActivitiesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LastActivitiesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LastActivitiesPayload>[]
          }
          delete: {
            args: Prisma.LastActivitiesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LastActivitiesPayload>
          }
          update: {
            args: Prisma.LastActivitiesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LastActivitiesPayload>
          }
          deleteMany: {
            args: Prisma.LastActivitiesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LastActivitiesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LastActivitiesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LastActivitiesPayload>
          }
          aggregate: {
            args: Prisma.LastActivitiesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLastActivities>
          }
          groupBy: {
            args: Prisma.LastActivitiesGroupByArgs<ExtArgs>
            result: $Utils.Optional<LastActivitiesGroupByOutputType>[]
          }
          count: {
            args: Prisma.LastActivitiesCountArgs<ExtArgs>
            result: $Utils.Optional<LastActivitiesCountAggregateOutputType> | number
          }
        }
      }
      Joven: {
        payload: Prisma.$JovenPayload<ExtArgs>
        fields: Prisma.JovenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JovenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JovenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JovenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JovenPayload>
          }
          findFirst: {
            args: Prisma.JovenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JovenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JovenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JovenPayload>
          }
          findMany: {
            args: Prisma.JovenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JovenPayload>[]
          }
          create: {
            args: Prisma.JovenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JovenPayload>
          }
          createMany: {
            args: Prisma.JovenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JovenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JovenPayload>[]
          }
          delete: {
            args: Prisma.JovenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JovenPayload>
          }
          update: {
            args: Prisma.JovenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JovenPayload>
          }
          deleteMany: {
            args: Prisma.JovenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JovenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JovenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JovenPayload>
          }
          aggregate: {
            args: Prisma.JovenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJoven>
          }
          groupBy: {
            args: Prisma.JovenGroupByArgs<ExtArgs>
            result: $Utils.Optional<JovenGroupByOutputType>[]
          }
          count: {
            args: Prisma.JovenCountArgs<ExtArgs>
            result: $Utils.Optional<JovenCountAggregateOutputType> | number
          }
        }
      }
      Asistencia: {
        payload: Prisma.$AsistenciaPayload<ExtArgs>
        fields: Prisma.AsistenciaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AsistenciaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AsistenciaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AsistenciaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AsistenciaPayload>
          }
          findFirst: {
            args: Prisma.AsistenciaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AsistenciaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AsistenciaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AsistenciaPayload>
          }
          findMany: {
            args: Prisma.AsistenciaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AsistenciaPayload>[]
          }
          create: {
            args: Prisma.AsistenciaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AsistenciaPayload>
          }
          createMany: {
            args: Prisma.AsistenciaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AsistenciaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AsistenciaPayload>[]
          }
          delete: {
            args: Prisma.AsistenciaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AsistenciaPayload>
          }
          update: {
            args: Prisma.AsistenciaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AsistenciaPayload>
          }
          deleteMany: {
            args: Prisma.AsistenciaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AsistenciaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AsistenciaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AsistenciaPayload>
          }
          aggregate: {
            args: Prisma.AsistenciaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAsistencia>
          }
          groupBy: {
            args: Prisma.AsistenciaGroupByArgs<ExtArgs>
            result: $Utils.Optional<AsistenciaGroupByOutputType>[]
          }
          count: {
            args: Prisma.AsistenciaCountArgs<ExtArgs>
            result: $Utils.Optional<AsistenciaCountAggregateOutputType> | number
          }
        }
      }
      AllowedUser: {
        payload: Prisma.$AllowedUserPayload<ExtArgs>
        fields: Prisma.AllowedUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AllowedUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowedUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AllowedUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowedUserPayload>
          }
          findFirst: {
            args: Prisma.AllowedUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowedUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AllowedUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowedUserPayload>
          }
          findMany: {
            args: Prisma.AllowedUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowedUserPayload>[]
          }
          create: {
            args: Prisma.AllowedUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowedUserPayload>
          }
          createMany: {
            args: Prisma.AllowedUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AllowedUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowedUserPayload>[]
          }
          delete: {
            args: Prisma.AllowedUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowedUserPayload>
          }
          update: {
            args: Prisma.AllowedUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowedUserPayload>
          }
          deleteMany: {
            args: Prisma.AllowedUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AllowedUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AllowedUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllowedUserPayload>
          }
          aggregate: {
            args: Prisma.AllowedUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAllowedUser>
          }
          groupBy: {
            args: Prisma.AllowedUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<AllowedUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.AllowedUserCountArgs<ExtArgs>
            result: $Utils.Optional<AllowedUserCountAggregateOutputType> | number
          }
        }
      }
      Persona: {
        payload: Prisma.$PersonaPayload<ExtArgs>
        fields: Prisma.PersonaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PersonaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PersonaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload>
          }
          findFirst: {
            args: Prisma.PersonaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PersonaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload>
          }
          findMany: {
            args: Prisma.PersonaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload>[]
          }
          create: {
            args: Prisma.PersonaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload>
          }
          createMany: {
            args: Prisma.PersonaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PersonaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload>[]
          }
          delete: {
            args: Prisma.PersonaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload>
          }
          update: {
            args: Prisma.PersonaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload>
          }
          deleteMany: {
            args: Prisma.PersonaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PersonaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PersonaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload>
          }
          aggregate: {
            args: Prisma.PersonaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePersona>
          }
          groupBy: {
            args: Prisma.PersonaGroupByArgs<ExtArgs>
            result: $Utils.Optional<PersonaGroupByOutputType>[]
          }
          count: {
            args: Prisma.PersonaCountArgs<ExtArgs>
            result: $Utils.Optional<PersonaCountAggregateOutputType> | number
          }
        }
      }
      Peticion: {
        payload: Prisma.$PeticionPayload<ExtArgs>
        fields: Prisma.PeticionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PeticionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeticionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PeticionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeticionPayload>
          }
          findFirst: {
            args: Prisma.PeticionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeticionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PeticionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeticionPayload>
          }
          findMany: {
            args: Prisma.PeticionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeticionPayload>[]
          }
          create: {
            args: Prisma.PeticionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeticionPayload>
          }
          createMany: {
            args: Prisma.PeticionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PeticionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeticionPayload>[]
          }
          delete: {
            args: Prisma.PeticionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeticionPayload>
          }
          update: {
            args: Prisma.PeticionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeticionPayload>
          }
          deleteMany: {
            args: Prisma.PeticionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PeticionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PeticionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeticionPayload>
          }
          aggregate: {
            args: Prisma.PeticionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePeticion>
          }
          groupBy: {
            args: Prisma.PeticionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PeticionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PeticionCountArgs<ExtArgs>
            result: $Utils.Optional<PeticionCountAggregateOutputType> | number
          }
        }
      }
      Grupo: {
        payload: Prisma.$GrupoPayload<ExtArgs>
        fields: Prisma.GrupoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GrupoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrupoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GrupoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrupoPayload>
          }
          findFirst: {
            args: Prisma.GrupoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrupoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GrupoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrupoPayload>
          }
          findMany: {
            args: Prisma.GrupoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrupoPayload>[]
          }
          create: {
            args: Prisma.GrupoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrupoPayload>
          }
          createMany: {
            args: Prisma.GrupoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GrupoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrupoPayload>[]
          }
          delete: {
            args: Prisma.GrupoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrupoPayload>
          }
          update: {
            args: Prisma.GrupoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrupoPayload>
          }
          deleteMany: {
            args: Prisma.GrupoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GrupoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GrupoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrupoPayload>
          }
          aggregate: {
            args: Prisma.GrupoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGrupo>
          }
          groupBy: {
            args: Prisma.GrupoGroupByArgs<ExtArgs>
            result: $Utils.Optional<GrupoGroupByOutputType>[]
          }
          count: {
            args: Prisma.GrupoCountArgs<ExtArgs>
            result: $Utils.Optional<GrupoCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type AreaCountOutputType
   */

  export type AreaCountOutputType = {
    activities: number
  }

  export type AreaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activities?: boolean | AreaCountOutputTypeCountActivitiesArgs
  }

  // Custom InputTypes
  /**
   * AreaCountOutputType without action
   */
  export type AreaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AreaCountOutputType
     */
    select?: AreaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AreaCountOutputType without action
   */
  export type AreaCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivitiesWhereInput
  }


  /**
   * Count Type JovenCountOutputType
   */

  export type JovenCountOutputType = {
    asistencias: number
  }

  export type JovenCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    asistencias?: boolean | JovenCountOutputTypeCountAsistenciasArgs
  }

  // Custom InputTypes
  /**
   * JovenCountOutputType without action
   */
  export type JovenCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JovenCountOutputType
     */
    select?: JovenCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JovenCountOutputType without action
   */
  export type JovenCountOutputTypeCountAsistenciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AsistenciaWhereInput
  }


  /**
   * Count Type PersonaCountOutputType
   */

  export type PersonaCountOutputType = {
    peticiones: number
  }

  export type PersonaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    peticiones?: boolean | PersonaCountOutputTypeCountPeticionesArgs
  }

  // Custom InputTypes
  /**
   * PersonaCountOutputType without action
   */
  export type PersonaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonaCountOutputType
     */
    select?: PersonaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PersonaCountOutputType without action
   */
  export type PersonaCountOutputTypeCountPeticionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PeticionWhereInput
  }


  /**
   * Count Type GrupoCountOutputType
   */

  export type GrupoCountOutputType = {
    miembros: number
  }

  export type GrupoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    miembros?: boolean | GrupoCountOutputTypeCountMiembrosArgs
  }

  // Custom InputTypes
  /**
   * GrupoCountOutputType without action
   */
  export type GrupoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrupoCountOutputType
     */
    select?: GrupoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GrupoCountOutputType without action
   */
  export type GrupoCountOutputTypeCountMiembrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JovenWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    nombre: string | null
    role: $Enums.Role | null
    sede: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    nombre: string | null
    role: $Enums.Role | null
    sede: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    nombre: number
    role: number
    sede: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    nombre?: true
    role?: true
    sede?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    nombre?: true
    role?: true
    sede?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    nombre?: true
    role?: true
    sede?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    nombre: string
    role: $Enums.Role
    sede: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    nombre?: boolean
    role?: boolean
    sede?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    nombre?: boolean
    role?: boolean
    sede?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    nombre?: boolean
    role?: boolean
    sede?: boolean
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      nombre: string
      role: $Enums.Role
      sede: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly nombre: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly sede: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
  }


  /**
   * Model Area
   */

  export type AggregateArea = {
    _count: AreaCountAggregateOutputType | null
    _avg: AreaAvgAggregateOutputType | null
    _sum: AreaSumAggregateOutputType | null
    _min: AreaMinAggregateOutputType | null
    _max: AreaMaxAggregateOutputType | null
  }

  export type AreaAvgAggregateOutputType = {
    id: number | null
  }

  export type AreaSumAggregateOutputType = {
    id: number | null
  }

  export type AreaMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    img: string | null
    value: string | null
    rol: string | null
  }

  export type AreaMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    img: string | null
    value: string | null
    rol: string | null
  }

  export type AreaCountAggregateOutputType = {
    id: number
    title: number
    description: number
    img: number
    value: number
    rol: number
    _all: number
  }


  export type AreaAvgAggregateInputType = {
    id?: true
  }

  export type AreaSumAggregateInputType = {
    id?: true
  }

  export type AreaMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    img?: true
    value?: true
    rol?: true
  }

  export type AreaMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    img?: true
    value?: true
    rol?: true
  }

  export type AreaCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    img?: true
    value?: true
    rol?: true
    _all?: true
  }

  export type AreaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Area to aggregate.
     */
    where?: AreaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Areas to fetch.
     */
    orderBy?: AreaOrderByWithRelationInput | AreaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AreaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Areas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Areas
    **/
    _count?: true | AreaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AreaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AreaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AreaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AreaMaxAggregateInputType
  }

  export type GetAreaAggregateType<T extends AreaAggregateArgs> = {
        [P in keyof T & keyof AggregateArea]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArea[P]>
      : GetScalarType<T[P], AggregateArea[P]>
  }




  export type AreaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AreaWhereInput
    orderBy?: AreaOrderByWithAggregationInput | AreaOrderByWithAggregationInput[]
    by: AreaScalarFieldEnum[] | AreaScalarFieldEnum
    having?: AreaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AreaCountAggregateInputType | true
    _avg?: AreaAvgAggregateInputType
    _sum?: AreaSumAggregateInputType
    _min?: AreaMinAggregateInputType
    _max?: AreaMaxAggregateInputType
  }

  export type AreaGroupByOutputType = {
    id: number
    title: string
    description: string | null
    img: string | null
    value: string
    rol: string
    _count: AreaCountAggregateOutputType | null
    _avg: AreaAvgAggregateOutputType | null
    _sum: AreaSumAggregateOutputType | null
    _min: AreaMinAggregateOutputType | null
    _max: AreaMaxAggregateOutputType | null
  }

  type GetAreaGroupByPayload<T extends AreaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AreaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AreaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AreaGroupByOutputType[P]>
            : GetScalarType<T[P], AreaGroupByOutputType[P]>
        }
      >
    >


  export type AreaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    img?: boolean
    value?: boolean
    rol?: boolean
    activities?: boolean | Area$activitiesArgs<ExtArgs>
    _count?: boolean | AreaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["area"]>

  export type AreaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    img?: boolean
    value?: boolean
    rol?: boolean
  }, ExtArgs["result"]["area"]>

  export type AreaSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    img?: boolean
    value?: boolean
    rol?: boolean
  }

  export type AreaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activities?: boolean | Area$activitiesArgs<ExtArgs>
    _count?: boolean | AreaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AreaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AreaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Area"
    objects: {
      activities: Prisma.$ActivitiesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      img: string | null
      value: string
      rol: string
    }, ExtArgs["result"]["area"]>
    composites: {}
  }

  type AreaGetPayload<S extends boolean | null | undefined | AreaDefaultArgs> = $Result.GetResult<Prisma.$AreaPayload, S>

  type AreaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AreaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AreaCountAggregateInputType | true
    }

  export interface AreaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Area'], meta: { name: 'Area' } }
    /**
     * Find zero or one Area that matches the filter.
     * @param {AreaFindUniqueArgs} args - Arguments to find a Area
     * @example
     * // Get one Area
     * const area = await prisma.area.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AreaFindUniqueArgs>(args: SelectSubset<T, AreaFindUniqueArgs<ExtArgs>>): Prisma__AreaClient<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Area that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AreaFindUniqueOrThrowArgs} args - Arguments to find a Area
     * @example
     * // Get one Area
     * const area = await prisma.area.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AreaFindUniqueOrThrowArgs>(args: SelectSubset<T, AreaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AreaClient<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Area that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaFindFirstArgs} args - Arguments to find a Area
     * @example
     * // Get one Area
     * const area = await prisma.area.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AreaFindFirstArgs>(args?: SelectSubset<T, AreaFindFirstArgs<ExtArgs>>): Prisma__AreaClient<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Area that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaFindFirstOrThrowArgs} args - Arguments to find a Area
     * @example
     * // Get one Area
     * const area = await prisma.area.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AreaFindFirstOrThrowArgs>(args?: SelectSubset<T, AreaFindFirstOrThrowArgs<ExtArgs>>): Prisma__AreaClient<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Areas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Areas
     * const areas = await prisma.area.findMany()
     * 
     * // Get first 10 Areas
     * const areas = await prisma.area.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const areaWithIdOnly = await prisma.area.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AreaFindManyArgs>(args?: SelectSubset<T, AreaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Area.
     * @param {AreaCreateArgs} args - Arguments to create a Area.
     * @example
     * // Create one Area
     * const Area = await prisma.area.create({
     *   data: {
     *     // ... data to create a Area
     *   }
     * })
     * 
     */
    create<T extends AreaCreateArgs>(args: SelectSubset<T, AreaCreateArgs<ExtArgs>>): Prisma__AreaClient<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Areas.
     * @param {AreaCreateManyArgs} args - Arguments to create many Areas.
     * @example
     * // Create many Areas
     * const area = await prisma.area.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AreaCreateManyArgs>(args?: SelectSubset<T, AreaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Areas and returns the data saved in the database.
     * @param {AreaCreateManyAndReturnArgs} args - Arguments to create many Areas.
     * @example
     * // Create many Areas
     * const area = await prisma.area.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Areas and only return the `id`
     * const areaWithIdOnly = await prisma.area.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AreaCreateManyAndReturnArgs>(args?: SelectSubset<T, AreaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Area.
     * @param {AreaDeleteArgs} args - Arguments to delete one Area.
     * @example
     * // Delete one Area
     * const Area = await prisma.area.delete({
     *   where: {
     *     // ... filter to delete one Area
     *   }
     * })
     * 
     */
    delete<T extends AreaDeleteArgs>(args: SelectSubset<T, AreaDeleteArgs<ExtArgs>>): Prisma__AreaClient<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Area.
     * @param {AreaUpdateArgs} args - Arguments to update one Area.
     * @example
     * // Update one Area
     * const area = await prisma.area.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AreaUpdateArgs>(args: SelectSubset<T, AreaUpdateArgs<ExtArgs>>): Prisma__AreaClient<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Areas.
     * @param {AreaDeleteManyArgs} args - Arguments to filter Areas to delete.
     * @example
     * // Delete a few Areas
     * const { count } = await prisma.area.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AreaDeleteManyArgs>(args?: SelectSubset<T, AreaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Areas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Areas
     * const area = await prisma.area.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AreaUpdateManyArgs>(args: SelectSubset<T, AreaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Area.
     * @param {AreaUpsertArgs} args - Arguments to update or create a Area.
     * @example
     * // Update or create a Area
     * const area = await prisma.area.upsert({
     *   create: {
     *     // ... data to create a Area
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Area we want to update
     *   }
     * })
     */
    upsert<T extends AreaUpsertArgs>(args: SelectSubset<T, AreaUpsertArgs<ExtArgs>>): Prisma__AreaClient<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Areas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaCountArgs} args - Arguments to filter Areas to count.
     * @example
     * // Count the number of Areas
     * const count = await prisma.area.count({
     *   where: {
     *     // ... the filter for the Areas we want to count
     *   }
     * })
    **/
    count<T extends AreaCountArgs>(
      args?: Subset<T, AreaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AreaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Area.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AreaAggregateArgs>(args: Subset<T, AreaAggregateArgs>): Prisma.PrismaPromise<GetAreaAggregateType<T>>

    /**
     * Group by Area.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaGroupByArgs} args - Group by arguments.
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
      T extends AreaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AreaGroupByArgs['orderBy'] }
        : { orderBy?: AreaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AreaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAreaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Area model
   */
  readonly fields: AreaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Area.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AreaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    activities<T extends Area$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, Area$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivitiesPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Area model
   */ 
  interface AreaFieldRefs {
    readonly id: FieldRef<"Area", 'Int'>
    readonly title: FieldRef<"Area", 'String'>
    readonly description: FieldRef<"Area", 'String'>
    readonly img: FieldRef<"Area", 'String'>
    readonly value: FieldRef<"Area", 'String'>
    readonly rol: FieldRef<"Area", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Area findUnique
   */
  export type AreaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * Filter, which Area to fetch.
     */
    where: AreaWhereUniqueInput
  }

  /**
   * Area findUniqueOrThrow
   */
  export type AreaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * Filter, which Area to fetch.
     */
    where: AreaWhereUniqueInput
  }

  /**
   * Area findFirst
   */
  export type AreaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * Filter, which Area to fetch.
     */
    where?: AreaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Areas to fetch.
     */
    orderBy?: AreaOrderByWithRelationInput | AreaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Areas.
     */
    cursor?: AreaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Areas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Areas.
     */
    distinct?: AreaScalarFieldEnum | AreaScalarFieldEnum[]
  }

  /**
   * Area findFirstOrThrow
   */
  export type AreaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * Filter, which Area to fetch.
     */
    where?: AreaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Areas to fetch.
     */
    orderBy?: AreaOrderByWithRelationInput | AreaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Areas.
     */
    cursor?: AreaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Areas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Areas.
     */
    distinct?: AreaScalarFieldEnum | AreaScalarFieldEnum[]
  }

  /**
   * Area findMany
   */
  export type AreaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * Filter, which Areas to fetch.
     */
    where?: AreaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Areas to fetch.
     */
    orderBy?: AreaOrderByWithRelationInput | AreaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Areas.
     */
    cursor?: AreaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Areas.
     */
    skip?: number
    distinct?: AreaScalarFieldEnum | AreaScalarFieldEnum[]
  }

  /**
   * Area create
   */
  export type AreaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * The data needed to create a Area.
     */
    data: XOR<AreaCreateInput, AreaUncheckedCreateInput>
  }

  /**
   * Area createMany
   */
  export type AreaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Areas.
     */
    data: AreaCreateManyInput | AreaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Area createManyAndReturn
   */
  export type AreaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Areas.
     */
    data: AreaCreateManyInput | AreaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Area update
   */
  export type AreaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * The data needed to update a Area.
     */
    data: XOR<AreaUpdateInput, AreaUncheckedUpdateInput>
    /**
     * Choose, which Area to update.
     */
    where: AreaWhereUniqueInput
  }

  /**
   * Area updateMany
   */
  export type AreaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Areas.
     */
    data: XOR<AreaUpdateManyMutationInput, AreaUncheckedUpdateManyInput>
    /**
     * Filter which Areas to update
     */
    where?: AreaWhereInput
  }

  /**
   * Area upsert
   */
  export type AreaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * The filter to search for the Area to update in case it exists.
     */
    where: AreaWhereUniqueInput
    /**
     * In case the Area found by the `where` argument doesn't exist, create a new Area with this data.
     */
    create: XOR<AreaCreateInput, AreaUncheckedCreateInput>
    /**
     * In case the Area was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AreaUpdateInput, AreaUncheckedUpdateInput>
  }

  /**
   * Area delete
   */
  export type AreaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
    /**
     * Filter which Area to delete.
     */
    where: AreaWhereUniqueInput
  }

  /**
   * Area deleteMany
   */
  export type AreaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Areas to delete
     */
    where?: AreaWhereInput
  }

  /**
   * Area.activities
   */
  export type Area$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activities
     */
    select?: ActivitiesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivitiesInclude<ExtArgs> | null
    where?: ActivitiesWhereInput
    orderBy?: ActivitiesOrderByWithRelationInput | ActivitiesOrderByWithRelationInput[]
    cursor?: ActivitiesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivitiesScalarFieldEnum | ActivitiesScalarFieldEnum[]
  }

  /**
   * Area without action
   */
  export type AreaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
  }


  /**
   * Model Activities
   */

  export type AggregateActivities = {
    _count: ActivitiesCountAggregateOutputType | null
    _avg: ActivitiesAvgAggregateOutputType | null
    _sum: ActivitiesSumAggregateOutputType | null
    _min: ActivitiesMinAggregateOutputType | null
    _max: ActivitiesMaxAggregateOutputType | null
  }

  export type ActivitiesAvgAggregateOutputType = {
    id: number | null
    areaId: number | null
  }

  export type ActivitiesSumAggregateOutputType = {
    id: number | null
    areaId: number | null
  }

  export type ActivitiesMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    img: string | null
    place: string | null
    hour_start: Date | null
    hour_end: Date | null
    urgent: boolean | null
    areaId: number | null
  }

  export type ActivitiesMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    img: string | null
    place: string | null
    hour_start: Date | null
    hour_end: Date | null
    urgent: boolean | null
    areaId: number | null
  }

  export type ActivitiesCountAggregateOutputType = {
    id: number
    title: number
    description: number
    img: number
    place: number
    hour_start: number
    hour_end: number
    urgent: number
    areaId: number
    _all: number
  }


  export type ActivitiesAvgAggregateInputType = {
    id?: true
    areaId?: true
  }

  export type ActivitiesSumAggregateInputType = {
    id?: true
    areaId?: true
  }

  export type ActivitiesMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    img?: true
    place?: true
    hour_start?: true
    hour_end?: true
    urgent?: true
    areaId?: true
  }

  export type ActivitiesMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    img?: true
    place?: true
    hour_start?: true
    hour_end?: true
    urgent?: true
    areaId?: true
  }

  export type ActivitiesCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    img?: true
    place?: true
    hour_start?: true
    hour_end?: true
    urgent?: true
    areaId?: true
    _all?: true
  }

  export type ActivitiesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activities to aggregate.
     */
    where?: ActivitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivitiesOrderByWithRelationInput | ActivitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Activities
    **/
    _count?: true | ActivitiesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivitiesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivitiesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivitiesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivitiesMaxAggregateInputType
  }

  export type GetActivitiesAggregateType<T extends ActivitiesAggregateArgs> = {
        [P in keyof T & keyof AggregateActivities]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivities[P]>
      : GetScalarType<T[P], AggregateActivities[P]>
  }




  export type ActivitiesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivitiesWhereInput
    orderBy?: ActivitiesOrderByWithAggregationInput | ActivitiesOrderByWithAggregationInput[]
    by: ActivitiesScalarFieldEnum[] | ActivitiesScalarFieldEnum
    having?: ActivitiesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivitiesCountAggregateInputType | true
    _avg?: ActivitiesAvgAggregateInputType
    _sum?: ActivitiesSumAggregateInputType
    _min?: ActivitiesMinAggregateInputType
    _max?: ActivitiesMaxAggregateInputType
  }

  export type ActivitiesGroupByOutputType = {
    id: number
    title: string
    description: string | null
    img: string | null
    place: string
    hour_start: Date
    hour_end: Date
    urgent: boolean
    areaId: number | null
    _count: ActivitiesCountAggregateOutputType | null
    _avg: ActivitiesAvgAggregateOutputType | null
    _sum: ActivitiesSumAggregateOutputType | null
    _min: ActivitiesMinAggregateOutputType | null
    _max: ActivitiesMaxAggregateOutputType | null
  }

  type GetActivitiesGroupByPayload<T extends ActivitiesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivitiesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivitiesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivitiesGroupByOutputType[P]>
            : GetScalarType<T[P], ActivitiesGroupByOutputType[P]>
        }
      >
    >


  export type ActivitiesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    img?: boolean
    place?: boolean
    hour_start?: boolean
    hour_end?: boolean
    urgent?: boolean
    areaId?: boolean
    area?: boolean | Activities$areaArgs<ExtArgs>
  }, ExtArgs["result"]["activities"]>

  export type ActivitiesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    img?: boolean
    place?: boolean
    hour_start?: boolean
    hour_end?: boolean
    urgent?: boolean
    areaId?: boolean
    area?: boolean | Activities$areaArgs<ExtArgs>
  }, ExtArgs["result"]["activities"]>

  export type ActivitiesSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    img?: boolean
    place?: boolean
    hour_start?: boolean
    hour_end?: boolean
    urgent?: boolean
    areaId?: boolean
  }

  export type ActivitiesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    area?: boolean | Activities$areaArgs<ExtArgs>
  }
  export type ActivitiesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    area?: boolean | Activities$areaArgs<ExtArgs>
  }

  export type $ActivitiesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Activities"
    objects: {
      area: Prisma.$AreaPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      img: string | null
      place: string
      hour_start: Date
      hour_end: Date
      urgent: boolean
      areaId: number | null
    }, ExtArgs["result"]["activities"]>
    composites: {}
  }

  type ActivitiesGetPayload<S extends boolean | null | undefined | ActivitiesDefaultArgs> = $Result.GetResult<Prisma.$ActivitiesPayload, S>

  type ActivitiesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ActivitiesFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ActivitiesCountAggregateInputType | true
    }

  export interface ActivitiesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Activities'], meta: { name: 'Activities' } }
    /**
     * Find zero or one Activities that matches the filter.
     * @param {ActivitiesFindUniqueArgs} args - Arguments to find a Activities
     * @example
     * // Get one Activities
     * const activities = await prisma.activities.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivitiesFindUniqueArgs>(args: SelectSubset<T, ActivitiesFindUniqueArgs<ExtArgs>>): Prisma__ActivitiesClient<$Result.GetResult<Prisma.$ActivitiesPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Activities that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ActivitiesFindUniqueOrThrowArgs} args - Arguments to find a Activities
     * @example
     * // Get one Activities
     * const activities = await prisma.activities.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivitiesFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivitiesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivitiesClient<$Result.GetResult<Prisma.$ActivitiesPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivitiesFindFirstArgs} args - Arguments to find a Activities
     * @example
     * // Get one Activities
     * const activities = await prisma.activities.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivitiesFindFirstArgs>(args?: SelectSubset<T, ActivitiesFindFirstArgs<ExtArgs>>): Prisma__ActivitiesClient<$Result.GetResult<Prisma.$ActivitiesPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Activities that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivitiesFindFirstOrThrowArgs} args - Arguments to find a Activities
     * @example
     * // Get one Activities
     * const activities = await prisma.activities.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivitiesFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivitiesFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivitiesClient<$Result.GetResult<Prisma.$ActivitiesPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivitiesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activities.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activities.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activitiesWithIdOnly = await prisma.activities.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivitiesFindManyArgs>(args?: SelectSubset<T, ActivitiesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivitiesPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Activities.
     * @param {ActivitiesCreateArgs} args - Arguments to create a Activities.
     * @example
     * // Create one Activities
     * const Activities = await prisma.activities.create({
     *   data: {
     *     // ... data to create a Activities
     *   }
     * })
     * 
     */
    create<T extends ActivitiesCreateArgs>(args: SelectSubset<T, ActivitiesCreateArgs<ExtArgs>>): Prisma__ActivitiesClient<$Result.GetResult<Prisma.$ActivitiesPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Activities.
     * @param {ActivitiesCreateManyArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activities = await prisma.activities.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivitiesCreateManyArgs>(args?: SelectSubset<T, ActivitiesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Activities and returns the data saved in the database.
     * @param {ActivitiesCreateManyAndReturnArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activities = await prisma.activities.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Activities and only return the `id`
     * const activitiesWithIdOnly = await prisma.activities.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivitiesCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivitiesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivitiesPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Activities.
     * @param {ActivitiesDeleteArgs} args - Arguments to delete one Activities.
     * @example
     * // Delete one Activities
     * const Activities = await prisma.activities.delete({
     *   where: {
     *     // ... filter to delete one Activities
     *   }
     * })
     * 
     */
    delete<T extends ActivitiesDeleteArgs>(args: SelectSubset<T, ActivitiesDeleteArgs<ExtArgs>>): Prisma__ActivitiesClient<$Result.GetResult<Prisma.$ActivitiesPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Activities.
     * @param {ActivitiesUpdateArgs} args - Arguments to update one Activities.
     * @example
     * // Update one Activities
     * const activities = await prisma.activities.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivitiesUpdateArgs>(args: SelectSubset<T, ActivitiesUpdateArgs<ExtArgs>>): Prisma__ActivitiesClient<$Result.GetResult<Prisma.$ActivitiesPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Activities.
     * @param {ActivitiesDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activities.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivitiesDeleteManyArgs>(args?: SelectSubset<T, ActivitiesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivitiesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activities = await prisma.activities.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivitiesUpdateManyArgs>(args: SelectSubset<T, ActivitiesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Activities.
     * @param {ActivitiesUpsertArgs} args - Arguments to update or create a Activities.
     * @example
     * // Update or create a Activities
     * const activities = await prisma.activities.upsert({
     *   create: {
     *     // ... data to create a Activities
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activities we want to update
     *   }
     * })
     */
    upsert<T extends ActivitiesUpsertArgs>(args: SelectSubset<T, ActivitiesUpsertArgs<ExtArgs>>): Prisma__ActivitiesClient<$Result.GetResult<Prisma.$ActivitiesPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivitiesCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activities.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends ActivitiesCountArgs>(
      args?: Subset<T, ActivitiesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivitiesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivitiesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ActivitiesAggregateArgs>(args: Subset<T, ActivitiesAggregateArgs>): Prisma.PrismaPromise<GetActivitiesAggregateType<T>>

    /**
     * Group by Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivitiesGroupByArgs} args - Group by arguments.
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
      T extends ActivitiesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivitiesGroupByArgs['orderBy'] }
        : { orderBy?: ActivitiesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ActivitiesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivitiesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Activities model
   */
  readonly fields: ActivitiesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Activities.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivitiesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    area<T extends Activities$areaArgs<ExtArgs> = {}>(args?: Subset<T, Activities$areaArgs<ExtArgs>>): Prisma__AreaClient<$Result.GetResult<Prisma.$AreaPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the Activities model
   */ 
  interface ActivitiesFieldRefs {
    readonly id: FieldRef<"Activities", 'Int'>
    readonly title: FieldRef<"Activities", 'String'>
    readonly description: FieldRef<"Activities", 'String'>
    readonly img: FieldRef<"Activities", 'String'>
    readonly place: FieldRef<"Activities", 'String'>
    readonly hour_start: FieldRef<"Activities", 'DateTime'>
    readonly hour_end: FieldRef<"Activities", 'DateTime'>
    readonly urgent: FieldRef<"Activities", 'Boolean'>
    readonly areaId: FieldRef<"Activities", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Activities findUnique
   */
  export type ActivitiesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activities
     */
    select?: ActivitiesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivitiesInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where: ActivitiesWhereUniqueInput
  }

  /**
   * Activities findUniqueOrThrow
   */
  export type ActivitiesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activities
     */
    select?: ActivitiesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivitiesInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where: ActivitiesWhereUniqueInput
  }

  /**
   * Activities findFirst
   */
  export type ActivitiesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activities
     */
    select?: ActivitiesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivitiesInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivitiesOrderByWithRelationInput | ActivitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivitiesScalarFieldEnum | ActivitiesScalarFieldEnum[]
  }

  /**
   * Activities findFirstOrThrow
   */
  export type ActivitiesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activities
     */
    select?: ActivitiesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivitiesInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivitiesOrderByWithRelationInput | ActivitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivitiesScalarFieldEnum | ActivitiesScalarFieldEnum[]
  }

  /**
   * Activities findMany
   */
  export type ActivitiesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activities
     */
    select?: ActivitiesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivitiesInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivitiesOrderByWithRelationInput | ActivitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Activities.
     */
    cursor?: ActivitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    distinct?: ActivitiesScalarFieldEnum | ActivitiesScalarFieldEnum[]
  }

  /**
   * Activities create
   */
  export type ActivitiesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activities
     */
    select?: ActivitiesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivitiesInclude<ExtArgs> | null
    /**
     * The data needed to create a Activities.
     */
    data: XOR<ActivitiesCreateInput, ActivitiesUncheckedCreateInput>
  }

  /**
   * Activities createMany
   */
  export type ActivitiesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Activities.
     */
    data: ActivitiesCreateManyInput | ActivitiesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activities createManyAndReturn
   */
  export type ActivitiesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activities
     */
    select?: ActivitiesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Activities.
     */
    data: ActivitiesCreateManyInput | ActivitiesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivitiesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activities update
   */
  export type ActivitiesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activities
     */
    select?: ActivitiesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivitiesInclude<ExtArgs> | null
    /**
     * The data needed to update a Activities.
     */
    data: XOR<ActivitiesUpdateInput, ActivitiesUncheckedUpdateInput>
    /**
     * Choose, which Activities to update.
     */
    where: ActivitiesWhereUniqueInput
  }

  /**
   * Activities updateMany
   */
  export type ActivitiesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivitiesUpdateManyMutationInput, ActivitiesUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivitiesWhereInput
  }

  /**
   * Activities upsert
   */
  export type ActivitiesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activities
     */
    select?: ActivitiesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivitiesInclude<ExtArgs> | null
    /**
     * The filter to search for the Activities to update in case it exists.
     */
    where: ActivitiesWhereUniqueInput
    /**
     * In case the Activities found by the `where` argument doesn't exist, create a new Activities with this data.
     */
    create: XOR<ActivitiesCreateInput, ActivitiesUncheckedCreateInput>
    /**
     * In case the Activities was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivitiesUpdateInput, ActivitiesUncheckedUpdateInput>
  }

  /**
   * Activities delete
   */
  export type ActivitiesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activities
     */
    select?: ActivitiesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivitiesInclude<ExtArgs> | null
    /**
     * Filter which Activities to delete.
     */
    where: ActivitiesWhereUniqueInput
  }

  /**
   * Activities deleteMany
   */
  export type ActivitiesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activities to delete
     */
    where?: ActivitiesWhereInput
  }

  /**
   * Activities.area
   */
  export type Activities$areaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Area
     */
    select?: AreaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AreaInclude<ExtArgs> | null
    where?: AreaWhereInput
  }

  /**
   * Activities without action
   */
  export type ActivitiesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activities
     */
    select?: ActivitiesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivitiesInclude<ExtArgs> | null
  }


  /**
   * Model Preachs
   */

  export type AggregatePreachs = {
    _count: PreachsCountAggregateOutputType | null
    _avg: PreachsAvgAggregateOutputType | null
    _sum: PreachsSumAggregateOutputType | null
    _min: PreachsMinAggregateOutputType | null
    _max: PreachsMaxAggregateOutputType | null
  }

  export type PreachsAvgAggregateOutputType = {
    id: number | null
  }

  export type PreachsSumAggregateOutputType = {
    id: number | null
  }

  export type PreachsMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    img: string | null
    urlVideo: string | null
  }

  export type PreachsMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    img: string | null
    urlVideo: string | null
  }

  export type PreachsCountAggregateOutputType = {
    id: number
    title: number
    description: number
    img: number
    urlVideo: number
    _all: number
  }


  export type PreachsAvgAggregateInputType = {
    id?: true
  }

  export type PreachsSumAggregateInputType = {
    id?: true
  }

  export type PreachsMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    img?: true
    urlVideo?: true
  }

  export type PreachsMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    img?: true
    urlVideo?: true
  }

  export type PreachsCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    img?: true
    urlVideo?: true
    _all?: true
  }

  export type PreachsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Preachs to aggregate.
     */
    where?: PreachsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preachs to fetch.
     */
    orderBy?: PreachsOrderByWithRelationInput | PreachsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PreachsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preachs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preachs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Preachs
    **/
    _count?: true | PreachsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PreachsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PreachsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PreachsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PreachsMaxAggregateInputType
  }

  export type GetPreachsAggregateType<T extends PreachsAggregateArgs> = {
        [P in keyof T & keyof AggregatePreachs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePreachs[P]>
      : GetScalarType<T[P], AggregatePreachs[P]>
  }




  export type PreachsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreachsWhereInput
    orderBy?: PreachsOrderByWithAggregationInput | PreachsOrderByWithAggregationInput[]
    by: PreachsScalarFieldEnum[] | PreachsScalarFieldEnum
    having?: PreachsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PreachsCountAggregateInputType | true
    _avg?: PreachsAvgAggregateInputType
    _sum?: PreachsSumAggregateInputType
    _min?: PreachsMinAggregateInputType
    _max?: PreachsMaxAggregateInputType
  }

  export type PreachsGroupByOutputType = {
    id: number
    title: string
    description: string | null
    img: string | null
    urlVideo: string | null
    _count: PreachsCountAggregateOutputType | null
    _avg: PreachsAvgAggregateOutputType | null
    _sum: PreachsSumAggregateOutputType | null
    _min: PreachsMinAggregateOutputType | null
    _max: PreachsMaxAggregateOutputType | null
  }

  type GetPreachsGroupByPayload<T extends PreachsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PreachsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PreachsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PreachsGroupByOutputType[P]>
            : GetScalarType<T[P], PreachsGroupByOutputType[P]>
        }
      >
    >


  export type PreachsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    img?: boolean
    urlVideo?: boolean
  }, ExtArgs["result"]["preachs"]>

  export type PreachsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    img?: boolean
    urlVideo?: boolean
  }, ExtArgs["result"]["preachs"]>

  export type PreachsSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    img?: boolean
    urlVideo?: boolean
  }


  export type $PreachsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Preachs"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      img: string | null
      urlVideo: string | null
    }, ExtArgs["result"]["preachs"]>
    composites: {}
  }

  type PreachsGetPayload<S extends boolean | null | undefined | PreachsDefaultArgs> = $Result.GetResult<Prisma.$PreachsPayload, S>

  type PreachsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PreachsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PreachsCountAggregateInputType | true
    }

  export interface PreachsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Preachs'], meta: { name: 'Preachs' } }
    /**
     * Find zero or one Preachs that matches the filter.
     * @param {PreachsFindUniqueArgs} args - Arguments to find a Preachs
     * @example
     * // Get one Preachs
     * const preachs = await prisma.preachs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PreachsFindUniqueArgs>(args: SelectSubset<T, PreachsFindUniqueArgs<ExtArgs>>): Prisma__PreachsClient<$Result.GetResult<Prisma.$PreachsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Preachs that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PreachsFindUniqueOrThrowArgs} args - Arguments to find a Preachs
     * @example
     * // Get one Preachs
     * const preachs = await prisma.preachs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PreachsFindUniqueOrThrowArgs>(args: SelectSubset<T, PreachsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PreachsClient<$Result.GetResult<Prisma.$PreachsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Preachs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreachsFindFirstArgs} args - Arguments to find a Preachs
     * @example
     * // Get one Preachs
     * const preachs = await prisma.preachs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PreachsFindFirstArgs>(args?: SelectSubset<T, PreachsFindFirstArgs<ExtArgs>>): Prisma__PreachsClient<$Result.GetResult<Prisma.$PreachsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Preachs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreachsFindFirstOrThrowArgs} args - Arguments to find a Preachs
     * @example
     * // Get one Preachs
     * const preachs = await prisma.preachs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PreachsFindFirstOrThrowArgs>(args?: SelectSubset<T, PreachsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PreachsClient<$Result.GetResult<Prisma.$PreachsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Preachs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreachsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Preachs
     * const preachs = await prisma.preachs.findMany()
     * 
     * // Get first 10 Preachs
     * const preachs = await prisma.preachs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const preachsWithIdOnly = await prisma.preachs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PreachsFindManyArgs>(args?: SelectSubset<T, PreachsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreachsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Preachs.
     * @param {PreachsCreateArgs} args - Arguments to create a Preachs.
     * @example
     * // Create one Preachs
     * const Preachs = await prisma.preachs.create({
     *   data: {
     *     // ... data to create a Preachs
     *   }
     * })
     * 
     */
    create<T extends PreachsCreateArgs>(args: SelectSubset<T, PreachsCreateArgs<ExtArgs>>): Prisma__PreachsClient<$Result.GetResult<Prisma.$PreachsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Preachs.
     * @param {PreachsCreateManyArgs} args - Arguments to create many Preachs.
     * @example
     * // Create many Preachs
     * const preachs = await prisma.preachs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PreachsCreateManyArgs>(args?: SelectSubset<T, PreachsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Preachs and returns the data saved in the database.
     * @param {PreachsCreateManyAndReturnArgs} args - Arguments to create many Preachs.
     * @example
     * // Create many Preachs
     * const preachs = await prisma.preachs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Preachs and only return the `id`
     * const preachsWithIdOnly = await prisma.preachs.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PreachsCreateManyAndReturnArgs>(args?: SelectSubset<T, PreachsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreachsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Preachs.
     * @param {PreachsDeleteArgs} args - Arguments to delete one Preachs.
     * @example
     * // Delete one Preachs
     * const Preachs = await prisma.preachs.delete({
     *   where: {
     *     // ... filter to delete one Preachs
     *   }
     * })
     * 
     */
    delete<T extends PreachsDeleteArgs>(args: SelectSubset<T, PreachsDeleteArgs<ExtArgs>>): Prisma__PreachsClient<$Result.GetResult<Prisma.$PreachsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Preachs.
     * @param {PreachsUpdateArgs} args - Arguments to update one Preachs.
     * @example
     * // Update one Preachs
     * const preachs = await prisma.preachs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PreachsUpdateArgs>(args: SelectSubset<T, PreachsUpdateArgs<ExtArgs>>): Prisma__PreachsClient<$Result.GetResult<Prisma.$PreachsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Preachs.
     * @param {PreachsDeleteManyArgs} args - Arguments to filter Preachs to delete.
     * @example
     * // Delete a few Preachs
     * const { count } = await prisma.preachs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PreachsDeleteManyArgs>(args?: SelectSubset<T, PreachsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Preachs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreachsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Preachs
     * const preachs = await prisma.preachs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PreachsUpdateManyArgs>(args: SelectSubset<T, PreachsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Preachs.
     * @param {PreachsUpsertArgs} args - Arguments to update or create a Preachs.
     * @example
     * // Update or create a Preachs
     * const preachs = await prisma.preachs.upsert({
     *   create: {
     *     // ... data to create a Preachs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Preachs we want to update
     *   }
     * })
     */
    upsert<T extends PreachsUpsertArgs>(args: SelectSubset<T, PreachsUpsertArgs<ExtArgs>>): Prisma__PreachsClient<$Result.GetResult<Prisma.$PreachsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Preachs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreachsCountArgs} args - Arguments to filter Preachs to count.
     * @example
     * // Count the number of Preachs
     * const count = await prisma.preachs.count({
     *   where: {
     *     // ... the filter for the Preachs we want to count
     *   }
     * })
    **/
    count<T extends PreachsCountArgs>(
      args?: Subset<T, PreachsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PreachsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Preachs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreachsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PreachsAggregateArgs>(args: Subset<T, PreachsAggregateArgs>): Prisma.PrismaPromise<GetPreachsAggregateType<T>>

    /**
     * Group by Preachs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreachsGroupByArgs} args - Group by arguments.
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
      T extends PreachsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PreachsGroupByArgs['orderBy'] }
        : { orderBy?: PreachsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PreachsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPreachsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Preachs model
   */
  readonly fields: PreachsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Preachs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PreachsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Preachs model
   */ 
  interface PreachsFieldRefs {
    readonly id: FieldRef<"Preachs", 'Int'>
    readonly title: FieldRef<"Preachs", 'String'>
    readonly description: FieldRef<"Preachs", 'String'>
    readonly img: FieldRef<"Preachs", 'String'>
    readonly urlVideo: FieldRef<"Preachs", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Preachs findUnique
   */
  export type PreachsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preachs
     */
    select?: PreachsSelect<ExtArgs> | null
    /**
     * Filter, which Preachs to fetch.
     */
    where: PreachsWhereUniqueInput
  }

  /**
   * Preachs findUniqueOrThrow
   */
  export type PreachsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preachs
     */
    select?: PreachsSelect<ExtArgs> | null
    /**
     * Filter, which Preachs to fetch.
     */
    where: PreachsWhereUniqueInput
  }

  /**
   * Preachs findFirst
   */
  export type PreachsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preachs
     */
    select?: PreachsSelect<ExtArgs> | null
    /**
     * Filter, which Preachs to fetch.
     */
    where?: PreachsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preachs to fetch.
     */
    orderBy?: PreachsOrderByWithRelationInput | PreachsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Preachs.
     */
    cursor?: PreachsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preachs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preachs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Preachs.
     */
    distinct?: PreachsScalarFieldEnum | PreachsScalarFieldEnum[]
  }

  /**
   * Preachs findFirstOrThrow
   */
  export type PreachsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preachs
     */
    select?: PreachsSelect<ExtArgs> | null
    /**
     * Filter, which Preachs to fetch.
     */
    where?: PreachsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preachs to fetch.
     */
    orderBy?: PreachsOrderByWithRelationInput | PreachsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Preachs.
     */
    cursor?: PreachsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preachs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preachs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Preachs.
     */
    distinct?: PreachsScalarFieldEnum | PreachsScalarFieldEnum[]
  }

  /**
   * Preachs findMany
   */
  export type PreachsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preachs
     */
    select?: PreachsSelect<ExtArgs> | null
    /**
     * Filter, which Preachs to fetch.
     */
    where?: PreachsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preachs to fetch.
     */
    orderBy?: PreachsOrderByWithRelationInput | PreachsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Preachs.
     */
    cursor?: PreachsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preachs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preachs.
     */
    skip?: number
    distinct?: PreachsScalarFieldEnum | PreachsScalarFieldEnum[]
  }

  /**
   * Preachs create
   */
  export type PreachsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preachs
     */
    select?: PreachsSelect<ExtArgs> | null
    /**
     * The data needed to create a Preachs.
     */
    data: XOR<PreachsCreateInput, PreachsUncheckedCreateInput>
  }

  /**
   * Preachs createMany
   */
  export type PreachsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Preachs.
     */
    data: PreachsCreateManyInput | PreachsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Preachs createManyAndReturn
   */
  export type PreachsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preachs
     */
    select?: PreachsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Preachs.
     */
    data: PreachsCreateManyInput | PreachsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Preachs update
   */
  export type PreachsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preachs
     */
    select?: PreachsSelect<ExtArgs> | null
    /**
     * The data needed to update a Preachs.
     */
    data: XOR<PreachsUpdateInput, PreachsUncheckedUpdateInput>
    /**
     * Choose, which Preachs to update.
     */
    where: PreachsWhereUniqueInput
  }

  /**
   * Preachs updateMany
   */
  export type PreachsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Preachs.
     */
    data: XOR<PreachsUpdateManyMutationInput, PreachsUncheckedUpdateManyInput>
    /**
     * Filter which Preachs to update
     */
    where?: PreachsWhereInput
  }

  /**
   * Preachs upsert
   */
  export type PreachsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preachs
     */
    select?: PreachsSelect<ExtArgs> | null
    /**
     * The filter to search for the Preachs to update in case it exists.
     */
    where: PreachsWhereUniqueInput
    /**
     * In case the Preachs found by the `where` argument doesn't exist, create a new Preachs with this data.
     */
    create: XOR<PreachsCreateInput, PreachsUncheckedCreateInput>
    /**
     * In case the Preachs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PreachsUpdateInput, PreachsUncheckedUpdateInput>
  }

  /**
   * Preachs delete
   */
  export type PreachsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preachs
     */
    select?: PreachsSelect<ExtArgs> | null
    /**
     * Filter which Preachs to delete.
     */
    where: PreachsWhereUniqueInput
  }

  /**
   * Preachs deleteMany
   */
  export type PreachsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Preachs to delete
     */
    where?: PreachsWhereInput
  }

  /**
   * Preachs without action
   */
  export type PreachsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preachs
     */
    select?: PreachsSelect<ExtArgs> | null
  }


  /**
   * Model LastActivities
   */

  export type AggregateLastActivities = {
    _count: LastActivitiesCountAggregateOutputType | null
    _avg: LastActivitiesAvgAggregateOutputType | null
    _sum: LastActivitiesSumAggregateOutputType | null
    _min: LastActivitiesMinAggregateOutputType | null
    _max: LastActivitiesMaxAggregateOutputType | null
  }

  export type LastActivitiesAvgAggregateOutputType = {
    id: number | null
  }

  export type LastActivitiesSumAggregateOutputType = {
    id: number | null
  }

  export type LastActivitiesMinAggregateOutputType = {
    id: number | null
    title: string | null
    img: string | null
  }

  export type LastActivitiesMaxAggregateOutputType = {
    id: number | null
    title: string | null
    img: string | null
  }

  export type LastActivitiesCountAggregateOutputType = {
    id: number
    title: number
    img: number
    _all: number
  }


  export type LastActivitiesAvgAggregateInputType = {
    id?: true
  }

  export type LastActivitiesSumAggregateInputType = {
    id?: true
  }

  export type LastActivitiesMinAggregateInputType = {
    id?: true
    title?: true
    img?: true
  }

  export type LastActivitiesMaxAggregateInputType = {
    id?: true
    title?: true
    img?: true
  }

  export type LastActivitiesCountAggregateInputType = {
    id?: true
    title?: true
    img?: true
    _all?: true
  }

  export type LastActivitiesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LastActivities to aggregate.
     */
    where?: LastActivitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LastActivities to fetch.
     */
    orderBy?: LastActivitiesOrderByWithRelationInput | LastActivitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LastActivitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LastActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LastActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LastActivities
    **/
    _count?: true | LastActivitiesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LastActivitiesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LastActivitiesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LastActivitiesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LastActivitiesMaxAggregateInputType
  }

  export type GetLastActivitiesAggregateType<T extends LastActivitiesAggregateArgs> = {
        [P in keyof T & keyof AggregateLastActivities]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLastActivities[P]>
      : GetScalarType<T[P], AggregateLastActivities[P]>
  }




  export type LastActivitiesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LastActivitiesWhereInput
    orderBy?: LastActivitiesOrderByWithAggregationInput | LastActivitiesOrderByWithAggregationInput[]
    by: LastActivitiesScalarFieldEnum[] | LastActivitiesScalarFieldEnum
    having?: LastActivitiesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LastActivitiesCountAggregateInputType | true
    _avg?: LastActivitiesAvgAggregateInputType
    _sum?: LastActivitiesSumAggregateInputType
    _min?: LastActivitiesMinAggregateInputType
    _max?: LastActivitiesMaxAggregateInputType
  }

  export type LastActivitiesGroupByOutputType = {
    id: number
    title: string
    img: string | null
    _count: LastActivitiesCountAggregateOutputType | null
    _avg: LastActivitiesAvgAggregateOutputType | null
    _sum: LastActivitiesSumAggregateOutputType | null
    _min: LastActivitiesMinAggregateOutputType | null
    _max: LastActivitiesMaxAggregateOutputType | null
  }

  type GetLastActivitiesGroupByPayload<T extends LastActivitiesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LastActivitiesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LastActivitiesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LastActivitiesGroupByOutputType[P]>
            : GetScalarType<T[P], LastActivitiesGroupByOutputType[P]>
        }
      >
    >


  export type LastActivitiesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    img?: boolean
  }, ExtArgs["result"]["lastActivities"]>

  export type LastActivitiesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    img?: boolean
  }, ExtArgs["result"]["lastActivities"]>

  export type LastActivitiesSelectScalar = {
    id?: boolean
    title?: boolean
    img?: boolean
  }


  export type $LastActivitiesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LastActivities"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      img: string | null
    }, ExtArgs["result"]["lastActivities"]>
    composites: {}
  }

  type LastActivitiesGetPayload<S extends boolean | null | undefined | LastActivitiesDefaultArgs> = $Result.GetResult<Prisma.$LastActivitiesPayload, S>

  type LastActivitiesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LastActivitiesFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LastActivitiesCountAggregateInputType | true
    }

  export interface LastActivitiesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LastActivities'], meta: { name: 'LastActivities' } }
    /**
     * Find zero or one LastActivities that matches the filter.
     * @param {LastActivitiesFindUniqueArgs} args - Arguments to find a LastActivities
     * @example
     * // Get one LastActivities
     * const lastActivities = await prisma.lastActivities.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LastActivitiesFindUniqueArgs>(args: SelectSubset<T, LastActivitiesFindUniqueArgs<ExtArgs>>): Prisma__LastActivitiesClient<$Result.GetResult<Prisma.$LastActivitiesPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one LastActivities that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LastActivitiesFindUniqueOrThrowArgs} args - Arguments to find a LastActivities
     * @example
     * // Get one LastActivities
     * const lastActivities = await prisma.lastActivities.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LastActivitiesFindUniqueOrThrowArgs>(args: SelectSubset<T, LastActivitiesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LastActivitiesClient<$Result.GetResult<Prisma.$LastActivitiesPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first LastActivities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LastActivitiesFindFirstArgs} args - Arguments to find a LastActivities
     * @example
     * // Get one LastActivities
     * const lastActivities = await prisma.lastActivities.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LastActivitiesFindFirstArgs>(args?: SelectSubset<T, LastActivitiesFindFirstArgs<ExtArgs>>): Prisma__LastActivitiesClient<$Result.GetResult<Prisma.$LastActivitiesPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first LastActivities that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LastActivitiesFindFirstOrThrowArgs} args - Arguments to find a LastActivities
     * @example
     * // Get one LastActivities
     * const lastActivities = await prisma.lastActivities.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LastActivitiesFindFirstOrThrowArgs>(args?: SelectSubset<T, LastActivitiesFindFirstOrThrowArgs<ExtArgs>>): Prisma__LastActivitiesClient<$Result.GetResult<Prisma.$LastActivitiesPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more LastActivities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LastActivitiesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LastActivities
     * const lastActivities = await prisma.lastActivities.findMany()
     * 
     * // Get first 10 LastActivities
     * const lastActivities = await prisma.lastActivities.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lastActivitiesWithIdOnly = await prisma.lastActivities.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LastActivitiesFindManyArgs>(args?: SelectSubset<T, LastActivitiesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LastActivitiesPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a LastActivities.
     * @param {LastActivitiesCreateArgs} args - Arguments to create a LastActivities.
     * @example
     * // Create one LastActivities
     * const LastActivities = await prisma.lastActivities.create({
     *   data: {
     *     // ... data to create a LastActivities
     *   }
     * })
     * 
     */
    create<T extends LastActivitiesCreateArgs>(args: SelectSubset<T, LastActivitiesCreateArgs<ExtArgs>>): Prisma__LastActivitiesClient<$Result.GetResult<Prisma.$LastActivitiesPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many LastActivities.
     * @param {LastActivitiesCreateManyArgs} args - Arguments to create many LastActivities.
     * @example
     * // Create many LastActivities
     * const lastActivities = await prisma.lastActivities.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LastActivitiesCreateManyArgs>(args?: SelectSubset<T, LastActivitiesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LastActivities and returns the data saved in the database.
     * @param {LastActivitiesCreateManyAndReturnArgs} args - Arguments to create many LastActivities.
     * @example
     * // Create many LastActivities
     * const lastActivities = await prisma.lastActivities.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LastActivities and only return the `id`
     * const lastActivitiesWithIdOnly = await prisma.lastActivities.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LastActivitiesCreateManyAndReturnArgs>(args?: SelectSubset<T, LastActivitiesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LastActivitiesPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a LastActivities.
     * @param {LastActivitiesDeleteArgs} args - Arguments to delete one LastActivities.
     * @example
     * // Delete one LastActivities
     * const LastActivities = await prisma.lastActivities.delete({
     *   where: {
     *     // ... filter to delete one LastActivities
     *   }
     * })
     * 
     */
    delete<T extends LastActivitiesDeleteArgs>(args: SelectSubset<T, LastActivitiesDeleteArgs<ExtArgs>>): Prisma__LastActivitiesClient<$Result.GetResult<Prisma.$LastActivitiesPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one LastActivities.
     * @param {LastActivitiesUpdateArgs} args - Arguments to update one LastActivities.
     * @example
     * // Update one LastActivities
     * const lastActivities = await prisma.lastActivities.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LastActivitiesUpdateArgs>(args: SelectSubset<T, LastActivitiesUpdateArgs<ExtArgs>>): Prisma__LastActivitiesClient<$Result.GetResult<Prisma.$LastActivitiesPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more LastActivities.
     * @param {LastActivitiesDeleteManyArgs} args - Arguments to filter LastActivities to delete.
     * @example
     * // Delete a few LastActivities
     * const { count } = await prisma.lastActivities.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LastActivitiesDeleteManyArgs>(args?: SelectSubset<T, LastActivitiesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LastActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LastActivitiesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LastActivities
     * const lastActivities = await prisma.lastActivities.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LastActivitiesUpdateManyArgs>(args: SelectSubset<T, LastActivitiesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LastActivities.
     * @param {LastActivitiesUpsertArgs} args - Arguments to update or create a LastActivities.
     * @example
     * // Update or create a LastActivities
     * const lastActivities = await prisma.lastActivities.upsert({
     *   create: {
     *     // ... data to create a LastActivities
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LastActivities we want to update
     *   }
     * })
     */
    upsert<T extends LastActivitiesUpsertArgs>(args: SelectSubset<T, LastActivitiesUpsertArgs<ExtArgs>>): Prisma__LastActivitiesClient<$Result.GetResult<Prisma.$LastActivitiesPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of LastActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LastActivitiesCountArgs} args - Arguments to filter LastActivities to count.
     * @example
     * // Count the number of LastActivities
     * const count = await prisma.lastActivities.count({
     *   where: {
     *     // ... the filter for the LastActivities we want to count
     *   }
     * })
    **/
    count<T extends LastActivitiesCountArgs>(
      args?: Subset<T, LastActivitiesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LastActivitiesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LastActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LastActivitiesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LastActivitiesAggregateArgs>(args: Subset<T, LastActivitiesAggregateArgs>): Prisma.PrismaPromise<GetLastActivitiesAggregateType<T>>

    /**
     * Group by LastActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LastActivitiesGroupByArgs} args - Group by arguments.
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
      T extends LastActivitiesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LastActivitiesGroupByArgs['orderBy'] }
        : { orderBy?: LastActivitiesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LastActivitiesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLastActivitiesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LastActivities model
   */
  readonly fields: LastActivitiesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LastActivities.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LastActivitiesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the LastActivities model
   */ 
  interface LastActivitiesFieldRefs {
    readonly id: FieldRef<"LastActivities", 'Int'>
    readonly title: FieldRef<"LastActivities", 'String'>
    readonly img: FieldRef<"LastActivities", 'String'>
  }
    

  // Custom InputTypes
  /**
   * LastActivities findUnique
   */
  export type LastActivitiesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LastActivities
     */
    select?: LastActivitiesSelect<ExtArgs> | null
    /**
     * Filter, which LastActivities to fetch.
     */
    where: LastActivitiesWhereUniqueInput
  }

  /**
   * LastActivities findUniqueOrThrow
   */
  export type LastActivitiesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LastActivities
     */
    select?: LastActivitiesSelect<ExtArgs> | null
    /**
     * Filter, which LastActivities to fetch.
     */
    where: LastActivitiesWhereUniqueInput
  }

  /**
   * LastActivities findFirst
   */
  export type LastActivitiesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LastActivities
     */
    select?: LastActivitiesSelect<ExtArgs> | null
    /**
     * Filter, which LastActivities to fetch.
     */
    where?: LastActivitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LastActivities to fetch.
     */
    orderBy?: LastActivitiesOrderByWithRelationInput | LastActivitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LastActivities.
     */
    cursor?: LastActivitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LastActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LastActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LastActivities.
     */
    distinct?: LastActivitiesScalarFieldEnum | LastActivitiesScalarFieldEnum[]
  }

  /**
   * LastActivities findFirstOrThrow
   */
  export type LastActivitiesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LastActivities
     */
    select?: LastActivitiesSelect<ExtArgs> | null
    /**
     * Filter, which LastActivities to fetch.
     */
    where?: LastActivitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LastActivities to fetch.
     */
    orderBy?: LastActivitiesOrderByWithRelationInput | LastActivitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LastActivities.
     */
    cursor?: LastActivitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LastActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LastActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LastActivities.
     */
    distinct?: LastActivitiesScalarFieldEnum | LastActivitiesScalarFieldEnum[]
  }

  /**
   * LastActivities findMany
   */
  export type LastActivitiesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LastActivities
     */
    select?: LastActivitiesSelect<ExtArgs> | null
    /**
     * Filter, which LastActivities to fetch.
     */
    where?: LastActivitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LastActivities to fetch.
     */
    orderBy?: LastActivitiesOrderByWithRelationInput | LastActivitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LastActivities.
     */
    cursor?: LastActivitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LastActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LastActivities.
     */
    skip?: number
    distinct?: LastActivitiesScalarFieldEnum | LastActivitiesScalarFieldEnum[]
  }

  /**
   * LastActivities create
   */
  export type LastActivitiesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LastActivities
     */
    select?: LastActivitiesSelect<ExtArgs> | null
    /**
     * The data needed to create a LastActivities.
     */
    data: XOR<LastActivitiesCreateInput, LastActivitiesUncheckedCreateInput>
  }

  /**
   * LastActivities createMany
   */
  export type LastActivitiesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LastActivities.
     */
    data: LastActivitiesCreateManyInput | LastActivitiesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LastActivities createManyAndReturn
   */
  export type LastActivitiesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LastActivities
     */
    select?: LastActivitiesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many LastActivities.
     */
    data: LastActivitiesCreateManyInput | LastActivitiesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LastActivities update
   */
  export type LastActivitiesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LastActivities
     */
    select?: LastActivitiesSelect<ExtArgs> | null
    /**
     * The data needed to update a LastActivities.
     */
    data: XOR<LastActivitiesUpdateInput, LastActivitiesUncheckedUpdateInput>
    /**
     * Choose, which LastActivities to update.
     */
    where: LastActivitiesWhereUniqueInput
  }

  /**
   * LastActivities updateMany
   */
  export type LastActivitiesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LastActivities.
     */
    data: XOR<LastActivitiesUpdateManyMutationInput, LastActivitiesUncheckedUpdateManyInput>
    /**
     * Filter which LastActivities to update
     */
    where?: LastActivitiesWhereInput
  }

  /**
   * LastActivities upsert
   */
  export type LastActivitiesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LastActivities
     */
    select?: LastActivitiesSelect<ExtArgs> | null
    /**
     * The filter to search for the LastActivities to update in case it exists.
     */
    where: LastActivitiesWhereUniqueInput
    /**
     * In case the LastActivities found by the `where` argument doesn't exist, create a new LastActivities with this data.
     */
    create: XOR<LastActivitiesCreateInput, LastActivitiesUncheckedCreateInput>
    /**
     * In case the LastActivities was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LastActivitiesUpdateInput, LastActivitiesUncheckedUpdateInput>
  }

  /**
   * LastActivities delete
   */
  export type LastActivitiesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LastActivities
     */
    select?: LastActivitiesSelect<ExtArgs> | null
    /**
     * Filter which LastActivities to delete.
     */
    where: LastActivitiesWhereUniqueInput
  }

  /**
   * LastActivities deleteMany
   */
  export type LastActivitiesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LastActivities to delete
     */
    where?: LastActivitiesWhereInput
  }

  /**
   * LastActivities without action
   */
  export type LastActivitiesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LastActivities
     */
    select?: LastActivitiesSelect<ExtArgs> | null
  }


  /**
   * Model Joven
   */

  export type AggregateJoven = {
    _count: JovenCountAggregateOutputType | null
    _avg: JovenAvgAggregateOutputType | null
    _sum: JovenSumAggregateOutputType | null
    _min: JovenMinAggregateOutputType | null
    _max: JovenMaxAggregateOutputType | null
  }

  export type JovenAvgAggregateOutputType = {
    id: number | null
    grupoId: number | null
  }

  export type JovenSumAggregateOutputType = {
    id: number | null
    grupoId: number | null
  }

  export type JovenMinAggregateOutputType = {
    id: number | null
    nombres: string | null
    apellidos: string | null
    documento: string | null
    telefono: string | null
    fechaNacimiento: Date | null
    sede: string | null
    grupoId: number | null
    ultimaVisita: Date | null
    activo: boolean | null
  }

  export type JovenMaxAggregateOutputType = {
    id: number | null
    nombres: string | null
    apellidos: string | null
    documento: string | null
    telefono: string | null
    fechaNacimiento: Date | null
    sede: string | null
    grupoId: number | null
    ultimaVisita: Date | null
    activo: boolean | null
  }

  export type JovenCountAggregateOutputType = {
    id: number
    nombres: number
    apellidos: number
    documento: number
    telefono: number
    fechaNacimiento: number
    sede: number
    grupoId: number
    ultimaVisita: number
    activo: number
    _all: number
  }


  export type JovenAvgAggregateInputType = {
    id?: true
    grupoId?: true
  }

  export type JovenSumAggregateInputType = {
    id?: true
    grupoId?: true
  }

  export type JovenMinAggregateInputType = {
    id?: true
    nombres?: true
    apellidos?: true
    documento?: true
    telefono?: true
    fechaNacimiento?: true
    sede?: true
    grupoId?: true
    ultimaVisita?: true
    activo?: true
  }

  export type JovenMaxAggregateInputType = {
    id?: true
    nombres?: true
    apellidos?: true
    documento?: true
    telefono?: true
    fechaNacimiento?: true
    sede?: true
    grupoId?: true
    ultimaVisita?: true
    activo?: true
  }

  export type JovenCountAggregateInputType = {
    id?: true
    nombres?: true
    apellidos?: true
    documento?: true
    telefono?: true
    fechaNacimiento?: true
    sede?: true
    grupoId?: true
    ultimaVisita?: true
    activo?: true
    _all?: true
  }

  export type JovenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Joven to aggregate.
     */
    where?: JovenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jovens to fetch.
     */
    orderBy?: JovenOrderByWithRelationInput | JovenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JovenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jovens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jovens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jovens
    **/
    _count?: true | JovenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JovenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JovenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JovenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JovenMaxAggregateInputType
  }

  export type GetJovenAggregateType<T extends JovenAggregateArgs> = {
        [P in keyof T & keyof AggregateJoven]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJoven[P]>
      : GetScalarType<T[P], AggregateJoven[P]>
  }




  export type JovenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JovenWhereInput
    orderBy?: JovenOrderByWithAggregationInput | JovenOrderByWithAggregationInput[]
    by: JovenScalarFieldEnum[] | JovenScalarFieldEnum
    having?: JovenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JovenCountAggregateInputType | true
    _avg?: JovenAvgAggregateInputType
    _sum?: JovenSumAggregateInputType
    _min?: JovenMinAggregateInputType
    _max?: JovenMaxAggregateInputType
  }

  export type JovenGroupByOutputType = {
    id: number
    nombres: string
    apellidos: string
    documento: string
    telefono: string | null
    fechaNacimiento: Date | null
    sede: string
    grupoId: number | null
    ultimaVisita: Date | null
    activo: boolean
    _count: JovenCountAggregateOutputType | null
    _avg: JovenAvgAggregateOutputType | null
    _sum: JovenSumAggregateOutputType | null
    _min: JovenMinAggregateOutputType | null
    _max: JovenMaxAggregateOutputType | null
  }

  type GetJovenGroupByPayload<T extends JovenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JovenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JovenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JovenGroupByOutputType[P]>
            : GetScalarType<T[P], JovenGroupByOutputType[P]>
        }
      >
    >


  export type JovenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombres?: boolean
    apellidos?: boolean
    documento?: boolean
    telefono?: boolean
    fechaNacimiento?: boolean
    sede?: boolean
    grupoId?: boolean
    ultimaVisita?: boolean
    activo?: boolean
    grupo?: boolean | Joven$grupoArgs<ExtArgs>
    asistencias?: boolean | Joven$asistenciasArgs<ExtArgs>
    _count?: boolean | JovenCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["joven"]>

  export type JovenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombres?: boolean
    apellidos?: boolean
    documento?: boolean
    telefono?: boolean
    fechaNacimiento?: boolean
    sede?: boolean
    grupoId?: boolean
    ultimaVisita?: boolean
    activo?: boolean
    grupo?: boolean | Joven$grupoArgs<ExtArgs>
  }, ExtArgs["result"]["joven"]>

  export type JovenSelectScalar = {
    id?: boolean
    nombres?: boolean
    apellidos?: boolean
    documento?: boolean
    telefono?: boolean
    fechaNacimiento?: boolean
    sede?: boolean
    grupoId?: boolean
    ultimaVisita?: boolean
    activo?: boolean
  }

  export type JovenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    grupo?: boolean | Joven$grupoArgs<ExtArgs>
    asistencias?: boolean | Joven$asistenciasArgs<ExtArgs>
    _count?: boolean | JovenCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JovenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    grupo?: boolean | Joven$grupoArgs<ExtArgs>
  }

  export type $JovenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Joven"
    objects: {
      grupo: Prisma.$GrupoPayload<ExtArgs> | null
      asistencias: Prisma.$AsistenciaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombres: string
      apellidos: string
      documento: string
      telefono: string | null
      fechaNacimiento: Date | null
      sede: string
      grupoId: number | null
      ultimaVisita: Date | null
      activo: boolean
    }, ExtArgs["result"]["joven"]>
    composites: {}
  }

  type JovenGetPayload<S extends boolean | null | undefined | JovenDefaultArgs> = $Result.GetResult<Prisma.$JovenPayload, S>

  type JovenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<JovenFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: JovenCountAggregateInputType | true
    }

  export interface JovenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Joven'], meta: { name: 'Joven' } }
    /**
     * Find zero or one Joven that matches the filter.
     * @param {JovenFindUniqueArgs} args - Arguments to find a Joven
     * @example
     * // Get one Joven
     * const joven = await prisma.joven.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JovenFindUniqueArgs>(args: SelectSubset<T, JovenFindUniqueArgs<ExtArgs>>): Prisma__JovenClient<$Result.GetResult<Prisma.$JovenPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Joven that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {JovenFindUniqueOrThrowArgs} args - Arguments to find a Joven
     * @example
     * // Get one Joven
     * const joven = await prisma.joven.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JovenFindUniqueOrThrowArgs>(args: SelectSubset<T, JovenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JovenClient<$Result.GetResult<Prisma.$JovenPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Joven that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JovenFindFirstArgs} args - Arguments to find a Joven
     * @example
     * // Get one Joven
     * const joven = await prisma.joven.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JovenFindFirstArgs>(args?: SelectSubset<T, JovenFindFirstArgs<ExtArgs>>): Prisma__JovenClient<$Result.GetResult<Prisma.$JovenPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Joven that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JovenFindFirstOrThrowArgs} args - Arguments to find a Joven
     * @example
     * // Get one Joven
     * const joven = await prisma.joven.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JovenFindFirstOrThrowArgs>(args?: SelectSubset<T, JovenFindFirstOrThrowArgs<ExtArgs>>): Prisma__JovenClient<$Result.GetResult<Prisma.$JovenPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Jovens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JovenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jovens
     * const jovens = await prisma.joven.findMany()
     * 
     * // Get first 10 Jovens
     * const jovens = await prisma.joven.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jovenWithIdOnly = await prisma.joven.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JovenFindManyArgs>(args?: SelectSubset<T, JovenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JovenPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Joven.
     * @param {JovenCreateArgs} args - Arguments to create a Joven.
     * @example
     * // Create one Joven
     * const Joven = await prisma.joven.create({
     *   data: {
     *     // ... data to create a Joven
     *   }
     * })
     * 
     */
    create<T extends JovenCreateArgs>(args: SelectSubset<T, JovenCreateArgs<ExtArgs>>): Prisma__JovenClient<$Result.GetResult<Prisma.$JovenPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Jovens.
     * @param {JovenCreateManyArgs} args - Arguments to create many Jovens.
     * @example
     * // Create many Jovens
     * const joven = await prisma.joven.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JovenCreateManyArgs>(args?: SelectSubset<T, JovenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Jovens and returns the data saved in the database.
     * @param {JovenCreateManyAndReturnArgs} args - Arguments to create many Jovens.
     * @example
     * // Create many Jovens
     * const joven = await prisma.joven.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Jovens and only return the `id`
     * const jovenWithIdOnly = await prisma.joven.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JovenCreateManyAndReturnArgs>(args?: SelectSubset<T, JovenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JovenPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Joven.
     * @param {JovenDeleteArgs} args - Arguments to delete one Joven.
     * @example
     * // Delete one Joven
     * const Joven = await prisma.joven.delete({
     *   where: {
     *     // ... filter to delete one Joven
     *   }
     * })
     * 
     */
    delete<T extends JovenDeleteArgs>(args: SelectSubset<T, JovenDeleteArgs<ExtArgs>>): Prisma__JovenClient<$Result.GetResult<Prisma.$JovenPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Joven.
     * @param {JovenUpdateArgs} args - Arguments to update one Joven.
     * @example
     * // Update one Joven
     * const joven = await prisma.joven.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JovenUpdateArgs>(args: SelectSubset<T, JovenUpdateArgs<ExtArgs>>): Prisma__JovenClient<$Result.GetResult<Prisma.$JovenPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Jovens.
     * @param {JovenDeleteManyArgs} args - Arguments to filter Jovens to delete.
     * @example
     * // Delete a few Jovens
     * const { count } = await prisma.joven.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JovenDeleteManyArgs>(args?: SelectSubset<T, JovenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jovens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JovenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jovens
     * const joven = await prisma.joven.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JovenUpdateManyArgs>(args: SelectSubset<T, JovenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Joven.
     * @param {JovenUpsertArgs} args - Arguments to update or create a Joven.
     * @example
     * // Update or create a Joven
     * const joven = await prisma.joven.upsert({
     *   create: {
     *     // ... data to create a Joven
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Joven we want to update
     *   }
     * })
     */
    upsert<T extends JovenUpsertArgs>(args: SelectSubset<T, JovenUpsertArgs<ExtArgs>>): Prisma__JovenClient<$Result.GetResult<Prisma.$JovenPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Jovens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JovenCountArgs} args - Arguments to filter Jovens to count.
     * @example
     * // Count the number of Jovens
     * const count = await prisma.joven.count({
     *   where: {
     *     // ... the filter for the Jovens we want to count
     *   }
     * })
    **/
    count<T extends JovenCountArgs>(
      args?: Subset<T, JovenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JovenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Joven.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JovenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JovenAggregateArgs>(args: Subset<T, JovenAggregateArgs>): Prisma.PrismaPromise<GetJovenAggregateType<T>>

    /**
     * Group by Joven.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JovenGroupByArgs} args - Group by arguments.
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
      T extends JovenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JovenGroupByArgs['orderBy'] }
        : { orderBy?: JovenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JovenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJovenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Joven model
   */
  readonly fields: JovenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Joven.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JovenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    grupo<T extends Joven$grupoArgs<ExtArgs> = {}>(args?: Subset<T, Joven$grupoArgs<ExtArgs>>): Prisma__GrupoClient<$Result.GetResult<Prisma.$GrupoPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    asistencias<T extends Joven$asistenciasArgs<ExtArgs> = {}>(args?: Subset<T, Joven$asistenciasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AsistenciaPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Joven model
   */ 
  interface JovenFieldRefs {
    readonly id: FieldRef<"Joven", 'Int'>
    readonly nombres: FieldRef<"Joven", 'String'>
    readonly apellidos: FieldRef<"Joven", 'String'>
    readonly documento: FieldRef<"Joven", 'String'>
    readonly telefono: FieldRef<"Joven", 'String'>
    readonly fechaNacimiento: FieldRef<"Joven", 'DateTime'>
    readonly sede: FieldRef<"Joven", 'String'>
    readonly grupoId: FieldRef<"Joven", 'Int'>
    readonly ultimaVisita: FieldRef<"Joven", 'DateTime'>
    readonly activo: FieldRef<"Joven", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Joven findUnique
   */
  export type JovenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joven
     */
    select?: JovenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JovenInclude<ExtArgs> | null
    /**
     * Filter, which Joven to fetch.
     */
    where: JovenWhereUniqueInput
  }

  /**
   * Joven findUniqueOrThrow
   */
  export type JovenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joven
     */
    select?: JovenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JovenInclude<ExtArgs> | null
    /**
     * Filter, which Joven to fetch.
     */
    where: JovenWhereUniqueInput
  }

  /**
   * Joven findFirst
   */
  export type JovenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joven
     */
    select?: JovenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JovenInclude<ExtArgs> | null
    /**
     * Filter, which Joven to fetch.
     */
    where?: JovenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jovens to fetch.
     */
    orderBy?: JovenOrderByWithRelationInput | JovenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jovens.
     */
    cursor?: JovenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jovens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jovens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jovens.
     */
    distinct?: JovenScalarFieldEnum | JovenScalarFieldEnum[]
  }

  /**
   * Joven findFirstOrThrow
   */
  export type JovenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joven
     */
    select?: JovenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JovenInclude<ExtArgs> | null
    /**
     * Filter, which Joven to fetch.
     */
    where?: JovenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jovens to fetch.
     */
    orderBy?: JovenOrderByWithRelationInput | JovenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jovens.
     */
    cursor?: JovenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jovens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jovens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jovens.
     */
    distinct?: JovenScalarFieldEnum | JovenScalarFieldEnum[]
  }

  /**
   * Joven findMany
   */
  export type JovenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joven
     */
    select?: JovenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JovenInclude<ExtArgs> | null
    /**
     * Filter, which Jovens to fetch.
     */
    where?: JovenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jovens to fetch.
     */
    orderBy?: JovenOrderByWithRelationInput | JovenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jovens.
     */
    cursor?: JovenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jovens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jovens.
     */
    skip?: number
    distinct?: JovenScalarFieldEnum | JovenScalarFieldEnum[]
  }

  /**
   * Joven create
   */
  export type JovenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joven
     */
    select?: JovenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JovenInclude<ExtArgs> | null
    /**
     * The data needed to create a Joven.
     */
    data: XOR<JovenCreateInput, JovenUncheckedCreateInput>
  }

  /**
   * Joven createMany
   */
  export type JovenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Jovens.
     */
    data: JovenCreateManyInput | JovenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Joven createManyAndReturn
   */
  export type JovenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joven
     */
    select?: JovenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Jovens.
     */
    data: JovenCreateManyInput | JovenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JovenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Joven update
   */
  export type JovenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joven
     */
    select?: JovenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JovenInclude<ExtArgs> | null
    /**
     * The data needed to update a Joven.
     */
    data: XOR<JovenUpdateInput, JovenUncheckedUpdateInput>
    /**
     * Choose, which Joven to update.
     */
    where: JovenWhereUniqueInput
  }

  /**
   * Joven updateMany
   */
  export type JovenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jovens.
     */
    data: XOR<JovenUpdateManyMutationInput, JovenUncheckedUpdateManyInput>
    /**
     * Filter which Jovens to update
     */
    where?: JovenWhereInput
  }

  /**
   * Joven upsert
   */
  export type JovenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joven
     */
    select?: JovenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JovenInclude<ExtArgs> | null
    /**
     * The filter to search for the Joven to update in case it exists.
     */
    where: JovenWhereUniqueInput
    /**
     * In case the Joven found by the `where` argument doesn't exist, create a new Joven with this data.
     */
    create: XOR<JovenCreateInput, JovenUncheckedCreateInput>
    /**
     * In case the Joven was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JovenUpdateInput, JovenUncheckedUpdateInput>
  }

  /**
   * Joven delete
   */
  export type JovenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joven
     */
    select?: JovenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JovenInclude<ExtArgs> | null
    /**
     * Filter which Joven to delete.
     */
    where: JovenWhereUniqueInput
  }

  /**
   * Joven deleteMany
   */
  export type JovenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jovens to delete
     */
    where?: JovenWhereInput
  }

  /**
   * Joven.grupo
   */
  export type Joven$grupoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grupo
     */
    select?: GrupoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrupoInclude<ExtArgs> | null
    where?: GrupoWhereInput
  }

  /**
   * Joven.asistencias
   */
  export type Joven$asistenciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asistencia
     */
    select?: AsistenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AsistenciaInclude<ExtArgs> | null
    where?: AsistenciaWhereInput
    orderBy?: AsistenciaOrderByWithRelationInput | AsistenciaOrderByWithRelationInput[]
    cursor?: AsistenciaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AsistenciaScalarFieldEnum | AsistenciaScalarFieldEnum[]
  }

  /**
   * Joven without action
   */
  export type JovenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joven
     */
    select?: JovenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JovenInclude<ExtArgs> | null
  }


  /**
   * Model Asistencia
   */

  export type AggregateAsistencia = {
    _count: AsistenciaCountAggregateOutputType | null
    _avg: AsistenciaAvgAggregateOutputType | null
    _sum: AsistenciaSumAggregateOutputType | null
    _min: AsistenciaMinAggregateOutputType | null
    _max: AsistenciaMaxAggregateOutputType | null
  }

  export type AsistenciaAvgAggregateOutputType = {
    id: number | null
    jovenId: number | null
  }

  export type AsistenciaSumAggregateOutputType = {
    id: number | null
    jovenId: number | null
  }

  export type AsistenciaMinAggregateOutputType = {
    id: number | null
    fecha: Date | null
    jovenId: number | null
  }

  export type AsistenciaMaxAggregateOutputType = {
    id: number | null
    fecha: Date | null
    jovenId: number | null
  }

  export type AsistenciaCountAggregateOutputType = {
    id: number
    fecha: number
    jovenId: number
    _all: number
  }


  export type AsistenciaAvgAggregateInputType = {
    id?: true
    jovenId?: true
  }

  export type AsistenciaSumAggregateInputType = {
    id?: true
    jovenId?: true
  }

  export type AsistenciaMinAggregateInputType = {
    id?: true
    fecha?: true
    jovenId?: true
  }

  export type AsistenciaMaxAggregateInputType = {
    id?: true
    fecha?: true
    jovenId?: true
  }

  export type AsistenciaCountAggregateInputType = {
    id?: true
    fecha?: true
    jovenId?: true
    _all?: true
  }

  export type AsistenciaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Asistencia to aggregate.
     */
    where?: AsistenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Asistencias to fetch.
     */
    orderBy?: AsistenciaOrderByWithRelationInput | AsistenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AsistenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Asistencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Asistencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Asistencias
    **/
    _count?: true | AsistenciaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AsistenciaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AsistenciaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AsistenciaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AsistenciaMaxAggregateInputType
  }

  export type GetAsistenciaAggregateType<T extends AsistenciaAggregateArgs> = {
        [P in keyof T & keyof AggregateAsistencia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAsistencia[P]>
      : GetScalarType<T[P], AggregateAsistencia[P]>
  }




  export type AsistenciaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AsistenciaWhereInput
    orderBy?: AsistenciaOrderByWithAggregationInput | AsistenciaOrderByWithAggregationInput[]
    by: AsistenciaScalarFieldEnum[] | AsistenciaScalarFieldEnum
    having?: AsistenciaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AsistenciaCountAggregateInputType | true
    _avg?: AsistenciaAvgAggregateInputType
    _sum?: AsistenciaSumAggregateInputType
    _min?: AsistenciaMinAggregateInputType
    _max?: AsistenciaMaxAggregateInputType
  }

  export type AsistenciaGroupByOutputType = {
    id: number
    fecha: Date
    jovenId: number
    _count: AsistenciaCountAggregateOutputType | null
    _avg: AsistenciaAvgAggregateOutputType | null
    _sum: AsistenciaSumAggregateOutputType | null
    _min: AsistenciaMinAggregateOutputType | null
    _max: AsistenciaMaxAggregateOutputType | null
  }

  type GetAsistenciaGroupByPayload<T extends AsistenciaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AsistenciaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AsistenciaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AsistenciaGroupByOutputType[P]>
            : GetScalarType<T[P], AsistenciaGroupByOutputType[P]>
        }
      >
    >


  export type AsistenciaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fecha?: boolean
    jovenId?: boolean
    joven?: boolean | JovenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["asistencia"]>

  export type AsistenciaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fecha?: boolean
    jovenId?: boolean
    joven?: boolean | JovenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["asistencia"]>

  export type AsistenciaSelectScalar = {
    id?: boolean
    fecha?: boolean
    jovenId?: boolean
  }

  export type AsistenciaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    joven?: boolean | JovenDefaultArgs<ExtArgs>
  }
  export type AsistenciaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    joven?: boolean | JovenDefaultArgs<ExtArgs>
  }

  export type $AsistenciaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Asistencia"
    objects: {
      joven: Prisma.$JovenPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      fecha: Date
      jovenId: number
    }, ExtArgs["result"]["asistencia"]>
    composites: {}
  }

  type AsistenciaGetPayload<S extends boolean | null | undefined | AsistenciaDefaultArgs> = $Result.GetResult<Prisma.$AsistenciaPayload, S>

  type AsistenciaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AsistenciaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AsistenciaCountAggregateInputType | true
    }

  export interface AsistenciaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Asistencia'], meta: { name: 'Asistencia' } }
    /**
     * Find zero or one Asistencia that matches the filter.
     * @param {AsistenciaFindUniqueArgs} args - Arguments to find a Asistencia
     * @example
     * // Get one Asistencia
     * const asistencia = await prisma.asistencia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AsistenciaFindUniqueArgs>(args: SelectSubset<T, AsistenciaFindUniqueArgs<ExtArgs>>): Prisma__AsistenciaClient<$Result.GetResult<Prisma.$AsistenciaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Asistencia that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AsistenciaFindUniqueOrThrowArgs} args - Arguments to find a Asistencia
     * @example
     * // Get one Asistencia
     * const asistencia = await prisma.asistencia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AsistenciaFindUniqueOrThrowArgs>(args: SelectSubset<T, AsistenciaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AsistenciaClient<$Result.GetResult<Prisma.$AsistenciaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Asistencia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AsistenciaFindFirstArgs} args - Arguments to find a Asistencia
     * @example
     * // Get one Asistencia
     * const asistencia = await prisma.asistencia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AsistenciaFindFirstArgs>(args?: SelectSubset<T, AsistenciaFindFirstArgs<ExtArgs>>): Prisma__AsistenciaClient<$Result.GetResult<Prisma.$AsistenciaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Asistencia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AsistenciaFindFirstOrThrowArgs} args - Arguments to find a Asistencia
     * @example
     * // Get one Asistencia
     * const asistencia = await prisma.asistencia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AsistenciaFindFirstOrThrowArgs>(args?: SelectSubset<T, AsistenciaFindFirstOrThrowArgs<ExtArgs>>): Prisma__AsistenciaClient<$Result.GetResult<Prisma.$AsistenciaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Asistencias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AsistenciaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Asistencias
     * const asistencias = await prisma.asistencia.findMany()
     * 
     * // Get first 10 Asistencias
     * const asistencias = await prisma.asistencia.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const asistenciaWithIdOnly = await prisma.asistencia.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AsistenciaFindManyArgs>(args?: SelectSubset<T, AsistenciaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AsistenciaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Asistencia.
     * @param {AsistenciaCreateArgs} args - Arguments to create a Asistencia.
     * @example
     * // Create one Asistencia
     * const Asistencia = await prisma.asistencia.create({
     *   data: {
     *     // ... data to create a Asistencia
     *   }
     * })
     * 
     */
    create<T extends AsistenciaCreateArgs>(args: SelectSubset<T, AsistenciaCreateArgs<ExtArgs>>): Prisma__AsistenciaClient<$Result.GetResult<Prisma.$AsistenciaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Asistencias.
     * @param {AsistenciaCreateManyArgs} args - Arguments to create many Asistencias.
     * @example
     * // Create many Asistencias
     * const asistencia = await prisma.asistencia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AsistenciaCreateManyArgs>(args?: SelectSubset<T, AsistenciaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Asistencias and returns the data saved in the database.
     * @param {AsistenciaCreateManyAndReturnArgs} args - Arguments to create many Asistencias.
     * @example
     * // Create many Asistencias
     * const asistencia = await prisma.asistencia.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Asistencias and only return the `id`
     * const asistenciaWithIdOnly = await prisma.asistencia.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AsistenciaCreateManyAndReturnArgs>(args?: SelectSubset<T, AsistenciaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AsistenciaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Asistencia.
     * @param {AsistenciaDeleteArgs} args - Arguments to delete one Asistencia.
     * @example
     * // Delete one Asistencia
     * const Asistencia = await prisma.asistencia.delete({
     *   where: {
     *     // ... filter to delete one Asistencia
     *   }
     * })
     * 
     */
    delete<T extends AsistenciaDeleteArgs>(args: SelectSubset<T, AsistenciaDeleteArgs<ExtArgs>>): Prisma__AsistenciaClient<$Result.GetResult<Prisma.$AsistenciaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Asistencia.
     * @param {AsistenciaUpdateArgs} args - Arguments to update one Asistencia.
     * @example
     * // Update one Asistencia
     * const asistencia = await prisma.asistencia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AsistenciaUpdateArgs>(args: SelectSubset<T, AsistenciaUpdateArgs<ExtArgs>>): Prisma__AsistenciaClient<$Result.GetResult<Prisma.$AsistenciaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Asistencias.
     * @param {AsistenciaDeleteManyArgs} args - Arguments to filter Asistencias to delete.
     * @example
     * // Delete a few Asistencias
     * const { count } = await prisma.asistencia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AsistenciaDeleteManyArgs>(args?: SelectSubset<T, AsistenciaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Asistencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AsistenciaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Asistencias
     * const asistencia = await prisma.asistencia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AsistenciaUpdateManyArgs>(args: SelectSubset<T, AsistenciaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Asistencia.
     * @param {AsistenciaUpsertArgs} args - Arguments to update or create a Asistencia.
     * @example
     * // Update or create a Asistencia
     * const asistencia = await prisma.asistencia.upsert({
     *   create: {
     *     // ... data to create a Asistencia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Asistencia we want to update
     *   }
     * })
     */
    upsert<T extends AsistenciaUpsertArgs>(args: SelectSubset<T, AsistenciaUpsertArgs<ExtArgs>>): Prisma__AsistenciaClient<$Result.GetResult<Prisma.$AsistenciaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Asistencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AsistenciaCountArgs} args - Arguments to filter Asistencias to count.
     * @example
     * // Count the number of Asistencias
     * const count = await prisma.asistencia.count({
     *   where: {
     *     // ... the filter for the Asistencias we want to count
     *   }
     * })
    **/
    count<T extends AsistenciaCountArgs>(
      args?: Subset<T, AsistenciaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AsistenciaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Asistencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AsistenciaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AsistenciaAggregateArgs>(args: Subset<T, AsistenciaAggregateArgs>): Prisma.PrismaPromise<GetAsistenciaAggregateType<T>>

    /**
     * Group by Asistencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AsistenciaGroupByArgs} args - Group by arguments.
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
      T extends AsistenciaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AsistenciaGroupByArgs['orderBy'] }
        : { orderBy?: AsistenciaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AsistenciaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAsistenciaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Asistencia model
   */
  readonly fields: AsistenciaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Asistencia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AsistenciaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    joven<T extends JovenDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JovenDefaultArgs<ExtArgs>>): Prisma__JovenClient<$Result.GetResult<Prisma.$JovenPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Asistencia model
   */ 
  interface AsistenciaFieldRefs {
    readonly id: FieldRef<"Asistencia", 'Int'>
    readonly fecha: FieldRef<"Asistencia", 'DateTime'>
    readonly jovenId: FieldRef<"Asistencia", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Asistencia findUnique
   */
  export type AsistenciaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asistencia
     */
    select?: AsistenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AsistenciaInclude<ExtArgs> | null
    /**
     * Filter, which Asistencia to fetch.
     */
    where: AsistenciaWhereUniqueInput
  }

  /**
   * Asistencia findUniqueOrThrow
   */
  export type AsistenciaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asistencia
     */
    select?: AsistenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AsistenciaInclude<ExtArgs> | null
    /**
     * Filter, which Asistencia to fetch.
     */
    where: AsistenciaWhereUniqueInput
  }

  /**
   * Asistencia findFirst
   */
  export type AsistenciaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asistencia
     */
    select?: AsistenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AsistenciaInclude<ExtArgs> | null
    /**
     * Filter, which Asistencia to fetch.
     */
    where?: AsistenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Asistencias to fetch.
     */
    orderBy?: AsistenciaOrderByWithRelationInput | AsistenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Asistencias.
     */
    cursor?: AsistenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Asistencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Asistencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Asistencias.
     */
    distinct?: AsistenciaScalarFieldEnum | AsistenciaScalarFieldEnum[]
  }

  /**
   * Asistencia findFirstOrThrow
   */
  export type AsistenciaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asistencia
     */
    select?: AsistenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AsistenciaInclude<ExtArgs> | null
    /**
     * Filter, which Asistencia to fetch.
     */
    where?: AsistenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Asistencias to fetch.
     */
    orderBy?: AsistenciaOrderByWithRelationInput | AsistenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Asistencias.
     */
    cursor?: AsistenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Asistencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Asistencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Asistencias.
     */
    distinct?: AsistenciaScalarFieldEnum | AsistenciaScalarFieldEnum[]
  }

  /**
   * Asistencia findMany
   */
  export type AsistenciaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asistencia
     */
    select?: AsistenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AsistenciaInclude<ExtArgs> | null
    /**
     * Filter, which Asistencias to fetch.
     */
    where?: AsistenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Asistencias to fetch.
     */
    orderBy?: AsistenciaOrderByWithRelationInput | AsistenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Asistencias.
     */
    cursor?: AsistenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Asistencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Asistencias.
     */
    skip?: number
    distinct?: AsistenciaScalarFieldEnum | AsistenciaScalarFieldEnum[]
  }

  /**
   * Asistencia create
   */
  export type AsistenciaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asistencia
     */
    select?: AsistenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AsistenciaInclude<ExtArgs> | null
    /**
     * The data needed to create a Asistencia.
     */
    data: XOR<AsistenciaCreateInput, AsistenciaUncheckedCreateInput>
  }

  /**
   * Asistencia createMany
   */
  export type AsistenciaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Asistencias.
     */
    data: AsistenciaCreateManyInput | AsistenciaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Asistencia createManyAndReturn
   */
  export type AsistenciaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asistencia
     */
    select?: AsistenciaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Asistencias.
     */
    data: AsistenciaCreateManyInput | AsistenciaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AsistenciaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Asistencia update
   */
  export type AsistenciaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asistencia
     */
    select?: AsistenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AsistenciaInclude<ExtArgs> | null
    /**
     * The data needed to update a Asistencia.
     */
    data: XOR<AsistenciaUpdateInput, AsistenciaUncheckedUpdateInput>
    /**
     * Choose, which Asistencia to update.
     */
    where: AsistenciaWhereUniqueInput
  }

  /**
   * Asistencia updateMany
   */
  export type AsistenciaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Asistencias.
     */
    data: XOR<AsistenciaUpdateManyMutationInput, AsistenciaUncheckedUpdateManyInput>
    /**
     * Filter which Asistencias to update
     */
    where?: AsistenciaWhereInput
  }

  /**
   * Asistencia upsert
   */
  export type AsistenciaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asistencia
     */
    select?: AsistenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AsistenciaInclude<ExtArgs> | null
    /**
     * The filter to search for the Asistencia to update in case it exists.
     */
    where: AsistenciaWhereUniqueInput
    /**
     * In case the Asistencia found by the `where` argument doesn't exist, create a new Asistencia with this data.
     */
    create: XOR<AsistenciaCreateInput, AsistenciaUncheckedCreateInput>
    /**
     * In case the Asistencia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AsistenciaUpdateInput, AsistenciaUncheckedUpdateInput>
  }

  /**
   * Asistencia delete
   */
  export type AsistenciaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asistencia
     */
    select?: AsistenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AsistenciaInclude<ExtArgs> | null
    /**
     * Filter which Asistencia to delete.
     */
    where: AsistenciaWhereUniqueInput
  }

  /**
   * Asistencia deleteMany
   */
  export type AsistenciaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Asistencias to delete
     */
    where?: AsistenciaWhereInput
  }

  /**
   * Asistencia without action
   */
  export type AsistenciaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asistencia
     */
    select?: AsistenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AsistenciaInclude<ExtArgs> | null
  }


  /**
   * Model AllowedUser
   */

  export type AggregateAllowedUser = {
    _count: AllowedUserCountAggregateOutputType | null
    _min: AllowedUserMinAggregateOutputType | null
    _max: AllowedUserMaxAggregateOutputType | null
  }

  export type AllowedUserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: string | null
    createdAt: Date | null
  }

  export type AllowedUserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: string | null
    createdAt: Date | null
  }

  export type AllowedUserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    role: number
    createdAt: number
    _all: number
  }


  export type AllowedUserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    createdAt?: true
  }

  export type AllowedUserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    createdAt?: true
  }

  export type AllowedUserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type AllowedUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AllowedUser to aggregate.
     */
    where?: AllowedUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AllowedUsers to fetch.
     */
    orderBy?: AllowedUserOrderByWithRelationInput | AllowedUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AllowedUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AllowedUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AllowedUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AllowedUsers
    **/
    _count?: true | AllowedUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AllowedUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AllowedUserMaxAggregateInputType
  }

  export type GetAllowedUserAggregateType<T extends AllowedUserAggregateArgs> = {
        [P in keyof T & keyof AggregateAllowedUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAllowedUser[P]>
      : GetScalarType<T[P], AggregateAllowedUser[P]>
  }




  export type AllowedUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AllowedUserWhereInput
    orderBy?: AllowedUserOrderByWithAggregationInput | AllowedUserOrderByWithAggregationInput[]
    by: AllowedUserScalarFieldEnum[] | AllowedUserScalarFieldEnum
    having?: AllowedUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AllowedUserCountAggregateInputType | true
    _min?: AllowedUserMinAggregateInputType
    _max?: AllowedUserMaxAggregateInputType
  }

  export type AllowedUserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    role: string
    createdAt: Date
    _count: AllowedUserCountAggregateOutputType | null
    _min: AllowedUserMinAggregateOutputType | null
    _max: AllowedUserMaxAggregateOutputType | null
  }

  type GetAllowedUserGroupByPayload<T extends AllowedUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AllowedUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AllowedUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AllowedUserGroupByOutputType[P]>
            : GetScalarType<T[P], AllowedUserGroupByOutputType[P]>
        }
      >
    >


  export type AllowedUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["allowedUser"]>

  export type AllowedUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["allowedUser"]>

  export type AllowedUserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
  }


  export type $AllowedUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AllowedUser"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      role: string
      createdAt: Date
    }, ExtArgs["result"]["allowedUser"]>
    composites: {}
  }

  type AllowedUserGetPayload<S extends boolean | null | undefined | AllowedUserDefaultArgs> = $Result.GetResult<Prisma.$AllowedUserPayload, S>

  type AllowedUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AllowedUserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AllowedUserCountAggregateInputType | true
    }

  export interface AllowedUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AllowedUser'], meta: { name: 'AllowedUser' } }
    /**
     * Find zero or one AllowedUser that matches the filter.
     * @param {AllowedUserFindUniqueArgs} args - Arguments to find a AllowedUser
     * @example
     * // Get one AllowedUser
     * const allowedUser = await prisma.allowedUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AllowedUserFindUniqueArgs>(args: SelectSubset<T, AllowedUserFindUniqueArgs<ExtArgs>>): Prisma__AllowedUserClient<$Result.GetResult<Prisma.$AllowedUserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AllowedUser that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AllowedUserFindUniqueOrThrowArgs} args - Arguments to find a AllowedUser
     * @example
     * // Get one AllowedUser
     * const allowedUser = await prisma.allowedUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AllowedUserFindUniqueOrThrowArgs>(args: SelectSubset<T, AllowedUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AllowedUserClient<$Result.GetResult<Prisma.$AllowedUserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AllowedUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllowedUserFindFirstArgs} args - Arguments to find a AllowedUser
     * @example
     * // Get one AllowedUser
     * const allowedUser = await prisma.allowedUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AllowedUserFindFirstArgs>(args?: SelectSubset<T, AllowedUserFindFirstArgs<ExtArgs>>): Prisma__AllowedUserClient<$Result.GetResult<Prisma.$AllowedUserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AllowedUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllowedUserFindFirstOrThrowArgs} args - Arguments to find a AllowedUser
     * @example
     * // Get one AllowedUser
     * const allowedUser = await prisma.allowedUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AllowedUserFindFirstOrThrowArgs>(args?: SelectSubset<T, AllowedUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__AllowedUserClient<$Result.GetResult<Prisma.$AllowedUserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AllowedUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllowedUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AllowedUsers
     * const allowedUsers = await prisma.allowedUser.findMany()
     * 
     * // Get first 10 AllowedUsers
     * const allowedUsers = await prisma.allowedUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const allowedUserWithIdOnly = await prisma.allowedUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AllowedUserFindManyArgs>(args?: SelectSubset<T, AllowedUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AllowedUserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AllowedUser.
     * @param {AllowedUserCreateArgs} args - Arguments to create a AllowedUser.
     * @example
     * // Create one AllowedUser
     * const AllowedUser = await prisma.allowedUser.create({
     *   data: {
     *     // ... data to create a AllowedUser
     *   }
     * })
     * 
     */
    create<T extends AllowedUserCreateArgs>(args: SelectSubset<T, AllowedUserCreateArgs<ExtArgs>>): Prisma__AllowedUserClient<$Result.GetResult<Prisma.$AllowedUserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AllowedUsers.
     * @param {AllowedUserCreateManyArgs} args - Arguments to create many AllowedUsers.
     * @example
     * // Create many AllowedUsers
     * const allowedUser = await prisma.allowedUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AllowedUserCreateManyArgs>(args?: SelectSubset<T, AllowedUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AllowedUsers and returns the data saved in the database.
     * @param {AllowedUserCreateManyAndReturnArgs} args - Arguments to create many AllowedUsers.
     * @example
     * // Create many AllowedUsers
     * const allowedUser = await prisma.allowedUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AllowedUsers and only return the `id`
     * const allowedUserWithIdOnly = await prisma.allowedUser.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AllowedUserCreateManyAndReturnArgs>(args?: SelectSubset<T, AllowedUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AllowedUserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AllowedUser.
     * @param {AllowedUserDeleteArgs} args - Arguments to delete one AllowedUser.
     * @example
     * // Delete one AllowedUser
     * const AllowedUser = await prisma.allowedUser.delete({
     *   where: {
     *     // ... filter to delete one AllowedUser
     *   }
     * })
     * 
     */
    delete<T extends AllowedUserDeleteArgs>(args: SelectSubset<T, AllowedUserDeleteArgs<ExtArgs>>): Prisma__AllowedUserClient<$Result.GetResult<Prisma.$AllowedUserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AllowedUser.
     * @param {AllowedUserUpdateArgs} args - Arguments to update one AllowedUser.
     * @example
     * // Update one AllowedUser
     * const allowedUser = await prisma.allowedUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AllowedUserUpdateArgs>(args: SelectSubset<T, AllowedUserUpdateArgs<ExtArgs>>): Prisma__AllowedUserClient<$Result.GetResult<Prisma.$AllowedUserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AllowedUsers.
     * @param {AllowedUserDeleteManyArgs} args - Arguments to filter AllowedUsers to delete.
     * @example
     * // Delete a few AllowedUsers
     * const { count } = await prisma.allowedUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AllowedUserDeleteManyArgs>(args?: SelectSubset<T, AllowedUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AllowedUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllowedUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AllowedUsers
     * const allowedUser = await prisma.allowedUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AllowedUserUpdateManyArgs>(args: SelectSubset<T, AllowedUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AllowedUser.
     * @param {AllowedUserUpsertArgs} args - Arguments to update or create a AllowedUser.
     * @example
     * // Update or create a AllowedUser
     * const allowedUser = await prisma.allowedUser.upsert({
     *   create: {
     *     // ... data to create a AllowedUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AllowedUser we want to update
     *   }
     * })
     */
    upsert<T extends AllowedUserUpsertArgs>(args: SelectSubset<T, AllowedUserUpsertArgs<ExtArgs>>): Prisma__AllowedUserClient<$Result.GetResult<Prisma.$AllowedUserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AllowedUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllowedUserCountArgs} args - Arguments to filter AllowedUsers to count.
     * @example
     * // Count the number of AllowedUsers
     * const count = await prisma.allowedUser.count({
     *   where: {
     *     // ... the filter for the AllowedUsers we want to count
     *   }
     * })
    **/
    count<T extends AllowedUserCountArgs>(
      args?: Subset<T, AllowedUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AllowedUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AllowedUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllowedUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AllowedUserAggregateArgs>(args: Subset<T, AllowedUserAggregateArgs>): Prisma.PrismaPromise<GetAllowedUserAggregateType<T>>

    /**
     * Group by AllowedUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllowedUserGroupByArgs} args - Group by arguments.
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
      T extends AllowedUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AllowedUserGroupByArgs['orderBy'] }
        : { orderBy?: AllowedUserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AllowedUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAllowedUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AllowedUser model
   */
  readonly fields: AllowedUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AllowedUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AllowedUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AllowedUser model
   */ 
  interface AllowedUserFieldRefs {
    readonly id: FieldRef<"AllowedUser", 'String'>
    readonly email: FieldRef<"AllowedUser", 'String'>
    readonly name: FieldRef<"AllowedUser", 'String'>
    readonly role: FieldRef<"AllowedUser", 'String'>
    readonly createdAt: FieldRef<"AllowedUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AllowedUser findUnique
   */
  export type AllowedUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowedUser
     */
    select?: AllowedUserSelect<ExtArgs> | null
    /**
     * Filter, which AllowedUser to fetch.
     */
    where: AllowedUserWhereUniqueInput
  }

  /**
   * AllowedUser findUniqueOrThrow
   */
  export type AllowedUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowedUser
     */
    select?: AllowedUserSelect<ExtArgs> | null
    /**
     * Filter, which AllowedUser to fetch.
     */
    where: AllowedUserWhereUniqueInput
  }

  /**
   * AllowedUser findFirst
   */
  export type AllowedUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowedUser
     */
    select?: AllowedUserSelect<ExtArgs> | null
    /**
     * Filter, which AllowedUser to fetch.
     */
    where?: AllowedUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AllowedUsers to fetch.
     */
    orderBy?: AllowedUserOrderByWithRelationInput | AllowedUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AllowedUsers.
     */
    cursor?: AllowedUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AllowedUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AllowedUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AllowedUsers.
     */
    distinct?: AllowedUserScalarFieldEnum | AllowedUserScalarFieldEnum[]
  }

  /**
   * AllowedUser findFirstOrThrow
   */
  export type AllowedUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowedUser
     */
    select?: AllowedUserSelect<ExtArgs> | null
    /**
     * Filter, which AllowedUser to fetch.
     */
    where?: AllowedUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AllowedUsers to fetch.
     */
    orderBy?: AllowedUserOrderByWithRelationInput | AllowedUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AllowedUsers.
     */
    cursor?: AllowedUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AllowedUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AllowedUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AllowedUsers.
     */
    distinct?: AllowedUserScalarFieldEnum | AllowedUserScalarFieldEnum[]
  }

  /**
   * AllowedUser findMany
   */
  export type AllowedUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowedUser
     */
    select?: AllowedUserSelect<ExtArgs> | null
    /**
     * Filter, which AllowedUsers to fetch.
     */
    where?: AllowedUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AllowedUsers to fetch.
     */
    orderBy?: AllowedUserOrderByWithRelationInput | AllowedUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AllowedUsers.
     */
    cursor?: AllowedUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AllowedUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AllowedUsers.
     */
    skip?: number
    distinct?: AllowedUserScalarFieldEnum | AllowedUserScalarFieldEnum[]
  }

  /**
   * AllowedUser create
   */
  export type AllowedUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowedUser
     */
    select?: AllowedUserSelect<ExtArgs> | null
    /**
     * The data needed to create a AllowedUser.
     */
    data: XOR<AllowedUserCreateInput, AllowedUserUncheckedCreateInput>
  }

  /**
   * AllowedUser createMany
   */
  export type AllowedUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AllowedUsers.
     */
    data: AllowedUserCreateManyInput | AllowedUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AllowedUser createManyAndReturn
   */
  export type AllowedUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowedUser
     */
    select?: AllowedUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AllowedUsers.
     */
    data: AllowedUserCreateManyInput | AllowedUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AllowedUser update
   */
  export type AllowedUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowedUser
     */
    select?: AllowedUserSelect<ExtArgs> | null
    /**
     * The data needed to update a AllowedUser.
     */
    data: XOR<AllowedUserUpdateInput, AllowedUserUncheckedUpdateInput>
    /**
     * Choose, which AllowedUser to update.
     */
    where: AllowedUserWhereUniqueInput
  }

  /**
   * AllowedUser updateMany
   */
  export type AllowedUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AllowedUsers.
     */
    data: XOR<AllowedUserUpdateManyMutationInput, AllowedUserUncheckedUpdateManyInput>
    /**
     * Filter which AllowedUsers to update
     */
    where?: AllowedUserWhereInput
  }

  /**
   * AllowedUser upsert
   */
  export type AllowedUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowedUser
     */
    select?: AllowedUserSelect<ExtArgs> | null
    /**
     * The filter to search for the AllowedUser to update in case it exists.
     */
    where: AllowedUserWhereUniqueInput
    /**
     * In case the AllowedUser found by the `where` argument doesn't exist, create a new AllowedUser with this data.
     */
    create: XOR<AllowedUserCreateInput, AllowedUserUncheckedCreateInput>
    /**
     * In case the AllowedUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AllowedUserUpdateInput, AllowedUserUncheckedUpdateInput>
  }

  /**
   * AllowedUser delete
   */
  export type AllowedUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowedUser
     */
    select?: AllowedUserSelect<ExtArgs> | null
    /**
     * Filter which AllowedUser to delete.
     */
    where: AllowedUserWhereUniqueInput
  }

  /**
   * AllowedUser deleteMany
   */
  export type AllowedUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AllowedUsers to delete
     */
    where?: AllowedUserWhereInput
  }

  /**
   * AllowedUser without action
   */
  export type AllowedUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllowedUser
     */
    select?: AllowedUserSelect<ExtArgs> | null
  }


  /**
   * Model Persona
   */

  export type AggregatePersona = {
    _count: PersonaCountAggregateOutputType | null
    _avg: PersonaAvgAggregateOutputType | null
    _sum: PersonaSumAggregateOutputType | null
    _min: PersonaMinAggregateOutputType | null
    _max: PersonaMaxAggregateOutputType | null
  }

  export type PersonaAvgAggregateOutputType = {
    conteoVisitas: number | null
    jovenId: number | null
  }

  export type PersonaSumAggregateOutputType = {
    conteoVisitas: number | null
    jovenId: number | null
  }

  export type PersonaMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    telefono: string | null
    FechaNacimiento: Date | null
    esNuevo: boolean | null
    esJoven: boolean | null
    fechaVisita: Date | null
    estado: string | null
    conteoVisitas: number | null
    jovenId: number | null
  }

  export type PersonaMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    telefono: string | null
    FechaNacimiento: Date | null
    esNuevo: boolean | null
    esJoven: boolean | null
    fechaVisita: Date | null
    estado: string | null
    conteoVisitas: number | null
    jovenId: number | null
  }

  export type PersonaCountAggregateOutputType = {
    id: number
    nombre: number
    telefono: number
    FechaNacimiento: number
    esNuevo: number
    esJoven: number
    fechaVisita: number
    estado: number
    conteoVisitas: number
    jovenId: number
    _all: number
  }


  export type PersonaAvgAggregateInputType = {
    conteoVisitas?: true
    jovenId?: true
  }

  export type PersonaSumAggregateInputType = {
    conteoVisitas?: true
    jovenId?: true
  }

  export type PersonaMinAggregateInputType = {
    id?: true
    nombre?: true
    telefono?: true
    FechaNacimiento?: true
    esNuevo?: true
    esJoven?: true
    fechaVisita?: true
    estado?: true
    conteoVisitas?: true
    jovenId?: true
  }

  export type PersonaMaxAggregateInputType = {
    id?: true
    nombre?: true
    telefono?: true
    FechaNacimiento?: true
    esNuevo?: true
    esJoven?: true
    fechaVisita?: true
    estado?: true
    conteoVisitas?: true
    jovenId?: true
  }

  export type PersonaCountAggregateInputType = {
    id?: true
    nombre?: true
    telefono?: true
    FechaNacimiento?: true
    esNuevo?: true
    esJoven?: true
    fechaVisita?: true
    estado?: true
    conteoVisitas?: true
    jovenId?: true
    _all?: true
  }

  export type PersonaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Persona to aggregate.
     */
    where?: PersonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Personas to fetch.
     */
    orderBy?: PersonaOrderByWithRelationInput | PersonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PersonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Personas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Personas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Personas
    **/
    _count?: true | PersonaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PersonaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PersonaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PersonaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PersonaMaxAggregateInputType
  }

  export type GetPersonaAggregateType<T extends PersonaAggregateArgs> = {
        [P in keyof T & keyof AggregatePersona]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePersona[P]>
      : GetScalarType<T[P], AggregatePersona[P]>
  }




  export type PersonaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonaWhereInput
    orderBy?: PersonaOrderByWithAggregationInput | PersonaOrderByWithAggregationInput[]
    by: PersonaScalarFieldEnum[] | PersonaScalarFieldEnum
    having?: PersonaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PersonaCountAggregateInputType | true
    _avg?: PersonaAvgAggregateInputType
    _sum?: PersonaSumAggregateInputType
    _min?: PersonaMinAggregateInputType
    _max?: PersonaMaxAggregateInputType
  }

  export type PersonaGroupByOutputType = {
    id: string
    nombre: string
    telefono: string | null
    FechaNacimiento: Date | null
    esNuevo: boolean
    esJoven: boolean
    fechaVisita: Date
    estado: string
    conteoVisitas: number
    jovenId: number | null
    _count: PersonaCountAggregateOutputType | null
    _avg: PersonaAvgAggregateOutputType | null
    _sum: PersonaSumAggregateOutputType | null
    _min: PersonaMinAggregateOutputType | null
    _max: PersonaMaxAggregateOutputType | null
  }

  type GetPersonaGroupByPayload<T extends PersonaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PersonaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PersonaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PersonaGroupByOutputType[P]>
            : GetScalarType<T[P], PersonaGroupByOutputType[P]>
        }
      >
    >


  export type PersonaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    telefono?: boolean
    FechaNacimiento?: boolean
    esNuevo?: boolean
    esJoven?: boolean
    fechaVisita?: boolean
    estado?: boolean
    conteoVisitas?: boolean
    jovenId?: boolean
    peticiones?: boolean | Persona$peticionesArgs<ExtArgs>
    _count?: boolean | PersonaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["persona"]>

  export type PersonaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    telefono?: boolean
    FechaNacimiento?: boolean
    esNuevo?: boolean
    esJoven?: boolean
    fechaVisita?: boolean
    estado?: boolean
    conteoVisitas?: boolean
    jovenId?: boolean
  }, ExtArgs["result"]["persona"]>

  export type PersonaSelectScalar = {
    id?: boolean
    nombre?: boolean
    telefono?: boolean
    FechaNacimiento?: boolean
    esNuevo?: boolean
    esJoven?: boolean
    fechaVisita?: boolean
    estado?: boolean
    conteoVisitas?: boolean
    jovenId?: boolean
  }

  export type PersonaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    peticiones?: boolean | Persona$peticionesArgs<ExtArgs>
    _count?: boolean | PersonaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PersonaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PersonaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Persona"
    objects: {
      peticiones: Prisma.$PeticionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      telefono: string | null
      FechaNacimiento: Date | null
      esNuevo: boolean
      esJoven: boolean
      fechaVisita: Date
      estado: string
      conteoVisitas: number
      jovenId: number | null
    }, ExtArgs["result"]["persona"]>
    composites: {}
  }

  type PersonaGetPayload<S extends boolean | null | undefined | PersonaDefaultArgs> = $Result.GetResult<Prisma.$PersonaPayload, S>

  type PersonaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PersonaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PersonaCountAggregateInputType | true
    }

  export interface PersonaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Persona'], meta: { name: 'Persona' } }
    /**
     * Find zero or one Persona that matches the filter.
     * @param {PersonaFindUniqueArgs} args - Arguments to find a Persona
     * @example
     * // Get one Persona
     * const persona = await prisma.persona.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PersonaFindUniqueArgs>(args: SelectSubset<T, PersonaFindUniqueArgs<ExtArgs>>): Prisma__PersonaClient<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Persona that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PersonaFindUniqueOrThrowArgs} args - Arguments to find a Persona
     * @example
     * // Get one Persona
     * const persona = await prisma.persona.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PersonaFindUniqueOrThrowArgs>(args: SelectSubset<T, PersonaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PersonaClient<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Persona that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonaFindFirstArgs} args - Arguments to find a Persona
     * @example
     * // Get one Persona
     * const persona = await prisma.persona.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PersonaFindFirstArgs>(args?: SelectSubset<T, PersonaFindFirstArgs<ExtArgs>>): Prisma__PersonaClient<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Persona that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonaFindFirstOrThrowArgs} args - Arguments to find a Persona
     * @example
     * // Get one Persona
     * const persona = await prisma.persona.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PersonaFindFirstOrThrowArgs>(args?: SelectSubset<T, PersonaFindFirstOrThrowArgs<ExtArgs>>): Prisma__PersonaClient<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Personas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Personas
     * const personas = await prisma.persona.findMany()
     * 
     * // Get first 10 Personas
     * const personas = await prisma.persona.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const personaWithIdOnly = await prisma.persona.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PersonaFindManyArgs>(args?: SelectSubset<T, PersonaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Persona.
     * @param {PersonaCreateArgs} args - Arguments to create a Persona.
     * @example
     * // Create one Persona
     * const Persona = await prisma.persona.create({
     *   data: {
     *     // ... data to create a Persona
     *   }
     * })
     * 
     */
    create<T extends PersonaCreateArgs>(args: SelectSubset<T, PersonaCreateArgs<ExtArgs>>): Prisma__PersonaClient<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Personas.
     * @param {PersonaCreateManyArgs} args - Arguments to create many Personas.
     * @example
     * // Create many Personas
     * const persona = await prisma.persona.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PersonaCreateManyArgs>(args?: SelectSubset<T, PersonaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Personas and returns the data saved in the database.
     * @param {PersonaCreateManyAndReturnArgs} args - Arguments to create many Personas.
     * @example
     * // Create many Personas
     * const persona = await prisma.persona.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Personas and only return the `id`
     * const personaWithIdOnly = await prisma.persona.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PersonaCreateManyAndReturnArgs>(args?: SelectSubset<T, PersonaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Persona.
     * @param {PersonaDeleteArgs} args - Arguments to delete one Persona.
     * @example
     * // Delete one Persona
     * const Persona = await prisma.persona.delete({
     *   where: {
     *     // ... filter to delete one Persona
     *   }
     * })
     * 
     */
    delete<T extends PersonaDeleteArgs>(args: SelectSubset<T, PersonaDeleteArgs<ExtArgs>>): Prisma__PersonaClient<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Persona.
     * @param {PersonaUpdateArgs} args - Arguments to update one Persona.
     * @example
     * // Update one Persona
     * const persona = await prisma.persona.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PersonaUpdateArgs>(args: SelectSubset<T, PersonaUpdateArgs<ExtArgs>>): Prisma__PersonaClient<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Personas.
     * @param {PersonaDeleteManyArgs} args - Arguments to filter Personas to delete.
     * @example
     * // Delete a few Personas
     * const { count } = await prisma.persona.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PersonaDeleteManyArgs>(args?: SelectSubset<T, PersonaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Personas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Personas
     * const persona = await prisma.persona.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PersonaUpdateManyArgs>(args: SelectSubset<T, PersonaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Persona.
     * @param {PersonaUpsertArgs} args - Arguments to update or create a Persona.
     * @example
     * // Update or create a Persona
     * const persona = await prisma.persona.upsert({
     *   create: {
     *     // ... data to create a Persona
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Persona we want to update
     *   }
     * })
     */
    upsert<T extends PersonaUpsertArgs>(args: SelectSubset<T, PersonaUpsertArgs<ExtArgs>>): Prisma__PersonaClient<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Personas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonaCountArgs} args - Arguments to filter Personas to count.
     * @example
     * // Count the number of Personas
     * const count = await prisma.persona.count({
     *   where: {
     *     // ... the filter for the Personas we want to count
     *   }
     * })
    **/
    count<T extends PersonaCountArgs>(
      args?: Subset<T, PersonaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PersonaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Persona.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PersonaAggregateArgs>(args: Subset<T, PersonaAggregateArgs>): Prisma.PrismaPromise<GetPersonaAggregateType<T>>

    /**
     * Group by Persona.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonaGroupByArgs} args - Group by arguments.
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
      T extends PersonaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PersonaGroupByArgs['orderBy'] }
        : { orderBy?: PersonaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PersonaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Persona model
   */
  readonly fields: PersonaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Persona.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PersonaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    peticiones<T extends Persona$peticionesArgs<ExtArgs> = {}>(args?: Subset<T, Persona$peticionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeticionPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Persona model
   */ 
  interface PersonaFieldRefs {
    readonly id: FieldRef<"Persona", 'String'>
    readonly nombre: FieldRef<"Persona", 'String'>
    readonly telefono: FieldRef<"Persona", 'String'>
    readonly FechaNacimiento: FieldRef<"Persona", 'DateTime'>
    readonly esNuevo: FieldRef<"Persona", 'Boolean'>
    readonly esJoven: FieldRef<"Persona", 'Boolean'>
    readonly fechaVisita: FieldRef<"Persona", 'DateTime'>
    readonly estado: FieldRef<"Persona", 'String'>
    readonly conteoVisitas: FieldRef<"Persona", 'Int'>
    readonly jovenId: FieldRef<"Persona", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Persona findUnique
   */
  export type PersonaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonaInclude<ExtArgs> | null
    /**
     * Filter, which Persona to fetch.
     */
    where: PersonaWhereUniqueInput
  }

  /**
   * Persona findUniqueOrThrow
   */
  export type PersonaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonaInclude<ExtArgs> | null
    /**
     * Filter, which Persona to fetch.
     */
    where: PersonaWhereUniqueInput
  }

  /**
   * Persona findFirst
   */
  export type PersonaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonaInclude<ExtArgs> | null
    /**
     * Filter, which Persona to fetch.
     */
    where?: PersonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Personas to fetch.
     */
    orderBy?: PersonaOrderByWithRelationInput | PersonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Personas.
     */
    cursor?: PersonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Personas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Personas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Personas.
     */
    distinct?: PersonaScalarFieldEnum | PersonaScalarFieldEnum[]
  }

  /**
   * Persona findFirstOrThrow
   */
  export type PersonaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonaInclude<ExtArgs> | null
    /**
     * Filter, which Persona to fetch.
     */
    where?: PersonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Personas to fetch.
     */
    orderBy?: PersonaOrderByWithRelationInput | PersonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Personas.
     */
    cursor?: PersonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Personas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Personas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Personas.
     */
    distinct?: PersonaScalarFieldEnum | PersonaScalarFieldEnum[]
  }

  /**
   * Persona findMany
   */
  export type PersonaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonaInclude<ExtArgs> | null
    /**
     * Filter, which Personas to fetch.
     */
    where?: PersonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Personas to fetch.
     */
    orderBy?: PersonaOrderByWithRelationInput | PersonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Personas.
     */
    cursor?: PersonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Personas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Personas.
     */
    skip?: number
    distinct?: PersonaScalarFieldEnum | PersonaScalarFieldEnum[]
  }

  /**
   * Persona create
   */
  export type PersonaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonaInclude<ExtArgs> | null
    /**
     * The data needed to create a Persona.
     */
    data: XOR<PersonaCreateInput, PersonaUncheckedCreateInput>
  }

  /**
   * Persona createMany
   */
  export type PersonaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Personas.
     */
    data: PersonaCreateManyInput | PersonaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Persona createManyAndReturn
   */
  export type PersonaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Personas.
     */
    data: PersonaCreateManyInput | PersonaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Persona update
   */
  export type PersonaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonaInclude<ExtArgs> | null
    /**
     * The data needed to update a Persona.
     */
    data: XOR<PersonaUpdateInput, PersonaUncheckedUpdateInput>
    /**
     * Choose, which Persona to update.
     */
    where: PersonaWhereUniqueInput
  }

  /**
   * Persona updateMany
   */
  export type PersonaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Personas.
     */
    data: XOR<PersonaUpdateManyMutationInput, PersonaUncheckedUpdateManyInput>
    /**
     * Filter which Personas to update
     */
    where?: PersonaWhereInput
  }

  /**
   * Persona upsert
   */
  export type PersonaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonaInclude<ExtArgs> | null
    /**
     * The filter to search for the Persona to update in case it exists.
     */
    where: PersonaWhereUniqueInput
    /**
     * In case the Persona found by the `where` argument doesn't exist, create a new Persona with this data.
     */
    create: XOR<PersonaCreateInput, PersonaUncheckedCreateInput>
    /**
     * In case the Persona was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PersonaUpdateInput, PersonaUncheckedUpdateInput>
  }

  /**
   * Persona delete
   */
  export type PersonaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonaInclude<ExtArgs> | null
    /**
     * Filter which Persona to delete.
     */
    where: PersonaWhereUniqueInput
  }

  /**
   * Persona deleteMany
   */
  export type PersonaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Personas to delete
     */
    where?: PersonaWhereInput
  }

  /**
   * Persona.peticiones
   */
  export type Persona$peticionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peticion
     */
    select?: PeticionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeticionInclude<ExtArgs> | null
    where?: PeticionWhereInput
    orderBy?: PeticionOrderByWithRelationInput | PeticionOrderByWithRelationInput[]
    cursor?: PeticionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PeticionScalarFieldEnum | PeticionScalarFieldEnum[]
  }

  /**
   * Persona without action
   */
  export type PersonaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonaInclude<ExtArgs> | null
  }


  /**
   * Model Peticion
   */

  export type AggregatePeticion = {
    _count: PeticionCountAggregateOutputType | null
    _min: PeticionMinAggregateOutputType | null
    _max: PeticionMaxAggregateOutputType | null
  }

  export type PeticionMinAggregateOutputType = {
    id: string | null
    motivo: string | null
    estado: $Enums.EstadoPeticion | null
    fecha: Date | null
    personaId: string | null
  }

  export type PeticionMaxAggregateOutputType = {
    id: string | null
    motivo: string | null
    estado: $Enums.EstadoPeticion | null
    fecha: Date | null
    personaId: string | null
  }

  export type PeticionCountAggregateOutputType = {
    id: number
    motivo: number
    estado: number
    fecha: number
    personaId: number
    _all: number
  }


  export type PeticionMinAggregateInputType = {
    id?: true
    motivo?: true
    estado?: true
    fecha?: true
    personaId?: true
  }

  export type PeticionMaxAggregateInputType = {
    id?: true
    motivo?: true
    estado?: true
    fecha?: true
    personaId?: true
  }

  export type PeticionCountAggregateInputType = {
    id?: true
    motivo?: true
    estado?: true
    fecha?: true
    personaId?: true
    _all?: true
  }

  export type PeticionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Peticion to aggregate.
     */
    where?: PeticionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Peticions to fetch.
     */
    orderBy?: PeticionOrderByWithRelationInput | PeticionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PeticionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Peticions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Peticions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Peticions
    **/
    _count?: true | PeticionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PeticionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PeticionMaxAggregateInputType
  }

  export type GetPeticionAggregateType<T extends PeticionAggregateArgs> = {
        [P in keyof T & keyof AggregatePeticion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePeticion[P]>
      : GetScalarType<T[P], AggregatePeticion[P]>
  }




  export type PeticionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PeticionWhereInput
    orderBy?: PeticionOrderByWithAggregationInput | PeticionOrderByWithAggregationInput[]
    by: PeticionScalarFieldEnum[] | PeticionScalarFieldEnum
    having?: PeticionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PeticionCountAggregateInputType | true
    _min?: PeticionMinAggregateInputType
    _max?: PeticionMaxAggregateInputType
  }

  export type PeticionGroupByOutputType = {
    id: string
    motivo: string
    estado: $Enums.EstadoPeticion
    fecha: Date
    personaId: string | null
    _count: PeticionCountAggregateOutputType | null
    _min: PeticionMinAggregateOutputType | null
    _max: PeticionMaxAggregateOutputType | null
  }

  type GetPeticionGroupByPayload<T extends PeticionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PeticionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PeticionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PeticionGroupByOutputType[P]>
            : GetScalarType<T[P], PeticionGroupByOutputType[P]>
        }
      >
    >


  export type PeticionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    motivo?: boolean
    estado?: boolean
    fecha?: boolean
    personaId?: boolean
    persona?: boolean | Peticion$personaArgs<ExtArgs>
  }, ExtArgs["result"]["peticion"]>

  export type PeticionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    motivo?: boolean
    estado?: boolean
    fecha?: boolean
    personaId?: boolean
    persona?: boolean | Peticion$personaArgs<ExtArgs>
  }, ExtArgs["result"]["peticion"]>

  export type PeticionSelectScalar = {
    id?: boolean
    motivo?: boolean
    estado?: boolean
    fecha?: boolean
    personaId?: boolean
  }

  export type PeticionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    persona?: boolean | Peticion$personaArgs<ExtArgs>
  }
  export type PeticionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    persona?: boolean | Peticion$personaArgs<ExtArgs>
  }

  export type $PeticionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Peticion"
    objects: {
      persona: Prisma.$PersonaPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      motivo: string
      estado: $Enums.EstadoPeticion
      fecha: Date
      personaId: string | null
    }, ExtArgs["result"]["peticion"]>
    composites: {}
  }

  type PeticionGetPayload<S extends boolean | null | undefined | PeticionDefaultArgs> = $Result.GetResult<Prisma.$PeticionPayload, S>

  type PeticionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PeticionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PeticionCountAggregateInputType | true
    }

  export interface PeticionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Peticion'], meta: { name: 'Peticion' } }
    /**
     * Find zero or one Peticion that matches the filter.
     * @param {PeticionFindUniqueArgs} args - Arguments to find a Peticion
     * @example
     * // Get one Peticion
     * const peticion = await prisma.peticion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PeticionFindUniqueArgs>(args: SelectSubset<T, PeticionFindUniqueArgs<ExtArgs>>): Prisma__PeticionClient<$Result.GetResult<Prisma.$PeticionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Peticion that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PeticionFindUniqueOrThrowArgs} args - Arguments to find a Peticion
     * @example
     * // Get one Peticion
     * const peticion = await prisma.peticion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PeticionFindUniqueOrThrowArgs>(args: SelectSubset<T, PeticionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PeticionClient<$Result.GetResult<Prisma.$PeticionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Peticion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeticionFindFirstArgs} args - Arguments to find a Peticion
     * @example
     * // Get one Peticion
     * const peticion = await prisma.peticion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PeticionFindFirstArgs>(args?: SelectSubset<T, PeticionFindFirstArgs<ExtArgs>>): Prisma__PeticionClient<$Result.GetResult<Prisma.$PeticionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Peticion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeticionFindFirstOrThrowArgs} args - Arguments to find a Peticion
     * @example
     * // Get one Peticion
     * const peticion = await prisma.peticion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PeticionFindFirstOrThrowArgs>(args?: SelectSubset<T, PeticionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PeticionClient<$Result.GetResult<Prisma.$PeticionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Peticions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeticionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Peticions
     * const peticions = await prisma.peticion.findMany()
     * 
     * // Get first 10 Peticions
     * const peticions = await prisma.peticion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const peticionWithIdOnly = await prisma.peticion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PeticionFindManyArgs>(args?: SelectSubset<T, PeticionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeticionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Peticion.
     * @param {PeticionCreateArgs} args - Arguments to create a Peticion.
     * @example
     * // Create one Peticion
     * const Peticion = await prisma.peticion.create({
     *   data: {
     *     // ... data to create a Peticion
     *   }
     * })
     * 
     */
    create<T extends PeticionCreateArgs>(args: SelectSubset<T, PeticionCreateArgs<ExtArgs>>): Prisma__PeticionClient<$Result.GetResult<Prisma.$PeticionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Peticions.
     * @param {PeticionCreateManyArgs} args - Arguments to create many Peticions.
     * @example
     * // Create many Peticions
     * const peticion = await prisma.peticion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PeticionCreateManyArgs>(args?: SelectSubset<T, PeticionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Peticions and returns the data saved in the database.
     * @param {PeticionCreateManyAndReturnArgs} args - Arguments to create many Peticions.
     * @example
     * // Create many Peticions
     * const peticion = await prisma.peticion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Peticions and only return the `id`
     * const peticionWithIdOnly = await prisma.peticion.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PeticionCreateManyAndReturnArgs>(args?: SelectSubset<T, PeticionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeticionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Peticion.
     * @param {PeticionDeleteArgs} args - Arguments to delete one Peticion.
     * @example
     * // Delete one Peticion
     * const Peticion = await prisma.peticion.delete({
     *   where: {
     *     // ... filter to delete one Peticion
     *   }
     * })
     * 
     */
    delete<T extends PeticionDeleteArgs>(args: SelectSubset<T, PeticionDeleteArgs<ExtArgs>>): Prisma__PeticionClient<$Result.GetResult<Prisma.$PeticionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Peticion.
     * @param {PeticionUpdateArgs} args - Arguments to update one Peticion.
     * @example
     * // Update one Peticion
     * const peticion = await prisma.peticion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PeticionUpdateArgs>(args: SelectSubset<T, PeticionUpdateArgs<ExtArgs>>): Prisma__PeticionClient<$Result.GetResult<Prisma.$PeticionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Peticions.
     * @param {PeticionDeleteManyArgs} args - Arguments to filter Peticions to delete.
     * @example
     * // Delete a few Peticions
     * const { count } = await prisma.peticion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PeticionDeleteManyArgs>(args?: SelectSubset<T, PeticionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Peticions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeticionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Peticions
     * const peticion = await prisma.peticion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PeticionUpdateManyArgs>(args: SelectSubset<T, PeticionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Peticion.
     * @param {PeticionUpsertArgs} args - Arguments to update or create a Peticion.
     * @example
     * // Update or create a Peticion
     * const peticion = await prisma.peticion.upsert({
     *   create: {
     *     // ... data to create a Peticion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Peticion we want to update
     *   }
     * })
     */
    upsert<T extends PeticionUpsertArgs>(args: SelectSubset<T, PeticionUpsertArgs<ExtArgs>>): Prisma__PeticionClient<$Result.GetResult<Prisma.$PeticionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Peticions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeticionCountArgs} args - Arguments to filter Peticions to count.
     * @example
     * // Count the number of Peticions
     * const count = await prisma.peticion.count({
     *   where: {
     *     // ... the filter for the Peticions we want to count
     *   }
     * })
    **/
    count<T extends PeticionCountArgs>(
      args?: Subset<T, PeticionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PeticionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Peticion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeticionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PeticionAggregateArgs>(args: Subset<T, PeticionAggregateArgs>): Prisma.PrismaPromise<GetPeticionAggregateType<T>>

    /**
     * Group by Peticion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeticionGroupByArgs} args - Group by arguments.
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
      T extends PeticionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PeticionGroupByArgs['orderBy'] }
        : { orderBy?: PeticionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PeticionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPeticionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Peticion model
   */
  readonly fields: PeticionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Peticion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PeticionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    persona<T extends Peticion$personaArgs<ExtArgs> = {}>(args?: Subset<T, Peticion$personaArgs<ExtArgs>>): Prisma__PersonaClient<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the Peticion model
   */ 
  interface PeticionFieldRefs {
    readonly id: FieldRef<"Peticion", 'String'>
    readonly motivo: FieldRef<"Peticion", 'String'>
    readonly estado: FieldRef<"Peticion", 'EstadoPeticion'>
    readonly fecha: FieldRef<"Peticion", 'DateTime'>
    readonly personaId: FieldRef<"Peticion", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Peticion findUnique
   */
  export type PeticionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peticion
     */
    select?: PeticionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeticionInclude<ExtArgs> | null
    /**
     * Filter, which Peticion to fetch.
     */
    where: PeticionWhereUniqueInput
  }

  /**
   * Peticion findUniqueOrThrow
   */
  export type PeticionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peticion
     */
    select?: PeticionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeticionInclude<ExtArgs> | null
    /**
     * Filter, which Peticion to fetch.
     */
    where: PeticionWhereUniqueInput
  }

  /**
   * Peticion findFirst
   */
  export type PeticionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peticion
     */
    select?: PeticionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeticionInclude<ExtArgs> | null
    /**
     * Filter, which Peticion to fetch.
     */
    where?: PeticionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Peticions to fetch.
     */
    orderBy?: PeticionOrderByWithRelationInput | PeticionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Peticions.
     */
    cursor?: PeticionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Peticions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Peticions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Peticions.
     */
    distinct?: PeticionScalarFieldEnum | PeticionScalarFieldEnum[]
  }

  /**
   * Peticion findFirstOrThrow
   */
  export type PeticionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peticion
     */
    select?: PeticionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeticionInclude<ExtArgs> | null
    /**
     * Filter, which Peticion to fetch.
     */
    where?: PeticionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Peticions to fetch.
     */
    orderBy?: PeticionOrderByWithRelationInput | PeticionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Peticions.
     */
    cursor?: PeticionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Peticions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Peticions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Peticions.
     */
    distinct?: PeticionScalarFieldEnum | PeticionScalarFieldEnum[]
  }

  /**
   * Peticion findMany
   */
  export type PeticionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peticion
     */
    select?: PeticionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeticionInclude<ExtArgs> | null
    /**
     * Filter, which Peticions to fetch.
     */
    where?: PeticionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Peticions to fetch.
     */
    orderBy?: PeticionOrderByWithRelationInput | PeticionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Peticions.
     */
    cursor?: PeticionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Peticions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Peticions.
     */
    skip?: number
    distinct?: PeticionScalarFieldEnum | PeticionScalarFieldEnum[]
  }

  /**
   * Peticion create
   */
  export type PeticionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peticion
     */
    select?: PeticionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeticionInclude<ExtArgs> | null
    /**
     * The data needed to create a Peticion.
     */
    data: XOR<PeticionCreateInput, PeticionUncheckedCreateInput>
  }

  /**
   * Peticion createMany
   */
  export type PeticionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Peticions.
     */
    data: PeticionCreateManyInput | PeticionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Peticion createManyAndReturn
   */
  export type PeticionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peticion
     */
    select?: PeticionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Peticions.
     */
    data: PeticionCreateManyInput | PeticionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeticionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Peticion update
   */
  export type PeticionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peticion
     */
    select?: PeticionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeticionInclude<ExtArgs> | null
    /**
     * The data needed to update a Peticion.
     */
    data: XOR<PeticionUpdateInput, PeticionUncheckedUpdateInput>
    /**
     * Choose, which Peticion to update.
     */
    where: PeticionWhereUniqueInput
  }

  /**
   * Peticion updateMany
   */
  export type PeticionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Peticions.
     */
    data: XOR<PeticionUpdateManyMutationInput, PeticionUncheckedUpdateManyInput>
    /**
     * Filter which Peticions to update
     */
    where?: PeticionWhereInput
  }

  /**
   * Peticion upsert
   */
  export type PeticionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peticion
     */
    select?: PeticionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeticionInclude<ExtArgs> | null
    /**
     * The filter to search for the Peticion to update in case it exists.
     */
    where: PeticionWhereUniqueInput
    /**
     * In case the Peticion found by the `where` argument doesn't exist, create a new Peticion with this data.
     */
    create: XOR<PeticionCreateInput, PeticionUncheckedCreateInput>
    /**
     * In case the Peticion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PeticionUpdateInput, PeticionUncheckedUpdateInput>
  }

  /**
   * Peticion delete
   */
  export type PeticionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peticion
     */
    select?: PeticionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeticionInclude<ExtArgs> | null
    /**
     * Filter which Peticion to delete.
     */
    where: PeticionWhereUniqueInput
  }

  /**
   * Peticion deleteMany
   */
  export type PeticionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Peticions to delete
     */
    where?: PeticionWhereInput
  }

  /**
   * Peticion.persona
   */
  export type Peticion$personaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonaInclude<ExtArgs> | null
    where?: PersonaWhereInput
  }

  /**
   * Peticion without action
   */
  export type PeticionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Peticion
     */
    select?: PeticionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeticionInclude<ExtArgs> | null
  }


  /**
   * Model Grupo
   */

  export type AggregateGrupo = {
    _count: GrupoCountAggregateOutputType | null
    _avg: GrupoAvgAggregateOutputType | null
    _sum: GrupoSumAggregateOutputType | null
    _min: GrupoMinAggregateOutputType | null
    _max: GrupoMaxAggregateOutputType | null
  }

  export type GrupoAvgAggregateOutputType = {
    id: number | null
  }

  export type GrupoSumAggregateOutputType = {
    id: number | null
  }

  export type GrupoMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    lider: string | null
    dia: string | null
    hora: string | null
    direccion: string | null
    tipo: string | null
    activo: boolean | null
  }

  export type GrupoMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    lider: string | null
    dia: string | null
    hora: string | null
    direccion: string | null
    tipo: string | null
    activo: boolean | null
  }

  export type GrupoCountAggregateOutputType = {
    id: number
    nombre: number
    lider: number
    dia: number
    hora: number
    direccion: number
    tipo: number
    activo: number
    _all: number
  }


  export type GrupoAvgAggregateInputType = {
    id?: true
  }

  export type GrupoSumAggregateInputType = {
    id?: true
  }

  export type GrupoMinAggregateInputType = {
    id?: true
    nombre?: true
    lider?: true
    dia?: true
    hora?: true
    direccion?: true
    tipo?: true
    activo?: true
  }

  export type GrupoMaxAggregateInputType = {
    id?: true
    nombre?: true
    lider?: true
    dia?: true
    hora?: true
    direccion?: true
    tipo?: true
    activo?: true
  }

  export type GrupoCountAggregateInputType = {
    id?: true
    nombre?: true
    lider?: true
    dia?: true
    hora?: true
    direccion?: true
    tipo?: true
    activo?: true
    _all?: true
  }

  export type GrupoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Grupo to aggregate.
     */
    where?: GrupoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grupos to fetch.
     */
    orderBy?: GrupoOrderByWithRelationInput | GrupoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GrupoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grupos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grupos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Grupos
    **/
    _count?: true | GrupoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GrupoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GrupoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GrupoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GrupoMaxAggregateInputType
  }

  export type GetGrupoAggregateType<T extends GrupoAggregateArgs> = {
        [P in keyof T & keyof AggregateGrupo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGrupo[P]>
      : GetScalarType<T[P], AggregateGrupo[P]>
  }




  export type GrupoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GrupoWhereInput
    orderBy?: GrupoOrderByWithAggregationInput | GrupoOrderByWithAggregationInput[]
    by: GrupoScalarFieldEnum[] | GrupoScalarFieldEnum
    having?: GrupoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GrupoCountAggregateInputType | true
    _avg?: GrupoAvgAggregateInputType
    _sum?: GrupoSumAggregateInputType
    _min?: GrupoMinAggregateInputType
    _max?: GrupoMaxAggregateInputType
  }

  export type GrupoGroupByOutputType = {
    id: number
    nombre: string
    lider: string
    dia: string
    hora: string
    direccion: string
    tipo: string
    activo: boolean
    _count: GrupoCountAggregateOutputType | null
    _avg: GrupoAvgAggregateOutputType | null
    _sum: GrupoSumAggregateOutputType | null
    _min: GrupoMinAggregateOutputType | null
    _max: GrupoMaxAggregateOutputType | null
  }

  type GetGrupoGroupByPayload<T extends GrupoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GrupoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GrupoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GrupoGroupByOutputType[P]>
            : GetScalarType<T[P], GrupoGroupByOutputType[P]>
        }
      >
    >


  export type GrupoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    lider?: boolean
    dia?: boolean
    hora?: boolean
    direccion?: boolean
    tipo?: boolean
    activo?: boolean
    miembros?: boolean | Grupo$miembrosArgs<ExtArgs>
    _count?: boolean | GrupoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["grupo"]>

  export type GrupoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    lider?: boolean
    dia?: boolean
    hora?: boolean
    direccion?: boolean
    tipo?: boolean
    activo?: boolean
  }, ExtArgs["result"]["grupo"]>

  export type GrupoSelectScalar = {
    id?: boolean
    nombre?: boolean
    lider?: boolean
    dia?: boolean
    hora?: boolean
    direccion?: boolean
    tipo?: boolean
    activo?: boolean
  }

  export type GrupoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    miembros?: boolean | Grupo$miembrosArgs<ExtArgs>
    _count?: boolean | GrupoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GrupoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GrupoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Grupo"
    objects: {
      miembros: Prisma.$JovenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      lider: string
      dia: string
      hora: string
      direccion: string
      tipo: string
      activo: boolean
    }, ExtArgs["result"]["grupo"]>
    composites: {}
  }

  type GrupoGetPayload<S extends boolean | null | undefined | GrupoDefaultArgs> = $Result.GetResult<Prisma.$GrupoPayload, S>

  type GrupoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GrupoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GrupoCountAggregateInputType | true
    }

  export interface GrupoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Grupo'], meta: { name: 'Grupo' } }
    /**
     * Find zero or one Grupo that matches the filter.
     * @param {GrupoFindUniqueArgs} args - Arguments to find a Grupo
     * @example
     * // Get one Grupo
     * const grupo = await prisma.grupo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GrupoFindUniqueArgs>(args: SelectSubset<T, GrupoFindUniqueArgs<ExtArgs>>): Prisma__GrupoClient<$Result.GetResult<Prisma.$GrupoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Grupo that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GrupoFindUniqueOrThrowArgs} args - Arguments to find a Grupo
     * @example
     * // Get one Grupo
     * const grupo = await prisma.grupo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GrupoFindUniqueOrThrowArgs>(args: SelectSubset<T, GrupoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GrupoClient<$Result.GetResult<Prisma.$GrupoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Grupo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrupoFindFirstArgs} args - Arguments to find a Grupo
     * @example
     * // Get one Grupo
     * const grupo = await prisma.grupo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GrupoFindFirstArgs>(args?: SelectSubset<T, GrupoFindFirstArgs<ExtArgs>>): Prisma__GrupoClient<$Result.GetResult<Prisma.$GrupoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Grupo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrupoFindFirstOrThrowArgs} args - Arguments to find a Grupo
     * @example
     * // Get one Grupo
     * const grupo = await prisma.grupo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GrupoFindFirstOrThrowArgs>(args?: SelectSubset<T, GrupoFindFirstOrThrowArgs<ExtArgs>>): Prisma__GrupoClient<$Result.GetResult<Prisma.$GrupoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Grupos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrupoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Grupos
     * const grupos = await prisma.grupo.findMany()
     * 
     * // Get first 10 Grupos
     * const grupos = await prisma.grupo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const grupoWithIdOnly = await prisma.grupo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GrupoFindManyArgs>(args?: SelectSubset<T, GrupoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrupoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Grupo.
     * @param {GrupoCreateArgs} args - Arguments to create a Grupo.
     * @example
     * // Create one Grupo
     * const Grupo = await prisma.grupo.create({
     *   data: {
     *     // ... data to create a Grupo
     *   }
     * })
     * 
     */
    create<T extends GrupoCreateArgs>(args: SelectSubset<T, GrupoCreateArgs<ExtArgs>>): Prisma__GrupoClient<$Result.GetResult<Prisma.$GrupoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Grupos.
     * @param {GrupoCreateManyArgs} args - Arguments to create many Grupos.
     * @example
     * // Create many Grupos
     * const grupo = await prisma.grupo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GrupoCreateManyArgs>(args?: SelectSubset<T, GrupoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Grupos and returns the data saved in the database.
     * @param {GrupoCreateManyAndReturnArgs} args - Arguments to create many Grupos.
     * @example
     * // Create many Grupos
     * const grupo = await prisma.grupo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Grupos and only return the `id`
     * const grupoWithIdOnly = await prisma.grupo.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GrupoCreateManyAndReturnArgs>(args?: SelectSubset<T, GrupoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrupoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Grupo.
     * @param {GrupoDeleteArgs} args - Arguments to delete one Grupo.
     * @example
     * // Delete one Grupo
     * const Grupo = await prisma.grupo.delete({
     *   where: {
     *     // ... filter to delete one Grupo
     *   }
     * })
     * 
     */
    delete<T extends GrupoDeleteArgs>(args: SelectSubset<T, GrupoDeleteArgs<ExtArgs>>): Prisma__GrupoClient<$Result.GetResult<Prisma.$GrupoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Grupo.
     * @param {GrupoUpdateArgs} args - Arguments to update one Grupo.
     * @example
     * // Update one Grupo
     * const grupo = await prisma.grupo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GrupoUpdateArgs>(args: SelectSubset<T, GrupoUpdateArgs<ExtArgs>>): Prisma__GrupoClient<$Result.GetResult<Prisma.$GrupoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Grupos.
     * @param {GrupoDeleteManyArgs} args - Arguments to filter Grupos to delete.
     * @example
     * // Delete a few Grupos
     * const { count } = await prisma.grupo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GrupoDeleteManyArgs>(args?: SelectSubset<T, GrupoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Grupos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrupoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Grupos
     * const grupo = await prisma.grupo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GrupoUpdateManyArgs>(args: SelectSubset<T, GrupoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Grupo.
     * @param {GrupoUpsertArgs} args - Arguments to update or create a Grupo.
     * @example
     * // Update or create a Grupo
     * const grupo = await prisma.grupo.upsert({
     *   create: {
     *     // ... data to create a Grupo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Grupo we want to update
     *   }
     * })
     */
    upsert<T extends GrupoUpsertArgs>(args: SelectSubset<T, GrupoUpsertArgs<ExtArgs>>): Prisma__GrupoClient<$Result.GetResult<Prisma.$GrupoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Grupos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrupoCountArgs} args - Arguments to filter Grupos to count.
     * @example
     * // Count the number of Grupos
     * const count = await prisma.grupo.count({
     *   where: {
     *     // ... the filter for the Grupos we want to count
     *   }
     * })
    **/
    count<T extends GrupoCountArgs>(
      args?: Subset<T, GrupoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GrupoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Grupo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrupoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GrupoAggregateArgs>(args: Subset<T, GrupoAggregateArgs>): Prisma.PrismaPromise<GetGrupoAggregateType<T>>

    /**
     * Group by Grupo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrupoGroupByArgs} args - Group by arguments.
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
      T extends GrupoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GrupoGroupByArgs['orderBy'] }
        : { orderBy?: GrupoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GrupoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGrupoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Grupo model
   */
  readonly fields: GrupoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Grupo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GrupoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    miembros<T extends Grupo$miembrosArgs<ExtArgs> = {}>(args?: Subset<T, Grupo$miembrosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JovenPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Grupo model
   */ 
  interface GrupoFieldRefs {
    readonly id: FieldRef<"Grupo", 'Int'>
    readonly nombre: FieldRef<"Grupo", 'String'>
    readonly lider: FieldRef<"Grupo", 'String'>
    readonly dia: FieldRef<"Grupo", 'String'>
    readonly hora: FieldRef<"Grupo", 'String'>
    readonly direccion: FieldRef<"Grupo", 'String'>
    readonly tipo: FieldRef<"Grupo", 'String'>
    readonly activo: FieldRef<"Grupo", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Grupo findUnique
   */
  export type GrupoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grupo
     */
    select?: GrupoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrupoInclude<ExtArgs> | null
    /**
     * Filter, which Grupo to fetch.
     */
    where: GrupoWhereUniqueInput
  }

  /**
   * Grupo findUniqueOrThrow
   */
  export type GrupoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grupo
     */
    select?: GrupoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrupoInclude<ExtArgs> | null
    /**
     * Filter, which Grupo to fetch.
     */
    where: GrupoWhereUniqueInput
  }

  /**
   * Grupo findFirst
   */
  export type GrupoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grupo
     */
    select?: GrupoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrupoInclude<ExtArgs> | null
    /**
     * Filter, which Grupo to fetch.
     */
    where?: GrupoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grupos to fetch.
     */
    orderBy?: GrupoOrderByWithRelationInput | GrupoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Grupos.
     */
    cursor?: GrupoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grupos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grupos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Grupos.
     */
    distinct?: GrupoScalarFieldEnum | GrupoScalarFieldEnum[]
  }

  /**
   * Grupo findFirstOrThrow
   */
  export type GrupoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grupo
     */
    select?: GrupoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrupoInclude<ExtArgs> | null
    /**
     * Filter, which Grupo to fetch.
     */
    where?: GrupoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grupos to fetch.
     */
    orderBy?: GrupoOrderByWithRelationInput | GrupoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Grupos.
     */
    cursor?: GrupoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grupos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grupos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Grupos.
     */
    distinct?: GrupoScalarFieldEnum | GrupoScalarFieldEnum[]
  }

  /**
   * Grupo findMany
   */
  export type GrupoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grupo
     */
    select?: GrupoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrupoInclude<ExtArgs> | null
    /**
     * Filter, which Grupos to fetch.
     */
    where?: GrupoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grupos to fetch.
     */
    orderBy?: GrupoOrderByWithRelationInput | GrupoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Grupos.
     */
    cursor?: GrupoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grupos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grupos.
     */
    skip?: number
    distinct?: GrupoScalarFieldEnum | GrupoScalarFieldEnum[]
  }

  /**
   * Grupo create
   */
  export type GrupoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grupo
     */
    select?: GrupoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrupoInclude<ExtArgs> | null
    /**
     * The data needed to create a Grupo.
     */
    data: XOR<GrupoCreateInput, GrupoUncheckedCreateInput>
  }

  /**
   * Grupo createMany
   */
  export type GrupoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Grupos.
     */
    data: GrupoCreateManyInput | GrupoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Grupo createManyAndReturn
   */
  export type GrupoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grupo
     */
    select?: GrupoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Grupos.
     */
    data: GrupoCreateManyInput | GrupoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Grupo update
   */
  export type GrupoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grupo
     */
    select?: GrupoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrupoInclude<ExtArgs> | null
    /**
     * The data needed to update a Grupo.
     */
    data: XOR<GrupoUpdateInput, GrupoUncheckedUpdateInput>
    /**
     * Choose, which Grupo to update.
     */
    where: GrupoWhereUniqueInput
  }

  /**
   * Grupo updateMany
   */
  export type GrupoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Grupos.
     */
    data: XOR<GrupoUpdateManyMutationInput, GrupoUncheckedUpdateManyInput>
    /**
     * Filter which Grupos to update
     */
    where?: GrupoWhereInput
  }

  /**
   * Grupo upsert
   */
  export type GrupoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grupo
     */
    select?: GrupoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrupoInclude<ExtArgs> | null
    /**
     * The filter to search for the Grupo to update in case it exists.
     */
    where: GrupoWhereUniqueInput
    /**
     * In case the Grupo found by the `where` argument doesn't exist, create a new Grupo with this data.
     */
    create: XOR<GrupoCreateInput, GrupoUncheckedCreateInput>
    /**
     * In case the Grupo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GrupoUpdateInput, GrupoUncheckedUpdateInput>
  }

  /**
   * Grupo delete
   */
  export type GrupoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grupo
     */
    select?: GrupoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrupoInclude<ExtArgs> | null
    /**
     * Filter which Grupo to delete.
     */
    where: GrupoWhereUniqueInput
  }

  /**
   * Grupo deleteMany
   */
  export type GrupoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Grupos to delete
     */
    where?: GrupoWhereInput
  }

  /**
   * Grupo.miembros
   */
  export type Grupo$miembrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joven
     */
    select?: JovenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JovenInclude<ExtArgs> | null
    where?: JovenWhereInput
    orderBy?: JovenOrderByWithRelationInput | JovenOrderByWithRelationInput[]
    cursor?: JovenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JovenScalarFieldEnum | JovenScalarFieldEnum[]
  }

  /**
   * Grupo without action
   */
  export type GrupoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grupo
     */
    select?: GrupoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrupoInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    module: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    description: string | null
    actorEmail: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    module: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    description: string | null
    actorEmail: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    module: number
    action: number
    entity: number
    entityId: number
    description: number
    actorEmail: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    module?: true
    action?: true
    entity?: true
    entityId?: true
    description?: true
    actorEmail?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    module?: true
    action?: true
    entity?: true
    entityId?: true
    description?: true
    actorEmail?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    module?: true
    action?: true
    entity?: true
    entityId?: true
    description?: true
    actorEmail?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    module: string
    action: string
    entity: string
    entityId: string | null
    description: string | null
    actorEmail: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    module?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    description?: boolean
    actorEmail?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    module?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    description?: boolean
    actorEmail?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    module?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    description?: boolean
    actorEmail?: boolean
    createdAt?: boolean
  }


  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      module: string
      action: string
      entity: string
      entityId: string | null
      description: string | null
      actorEmail: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
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
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly module: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entity: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly description: FieldRef<"AuditLog", 'String'>
    readonly actorEmail: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    nombre: 'nombre',
    role: 'role',
    sede: 'sede'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AreaScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    img: 'img',
    value: 'value',
    rol: 'rol'
  };

  export type AreaScalarFieldEnum = (typeof AreaScalarFieldEnum)[keyof typeof AreaScalarFieldEnum]


  export const ActivitiesScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    img: 'img',
    place: 'place',
    hour_start: 'hour_start',
    hour_end: 'hour_end',
    urgent: 'urgent',
    areaId: 'areaId'
  };

  export type ActivitiesScalarFieldEnum = (typeof ActivitiesScalarFieldEnum)[keyof typeof ActivitiesScalarFieldEnum]


  export const PreachsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    img: 'img',
    urlVideo: 'urlVideo'
  };

  export type PreachsScalarFieldEnum = (typeof PreachsScalarFieldEnum)[keyof typeof PreachsScalarFieldEnum]


  export const LastActivitiesScalarFieldEnum: {
    id: 'id',
    title: 'title',
    img: 'img'
  };

  export type LastActivitiesScalarFieldEnum = (typeof LastActivitiesScalarFieldEnum)[keyof typeof LastActivitiesScalarFieldEnum]


  export const JovenScalarFieldEnum: {
    id: 'id',
    nombres: 'nombres',
    apellidos: 'apellidos',
    documento: 'documento',
    telefono: 'telefono',
    fechaNacimiento: 'fechaNacimiento',
    sede: 'sede',
    grupoId: 'grupoId',
    ultimaVisita: 'ultimaVisita',
    activo: 'activo'
  };

  export type JovenScalarFieldEnum = (typeof JovenScalarFieldEnum)[keyof typeof JovenScalarFieldEnum]


  export const AsistenciaScalarFieldEnum: {
    id: 'id',
    fecha: 'fecha',
    jovenId: 'jovenId'
  };

  export type AsistenciaScalarFieldEnum = (typeof AsistenciaScalarFieldEnum)[keyof typeof AsistenciaScalarFieldEnum]


  export const AllowedUserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type AllowedUserScalarFieldEnum = (typeof AllowedUserScalarFieldEnum)[keyof typeof AllowedUserScalarFieldEnum]


  export const PersonaScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    telefono: 'telefono',
    FechaNacimiento: 'FechaNacimiento',
    esNuevo: 'esNuevo',
    esJoven: 'esJoven',
    fechaVisita: 'fechaVisita',
    estado: 'estado',
    conteoVisitas: 'conteoVisitas',
    jovenId: 'jovenId'
  };

  export type PersonaScalarFieldEnum = (typeof PersonaScalarFieldEnum)[keyof typeof PersonaScalarFieldEnum]


  export const PeticionScalarFieldEnum: {
    id: 'id',
    motivo: 'motivo',
    estado: 'estado',
    fecha: 'fecha',
    personaId: 'personaId'
  };

  export type PeticionScalarFieldEnum = (typeof PeticionScalarFieldEnum)[keyof typeof PeticionScalarFieldEnum]


  export const GrupoScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    lider: 'lider',
    dia: 'dia',
    hora: 'hora',
    direccion: 'direccion',
    tipo: 'tipo',
    activo: 'activo'
  };

  export type GrupoScalarFieldEnum = (typeof GrupoScalarFieldEnum)[keyof typeof GrupoScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    module: 'module',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    description: 'description',
    actorEmail: 'actorEmail',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


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
   * Reference to a field of type 'EstadoPeticion'
   */
  export type EnumEstadoPeticionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoPeticion'>
    


  /**
   * Reference to a field of type 'EstadoPeticion[]'
   */
  export type ListEnumEstadoPeticionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoPeticion[]'>
    


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    nombre?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    sede?: StringNullableFilter<"User"> | string | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nombre?: SortOrder
    role?: SortOrder
    sede?: SortOrderInput | SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    nombre?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    sede?: StringNullableFilter<"User"> | string | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nombre?: SortOrder
    role?: SortOrder
    sede?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    nombre?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    sede?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type AreaWhereInput = {
    AND?: AreaWhereInput | AreaWhereInput[]
    OR?: AreaWhereInput[]
    NOT?: AreaWhereInput | AreaWhereInput[]
    id?: IntFilter<"Area"> | number
    title?: StringFilter<"Area"> | string
    description?: StringNullableFilter<"Area"> | string | null
    img?: StringNullableFilter<"Area"> | string | null
    value?: StringFilter<"Area"> | string
    rol?: StringFilter<"Area"> | string
    activities?: ActivitiesListRelationFilter
  }

  export type AreaOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    img?: SortOrderInput | SortOrder
    value?: SortOrder
    rol?: SortOrder
    activities?: ActivitiesOrderByRelationAggregateInput
  }

  export type AreaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    value?: string
    AND?: AreaWhereInput | AreaWhereInput[]
    OR?: AreaWhereInput[]
    NOT?: AreaWhereInput | AreaWhereInput[]
    title?: StringFilter<"Area"> | string
    description?: StringNullableFilter<"Area"> | string | null
    img?: StringNullableFilter<"Area"> | string | null
    rol?: StringFilter<"Area"> | string
    activities?: ActivitiesListRelationFilter
  }, "id" | "value">

  export type AreaOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    img?: SortOrderInput | SortOrder
    value?: SortOrder
    rol?: SortOrder
    _count?: AreaCountOrderByAggregateInput
    _avg?: AreaAvgOrderByAggregateInput
    _max?: AreaMaxOrderByAggregateInput
    _min?: AreaMinOrderByAggregateInput
    _sum?: AreaSumOrderByAggregateInput
  }

  export type AreaScalarWhereWithAggregatesInput = {
    AND?: AreaScalarWhereWithAggregatesInput | AreaScalarWhereWithAggregatesInput[]
    OR?: AreaScalarWhereWithAggregatesInput[]
    NOT?: AreaScalarWhereWithAggregatesInput | AreaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Area"> | number
    title?: StringWithAggregatesFilter<"Area"> | string
    description?: StringNullableWithAggregatesFilter<"Area"> | string | null
    img?: StringNullableWithAggregatesFilter<"Area"> | string | null
    value?: StringWithAggregatesFilter<"Area"> | string
    rol?: StringWithAggregatesFilter<"Area"> | string
  }

  export type ActivitiesWhereInput = {
    AND?: ActivitiesWhereInput | ActivitiesWhereInput[]
    OR?: ActivitiesWhereInput[]
    NOT?: ActivitiesWhereInput | ActivitiesWhereInput[]
    id?: IntFilter<"Activities"> | number
    title?: StringFilter<"Activities"> | string
    description?: StringNullableFilter<"Activities"> | string | null
    img?: StringNullableFilter<"Activities"> | string | null
    place?: StringFilter<"Activities"> | string
    hour_start?: DateTimeFilter<"Activities"> | Date | string
    hour_end?: DateTimeFilter<"Activities"> | Date | string
    urgent?: BoolFilter<"Activities"> | boolean
    areaId?: IntNullableFilter<"Activities"> | number | null
    area?: XOR<AreaNullableRelationFilter, AreaWhereInput> | null
  }

  export type ActivitiesOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    img?: SortOrderInput | SortOrder
    place?: SortOrder
    hour_start?: SortOrder
    hour_end?: SortOrder
    urgent?: SortOrder
    areaId?: SortOrderInput | SortOrder
    area?: AreaOrderByWithRelationInput
  }

  export type ActivitiesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ActivitiesWhereInput | ActivitiesWhereInput[]
    OR?: ActivitiesWhereInput[]
    NOT?: ActivitiesWhereInput | ActivitiesWhereInput[]
    title?: StringFilter<"Activities"> | string
    description?: StringNullableFilter<"Activities"> | string | null
    img?: StringNullableFilter<"Activities"> | string | null
    place?: StringFilter<"Activities"> | string
    hour_start?: DateTimeFilter<"Activities"> | Date | string
    hour_end?: DateTimeFilter<"Activities"> | Date | string
    urgent?: BoolFilter<"Activities"> | boolean
    areaId?: IntNullableFilter<"Activities"> | number | null
    area?: XOR<AreaNullableRelationFilter, AreaWhereInput> | null
  }, "id">

  export type ActivitiesOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    img?: SortOrderInput | SortOrder
    place?: SortOrder
    hour_start?: SortOrder
    hour_end?: SortOrder
    urgent?: SortOrder
    areaId?: SortOrderInput | SortOrder
    _count?: ActivitiesCountOrderByAggregateInput
    _avg?: ActivitiesAvgOrderByAggregateInput
    _max?: ActivitiesMaxOrderByAggregateInput
    _min?: ActivitiesMinOrderByAggregateInput
    _sum?: ActivitiesSumOrderByAggregateInput
  }

  export type ActivitiesScalarWhereWithAggregatesInput = {
    AND?: ActivitiesScalarWhereWithAggregatesInput | ActivitiesScalarWhereWithAggregatesInput[]
    OR?: ActivitiesScalarWhereWithAggregatesInput[]
    NOT?: ActivitiesScalarWhereWithAggregatesInput | ActivitiesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Activities"> | number
    title?: StringWithAggregatesFilter<"Activities"> | string
    description?: StringNullableWithAggregatesFilter<"Activities"> | string | null
    img?: StringNullableWithAggregatesFilter<"Activities"> | string | null
    place?: StringWithAggregatesFilter<"Activities"> | string
    hour_start?: DateTimeWithAggregatesFilter<"Activities"> | Date | string
    hour_end?: DateTimeWithAggregatesFilter<"Activities"> | Date | string
    urgent?: BoolWithAggregatesFilter<"Activities"> | boolean
    areaId?: IntNullableWithAggregatesFilter<"Activities"> | number | null
  }

  export type PreachsWhereInput = {
    AND?: PreachsWhereInput | PreachsWhereInput[]
    OR?: PreachsWhereInput[]
    NOT?: PreachsWhereInput | PreachsWhereInput[]
    id?: IntFilter<"Preachs"> | number
    title?: StringFilter<"Preachs"> | string
    description?: StringNullableFilter<"Preachs"> | string | null
    img?: StringNullableFilter<"Preachs"> | string | null
    urlVideo?: StringNullableFilter<"Preachs"> | string | null
  }

  export type PreachsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    img?: SortOrderInput | SortOrder
    urlVideo?: SortOrderInput | SortOrder
  }

  export type PreachsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PreachsWhereInput | PreachsWhereInput[]
    OR?: PreachsWhereInput[]
    NOT?: PreachsWhereInput | PreachsWhereInput[]
    title?: StringFilter<"Preachs"> | string
    description?: StringNullableFilter<"Preachs"> | string | null
    img?: StringNullableFilter<"Preachs"> | string | null
    urlVideo?: StringNullableFilter<"Preachs"> | string | null
  }, "id">

  export type PreachsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    img?: SortOrderInput | SortOrder
    urlVideo?: SortOrderInput | SortOrder
    _count?: PreachsCountOrderByAggregateInput
    _avg?: PreachsAvgOrderByAggregateInput
    _max?: PreachsMaxOrderByAggregateInput
    _min?: PreachsMinOrderByAggregateInput
    _sum?: PreachsSumOrderByAggregateInput
  }

  export type PreachsScalarWhereWithAggregatesInput = {
    AND?: PreachsScalarWhereWithAggregatesInput | PreachsScalarWhereWithAggregatesInput[]
    OR?: PreachsScalarWhereWithAggregatesInput[]
    NOT?: PreachsScalarWhereWithAggregatesInput | PreachsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Preachs"> | number
    title?: StringWithAggregatesFilter<"Preachs"> | string
    description?: StringNullableWithAggregatesFilter<"Preachs"> | string | null
    img?: StringNullableWithAggregatesFilter<"Preachs"> | string | null
    urlVideo?: StringNullableWithAggregatesFilter<"Preachs"> | string | null
  }

  export type LastActivitiesWhereInput = {
    AND?: LastActivitiesWhereInput | LastActivitiesWhereInput[]
    OR?: LastActivitiesWhereInput[]
    NOT?: LastActivitiesWhereInput | LastActivitiesWhereInput[]
    id?: IntFilter<"LastActivities"> | number
    title?: StringFilter<"LastActivities"> | string
    img?: StringNullableFilter<"LastActivities"> | string | null
  }

  export type LastActivitiesOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    img?: SortOrderInput | SortOrder
  }

  export type LastActivitiesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LastActivitiesWhereInput | LastActivitiesWhereInput[]
    OR?: LastActivitiesWhereInput[]
    NOT?: LastActivitiesWhereInput | LastActivitiesWhereInput[]
    title?: StringFilter<"LastActivities"> | string
    img?: StringNullableFilter<"LastActivities"> | string | null
  }, "id">

  export type LastActivitiesOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    img?: SortOrderInput | SortOrder
    _count?: LastActivitiesCountOrderByAggregateInput
    _avg?: LastActivitiesAvgOrderByAggregateInput
    _max?: LastActivitiesMaxOrderByAggregateInput
    _min?: LastActivitiesMinOrderByAggregateInput
    _sum?: LastActivitiesSumOrderByAggregateInput
  }

  export type LastActivitiesScalarWhereWithAggregatesInput = {
    AND?: LastActivitiesScalarWhereWithAggregatesInput | LastActivitiesScalarWhereWithAggregatesInput[]
    OR?: LastActivitiesScalarWhereWithAggregatesInput[]
    NOT?: LastActivitiesScalarWhereWithAggregatesInput | LastActivitiesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"LastActivities"> | number
    title?: StringWithAggregatesFilter<"LastActivities"> | string
    img?: StringNullableWithAggregatesFilter<"LastActivities"> | string | null
  }

  export type JovenWhereInput = {
    AND?: JovenWhereInput | JovenWhereInput[]
    OR?: JovenWhereInput[]
    NOT?: JovenWhereInput | JovenWhereInput[]
    id?: IntFilter<"Joven"> | number
    nombres?: StringFilter<"Joven"> | string
    apellidos?: StringFilter<"Joven"> | string
    documento?: StringFilter<"Joven"> | string
    telefono?: StringNullableFilter<"Joven"> | string | null
    fechaNacimiento?: DateTimeNullableFilter<"Joven"> | Date | string | null
    sede?: StringFilter<"Joven"> | string
    grupoId?: IntNullableFilter<"Joven"> | number | null
    ultimaVisita?: DateTimeNullableFilter<"Joven"> | Date | string | null
    activo?: BoolFilter<"Joven"> | boolean
    grupo?: XOR<GrupoNullableRelationFilter, GrupoWhereInput> | null
    asistencias?: AsistenciaListRelationFilter
  }

  export type JovenOrderByWithRelationInput = {
    id?: SortOrder
    nombres?: SortOrder
    apellidos?: SortOrder
    documento?: SortOrder
    telefono?: SortOrderInput | SortOrder
    fechaNacimiento?: SortOrderInput | SortOrder
    sede?: SortOrder
    grupoId?: SortOrderInput | SortOrder
    ultimaVisita?: SortOrderInput | SortOrder
    activo?: SortOrder
    grupo?: GrupoOrderByWithRelationInput
    asistencias?: AsistenciaOrderByRelationAggregateInput
  }

  export type JovenWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    documento?: string
    AND?: JovenWhereInput | JovenWhereInput[]
    OR?: JovenWhereInput[]
    NOT?: JovenWhereInput | JovenWhereInput[]
    nombres?: StringFilter<"Joven"> | string
    apellidos?: StringFilter<"Joven"> | string
    telefono?: StringNullableFilter<"Joven"> | string | null
    fechaNacimiento?: DateTimeNullableFilter<"Joven"> | Date | string | null
    sede?: StringFilter<"Joven"> | string
    grupoId?: IntNullableFilter<"Joven"> | number | null
    ultimaVisita?: DateTimeNullableFilter<"Joven"> | Date | string | null
    activo?: BoolFilter<"Joven"> | boolean
    grupo?: XOR<GrupoNullableRelationFilter, GrupoWhereInput> | null
    asistencias?: AsistenciaListRelationFilter
  }, "id" | "documento">

  export type JovenOrderByWithAggregationInput = {
    id?: SortOrder
    nombres?: SortOrder
    apellidos?: SortOrder
    documento?: SortOrder
    telefono?: SortOrderInput | SortOrder
    fechaNacimiento?: SortOrderInput | SortOrder
    sede?: SortOrder
    grupoId?: SortOrderInput | SortOrder
    ultimaVisita?: SortOrderInput | SortOrder
    activo?: SortOrder
    _count?: JovenCountOrderByAggregateInput
    _avg?: JovenAvgOrderByAggregateInput
    _max?: JovenMaxOrderByAggregateInput
    _min?: JovenMinOrderByAggregateInput
    _sum?: JovenSumOrderByAggregateInput
  }

  export type JovenScalarWhereWithAggregatesInput = {
    AND?: JovenScalarWhereWithAggregatesInput | JovenScalarWhereWithAggregatesInput[]
    OR?: JovenScalarWhereWithAggregatesInput[]
    NOT?: JovenScalarWhereWithAggregatesInput | JovenScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Joven"> | number
    nombres?: StringWithAggregatesFilter<"Joven"> | string
    apellidos?: StringWithAggregatesFilter<"Joven"> | string
    documento?: StringWithAggregatesFilter<"Joven"> | string
    telefono?: StringNullableWithAggregatesFilter<"Joven"> | string | null
    fechaNacimiento?: DateTimeNullableWithAggregatesFilter<"Joven"> | Date | string | null
    sede?: StringWithAggregatesFilter<"Joven"> | string
    grupoId?: IntNullableWithAggregatesFilter<"Joven"> | number | null
    ultimaVisita?: DateTimeNullableWithAggregatesFilter<"Joven"> | Date | string | null
    activo?: BoolWithAggregatesFilter<"Joven"> | boolean
  }

  export type AsistenciaWhereInput = {
    AND?: AsistenciaWhereInput | AsistenciaWhereInput[]
    OR?: AsistenciaWhereInput[]
    NOT?: AsistenciaWhereInput | AsistenciaWhereInput[]
    id?: IntFilter<"Asistencia"> | number
    fecha?: DateTimeFilter<"Asistencia"> | Date | string
    jovenId?: IntFilter<"Asistencia"> | number
    joven?: XOR<JovenRelationFilter, JovenWhereInput>
  }

  export type AsistenciaOrderByWithRelationInput = {
    id?: SortOrder
    fecha?: SortOrder
    jovenId?: SortOrder
    joven?: JovenOrderByWithRelationInput
  }

  export type AsistenciaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AsistenciaWhereInput | AsistenciaWhereInput[]
    OR?: AsistenciaWhereInput[]
    NOT?: AsistenciaWhereInput | AsistenciaWhereInput[]
    fecha?: DateTimeFilter<"Asistencia"> | Date | string
    jovenId?: IntFilter<"Asistencia"> | number
    joven?: XOR<JovenRelationFilter, JovenWhereInput>
  }, "id">

  export type AsistenciaOrderByWithAggregationInput = {
    id?: SortOrder
    fecha?: SortOrder
    jovenId?: SortOrder
    _count?: AsistenciaCountOrderByAggregateInput
    _avg?: AsistenciaAvgOrderByAggregateInput
    _max?: AsistenciaMaxOrderByAggregateInput
    _min?: AsistenciaMinOrderByAggregateInput
    _sum?: AsistenciaSumOrderByAggregateInput
  }

  export type AsistenciaScalarWhereWithAggregatesInput = {
    AND?: AsistenciaScalarWhereWithAggregatesInput | AsistenciaScalarWhereWithAggregatesInput[]
    OR?: AsistenciaScalarWhereWithAggregatesInput[]
    NOT?: AsistenciaScalarWhereWithAggregatesInput | AsistenciaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Asistencia"> | number
    fecha?: DateTimeWithAggregatesFilter<"Asistencia"> | Date | string
    jovenId?: IntWithAggregatesFilter<"Asistencia"> | number
  }

  export type AllowedUserWhereInput = {
    AND?: AllowedUserWhereInput | AllowedUserWhereInput[]
    OR?: AllowedUserWhereInput[]
    NOT?: AllowedUserWhereInput | AllowedUserWhereInput[]
    id?: StringFilter<"AllowedUser"> | string
    email?: StringFilter<"AllowedUser"> | string
    name?: StringNullableFilter<"AllowedUser"> | string | null
    role?: StringFilter<"AllowedUser"> | string
    createdAt?: DateTimeFilter<"AllowedUser"> | Date | string
  }

  export type AllowedUserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type AllowedUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: AllowedUserWhereInput | AllowedUserWhereInput[]
    OR?: AllowedUserWhereInput[]
    NOT?: AllowedUserWhereInput | AllowedUserWhereInput[]
    name?: StringNullableFilter<"AllowedUser"> | string | null
    role?: StringFilter<"AllowedUser"> | string
    createdAt?: DateTimeFilter<"AllowedUser"> | Date | string
  }, "id" | "email">

  export type AllowedUserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: AllowedUserCountOrderByAggregateInput
    _max?: AllowedUserMaxOrderByAggregateInput
    _min?: AllowedUserMinOrderByAggregateInput
  }

  export type AllowedUserScalarWhereWithAggregatesInput = {
    AND?: AllowedUserScalarWhereWithAggregatesInput | AllowedUserScalarWhereWithAggregatesInput[]
    OR?: AllowedUserScalarWhereWithAggregatesInput[]
    NOT?: AllowedUserScalarWhereWithAggregatesInput | AllowedUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AllowedUser"> | string
    email?: StringWithAggregatesFilter<"AllowedUser"> | string
    name?: StringNullableWithAggregatesFilter<"AllowedUser"> | string | null
    role?: StringWithAggregatesFilter<"AllowedUser"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AllowedUser"> | Date | string
  }

  export type PersonaWhereInput = {
    AND?: PersonaWhereInput | PersonaWhereInput[]
    OR?: PersonaWhereInput[]
    NOT?: PersonaWhereInput | PersonaWhereInput[]
    id?: StringFilter<"Persona"> | string
    nombre?: StringFilter<"Persona"> | string
    telefono?: StringNullableFilter<"Persona"> | string | null
    FechaNacimiento?: DateTimeNullableFilter<"Persona"> | Date | string | null
    esNuevo?: BoolFilter<"Persona"> | boolean
    esJoven?: BoolFilter<"Persona"> | boolean
    fechaVisita?: DateTimeFilter<"Persona"> | Date | string
    estado?: StringFilter<"Persona"> | string
    conteoVisitas?: IntFilter<"Persona"> | number
    jovenId?: IntNullableFilter<"Persona"> | number | null
    peticiones?: PeticionListRelationFilter
  }

  export type PersonaOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    telefono?: SortOrderInput | SortOrder
    FechaNacimiento?: SortOrderInput | SortOrder
    esNuevo?: SortOrder
    esJoven?: SortOrder
    fechaVisita?: SortOrder
    estado?: SortOrder
    conteoVisitas?: SortOrder
    jovenId?: SortOrderInput | SortOrder
    peticiones?: PeticionOrderByRelationAggregateInput
  }

  export type PersonaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PersonaWhereInput | PersonaWhereInput[]
    OR?: PersonaWhereInput[]
    NOT?: PersonaWhereInput | PersonaWhereInput[]
    nombre?: StringFilter<"Persona"> | string
    telefono?: StringNullableFilter<"Persona"> | string | null
    FechaNacimiento?: DateTimeNullableFilter<"Persona"> | Date | string | null
    esNuevo?: BoolFilter<"Persona"> | boolean
    esJoven?: BoolFilter<"Persona"> | boolean
    fechaVisita?: DateTimeFilter<"Persona"> | Date | string
    estado?: StringFilter<"Persona"> | string
    conteoVisitas?: IntFilter<"Persona"> | number
    jovenId?: IntNullableFilter<"Persona"> | number | null
    peticiones?: PeticionListRelationFilter
  }, "id">

  export type PersonaOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    telefono?: SortOrderInput | SortOrder
    FechaNacimiento?: SortOrderInput | SortOrder
    esNuevo?: SortOrder
    esJoven?: SortOrder
    fechaVisita?: SortOrder
    estado?: SortOrder
    conteoVisitas?: SortOrder
    jovenId?: SortOrderInput | SortOrder
    _count?: PersonaCountOrderByAggregateInput
    _avg?: PersonaAvgOrderByAggregateInput
    _max?: PersonaMaxOrderByAggregateInput
    _min?: PersonaMinOrderByAggregateInput
    _sum?: PersonaSumOrderByAggregateInput
  }

  export type PersonaScalarWhereWithAggregatesInput = {
    AND?: PersonaScalarWhereWithAggregatesInput | PersonaScalarWhereWithAggregatesInput[]
    OR?: PersonaScalarWhereWithAggregatesInput[]
    NOT?: PersonaScalarWhereWithAggregatesInput | PersonaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Persona"> | string
    nombre?: StringWithAggregatesFilter<"Persona"> | string
    telefono?: StringNullableWithAggregatesFilter<"Persona"> | string | null
    FechaNacimiento?: DateTimeNullableWithAggregatesFilter<"Persona"> | Date | string | null
    esNuevo?: BoolWithAggregatesFilter<"Persona"> | boolean
    esJoven?: BoolWithAggregatesFilter<"Persona"> | boolean
    fechaVisita?: DateTimeWithAggregatesFilter<"Persona"> | Date | string
    estado?: StringWithAggregatesFilter<"Persona"> | string
    conteoVisitas?: IntWithAggregatesFilter<"Persona"> | number
    jovenId?: IntNullableWithAggregatesFilter<"Persona"> | number | null
  }

  export type PeticionWhereInput = {
    AND?: PeticionWhereInput | PeticionWhereInput[]
    OR?: PeticionWhereInput[]
    NOT?: PeticionWhereInput | PeticionWhereInput[]
    id?: StringFilter<"Peticion"> | string
    motivo?: StringFilter<"Peticion"> | string
    estado?: EnumEstadoPeticionFilter<"Peticion"> | $Enums.EstadoPeticion
    fecha?: DateTimeFilter<"Peticion"> | Date | string
    personaId?: StringNullableFilter<"Peticion"> | string | null
    persona?: XOR<PersonaNullableRelationFilter, PersonaWhereInput> | null
  }

  export type PeticionOrderByWithRelationInput = {
    id?: SortOrder
    motivo?: SortOrder
    estado?: SortOrder
    fecha?: SortOrder
    personaId?: SortOrderInput | SortOrder
    persona?: PersonaOrderByWithRelationInput
  }

  export type PeticionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PeticionWhereInput | PeticionWhereInput[]
    OR?: PeticionWhereInput[]
    NOT?: PeticionWhereInput | PeticionWhereInput[]
    motivo?: StringFilter<"Peticion"> | string
    estado?: EnumEstadoPeticionFilter<"Peticion"> | $Enums.EstadoPeticion
    fecha?: DateTimeFilter<"Peticion"> | Date | string
    personaId?: StringNullableFilter<"Peticion"> | string | null
    persona?: XOR<PersonaNullableRelationFilter, PersonaWhereInput> | null
  }, "id">

  export type PeticionOrderByWithAggregationInput = {
    id?: SortOrder
    motivo?: SortOrder
    estado?: SortOrder
    fecha?: SortOrder
    personaId?: SortOrderInput | SortOrder
    _count?: PeticionCountOrderByAggregateInput
    _max?: PeticionMaxOrderByAggregateInput
    _min?: PeticionMinOrderByAggregateInput
  }

  export type PeticionScalarWhereWithAggregatesInput = {
    AND?: PeticionScalarWhereWithAggregatesInput | PeticionScalarWhereWithAggregatesInput[]
    OR?: PeticionScalarWhereWithAggregatesInput[]
    NOT?: PeticionScalarWhereWithAggregatesInput | PeticionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Peticion"> | string
    motivo?: StringWithAggregatesFilter<"Peticion"> | string
    estado?: EnumEstadoPeticionWithAggregatesFilter<"Peticion"> | $Enums.EstadoPeticion
    fecha?: DateTimeWithAggregatesFilter<"Peticion"> | Date | string
    personaId?: StringNullableWithAggregatesFilter<"Peticion"> | string | null
  }

  export type GrupoWhereInput = {
    AND?: GrupoWhereInput | GrupoWhereInput[]
    OR?: GrupoWhereInput[]
    NOT?: GrupoWhereInput | GrupoWhereInput[]
    id?: IntFilter<"Grupo"> | number
    nombre?: StringFilter<"Grupo"> | string
    lider?: StringFilter<"Grupo"> | string
    dia?: StringFilter<"Grupo"> | string
    hora?: StringFilter<"Grupo"> | string
    direccion?: StringFilter<"Grupo"> | string
    tipo?: StringFilter<"Grupo"> | string
    activo?: BoolFilter<"Grupo"> | boolean
    miembros?: JovenListRelationFilter
  }

  export type GrupoOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    lider?: SortOrder
    dia?: SortOrder
    hora?: SortOrder
    direccion?: SortOrder
    tipo?: SortOrder
    activo?: SortOrder
    miembros?: JovenOrderByRelationAggregateInput
  }

  export type GrupoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GrupoWhereInput | GrupoWhereInput[]
    OR?: GrupoWhereInput[]
    NOT?: GrupoWhereInput | GrupoWhereInput[]
    nombre?: StringFilter<"Grupo"> | string
    lider?: StringFilter<"Grupo"> | string
    dia?: StringFilter<"Grupo"> | string
    hora?: StringFilter<"Grupo"> | string
    direccion?: StringFilter<"Grupo"> | string
    tipo?: StringFilter<"Grupo"> | string
    activo?: BoolFilter<"Grupo"> | boolean
    miembros?: JovenListRelationFilter
  }, "id">

  export type GrupoOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    lider?: SortOrder
    dia?: SortOrder
    hora?: SortOrder
    direccion?: SortOrder
    tipo?: SortOrder
    activo?: SortOrder
    _count?: GrupoCountOrderByAggregateInput
    _avg?: GrupoAvgOrderByAggregateInput
    _max?: GrupoMaxOrderByAggregateInput
    _min?: GrupoMinOrderByAggregateInput
    _sum?: GrupoSumOrderByAggregateInput
  }

  export type GrupoScalarWhereWithAggregatesInput = {
    AND?: GrupoScalarWhereWithAggregatesInput | GrupoScalarWhereWithAggregatesInput[]
    OR?: GrupoScalarWhereWithAggregatesInput[]
    NOT?: GrupoScalarWhereWithAggregatesInput | GrupoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Grupo"> | number
    nombre?: StringWithAggregatesFilter<"Grupo"> | string
    lider?: StringWithAggregatesFilter<"Grupo"> | string
    dia?: StringWithAggregatesFilter<"Grupo"> | string
    hora?: StringWithAggregatesFilter<"Grupo"> | string
    direccion?: StringWithAggregatesFilter<"Grupo"> | string
    tipo?: StringWithAggregatesFilter<"Grupo"> | string
    activo?: BoolWithAggregatesFilter<"Grupo"> | boolean
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    module?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    description?: StringNullableFilter<"AuditLog"> | string | null
    actorEmail?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    module?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    actorEmail?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    module?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    description?: StringNullableFilter<"AuditLog"> | string | null
    actorEmail?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    module?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    actorEmail?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    module?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entity?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    description?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    actorEmail?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    password: string
    nombre: string
    role?: $Enums.Role
    sede?: string | null
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    nombre: string
    role?: $Enums.Role
    sede?: string | null
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    sede?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    sede?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    nombre: string
    role?: $Enums.Role
    sede?: string | null
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    sede?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    sede?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AreaCreateInput = {
    title: string
    description?: string | null
    img?: string | null
    value: string
    rol: string
    activities?: ActivitiesCreateNestedManyWithoutAreaInput
  }

  export type AreaUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    img?: string | null
    value: string
    rol: string
    activities?: ActivitiesUncheckedCreateNestedManyWithoutAreaInput
  }

  export type AreaUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    img?: NullableStringFieldUpdateOperationsInput | string | null
    value?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activities?: ActivitiesUpdateManyWithoutAreaNestedInput
  }

  export type AreaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    img?: NullableStringFieldUpdateOperationsInput | string | null
    value?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activities?: ActivitiesUncheckedUpdateManyWithoutAreaNestedInput
  }

  export type AreaCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    img?: string | null
    value: string
    rol: string
  }

  export type AreaUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    img?: NullableStringFieldUpdateOperationsInput | string | null
    value?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
  }

  export type AreaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    img?: NullableStringFieldUpdateOperationsInput | string | null
    value?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
  }

  export type ActivitiesCreateInput = {
    title: string
    description?: string | null
    img?: string | null
    place: string
    hour_start: Date | string
    hour_end: Date | string
    urgent?: boolean
    area?: AreaCreateNestedOneWithoutActivitiesInput
  }

  export type ActivitiesUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    img?: string | null
    place: string
    hour_start: Date | string
    hour_end: Date | string
    urgent?: boolean
    areaId?: number | null
  }

  export type ActivitiesUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    img?: NullableStringFieldUpdateOperationsInput | string | null
    place?: StringFieldUpdateOperationsInput | string
    hour_start?: DateTimeFieldUpdateOperationsInput | Date | string
    hour_end?: DateTimeFieldUpdateOperationsInput | Date | string
    urgent?: BoolFieldUpdateOperationsInput | boolean
    area?: AreaUpdateOneWithoutActivitiesNestedInput
  }

  export type ActivitiesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    img?: NullableStringFieldUpdateOperationsInput | string | null
    place?: StringFieldUpdateOperationsInput | string
    hour_start?: DateTimeFieldUpdateOperationsInput | Date | string
    hour_end?: DateTimeFieldUpdateOperationsInput | Date | string
    urgent?: BoolFieldUpdateOperationsInput | boolean
    areaId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ActivitiesCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    img?: string | null
    place: string
    hour_start: Date | string
    hour_end: Date | string
    urgent?: boolean
    areaId?: number | null
  }

  export type ActivitiesUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    img?: NullableStringFieldUpdateOperationsInput | string | null
    place?: StringFieldUpdateOperationsInput | string
    hour_start?: DateTimeFieldUpdateOperationsInput | Date | string
    hour_end?: DateTimeFieldUpdateOperationsInput | Date | string
    urgent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivitiesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    img?: NullableStringFieldUpdateOperationsInput | string | null
    place?: StringFieldUpdateOperationsInput | string
    hour_start?: DateTimeFieldUpdateOperationsInput | Date | string
    hour_end?: DateTimeFieldUpdateOperationsInput | Date | string
    urgent?: BoolFieldUpdateOperationsInput | boolean
    areaId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PreachsCreateInput = {
    title: string
    description?: string | null
    img?: string | null
    urlVideo?: string | null
  }

  export type PreachsUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    img?: string | null
    urlVideo?: string | null
  }

  export type PreachsUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    img?: NullableStringFieldUpdateOperationsInput | string | null
    urlVideo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PreachsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    img?: NullableStringFieldUpdateOperationsInput | string | null
    urlVideo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PreachsCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    img?: string | null
    urlVideo?: string | null
  }

  export type PreachsUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    img?: NullableStringFieldUpdateOperationsInput | string | null
    urlVideo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PreachsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    img?: NullableStringFieldUpdateOperationsInput | string | null
    urlVideo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LastActivitiesCreateInput = {
    title: string
    img?: string | null
  }

  export type LastActivitiesUncheckedCreateInput = {
    id?: number
    title: string
    img?: string | null
  }

  export type LastActivitiesUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    img?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LastActivitiesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    img?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LastActivitiesCreateManyInput = {
    id?: number
    title: string
    img?: string | null
  }

  export type LastActivitiesUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    img?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LastActivitiesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    img?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JovenCreateInput = {
    nombres: string
    apellidos: string
    documento: string
    telefono?: string | null
    fechaNacimiento?: Date | string | null
    sede: string
    ultimaVisita?: Date | string | null
    activo?: boolean
    grupo?: GrupoCreateNestedOneWithoutMiembrosInput
    asistencias?: AsistenciaCreateNestedManyWithoutJovenInput
  }

  export type JovenUncheckedCreateInput = {
    id?: number
    nombres: string
    apellidos: string
    documento: string
    telefono?: string | null
    fechaNacimiento?: Date | string | null
    sede: string
    grupoId?: number | null
    ultimaVisita?: Date | string | null
    activo?: boolean
    asistencias?: AsistenciaUncheckedCreateNestedManyWithoutJovenInput
  }

  export type JovenUpdateInput = {
    nombres?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sede?: StringFieldUpdateOperationsInput | string
    ultimaVisita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    grupo?: GrupoUpdateOneWithoutMiembrosNestedInput
    asistencias?: AsistenciaUpdateManyWithoutJovenNestedInput
  }

  export type JovenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombres?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sede?: StringFieldUpdateOperationsInput | string
    grupoId?: NullableIntFieldUpdateOperationsInput | number | null
    ultimaVisita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    asistencias?: AsistenciaUncheckedUpdateManyWithoutJovenNestedInput
  }

  export type JovenCreateManyInput = {
    id?: number
    nombres: string
    apellidos: string
    documento: string
    telefono?: string | null
    fechaNacimiento?: Date | string | null
    sede: string
    grupoId?: number | null
    ultimaVisita?: Date | string | null
    activo?: boolean
  }

  export type JovenUpdateManyMutationInput = {
    nombres?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sede?: StringFieldUpdateOperationsInput | string
    ultimaVisita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type JovenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombres?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sede?: StringFieldUpdateOperationsInput | string
    grupoId?: NullableIntFieldUpdateOperationsInput | number | null
    ultimaVisita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AsistenciaCreateInput = {
    fecha?: Date | string
    joven: JovenCreateNestedOneWithoutAsistenciasInput
  }

  export type AsistenciaUncheckedCreateInput = {
    id?: number
    fecha?: Date | string
    jovenId: number
  }

  export type AsistenciaUpdateInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    joven?: JovenUpdateOneRequiredWithoutAsistenciasNestedInput
  }

  export type AsistenciaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    jovenId?: IntFieldUpdateOperationsInput | number
  }

  export type AsistenciaCreateManyInput = {
    id?: number
    fecha?: Date | string
    jovenId: number
  }

  export type AsistenciaUpdateManyMutationInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AsistenciaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    jovenId?: IntFieldUpdateOperationsInput | number
  }

  export type AllowedUserCreateInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    createdAt?: Date | string
  }

  export type AllowedUserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    createdAt?: Date | string
  }

  export type AllowedUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllowedUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllowedUserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    createdAt?: Date | string
  }

  export type AllowedUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllowedUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonaCreateInput = {
    id?: string
    nombre: string
    telefono?: string | null
    FechaNacimiento?: Date | string | null
    esNuevo?: boolean
    esJoven?: boolean
    fechaVisita?: Date | string
    estado?: string
    conteoVisitas?: number
    jovenId?: number | null
    peticiones?: PeticionCreateNestedManyWithoutPersonaInput
  }

  export type PersonaUncheckedCreateInput = {
    id?: string
    nombre: string
    telefono?: string | null
    FechaNacimiento?: Date | string | null
    esNuevo?: boolean
    esJoven?: boolean
    fechaVisita?: Date | string
    estado?: string
    conteoVisitas?: number
    jovenId?: number | null
    peticiones?: PeticionUncheckedCreateNestedManyWithoutPersonaInput
  }

  export type PersonaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    FechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    esNuevo?: BoolFieldUpdateOperationsInput | boolean
    esJoven?: BoolFieldUpdateOperationsInput | boolean
    fechaVisita?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: StringFieldUpdateOperationsInput | string
    conteoVisitas?: IntFieldUpdateOperationsInput | number
    jovenId?: NullableIntFieldUpdateOperationsInput | number | null
    peticiones?: PeticionUpdateManyWithoutPersonaNestedInput
  }

  export type PersonaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    FechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    esNuevo?: BoolFieldUpdateOperationsInput | boolean
    esJoven?: BoolFieldUpdateOperationsInput | boolean
    fechaVisita?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: StringFieldUpdateOperationsInput | string
    conteoVisitas?: IntFieldUpdateOperationsInput | number
    jovenId?: NullableIntFieldUpdateOperationsInput | number | null
    peticiones?: PeticionUncheckedUpdateManyWithoutPersonaNestedInput
  }

  export type PersonaCreateManyInput = {
    id?: string
    nombre: string
    telefono?: string | null
    FechaNacimiento?: Date | string | null
    esNuevo?: boolean
    esJoven?: boolean
    fechaVisita?: Date | string
    estado?: string
    conteoVisitas?: number
    jovenId?: number | null
  }

  export type PersonaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    FechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    esNuevo?: BoolFieldUpdateOperationsInput | boolean
    esJoven?: BoolFieldUpdateOperationsInput | boolean
    fechaVisita?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: StringFieldUpdateOperationsInput | string
    conteoVisitas?: IntFieldUpdateOperationsInput | number
    jovenId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PersonaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    FechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    esNuevo?: BoolFieldUpdateOperationsInput | boolean
    esJoven?: BoolFieldUpdateOperationsInput | boolean
    fechaVisita?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: StringFieldUpdateOperationsInput | string
    conteoVisitas?: IntFieldUpdateOperationsInput | number
    jovenId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PeticionCreateInput = {
    id?: string
    motivo: string
    estado?: $Enums.EstadoPeticion
    fecha?: Date | string
    persona?: PersonaCreateNestedOneWithoutPeticionesInput
  }

  export type PeticionUncheckedCreateInput = {
    id?: string
    motivo: string
    estado?: $Enums.EstadoPeticion
    fecha?: Date | string
    personaId?: string | null
  }

  export type PeticionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPeticionFieldUpdateOperationsInput | $Enums.EstadoPeticion
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    persona?: PersonaUpdateOneWithoutPeticionesNestedInput
  }

  export type PeticionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPeticionFieldUpdateOperationsInput | $Enums.EstadoPeticion
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    personaId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PeticionCreateManyInput = {
    id?: string
    motivo: string
    estado?: $Enums.EstadoPeticion
    fecha?: Date | string
    personaId?: string | null
  }

  export type PeticionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPeticionFieldUpdateOperationsInput | $Enums.EstadoPeticion
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeticionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPeticionFieldUpdateOperationsInput | $Enums.EstadoPeticion
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    personaId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GrupoCreateInput = {
    nombre: string
    lider: string
    dia: string
    hora: string
    direccion: string
    tipo: string
    activo?: boolean
    miembros?: JovenCreateNestedManyWithoutGrupoInput
  }

  export type GrupoUncheckedCreateInput = {
    id?: number
    nombre: string
    lider: string
    dia: string
    hora: string
    direccion: string
    tipo: string
    activo?: boolean
    miembros?: JovenUncheckedCreateNestedManyWithoutGrupoInput
  }

  export type GrupoUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    lider?: StringFieldUpdateOperationsInput | string
    dia?: StringFieldUpdateOperationsInput | string
    hora?: StringFieldUpdateOperationsInput | string
    direccion?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    miembros?: JovenUpdateManyWithoutGrupoNestedInput
  }

  export type GrupoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    lider?: StringFieldUpdateOperationsInput | string
    dia?: StringFieldUpdateOperationsInput | string
    hora?: StringFieldUpdateOperationsInput | string
    direccion?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    miembros?: JovenUncheckedUpdateManyWithoutGrupoNestedInput
  }

  export type GrupoCreateManyInput = {
    id?: number
    nombre: string
    lider: string
    dia: string
    hora: string
    direccion: string
    tipo: string
    activo?: boolean
  }

  export type GrupoUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    lider?: StringFieldUpdateOperationsInput | string
    dia?: StringFieldUpdateOperationsInput | string
    hora?: StringFieldUpdateOperationsInput | string
    direccion?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GrupoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    lider?: StringFieldUpdateOperationsInput | string
    dia?: StringFieldUpdateOperationsInput | string
    hora?: StringFieldUpdateOperationsInput | string
    direccion?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AuditLogCreateInput = {
    id?: string
    module: string
    action: string
    entity: string
    entityId?: string | null
    description?: string | null
    actorEmail?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    module: string
    action: string
    entity: string
    entityId?: string | null
    description?: string | null
    actorEmail?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    module?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    module?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    module: string
    action: string
    entity: string
    entityId?: string | null
    description?: string | null
    actorEmail?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    module?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    module?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nombre?: SortOrder
    role?: SortOrder
    sede?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nombre?: SortOrder
    role?: SortOrder
    sede?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    nombre?: SortOrder
    role?: SortOrder
    sede?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type ActivitiesListRelationFilter = {
    every?: ActivitiesWhereInput
    some?: ActivitiesWhereInput
    none?: ActivitiesWhereInput
  }

  export type ActivitiesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AreaCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    img?: SortOrder
    value?: SortOrder
    rol?: SortOrder
  }

  export type AreaAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AreaMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    img?: SortOrder
    value?: SortOrder
    rol?: SortOrder
  }

  export type AreaMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    img?: SortOrder
    value?: SortOrder
    rol?: SortOrder
  }

  export type AreaSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type AreaNullableRelationFilter = {
    is?: AreaWhereInput | null
    isNot?: AreaWhereInput | null
  }

  export type ActivitiesCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    img?: SortOrder
    place?: SortOrder
    hour_start?: SortOrder
    hour_end?: SortOrder
    urgent?: SortOrder
    areaId?: SortOrder
  }

  export type ActivitiesAvgOrderByAggregateInput = {
    id?: SortOrder
    areaId?: SortOrder
  }

  export type ActivitiesMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    img?: SortOrder
    place?: SortOrder
    hour_start?: SortOrder
    hour_end?: SortOrder
    urgent?: SortOrder
    areaId?: SortOrder
  }

  export type ActivitiesMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    img?: SortOrder
    place?: SortOrder
    hour_start?: SortOrder
    hour_end?: SortOrder
    urgent?: SortOrder
    areaId?: SortOrder
  }

  export type ActivitiesSumOrderByAggregateInput = {
    id?: SortOrder
    areaId?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type PreachsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    img?: SortOrder
    urlVideo?: SortOrder
  }

  export type PreachsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PreachsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    img?: SortOrder
    urlVideo?: SortOrder
  }

  export type PreachsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    img?: SortOrder
    urlVideo?: SortOrder
  }

  export type PreachsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type LastActivitiesCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    img?: SortOrder
  }

  export type LastActivitiesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type LastActivitiesMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    img?: SortOrder
  }

  export type LastActivitiesMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    img?: SortOrder
  }

  export type LastActivitiesSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type GrupoNullableRelationFilter = {
    is?: GrupoWhereInput | null
    isNot?: GrupoWhereInput | null
  }

  export type AsistenciaListRelationFilter = {
    every?: AsistenciaWhereInput
    some?: AsistenciaWhereInput
    none?: AsistenciaWhereInput
  }

  export type AsistenciaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JovenCountOrderByAggregateInput = {
    id?: SortOrder
    nombres?: SortOrder
    apellidos?: SortOrder
    documento?: SortOrder
    telefono?: SortOrder
    fechaNacimiento?: SortOrder
    sede?: SortOrder
    grupoId?: SortOrder
    ultimaVisita?: SortOrder
    activo?: SortOrder
  }

  export type JovenAvgOrderByAggregateInput = {
    id?: SortOrder
    grupoId?: SortOrder
  }

  export type JovenMaxOrderByAggregateInput = {
    id?: SortOrder
    nombres?: SortOrder
    apellidos?: SortOrder
    documento?: SortOrder
    telefono?: SortOrder
    fechaNacimiento?: SortOrder
    sede?: SortOrder
    grupoId?: SortOrder
    ultimaVisita?: SortOrder
    activo?: SortOrder
  }

  export type JovenMinOrderByAggregateInput = {
    id?: SortOrder
    nombres?: SortOrder
    apellidos?: SortOrder
    documento?: SortOrder
    telefono?: SortOrder
    fechaNacimiento?: SortOrder
    sede?: SortOrder
    grupoId?: SortOrder
    ultimaVisita?: SortOrder
    activo?: SortOrder
  }

  export type JovenSumOrderByAggregateInput = {
    id?: SortOrder
    grupoId?: SortOrder
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

  export type JovenRelationFilter = {
    is?: JovenWhereInput
    isNot?: JovenWhereInput
  }

  export type AsistenciaCountOrderByAggregateInput = {
    id?: SortOrder
    fecha?: SortOrder
    jovenId?: SortOrder
  }

  export type AsistenciaAvgOrderByAggregateInput = {
    id?: SortOrder
    jovenId?: SortOrder
  }

  export type AsistenciaMaxOrderByAggregateInput = {
    id?: SortOrder
    fecha?: SortOrder
    jovenId?: SortOrder
  }

  export type AsistenciaMinOrderByAggregateInput = {
    id?: SortOrder
    fecha?: SortOrder
    jovenId?: SortOrder
  }

  export type AsistenciaSumOrderByAggregateInput = {
    id?: SortOrder
    jovenId?: SortOrder
  }

  export type AllowedUserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type AllowedUserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type AllowedUserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type PeticionListRelationFilter = {
    every?: PeticionWhereInput
    some?: PeticionWhereInput
    none?: PeticionWhereInput
  }

  export type PeticionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PersonaCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    telefono?: SortOrder
    FechaNacimiento?: SortOrder
    esNuevo?: SortOrder
    esJoven?: SortOrder
    fechaVisita?: SortOrder
    estado?: SortOrder
    conteoVisitas?: SortOrder
    jovenId?: SortOrder
  }

  export type PersonaAvgOrderByAggregateInput = {
    conteoVisitas?: SortOrder
    jovenId?: SortOrder
  }

  export type PersonaMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    telefono?: SortOrder
    FechaNacimiento?: SortOrder
    esNuevo?: SortOrder
    esJoven?: SortOrder
    fechaVisita?: SortOrder
    estado?: SortOrder
    conteoVisitas?: SortOrder
    jovenId?: SortOrder
  }

  export type PersonaMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    telefono?: SortOrder
    FechaNacimiento?: SortOrder
    esNuevo?: SortOrder
    esJoven?: SortOrder
    fechaVisita?: SortOrder
    estado?: SortOrder
    conteoVisitas?: SortOrder
    jovenId?: SortOrder
  }

  export type PersonaSumOrderByAggregateInput = {
    conteoVisitas?: SortOrder
    jovenId?: SortOrder
  }

  export type EnumEstadoPeticionFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPeticion | EnumEstadoPeticionFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPeticion[] | ListEnumEstadoPeticionFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPeticion[] | ListEnumEstadoPeticionFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPeticionFilter<$PrismaModel> | $Enums.EstadoPeticion
  }

  export type PersonaNullableRelationFilter = {
    is?: PersonaWhereInput | null
    isNot?: PersonaWhereInput | null
  }

  export type PeticionCountOrderByAggregateInput = {
    id?: SortOrder
    motivo?: SortOrder
    estado?: SortOrder
    fecha?: SortOrder
    personaId?: SortOrder
  }

  export type PeticionMaxOrderByAggregateInput = {
    id?: SortOrder
    motivo?: SortOrder
    estado?: SortOrder
    fecha?: SortOrder
    personaId?: SortOrder
  }

  export type PeticionMinOrderByAggregateInput = {
    id?: SortOrder
    motivo?: SortOrder
    estado?: SortOrder
    fecha?: SortOrder
    personaId?: SortOrder
  }

  export type EnumEstadoPeticionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPeticion | EnumEstadoPeticionFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPeticion[] | ListEnumEstadoPeticionFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPeticion[] | ListEnumEstadoPeticionFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPeticionWithAggregatesFilter<$PrismaModel> | $Enums.EstadoPeticion
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoPeticionFilter<$PrismaModel>
    _max?: NestedEnumEstadoPeticionFilter<$PrismaModel>
  }

  export type JovenListRelationFilter = {
    every?: JovenWhereInput
    some?: JovenWhereInput
    none?: JovenWhereInput
  }

  export type JovenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GrupoCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    lider?: SortOrder
    dia?: SortOrder
    hora?: SortOrder
    direccion?: SortOrder
    tipo?: SortOrder
    activo?: SortOrder
  }

  export type GrupoAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GrupoMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    lider?: SortOrder
    dia?: SortOrder
    hora?: SortOrder
    direccion?: SortOrder
    tipo?: SortOrder
    activo?: SortOrder
  }

  export type GrupoMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    lider?: SortOrder
    dia?: SortOrder
    hora?: SortOrder
    direccion?: SortOrder
    tipo?: SortOrder
    activo?: SortOrder
  }

  export type GrupoSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    module?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    description?: SortOrder
    actorEmail?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    module?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    description?: SortOrder
    actorEmail?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    module?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    description?: SortOrder
    actorEmail?: SortOrder
    createdAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ActivitiesCreateNestedManyWithoutAreaInput = {
    create?: XOR<ActivitiesCreateWithoutAreaInput, ActivitiesUncheckedCreateWithoutAreaInput> | ActivitiesCreateWithoutAreaInput[] | ActivitiesUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: ActivitiesCreateOrConnectWithoutAreaInput | ActivitiesCreateOrConnectWithoutAreaInput[]
    createMany?: ActivitiesCreateManyAreaInputEnvelope
    connect?: ActivitiesWhereUniqueInput | ActivitiesWhereUniqueInput[]
  }

  export type ActivitiesUncheckedCreateNestedManyWithoutAreaInput = {
    create?: XOR<ActivitiesCreateWithoutAreaInput, ActivitiesUncheckedCreateWithoutAreaInput> | ActivitiesCreateWithoutAreaInput[] | ActivitiesUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: ActivitiesCreateOrConnectWithoutAreaInput | ActivitiesCreateOrConnectWithoutAreaInput[]
    createMany?: ActivitiesCreateManyAreaInputEnvelope
    connect?: ActivitiesWhereUniqueInput | ActivitiesWhereUniqueInput[]
  }

  export type ActivitiesUpdateManyWithoutAreaNestedInput = {
    create?: XOR<ActivitiesCreateWithoutAreaInput, ActivitiesUncheckedCreateWithoutAreaInput> | ActivitiesCreateWithoutAreaInput[] | ActivitiesUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: ActivitiesCreateOrConnectWithoutAreaInput | ActivitiesCreateOrConnectWithoutAreaInput[]
    upsert?: ActivitiesUpsertWithWhereUniqueWithoutAreaInput | ActivitiesUpsertWithWhereUniqueWithoutAreaInput[]
    createMany?: ActivitiesCreateManyAreaInputEnvelope
    set?: ActivitiesWhereUniqueInput | ActivitiesWhereUniqueInput[]
    disconnect?: ActivitiesWhereUniqueInput | ActivitiesWhereUniqueInput[]
    delete?: ActivitiesWhereUniqueInput | ActivitiesWhereUniqueInput[]
    connect?: ActivitiesWhereUniqueInput | ActivitiesWhereUniqueInput[]
    update?: ActivitiesUpdateWithWhereUniqueWithoutAreaInput | ActivitiesUpdateWithWhereUniqueWithoutAreaInput[]
    updateMany?: ActivitiesUpdateManyWithWhereWithoutAreaInput | ActivitiesUpdateManyWithWhereWithoutAreaInput[]
    deleteMany?: ActivitiesScalarWhereInput | ActivitiesScalarWhereInput[]
  }

  export type ActivitiesUncheckedUpdateManyWithoutAreaNestedInput = {
    create?: XOR<ActivitiesCreateWithoutAreaInput, ActivitiesUncheckedCreateWithoutAreaInput> | ActivitiesCreateWithoutAreaInput[] | ActivitiesUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: ActivitiesCreateOrConnectWithoutAreaInput | ActivitiesCreateOrConnectWithoutAreaInput[]
    upsert?: ActivitiesUpsertWithWhereUniqueWithoutAreaInput | ActivitiesUpsertWithWhereUniqueWithoutAreaInput[]
    createMany?: ActivitiesCreateManyAreaInputEnvelope
    set?: ActivitiesWhereUniqueInput | ActivitiesWhereUniqueInput[]
    disconnect?: ActivitiesWhereUniqueInput | ActivitiesWhereUniqueInput[]
    delete?: ActivitiesWhereUniqueInput | ActivitiesWhereUniqueInput[]
    connect?: ActivitiesWhereUniqueInput | ActivitiesWhereUniqueInput[]
    update?: ActivitiesUpdateWithWhereUniqueWithoutAreaInput | ActivitiesUpdateWithWhereUniqueWithoutAreaInput[]
    updateMany?: ActivitiesUpdateManyWithWhereWithoutAreaInput | ActivitiesUpdateManyWithWhereWithoutAreaInput[]
    deleteMany?: ActivitiesScalarWhereInput | ActivitiesScalarWhereInput[]
  }

  export type AreaCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<AreaCreateWithoutActivitiesInput, AreaUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: AreaCreateOrConnectWithoutActivitiesInput
    connect?: AreaWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type AreaUpdateOneWithoutActivitiesNestedInput = {
    create?: XOR<AreaCreateWithoutActivitiesInput, AreaUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: AreaCreateOrConnectWithoutActivitiesInput
    upsert?: AreaUpsertWithoutActivitiesInput
    disconnect?: AreaWhereInput | boolean
    delete?: AreaWhereInput | boolean
    connect?: AreaWhereUniqueInput
    update?: XOR<XOR<AreaUpdateToOneWithWhereWithoutActivitiesInput, AreaUpdateWithoutActivitiesInput>, AreaUncheckedUpdateWithoutActivitiesInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GrupoCreateNestedOneWithoutMiembrosInput = {
    create?: XOR<GrupoCreateWithoutMiembrosInput, GrupoUncheckedCreateWithoutMiembrosInput>
    connectOrCreate?: GrupoCreateOrConnectWithoutMiembrosInput
    connect?: GrupoWhereUniqueInput
  }

  export type AsistenciaCreateNestedManyWithoutJovenInput = {
    create?: XOR<AsistenciaCreateWithoutJovenInput, AsistenciaUncheckedCreateWithoutJovenInput> | AsistenciaCreateWithoutJovenInput[] | AsistenciaUncheckedCreateWithoutJovenInput[]
    connectOrCreate?: AsistenciaCreateOrConnectWithoutJovenInput | AsistenciaCreateOrConnectWithoutJovenInput[]
    createMany?: AsistenciaCreateManyJovenInputEnvelope
    connect?: AsistenciaWhereUniqueInput | AsistenciaWhereUniqueInput[]
  }

  export type AsistenciaUncheckedCreateNestedManyWithoutJovenInput = {
    create?: XOR<AsistenciaCreateWithoutJovenInput, AsistenciaUncheckedCreateWithoutJovenInput> | AsistenciaCreateWithoutJovenInput[] | AsistenciaUncheckedCreateWithoutJovenInput[]
    connectOrCreate?: AsistenciaCreateOrConnectWithoutJovenInput | AsistenciaCreateOrConnectWithoutJovenInput[]
    createMany?: AsistenciaCreateManyJovenInputEnvelope
    connect?: AsistenciaWhereUniqueInput | AsistenciaWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type GrupoUpdateOneWithoutMiembrosNestedInput = {
    create?: XOR<GrupoCreateWithoutMiembrosInput, GrupoUncheckedCreateWithoutMiembrosInput>
    connectOrCreate?: GrupoCreateOrConnectWithoutMiembrosInput
    upsert?: GrupoUpsertWithoutMiembrosInput
    disconnect?: GrupoWhereInput | boolean
    delete?: GrupoWhereInput | boolean
    connect?: GrupoWhereUniqueInput
    update?: XOR<XOR<GrupoUpdateToOneWithWhereWithoutMiembrosInput, GrupoUpdateWithoutMiembrosInput>, GrupoUncheckedUpdateWithoutMiembrosInput>
  }

  export type AsistenciaUpdateManyWithoutJovenNestedInput = {
    create?: XOR<AsistenciaCreateWithoutJovenInput, AsistenciaUncheckedCreateWithoutJovenInput> | AsistenciaCreateWithoutJovenInput[] | AsistenciaUncheckedCreateWithoutJovenInput[]
    connectOrCreate?: AsistenciaCreateOrConnectWithoutJovenInput | AsistenciaCreateOrConnectWithoutJovenInput[]
    upsert?: AsistenciaUpsertWithWhereUniqueWithoutJovenInput | AsistenciaUpsertWithWhereUniqueWithoutJovenInput[]
    createMany?: AsistenciaCreateManyJovenInputEnvelope
    set?: AsistenciaWhereUniqueInput | AsistenciaWhereUniqueInput[]
    disconnect?: AsistenciaWhereUniqueInput | AsistenciaWhereUniqueInput[]
    delete?: AsistenciaWhereUniqueInput | AsistenciaWhereUniqueInput[]
    connect?: AsistenciaWhereUniqueInput | AsistenciaWhereUniqueInput[]
    update?: AsistenciaUpdateWithWhereUniqueWithoutJovenInput | AsistenciaUpdateWithWhereUniqueWithoutJovenInput[]
    updateMany?: AsistenciaUpdateManyWithWhereWithoutJovenInput | AsistenciaUpdateManyWithWhereWithoutJovenInput[]
    deleteMany?: AsistenciaScalarWhereInput | AsistenciaScalarWhereInput[]
  }

  export type AsistenciaUncheckedUpdateManyWithoutJovenNestedInput = {
    create?: XOR<AsistenciaCreateWithoutJovenInput, AsistenciaUncheckedCreateWithoutJovenInput> | AsistenciaCreateWithoutJovenInput[] | AsistenciaUncheckedCreateWithoutJovenInput[]
    connectOrCreate?: AsistenciaCreateOrConnectWithoutJovenInput | AsistenciaCreateOrConnectWithoutJovenInput[]
    upsert?: AsistenciaUpsertWithWhereUniqueWithoutJovenInput | AsistenciaUpsertWithWhereUniqueWithoutJovenInput[]
    createMany?: AsistenciaCreateManyJovenInputEnvelope
    set?: AsistenciaWhereUniqueInput | AsistenciaWhereUniqueInput[]
    disconnect?: AsistenciaWhereUniqueInput | AsistenciaWhereUniqueInput[]
    delete?: AsistenciaWhereUniqueInput | AsistenciaWhereUniqueInput[]
    connect?: AsistenciaWhereUniqueInput | AsistenciaWhereUniqueInput[]
    update?: AsistenciaUpdateWithWhereUniqueWithoutJovenInput | AsistenciaUpdateWithWhereUniqueWithoutJovenInput[]
    updateMany?: AsistenciaUpdateManyWithWhereWithoutJovenInput | AsistenciaUpdateManyWithWhereWithoutJovenInput[]
    deleteMany?: AsistenciaScalarWhereInput | AsistenciaScalarWhereInput[]
  }

  export type JovenCreateNestedOneWithoutAsistenciasInput = {
    create?: XOR<JovenCreateWithoutAsistenciasInput, JovenUncheckedCreateWithoutAsistenciasInput>
    connectOrCreate?: JovenCreateOrConnectWithoutAsistenciasInput
    connect?: JovenWhereUniqueInput
  }

  export type JovenUpdateOneRequiredWithoutAsistenciasNestedInput = {
    create?: XOR<JovenCreateWithoutAsistenciasInput, JovenUncheckedCreateWithoutAsistenciasInput>
    connectOrCreate?: JovenCreateOrConnectWithoutAsistenciasInput
    upsert?: JovenUpsertWithoutAsistenciasInput
    connect?: JovenWhereUniqueInput
    update?: XOR<XOR<JovenUpdateToOneWithWhereWithoutAsistenciasInput, JovenUpdateWithoutAsistenciasInput>, JovenUncheckedUpdateWithoutAsistenciasInput>
  }

  export type PeticionCreateNestedManyWithoutPersonaInput = {
    create?: XOR<PeticionCreateWithoutPersonaInput, PeticionUncheckedCreateWithoutPersonaInput> | PeticionCreateWithoutPersonaInput[] | PeticionUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: PeticionCreateOrConnectWithoutPersonaInput | PeticionCreateOrConnectWithoutPersonaInput[]
    createMany?: PeticionCreateManyPersonaInputEnvelope
    connect?: PeticionWhereUniqueInput | PeticionWhereUniqueInput[]
  }

  export type PeticionUncheckedCreateNestedManyWithoutPersonaInput = {
    create?: XOR<PeticionCreateWithoutPersonaInput, PeticionUncheckedCreateWithoutPersonaInput> | PeticionCreateWithoutPersonaInput[] | PeticionUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: PeticionCreateOrConnectWithoutPersonaInput | PeticionCreateOrConnectWithoutPersonaInput[]
    createMany?: PeticionCreateManyPersonaInputEnvelope
    connect?: PeticionWhereUniqueInput | PeticionWhereUniqueInput[]
  }

  export type PeticionUpdateManyWithoutPersonaNestedInput = {
    create?: XOR<PeticionCreateWithoutPersonaInput, PeticionUncheckedCreateWithoutPersonaInput> | PeticionCreateWithoutPersonaInput[] | PeticionUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: PeticionCreateOrConnectWithoutPersonaInput | PeticionCreateOrConnectWithoutPersonaInput[]
    upsert?: PeticionUpsertWithWhereUniqueWithoutPersonaInput | PeticionUpsertWithWhereUniqueWithoutPersonaInput[]
    createMany?: PeticionCreateManyPersonaInputEnvelope
    set?: PeticionWhereUniqueInput | PeticionWhereUniqueInput[]
    disconnect?: PeticionWhereUniqueInput | PeticionWhereUniqueInput[]
    delete?: PeticionWhereUniqueInput | PeticionWhereUniqueInput[]
    connect?: PeticionWhereUniqueInput | PeticionWhereUniqueInput[]
    update?: PeticionUpdateWithWhereUniqueWithoutPersonaInput | PeticionUpdateWithWhereUniqueWithoutPersonaInput[]
    updateMany?: PeticionUpdateManyWithWhereWithoutPersonaInput | PeticionUpdateManyWithWhereWithoutPersonaInput[]
    deleteMany?: PeticionScalarWhereInput | PeticionScalarWhereInput[]
  }

  export type PeticionUncheckedUpdateManyWithoutPersonaNestedInput = {
    create?: XOR<PeticionCreateWithoutPersonaInput, PeticionUncheckedCreateWithoutPersonaInput> | PeticionCreateWithoutPersonaInput[] | PeticionUncheckedCreateWithoutPersonaInput[]
    connectOrCreate?: PeticionCreateOrConnectWithoutPersonaInput | PeticionCreateOrConnectWithoutPersonaInput[]
    upsert?: PeticionUpsertWithWhereUniqueWithoutPersonaInput | PeticionUpsertWithWhereUniqueWithoutPersonaInput[]
    createMany?: PeticionCreateManyPersonaInputEnvelope
    set?: PeticionWhereUniqueInput | PeticionWhereUniqueInput[]
    disconnect?: PeticionWhereUniqueInput | PeticionWhereUniqueInput[]
    delete?: PeticionWhereUniqueInput | PeticionWhereUniqueInput[]
    connect?: PeticionWhereUniqueInput | PeticionWhereUniqueInput[]
    update?: PeticionUpdateWithWhereUniqueWithoutPersonaInput | PeticionUpdateWithWhereUniqueWithoutPersonaInput[]
    updateMany?: PeticionUpdateManyWithWhereWithoutPersonaInput | PeticionUpdateManyWithWhereWithoutPersonaInput[]
    deleteMany?: PeticionScalarWhereInput | PeticionScalarWhereInput[]
  }

  export type PersonaCreateNestedOneWithoutPeticionesInput = {
    create?: XOR<PersonaCreateWithoutPeticionesInput, PersonaUncheckedCreateWithoutPeticionesInput>
    connectOrCreate?: PersonaCreateOrConnectWithoutPeticionesInput
    connect?: PersonaWhereUniqueInput
  }

  export type EnumEstadoPeticionFieldUpdateOperationsInput = {
    set?: $Enums.EstadoPeticion
  }

  export type PersonaUpdateOneWithoutPeticionesNestedInput = {
    create?: XOR<PersonaCreateWithoutPeticionesInput, PersonaUncheckedCreateWithoutPeticionesInput>
    connectOrCreate?: PersonaCreateOrConnectWithoutPeticionesInput
    upsert?: PersonaUpsertWithoutPeticionesInput
    disconnect?: PersonaWhereInput | boolean
    delete?: PersonaWhereInput | boolean
    connect?: PersonaWhereUniqueInput
    update?: XOR<XOR<PersonaUpdateToOneWithWhereWithoutPeticionesInput, PersonaUpdateWithoutPeticionesInput>, PersonaUncheckedUpdateWithoutPeticionesInput>
  }

  export type JovenCreateNestedManyWithoutGrupoInput = {
    create?: XOR<JovenCreateWithoutGrupoInput, JovenUncheckedCreateWithoutGrupoInput> | JovenCreateWithoutGrupoInput[] | JovenUncheckedCreateWithoutGrupoInput[]
    connectOrCreate?: JovenCreateOrConnectWithoutGrupoInput | JovenCreateOrConnectWithoutGrupoInput[]
    createMany?: JovenCreateManyGrupoInputEnvelope
    connect?: JovenWhereUniqueInput | JovenWhereUniqueInput[]
  }

  export type JovenUncheckedCreateNestedManyWithoutGrupoInput = {
    create?: XOR<JovenCreateWithoutGrupoInput, JovenUncheckedCreateWithoutGrupoInput> | JovenCreateWithoutGrupoInput[] | JovenUncheckedCreateWithoutGrupoInput[]
    connectOrCreate?: JovenCreateOrConnectWithoutGrupoInput | JovenCreateOrConnectWithoutGrupoInput[]
    createMany?: JovenCreateManyGrupoInputEnvelope
    connect?: JovenWhereUniqueInput | JovenWhereUniqueInput[]
  }

  export type JovenUpdateManyWithoutGrupoNestedInput = {
    create?: XOR<JovenCreateWithoutGrupoInput, JovenUncheckedCreateWithoutGrupoInput> | JovenCreateWithoutGrupoInput[] | JovenUncheckedCreateWithoutGrupoInput[]
    connectOrCreate?: JovenCreateOrConnectWithoutGrupoInput | JovenCreateOrConnectWithoutGrupoInput[]
    upsert?: JovenUpsertWithWhereUniqueWithoutGrupoInput | JovenUpsertWithWhereUniqueWithoutGrupoInput[]
    createMany?: JovenCreateManyGrupoInputEnvelope
    set?: JovenWhereUniqueInput | JovenWhereUniqueInput[]
    disconnect?: JovenWhereUniqueInput | JovenWhereUniqueInput[]
    delete?: JovenWhereUniqueInput | JovenWhereUniqueInput[]
    connect?: JovenWhereUniqueInput | JovenWhereUniqueInput[]
    update?: JovenUpdateWithWhereUniqueWithoutGrupoInput | JovenUpdateWithWhereUniqueWithoutGrupoInput[]
    updateMany?: JovenUpdateManyWithWhereWithoutGrupoInput | JovenUpdateManyWithWhereWithoutGrupoInput[]
    deleteMany?: JovenScalarWhereInput | JovenScalarWhereInput[]
  }

  export type JovenUncheckedUpdateManyWithoutGrupoNestedInput = {
    create?: XOR<JovenCreateWithoutGrupoInput, JovenUncheckedCreateWithoutGrupoInput> | JovenCreateWithoutGrupoInput[] | JovenUncheckedCreateWithoutGrupoInput[]
    connectOrCreate?: JovenCreateOrConnectWithoutGrupoInput | JovenCreateOrConnectWithoutGrupoInput[]
    upsert?: JovenUpsertWithWhereUniqueWithoutGrupoInput | JovenUpsertWithWhereUniqueWithoutGrupoInput[]
    createMany?: JovenCreateManyGrupoInputEnvelope
    set?: JovenWhereUniqueInput | JovenWhereUniqueInput[]
    disconnect?: JovenWhereUniqueInput | JovenWhereUniqueInput[]
    delete?: JovenWhereUniqueInput | JovenWhereUniqueInput[]
    connect?: JovenWhereUniqueInput | JovenWhereUniqueInput[]
    update?: JovenUpdateWithWhereUniqueWithoutGrupoInput | JovenUpdateWithWhereUniqueWithoutGrupoInput[]
    updateMany?: JovenUpdateManyWithWhereWithoutGrupoInput | JovenUpdateManyWithWhereWithoutGrupoInput[]
    deleteMany?: JovenScalarWhereInput | JovenScalarWhereInput[]
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumEstadoPeticionFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPeticion | EnumEstadoPeticionFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPeticion[] | ListEnumEstadoPeticionFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPeticion[] | ListEnumEstadoPeticionFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPeticionFilter<$PrismaModel> | $Enums.EstadoPeticion
  }

  export type NestedEnumEstadoPeticionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPeticion | EnumEstadoPeticionFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPeticion[] | ListEnumEstadoPeticionFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPeticion[] | ListEnumEstadoPeticionFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPeticionWithAggregatesFilter<$PrismaModel> | $Enums.EstadoPeticion
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoPeticionFilter<$PrismaModel>
    _max?: NestedEnumEstadoPeticionFilter<$PrismaModel>
  }

  export type ActivitiesCreateWithoutAreaInput = {
    title: string
    description?: string | null
    img?: string | null
    place: string
    hour_start: Date | string
    hour_end: Date | string
    urgent?: boolean
  }

  export type ActivitiesUncheckedCreateWithoutAreaInput = {
    id?: number
    title: string
    description?: string | null
    img?: string | null
    place: string
    hour_start: Date | string
    hour_end: Date | string
    urgent?: boolean
  }

  export type ActivitiesCreateOrConnectWithoutAreaInput = {
    where: ActivitiesWhereUniqueInput
    create: XOR<ActivitiesCreateWithoutAreaInput, ActivitiesUncheckedCreateWithoutAreaInput>
  }

  export type ActivitiesCreateManyAreaInputEnvelope = {
    data: ActivitiesCreateManyAreaInput | ActivitiesCreateManyAreaInput[]
    skipDuplicates?: boolean
  }

  export type ActivitiesUpsertWithWhereUniqueWithoutAreaInput = {
    where: ActivitiesWhereUniqueInput
    update: XOR<ActivitiesUpdateWithoutAreaInput, ActivitiesUncheckedUpdateWithoutAreaInput>
    create: XOR<ActivitiesCreateWithoutAreaInput, ActivitiesUncheckedCreateWithoutAreaInput>
  }

  export type ActivitiesUpdateWithWhereUniqueWithoutAreaInput = {
    where: ActivitiesWhereUniqueInput
    data: XOR<ActivitiesUpdateWithoutAreaInput, ActivitiesUncheckedUpdateWithoutAreaInput>
  }

  export type ActivitiesUpdateManyWithWhereWithoutAreaInput = {
    where: ActivitiesScalarWhereInput
    data: XOR<ActivitiesUpdateManyMutationInput, ActivitiesUncheckedUpdateManyWithoutAreaInput>
  }

  export type ActivitiesScalarWhereInput = {
    AND?: ActivitiesScalarWhereInput | ActivitiesScalarWhereInput[]
    OR?: ActivitiesScalarWhereInput[]
    NOT?: ActivitiesScalarWhereInput | ActivitiesScalarWhereInput[]
    id?: IntFilter<"Activities"> | number
    title?: StringFilter<"Activities"> | string
    description?: StringNullableFilter<"Activities"> | string | null
    img?: StringNullableFilter<"Activities"> | string | null
    place?: StringFilter<"Activities"> | string
    hour_start?: DateTimeFilter<"Activities"> | Date | string
    hour_end?: DateTimeFilter<"Activities"> | Date | string
    urgent?: BoolFilter<"Activities"> | boolean
    areaId?: IntNullableFilter<"Activities"> | number | null
  }

  export type AreaCreateWithoutActivitiesInput = {
    title: string
    description?: string | null
    img?: string | null
    value: string
    rol: string
  }

  export type AreaUncheckedCreateWithoutActivitiesInput = {
    id?: number
    title: string
    description?: string | null
    img?: string | null
    value: string
    rol: string
  }

  export type AreaCreateOrConnectWithoutActivitiesInput = {
    where: AreaWhereUniqueInput
    create: XOR<AreaCreateWithoutActivitiesInput, AreaUncheckedCreateWithoutActivitiesInput>
  }

  export type AreaUpsertWithoutActivitiesInput = {
    update: XOR<AreaUpdateWithoutActivitiesInput, AreaUncheckedUpdateWithoutActivitiesInput>
    create: XOR<AreaCreateWithoutActivitiesInput, AreaUncheckedCreateWithoutActivitiesInput>
    where?: AreaWhereInput
  }

  export type AreaUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: AreaWhereInput
    data: XOR<AreaUpdateWithoutActivitiesInput, AreaUncheckedUpdateWithoutActivitiesInput>
  }

  export type AreaUpdateWithoutActivitiesInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    img?: NullableStringFieldUpdateOperationsInput | string | null
    value?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
  }

  export type AreaUncheckedUpdateWithoutActivitiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    img?: NullableStringFieldUpdateOperationsInput | string | null
    value?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
  }

  export type GrupoCreateWithoutMiembrosInput = {
    nombre: string
    lider: string
    dia: string
    hora: string
    direccion: string
    tipo: string
    activo?: boolean
  }

  export type GrupoUncheckedCreateWithoutMiembrosInput = {
    id?: number
    nombre: string
    lider: string
    dia: string
    hora: string
    direccion: string
    tipo: string
    activo?: boolean
  }

  export type GrupoCreateOrConnectWithoutMiembrosInput = {
    where: GrupoWhereUniqueInput
    create: XOR<GrupoCreateWithoutMiembrosInput, GrupoUncheckedCreateWithoutMiembrosInput>
  }

  export type AsistenciaCreateWithoutJovenInput = {
    fecha?: Date | string
  }

  export type AsistenciaUncheckedCreateWithoutJovenInput = {
    id?: number
    fecha?: Date | string
  }

  export type AsistenciaCreateOrConnectWithoutJovenInput = {
    where: AsistenciaWhereUniqueInput
    create: XOR<AsistenciaCreateWithoutJovenInput, AsistenciaUncheckedCreateWithoutJovenInput>
  }

  export type AsistenciaCreateManyJovenInputEnvelope = {
    data: AsistenciaCreateManyJovenInput | AsistenciaCreateManyJovenInput[]
    skipDuplicates?: boolean
  }

  export type GrupoUpsertWithoutMiembrosInput = {
    update: XOR<GrupoUpdateWithoutMiembrosInput, GrupoUncheckedUpdateWithoutMiembrosInput>
    create: XOR<GrupoCreateWithoutMiembrosInput, GrupoUncheckedCreateWithoutMiembrosInput>
    where?: GrupoWhereInput
  }

  export type GrupoUpdateToOneWithWhereWithoutMiembrosInput = {
    where?: GrupoWhereInput
    data: XOR<GrupoUpdateWithoutMiembrosInput, GrupoUncheckedUpdateWithoutMiembrosInput>
  }

  export type GrupoUpdateWithoutMiembrosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    lider?: StringFieldUpdateOperationsInput | string
    dia?: StringFieldUpdateOperationsInput | string
    hora?: StringFieldUpdateOperationsInput | string
    direccion?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GrupoUncheckedUpdateWithoutMiembrosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    lider?: StringFieldUpdateOperationsInput | string
    dia?: StringFieldUpdateOperationsInput | string
    hora?: StringFieldUpdateOperationsInput | string
    direccion?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AsistenciaUpsertWithWhereUniqueWithoutJovenInput = {
    where: AsistenciaWhereUniqueInput
    update: XOR<AsistenciaUpdateWithoutJovenInput, AsistenciaUncheckedUpdateWithoutJovenInput>
    create: XOR<AsistenciaCreateWithoutJovenInput, AsistenciaUncheckedCreateWithoutJovenInput>
  }

  export type AsistenciaUpdateWithWhereUniqueWithoutJovenInput = {
    where: AsistenciaWhereUniqueInput
    data: XOR<AsistenciaUpdateWithoutJovenInput, AsistenciaUncheckedUpdateWithoutJovenInput>
  }

  export type AsistenciaUpdateManyWithWhereWithoutJovenInput = {
    where: AsistenciaScalarWhereInput
    data: XOR<AsistenciaUpdateManyMutationInput, AsistenciaUncheckedUpdateManyWithoutJovenInput>
  }

  export type AsistenciaScalarWhereInput = {
    AND?: AsistenciaScalarWhereInput | AsistenciaScalarWhereInput[]
    OR?: AsistenciaScalarWhereInput[]
    NOT?: AsistenciaScalarWhereInput | AsistenciaScalarWhereInput[]
    id?: IntFilter<"Asistencia"> | number
    fecha?: DateTimeFilter<"Asistencia"> | Date | string
    jovenId?: IntFilter<"Asistencia"> | number
  }

  export type JovenCreateWithoutAsistenciasInput = {
    nombres: string
    apellidos: string
    documento: string
    telefono?: string | null
    fechaNacimiento?: Date | string | null
    sede: string
    ultimaVisita?: Date | string | null
    activo?: boolean
    grupo?: GrupoCreateNestedOneWithoutMiembrosInput
  }

  export type JovenUncheckedCreateWithoutAsistenciasInput = {
    id?: number
    nombres: string
    apellidos: string
    documento: string
    telefono?: string | null
    fechaNacimiento?: Date | string | null
    sede: string
    grupoId?: number | null
    ultimaVisita?: Date | string | null
    activo?: boolean
  }

  export type JovenCreateOrConnectWithoutAsistenciasInput = {
    where: JovenWhereUniqueInput
    create: XOR<JovenCreateWithoutAsistenciasInput, JovenUncheckedCreateWithoutAsistenciasInput>
  }

  export type JovenUpsertWithoutAsistenciasInput = {
    update: XOR<JovenUpdateWithoutAsistenciasInput, JovenUncheckedUpdateWithoutAsistenciasInput>
    create: XOR<JovenCreateWithoutAsistenciasInput, JovenUncheckedCreateWithoutAsistenciasInput>
    where?: JovenWhereInput
  }

  export type JovenUpdateToOneWithWhereWithoutAsistenciasInput = {
    where?: JovenWhereInput
    data: XOR<JovenUpdateWithoutAsistenciasInput, JovenUncheckedUpdateWithoutAsistenciasInput>
  }

  export type JovenUpdateWithoutAsistenciasInput = {
    nombres?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sede?: StringFieldUpdateOperationsInput | string
    ultimaVisita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    grupo?: GrupoUpdateOneWithoutMiembrosNestedInput
  }

  export type JovenUncheckedUpdateWithoutAsistenciasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombres?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sede?: StringFieldUpdateOperationsInput | string
    grupoId?: NullableIntFieldUpdateOperationsInput | number | null
    ultimaVisita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PeticionCreateWithoutPersonaInput = {
    id?: string
    motivo: string
    estado?: $Enums.EstadoPeticion
    fecha?: Date | string
  }

  export type PeticionUncheckedCreateWithoutPersonaInput = {
    id?: string
    motivo: string
    estado?: $Enums.EstadoPeticion
    fecha?: Date | string
  }

  export type PeticionCreateOrConnectWithoutPersonaInput = {
    where: PeticionWhereUniqueInput
    create: XOR<PeticionCreateWithoutPersonaInput, PeticionUncheckedCreateWithoutPersonaInput>
  }

  export type PeticionCreateManyPersonaInputEnvelope = {
    data: PeticionCreateManyPersonaInput | PeticionCreateManyPersonaInput[]
    skipDuplicates?: boolean
  }

  export type PeticionUpsertWithWhereUniqueWithoutPersonaInput = {
    where: PeticionWhereUniqueInput
    update: XOR<PeticionUpdateWithoutPersonaInput, PeticionUncheckedUpdateWithoutPersonaInput>
    create: XOR<PeticionCreateWithoutPersonaInput, PeticionUncheckedCreateWithoutPersonaInput>
  }

  export type PeticionUpdateWithWhereUniqueWithoutPersonaInput = {
    where: PeticionWhereUniqueInput
    data: XOR<PeticionUpdateWithoutPersonaInput, PeticionUncheckedUpdateWithoutPersonaInput>
  }

  export type PeticionUpdateManyWithWhereWithoutPersonaInput = {
    where: PeticionScalarWhereInput
    data: XOR<PeticionUpdateManyMutationInput, PeticionUncheckedUpdateManyWithoutPersonaInput>
  }

  export type PeticionScalarWhereInput = {
    AND?: PeticionScalarWhereInput | PeticionScalarWhereInput[]
    OR?: PeticionScalarWhereInput[]
    NOT?: PeticionScalarWhereInput | PeticionScalarWhereInput[]
    id?: StringFilter<"Peticion"> | string
    motivo?: StringFilter<"Peticion"> | string
    estado?: EnumEstadoPeticionFilter<"Peticion"> | $Enums.EstadoPeticion
    fecha?: DateTimeFilter<"Peticion"> | Date | string
    personaId?: StringNullableFilter<"Peticion"> | string | null
  }

  export type PersonaCreateWithoutPeticionesInput = {
    id?: string
    nombre: string
    telefono?: string | null
    FechaNacimiento?: Date | string | null
    esNuevo?: boolean
    esJoven?: boolean
    fechaVisita?: Date | string
    estado?: string
    conteoVisitas?: number
    jovenId?: number | null
  }

  export type PersonaUncheckedCreateWithoutPeticionesInput = {
    id?: string
    nombre: string
    telefono?: string | null
    FechaNacimiento?: Date | string | null
    esNuevo?: boolean
    esJoven?: boolean
    fechaVisita?: Date | string
    estado?: string
    conteoVisitas?: number
    jovenId?: number | null
  }

  export type PersonaCreateOrConnectWithoutPeticionesInput = {
    where: PersonaWhereUniqueInput
    create: XOR<PersonaCreateWithoutPeticionesInput, PersonaUncheckedCreateWithoutPeticionesInput>
  }

  export type PersonaUpsertWithoutPeticionesInput = {
    update: XOR<PersonaUpdateWithoutPeticionesInput, PersonaUncheckedUpdateWithoutPeticionesInput>
    create: XOR<PersonaCreateWithoutPeticionesInput, PersonaUncheckedCreateWithoutPeticionesInput>
    where?: PersonaWhereInput
  }

  export type PersonaUpdateToOneWithWhereWithoutPeticionesInput = {
    where?: PersonaWhereInput
    data: XOR<PersonaUpdateWithoutPeticionesInput, PersonaUncheckedUpdateWithoutPeticionesInput>
  }

  export type PersonaUpdateWithoutPeticionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    FechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    esNuevo?: BoolFieldUpdateOperationsInput | boolean
    esJoven?: BoolFieldUpdateOperationsInput | boolean
    fechaVisita?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: StringFieldUpdateOperationsInput | string
    conteoVisitas?: IntFieldUpdateOperationsInput | number
    jovenId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PersonaUncheckedUpdateWithoutPeticionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    FechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    esNuevo?: BoolFieldUpdateOperationsInput | boolean
    esJoven?: BoolFieldUpdateOperationsInput | boolean
    fechaVisita?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: StringFieldUpdateOperationsInput | string
    conteoVisitas?: IntFieldUpdateOperationsInput | number
    jovenId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type JovenCreateWithoutGrupoInput = {
    nombres: string
    apellidos: string
    documento: string
    telefono?: string | null
    fechaNacimiento?: Date | string | null
    sede: string
    ultimaVisita?: Date | string | null
    activo?: boolean
    asistencias?: AsistenciaCreateNestedManyWithoutJovenInput
  }

  export type JovenUncheckedCreateWithoutGrupoInput = {
    id?: number
    nombres: string
    apellidos: string
    documento: string
    telefono?: string | null
    fechaNacimiento?: Date | string | null
    sede: string
    ultimaVisita?: Date | string | null
    activo?: boolean
    asistencias?: AsistenciaUncheckedCreateNestedManyWithoutJovenInput
  }

  export type JovenCreateOrConnectWithoutGrupoInput = {
    where: JovenWhereUniqueInput
    create: XOR<JovenCreateWithoutGrupoInput, JovenUncheckedCreateWithoutGrupoInput>
  }

  export type JovenCreateManyGrupoInputEnvelope = {
    data: JovenCreateManyGrupoInput | JovenCreateManyGrupoInput[]
    skipDuplicates?: boolean
  }

  export type JovenUpsertWithWhereUniqueWithoutGrupoInput = {
    where: JovenWhereUniqueInput
    update: XOR<JovenUpdateWithoutGrupoInput, JovenUncheckedUpdateWithoutGrupoInput>
    create: XOR<JovenCreateWithoutGrupoInput, JovenUncheckedCreateWithoutGrupoInput>
  }

  export type JovenUpdateWithWhereUniqueWithoutGrupoInput = {
    where: JovenWhereUniqueInput
    data: XOR<JovenUpdateWithoutGrupoInput, JovenUncheckedUpdateWithoutGrupoInput>
  }

  export type JovenUpdateManyWithWhereWithoutGrupoInput = {
    where: JovenScalarWhereInput
    data: XOR<JovenUpdateManyMutationInput, JovenUncheckedUpdateManyWithoutGrupoInput>
  }

  export type JovenScalarWhereInput = {
    AND?: JovenScalarWhereInput | JovenScalarWhereInput[]
    OR?: JovenScalarWhereInput[]
    NOT?: JovenScalarWhereInput | JovenScalarWhereInput[]
    id?: IntFilter<"Joven"> | number
    nombres?: StringFilter<"Joven"> | string
    apellidos?: StringFilter<"Joven"> | string
    documento?: StringFilter<"Joven"> | string
    telefono?: StringNullableFilter<"Joven"> | string | null
    fechaNacimiento?: DateTimeNullableFilter<"Joven"> | Date | string | null
    sede?: StringFilter<"Joven"> | string
    grupoId?: IntNullableFilter<"Joven"> | number | null
    ultimaVisita?: DateTimeNullableFilter<"Joven"> | Date | string | null
    activo?: BoolFilter<"Joven"> | boolean
  }

  export type ActivitiesCreateManyAreaInput = {
    id?: number
    title: string
    description?: string | null
    img?: string | null
    place: string
    hour_start: Date | string
    hour_end: Date | string
    urgent?: boolean
  }

  export type ActivitiesUpdateWithoutAreaInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    img?: NullableStringFieldUpdateOperationsInput | string | null
    place?: StringFieldUpdateOperationsInput | string
    hour_start?: DateTimeFieldUpdateOperationsInput | Date | string
    hour_end?: DateTimeFieldUpdateOperationsInput | Date | string
    urgent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivitiesUncheckedUpdateWithoutAreaInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    img?: NullableStringFieldUpdateOperationsInput | string | null
    place?: StringFieldUpdateOperationsInput | string
    hour_start?: DateTimeFieldUpdateOperationsInput | Date | string
    hour_end?: DateTimeFieldUpdateOperationsInput | Date | string
    urgent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivitiesUncheckedUpdateManyWithoutAreaInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    img?: NullableStringFieldUpdateOperationsInput | string | null
    place?: StringFieldUpdateOperationsInput | string
    hour_start?: DateTimeFieldUpdateOperationsInput | Date | string
    hour_end?: DateTimeFieldUpdateOperationsInput | Date | string
    urgent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AsistenciaCreateManyJovenInput = {
    id?: number
    fecha?: Date | string
  }

  export type AsistenciaUpdateWithoutJovenInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AsistenciaUncheckedUpdateWithoutJovenInput = {
    id?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AsistenciaUncheckedUpdateManyWithoutJovenInput = {
    id?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeticionCreateManyPersonaInput = {
    id?: string
    motivo: string
    estado?: $Enums.EstadoPeticion
    fecha?: Date | string
  }

  export type PeticionUpdateWithoutPersonaInput = {
    id?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPeticionFieldUpdateOperationsInput | $Enums.EstadoPeticion
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeticionUncheckedUpdateWithoutPersonaInput = {
    id?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPeticionFieldUpdateOperationsInput | $Enums.EstadoPeticion
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeticionUncheckedUpdateManyWithoutPersonaInput = {
    id?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPeticionFieldUpdateOperationsInput | $Enums.EstadoPeticion
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JovenCreateManyGrupoInput = {
    id?: number
    nombres: string
    apellidos: string
    documento: string
    telefono?: string | null
    fechaNacimiento?: Date | string | null
    sede: string
    ultimaVisita?: Date | string | null
    activo?: boolean
  }

  export type JovenUpdateWithoutGrupoInput = {
    nombres?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sede?: StringFieldUpdateOperationsInput | string
    ultimaVisita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    asistencias?: AsistenciaUpdateManyWithoutJovenNestedInput
  }

  export type JovenUncheckedUpdateWithoutGrupoInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombres?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sede?: StringFieldUpdateOperationsInput | string
    ultimaVisita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    asistencias?: AsistenciaUncheckedUpdateManyWithoutJovenNestedInput
  }

  export type JovenUncheckedUpdateManyWithoutGrupoInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombres?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    fechaNacimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sede?: StringFieldUpdateOperationsInput | string
    ultimaVisita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use AreaCountOutputTypeDefaultArgs instead
     */
    export type AreaCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AreaCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JovenCountOutputTypeDefaultArgs instead
     */
    export type JovenCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JovenCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PersonaCountOutputTypeDefaultArgs instead
     */
    export type PersonaCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PersonaCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GrupoCountOutputTypeDefaultArgs instead
     */
    export type GrupoCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GrupoCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AreaDefaultArgs instead
     */
    export type AreaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AreaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ActivitiesDefaultArgs instead
     */
    export type ActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ActivitiesDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PreachsDefaultArgs instead
     */
    export type PreachsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PreachsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LastActivitiesDefaultArgs instead
     */
    export type LastActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LastActivitiesDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JovenDefaultArgs instead
     */
    export type JovenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JovenDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AsistenciaDefaultArgs instead
     */
    export type AsistenciaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AsistenciaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AllowedUserDefaultArgs instead
     */
    export type AllowedUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AllowedUserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PersonaDefaultArgs instead
     */
    export type PersonaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PersonaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PeticionDefaultArgs instead
     */
    export type PeticionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PeticionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GrupoDefaultArgs instead
     */
    export type GrupoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GrupoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>

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