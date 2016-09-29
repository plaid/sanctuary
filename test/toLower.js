'use strict';

var throws = require('assert').throws;

var eq = require('./utils').eq;
var errorEq = require('./utils').errorEq;
import * as S from '../src'


describe('toLower', function() {

  it('is a unary function', function() {
    eq(typeof S.toLower, 'function');
    eq(S.toLower.length, 1);
  });

  it('type checks its arguments', function() {
    throws(function() { S.toLower(true); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'toLower :: String -> String\n' +
                   '           ^^^^^^\n' +
                   '             1\n' +
                   '\n' +
                   '1)  true :: Boolean\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘String’.\n'));
  });

  it('returns the lower-case equivalent of its argument', function() {
    eq(S.toLower(''), '');
    eq(S.toLower('ABC def 123'), 'abc def 123');
    eq(S.toLower(new String('')), '');
    eq(S.toLower(new String('ABC def 123')), 'abc def 123');
  });

});
