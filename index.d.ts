export type Nullable<A> = A | null;

export type Pair<A, B> = [A, B];

export type Thunk<A> = () => A;

export type Fn<A, B>                = (a: A) => B;
export type Fn2<A, B, C>            = (a: A) => (b: B) => C;
export type Fn3<A, B, C, D>         = (a: A) => (b: B) => (c: C) => D;
export type Fn4<A, B, C, D, E>      = (a: A) => (b: B) => (c: C) => (d: D) => E;
export type Fn5<A, B, C, D, E, F>   = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => F;
export type Fn2_<A, B, C>           = (a: A, b: B) => C;
export type Fn3_<A, B, C, D>        = (a: A, b: B, c: C) => D;
export type Fn4_<A, B, C, D, E>     = (a: A, b: B, c: C, d: D) => E;
export type Fn5_<A, B, C, D, E, F>  = (a: A, b: B, c: C, d: D, e: E) => F;

export type Predicate<A> = (a: A) => boolean;

export interface StrMap<A> { [k: string]: A; }

export interface Maybe<A> {
  constructor: {
    '@@type': 'sanctuary/Maybe';
  };
}

export interface Either<A, B> {
  constructor: {
    '@@type': 'sanctuary/Either';
  };
}


type ValidNumber            = number;
type FiniteNumber           = number;
type NonZeroFiniteNumber    = number;
type Integer                = number;
type NonNegativeInteger     = number;


export interface TypeRep {}

export interface Setoid<A> {}
export interface Ord<A> extends Setoid<A> {}
export interface Semigroupoid<A, B> {}
export interface Category<A> extends Semigroupoid<A, A> {}
export interface Semigroup<A> {}
export interface Monoid<A> extends Semigroup<A> {}
export interface Functor<A> {}
export interface Bifunctor<A, C> extends Functor<C> {}
export interface Profunctor<B, C> extends Functor<C> {}
export interface Apply<A> extends Functor<A> {}
export interface Applicative<A> extends Apply<A> {}
export interface Chain<A> extends Apply<A> {}
export interface ChainRec<A> extends Chain<A> {}
export interface Monad<A> extends Applicative<A>, Chain<A> {}
export interface Alt<A> extends Functor<A> {}
export interface Plus<A> extends Alt<A> {}
export interface Alternative<A> extends Applicative<A>, Plus<A> {}
export interface Foldable<A> {}
export interface Traversable<A> extends Functor<A>, Foldable<A> {}
export interface Extend<A> extends Functor<A> {}
export interface Comonad<A> extends Extend<A> {}
export interface Contravariant<A> {}


export const Maybe: TypeRep;
export const Nothing: Maybe<any>;
export function Just<A>(x: A): Maybe<A>;

export const Either: TypeRep;
export function Left<A>(x: A): Either<A, any>;
export function Right<A>(x: A): Either<any, A>;

//  TODO: Specify return type
export function create(opts: {checkTypes: boolean, env: Array<any>}): {};

export const env: Array<any>;

//  Classify

export function type(x: any): {
  namespace: Maybe<string>
  name: string
  version: NonNegativeInteger
};

export function is(typeRep: TypeRep): (x: any) => boolean;

//  Showable

export function toString(x: any): string;

//  Fantasy Land

export function equals<A>(x: Setoid<A>): (y: Setoid<A>) => boolean;

export function lt <A>(x: Ord<A>): (y: Ord<A>) => boolean;
export function lte<A>(x: Ord<A>): (y: Ord<A>) => boolean;
export function gt <A>(x: Ord<A>): (y: Ord<A>) => boolean;
export function gte<A>(x: Ord<A>): (y: Ord<A>) => boolean;

export function min<A>(x: Ord<A>): (y: Ord<A>) => A;
export function max<A>(x: Ord<A>): (y: Ord<A>) => A;

export function id<A>(p: TypeRep):    Fn<A, A>;
export function id<A>(p: TypeRep): Category<A>;

