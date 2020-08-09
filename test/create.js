'use strict';

const $ = require ('sanctuary-def');

const S = require ('..');

const eq = require ('./internal/eq');
const throws = require ('./internal/throws');


//    FooTrue42 :: Type
const FooTrue42 = $.EnumType ('my-package/FooTrue42') ('') (['foo', true, 42]);

//    customEnv :: Array Type
const customEnv = S.env.concat ([FooTrue42]);

const checkedDefaultEnv   = S.create ({checkTypes: true, env: S.env});
const checkedCustomEnv    = S.create ({checkTypes: true, env: customEnv});
const uncheckedDefaultEnv = S.create ({checkTypes: false, env: S.env});
const uncheckedCustomEnv  = S.create ({checkTypes: false, env: customEnv});


test ('create', () => {

  eq (S.show (S.create)) ('create :: { checkTypes :: Boolean, env :: Array Type } -> Object');

  const expected = S.sort (Object.keys (S));
  eq (S.sort (Object.keys (checkedDefaultEnv))) (expected);
  eq (S.sort (Object.keys (checkedCustomEnv))) (expected);
  eq (S.sort (Object.keys (uncheckedDefaultEnv))) (expected);
  eq (S.sort (Object.keys (uncheckedCustomEnv))) (expected);

  eq (checkedDefaultEnv.env) (S.env);
  eq (checkedCustomEnv.env) (customEnv);
  eq (uncheckedDefaultEnv.env) (S.env);
  eq (uncheckedCustomEnv.env) (customEnv);

  eq (checkedDefaultEnv.unchecked.env) (S.env);
  eq (checkedCustomEnv.unchecked.env) (customEnv);
  eq (uncheckedDefaultEnv.unchecked.env) (S.env);
  eq (uncheckedCustomEnv.unchecked.env) (customEnv);

  eq (uncheckedDefaultEnv.add (1) (42)) (S.add (1) (42));
  eq (uncheckedDefaultEnv.add (1) ('XXX')) ('1XXX');

  throws (() => { S.I (['foo', 'foo', 42]); })
         (new TypeError ('Type-variable constraint violation\n' +
                         '\n' +
                         'I :: a -> a\n' +
                         '     ^\n' +
                         '     1\n' +
                         '\n' +
                         '1)  ["foo", "foo", 42] :: Array ???\n' +
                         '\n' +
                         'Since there is no type of which all the above values are members, the type-variable constraint has been violated.\n'));

  eq (checkedCustomEnv.I (['foo', 'foo', 42])) (['foo', 'foo', 42]);

});
