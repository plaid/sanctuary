'use strict';

const S = require ('..');

const eq = require ('./internal/eq');


test ('leftToMaybe', () => {

  eq (S.show (S.leftToMaybe)) ('leftToMaybe :: Either a b -> Maybe a');

  eq (S.leftToMaybe (S.Left ('Cannot divide by zero'))) (S.Just ('Cannot divide by zero'));
  eq (S.leftToMaybe (S.Right (42))) (S.Nothing);

});