export function concat<A>(x: Semigroup<A>): (y: Semigroup<A>) => Semigroup<A>;
export function concat<A>(x:     Array<A>): (y:     Array<A>) =>     Array<A>;
export function concat<A>(x:    StrMap<A>): (y:    StrMap<A>) =>    StrMap<A>;
export function concat   (x:       string): (y:       string) =>       string;

export function empty<A>(p: TypeRep): Monoid<A>;

export function map<A, B>(p: Fn<A, B>): {
  <C>(q:   Fn<C, A>):   Fn<C, B>;
  (   q:   Array<A>):   Array<B>;
  (   q:  StrMap<A>):  StrMap<B>;
  (   q: Functor<A>): Functor<B>;
};

export function bimap<A, B>(p: Fn<A, B>): <C, D>(q: Fn<C, D>) => (r: Bifunctor<A, C>) => Bifunctor<B, D>;

export function promap<A, B>(p: Fn<A, B>): <C, D>(q: Fn<C, D>) => {
  (r:         Fn<B, C>):         Fn<A, D>;
  (r: Profunctor<B, C>): Profunctor<A, D>;
};

export function alt<A>(x: Alt<A>): (y: Alt<A>) => Alt<A>;

export function zero<A>(p: TypeRep): Plus<A>;

export function reduce<A, B>(p: Fn2<B, A, B>): (q: B) => <X>(r: Array<A> | StrMap<A> | Maybe<A> | Either<X, A> | Foldable<A>) => B;

export function traverse(typeRep: TypeRep): <A, B>(f: Fn<A, Applicative<B>>) => (traversable: Traversable<A>) => Applicative<Traversable<B>>;

export function sequence(typeRep: TypeRep): <A>(traversable: Traversable<Applicative<A>>) => Applicative<Traversable<A>>;

export function ap<A, B>(p: Apply<Fn<A, B>>): (q: Apply<A>) => Apply<B>;

export function lift2<A, B, C>(f: Fn2<A, B, C>): {
  <X>(x: Fn<X, A>): (y: Fn<X, B>) => Fn<X, C>;
  (   x: Apply<A>): (y: Apply<B>) => Apply<C>;
};

export function lift3<A, B, C, D>(f: Fn3<A, B, C, D>): {
  <X>(x: Fn<X, A>): (y: Fn<X, B>) => (z: Fn<X, C>) => Fn<X, D>;
  (   x: Apply<A>): (y: Apply<B>) => (z: Apply<C>) => Apply<D>;
};

export function apFirst <A>(x: Apply<A>): <B>(y: Apply<B>) => Apply<A>;
export function apSecond<A>(x: Apply<A>): <B>(y: Apply<B>) => Apply<B>;

export function of<A>(typeRep: TypeRep): (x: A) =>     Fn<any, A>;
export function of<A>(typeRep: TypeRep): (x: A) => Applicative<A>;

export function chain<A, B, X>(f: Fn2<A,   X,   B> ): (chain_: Fn<X, A>) => Fn<X, B>;
export function chain<A, B>   (f: Fn <A,  Chain<B>>): (chain_: Chain<A>) => Chain<B>;

export function join<A, B>(chain_:   Fn2<B, B, A> ): Fn<B, A>;
export function join<A>   (chain_: Array<Array<A>>): Array<A>;
export function join<A>   (chain_: Maybe<Maybe<A>>): Maybe<A>;
export function join<A>   (chain_: Chain<Chain<A>>): Chain<A>;

export function chainRec(typeRep: TypeRep): {
  <A, B, X>(f: Fn2<A,    X,    Either<A, B>> ): (x: A) =>    Fn<X, B>;
  <A, B>   (f: Fn <A, ChainRec<Either<A, B>>>): (x: A) => ChainRec<B>;
};

export function extend<A, B>(f: Fn<Extend<A>, B>): (extend_: Extend<A>) => Extend<B>;

export function extract<A>(comonad: Comonad<A>): A;

