import * as S from '..';

import eq from './internal/eq';


test('ifElse', () => {

  eq(typeof S.ifElse, 'function');
  eq(S.ifElse.length, 4);
  eq(S.ifElse.toString(), 'ifElse :: (a -> Boolean) -> (a -> b) -> (a -> b) -> a -> b');

  eq(S.ifElse(S.odd)(S.sub(1))(S.add(1))(9), 8);
  eq(S.ifElse(S.odd)(S.sub(1))(S.add(1))(0), 1);

});
