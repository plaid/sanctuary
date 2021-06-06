'use strict';

const S = require ('..');

const eq = require ('./internal/eq');


test ('rightToMaybe', () => {

  eq (S.show (S.rightToMaybe)) ('rightToMaybe :: Either a b -> Maybe b');

  eq (S.rightToMaybe (S.Left ('Cannot divide by zero'))) (S.Nothing);
  eq (S.rightToMaybe (S.Right (42))) (S.Just (42));

});
