'use strict';

const S = require ('..');

const eq = require ('./internal/eq');


test ('bimap', () => {

  eq (S.show (S.bimap)) ('bimap :: Bifunctor f => (a -> b) -> (c -> d) -> f a c -> f b d');

  eq (S.bimap (S.toUpper) (S.add (1)) (S.Left ('xxx'))) (S.Left ('XXX'));
  eq (S.bimap (S.toUpper) (S.add (1)) (S.Right (1000))) (S.Right (1001));

});
