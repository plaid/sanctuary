'use strict';

const S = require ('..');

const eq = require ('./internal/eq');


test ('mapLeft', () => {

  eq (S.show (S.mapLeft)) ('mapLeft :: Bifunctor f => (a -> b) -> f a c -> f b c');

  eq (S.mapLeft (S.toUpper) (S.Left ('xxx'))) (S.Left ('XXX'));
  eq (S.mapLeft (S.toUpper) (S.Right (1000))) (S.Right (1000));

});
