/*    #######
   ####     ####
 ####   ###   ####
#####   ###########   sanctuary
########   ########   noun
###########   #####   1 [ mass noun ] refuge from unsafe JavaScript
 ####   ###   ####
   ####     ####
      #######    */

//. # Sanctuary
//.
//. [![npm](https://img.shields.io/npm/v/sanctuary.svg)](https://www.npmjs.com/package/sanctuary)
//. [![CircleCI](https://img.shields.io/circleci/project/github/sanctuary-js/sanctuary/master.svg)](https://circleci.com/gh/sanctuary-js/sanctuary/tree/master)
//. [![Gitter](https://img.shields.io/gitter/room/badges/shields.svg)](https://gitter.im/sanctuary-js/sanctuary)
//.
//. Sanctuary is a JavaScript functional programming library inspired by
//. [Haskell][] and [PureScript][]. It's stricter than [Ramda][], and
//. provides a similar suite of functions.
//.
//. Sanctuary promotes programs composed of simple, pure functions. Such
//. programs are easier to comprehend, test, and maintain &ndash; they are
//. also a pleasure to write.
//.
//. Sanctuary provides two data types, [Maybe][] and [Either][], both of
//. which are compatible with [Fantasy Land][]. Thanks to these data types
//. even Sanctuary functions that may fail, such as [`head`](#head), are
//. composable.
//.
//. Sanctuary makes it possible to write safe code without null checks.
//. In JavaScript it's trivial to introduce a possible run-time type error:
//.
//.     words[0].toUpperCase()
//.
//. If `words` is `[]` we'll get a familiar error at run-time:
//.
//.     TypeError: Cannot read property 'toUpperCase' of undefined
//.
//. Sanctuary gives us a fighting chance of avoiding such errors. We might
//. write:
//.
//.     S.map (S.toUpper) (S.head (words))
//.
//. Sanctuary is designed to work in Node.js and in ES5-compatible browsers.
//.
//. ## Folktale
//.
//. [Folktale][], like Sanctuary, is a standard library for functional
//. programming in JavaScript. It is well designed and well documented.
//. Whereas Sanctuary treats JavaScript as a member of the ML language
//. family, Folktale embraces JavaScript's object-oriented programming
//. model. Programming with Folktale resembles programming with Scala.
//.
//. ## Ramda
//.
//. [Ramda][] provides several functions that return problematic values
//. such as `undefined`, `Infinity`, or `NaN` when applied to unsuitable
//. inputs. These are known as [partial functions][]. Partial functions
//. necessitate the use of guards or null checks. In order to safely use
//. `R.head`, for example, one must ensure that the array is non-empty:
//.
//.     if (R.isEmpty (xs)) {
//.       // ...
//.     } else {
//.       return f (R.head (xs));
//.     }
//.
//. Using the Maybe type renders such guards (and null checks) unnecessary.
//. Changing functions such as `R.head` to return Maybe values was proposed
//. in [ramda/ramda#683][], but was considered too much of a stretch for
//. JavaScript programmers. Sanctuary was released the following month,
//. in January 2015, as a companion library to Ramda.
//.
//. In addition to broadening in scope in the years since its release,
//. Sanctuary's philosophy has diverged from Ramda's in several respects.
//.
//. ### Totality
//.
//. Every Sanctuary function is defined for every value that is a member of
//. the function's input type. Such functions are known as [total functions][].
//. Ramda, on the other hand, contains a number of [partial functions][].
//.
//. ### Information preservation
//.
//. Certain Sanctuary functions preserve more information than their Ramda
//. counterparts. Examples:
//.
//.     |> R.tail ([])                      |> S.tail ([])
//.     []                                  Nothing
//.
//.     |> R.tail (['foo'])                 |> S.tail (['foo'])
//.     []                                  Just ([])
//.
//.     |> R.replace (/^x/) ('') ('abc')    |> S.stripPrefix ('x') ('abc')
//.     'abc'                               Nothing
//.
//.     |> R.replace (/^x/) ('') ('xabc')   |> S.stripPrefix ('x') ('xabc')
//.     'abc'                               Just ('abc')
//.
//. ### Invariants
//.
//. Sanctuary performs rigorous [type checking][] of inputs and outputs, and
//. throws a descriptive error if a type error is encountered. This allows bugs
//. to be caught and fixed early in the development cycle.
//.
//. Ramda operates on the [garbage in, garbage out][GIGO] principle. Functions
//. are documented to take arguments of particular types, but these invariants
//. are not enforced. The problem with this approach in a language as
//. permissive as JavaScript is that there's no guarantee that garbage input
//. will produce garbage output ([ramda/ramda#1413][]). Ramda performs ad hoc
//. type checking in some such cases ([ramda/ramda#1419][]).
//.
//. Sanctuary can be configured to operate in garbage in, garbage out mode.
//. Ramda cannot be configured to enforce its invariants.
//.
//. ### Currying
//.
//. Sanctuary functions are curried. There is, for example, exactly one way to
//. apply `S.reduce` to `S.add`, `0`, and `xs`:
//.
//.   - `S.reduce (S.add) (0) (xs)`
//.
//. Ramda functions are also curried, but in a complex manner. There are four
//. ways to apply `R.reduce` to `R.add`, `0`, and `xs`:
//.
//.   - `R.reduce (R.add) (0) (xs)`
//.   - `R.reduce (R.add) (0, xs)`
//.   - `R.reduce (R.add, 0) (xs)`
//.   - `R.reduce (R.add, 0, xs)`
//.
//. Ramda supports all these forms because curried functions enable partial
//. application, one of the library's tenets, but `f(x)(y)(z)` is considered
//. too unfamiliar and too unattractive to appeal to JavaScript programmers.
//.
//. Sanctuary's developers prefer a simple, unfamiliar construct to a complex,
//. familiar one. Familiarity can be acquired; complexity is intrinsic.
//.
//. The lack of breathing room in `f(x)(y)(z)` impairs readability. The simple
//. solution to this problem, proposed in [#438][], is to include a space when
//. applying a function: `f (x) (y) (z)`.
//.
//. Ramda also provides a special placeholder value, [`R.__`][], that removes
//. the restriction that a function must be applied to its arguments in order.
//. The following expressions are equivalent:
//.
//.   - `R.reduce (R.__, 0, xs) (R.add)`
//.   - `R.reduce (R.add, R.__, xs) (0)`
//.   - `R.reduce (R.__, 0) (R.add) (xs)`
//.   - `R.reduce (R.__, 0) (R.add, xs)`
//.   - `R.reduce (R.__, R.__, xs) (R.add) (0)`
//.   - `R.reduce (R.__, R.__, xs) (R.add, 0)`
//.
//. ### Variadic functions
//.
//. Ramda provides several functions that take any number of arguments. These
//. are known as [variadic functions][]. Additionally, Ramda provides several
//. functions that take variadic functions as arguments. Although natural in
//. a dynamically typed language, variadic functions are at odds with the type
//. notation Ramda and Sanctuary both use, leading to some indecipherable type
//. signatures such as this one:
//.
//.     R.lift :: (*... -> *...) -> ([*]... -> [*])
//.
//. Sanctuary has no variadic functions, nor any functions that take variadic
//. functions as arguments. Sanctuary provides two "lift" functions, each with
//. a helpful type signature:
//.
//.     S.lift2 :: Apply f => (a -> b -> c) -> f a -> f b -> f c
//.     S.lift3 :: Apply f => (a -> b -> c -> d) -> f a -> f b -> f c -> f d
//.
//. ### Implicit context
//.
//. Ramda provides [`R.bind`][] and [`R.invoker`][] for working with methods.
//. Additionally, many Ramda functions use `Function#call` or `Function#apply`
//. to preserve context. Sanctuary makes no allowances for `this`.
//.
//. ### Transducers
//.
//. Several Ramda functions act as transducers. Sanctuary provides no support
//. for transducers.
//.
//. ### Modularity
//.
//. Whereas Ramda has no dependencies, Sanctuary has a modular design:
//. [sanctuary-def][] provides type checking, [sanctuary-type-classes][]
//. provides Fantasy Land functions and type classes, [sanctuary-show][]
//. provides string representations, and algebraic data types are provided
//. by [sanctuary-either][], [sanctuary-maybe][], and [sanctuary-pair][].
//. Not only does this approach reduce the complexity of Sanctuary itself,
//. but it allows these components to be reused in other contexts.
//.
//. ## Types
//.
//. Sanctuary uses Haskell-like type signatures to describe the types of
//. values, including functions. `'foo'`, for example, is a member of `String`;
//. `[1, 2, 3]` is a member of `Array Number`. The double colon (`::`) is used
//. to mean "is a member of", so one could write:
//.
//.     'foo' :: String
//.     [1, 2, 3] :: Array Number
//.
//. An identifier may appear to the left of the double colon:
//.
//.     Math.PI :: Number
//.
//. The arrow (`->`) is used to express a function's type:
//.
//.     Math.abs :: Number -> Number
//.
//. That states that `Math.abs` is a unary function that takes an argument
//. of type `Number` and returns a value of type `Number`.
//.
//. Some functions are parametrically polymorphic: their types are not fixed.
//. Type variables are used in the representations of such functions:
//.
//.     S.I :: a -> a
//.
//. `a` is a type variable. Type variables are not capitalized, so they
//. are differentiable from type identifiers (which are always capitalized).
//. By convention type variables have single-character names. The signature
//. above states that `S.I` takes a value of any type and returns a value of
//. the same type. Some signatures feature multiple type variables:
//.
//.     S.K :: a -> b -> a
//.
//. It must be possible to replace all occurrences of `a` with a concrete type.
//. The same applies for each other type variable. For the function above, the
//. types with which `a` and `b` are replaced may be different, but needn't be.
//.
//. Since all Sanctuary functions are curried (they accept their arguments
//. one at a time), a binary function is represented as a unary function that
//. returns a unary function: `* -> * -> *`. This aligns neatly with Haskell,
//. which uses curried functions exclusively. In JavaScript, though, we may
//. wish to represent the types of functions with arities less than or greater
//. than one. The general form is `(<input-types>) -> <output-type>`, where
//. `<input-types>` comprises zero or more comma–space (<code>, </code>)
//. -separated type representations:
//.
//.   - `() -> String`
//.   - `(a, b) -> a`
//.   - `(a, b, c) -> d`
//.
//. `Number -> Number` can thus be seen as shorthand for `(Number) -> Number`.
//.
//. Sanctuary embraces types. JavaScript doesn't support algebraic data types,
//. but these can be simulated by providing a group of data constructors that
//. return values with the same set of methods. A value of the Either type, for
//. example, is created via the Left constructor or the Right constructor.
//.
//. It's necessary to extend Haskell's notation to describe implicit arguments
//. to the *methods* provided by Sanctuary's types. In `x.map(y)`, for example,
//. the `map` method takes an implicit argument `x` in addition to the explicit
//. argument `y`. The type of the value upon which a method is invoked appears
//. at the beginning of the signature, separated from the arguments and return
//. value by a squiggly arrow (`~>`). The type of the `fantasy-land/map` method
//. of the Maybe type is written `Maybe a ~> (a -> b) -> Maybe b`. One could
//. read this as:
//.
//. _When the `fantasy-land/map` method is invoked on a value of type `Maybe a`
//. (for any type `a`) with an argument of type `a -> b` (for any type `b`),
//. it returns a value of type `Maybe b`._
//.
//. The squiggly arrow is also used when representing non-function properties.
//. `Maybe a ~> Boolean`, for example, represents a Boolean property of a value
//. of type `Maybe a`.
//.
//. Sanctuary supports type classes: constraints on type variables. Whereas
//. `a -> a` implicitly supports every type, `Functor f => (a -> b) -> f a ->
//. f b` requires that `f` be a type that satisfies the requirements of the
//. Functor type class. Type-class constraints appear at the beginning of a
//. type signature, separated from the rest of the signature by a fat arrow
//. (`=>`).
//.
//. ## Type checking
//.
//. Sanctuary functions are defined via [sanctuary-def][] to provide run-time
//. type checking. This is tremendously useful during development: type errors
//. are reported immediately, avoiding circuitous stack traces (at best) and
//. silent failures due to type coercion (at worst). For example:
//.
//. ```javascript
//. S.add (2) (true);
//. // ! TypeError: Invalid value
//. //
//. //   add :: FiniteNumber -> FiniteNumber -> FiniteNumber
//. //                          ^^^^^^^^^^^^
//. //                               1
//. //
//. //   1)  true :: Boolean
//. //
//. //   The value at position 1 is not a member of ‘FiniteNumber’.
//. //
//. //   See v:sanctuary-js/sanctuary-def#FiniteNumber for information about the FiniteNumber type.
//. ```
//.
//. Compare this to the behaviour of Ramda's unchecked equivalent:
//.
//. ```javascript
//. R.add (2) (true);
//. // => 3
//. ```
//.
//. There is a performance cost to run-time type checking. Type checking is
//. disabled by default if `process.env.NODE_ENV` is `'production'`. If this
//. rule is unsuitable for a given program, one may use [`create`](#create)
//. to create a Sanctuary module based on a different rule. For example:
//.
//. ```javascript
//. const S = sanctuary.create ({
//.   checkTypes: localStorage.getItem ('SANCTUARY_CHECK_TYPES') === 'true',
//.   env: sanctuary.env,
//. });
//. ```
//.
//. Occasionally one may wish to perform an operation that is not type safe,
//. such as mapping over an object with heterogeneous values. This is possible
//. via selective use of [`unchecked`](#unchecked) functions.
//.
//. ## Installation
//.
//. `npm install sanctuary` will install Sanctuary for use in Node.js.
//.
//. To add Sanctuary to a website, add the following `<script>` element,
//. replacing `X.Y.Z` with a version number greater than or equal to `2.0.2`:
//.
//. ```html
//. <script src="https://cdn.jsdelivr.net/gh/sanctuary-js/sanctuary@X.Y.Z/dist/bundle.js"></script>
//. ```
//.
//. Optionally, define aliases for various modules:
//.
//. ```javascript
//. const S = window.sanctuary;
//. const $ = window.sanctuaryDef;
//. // ...
//. ```
//.
//. ## API