export function contramap<A, B>(f: Fn<B, A>): {
  <X>(contravariant:         Fn<A, X>):         Fn<B, X>;
  (   contravariant: Contravariant<A>): Contravariant<B>;
};

export function filter <A>(pred: Predicate<A>): {
  (m:    Array<A>):    Array<A>;
  (m: Foldable<A>): Foldable<A>;
};

export function filterM<A>(pred: Predicate<A>): {
  (m:    Array<A>):    Array<A>;
  (m: Foldable<A>): Foldable<A>;
};

export function takeWhile<A>(pred: Predicate<A>): (foldable: Foldable<A>) => Foldable<A>;
export function dropWhile<A>(pred: Predicate<A>): (foldable: Foldable<A>) => Foldable<A>;

//  Combinator

export function I<A>(x: A): A;

export function K<A>(x: A): <B>(y: B) => A;

export function T<A>(x: A): <B>(f: Fn<A, B>) => B;

//  Function

export function curry2<A, B, C>(f: Fn2_<A, B, C>): Fn2<A, B, C>;

export function curry3<A, B, C, D>(f: Fn3_<A, B, C, D>): Fn3<A, B, C, D>;

export function curry4<A, B, C, D, E>(f: Fn4_<A, B, C, D, E>): Fn4<A, B, C, D, E>;

export function curry5<A, B, C, D, E, F>(f: Fn5_<A, B, C, D, E, F>): Fn5<A, B, C, D, E, F>;

export function flip<A, B, C>(f: Fn2<A, B, C>): Fn2<B, A, C>;

export function flip_<A, B, C>(p: (q: A, r: B) => C): (s: B) => (t: A) => C;

//  Composition

export function compose<B, C>(f:           Fn<B, C>): <A>(g:           Fn<A, B>) =>           Fn<A, C>;
export function compose<B, C>(x: Semigroupoid<B, C>): <A>(y: Semigroupoid<A, B>) => Semigroupoid<A, C>;

export function pipe<A, B>            (fs: [Fn<A, B>]):                                         (x: A) => B;
export function pipe<A, B, C>         (fs: [Fn<A, B>, Fn<B, C>]):                               (x: A) => C;
export function pipe<A, B, C, D>      (fs: [Fn<A, B>, Fn<B, C>, Fn<C, D>]):                     (x: A) => D;
export function pipe<A, B, C, D, E>   (fs: [Fn<A, B>, Fn<B, C>, Fn<C, D>, Fn<D, E>]):           (x: A) => E;
export function pipe<A, B, C, D, E, F>(fs: [Fn<A, B>, Fn<B, C>, Fn<C, D>, Fn<D, E>, Fn<E, F>]): (x: A) => F;
export function pipe                  (fs: Array<Fn<any, any>>):                          <A, B>(x: A) => B;

export function on<A, B, C>(p: Fn2<B, B, C>): (q: Fn<A, B>) => (r: A) => Fn<A, C>;

export function on_<A, B, C>(p: (q: B, r: B) => C): (s: (t: A) => B) => (u: A) => (v: A) => C;

//  TODO: Maybe

export function isNothing<A>(p: Maybe<A>): boolean;

export function isJust<A>(p: Maybe<A>): boolean;

export function fromMaybe<A>(p: A): (q: Maybe<A>) => A;

export function fromMaybe_<A>(p: Thunk<A>): (q: Maybe<A>) => A;

export function maybeToNullable<A>(p: Maybe<A>): Nullable<A>;

export function toMaybe<A>(p: A | null | undefined): Maybe<A>;

export function maybe<B>(p: B): <A>(q: Fn<A, B>) => (r: Maybe<A>) => B;

export function maybe_<B>(p: Thunk<B>): <A>(q: Fn<A, B>) => (r: Maybe<A>) => B;

export function justs<A>(p: Array<Maybe<A>>): Array<A>;

export function mapMaybe<A, B>(p: Fn<A, Maybe<B>>): (q: Array<A>) => Array<A>;

