'use strict';

const S = require ('..');

const eq = require ('./internal/eq');


test ('maybeToLeft', () => {

  eq (S.show (S.maybeToLeft)) ('maybeToLeft :: b -> Maybe a -> Either a b');

  eq (S.maybeToLeft ('success msg') (S.Nothing)) (S.Right ('success msg'));
  eq (S.maybeToLeft ('success msg') (S.Just (42))) (S.Left (42));

});