(f => {

  'use strict';

  /* istanbul ignore else */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f (require ('sanctuary-def'),
                        require ('sanctuary-either'),
                        require ('sanctuary-maybe'),
                        require ('sanctuary-pair'),
                        require ('sanctuary-show'),
                        require ('sanctuary-type-classes'),
                        require ('sanctuary-type-identifiers'));
  } else if (typeof define === 'function' && define.amd != null) {
    define (['sanctuary-def',
             'sanctuary-either',
             'sanctuary-maybe',
             'sanctuary-pair',
             'sanctuary-show',
             'sanctuary-type-classes',
             'sanctuary-type-identifiers'],
            f);
  } else {
    self.sanctuary = f (self.sanctuaryDef,
                        self.sanctuaryEither,
                        self.sanctuaryMaybe,
                        self.sanctuaryPair,
                        self.sanctuaryShow,
                        self.sanctuaryTypeClasses,
                        self.sanctuaryTypeIdentifiers);
  }

}) (($, Either, Maybe, Pair, show, Z, type) => {

  'use strict';

  /* istanbul ignore if */
  if (typeof __doctest !== 'undefined') {
    const {create, env} = __doctest.require ('.');
    const List = __doctest.require ('./test/internal/List');
    // eslint-disable-next-line no-var, no-unused-vars
    var Descending = __doctest.require ('sanctuary-descending');
    // eslint-disable-next-line no-var, no-unused-vars
    var {Nil, Cons} = List;
    // eslint-disable-next-line no-var
    var Sum = __doctest.require ('./test/internal/Sum');
    // eslint-disable-next-line no-var, no-unused-vars
    var S = Object.assign (
      create ({
        checkTypes: true,
        env: env.concat ([List.Type ($.Unknown), Sum.Type]),
      }),
      {env}  // see S.env doctest
    );
  }

  const {Left, Right} = Either;
  const {Nothing, Just} = Maybe;

  const {
    Any,
    Fn,
    Integer,
    NonNegativeInteger,
    StrMap,
    Type,
    NullaryType,
    UnaryType,
    RecordType,
    TypeVariable,
    UnaryTypeVariable,
    BinaryTypeVariable,
    Thunk,
    Predicate,
  } = $;

  const {
    Setoid,
    Ord,
    Semigroupoid,
    Category,
    Semigroup,
    Monoid,
    Group,
    Filterable,
    Functor,
    Bifunctor,
    Profunctor,
    Apply,
    Applicative,
    Chain,
    ChainRec,
    Alt,
    Plus,
    Foldable,
    Traversable,
    Extend,
    Comonad,
    Contravariant,
  } = Z;

  const curry2 = f => a => b => f (a, b);
  const curry3 = f => a => b => c => f (a, b, c);
  const curry4 = f => a => b => c => d => f (a, b, c, d);

  //  B :: (b -> c) -> (a -> b) -> a -> c
  const B = f => g => x => f (g (x));

  //  C :: (a -> b -> c) -> b -> a -> c
  const C = f => y => x => f (x) (y);

  //  get_ :: String -> a -> Maybe b
  const get_ = name => x => {
    const obj = toObject (x);
    return name in obj ? Just (obj[name]) : Nothing;
  };

  //  toObject :: a -> Object
  const toObject = x => x == null ? Object.create (null) : Object (x);

  //  Throwing :: Type -> Type -> Type -> Type
  //
  //  `Throwing e a b` is the type of functions from `a` to `b` that may
  //  throw values of type `e`.
  const Throwing = E => A => B =>
    Object.assign (Fn (A) (B), {
      format: (outer, inner) => (
        outer ('Throwing ' + show (E)) +
        outer (' ') + inner ('$1') (show (A)) +
        outer (' ') + inner ('$2') (show (B))
      ),
    });

  //  TypeRep :: Type -> Type
  const TypeRep = UnaryType
    ('TypeRep')
    ('https://github.com/fantasyland/fantasy-land#type-representatives')
    ([])
    (_ => true)
    (_ => []);

  const _ = {};

  //. ### Configure

  //# create :: { checkTypes :: Boolean, env :: Array Type } -> Module
  //.
  //. Takes an options record and returns a Sanctuary module. `checkTypes`
  //. specifies whether to enable type checking. The module's polymorphic
  //. functions (such as [`I`](#I)) require each value associated with a
  //. type variable to be a member of at least one type in the environment.
  //.
  //. A well-typed application of a Sanctuary function will produce the same
  //. result regardless of whether type checking is enabled. If type checking
  //. is enabled, a badly typed application will produce an exception with a
  //. descriptive error message.
  //.
  //. The following snippet demonstrates defining a custom type and using
  //. `create` to produce a Sanctuary module that is aware of that type:
  //.
  //. ```javascript
  //. const {create, env} = require ('sanctuary');
  //. const $ = require ('sanctuary-def');
  //. const type = require ('sanctuary-type-identifiers');
  //.
  //. //    Identity :: a -> Identity a
  //. const Identity = x => {
  //.   const identity = Object.create (Identity$prototype);
  //.   identity.value = x;
  //.   return identity;
  //. };
  //.
  //. //    identityTypeIdent :: String
  //. const identityTypeIdent = 'my-package/Identity@1';
  //.
  //. const Identity$prototype = {
  //.   '@@type': identityTypeIdent,
  //.   '@@show': function() { return `Identity (${S.show (this.value)})`; },
  //.   'fantasy-land/map': function(f) { return Identity (f (this.value)); },
  //. };
  //.
  //. //    IdentityType :: Type -> Type
  //. const IdentityType = $.UnaryType
  //.   ('Identity')
  //.   ('http://example.com/my-package#Identity')
  //.   ([])
  //.   (x => type (x) === identityTypeIdent)
  //.   (identity => [identity.value]);
  //.
  //. const S = create ({
  //.   checkTypes: process.env.NODE_ENV !== 'production',
  //.   env: env.concat ([IdentityType ($.Unknown)]),
  //. });
  //.
  //. S.map (S.sub (1)) (Identity (43));
  //. // => Identity (42)
  //. ```
  //.
  //. See also [`env`](#env).
  const create = ({checkTypes, env}) => {
    const def = $.create ({checkTypes, env});
    const is = def ('is') ({}) ([Type, Any, $.Boolean]) ($.test (env));
    const S = {env, is, Maybe, Nothing, Either};
    (Object.keys (_)).forEach (name => {
      const {consts, types, impl} = _[name];
      S[name] = def (name) (consts) (types) (impl);
    });
    S.unchecked = checkTypes ? create ({checkTypes: false, env}) : S;
    return S;
  };
  _.create = {
    consts: {},
    types: (Options => [Options, $.Object])
           (RecordType ({checkTypes: $.Boolean, env: $.Array (Any)})),
    impl: create,
  };

  //# env :: Array Type
  //.
  //. The Sanctuary module's environment (`(S.create ({checkTypes, env})).env`
  //. is a reference to `env`). Useful in conjunction with [`create`](#create).
  //.
  //. ```javascript
  //. > S.env
  //. [ $.AnyFunction,
  //. . $.Arguments,
  //. . $.Array ($.Unknown),
  //. . $.Array2 ($.Unknown) ($.Unknown),
  //. . $.Boolean,
  //. . $.Buffer,
  //. . $.Date,
  //. . $.Descending ($.Unknown),
  //. . $.Either ($.Unknown) ($.Unknown),
  //. . $.Error,
  //. . $.Fn ($.Unknown) ($.Unknown),
  //. . $.HtmlElement,
  //. . $.Identity ($.Unknown),
  //. . $.JsMap ($.Unknown) ($.Unknown),
  //. . $.JsSet ($.Unknown),
  //. . $.Maybe ($.Unknown),
  //. . $.Module,
  //. . $.Null,
  //. . $.Number,
  //. . $.Object,
  //. . $.Pair ($.Unknown) ($.Unknown),
  //. . $.RegExp,
  //. . $.StrMap ($.Unknown),
  //. . $.String,
  //. . $.Symbol,
  //. . $.Type,
  //. . $.TypeClass,
  //. . $.Undefined ]
  //. ```

  //# unchecked :: Module
  //.
  //. A complete Sanctuary module that performs no type checking. This is
  //. useful as it permits operations that Sanctuary's type checking would
  //. disallow, such as mapping over an object with heterogeneous values.
  //.
  //. See also [`create`](#create).
  //.
  //. ```javascript
  //. > S.unchecked.map (S.show) ({x: 'foo', y: true, z: 42})
  //. {x: '"foo"', y: 'true', z: '42'}
  //. ```
  //.
  //. Opting out of type checking may cause type errors to go unnoticed.
  //.
  //. ```javascript
  //. > S.unchecked.add (2) ('2')
  //. '22'
  //. ```

  //. ### Classify

  //# type :: Any -> { namespace :: Maybe String, name :: String, version :: NonNegativeInteger }
  //.
  //. Returns the result of parsing the [type identifier][] of the given value.
  //.
  //. ```javascript
  //. > S.type (S.Just (42))
  //. {namespace: Just ('sanctuary-maybe'), name: 'Maybe', version: 1}
  //.
  //. > S.type ([1, 2, 3])
  //. {namespace: Nothing, name: 'Array', version: 0}
  //. ```
  const type_ = x => {
    const r = type.parse (type (x));
    r.namespace = r.namespace == null ? Nothing : Just (r.namespace);
    return r;
  };
  _.type = {
    consts: {},
    types: [
      Any,
      RecordType ({namespace: $.Maybe ($.String),
                   name: $.String,
                   version: NonNegativeInteger}),
    ],
    impl: type_,
  };

  //# is :: Type -> Any -> Boolean
  //.
  //. Returns `true` [iff][] the given value is a member of the specified type.
  //. See [`$.test`][] for details.
  //.
  //. ```javascript
  //. > S.is ($.Array ($.Integer)) ([1, 2, 3])
  //. true
  //.
  //. > S.is ($.Array ($.Integer)) ([1, 2, 3.14])
  //. false
  //. ```

  //. ### Showable

  //# show :: Any -> String
  //.
  //. Alias of [`show`][].
  //.
  //. ```javascript
  //. > S.show (-0)
  //. '-0'
  //.
  //. > S.show (['foo', 'bar', 'baz'])
  //. '["foo", "bar", "baz"]'
  //.
  //. > S.show ({x: 1, y: 2, z: 3})
  //. '{"x": 1, "y": 2, "z": 3}'
  //.
  //. > S.show (S.Left (S.Right (S.Just (S.Nothing))))
  //. 'Left (Right (Just (Nothing)))'
  //. ```
  _.show = {
    consts: {},
    types: [Any, $.String],
    impl: show,
  };

  //. ### Fantasy Land
  //.
  //. Sanctuary is compatible with the [Fantasy Land][] specification.

  //# equals :: Setoid a => a -> a -> Boolean
  //.
  //. Curried version of [`Z.equals`][] that requires two arguments of the
  //. same type.
  //.
  //. To compare values of different types first use [`create`](#create) to
  //. create a Sanctuary module with type checking disabled, then use that
  //. module's `equals` function.
  //.
  //. ```javascript
  //. > S.equals (0) (-0)
  //. true
  //.
  //. > S.equals (NaN) (NaN)
  //. true
  //.
  //. > S.equals (S.Just ([1, 2, 3])) (S.Just ([1, 2, 3]))
  //. true
  //.
  //. > S.equals (S.Just ([1, 2, 3])) (S.Just ([1, 2, 4]))
  //. false
  //. ```
  _.equals = {
    consts: {a: [Setoid]},
    types: (a => [a, a, $.Boolean])
           (TypeVariable ('a')),
    impl: curry2 (Z.equals),
  };

  //# lt :: Ord a => a -> a -> Boolean
  //.
  //. Returns `true` [iff][] the *second* argument is less than the first
  //. according to [`Z.lt`][].
  //.
  //. ```javascript
  //. > S.filter (S.lt (3)) ([1, 2, 3, 4, 5])
  //. [1, 2]
  //. ```
  _.lt = {
    consts: {a: [Ord]},
    types: (a => [a, a, $.Boolean])
           (TypeVariable ('a')),
    impl: C (curry2 (Z.lt)),
  };

  //# lte :: Ord a => a -> a -> Boolean
  //.
  //. Returns `true` [iff][] the *second* argument is less than or equal to
  //. the first according to [`Z.lte`][].
  //.
  //. ```javascript
  //. > S.filter (S.lte (3)) ([1, 2, 3, 4, 5])
  //. [1, 2, 3]
  //. ```
  _.lte = {
    consts: {a: [Ord]},
    types: (a => [a, a, $.Boolean])
           (TypeVariable ('a')),
    impl: C (curry2 (Z.lte)),
  };

  //# gt :: Ord a => a -> a -> Boolean
  //.
  //. Returns `true` [iff][] the *second* argument is greater than the first
  //. according to [`Z.gt`][].
  //.
  //. ```javascript
  //. > S.filter (S.gt (3)) ([1, 2, 3, 4, 5])
  //. [4, 5]
  //. ```
  _.gt = {
    consts: {a: [Ord]},
    types: (a => [a, a, $.Boolean])
           (TypeVariable ('a')),
    impl: C (curry2 (Z.gt)),
  };

  //# gte :: Ord a => a -> a -> Boolean
  //.
  //. Returns `true` [iff][] the *second* argument is greater than or equal
  //. to the first according to [`Z.gte`][].
  //.
  //. ```javascript
  //. > S.filter (S.gte (3)) ([1, 2, 3, 4, 5])
  //. [3, 4, 5]
  //. ```
  _.gte = {
    consts: {a: [Ord]},
    types: (a => [a, a, $.Boolean])
           (TypeVariable ('a')),
    impl: C (curry2 (Z.gte)),
  };

  //# min :: Ord a => a -> a -> a
  //.
  //. Returns the smaller of its two arguments (according to [`Z.lte`][]).
  //.
  //. See also [`max`](#max).
  //.
  //. ```javascript
  //. > S.min (10) (2)
  //. 2
  //.
  //. > S.min (new Date ('1999-12-31')) (new Date ('2000-01-01'))
  //. new Date ('1999-12-31')
  //.
  //. > S.min ('10') ('2')
  //. '10'
  //. ```
  _.min = {
    consts: {a: [Ord]},
    types: (a => [a, a, a])
           (TypeVariable ('a')),
    impl: curry2 (Z.min),
  };

  //# max :: Ord a => a -> a -> a
  //.
  //. Returns the larger of its two arguments (according to [`Z.lte`][]).
  //.
  //. See also [`min`](#min).
  //.
  //. ```javascript
  //. > S.max (10) (2)
  //. 10
  //.
  //. > S.max (new Date ('1999-12-31')) (new Date ('2000-01-01'))
  //. new Date ('2000-01-01')
  //.
  //. > S.max ('10') ('2')
  //. '2'
  //. ```
  _.max = {
    consts: {a: [Ord]},
    types: (a => [a, a, a])
           (TypeVariable ('a')),
    impl: curry2 (Z.max),
  };

  //# clamp :: Ord a => a -> a -> a -> a
  //.
  //. Takes a lower bound, an upper bound, and a value of the same type.
  //. Returns the value if it is within the bounds; the nearer bound otherwise.
  //.
  //. See also [`min`](#min) and [`max`](#max).
  //.
  //. ```javascript
  //. > S.clamp (0) (100) (42)
  //. 42
  //.
  //. > S.clamp (0) (100) (-1)
  //. 0
  //.
  //. > S.clamp ('A') ('Z') ('~')
  //. 'Z'
  //. ```
  _.clamp = {
    consts: {a: [Ord]},
    types: (a => [a, a, a, a])
           (TypeVariable ('a')),
    impl: curry3 (Z.clamp),
  };

  //# id :: Category c => TypeRep c -> c
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.id`][].
  //.
  //. ```javascript
  //. > S.id (Function) (42)
  //. 42
  //. ```
  _.id = {
    consts: {c: [Category]},
    types: (c => [TypeRep (c), c])
           (TypeVariable ('c')),
    impl: Z.id,
  };

  //# concat :: Semigroup a => a -> a -> a
  //.
  //. Curried version of [`Z.concat`][].
  //.
  //. ```javascript
  //. > S.concat ('abc') ('def')
  //. 'abcdef'
  //.
  //. > S.concat ([1, 2, 3]) ([4, 5, 6])
  //. [1, 2, 3, 4, 5, 6]
  //.
  //. > S.concat ({x: 1, y: 2}) ({y: 3, z: 4})
  //. {x: 1, y: 3, z: 4}
  //.
  //. > S.concat (S.Just ([1, 2, 3])) (S.Just ([4, 5, 6]))
  //. Just ([1, 2, 3, 4, 5, 6])
  //.
  //. > S.concat (Sum (18)) (Sum (24))
  //. Sum (42)
  //. ```
  _.concat = {
    consts: {a: [Semigroup]},
    types: (a => [a, a, a])
           (TypeVariable ('a')),
    impl: curry2 (Z.concat),
  };

  //# empty :: Monoid a => TypeRep a -> a
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.empty`][].
  //.
  //. ```javascript
  //. > S.empty (String)
  //. ''
  //.
  //. > S.empty (Array)
  //. []
  //.
  //. > S.empty (Object)
  //. {}
  //.
  //. > S.empty (Sum)
  //. Sum (0)
  //. ```
  _.empty = {
    consts: {a: [Monoid]},
    types: (a => [TypeRep (a), a])
           (TypeVariable ('a')),
    impl: Z.empty,
  };

  //# invert :: Group g => g -> g
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.invert`][].
  //.
  //. ```javascript
  //. > S.invert (Sum (5))
  //. Sum (-5)
  //. ```
  _.invert = {
    consts: {g: [Group]},
    types: (g => [g, g])
           (TypeVariable ('g')),
    impl: Z.invert,
  };

  //# filter :: Filterable f => (a -> Boolean) -> f a -> f a
  //.
  //. Curried version of [`Z.filter`][]. Discards every element that does not
  //. satisfy the predicate.
  //.
  //. See also [`reject`](#reject).
  //.
  //. ```javascript
  //. > S.filter (S.odd) ([1, 2, 3])
  //. [1, 3]
  //.
  //. > S.filter (S.odd) ({x: 1, y: 2, z: 3})
  //. {x: 1, z: 3}
  //.
  //. > S.filter (S.odd) (S.Nothing)
  //. Nothing
  //.
  //. > S.filter (S.odd) (S.Just (0))
  //. Nothing
  //.
  //. > S.filter (S.odd) (S.Just (1))
  //. Just (1)
  //. ```
  _.filter = {
    consts: {f: [Filterable]},
    types: (f => a => [Predicate (a), f (a), f (a)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: curry2 (Z.filter),
  };

  //# reject :: Filterable f => (a -> Boolean) -> f a -> f a
  //.
  //. Curried version of [`Z.reject`][]. Discards every element that satisfies
  //. the predicate.
  //.
  //. See also [`filter`](#filter).
  //.
  //. ```javascript
  //. > S.reject (S.odd) ([1, 2, 3])
  //. [2]
  //.
  //. > S.reject (S.odd) ({x: 1, y: 2, z: 3})
  //. {y: 2}
  //.
  //. > S.reject (S.odd) (S.Nothing)
  //. Nothing
  //.
  //. > S.reject (S.odd) (S.Just (0))
  //. Just (0)
  //.
  //. > S.reject (S.odd) (S.Just (1))
  //. Nothing
  //. ```
  _.reject = {
    consts: {f: [Filterable]},
    types: (f => a => [Predicate (a), f (a), f (a)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: curry2 (Z.reject),
  };

  //# map :: Functor f => (a -> b) -> f a -> f b
  //.
  //. Curried version of [`Z.map`][].
  //.
  //. ```javascript
  //. > S.map (Math.sqrt) ([1, 4, 9])
  //. [1, 2, 3]
  //.
  //. > S.map (Math.sqrt) ({x: 1, y: 4, z: 9})
  //. {x: 1, y: 2, z: 3}
  //.
  //. > S.map (Math.sqrt) (S.Just (9))
  //. Just (3)
  //.
  //. > S.map (Math.sqrt) (S.Right (9))
  //. Right (3)
  //.
  //. > S.map (Math.sqrt) (S.Pair (99980001) (99980001))
  //. Pair (99980001) (9999)
  //. ```
  //.
  //. Replacing `Functor f => f` with `Function x` produces the B combinator
  //. from combinatory logic (i.e. [`compose`](#compose)):
  //.
  //.     Functor f => (a -> b) -> f a -> f b
  //.     (a -> b) -> Function x a -> Function x b
  //.     (a -> c) -> Function x a -> Function x c
  //.     (b -> c) -> Function x b -> Function x c
  //.     (b -> c) -> Function a b -> Function a c
  //.     (b -> c) -> (a -> b) -> (a -> c)
  //.
  //. ```javascript
  //. > S.map (Math.sqrt) (S.add (1)) (99)
  //. 10
  //. ```
  _.map = {
    consts: {f: [Functor]},
    types: (f => a => b => [Fn (a) (b), f (a), f (b)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: curry2 (Z.map),
  };

  //# flip :: Functor f => f (a -> b) -> a -> f b
  //.
  //. Curried version of [`Z.flip`][]. Maps over the given functions, applying
  //. each to the given value.
  //.
  //. Replacing `Functor f => f` with `Function x` produces the C combinator
  //. from combinatory logic:
  //.
  //.     Functor f => f (a -> b) -> a -> f b
  //.     Function x (a -> b) -> a -> Function x b
  //.     Function x (a -> c) -> a -> Function x c
  //.     Function x (b -> c) -> b -> Function x c
  //.     Function a (b -> c) -> b -> Function a c
  //.     (a -> b -> c) -> b -> a -> c
  //.
  //. ```javascript
  //. > S.flip (S.concat) ('!') ('foo')
  //. 'foo!'
  //.
  //. > S.flip ([Math.floor, Math.ceil]) (1.5)
  //. [1, 2]
  //.
  //. > S.flip ({floor: Math.floor, ceil: Math.ceil}) (1.5)
  //. {floor: 1, ceil: 2}
  //.
  //. > S.flip (Cons (Math.floor) (Cons (Math.ceil) (Nil))) (1.5)
  //. Cons (1) (Cons (2) (Nil))
  //. ```
  _.flip = {
    consts: {f: [Functor]},
    types: (f => a => b => [f (Fn (a) (b)), a, f (b)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: curry2 (Z.flip),
  };

  //# bimap :: Bifunctor f => (a -> b) -> (c -> d) -> f a c -> f b d
  //.
  //. Curried version of [`Z.bimap`][].
  //.
  //. ```javascript
  //. > S.bimap (S.toUpper) (Math.sqrt) (S.Pair ('foo') (64))
  //. Pair ('FOO') (8)
  //.
  //. > S.bimap (S.toUpper) (Math.sqrt) (S.Left ('foo'))
  //. Left ('FOO')
  //.
  //. > S.bimap (S.toUpper) (Math.sqrt) (S.Right (64))
  //. Right (8)
  //. ```
  _.bimap = {
    consts: {p: [Bifunctor]},
    types: (p => a => b => c => d =>
              [Fn (a) (b), Fn (c) (d), p (a) (c), p (b) (d)])
           (BinaryTypeVariable ('p'))
           (TypeVariable ('a'))
           (TypeVariable ('b'))
           (TypeVariable ('c'))
           (TypeVariable ('d')),
    impl: curry3 (Z.bimap),
  };

  //# mapLeft :: Bifunctor f => (a -> b) -> f a c -> f b c
  //.
  //. Curried version of [`Z.mapLeft`][]. Maps the given function over the left
  //. side of a Bifunctor.
  //.
  //. ```javascript
  //. > S.mapLeft (S.toUpper) (S.Pair ('foo') (64))
  //. Pair ('FOO') (64)
  //.
  //. > S.mapLeft (S.toUpper) (S.Left ('foo'))
  //. Left ('FOO')
  //.
  //. > S.mapLeft (S.toUpper) (S.Right (64))
  //. Right (64)
  //. ```
  _.mapLeft = {
    consts: {f: [Bifunctor]},
    types: (f => a => b => c => [Fn (a) (b), f (a) (c), f (b) (c)])
           (BinaryTypeVariable ('f'))
           (TypeVariable ('a'))
           (TypeVariable ('b'))
           (TypeVariable ('c')),
    impl: curry2 (Z.mapLeft),
  };

  //# promap :: Profunctor p => (a -> b) -> (c -> d) -> p b c -> p a d
  //.
  //. Curried version of [`Z.promap`][].
  //.
  //. ```javascript
  //. > S.promap (Math.abs) (S.add (1)) (Math.sqrt) (-100)
  //. 11
  //. ```
  _.promap = {
    consts: {p: [Profunctor]},
    types: (p => a => b => c => d =>
              [Fn (a) (b), Fn (c) (d), p (b) (c), p (a) (d)])
           (BinaryTypeVariable ('p'))
           (TypeVariable ('a'))
           (TypeVariable ('b'))
           (TypeVariable ('c'))
           (TypeVariable ('d')),
    impl: curry3 (Z.promap),
  };

  //# alt :: Alt f => f a -> f a -> f a
  //.
  //. Curried version of [`Z.alt`][] with arguments flipped to facilitate
  //. partial application.
  //.
  //. ```javascript
  //. > S.alt (S.Just ('default')) (S.Nothing)
  //. Just ('default')
  //.
  //. > S.alt (S.Just ('default')) (S.Just ('hello'))
  //. Just ('hello')
  //.
  //. > S.alt (S.Right (0)) (S.Left ('X'))
  //. Right (0)
  //.
  //. > S.alt (S.Right (0)) (S.Right (1))
  //. Right (1)
  //. ```
  _.alt = {
    consts: {f: [Alt]},
    types: (f => a => [f (a), f (a), f (a)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: C (curry2 (Z.alt)),
  };

  //# zero :: Plus f => TypeRep f -> f a
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.zero`][].
  //.
  //. ```javascript
  //. > S.zero (Array)
  //. []
  //.
  //. > S.zero (Object)
  //. {}
  //.
  //. > S.zero (S.Maybe)
  //. Nothing
  //. ```
  _.zero = {
    consts: {f: [Plus]},
    types: (f => a => [TypeRep (f (a)), f (a)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: Z.zero,
  };

  //# reduce :: Foldable f => (b -> a -> b) -> b -> f a -> b
  //.
  //. Takes a curried binary function, an initial value, and a [Foldable][],
  //. and applies the function to the initial value and the Foldable's first
  //. value, then applies the function to the result of the previous
  //. application and the Foldable's second value. Repeats this process
  //. until each of the Foldable's values has been used. Returns the initial
  //. value if the Foldable is empty; the result of the final application
  //. otherwise.
  //.
  //. See also [`reduce_`](#reduce_).
  //.
  //. ```javascript
  //. > S.reduce (S.add) (0) ([1, 2, 3, 4, 5])
  //. 15
  //.
  //. > S.reduce (xs => x => S.prepend (x) (xs)) ([]) ([1, 2, 3, 4, 5])
  //. [5, 4, 3, 2, 1]
  //. ```
  const reduce = f => initial => foldable => (
    Z.reduce ((y, x) => f (y) (x), initial, foldable)
  );
  _.reduce = {
    consts: {f: [Foldable]},
    types: (f => a => b => [Fn (b) (Fn (a) (b)), b, f (a), b])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: reduce,
  };

  //# reduce_ :: Foldable f => (a -> b -> b) -> b -> f a -> b
  //.
  //. Variant of [`reduce`](#reduce) that takes a reducing function with
  //. arguments flipped.
  //.
  //. ```javascript
  //. > S.reduce_ (S.append) ([]) (Cons (1) (Cons (2) (Cons (3) (Nil))))
  //. [1, 2, 3]
  //.
  //. > S.reduce_ (S.prepend) ([]) (Cons (1) (Cons (2) (Cons (3) (Nil))))
  //. [3, 2, 1]
  //. ```
  _.reduce_ = {
    consts: {f: [Foldable]},
    types: (f => a => b => [Fn (a) (Fn (b) (b)), b, f (a), b])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: B (reduce) (C),
  };

  //# traverse :: (Applicative f, Traversable t) => TypeRep f -> (a -> f b) -> t a -> f (t b)
  //.
  //. Curried version of [`Z.traverse`][].
  //.
  //. ```javascript
  //. > S.traverse (Array) (S.words) (S.Just ('foo bar baz'))
  //. [Just ('foo'), Just ('bar'), Just ('baz')]
  //.
  //. > S.traverse (Array) (S.words) (S.Nothing)
  //. [Nothing]
  //.
  //. > S.traverse (S.Maybe) (S.parseInt (16)) (['A', 'B', 'C'])
  //. Just ([10, 11, 12])
  //.
  //. > S.traverse (S.Maybe) (S.parseInt (16)) (['A', 'B', 'C', 'X'])
  //. Nothing
  //.
  //. > S.traverse (S.Maybe) (S.parseInt (16)) ({a: 'A', b: 'B', c: 'C'})
  //. Just ({a: 10, b: 11, c: 12})
  //.
  //. > S.traverse (S.Maybe) (S.parseInt (16)) ({a: 'A', b: 'B', c: 'C', x: 'X'})
  //. Nothing
  //. ```
  _.traverse = {
    consts: {f: [Applicative], t: [Traversable]},
    types: (f => t => a => b =>
              [TypeRep (f (b)), Fn (a) (f (b)), t (a), f (t (b))])
           (UnaryTypeVariable ('f'))
           (UnaryTypeVariable ('t'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: curry3 (Z.traverse),
  };

  //# sequence :: (Applicative f, Traversable t) => TypeRep f -> t (f a) -> f (t a)
  //.
  //. Curried version of [`Z.sequence`][]. Inverts the given `t (f a)`
  //. to produce an `f (t a)`.
  //.
  //. ```javascript
  //. > S.sequence (Array) (S.Just ([1, 2, 3]))
  //. [Just (1), Just (2), Just (3)]
  //.
  //. > S.sequence (S.Maybe) ([S.Just (1), S.Just (2), S.Just (3)])
  //. Just ([1, 2, 3])
  //.
  //. > S.sequence (S.Maybe) ([S.Just (1), S.Just (2), S.Nothing])
  //. Nothing
  //.
  //. > S.sequence (S.Maybe) ({a: S.Just (1), b: S.Just (2), c: S.Just (3)})
  //. Just ({a: 1, b: 2, c: 3})
  //.
  //. > S.sequence (S.Maybe) ({a: S.Just (1), b: S.Just (2), c: S.Nothing})
  //. Nothing
  //. ```
  _.sequence = {
    consts: {f: [Applicative], t: [Traversable]},
    types: (f => t => a => [TypeRep (f (a)), t (f (a)), f (t (a))])
           (UnaryTypeVariable ('f'))
           (UnaryTypeVariable ('t'))
           (TypeVariable ('a')),
    impl: curry2 (Z.sequence),
  };

  //# ap :: Apply f => f (a -> b) -> f a -> f b
  //.
  //. Curried version of [`Z.ap`][].
  //.
  //. ```javascript
  //. > S.ap ([Math.sqrt, x => x * x]) ([1, 4, 9, 16, 25])
  //. [1, 2, 3, 4, 5, 1, 16, 81, 256, 625]
  //.
  //. > S.ap ({x: Math.sqrt, y: S.add (1), z: S.sub (1)}) ({w: 4, x: 4, y: 4})
  //. {x: 2, y: 5}
  //.
  //. > S.ap (S.Just (Math.sqrt)) (S.Just (64))
  //. Just (8)
  //. ```
  //.
  //. Replacing `Apply f => f` with `Function x` produces the S combinator
  //. from combinatory logic:
  //.
  //.     Apply f => f (a -> b) -> f a -> f b
  //.     Function x (a -> b) -> Function x a -> Function x b
  //.     Function x (a -> c) -> Function x a -> Function x c
  //.     Function x (b -> c) -> Function x b -> Function x c
  //.     Function a (b -> c) -> Function a b -> Function a c
  //.     (a -> b -> c) -> (a -> b) -> (a -> c)
  //.
  //. ```javascript
  //. > S.ap (s => n => s.slice (0, n)) (s => Math.ceil (s.length / 2)) ('Haskell')
  //. 'Hask'
  //. ```
  _.ap = {
    consts: {f: [Apply]},
    types: (f => a => b => [f (Fn (a) (b)), f (a), f (b)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: curry2 (Z.ap),
  };

  //# lift2 :: Apply f => (a -> b -> c) -> f a -> f b -> f c
  //.
  //. Promotes a curried binary function to a function that operates on two
  //. [Apply][]s.
  //.
  //. ```javascript
  //. > S.lift2 (S.add) (S.Just (2)) (S.Just (3))
  //. Just (5)
  //.
  //. > S.lift2 (S.add) (S.Just (2)) (S.Nothing)
  //. Nothing
  //.
  //. > S.lift2 (S.and) (S.Just (true)) (S.Just (true))
  //. Just (true)
  //.
  //. > S.lift2 (S.and) (S.Just (true)) (S.Just (false))
  //. Just (false)
  //. ```
  _.lift2 = {
    consts: {f: [Apply]},
    types: (f => a => b => c => [Fn (a) (Fn (b) (c)), f (a), f (b), f (c)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a'))
           (TypeVariable ('b'))
           (TypeVariable ('c')),
    impl: curry3 (Z.lift2),
  };

  //# lift3 :: Apply f => (a -> b -> c -> d) -> f a -> f b -> f c -> f d
  //.
  //. Promotes a curried ternary function to a function that operates on three
  //. [Apply][]s.
  //.
  //. ```javascript
  //. > S.lift3 (S.reduce) (S.Just (S.add)) (S.Just (0)) (S.Just ([1, 2, 3]))
  //. Just (6)
  //.
  //. > S.lift3 (S.reduce) (S.Just (S.add)) (S.Just (0)) (S.Nothing)
  //. Nothing
  //. ```
  _.lift3 = {
    consts: {f: [Apply]},
    types: (f => a => b => c => d =>
              [Fn (a) (Fn (b) (Fn (c) (d))), f (a), f (b), f (c), f (d)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a'))
           (TypeVariable ('b'))
           (TypeVariable ('c'))
           (TypeVariable ('d')),
    impl: curry4 (Z.lift3),
  };

  //# apFirst :: Apply f => f a -> f b -> f a
  //.
  //. Curried version of [`Z.apFirst`][]. Combines two effectful actions,
  //. keeping only the result of the first. Equivalent to Haskell's `(<*)`
  //. function.
  //.
  //. See also [`apSecond`](#apSecond).
  //.
  //. ```javascript
  //. > S.apFirst ([1, 2]) ([3, 4])
  //. [1, 1, 2, 2]
  //.
  //. > S.apFirst (S.Just (1)) (S.Just (2))
  //. Just (1)
  //. ```
  _.apFirst = {
    consts: {f: [Apply]},
    types: (f => a => b => [f (a), f (b), f (a)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: curry2 (Z.apFirst),
  };

  //# apSecond :: Apply f => f a -> f b -> f b
  //.
  //. Curried version of [`Z.apSecond`][]. Combines two effectful actions,
  //. keeping only the result of the second. Equivalent to Haskell's `(*>)`
  //. function.
  //.
  //. See also [`apFirst`](#apFirst).
  //.
  //. ```javascript
  //. > S.apSecond ([1, 2]) ([3, 4])
  //. [3, 4, 3, 4]
  //.
  //. > S.apSecond (S.Just (1)) (S.Just (2))
  //. Just (2)
  //. ```
  _.apSecond = {
    consts: {f: [Apply]},
    types: (f => a => b => [f (a), f (b), f (b)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: curry2 (Z.apSecond),
  };

  //# of :: Applicative f => TypeRep f -> a -> f a
  //.
  //. Curried version of [`Z.of`][].
  //.
  //. ```javascript
  //. > S.of (Array) (42)
  //. [42]
  //.
  //. > S.of (Function) (42) (null)
  //. 42
  //.
  //. > S.of (S.Maybe) (42)
  //. Just (42)
  //.
  //. > S.of (S.Either) (42)
  //. Right (42)
  //. ```
  _.of = {
    consts: {f: [Applicative]},
    types: (f => a => [TypeRep (f (a)), a, f (a)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: curry2 (Z.of),
  };

  //# chain :: Chain m => (a -> m b) -> m a -> m b
  //.
  //. Curried version of [`Z.chain`][].
  //.
  //. ```javascript
  //. > S.chain (x => [x, x]) ([1, 2, 3])
  //. [1, 1, 2, 2, 3, 3]
  //.
  //. > S.chain (n => s => s.slice (0, n)) (s => Math.ceil (s.length / 2)) ('slice')
  //. 'sli'
  //.
  //. > S.chain (S.parseInt (10)) (S.Just ('123'))
  //. Just (123)
  //.
  //. > S.chain (S.parseInt (10)) (S.Just ('XXX'))
  //. Nothing
  //. ```
  _.chain = {
    consts: {m: [Chain]},
    types: (m => a => b => [Fn (a) (m (b)), m (a), m (b)])
           (UnaryTypeVariable ('m'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: curry2 (Z.chain),
  };

  //# join :: Chain m => m (m a) -> m a
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.join`][].
  //. Removes one level of nesting from a nested monadic structure.
  //.
  //. ```javascript
  //. > S.join ([[1], [2], [3]])
  //. [1, 2, 3]
  //.
  //. > S.join ([[[1, 2, 3]]])
  //. [[1, 2, 3]]
  //.
  //. > S.join (S.Just (S.Just (1)))
  //. Just (1)
  //.
  //. > S.join (S.Pair ('foo') (S.Pair ('bar') ('baz')))
  //. Pair ('foobar') ('baz')
  //. ```
  //.
  //. Replacing `Chain m => m` with `Function x` produces the W combinator
  //. from combinatory logic:
  //.
  //.     Chain m => m (m a) -> m a
  //.     Function x (Function x a) -> Function x a
  //.     (x -> x -> a) -> (x -> a)
  //.
  //. ```javascript
  //. > S.join (S.concat) ('abc')
  //. 'abcabc'
  //. ```
  _.join = {
    consts: {m: [Chain]},
    types: (m => a => [m (m (a)), m (a)])
           (UnaryTypeVariable ('m'))
           (TypeVariable ('a')),
    impl: Z.join,
  };

  //# chainRec :: ChainRec m => TypeRep m -> (a -> m (Either a b)) -> a -> m b
  //.
  //. Performs a [`chain`](#chain)-like computation with constant stack usage.
  //. Similar to [`Z.chainRec`][], but curried and more convenient due to the
  //. use of the Either type to indicate completion (via a Right).
  //.
  //. ```javascript
  //. > S.chainRec (Array)
  //. .            (s => s.length === 2 ? S.map (S.Right) ([s + '!', s + '?'])
  //. .                                 : S.map (S.Left) ([s + 'o', s + 'n']))
  //. .            ('')
  //. ['oo!', 'oo?', 'on!', 'on?', 'no!', 'no?', 'nn!', 'nn?']
  //. ```
  const chainRec = typeRep => f => {
    const step = (next, done, x) => Z.map (either (next) (done), f (x));
    return x => Z.chainRec (typeRep, step, x);
  };
  _.chainRec = {
    consts: {m: [ChainRec]},
    types: (m => a => b =>
              [TypeRep (m (b)), Fn (a) (m ($.Either (a) (b))), a, m (b)])
           (UnaryTypeVariable ('m'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: chainRec,
  };

  //# extend :: Extend w => (w a -> b) -> w a -> w b
  //.
  //. Curried version of [`Z.extend`][].
  //.
  //. ```javascript
  //. > S.extend (S.joinWith ('')) (['x', 'y', 'z'])
  //. ['xyz', 'yz', 'z']
  //.
  //. > S.extend (f => f ([3, 4])) (S.reverse) ([1, 2])
  //. [4, 3, 2, 1]
  //. ```
  _.extend = {
    consts: {w: [Extend]},
    types: (w => a => b => [Fn (w (a)) (b), w (a), w (b)])
           (UnaryTypeVariable ('w'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: curry2 (Z.extend),
  };

  //# duplicate :: Extend w => w a -> w (w a)
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.duplicate`][].
  //. Adds one level of nesting to a comonadic structure.
  //.
  //. ```javascript
  //. > S.duplicate (S.Just (1))
  //. Just (Just (1))
  //.
  //. > S.duplicate ([1])
  //. [[1]]
  //.
  //. > S.duplicate ([1, 2, 3])
  //. [[1, 2, 3], [2, 3], [3]]
  //.
  //. > S.duplicate (S.reverse) ([1, 2]) ([3, 4])
  //. [4, 3, 2, 1]
  //. ```
  _.duplicate = {
    consts: {w: [Extend]},
    types: (w => a => [w (a), w (w (a))])
           (UnaryTypeVariable ('w'))
           (TypeVariable ('a')),
    impl: Z.duplicate,
  };

  //# extract :: Comonad w => w a -> a
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.extract`][].
  //.
  //. ```javascript
  //. > S.extract (S.Pair ('foo') ('bar'))
  //. 'bar'
  //. ```
  _.extract = {
    consts: {w: [Comonad]},
    types: (w => a => [w (a), a])
           (UnaryTypeVariable ('w'))
           (TypeVariable ('a')),
    impl: Z.extract,
  };

  //# contramap :: Contravariant f => (b -> a) -> f a -> f b
  //.
  //. [Type-safe][sanctuary-def] version of [`Z.contramap`][].
  //.
  //. ```javascript
  //. > S.contramap (s => s.length) (Math.sqrt) ('Sanctuary')
  //. 3
  //. ```
  _.contramap = {
    consts: {f: [Contravariant]},
    types: (f => a => b => [Fn (b) (a), f (a), f (b)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: curry2 (Z.contramap),
  };

  //. ### Combinator

  //# I :: a -> a
  //.
  //. The I combinator. Returns its argument. Equivalent to Haskell's `id`
  //. function.
  //.
  //. ```javascript
  //. > S.I ('foo')
  //. 'foo'
  //. ```
  const I = x => x;
  _.I = {
    consts: {},
    types: (a => [a, a])
           (TypeVariable ('a')),
    impl: I,
  };

  //# K :: a -> b -> a
  //.
  //. The K combinator. Takes two values and returns the first. Equivalent to
  //. Haskell's `const` function.
  //.
  //. ```javascript
  //. > S.K ('foo') ('bar')
  //. 'foo'
  //.
  //. > S.map (S.K (42)) (S.range (0) (5))
  //. [42, 42, 42, 42, 42]
  //. ```
  const K = x => y => x;
  _.K = {
    consts: {},
    types: (a => b => [a, b, a])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: K,
  };

  //# T :: a -> (a -> b) -> b
  //.
  //. The T ([thrush][]) combinator. Takes a value and a function, and returns
  //. the result of applying the function to the value. Equivalent to Haskell's
  //. `(&)` function.
  //.
  //. ```javascript
  //. > S.T (42) (S.add (1))
  //. 43
  //.
  //. > S.map (S.T (100)) ([S.add (1), Math.sqrt])
  //. [101, 10]
  //. ```
  const T = x => f => f (x);
  _.T = {
    consts: {},
    types: (a => b => [a, Fn (a) (b), b])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: T,
  };

  //. ### Composition

  //# compose :: Semigroupoid s => s b c -> s a b -> s a c
  //.
  //. Curried version of [`Z.compose`][].
  //.
  //. When specialized to Function, `compose` composes two unary functions,
  //. from right to left (this is the B combinator from combinatory logic).
  //.
  //. The generalized type signature indicates that `compose` is compatible
  //. with any [Semigroupoid][].
  //.
  //. See also [`pipe`](#pipe).
  //.
  //. ```javascript
  //. > S.compose (Math.sqrt) (S.add (1)) (99)
  //. 10
  //. ```
  _.compose = {
    consts: {s: [Semigroupoid]},
    types: (s => a => b => c => [s (b) (c), s (a) (b), s (a) (c)])
           (BinaryTypeVariable ('s'))
           (TypeVariable ('a'))
           (TypeVariable ('b'))
           (TypeVariable ('c')),
    impl: curry2 (Z.compose),
  };

  //# pipe :: Foldable f => f (Any -> Any) -> a -> b
  //.
  //. Takes a sequence of functions assumed to be unary and a value of any
  //. type, and returns the result of applying the sequence of transformations
  //. to the initial value.
  //.
  //. In general terms, `pipe` performs left-to-right composition of a sequence
  //. of functions. `pipe ([f, g, h]) (x)` is equivalent to `h (g (f (x)))`.
  //.
  //. ```javascript
  //. > S.pipe ([S.add (1), Math.sqrt, S.sub (1)]) (99)
  //. 9
  //. ```
  const pipe = fs => x => reduce (T) (x) (fs);
  _.pipe = {
    consts: {f: [Foldable]},
    types: (f => a => b => [f (Fn (Any) (Any)), a, b])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: pipe,
  };

  //# pipeK :: (Foldable f, Chain m) => f (Any -> m Any) -> m a -> m b
  //.
  //. Takes a sequence of functions assumed to be unary that return values
  //. with a [Chain][], and a value of that Chain, and returns the result
  //. of applying the sequence of transformations to the initial value.
  //.
  //. In general terms, `pipeK` performs left-to-right [Kleisli][] composition
  //. of an sequence of functions. `pipeK ([f, g, h]) (x)` is equivalent to
  //. `chain (h) (chain (g) (chain (f) (x)))`.
  //.
  //. ```javascript
  //. > S.pipeK ([S.tail, S.tail, S.head]) (S.Just ([1, 2, 3, 4]))
  //. Just (3)
  //. ```
  const pipeK = fs => x => Z.reduce ((x, f) => Z.chain (f, x), x, fs);
  _.pipeK = {
    consts: {f: [Foldable], m: [Chain]},
    types: (f => m => a => b => [f (Fn (Any) (m (Any))), m (a), m (b)])
           (UnaryTypeVariable ('f'))
           (UnaryTypeVariable ('m'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: pipeK,
  };

  //# on :: (b -> b -> c) -> (a -> b) -> a -> a -> c
  //.
  //. Takes a binary function `f`, a unary function `g`, and two
  //. values `x` and `y`. Returns `f (g (x)) (g (y))`.
  //.
  //. This is the P combinator from combinatory logic.
  //.
  //. ```javascript
  //. > S.on (S.concat) (S.reverse) ([1, 2, 3]) ([4, 5, 6])
  //. [3, 2, 1, 6, 5, 4]
  //. ```
  const on = f => g => x => y => f (g (x)) (g (y));
  _.on = {
    consts: {},
    types: (a => b => c => [Fn (b) (Fn (b) (c)), Fn (a) (b), a, a, c])
           (TypeVariable ('a'))
           (TypeVariable ('b'))
           (TypeVariable ('c')),
    impl: on,
  };

  //. ### Pair
  //.
  //. Pair is the canonical product type: a value of type `Pair a b` always
  //. contains exactly two values: one of type `a`; one of type `b`.
  //.
  //. The implementation is provided by [sanctuary-pair][].

  //# Pair :: a -> b -> Pair a b
  //.
  //. Pair's sole data constructor. Additionally, it serves as the
  //. Pair [type representative][].
  //.
  //. ```javascript
  //. > S.Pair ('foo') (42)
  //. Pair ('foo') (42)
  //. ```
  _.Pair = {
    consts: {},
    types: (a => b => [a, b, $.Pair (a) (b)])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: Pair,
  };

  //# pair :: (a -> b -> c) -> Pair a b -> c
  //.
  //. Case analysis for the `Pair a b` type.
  //.
  //. ```javascript
  //. > S.pair (S.concat) (S.Pair ('foo') ('bar'))
  //. 'foobar'
  //. ```
  const pair = f => ([fst, snd]) => f (fst) (snd);
  _.pair = {
    consts: {},
    types: (a => b => c => [Fn (a) (Fn (b) (c)), $.Pair (a) (b), c])
           (TypeVariable ('a'))
           (TypeVariable ('b'))
           (TypeVariable ('c')),
    impl: pair,
  };

  //# fst :: Pair a b -> a
  //.
  //. `fst (Pair (x) (y))` is equivalent to `x`.
  //.
  //. ```javascript
  //. > S.fst (S.Pair ('foo') (42))
  //. 'foo'
  //. ```
  _.fst = {
    consts: {},
    types: (a => b => [$.Pair (a) (b), a])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: Pair.fst,
  };

  //# snd :: Pair a b -> b
  //.
  //. `snd (Pair (x) (y))` is equivalent to `y`.
  //.
  //. ```javascript
  //. > S.snd (S.Pair ('foo') (42))
  //. 42
  //. ```
  _.snd = {
    consts: {},
    types: (a => b => [$.Pair (a) (b), b])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: Pair.snd,
  };

  //# swap :: Pair a b -> Pair b a
  //.
  //. `swap (Pair (x) (y))` is equivalent to `Pair (y) (x)`.
  //.
  //. ```javascript
  //. > S.swap (S.Pair ('foo') (42))
  //. Pair (42) ('foo')
  //. ```
  _.swap = {
    consts: {},
    types: (a => b => [$.Pair (a) (b), $.Pair (b) (a)])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: Pair.swap,
  };

  //. ### Maybe
  //.
  //. The Maybe type represents optional values: a value of type `Maybe a` is
  //. either Nothing (the empty value) or a Just whose value is of type `a`.
  //.
  //. The implementation is provided by [sanctuary-maybe][].

  //# Maybe :: TypeRep Maybe
  //.
  //. Maybe [type representative][].

  //# Nothing :: Maybe a
  //.
  //. The empty value of type `Maybe a`.
  //.
  //. ```javascript
  //. > S.Nothing
  //. Nothing
  //. ```

  //# Just :: a -> Maybe a
  //.
  //. Constructs a value of type `Maybe a` from a value of type `a`.
  //.
  //. ```javascript
  //. > S.Just (42)
  //. Just (42)
  //. ```
  _.Just = {
    consts: {},
    types: (a => [a, $.Maybe (a)])
           (TypeVariable ('a')),
    impl: Just,
  };

  //# isNothing :: Maybe a -> Boolean
  //.
  //. Returns `true` if the given Maybe is Nothing; `false` if it is a Just.
  //.
  //. ```javascript
  //. > S.isNothing (S.Nothing)
  //. true
  //.
  //. > S.isNothing (S.Just (42))
  //. false
  //. ```
  const isNothing = maybe => maybe.isNothing;
  _.isNothing = {
    consts: {},
    types: (a => [$.Maybe (a), $.Boolean])
           (TypeVariable ('a')),
    impl: isNothing,
  };

  //# isJust :: Maybe a -> Boolean
  //.
  //. Returns `true` if the given Maybe is a Just; `false` if it is Nothing.
  //.
  //. ```javascript
  //. > S.isJust (S.Just (42))
  //. true
  //.
  //. > S.isJust (S.Nothing)
  //. false
  //. ```
  const isJust = maybe => maybe.isJust;
  _.isJust = {
    consts: {},
    types: (a => [$.Maybe (a), $.Boolean])
           (TypeVariable ('a')),
    impl: isJust,
  };

  //# maybe :: b -> (a -> b) -> Maybe a -> b
  //.
  //. Takes a value of any type, a function, and a Maybe. If the Maybe is
  //. a Just, the return value is the result of applying the function to
  //. the Just's value. Otherwise, the first argument is returned.
  //.
  //. See also [`maybe_`](#maybe_) and [`fromMaybe`](#fromMaybe).
  //.
  //. ```javascript
  //. > S.maybe (0) (S.prop ('length')) (S.Just ('refuge'))
  //. 6
  //.
  //. > S.maybe (0) (S.prop ('length')) (S.Nothing)
  //. 0
  //. ```
  const maybe = x => f => maybe => maybe.isJust ? f (maybe.value) : x;
  _.maybe = {
    consts: {},
    types: (a => b => [b, Fn (a) (b), $.Maybe (a), b])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: maybe,
  };

  //# maybe_ :: (() -> b) -> (a -> b) -> Maybe a -> b
  //.
  //. Variant of [`maybe`](#maybe) that takes a thunk so the default value
  //. is only computed if required.
  //.
  //. ```javascript
  //. > function fib(n) { return n <= 1 ? n : fib (n - 2) + fib (n - 1); }
  //.
  //. > S.maybe_ (() => fib (30)) (Math.sqrt) (S.Just (1000000))
  //. 1000
  //.
  //. > S.maybe_ (() => fib (30)) (Math.sqrt) (S.Nothing)
  //. 832040
  //. ```
  const maybe_ = thunk => f => maybe => (
    maybe.isJust ? f (maybe.value) : thunk ()
  );
  _.maybe_ = {
    consts: {},
    types: (a => b => [Thunk (b), Fn (a) (b), $.Maybe (a), b])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: maybe_,
  };

  //# fromMaybe :: a -> Maybe a -> a
  //.
  //. Takes a default value and a Maybe, and returns the Maybe's value
  //. if the Maybe is a Just; the default value otherwise.
  //.
  //. See also [`maybe`](#maybe), [`fromMaybe_`](#fromMaybe_), and
  //. [`maybeToNullable`](#maybeToNullable).
  //.
  //. ```javascript
  //. > S.fromMaybe (0) (S.Just (42))
  //. 42
  //.
  //. > S.fromMaybe (0) (S.Nothing)
  //. 0
  //. ```
  _.fromMaybe = {
    consts: {},
    types: (a => [a, $.Maybe (a), a])
           (TypeVariable ('a')),
    impl: C (maybe) (I),
  };

  //# fromMaybe_ :: (() -> a) -> Maybe a -> a
  //.
  //. Variant of [`fromMaybe`](#fromMaybe) that takes a thunk so the default
  //. value is only computed if required.
  //.
  //. ```javascript
  //. > function fib(n) { return n <= 1 ? n : fib (n - 2) + fib (n - 1); }
  //.
  //. > S.fromMaybe_ (() => fib (30)) (S.Just (1000000))
  //. 1000000
  //.
  //. > S.fromMaybe_ (() => fib (30)) (S.Nothing)
  //. 832040
  //. ```
  _.fromMaybe_ = {
    consts: {},
    types: (a => [Thunk (a), $.Maybe (a), a])
           (TypeVariable ('a')),
    impl: C (maybe_) (I),
  };

  //# justs :: (Filterable f, Functor f) => f (Maybe a) -> f a
  //.
  //. Discards each element that is Nothing, and unwraps each element that is
  //. a Just. Related to Haskell's `catMaybes` function.
  //.
  //. See also [`lefts`](#lefts) and [`rights`](#rights).
  //.
  //. ```javascript
  //. > S.justs ([S.Just ('foo'), S.Nothing, S.Just ('baz')])
  //. ['foo', 'baz']
  //. ```
  const justs = maybes => (
    Z.map (j => j.value, Z.filter (isJust, maybes))
  );
  _.justs = {
    consts: {f: [Filterable, Functor]},
    types: (f => a => [f ($.Maybe (a)), f (a)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: justs,
  };

  //# mapMaybe :: (Filterable f, Functor f) => (a -> Maybe b) -> f a -> f b
  //.
  //. Takes a function and a structure, applies the function to each element
  //. of the structure, and returns the "successful" results. If the result of
  //. applying the function to an element is Nothing, the result is discarded;
  //. if the result is a Just, the Just's value is included.
  //.
  //. ```javascript
  //. > S.mapMaybe (S.head) ([[], [1, 2, 3], [], [4, 5, 6], []])
  //. [1, 4]
  //.
  //. > S.mapMaybe (S.head) ({x: [1, 2, 3], y: [], z: [4, 5, 6]})
  //. {x: 1, z: 4}
  //. ```
  const mapMaybe = f => functor => (
    Z.map (j => j.value, Z.filter (isJust, Z.map (f, functor)))
  );
  _.mapMaybe = {
    consts: {f: [Filterable, Functor]},
    types: (f => a => b => [Fn (a) ($.Maybe (b)), f (a), f (b)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: mapMaybe,
  };

  //# maybeToNullable :: Maybe a -> Nullable a
  //.
  //. Returns the given Maybe's value if the Maybe is a Just; `null` otherwise.
  //. [Nullable][] is defined in [sanctuary-def][].
  //.
  //. See also [`fromMaybe`](#fromMaybe).
  //.
  //. ```javascript
  //. > S.maybeToNullable (S.Just (42))
  //. 42
  //.
  //. > S.maybeToNullable (S.Nothing)
  //. null
  //. ```
  const maybeToNullable = maybe => maybe.isJust ? maybe.value : null;
  _.maybeToNullable = {
    consts: {},
    types: (a => [$.Maybe (a), $.Nullable (a)])
           (TypeVariable ('a')),
    impl: maybeToNullable,
  };

  //. ### Either
  //.
  //. The Either type represents values with two possibilities: a value of type
  //. `Either a b` is either a Left whose value is of type `a` or a Right whose
  //. value is of type `b`.
  //.
  //. The implementation is provided by [sanctuary-either][].

  //# Either :: TypeRep Either
  //.
  //. Either [type representative][].

  //# Left :: a -> Either a b
  //.
  //. Constructs a value of type `Either a b` from a value of type `a`.
  //.
  //. ```javascript
  //. > S.Left ('Cannot divide by zero')
  //. Left ('Cannot divide by zero')
  //. ```
  _.Left = {
    consts: {},
    types: (a => b => [a, $.Either (a) (b)])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: Left,
  };

  //# Right :: b -> Either a b
  //.
  //. Constructs a value of type `Either a b` from a value of type `b`.
  //.
  //. ```javascript
  //. > S.Right (42)
  //. Right (42)
  //. ```
  _.Right = {
    consts: {},
    types: (a => b => [b, $.Either (a) (b)])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: Right,
  };

  //# isLeft :: Either a b -> Boolean
  //.
  //. Returns `true` if the given Either is a Left; `false` if it is a Right.
  //.
  //. ```javascript
  //. > S.isLeft (S.Left ('Cannot divide by zero'))
  //. true
  //.
  //. > S.isLeft (S.Right (42))
  //. false
  //. ```
  const isLeft = either => either.isLeft;
  _.isLeft = {
    consts: {},
    types: (a => b => [$.Either (a) (b), $.Boolean])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: isLeft,
  };

  //# isRight :: Either a b -> Boolean
  //.
  //. Returns `true` if the given Either is a Right; `false` if it is a Left.
  //.
  //. ```javascript
  //. > S.isRight (S.Right (42))
  //. true
  //.
  //. > S.isRight (S.Left ('Cannot divide by zero'))
  //. false
  //. ```
  const isRight = either => either.isRight;
  _.isRight = {
    consts: {},
    types: (a => b => [$.Either (a) (b), $.Boolean])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: isRight,
  };

  //# either :: (a -> c) -> (b -> c) -> Either a b -> c
  //.
  //. Takes two functions and an Either, and returns the result of
  //. applying the first function to the Left's value, if the Either
  //. is a Left, or the result of applying the second function to the
  //. Right's value, if the Either is a Right.
  //.
  //. See also [`fromLeft`](#fromLeft) and [`fromRight`](#fromRight).
  //.
  //. ```javascript
  //. > S.either (S.toUpper) (S.show) (S.Left ('Cannot divide by zero'))
  //. 'CANNOT DIVIDE BY ZERO'
  //.
  //. > S.either (S.toUpper) (S.show) (S.Right (42))
  //. '42'
  //. ```
  const either = l => r => either => (either.isLeft ? l : r) (either.value);
  _.either = {
    consts: {},
    types: (a => b => c => [Fn (a) (c), Fn (b) (c), $.Either (a) (b), c])
           (TypeVariable ('a'))
           (TypeVariable ('b'))
           (TypeVariable ('c')),
    impl: either,
  };

  //# fromLeft :: a -> Either a b -> a
  //.
  //. Takes a default value and an Either, and returns the Left value
  //. if the Either is a Left; the default value otherwise.
  //.
  //. See also [`either`](#either) and [`fromRight`](#fromRight).
  //.
  //. ```javascript
  //. > S.fromLeft ('abc') (S.Left ('xyz'))
  //. 'xyz'
  //.
  //. > S.fromLeft ('abc') (S.Right (123))
  //. 'abc'
  //. ```
  const fromLeft = x => either (I) (K (x));
  _.fromLeft = {
    consts: {},
    types: (a => b => [a, $.Either (a) (b), a])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: fromLeft,
  };

  //# fromRight :: b -> Either a b -> b
  //.
  //. Takes a default value and an Either, and returns the Right value
  //. if the Either is a Right; the default value otherwise.
  //.
  //. See also [`either`](#either) and [`fromLeft`](#fromLeft).
  //.
  //. ```javascript
  //. > S.fromRight (123) (S.Right (789))
  //. 789
  //.
  //. > S.fromRight (123) (S.Left ('abc'))
  //. 123
  //. ```
  const fromRight = x => either (K (x)) (I);
  _.fromRight = {
    consts: {},
    types: (a => b => [b, $.Either (a) (b), b])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: fromRight,
  };

  //# fromEither :: Either a a -> a
  //.
  //. Takes an Either with the same type on the Left and on the Right
  //. and returns whichever value exists.
  //.
  //. The inverse of [`tagBy`](#tagBy).
  //.
  //. ```javascript
  //. > S.fromEither (S.Left (42))
  //. 42
  //.
  //. > S.fromEither (S.Right (42))
  //. 42
  //. ```
  _.fromEither = {
    consts: {},
    types: (a => [$.Either (a) (a), a])
           (TypeVariable ('a')),
    impl: either (I) (I),
  };

  //# lefts :: (Filterable f, Functor f) => f (Either a b) -> f a
  //.
  //. Discards each element that is a Right, and unwraps each element that is
  //. a Left.
  //.
  //. See also [`rights`](#rights).
  //.
  //. ```javascript
  //. > S.lefts ([S.Right (20), S.Left ('foo'), S.Right (10), S.Left ('bar')])
  //. ['foo', 'bar']
  //. ```
  const lefts = eithers => (
    Z.map (l => l.value, Z.filter (isLeft, eithers))
  );
  _.lefts = {
    consts: {f: [Filterable, Functor]},
    types: (f => a => b => [f ($.Either (a) (b)), f (a)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: lefts,
  };

  //# rights :: (Filterable f, Functor f) => f (Either a b) -> f b
  //.
  //. Discards each element that is a Left, and unwraps each element that is
  //. a Right.
  //.
  //. See also [`lefts`](#lefts).
  //.
  //. ```javascript
  //. > S.rights ([S.Right (20), S.Left ('foo'), S.Right (10), S.Left ('bar')])
  //. [20, 10]
  //. ```
  const rights = eithers => (
    Z.map (r => r.value, Z.filter (isRight, eithers))
  );
  _.rights = {
    consts: {f: [Filterable, Functor]},
    types: (f => a => b => [f ($.Either (a) (b)), f (b)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: rights,
  };

  //# tagBy :: (a -> Boolean) -> a -> Either a a
  //.
  //. Takes a predicate and a value, and returns a Right of the value if it
  //. satisfies the predicate; a Left of the value otherwise.
  //.
  //. ```javascript
  //. > S.tagBy (S.odd) (0)
  //. Left (0)
  //
  //. > S.tagBy (S.odd) (1)
  //. Right (1)
  //. ```
  const tagBy = pred => x => (pred (x) ? Right : Left) (x);
  _.tagBy = {
    consts: {},
    types: (a => [Predicate (a), a, $.Either (a) (a)])
           (TypeVariable ('a')),
    impl: tagBy,
  };

  //# encase :: Throwing e a b -> a -> Either e b
  //.
  //. Takes a function that may throw and returns a pure function.
  //.
  //. ```javascript
  //. > S.encase (JSON.parse) ('["foo","bar","baz"]')
  //. Right (['foo', 'bar', 'baz'])
  //.
  //. > S.encase (JSON.parse) ('[')
  //. Left (new SyntaxError ('Unexpected end of JSON input'))
  //. ```
  const encase = f => x => {
    try {
      return Right (f (x));
    } catch (err) {
      return Left (err);
    }
  };
  _.encase = {
    consts: {},
    types: (e => a => b => [Throwing (e) (a) (b), a, $.Either (e) (b)])
           (TypeVariable ('e'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: encase,
  };

  //. ### Logic

  //# and :: Boolean -> Boolean -> Boolean
  //.
  //. Boolean "and".
  //.
  //. ```javascript
  //. > S.and (false) (false)
  //. false
  //.
  //. > S.and (false) (true)
  //. false
  //.
  //. > S.and (true) (false)
  //. false
  //.
  //. > S.and (true) (true)
  //. true
  //. ```
  const and = x => y => x && y;
  _.and = {
    consts: {},
    types: [$.Boolean, $.Boolean, $.Boolean],
    impl: and,
  };

  //# or :: Boolean -> Boolean -> Boolean
  //.
  //. Boolean "or".
  //.
  //. ```javascript
  //. > S.or (false) (false)
  //. false
  //.
  //. > S.or (false) (true)
  //. true
  //.
  //. > S.or (true) (false)
  //. true
  //.
  //. > S.or (true) (true)
  //. true
  //. ```
  const or = x => y => x || y;
  _.or = {
    consts: {},
    types: [$.Boolean, $.Boolean, $.Boolean],
    impl: or,
  };

  //# not :: Boolean -> Boolean
  //.
  //. Boolean "not".
  //.
  //. See also [`complement`](#complement).
  //.
  //. ```javascript
  //. > S.not (false)
  //. true
  //.
  //. > S.not (true)
  //. false
  //. ```
  const not = x => !x;
  _.not = {
    consts: {},
    types: [$.Boolean, $.Boolean],
    impl: not,
  };

  //# complement :: (a -> Boolean) -> a -> Boolean
  //.
  //. Takes a unary predicate and a value of any type, and returns the logical
  //. negation of applying the predicate to the value.
  //.
  //. See also [`not`](#not).
  //.
  //. ```javascript
  //. > Number.isInteger (42)
  //. true
  //.
  //. > S.complement (Number.isInteger) (42)
  //. false
  //. ```
  _.complement = {
    consts: {},
    types: (a => [Predicate (a), a, $.Boolean])
           (TypeVariable ('a')),
    impl: B (not),
  };

  //# boolean :: a -> a -> Boolean -> a
  //.
  //. Case analysis for the `Boolean` type. `boolean (x) (y) (b)` evaluates
  //. to `x` if `b` is `false`; to `y` if `b` is `true`.
  //.
  //. ```javascript
  //. > S.boolean ('no') ('yes') (false)
  //. 'no'
  //.
  //. > S.boolean ('no') ('yes') (true)
  //. 'yes'
  //. ```
  const boolean = x => y => b => b ? y : x;
  _.boolean = {
    consts: {},
    types: (a => [a, a, $.Boolean, a])
           (TypeVariable ('a')),
    impl: boolean,
  };

  //# ifElse :: (a -> Boolean) -> (a -> b) -> (a -> b) -> a -> b
  //.
  //. Takes a unary predicate, a unary "if" function, a unary "else"
  //. function, and a value of any type, and returns the result of
  //. applying the "if" function to the value if the value satisfies
  //. the predicate; the result of applying the "else" function to the
  //. value otherwise.
  //.
  //. See also [`when`](#when) and [`unless`](#unless).
  //.
  //. ```javascript
  //. > S.ifElse (x => x < 0) (Math.abs) (Math.sqrt) (-1)
  //. 1
  //.
  //. > S.ifElse (x => x < 0) (Math.abs) (Math.sqrt) (16)
  //. 4
  //. ```
  const ifElse = pred => f => g => x => (pred (x) ? f : g) (x);
  _.ifElse = {
    consts: {},
    types: (a => b => [Predicate (a), Fn (a) (b), Fn (a) (b), a, b])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: ifElse,
  };

  //# when :: (a -> Boolean) -> (a -> a) -> a -> a
  //.
  //. Takes a unary predicate, a unary function, and a value of any type, and
  //. returns the result of applying the function to the value if the value
  //. satisfies the predicate; the value otherwise.
  //.
  //. See also [`unless`](#unless) and [`ifElse`](#ifElse).
  //.
  //. ```javascript
  //. > S.when (x => x >= 0) (Math.sqrt) (16)
  //. 4
  //.
  //. > S.when (x => x >= 0) (Math.sqrt) (-1)
  //. -1
  //. ```
  const when = pred => f => x => pred (x) ? f (x) : x;
  _.when = {
    consts: {},
    types: (a => [Predicate (a), Fn (a) (a), a, a])
           (TypeVariable ('a')),
    impl: when,
  };

  //# unless :: (a -> Boolean) -> (a -> a) -> a -> a
  //.
  //. Takes a unary predicate, a unary function, and a value of any type, and
  //. returns the result of applying the function to the value if the value
  //. does not satisfy the predicate; the value otherwise.
  //.
  //. See also [`when`](#when) and [`ifElse`](#ifElse).
  //.
  //. ```javascript
  //. > S.unless (x => x < 0) (Math.sqrt) (16)
  //. 4
  //.
  //. > S.unless (x => x < 0) (Math.sqrt) (-1)
  //. -1
  //. ```
  const unless = pred => f => x => pred (x) ? x : f (x);
  _.unless = {
    consts: {},
    types: (a => [Predicate (a), Fn (a) (a), a, a])
           (TypeVariable ('a')),
    impl: unless,
  };

  //. ### Array

  //# array :: b -> (a -> Array a -> b) -> Array a -> b
  //.
  //. Case analysis for the `Array a` type.
  //.
  //. ```javascript
  //. > S.array (S.Nothing) (head => tail => S.Just (head)) ([])
  //. Nothing
  //.
  //. > S.array (S.Nothing) (head => tail => S.Just (head)) ([1, 2, 3])
  //. Just (1)
  //.
  //. > S.array (S.Nothing) (head => tail => S.Just (tail)) ([])
  //. Nothing
  //.
  //. > S.array (S.Nothing) (head => tail => S.Just (tail)) ([1, 2, 3])
  //. Just ([2, 3])
  //. ```
  const array = y => f => xs => (
    xs.length === 0 ? y : f (xs[0]) (xs.slice (1))
  );
  _.array = {
    consts: {},
    types: (a => b => [b, Fn (a) (Fn ($.Array (a)) (b)), $.Array (a), b])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: array,
  };

  //# head :: Foldable f => f a -> Maybe a
  //.
  //. Returns Just the first element of the given structure if the structure
  //. contains at least one element; Nothing otherwise.
  //.
  //. ```javascript
  //. > S.head ([1, 2, 3])
  //. Just (1)
  //.
  //. > S.head ([])
  //. Nothing
  //.
  //. > S.head (Cons (1) (Cons (2) (Cons (3) (Nil))))
  //. Just (1)
  //.
  //. > S.head (Nil)
  //. Nothing
  //. ```
  const head = foldable => {
    //  Fast path for arrays.
    if (Array.isArray (foldable)) {
      return foldable.length > 0 ? Just (foldable[0]) : Nothing;
    }
    return Z.reduce ((m, x) => m.isJust ? m : Just (x), Nothing, foldable);
  };
  _.head = {
    consts: {f: [Foldable]},
    types: (f => a => [f (a), $.Maybe (a)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: head,
  };

  //# last :: Foldable f => f a -> Maybe a
  //.
  //. Returns Just the last element of the given structure if the structure
  //. contains at least one element; Nothing otherwise.
  //.
  //. ```javascript
  //. > S.last ([1, 2, 3])
  //. Just (3)
  //.
  //. > S.last ([])
  //. Nothing
  //.
  //. > S.last (Cons (1) (Cons (2) (Cons (3) (Nil))))
  //. Just (3)
  //.
  //. > S.last (Nil)
  //. Nothing
  //. ```
  const last = foldable => {
    //  Fast path for arrays.
    if (Array.isArray (foldable)) {
      return foldable.length > 0 ? Just (foldable[foldable.length - 1])
                                 : Nothing;
    }
    return Z.reduce ((_, x) => Just (x), Nothing, foldable);
  };
  _.last = {
    consts: {f: [Foldable]},
    types: (f => a => [f (a), $.Maybe (a)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: last,
  };

  //# tail :: (Applicative f, Foldable f, Monoid (f a)) => f a -> Maybe (f a)
  //.
  //. Returns Just all but the first of the given structure's elements if the
  //. structure contains at least one element; Nothing otherwise.
  //.
  //. ```javascript
  //. > S.tail ([1, 2, 3])
  //. Just ([2, 3])
  //.
  //. > S.tail ([])
  //. Nothing
  //.
  //. > S.tail (Cons (1) (Cons (2) (Cons (3) (Nil))))
  //. Just (Cons (2) (Cons (3) (Nil)))
  //
  //. > S.tail (Nil)
  //. Nothing
  //. ```
  const tail = foldable => {
    //  Fast path for arrays.
    if (Array.isArray (foldable)) {
      return foldable.length > 0 ? Just (foldable.slice (1)) : Nothing;
    }
    const empty = Z.empty (foldable.constructor);
    return Z.reduce (
      (m, x) => Just (m.isNothing ? empty : Z.append (x, m.value)),
      Nothing,
      foldable
    );
  };
  _.tail = {
    consts: {f: [Applicative, Foldable, Monoid]},
    types: (f => a => [f (a), $.Maybe (f (a))])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: tail,
  };

  //# init :: (Applicative f, Foldable f, Monoid (f a)) => f a -> Maybe (f a)
  //.
  //. Returns Just all but the last of the given structure's elements if the
  //. structure contains at least one element; Nothing otherwise.
  //.
  //. ```javascript
  //. > S.init ([1, 2, 3])
  //. Just ([1, 2])
  //.
  //. > S.init ([])
  //. Nothing
  //.
  //. > S.init (Cons (1) (Cons (2) (Cons (3) (Nil))))
  //. Just (Cons (1) (Cons (2) (Nil)))
  //.
  //. > S.init (Nil)
  //. Nothing
  //. ```
  const init = foldable => {
    //  Fast path for arrays.
    if (Array.isArray (foldable)) {
      return foldable.length > 0 ? Just (foldable.slice (0, -1)) : Nothing;
    }
    const empty = Z.empty (foldable.constructor);
    return Z.map (
      Pair.snd,
      Z.reduce (
        (m, x) => {
          const xs = m.isNothing ? empty : Z.append (m.value.fst, m.value.snd);
          return Just (Pair (x) (xs));
        },
        Nothing,
        foldable
      )
    );
  };
  _.init = {
    consts: {f: [Applicative, Foldable, Monoid]},
    types: (f => a => [f (a), $.Maybe (f (a))])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: init,
  };

  //# take :: (Applicative f, Foldable f, Monoid (f a)) => Integer -> f a -> Maybe (f a)
  //.
  //. Returns Just the first N elements of the given structure if N is
  //. non-negative and less than or equal to the size of the structure;
  //. Nothing otherwise.
  //.
  //. ```javascript
  //. > S.take (0) (['foo', 'bar'])
  //. Just ([])
  //.
  //. > S.take (1) (['foo', 'bar'])
  //. Just (['foo'])
  //.
  //. > S.take (2) (['foo', 'bar'])
  //. Just (['foo', 'bar'])
  //.
  //. > S.take (3) (['foo', 'bar'])
  //. Nothing
  //.
  //. > S.take (3) (Cons (1) (Cons (2) (Cons (3) (Cons (4) (Cons (5) (Nil))))))
  //. Just (Cons (1) (Cons (2) (Cons (3) (Nil))))
  //. ```
  const _takeDrop = (arrayCase, generalCase) => n => xs => {
    if (n < 0) return Nothing;

    //  Fast path for arrays.
    if (Array.isArray (xs)) {
      return n <= xs.length ? Just (arrayCase (n, xs)) : Nothing;
    }

    //  m :: Maybe (Pair Integer (f a))
    const m = Z.reduce (
      (m, x) => Z.map (([n, xs]) => Pair (n - 1) (generalCase (n, xs, x)), m),
      Just (Pair (n) (Z.empty (xs.constructor))),
      xs
    );
    return Z.map (Pair.snd, Z.reject (([n]) => n > 0, m));
  };
  const take = _takeDrop (
    (n, xs) => xs.slice (0, n),
    (n, xs, x) => n > 0 ? Z.append (x, xs) : xs
  );
  _.take = {
    consts: {f: [Applicative, Foldable, Monoid]},
    types: (f => a => [Integer, f (a), $.Maybe (f (a))])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: take,
  };

  //# drop :: (Applicative f, Foldable f, Monoid (f a)) => Integer -> f a -> Maybe (f a)
  //.
  //. Returns Just all but the first N elements of the given structure if
  //. N is non-negative and less than or equal to the size of the structure;
  //. Nothing otherwise.
  //.
  //. ```javascript
  //. > S.drop (0) (['foo', 'bar'])
  //. Just (['foo', 'bar'])
  //.
  //. > S.drop (1) (['foo', 'bar'])
  //. Just (['bar'])
  //.
  //. > S.drop (2) (['foo', 'bar'])
  //. Just ([])
  //.
  //. > S.drop (3) (['foo', 'bar'])
  //. Nothing
  //.
  //. > S.drop (3) (Cons (1) (Cons (2) (Cons (3) (Cons (4) (Cons (5) (Nil))))))
  //. Just (Cons (4) (Cons (5) (Nil)))
  //. ```
  const drop = _takeDrop (
    (n, xs) => xs.slice (n),
    (n, xs, x) => n > 0 ? xs : Z.append (x, xs)
  );
  _.drop = {
    consts: {f: [Applicative, Foldable, Monoid]},
    types: (f => a => [Integer, f (a), $.Maybe (f (a))])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: drop,
  };

  //# takeLast :: (Applicative f, Foldable f, Monoid (f a)) => Integer -> f a -> Maybe (f a)
  //.
  //. Returns Just the last N elements of the given structure if N is
  //. non-negative and less than or equal to the size of the structure;
  //. Nothing otherwise.
  //.
  //. ```javascript
  //. > S.takeLast (0) (['foo', 'bar'])
  //. Just ([])
  //.
  //. > S.takeLast (1) (['foo', 'bar'])
  //. Just (['bar'])
  //.
  //. > S.takeLast (2) (['foo', 'bar'])
  //. Just (['foo', 'bar'])
  //.
  //. > S.takeLast (3) (['foo', 'bar'])
  //. Nothing
  //.
  //. > S.takeLast (3) (Cons (1) (Cons (2) (Cons (3) (Cons (4) (Nil)))))
  //. Just (Cons (2) (Cons (3) (Cons (4) (Nil))))
  //. ```
  const takeLast = n => xs => Z.map (Z.reverse, take (n) (Z.reverse (xs)));
  _.takeLast = {
    consts: {f: [Applicative, Foldable, Monoid]},
    types: (f => a => [Integer, f (a), $.Maybe (f (a))])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: takeLast,
  };

  //# dropLast :: (Applicative f, Foldable f, Monoid (f a)) => Integer -> f a -> Maybe (f a)
  //.
  //. Returns Just all but the last N elements of the given structure if
  //. N is non-negative and less than or equal to the size of the structure;
  //. Nothing otherwise.
  //.
  //. ```javascript
  //. > S.dropLast (0) (['foo', 'bar'])
  //. Just (['foo', 'bar'])
  //.
  //. > S.dropLast (1) (['foo', 'bar'])
  //. Just (['foo'])
  //.
  //. > S.dropLast (2) (['foo', 'bar'])
  //. Just ([])
  //.
  //. > S.dropLast (3) (['foo', 'bar'])
  //. Nothing
  //.
  //. > S.dropLast (3) (Cons (1) (Cons (2) (Cons (3) (Cons (4) (Nil)))))
  //. Just (Cons (1) (Nil))
  //. ```
  const dropLast = n => xs => Z.map (Z.reverse, drop (n) (Z.reverse (xs)));
  _.dropLast = {
    consts: {f: [Applicative, Foldable, Monoid]},
    types: (f => a => [Integer, f (a), $.Maybe (f (a))])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: dropLast,
  };

  //# takeWhile :: (a -> Boolean) -> Array a -> Array a
  //.
  //. Discards the first element that does not satisfy the predicate,
  //. and all subsequent elements.
  //.
  //. See also [`dropWhile`](#dropWhile).
  //.
  //. ```javascript
  //. > S.takeWhile (S.odd) ([3, 3, 3, 7, 6, 3, 5, 4])
  //. [3, 3, 3, 7]
  //.
  //. > S.takeWhile (S.even) ([3, 3, 3, 7, 6, 3, 5, 4])
  //. []
  //. ```
  const takeWhile = pred => xs => {
    let idx = 0;
    while (idx < xs.length && pred (xs[idx])) idx += 1;
    return xs.slice (0, idx);
  };
  _.takeWhile = {
    consts: {},
    types: (a => [Predicate (a), $.Array (a), $.Array (a)])
           (TypeVariable ('a')),
    impl: takeWhile,
  };

  //# dropWhile :: (a -> Boolean) -> Array a -> Array a
  //.
  //. Retains the first element that does not satisfy the predicate,
  //. and all subsequent elements.
  //.
  //. See also [`takeWhile`](#takeWhile).
  //.
  //. ```javascript
  //. > S.dropWhile (S.odd) ([3, 3, 3, 7, 6, 3, 5, 4])
  //. [6, 3, 5, 4]
  //.
  //. > S.dropWhile (S.even) ([3, 3, 3, 7, 6, 3, 5, 4])
  //. [3, 3, 3, 7, 6, 3, 5, 4]
  //. ```
  const dropWhile = pred => xs => {
    let idx = 0;
    while (idx < xs.length && pred (xs[idx])) idx += 1;
    return xs.slice (idx);
  };
  _.dropWhile = {
    consts: {},
    types: (a => [Predicate (a), $.Array (a), $.Array (a)])
           (TypeVariable ('a')),
    impl: dropWhile,
  };

  //# size :: Foldable f => f a -> NonNegativeInteger
  //.
  //. Returns the number of elements of the given structure.
  //.
  //. ```javascript
  //. > S.size ([])
  //. 0
  //.
  //. > S.size (['foo', 'bar', 'baz'])
  //. 3
  //.
  //. > S.size (Nil)
  //. 0
  //.
  //. > S.size (Cons ('foo') (Cons ('bar') (Cons ('baz') (Nil))))
  //. 3
  //.
  //. > S.size (S.Nothing)
  //. 0
  //.
  //. > S.size (S.Just ('quux'))
  //. 1
  //.
  //. > S.size (S.Pair ('ignored!') ('counted!'))
  //. 1
  //. ```
  _.size = {
    consts: {f: [Foldable]},
    types: (f => a => [f (a), NonNegativeInteger])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: Z.size,
  };

  //# all :: Foldable f => (a -> Boolean) -> f a -> Boolean
  //.
  //. Returns `true` [iff][] all the elements of the structure satisfy the
  //. predicate.
  //.
  //. See also [`any`](#any) and [`none`](#none).
  //.
  //. ```javascript
  //. > S.all (S.odd) ([])
  //. true
  //.
  //. > S.all (S.odd) ([1, 3, 5])
  //. true
  //.
  //. > S.all (S.odd) ([1, 2, 3])
  //. false
  //. ```
  _.all = {
    consts: {f: [Foldable]},
    types: (f => a => [Predicate (a), f (a), $.Boolean])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: curry2 (Z.all),
  };

  //# any :: Foldable f => (a -> Boolean) -> f a -> Boolean
  //.
  //. Returns `true` [iff][] any element of the structure satisfies the
  //. predicate.
  //.
  //. See also [`all`](#all) and [`none`](#none).
  //.
  //. ```javascript
  //. > S.any (S.odd) ([])
  //. false
  //.
  //. > S.any (S.odd) ([2, 4, 6])
  //. false
  //.
  //. > S.any (S.odd) ([1, 2, 3])
  //. true
  //. ```
  _.any = {
    consts: {f: [Foldable]},
    types: (f => a => [Predicate (a), f (a), $.Boolean])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: curry2 (Z.any),
  };

  //# none :: Foldable f => (a -> Boolean) -> f a -> Boolean
  //.
  //. Returns `true` [iff][] none of the elements of the structure satisfies
  //. the predicate.
  //.
  //. Properties:
  //.
  //.   - `forall p :: a -> Boolean, xs :: Foldable f => f a.
  //.      S.none (p) (xs) = S.not (S.any (p) (xs))`
  //.
  //.   - `forall p :: a -> Boolean, xs :: Foldable f => f a.
  //.      S.none (p) (xs) = S.all (S.complement (p)) (xs)`
  //.
  //. See also [`all`](#all) and [`any`](#any).
  //.
  //. ```javascript
  //. > S.none (S.odd) ([])
  //. true
  //.
  //. > S.none (S.odd) ([2, 4, 6])
  //. true
  //.
  //. > S.none (S.odd) ([1, 2, 3])
  //. false
  //. ```
  _.none = {
    consts: {f: [Foldable]},
    types: (f => a => [Predicate (a), f (a), $.Boolean])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: curry2 (Z.none),
  };

  //# append :: (Applicative f, Semigroup (f a)) => a -> f a -> f a
  //.
  //. Returns the result of appending the first argument to the second.
  //.
  //. See also [`prepend`](#prepend).
  //.
  //. ```javascript
  //. > S.append (3) ([1, 2])
  //. [1, 2, 3]
  //.
  //. > S.append (3) (Cons (1) (Cons (2) (Nil)))
  //. Cons (1) (Cons (2) (Cons (3) (Nil)))
  //.
  //. > S.append ([1]) (S.Nothing)
  //. Just ([1])
  //.
  //. > S.append ([3]) (S.Just ([1, 2]))
  //. Just ([1, 2, 3])
  //. ```
  _.append = {
    consts: {f: [Applicative, Semigroup]},
    types: (f => a => [a, f (a), f (a)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: curry2 (Z.append),
  };

  //# prepend :: (Applicative f, Semigroup (f a)) => a -> f a -> f a
  //.
  //. Returns the result of prepending the first argument to the second.
  //.
  //. See also [`append`](#append).
  //.
  //. ```javascript
  //. > S.prepend (1) ([2, 3])
  //. [1, 2, 3]
  //.
  //. > S.prepend (1) (Cons (2) (Cons (3) (Nil)))
  //. Cons (1) (Cons (2) (Cons (3) (Nil)))
  //.
  //. > S.prepend ([1]) (S.Nothing)
  //. Just ([1])
  //.
  //. > S.prepend ([1]) (S.Just ([2, 3]))
  //. Just ([1, 2, 3])
  //. ```
  _.prepend = {
    consts: {f: [Applicative, Semigroup]},
    types: (f => a => [a, f (a), f (a)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: curry2 (Z.prepend),
  };

  //# joinWith :: String -> Array String -> String
  //.
  //. Joins the strings of the second argument separated by the first argument.
  //.
  //. Properties:
  //.
  //.   - `forall s :: String, t :: String.
  //.      S.joinWith (s) (S.splitOn (s) (t)) = t`
  //.
  //. See also [`splitOn`](#splitOn) and [`intercalate`](#intercalate).
  //.
  //. ```javascript
  //. > S.joinWith (':') (['foo', 'bar', 'baz'])
  //. 'foo:bar:baz'
  //. ```
  const joinWith = separator => ss => ss.join (separator);
  _.joinWith = {
    consts: {},
    types: [$.String, $.Array ($.String), $.String],
    impl: joinWith,
  };

  //# elem :: (Setoid a, Foldable f) => a -> f a -> Boolean
  //.
  //. Takes a value and a structure and returns `true` [iff][] the value is an
  //. element of the structure.
  //.
  //. See also [`find`](#find).
  //.
  //. ```javascript
  //. > S.elem ('c') (['a', 'b', 'c'])
  //. true
  //.
  //. > S.elem ('x') (['a', 'b', 'c'])
  //. false
  //.
  //. > S.elem (3) ({x: 1, y: 2, z: 3})
  //. true
  //.
  //. > S.elem (8) ({x: 1, y: 2, z: 3})
  //. false
  //.
  //. > S.elem (0) (S.Just (0))
  //. true
  //.
  //. > S.elem (0) (S.Just (1))
  //. false
  //.
  //. > S.elem (0) (S.Nothing)
  //. false
  //. ```
  _.elem = {
    consts: {a: [Setoid], f: [Foldable]},
    types: (f => a => [a, f (a), $.Boolean])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: curry2 (Z.elem),
  };

  //# find :: Foldable f => (a -> Boolean) -> f a -> Maybe a
  //.
  //. Takes a predicate and a structure and returns Just the leftmost element
  //. of the structure that satisfies the predicate; Nothing if there is no
  //. such element.
  //.
  //. See also [`findMap`](#findMap) and [`elem`](#elem).
  //.
  //. ```javascript
  //. > S.find (S.lt (0)) ([1, -2, 3, -4, 5])
  //. Just (-2)
  //.
  //. > S.find (S.lt (0)) ([1, 2, 3, 4, 5])
  //. Nothing
  //. ```
  const find = pred => findMap (x => pred (x) ? Just (x) : Nothing);
  _.find = {
    consts: {f: [Foldable]},
    types: (f => a => [Predicate (a), f (a), $.Maybe (a)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: find,
  };

  //# findMap :: Foldable f => (a -> Maybe b) -> f a -> Maybe b
  //.
  //. Finds the leftmost element of the given structure for which the given
  //. function returns a Just, and returns that Just (or Nothing if none of
  //. the elements matches).
  //.
  //. More flexible than [`find`](#find), and more convenient in situations
  //. in which the result of a successful computation can be reused.
  //.
  //. ```javascript
  //. > S.findMap (S.parseInt (16)) ([])
  //. Nothing
  //.
  //. > S.findMap (S.parseInt (16)) (['X', 'Y', 'Z'])
  //. Nothing
  //.
  //. > S.findMap (S.parseInt (16)) (['A', 'B', 'C'])
  //. Just (10)
  //. ```
  const findMap = f => xs => (
    Z.reduce ((m, x) => m.isJust ? m : f (x), Nothing, xs)
  );
  _.findMap = {
    consts: {f: [Foldable]},
    types: (f => a => b => [Fn (a) ($.Maybe (b)), f (a), $.Maybe (b)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: findMap,
  };

  //# intercalate :: (Monoid m, Foldable f) => m -> f m -> m
  //.
  //. Curried version of [`Z.intercalate`][]. Concatenates the elements of
  //. the given structure, separating each pair of adjacent elements with
  //. the given separator.
  //.
  //. See also [`joinWith`](#joinWith).
  //.
  //. ```javascript
  //. > S.intercalate (', ') ([])
  //. ''
  //.
  //. > S.intercalate (', ') (['foo', 'bar', 'baz'])
  //. 'foo, bar, baz'
  //.
  //. > S.intercalate (', ') (Nil)
  //. ''
  //.
  //. > S.intercalate (', ') (Cons ('foo') (Cons ('bar') (Cons ('baz') (Nil))))
  //. 'foo, bar, baz'
  //.
  //. > S.intercalate ([0, 0, 0]) ([])
  //. []
  //.
  //. > S.intercalate ([0, 0, 0]) ([[1], [2, 3], [4, 5, 6], [7, 8], [9]])
  //. [1, 0, 0, 0, 2, 3, 0, 0, 0, 4, 5, 6, 0, 0, 0, 7, 8, 0, 0, 0, 9]
  //. ```
  _.intercalate = {
    consts: {a: [Monoid], f: [Foldable]},
    types: (f => a => [a, f (a), a])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: curry2 (Z.intercalate),
  };

  //# foldMap :: (Monoid m, Foldable f) => TypeRep m -> (a -> m) -> f a -> m
  //.
  //. Curried version of [`Z.foldMap`][]. Deconstructs a foldable by mapping
  //. every element to a monoid and concatenating the results.
  //.
  //. ```javascript
  //. > S.foldMap (String) (f => f.name) ([Math.sin, Math.cos, Math.tan])
  //. 'sincostan'
  //.
  //. > S.foldMap (Array) (x => [x + 1, x + 2]) ([10, 20, 30])
  //. [11, 12, 21, 22, 31, 32]
  //. ```
  _.foldMap = {
    consts: {b: [Monoid], f: [Foldable]},
    types: (f => a => b => [TypeRep (b), Fn (a) (b), f (a), b])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: curry3 (Z.foldMap),
  };

  //# unfold :: (b -> Maybe (Pair a b)) -> b -> Array a
  //.
  //. Takes a function and a seed value, and returns an array generated by
  //. applying the function repeatedly. The array is initially empty. The
  //. function is initially applied to the seed value. Each application
  //. of the function should result in either:
  //.
  //.   - Nothing, in which case the array is returned; or
  //.
  //.   - Just a pair, in which case the first element is appended to
  //.     the array and the function is applied to the second element.
  //.
  //. ```javascript
  //. > S.unfold (n => n < 1000 ? S.Just (S.Pair (n) (2 * n)) : S.Nothing) (1)
  //. [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]
  //. ```
  const unfold = f => x => {
    const result = [];
    for (let m = f (x); m.isJust;) {
      const [fst, snd] = m.value;
      result.push (fst);
      m = f (snd);
    }
    return result;
  };
  _.unfold = {
    consts: {},
    types: (a => b => [Fn (b) ($.Maybe ($.Pair (a) (b))), b, $.Array (a)])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: unfold,
  };

  //# range :: Integer -> Integer -> Array Integer
  //.
  //. Returns an array of consecutive integers starting with the first argument
  //. and ending with the second argument minus one. Returns `[]` if the second
  //. argument is less than or equal to the first argument.
  //.
  //. ```javascript
  //. > S.range (0) (10)
  //. [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  //.
  //. > S.range (-5) (0)
  //. [-5, -4, -3, -2, -1]
  //.
  //. > S.range (0) (-5)
  //. []
  //. ```
  const range = from => to => {
    const result = [];
    for (let n = from; n < to; n += 1) result.push (n);
    return result;
  };
  _.range = {
    consts: {},
    types: [Integer, Integer, $.Array (Integer)],
    impl: range,
  };

  //# groupBy :: (a -> a -> Boolean) -> Array a -> Array (Array a)
  //.
  //. Splits its array argument into an array of arrays of equal,
  //. adjacent elements. Equality is determined by the function
  //. provided as the first argument. Its behaviour can be surprising
  //. for functions that aren't reflexive, transitive, and symmetric
  //. (see [equivalence][] relation).
  //.
  //. Properties:
  //.
  //.   - `forall f :: a -> a -> Boolean, xs :: Array a.
  //.      S.join (S.groupBy (f) (xs)) = xs`
  //.
  //. ```javascript
  //. > S.groupBy (S.equals) ([1, 1, 2, 1, 1])
  //. [[1, 1], [2], [1, 1]]
  //.
  //. > S.groupBy (x => y => x + y === 0) ([2, -3, 3, 3, 3, 4, -4, 4])
  //. [[2], [-3, 3, 3, 3], [4, -4], [4]]
  //. ```
  const groupBy = f => xs => {
    if (xs.length === 0) return [];
    let x0 = xs[0];           // :: a
    let active = [x0];        // :: Array a
    const result = [active];  // :: Array (Array a)
    for (let idx = 1; idx < xs.length; idx += 1) {
      const x = xs[idx];
      if (f (x0) (x)) active.push (x); else result.push (active = [x0 = x]);
    }
    return result;
  };
  _.groupBy = {
    consts: {},
    types: (a => [Fn (a) (Predicate (a)), $.Array (a), $.Array ($.Array (a))])
           (TypeVariable ('a')),
    impl: groupBy,
  };

  //# reverse :: (Applicative f, Foldable f, Monoid (f a)) => f a -> f a
  //.
  //. Reverses the elements of the given structure.
  //.
  //. ```javascript
  //. > S.reverse ([1, 2, 3])
  //. [3, 2, 1]
  //.
  //. > S.reverse (Cons (1) (Cons (2) (Cons (3) (Nil))))
  //. Cons (3) (Cons (2) (Cons (1) (Nil)))
  //.
  //. > S.pipe ([S.splitOn (''), S.reverse, S.joinWith ('')]) ('abc')
  //. 'cba'
  //. ```
  _.reverse = {
    consts: {f: [Applicative, Foldable, Monoid]},
    types: (f => a => [f (a), f (a)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: Z.reverse,
  };

  //# sort :: (Ord a, Applicative m, Foldable m, Monoid (m a)) => m a -> m a
  //.
  //. Performs a [stable sort][] of the elements of the given structure, using
  //. [`Z.lte`][] for comparisons.
  //.
  //. Properties:
  //.
  //.   - `S.sort (S.sort (m)) = S.sort (m)` (idempotence)
  //.
  //. See also [`sortBy`](#sortBy).
  //.
  //. ```javascript
  //. > S.sort (['foo', 'bar', 'baz'])
  //. ['bar', 'baz', 'foo']
  //.
  //. > S.sort ([S.Left (4), S.Right (3), S.Left (2), S.Right (1)])
  //. [Left (2), Left (4), Right (1), Right (3)]
  //. ```
  _.sort = {
    consts: {a: [Ord], m: [Applicative, Foldable, Monoid]},
    types: (m => a => [m (a), m (a)])
           (UnaryTypeVariable ('m'))
           (TypeVariable ('a')),
    impl: Z.sort,
  };

  //# sortBy :: (Ord b, Applicative m, Foldable m, Monoid (m a)) => (a -> b) -> m a -> m a
  //.
  //. Performs a [stable sort][] of the elements of the given structure, using
  //. [`Z.lte`][] to compare the values produced by applying the given function
  //. to each element of the structure.
  //.
  //. Properties:
  //.
  //.   - `S.sortBy (f) (S.sortBy (f) (m)) = S.sortBy (f) (m)` (idempotence)
  //.
  //. See also [`sort`](#sort).
  //.
  //. ```javascript
  //. > S.sortBy (S.prop ('rank')) ([
  //. .   {rank: 7, suit: 'spades'},
  //. .   {rank: 5, suit: 'hearts'},
  //. .   {rank: 2, suit: 'hearts'},
  //. .   {rank: 5, suit: 'spades'},
  //. . ])
  //. [ {rank: 2, suit: 'hearts'},
  //. . {rank: 5, suit: 'hearts'},
  //. . {rank: 5, suit: 'spades'},
  //. . {rank: 7, suit: 'spades'} ]
  //.
  //. > S.sortBy (S.prop ('suit')) ([
  //. .   {rank: 7, suit: 'spades'},
  //. .   {rank: 5, suit: 'hearts'},
  //. .   {rank: 2, suit: 'hearts'},
  //. .   {rank: 5, suit: 'spades'},
  //. . ])
  //. [ {rank: 5, suit: 'hearts'},
  //. . {rank: 2, suit: 'hearts'},
  //. . {rank: 7, suit: 'spades'},
  //. . {rank: 5, suit: 'spades'} ]
  //. ```
  //.
  //. If descending order is desired, one may use [`Descending`][]:
  //.
  //. ```javascript
  //. > S.sortBy (Descending) ([83, 97, 110, 99, 116, 117, 97, 114, 121])
  //. [121, 117, 116, 114, 110, 99, 97, 97, 83]
  //. ```
  _.sortBy = {
    consts: {b: [Ord], m: [Applicative, Foldable, Monoid]},
    types: (m => a => b => [Fn (a) (b), m (a), m (a)])
           (UnaryTypeVariable ('m'))
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: curry2 (Z.sortBy),
  };

  //# zip :: Array a -> Array b -> Array (Pair a b)
  //.
  //. Returns an array of pairs of corresponding elements from the given
  //. arrays. The length of the resulting array is equal to the length of
  //. the shorter input array.
  //.
  //. See also [`zipWith`](#zipWith).
  //.
  //. ```javascript
  //. > S.zip (['a', 'b']) (['x', 'y', 'z'])
  //. [Pair ('a') ('x'), Pair ('b') ('y')]
  //.
  //. > S.zip ([1, 3, 5]) ([2, 4])
  //. [Pair (1) (2), Pair (3) (4)]
  //. ```
  const zip = xs => ys => zipWith (Pair) (xs) (ys);
  _.zip = {
    consts: {},
    types: (a => b => [$.Array (a), $.Array (b), $.Array ($.Pair (a) (b))])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: zip,
  };

  //# zipWith :: (a -> b -> c) -> Array a -> Array b -> Array c
  //.
  //. Returns the result of combining, pairwise, the given arrays using the
  //. given binary function. The length of the resulting array is equal to the
  //. length of the shorter input array.
  //.
  //. See also [`zip`](#zip).
  //.
  //. ```javascript
  //. > S.zipWith (a => b => a + b) (['a', 'b']) (['x', 'y', 'z'])
  //. ['ax', 'by']
  //.
  //. > S.zipWith (a => b => [a, b]) ([1, 3, 5]) ([2, 4])
  //. [[1, 2], [3, 4]]
  //. ```
  const zipWith = f => xs => ys => {
    const result = [];
    const len = Math.min (xs.length, ys.length);
    for (let idx = 0; idx < len; idx += 1) result.push (f (xs[idx]) (ys[idx]));
    return result;
  };
  _.zipWith = {
    consts: {},
    types: (a => b => c =>
              [Fn (a) (Fn (b) (c)), $.Array (a), $.Array (b), $.Array (c)])
           (TypeVariable ('a'))
           (TypeVariable ('b'))
           (TypeVariable ('c')),
    impl: zipWith,
  };

  //. ### Object

  //# prop :: String -> a -> b
  //.
  //. Takes a property name and an object with known properties and returns
  //. the value of the specified property. If for some reason the object
  //. lacks the specified property, a type error is thrown.
  //.
  //. For accessing properties of uncertain objects, use [`get`](#get) instead.
  //. For accessing string map values by key, use [`value`](#value) instead.
  //.
  //. ```javascript
  //. > S.prop ('a') ({a: 1, b: 2})
  //. 1
  //. ```
  const prop = key => x => {
    const obj = toObject (x);
    if (key in obj) return obj[key];
    throw new TypeError ('‘prop’ expected object to have a property named ' +
                         '‘' + key + '’; ' + show (x) + ' does not');
  };
  _.prop = {
    consts: {},
    types: (a => b => [$.String, a, b])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: prop,
  };

  //# props :: Array String -> a -> b
  //.
  //. Takes a property path (an array of property names) and an object with
  //. known structure and returns the value at the given path. If for some
  //. reason the path does not exist, a type error is thrown.
  //.
  //. For accessing property paths of uncertain objects, use [`gets`](#gets)
  //. instead.
  //.
  //. ```javascript
  //. > S.props (['a', 'b', 'c']) ({a: {b: {c: 1}}})
  //. 1
  //. ```
  const props = path => x => (
    path.reduce ((x, key) => {
      const obj = toObject (x);
      if (key in obj) return obj[key];
      throw new TypeError ('‘props’ expected object to have a property at ' +
                           show (path) + '; ' + show (x) + ' does not');
    }, x)
  );
  _.props = {
    consts: {},
    types: (a => b => [$.Array ($.String), a, b])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: props,
  };

  //# get :: (Any -> Boolean) -> String -> a -> Maybe b
  //.
  //. Takes a predicate, a property name, and an object and returns Just the
  //. value of the specified object property if it exists and the value
  //. satisfies the given predicate; Nothing otherwise.
  //.
  //. See also [`gets`](#gets), [`prop`](#prop), and [`value`](#value).
  //.
  //. ```javascript
  //. > S.get (S.is ($.Number)) ('x') ({x: 1, y: 2})
  //. Just (1)
  //.
  //. > S.get (S.is ($.Number)) ('x') ({x: '1', y: '2'})
  //. Nothing
  //.
  //. > S.get (S.is ($.Number)) ('x') ({})
  //. Nothing
  //.
  //. > S.get (S.is ($.Array ($.Number))) ('x') ({x: [1, 2, 3]})
  //. Just ([1, 2, 3])
  //.
  //. > S.get (S.is ($.Array ($.Number))) ('x') ({x: [1, 2, 3, null]})
  //. Nothing
  //. ```
  const get = pred => name => x => (
    Z.filter (pred, get_ (name) (x))
  );
  _.get = {
    consts: {},
    types: (a => b => [Predicate (Any), $.String, a, $.Maybe (b)])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: get,
  };

  //# gets :: (Any -> Boolean) -> Array String -> a -> Maybe b
  //.
  //. Takes a predicate, a property path (an array of property names), and
  //. an object and returns Just the value at the given path if such a path
  //. exists and the value satisfies the given predicate; Nothing otherwise.
  //.
  //. See also [`get`](#get).
  //.
  //. ```javascript
  //. > S.gets (S.is ($.Number)) (['a', 'b', 'c']) ({a: {b: {c: 42}}})
  //. Just (42)
  //.
  //. > S.gets (S.is ($.Number)) (['a', 'b', 'c']) ({a: {b: {c: '42'}}})
  //. Nothing
  //.
  //. > S.gets (S.is ($.Number)) (['a', 'b', 'c']) ({})
  //. Nothing
  //. ```
  const gets = pred => names => x => (
    Z.filter (
      pred,
      names.reduce ((maybe, name) => Z.chain (get_ (name), maybe), Just (x))
    )
  );
  _.gets = {
    consts: {},
    types: (a => b => [Predicate (Any), $.Array ($.String), a, $.Maybe (b)])
           (TypeVariable ('a'))
           (TypeVariable ('b')),
    impl: gets,
  };

  //. ### StrMap
  //.
  //. StrMap is an abbreviation of _string map_. A string map is an object,
  //. such as `{foo: 1, bar: 2, baz: 3}`, whose values are all members of
  //. the same type. Formally, a value is a member of type `StrMap a` if its
  //. [type identifier][] is `'Object'` and the values of its enumerable own
  //. properties are all members of type `a`.

  //# value :: String -> StrMap a -> Maybe a
  //.
  //. Retrieve the value associated with the given key in the given string map.
  //.
  //. Formally, `value (k) (m)` evaluates to `Just (m[k])` if `k` is an
  //. enumerable own property of `m`; `Nothing` otherwise.
  //.
  //. See also [`prop`](#prop) and [`get`](#get).
  //.
  //. ```javascript
  //. > S.value ('foo') ({foo: 1, bar: 2})
  //. Just (1)
  //.
  //. > S.value ('bar') ({foo: 1, bar: 2})
  //. Just (2)
  //.
  //. > S.value ('baz') ({foo: 1, bar: 2})
  //. Nothing
  //. ```
  const value = key => strMap => (
    Object.prototype.propertyIsEnumerable.call (strMap, key) ?
    Just (strMap[key]) :
    Nothing
  );
  _.value = {
    consts: {},
    types: (a => [$.String, StrMap (a), $.Maybe (a)])
           (TypeVariable ('a')),
    impl: value,
  };

  //# singleton :: String -> a -> StrMap a
  //.
  //. Takes a string and a value of any type, and returns a string map with
  //. a single entry (mapping the key to the value).
  //.
  //. ```javascript
  //. > S.singleton ('foo') (42)
  //. {foo: 42}
  //. ```
  const singleton = key => val => {
    const strMap = {};
    strMap[key] = val;
    return strMap;
  };
  _.singleton = {
    consts: {},
    types: (a => [$.String, a, StrMap (a)])
           (TypeVariable ('a')),
    impl: singleton,
  };

  //# insert :: String -> a -> StrMap a -> StrMap a
  //.
  //. Takes a string, a value of any type, and a string map, and returns a
  //. string map comprising all the entries of the given string map plus the
  //. entry specified by the first two arguments (which takes precedence).
  //.
  //. Equivalent to Haskell's `insert` function. Similar to Clojure's `assoc`
  //. function.
  //.
  //. ```javascript
  //. > S.insert ('c') (3) ({a: 1, b: 2})
  //. {a: 1, b: 2, c: 3}
  //.
  //. > S.insert ('a') (4) ({a: 1, b: 2})
  //. {a: 4, b: 2}
  //. ```
  const insert = key => val => strMap => (
    Z.concat (strMap, singleton (key) (val))
  );
  _.insert = {
    consts: {},
    types: (a => [$.String, a, StrMap (a), StrMap (a)])
           (TypeVariable ('a')),
    impl: insert,
  };

  //# remove :: String -> StrMap a -> StrMap a
  //.
  //. Takes a string and a string map, and returns a string map comprising all
  //. the entries of the given string map except the one whose key matches the
  //. given string (if such a key exists).
  //.
  //. Equivalent to Haskell's `delete` function. Similar to Clojure's `dissoc`
  //. function.
  //.
  //. ```javascript
  //. > S.remove ('c') ({a: 1, b: 2, c: 3})
  //. {a: 1, b: 2}
  //.
  //. > S.remove ('c') ({})
  //. {}
  //. ```
  const remove = key => strMap => {
    const result = Z.concat (strMap, {});
    delete result[key];
    return result;
  };
  _.remove = {
    consts: {},
    types: (a => [$.String, StrMap (a), StrMap (a)])
           (TypeVariable ('a')),
    impl: remove,
  };

  //# keys :: StrMap a -> Array String
  //.
  //. Returns the keys of the given string map, in arbitrary order.
  //.
  //. ```javascript
  //. > S.sort (S.keys ({b: 2, c: 3, a: 1}))
  //. ['a', 'b', 'c']
  //. ```
  _.keys = {
    consts: {},
    types: (a => [StrMap (a), $.Array ($.String)])
           (TypeVariable ('a')),
    impl: Object.keys,
  };

  //# values :: StrMap a -> Array a
  //.
  //. Returns the values of the given string map, in arbitrary order.
  //.
  //. ```javascript
  //. > S.sort (S.values ({a: 1, c: 3, b: 2}))
  //. [1, 2, 3]
  //. ```
  const values = strMap => Z.map (k => strMap[k], Object.keys (strMap));
  _.values = {
    consts: {},
    types: (a => [StrMap (a), $.Array (a)])
           (TypeVariable ('a')),
    impl: values,
  };

  //# pairs :: StrMap a -> Array (Pair String a)
  //.
  //. Returns the key–value pairs of the given string map, in arbitrary order.
  //.
  //. ```javascript
  //. > S.sort (S.pairs ({b: 2, a: 1, c: 3}))
  //. [Pair ('a') (1), Pair ('b') (2), Pair ('c') (3)]
  //. ```
  const pairs = strMap => (
    Z.map (k => Pair (k) (strMap[k]), Object.keys (strMap))
  );
  _.pairs = {
    consts: {},
    types: (a => [StrMap (a), $.Array ($.Pair ($.String) (a))])
           (TypeVariable ('a')),
    impl: pairs,
  };

  //# fromPairs :: Foldable f => f (Pair String a) -> StrMap a
  //.
  //. Returns a string map containing the key–value pairs specified by the
  //. given [Foldable][]. If a key appears in multiple pairs, the rightmost
  //. pair takes precedence.
  //.
  //. ```javascript
  //. > S.fromPairs ([S.Pair ('a') (1), S.Pair ('b') (2), S.Pair ('c') (3)])
  //. {a: 1, b: 2, c: 3}
  //.
  //. > S.fromPairs ([S.Pair ('x') (1), S.Pair ('x') (2)])
  //. {x: 2}
  //. ```
  const fromPairs = pairs => (
    Z.reduce ((strMap, [fst, snd]) => {
      strMap[fst] = snd;
      return strMap;
    }, {}, pairs)
  );
  _.fromPairs = {
    consts: {f: [Foldable]},
    types: (f => a => [f ($.Pair ($.String) (a)), StrMap (a)])
           (UnaryTypeVariable ('f'))
           (TypeVariable ('a')),
    impl: fromPairs,
  };

  //. ### Number

  //# negate :: ValidNumber -> ValidNumber
  //.
  //. Negates its argument.
  //.
  //. ```javascript
  //. > S.negate (12.5)
  //. -12.5
  //.
  //. > S.negate (-42)
  //. 42
  //. ```
  const negate = n => -n;
  _.negate = {
    consts: {},
    types: [$.ValidNumber, $.ValidNumber],
    impl: negate,
  };

  //# add :: FiniteNumber -> FiniteNumber -> FiniteNumber
  //.
  //. Returns the sum of two (finite) numbers.
  //.
  //. ```javascript
  //. > S.add (1) (1)
  //. 2
  //. ```
  const add = x => y => x + y;
  _.add = {
    consts: {},
    types: [$.FiniteNumber, $.FiniteNumber, $.FiniteNumber],
    impl: add,
  };

  //# sum :: Foldable f => f FiniteNumber -> FiniteNumber
  //.
  //. Returns the sum of the given array of (finite) numbers.
  //.
  //. ```javascript
  //. > S.sum ([1, 2, 3, 4, 5])
  //. 15
  //.
  //. > S.sum ([])
  //. 0
  //.
  //. > S.sum (S.Just (42))
  //. 42
  //.
  //. > S.sum (S.Nothing)
  //. 0
  //. ```
  _.sum = {
    consts: {f: [Foldable]},
    types: (f => [f ($.FiniteNumber), $.FiniteNumber])
           (UnaryTypeVariable ('f')),
    impl: reduce (add) (0),
  };

  //# sub :: FiniteNumber -> FiniteNumber -> FiniteNumber
  //.
  //. Takes a finite number `n` and returns the _subtract `n`_ function.
  //.
  //. ```javascript
  //. > S.map (S.sub (1)) ([1, 2, 3])
  //. [0, 1, 2]
  //. ```
  const sub = y => x => x - y;
  _.sub = {
    consts: {},
    types: [$.FiniteNumber, $.FiniteNumber, $.FiniteNumber],
    impl: sub,
  };

  //# mult :: FiniteNumber -> FiniteNumber -> FiniteNumber
  //.
  //. Returns the product of two (finite) numbers.
  //.
  //. ```javascript
  //. > S.mult (4) (2)
  //. 8
  //. ```
  const mult = x => y => x * y;
  _.mult = {
    consts: {},
    types: [$.FiniteNumber, $.FiniteNumber, $.FiniteNumber],
    impl: mult,
  };

  //# product :: Foldable f => f FiniteNumber -> FiniteNumber
  //.
  //. Returns the product of the given array of (finite) numbers.
  //.
  //. ```javascript
  //. > S.product ([1, 2, 3, 4, 5])
  //. 120
  //.
  //. > S.product ([])
  //. 1
  //.
  //. > S.product (S.Just (42))
  //. 42
  //.
  //. > S.product (S.Nothing)
  //. 1
  //. ```
  _.product = {
    consts: {f: [Foldable]},
    types: (f => [f ($.FiniteNumber), $.FiniteNumber])
           (UnaryTypeVariable ('f')),
    impl: reduce (mult) (1),
  };

  //# div :: NonZeroFiniteNumber -> FiniteNumber -> FiniteNumber
  //.
  //. Takes a non-zero finite number `n` and returns the _divide by `n`_
  //. function.
  //.
  //. ```javascript
  //. > S.map (S.div (2)) ([0, 1, 2, 3])
  //. [0, 0.5, 1, 1.5]
  //. ```
  const div = y => x => x / y;
  _.div = {
    consts: {},
    types: [$.NonZeroFiniteNumber, $.FiniteNumber, $.FiniteNumber],
    impl: div,
  };

  //# pow :: FiniteNumber -> FiniteNumber -> FiniteNumber
  //.
  //. Takes a finite number `n` and returns the _power of `n`_ function.
  //.
  //. ```javascript
  //. > S.map (S.pow (2)) ([-3, -2, -1, 0, 1, 2, 3])
  //. [9, 4, 1, 0, 1, 4, 9]
  //.
  //. > S.map (S.pow (0.5)) ([1, 4, 9, 16, 25])
  //. [1, 2, 3, 4, 5]
  //. ```
  const pow = exp => base => Math.pow (base, exp);
  _.pow = {
    consts: {},
    types: [$.FiniteNumber, $.FiniteNumber, $.FiniteNumber],
    impl: pow,
  };

  //. ### Integer

  //# even :: Integer -> Boolean
  //.
  //. Returns `true` if the given integer is even; `false` if it is odd.
  //.
  //. ```javascript
  //. > S.even (42)
  //. true
  //.
  //. > S.even (99)
  //. false
  //. ```
  const even = n => n % 2 === 0;
  _.even = {
    consts: {},
    types: [Integer, $.Boolean],
    impl: even,
  };

  //# odd :: Integer -> Boolean
  //.
  //. Returns `true` if the given integer is odd; `false` if it is even.
  //.
  //. ```javascript
  //. > S.odd (99)
  //. true
  //.
  //. > S.odd (42)
  //. false
  //. ```
  const odd = n => n % 2 !== 0;
  _.odd = {
    consts: {},
    types: [Integer, $.Boolean],
    impl: odd,
  };

  //. ### Parse

  //# parseDate :: String -> Maybe ValidDate
  //.
  //. Takes a string `s` and returns `Just (new Date (s))` if `new Date (s)`
  //. evaluates to a [`ValidDate`][ValidDate] value; Nothing otherwise.
  //.
  //. As noted in [#488][], this function's behaviour is unspecified for some
  //. inputs! [MDN][date parsing] warns against using the `Date` constructor
  //. to parse date strings:
  //.
  //. > __Note:__ parsing of date strings with the `Date` constructor […] is
  //. > strongly discouraged due to browser differences and inconsistencies.
  //. > Support for RFC 2822 format strings is by convention only. Support for
  //. > ISO 8601 formats differs in that date-only strings (e.g. "1970-01-01")
  //. > are treated as UTC, not local.
  //.
  //. ```javascript
  //. > S.parseDate ('2011-01-19T17:40:00Z')
  //. Just (new Date ('2011-01-19T17:40:00.000Z'))
  //.
  //. > S.parseDate ('today')
  //. Nothing
  //. ```
  const parseDate = s => {
    const date = new Date (s);
    return isNaN (date.valueOf ()) ? Nothing : Just (date);
  };
  _.parseDate = {
    consts: {},
    types: [$.String, $.Maybe ($.ValidDate)],
    impl: parseDate,
  };

  //  requiredNonCapturingGroup :: Array String -> String
  const requiredNonCapturingGroup = xs => '(?:' + xs.join ('|') + ')';

  //  optionalNonCapturingGroup :: Array String -> String
  const optionalNonCapturingGroup = xs => requiredNonCapturingGroup (xs) + '?';

  //  validFloatRepr :: RegExp
  const validFloatRepr = new RegExp (
    '^' +                     // start-of-string anchor
    '\\s*' +                  // any number of leading whitespace characters
    '[+-]?' +                 // optional sign
    requiredNonCapturingGroup ([
      'Infinity',             // "Infinity"
      'NaN',                  // "NaN"
      requiredNonCapturingGroup ([
        '[0-9]+',             // number
        '[0-9]+[.][0-9]+',    // number with interior decimal point
        '[0-9]+[.]',          // number with trailing decimal point
        '[.][0-9]+',          // number with leading decimal point
      ]) +
      optionalNonCapturingGroup ([
        '[Ee]' +              // "E" or "e"
        '[+-]?' +             // optional sign
        '[0-9]+',             // exponent
      ]),
    ]) +
    '\\s*' +                  // any number of trailing whitespace characters
    '$'                       // end-of-string anchor
  );

  //# parseFloat :: String -> Maybe Number
  //.
  //. Takes a string and returns Just the number represented by the string
  //. if it does in fact represent a number; Nothing otherwise.
  //.
  //. ```javascript
  //. > S.parseFloat ('-123.45')
  //. Just (-123.45)
  //.
  //. > S.parseFloat ('foo.bar')
  //. Nothing
  //. ```
  const parseFloat_ = s => (
    validFloatRepr.test (s) ? Just (parseFloat (s)) : Nothing
  );
  _.parseFloat = {
    consts: {},
    types: [$.String, $.Maybe ($.Number)],
    impl: parseFloat_,
  };

  //# parseInt :: Radix -> String -> Maybe Integer
  //.
  //. Takes a radix (an integer between 2 and 36 inclusive) and a string,
  //. and returns Just the number represented by the string if it does in
  //. fact represent a number in the base specified by the radix; Nothing
  //. otherwise.
  //.
  //. This function is stricter than [`parseInt`][parseInt]: a string
  //. is considered to represent an integer only if all its non-prefix
  //. characters are members of the character set specified by the radix.
  //.
  //. ```javascript
  //. > S.parseInt (10) ('-42')
  //. Just (-42)
  //.
  //. > S.parseInt (16) ('0xFF')
  //. Just (255)
  //.
  //. > S.parseInt (16) ('0xGG')
  //. Nothing
  //. ```
  const parseInt_ = radix => s => {
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice (0, radix);
    const pattern = new RegExp ('^[' + charset + ']+$', 'i');

    const t = s.replace (/^[+-]/, '');
    if (pattern.test (radix === 16 ? t.replace (/^0x/i, '') : t)) {
      const n = parseInt (s, radix);
      if ($.test ([]) (Integer) (n)) return Just (n);
    }
    return Nothing;
  };
  _.parseInt = {
    consts: {},
    types: (Radix => [Radix, $.String, $.Maybe (Integer)])
           (NullaryType ('Radix') ('') ([Integer]) (x => x >= 2 && x <= 36)),
    impl: parseInt_,
  };

  //# parseJson :: (Any -> Boolean) -> String -> Maybe a
  //.
  //. Takes a predicate and a string that may or may not be valid JSON, and
  //. returns Just the result of applying `JSON.parse` to the string *if* the
  //. result satisfies the predicate; Nothing otherwise.
  //.
  //. ```javascript
  //. > S.parseJson (S.is ($.Array ($.Integer))) ('[')
  //. Nothing
  //.
  //. > S.parseJson (S.is ($.Array ($.Integer))) ('["1","2","3"]')
  //. Nothing
  //.
  //. > S.parseJson (S.is ($.Array ($.Integer))) ('[0,1.5,3,4.5]')
  //. Nothing
  //.
  //. > S.parseJson (S.is ($.Array ($.Integer))) ('[1,2,3]')
  //. Just ([1, 2, 3])
  //. ```
  const parseJson = pred => s => (
    Z.filter (pred, either (K (Nothing)) (Just) (encase (JSON.parse) (s)))
  );
  _.parseJson = {
    consts: {},
    types: (a => [Predicate (Any), $.String, $.Maybe (a)])
           (TypeVariable ('a')),
    impl: parseJson,
  };

  //. ### RegExp


  //  toMaybe :: a? -> Maybe a
  const toMaybe = x => x == null ? Nothing : Just (x);

  //  withRegex :: (RegExp, () -> a) -> a
  const withRegex = (pattern, thunk) => {
    const lastIndex = pattern.lastIndex;
    const result = thunk ();
    pattern.lastIndex = lastIndex;
    return result;
  };

  //# regex :: RegexFlags -> String -> RegExp
  //.
  //. Takes a [RegexFlags][] and a pattern, and returns a RegExp.
  //.
  //. ```javascript
  //. > S.regex ('g') (':\\d+:')
  //. /:\d+:/g
  //. ```
  const regex = flags => source => new RegExp (source, flags);
  _.regex = {
    consts: {},
    types: [$.RegexFlags, $.String, $.RegExp],
    impl: regex,
  };

  //# regexEscape :: String -> String
  //.
  //. Takes a string that may contain regular expression metacharacters,
  //. and returns a string with those metacharacters escaped.
  //.
  //. Properties:
  //.
  //.   - `forall s :: String.
  //.      S.test (S.regex ('') (S.regexEscape (s))) (s) = true`
  //.
  //. ```javascript
  //. > S.regexEscape ('-=*{XYZ}*=-')
  //. '\\-=\\*\\{XYZ\\}\\*=\\-'
  //. ```
  const regexEscape = s => s.replace (/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  _.regexEscape = {
    consts: {},
    types: [$.String, $.String],
    impl: regexEscape,
  };

  //# test :: RegExp -> String -> Boolean
  //.
  //. Takes a pattern and a string, and returns `true` [iff][] the pattern
  //. matches the string.
  //.
  //. ```javascript
  //. > S.test (/^a/) ('abacus')
  //. true
  //.
  //. > S.test (/^a/) ('banana')
  //. false
  //. ```
  const test = pattern => s => withRegex (pattern, () => pattern.test (s));
  _.test = {
    consts: {},
    types: [$.RegExp, $.String, $.Boolean],
    impl: test,
  };

  //# match :: NonGlobalRegExp -> String -> Maybe (Array (Maybe String))
  //.
  //. Takes a pattern and a string, and returns Just an array of captured
  //. values if the pattern matches the string; Nothing otherwise.
  //.
  //. `Maybe String` acknowledges the existence of optional capturing groups.
  //.
  //. Properties:
  //.
  //.   - `forall p :: Pattern, s :: String.
  //.      S.head (S.matchAll (S.regex ('g') (p)) (s))
  //.      = S.match (S.regex ('') (p)) (s)`
  //.
  //. See also [`matchAll`](#matchAll).
  //.
  //. ```javascript
  //. > S.match (/^(.+[.].+?)(?::(.+))?$/) ('XXX')
  //. Nothing
  //.
  //. > S.match (/^(.+[.].+?)(?::(.+))?$/) ('example.com')
  //. Just ([Just ('example.com'), Nothing])
  //.
  //. > S.match (/^(.+[.].+?)(?::(.+))?$/) ('example.com:8888')
  //. Just ([Just ('example.com'), Just ('8888')])
  //. ```
  const match = pattern => s => (
    Z.map (m => Z.map (toMaybe, m.slice (1)), toMaybe (s.match (pattern)))
  );
  _.match = {
    consts: {},
    types: [$.NonGlobalRegExp,
            $.String,
            $.Maybe ($.Array ($.Maybe ($.String)))],
    impl: match,
  };

  //# matchAll :: GlobalRegExp -> String -> Array (Array (Maybe String))
  //.
  //. Takes a pattern and a string, and returns an array of arrays of captured
  //. values.
  //.
  //. `Maybe String` acknowledges the existence of optional capturing groups.
  //.
  //. See also [`match`](#match).
  //.
  //. ```javascript
  //. > S.matchAll (/@([a-z]+)/g) ('Hello, world!')
  //. []
  //.
  //. > S.matchAll (/@([a-z]+)/g) ('Hello, @foo! Hello, @bar! Hello, @baz!')
  //. [[Just ('foo')], [Just ('bar')], [Just ('baz')]]
  //. ```
  const matchAll = pattern => s => withRegex (
    pattern,
    () => (
      unfold (_ => Z.map (m => Pair (Z.map (toMaybe, m.slice (1))) (null),
                          toMaybe (pattern.exec (s))))
             ([])
    )
  );
  _.matchAll = {
    consts: {},
    types: [$.GlobalRegExp, $.String, $.Array ($.Array ($.Maybe ($.String)))],
    impl: matchAll,
  };

  //# replace :: (Array (Maybe String) -> String) -> RegExp -> String -> String
  //.
  //. Replaces occurrences of the given pattern within the given string
  //. in accordance with the given replacement function, which receives an
  //. array of captured values. Replaces all occurrences of the pattern if
  //. its `g` flag is set; just the first occurrence otherwise.
  //.
  //. ```javascript
  //. > S.replace (([$1]) => S.maybe ('') (S.toUpper) ($1)) (/(\w)/) ('foo')
  //. 'Foo'
  //.
  //. > S.replace (([$1]) => S.maybe ('') (S.toUpper) ($1)) (/(\w)/g) ('foo')
  //. 'FOO'
  //.
  //. > S.replace (S.show) (/(foo)(bar)?/) ('<>')
  //. '<>'
  //.
  //. > S.replace (S.show) (/(foo)(bar)?/) ('<foo>')
  //. '<[Just ("foo"), Nothing]>'
  //.
  //. > S.replace (S.show) (/(foo)(bar)?/) ('<foobar>')
  //. '<[Just ("foo"), Just ("bar")]>'
  //. ```
  const replace = substitute => pattern => text => (
    text.replace (pattern, (...args) => {
      const groups = [];
      let group, idx = 1;
      //  eslint-disable-next-line no-plusplus
      while (typeof (group = args[idx++]) !== 'number') {
        groups.push (group == null ? Nothing : Just (group));
      }
      return substitute (groups);
    })
  );
  _.replace = {
    consts: {},
    types: [Fn ($.Array ($.Maybe ($.String))) ($.String),
            $.RegExp,
            $.String,
            $.String],
    impl: replace,
  };

  //. ### String

  //# toUpper :: String -> String
  //.
  //. Returns the upper-case equivalent of its argument.
  //.
  //. See also [`toLower`](#toLower).
  //.
  //. ```javascript
  //. > S.toUpper ('ABC def 123')
  //. 'ABC DEF 123'
  //. ```
  const toUpper = s => s.toUpperCase ();
  _.toUpper = {
    consts: {},
    types: [$.String, $.String],
    impl: toUpper,
  };

  //# toLower :: String -> String
  //.
  //. Returns the lower-case equivalent of its argument.
  //.
  //. See also [`toUpper`](#toUpper).
  //.
  //. ```javascript
  //. > S.toLower ('ABC def 123')
  //. 'abc def 123'
  //. ```
  const toLower = s => s.toLowerCase ();
  _.toLower = {
    consts: {},
    types: [$.String, $.String],
    impl: toLower,
  };

  //# trim :: String -> String
  //.
  //. Strips leading and trailing whitespace characters.
  //.
  //. ```javascript
  //. > S.trim ('\t\t foo bar \n')
  //. 'foo bar'
  //. ```
  const trim = s => s.trim ();
  _.trim = {
    consts: {},
    types: [$.String, $.String],
    impl: trim,
  };

  //# stripPrefix :: String -> String -> Maybe String
  //.
  //. Returns Just the portion of the given string (the second argument) left
  //. after removing the given prefix (the first argument) if the string starts
  //. with the prefix; Nothing otherwise.
  //.
  //. See also [`stripSuffix`](#stripSuffix).
  //.
  //. ```javascript
  //. > S.stripPrefix ('https://') ('https://sanctuary.js.org')
  //. Just ('sanctuary.js.org')
  //.
  //. > S.stripPrefix ('https://') ('http://sanctuary.js.org')
  //. Nothing
  //. ```
  const stripPrefix = prefix => s => {
    const idx = prefix.length;
    return s.slice (0, idx) === prefix ? Just (s.slice (idx)) : Nothing;
  };
  _.stripPrefix = {
    consts: {},
    types: [$.String, $.String, $.Maybe ($.String)],
    impl: stripPrefix,
  };

  //# stripSuffix :: String -> String -> Maybe String
  //.
  //. Returns Just the portion of the given string (the second argument) left
  //. after removing the given suffix (the first argument) if the string ends
  //. with the suffix; Nothing otherwise.
  //.
  //. See also [`stripPrefix`](#stripPrefix).
  //.
  //. ```javascript
  //. > S.stripSuffix ('.md') ('README.md')
  //. Just ('README')
  //.
  //. > S.stripSuffix ('.md') ('README')
  //. Nothing
  //. ```
  const stripSuffix = suffix => s => {
    const idx = s.length - suffix.length;  // value may be negative
    return s.slice (idx) === suffix ? Just (s.slice (0, idx)) : Nothing;
  };
  _.stripSuffix = {
    consts: {},
    types: [$.String, $.String, $.Maybe ($.String)],
    impl: stripSuffix,
  };

  //# words :: String -> Array String
  //.
  //. Takes a string and returns the array of words the string contains
  //. (words are delimited by whitespace characters).
  //.
  //. See also [`unwords`](#unwords).
  //.
  //. ```javascript
  //. > S.words (' foo bar baz ')
  //. ['foo', 'bar', 'baz']
  //. ```
  const words = s => {
    const words = s.split (/\s+/);
    const len = words.length;
    return words.slice (words[0] === '' ? 1 : 0,
                        words[len - 1] === '' ? len - 1 : len);
  };
  _.words = {
    consts: {},
    types: [$.String, $.Array ($.String)],
    impl: words,
  };

  //# unwords :: Array String -> String
  //.
  //. Takes an array of words and returns the result of joining the words
  //. with separating spaces.
  //.
  //. See also [`words`](#words).
  //.
  //. ```javascript
  //. > S.unwords (['foo', 'bar', 'baz'])
  //. 'foo bar baz'
  //. ```
  const unwords = ss => ss.join (' ');
  _.unwords = {
    consts: {},
    types: [$.Array ($.String), $.String],
    impl: unwords,
  };

  //# lines :: String -> Array String
  //.
  //. Takes a string and returns the array of lines the string contains
  //. (lines are delimited by newlines: `'\n'` or `'\r\n'` or `'\r'`).
  //. The resulting strings do not contain newlines.
  //.
  //. See also [`unlines`](#unlines).
  //.
  //. ```javascript
  //. > S.lines ('foo\nbar\nbaz\n')
  //. ['foo', 'bar', 'baz']
  //. ```
  const lines = s => (
    s === '' ? [] : (s.replace (/\r\n?/g, '\n')).match (/^(?=[\s\S]).*/gm)
  );
  _.lines = {
    consts: {},
    types: [$.String, $.Array ($.String)],
    impl: lines,
  };

  //# unlines :: Array String -> String
  //.
  //. Takes an array of lines and returns the result of joining the lines
  //. after appending a terminating line feed (`'\n'`) to each.
  //.
  //. See also [`lines`](#lines).
  //.
  //. ```javascript
  //. > S.unlines (['foo', 'bar', 'baz'])
  //. 'foo\nbar\nbaz\n'
  //. ```
  const unlines = xs => xs.reduce ((s, x) => s + x + '\n', '');
  _.unlines = {
    consts: {},
    types: [$.Array ($.String), $.String],
    impl: unlines,
  };

  //# splitOn :: String -> String -> Array String
  //.
  //. Returns the substrings of its second argument separated by occurrences
  //. of its first argument.
  //.
  //. See also [`joinWith`](#joinWith) and [`splitOnRegex`](#splitOnRegex).
  //.
  //. ```javascript
  //. > S.splitOn ('::') ('foo::bar::baz')
  //. ['foo', 'bar', 'baz']
  //. ```
  const splitOn = separator => s => s.split (separator);
  _.splitOn = {
    consts: {},
    types: [$.String, $.String, $.Array ($.String)],
    impl: splitOn,
  };

  //# splitOnRegex :: GlobalRegExp -> String -> Array String
  //.
  //. Takes a pattern and a string, and returns the result of splitting the
  //. string at every non-overlapping occurrence of the pattern.
  //.
  //. Properties:
  //.
  //.   - `forall s :: String, t :: String.
  //.      S.joinWith (s)
  //.                 (S.splitOnRegex (S.regex ('g') (S.regexEscape (s))) (t))
  //.      = t`
  //.
  //. See also [`splitOn`](#splitOn).
  //.
  //. ```javascript
  //. > S.splitOnRegex (/[,;][ ]*/g) ('foo, bar, baz')
  //. ['foo', 'bar', 'baz']
  //.
  //. > S.splitOnRegex (/[,;][ ]*/g) ('foo;bar;baz')
  //. ['foo', 'bar', 'baz']
  //. ```
  const splitOnRegex = pattern => s => withRegex (
    pattern,
    () => {
      const result = [];
      let lastIndex = 0;
      let match;
      while ((match = pattern.exec (s)) != null) {
        if (pattern.lastIndex === lastIndex && match[0] === '') {
          if (pattern.lastIndex === s.length) return result;
          pattern.lastIndex += 1;
        } else {
          result.push (s.slice (lastIndex, match.index));
          lastIndex = match.index + match[0].length;
        }
      }
      result.push (s.slice (lastIndex));
      return result;
    }
  );
  _.splitOnRegex = {
    consts: {},
    types: [$.GlobalRegExp, $.String, $.Array ($.String)],
    impl: splitOnRegex,
  };

  return create ({
    checkTypes: typeof process === 'undefined'
                || process == null
                || process.env == null
                || process.env.NODE_ENV !== 'production',
    env: $.env,
  });

});

//. [#438]:                     https://github.com/sanctuary-js/sanctuary/issues/438
//. [#488]:                     https://github.com/sanctuary-js/sanctuary/issues/488
//. [Apply]:                    v:fantasyland/fantasy-land#apply
//. [Chain]:                    v:fantasyland/fantasy-land#chain
//. [Either]:                   #section:either
//. [Fantasy Land]:             v:fantasyland/fantasy-land
//. [Foldable]:                 v:fantasyland/fantasy-land#foldable
//. [Folktale]:                 https://folktale.origamitower.com/
//. [GIGO]:                     https://en.wikipedia.org/wiki/Garbage_in,_garbage_out
//. [Haskell]:                  https://www.haskell.org/
//. [Kleisli]:                  https://en.wikipedia.org/wiki/Kleisli_category
//. [Maybe]:                    #section:maybe
//. [Nullable]:                 v:sanctuary-js/sanctuary-def#Nullable
//. [PureScript]:               http://www.purescript.org/
//. [Ramda]:                    https://ramdajs.com/
//. [RegexFlags]:               v:sanctuary-js/sanctuary-def#RegexFlags
//. [Semigroupoid]:             v:fantasyland/fantasy-land#semigroupoid
//. [ValidDate]:                v:sanctuary-js/sanctuary-def#ValidDate
//. [`$.test`]:                 v:sanctuary-js/sanctuary-def#test
//. [`Descending`]:             v:sanctuary-js/sanctuary-descending#Descending
//. [`R.__`]:                   https://ramdajs.com/docs/#__
//. [`R.bind`]:                 https://ramdajs.com/docs/#bind
//. [`R.invoker`]:              https://ramdajs.com/docs/#invoker
//. [`Z.alt`]:                  v:sanctuary-js/sanctuary-type-classes#alt
//. [`Z.ap`]:                   v:sanctuary-js/sanctuary-type-classes#ap
//. [`Z.apFirst`]:              v:sanctuary-js/sanctuary-type-classes#apFirst
//. [`Z.apSecond`]:             v:sanctuary-js/sanctuary-type-classes#apSecond
//. [`Z.bimap`]:                v:sanctuary-js/sanctuary-type-classes#bimap
//. [`Z.chain`]:                v:sanctuary-js/sanctuary-type-classes#chain
//. [`Z.chainRec`]:             v:sanctuary-js/sanctuary-type-classes#chainRec
//. [`Z.compose`]:              v:sanctuary-js/sanctuary-type-classes#compose
//. [`Z.concat`]:               v:sanctuary-js/sanctuary-type-classes#concat
//. [`Z.contramap`]:            v:sanctuary-js/sanctuary-type-classes#contramap
//. [`Z.duplicate`]:            v:sanctuary-js/sanctuary-type-classes#duplicate
//. [`Z.empty`]:                v:sanctuary-js/sanctuary-type-classes#empty
//. [`Z.equals`]:               v:sanctuary-js/sanctuary-type-classes#equals
//. [`Z.extend`]:               v:sanctuary-js/sanctuary-type-classes#extend
//. [`Z.extract`]:              v:sanctuary-js/sanctuary-type-classes#extract
//. [`Z.filter`]:               v:sanctuary-js/sanctuary-type-classes#filter
//. [`Z.flip`]:                 v:sanctuary-js/sanctuary-type-classes#flip
//. [`Z.foldMap`]:              v:sanctuary-js/sanctuary-type-classes#foldMap
//. [`Z.gt`]:                   v:sanctuary-js/sanctuary-type-classes#gt
//. [`Z.gte`]:                  v:sanctuary-js/sanctuary-type-classes#gte
//. [`Z.id`]:                   v:sanctuary-js/sanctuary-type-classes#id
//. [`Z.intercalate`]:          v:sanctuary-js/sanctuary-type-classes#intercalate
//. [`Z.invert`]:               v:sanctuary-js/sanctuary-type-classes#invert
//. [`Z.join`]:                 v:sanctuary-js/sanctuary-type-classes#join
//. [`Z.lt`]:                   v:sanctuary-js/sanctuary-type-classes#lt
//. [`Z.lte`]:                  v:sanctuary-js/sanctuary-type-classes#lte
//. [`Z.map`]:                  v:sanctuary-js/sanctuary-type-classes#map
//. [`Z.mapLeft`]:              v:sanctuary-js/sanctuary-type-classes#mapLeft
//. [`Z.of`]:                   v:sanctuary-js/sanctuary-type-classes#of
//. [`Z.promap`]:               v:sanctuary-js/sanctuary-type-classes#promap
//. [`Z.reject`]:               v:sanctuary-js/sanctuary-type-classes#reject
//. [`Z.sequence`]:             v:sanctuary-js/sanctuary-type-classes#sequence
//. [`Z.traverse`]:             v:sanctuary-js/sanctuary-type-classes#traverse
//. [`Z.zero`]:                 v:sanctuary-js/sanctuary-type-classes#zero
//. [`show`]:                   v:sanctuary-js/sanctuary-show#show
//. [date parsing]:             https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
//. [equivalence]:              https://en.wikipedia.org/wiki/Equivalence_relation
//. [iff]:                      https://en.wikipedia.org/wiki/If_and_only_if
//. [parseInt]:                 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
//. [partial functions]:        https://en.wikipedia.org/wiki/Partial_function
//. [ramda/ramda#683]:          https://github.com/ramda/ramda/issues/683
//. [ramda/ramda#1413]:         https://github.com/ramda/ramda/issues/1413
//. [ramda/ramda#1419]:         https://github.com/ramda/ramda/pull/1419
//. [sanctuary-def]:            v:sanctuary-js/sanctuary-def
//. [sanctuary-either]:         v:sanctuary-js/sanctuary-either
//. [sanctuary-maybe]:          v:sanctuary-js/sanctuary-maybe
//. [sanctuary-pair]:           v:sanctuary-js/sanctuary-pair
//. [sanctuary-show]:           v:sanctuary-js/sanctuary-show
//. [sanctuary-type-classes]:   v:sanctuary-js/sanctuary-type-classes
//. [stable sort]:              https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
//. [thrush]:                   https://github.com/raganwald-deprecated/homoiconic/blob/master/2008-10-30/thrush.markdown
//. [total functions]:          https://en.wikipedia.org/wiki/Partial_function#Total_function
//. [type checking]:            #section:type-checking
//. [type identifier]:          v:sanctuary-js/sanctuary-type-identifiers
//. [type representative]:      v:fantasyland/fantasy-land#type-representatives
//. [variadic functions]:       https://en.wikipedia.org/wiki/Variadic_function