export function encase<A, B>(p: Fn<A, B>): Fn<A, Maybe<B>>;

export function encase2<A, B, C>(p: Fn2<A, B, C>): Fn2<A, B, Maybe<C>>;

export function encase3<A, B, C, D>(p: Fn3<A, B, C, D>): Fn3<A, B, C, Maybe<D>>;

export function maybeToEither<A>(p: A): <B>(q: Maybe<B>) => Either<A, B>;

//  TODO: Either

export function isLeft<A, B>(p: Either<A, B>): boolean;

export function isRight<A, B>(p: Either<A, B>): boolean;

export function fromEither<B>(p: B): <A>(q: Either<A, B>) => B;

export function toEither<A>(p: A): <B>(q: B | null | undefined) => Either<A, B>;

export function either<A, C>(p: Fn<A, C>): <B>(q: Fn<B, C>) => (r: Either<A, B>) => C;

export function lefts<A, B>(p: Array<Either<A, B>>): Array<A>;

export function rights<A, B>(p: Array<Either<A, B>>): Array<B>;

export function tagBy<A>(p: Predicate<A>): (q: A) => Either<A, A>;

export function encaseEither<L>(p: Fn<Error, L>): <A, R>(q: Fn<A, R>) => Fn<A, Either<L, R>>;

export function encaseEither2<L>(p: Fn<Error, L>): <A, B, R>(q: Fn2<A, B, R>) => Fn2<A, B, Either<L, R>>;

export function encaseEither3<L>(p: Fn<Error, L>): <A, B, C, R>(q: Fn3<A, B, C, R>) => Fn3<A, B, C, Either<L, R>>;

export function eitherToMaybe<A, B>(p: Either<A, B>): Maybe<B>;

//  Logic

export function and(p: boolean): (q: boolean) => boolean;

export function or(p: boolean): (q: boolean) => boolean;

export function not(p: boolean): boolean;

export function complement<A>(p: Predicate<A>): Predicate<A>;

export function ifElse<A, B>(p: Predicate<A>): (q: Fn<A, B>) => (r: Fn<A, B>) => Fn<A, B>;

export function when<A>(p: Predicate<A>): (q: Fn<A, A>) => Fn<A, A>;

export function unless<A>(p: Predicate<A>): (q: Fn<A, A>) => Fn<A, A>;

export function allPass<A>(p: Array<Predicate<A>>): Predicate<A>;

export function anyPass<A>(p: Array<Predicate<A>>): Predicate<A>;

//  List

export interface ListToMaybeList {
  (xs:      string): Maybe<string>;
  <A>(xs: Array<A>): Maybe<Array<A>>;
}

export function slice(p: Integer): (q: Integer) => ListToMaybeList;

export function at(p: Integer): {
  (q:      string): Maybe<string>;
  <A>(q: Array<A>): Maybe<A>;
};

export function head(xs: string): Maybe<string>;
export function head<A>(xs: Array<A>): Maybe<A>;

export function last(xs: string): Maybe<string>;
export function last<A>(xs: Array<A>): Maybe<A>;

export function tail(xs: string): Maybe<string>;
export function tail<A>(xs: Array<A>): Maybe<Array<A>>;

export function init(xs: string): Maybe<string>;
export function init<A>(xs: Array<A>): Maybe<Array<A>>;

export function take(n: Integer): ListToMaybeList;

export function takeLast(n: Integer): ListToMaybeList;

export function drop(n: Integer): ListToMaybeList;

export function dropLast(n: Integer): ListToMaybeList;

//  Array
//  TODO: Fantasyland overloads, non-curried versions

export function append<A>(x: A): {
  (xs:       Array<A>):       Array<A>;
  (xs: Applicative<A>): Applicative<A>;
};

export function prepend<A>(x: A): {
  (xs:       Array<A>):       Array<A>;
  (xs: Applicative<A>): Applicative<A>;
};

export function joinWith(p: string): (q: Array<string>) => string;

export function elem<A>(p: A): (q: Foldable<A> | StrMap<A> | Array<A>) => boolean;

