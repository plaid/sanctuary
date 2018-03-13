const jsc = require('jsverify');

import * as S from '..';

import eq from './internal/eq';


test('splitOn', () => {

  eq(typeof S.splitOn, 'function');
  eq(S.splitOn.length, 2);
  eq(S.splitOn.toString(), 'splitOn :: String -> String -> Array String');

  eq(S.splitOn('')('abc'), ['a', 'b', 'c']);
  eq(S.splitOn(':')(''), ['']);
  eq(S.splitOn(':')(':'), ['', '']);
  eq(S.splitOn(':')(':foo:'), ['', 'foo', '']);
  eq(S.splitOn(':')('foo:bar:baz'), ['foo', 'bar', 'baz']);
  eq(S.splitOn('::')('foo::bar::baz'), ['foo', 'bar', 'baz']);

  jsc.assert(jsc.forall(jsc.asciistring, function(t: string) {
    const min = 0;
    const max = t.length;
    const i = jsc.random(min, max);
    const j = jsc.random(min, max);
    const s = t.slice(Math.min(i, j), Math.max(i, j));
    return S.joinWith(s)(S.splitOn(s)(t)) === t;
  }), {tests: 1000});

});
