'use strict';

const S = require ('..');

const eq = require ('./internal/eq');


test ('maybeToRight', () => {

  eq (S.show (S.maybeToRight)) ('maybeToRight :: a -> Maybe b -> Either a b');

  eq (S.maybeToRight ('error msg') (S.Nothing)) (S.Left ('error msg'));
  eq (S.maybeToRight ('error msg') (S.Just (42))) (S.Right (42));

});
