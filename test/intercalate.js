'use strict';

const S = require ('./internal/sanctuary');

const {Nil, Cons} = require ('./internal/List');
const eq = require ('./internal/eq');


test ('intercalate', () => {

  eq (S.show (S.intercalate)) ('intercalate :: (Foldable f, Monoid m) => m -> f m -> m');

  eq (S.intercalate (', ') ([])) ('');
  eq (S.intercalate (', ') (['foo'])) ('foo');
  eq (S.intercalate (', ') (['foo', 'bar'])) ('foo, bar');
  eq (S.intercalate (', ') (['foo', 'bar', 'baz'])) ('foo, bar, baz');
  eq (S.intercalate ([0, 0, 0]) ([])) ([]);
  eq (S.intercalate ([0, 0, 0]) ([[1]])) ([1]);
  eq (S.intercalate ([0, 0, 0]) ([[1], [2]])) ([1, 0, 0, 0, 2]);
  eq (S.intercalate ([0, 0, 0]) ([[1], [2], [3]])) ([1, 0, 0, 0, 2, 0, 0, 0, 3]);
  eq (S.intercalate ('.') (Nil)) ('');
  eq (S.intercalate ('.') (Cons ('x') (Nil))) ('x');
  eq (S.intercalate ('.') (Cons ('x') (Cons ('y') (Nil)))) ('x.y');
  eq (S.intercalate ('.') (Cons ('x') (Cons ('y') (Cons ('z') (Nil))))) ('x.y.z');

});