export function find<A>(p: Predicate<A>): (q: Array<A> | StrMap<A> | Foldable<A>) => Maybe<A>;

export function pluck(key: string): (xs: Functor<any>) => Functor<any>;

export function unfoldr<A, B>(f: Fn<B, Maybe<Pair<A, B>>>): (x: B) => Array<A>;

export function range(from: Integer): (to: Integer) => Array<Integer>;

export function groupBy<A>(f: Fn2<A, A, boolean>): (xs: Array<A>) => Array<Array<A>>;

export function reverse<A>(foldable:    Array<A>):    Array<A>;
export function reverse<A>(foldable: Foldable<A>): Foldable<A>;

export function sort<A>(foldable:    Array<A>):    Array<A>;
export function sort<A>(foldable: Foldable<A>): Foldable<A>;

export function sortBy<A, B>(f: Fn<A, Ord<B>>): {
  (foldable:    Array<A>):    Array<A>;
  (foldable: Foldable<A>): Foldable<A>;
};

//  Object

export function prop(p: string): <A, B>(q: A) => B;

export function props(p: Array<string>): <A, B>(q: A) => B;

export function get(p: Predicate<any>): (q: string) => (r: any) => Maybe<any>;

export function gets(p: Predicate<any>): (q: Array<string>) => (r: any) => Maybe<any>;

//  StrMap

export function keys<A>(p: StrMap<A>): Array<string>;

export function values<A>(p: StrMap<A>): Array<A>;

export function pairs<A>(p: StrMap<A>): Array<Pair<string, A>>;

//  Number

export function negate(n: ValidNumber): ValidNumber;

export function add(p: FiniteNumber): (q: FiniteNumber) => FiniteNumber;

export function sum(p: Foldable<FiniteNumber>): FiniteNumber;
export function sum(p: Array<FiniteNumber>): FiniteNumber;

export function sub(p: FiniteNumber): (q: FiniteNumber) => FiniteNumber;

export function mult(x: FiniteNumber): (q: FiniteNumber) => FiniteNumber;

export function product(p: Foldable<FiniteNumber>): FiniteNumber;
export function product(p: Array<FiniteNumber>): FiniteNumber;

export function div(p: NonZeroFiniteNumber): (q: FiniteNumber) => FiniteNumber;

export function pow(p: FiniteNumber): (q: FiniteNumber) => FiniteNumber;

export function mean(p: Foldable<FiniteNumber>): Maybe<FiniteNumber>;
export function mean(p: Array<FiniteNumber>): Maybe<FiniteNumber>;

//  Integer

export function even(n: Integer): boolean;

export function odd(n: Integer): boolean;

//  Parse

export function parseDate(s: string): Maybe<Date>;

export function parseFloat(s: string): Maybe<number>;

export function parseInt(p: Integer): (q: string) => Maybe<Integer>;

export function parseJson<A>(p: Predicate<any>): (q: string) => Maybe<A>;

//  RegExp

export function regex(p: string): (q: string) => RegExp;

export function regexEscape(s: string): string;

export function test(pattern: RegExp): Predicate<string>;

interface MatchObj {
  match: string;
  groups: Array<Maybe<string>>;
}

export function match(pattern: RegExp): (q: string) => Array<Maybe<MatchObj>>;

export function matchAll(pattern: RegExp): (q: string) => Array<MatchObj>;

//  String

export function toUpper(s: string): string;

export function toLower(s: string): string;

export function trim(s: string): string;

export function stripPrefix(prefix: string): (q: string) => Maybe<string>;

export function stripSuffix(suffix: string): (q: string) => Maybe<string>;

export function words(s: string): Array<string>;

export function unwords(xs: Array<string>): string;

export function lines(s: string): Array<string>;

export function unlines(xs: Array<string>): string;

export function splitOn(separator: string): (q: string) => Array<string>;

export function splitOnRegex(pattern: RegExp): (q: string) => Array<string>;
