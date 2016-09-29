'use strict';

var throws = require('assert').throws;

var eq = require('./utils').eq;
var errorEq = require('./utils').errorEq;
import * as S from '../src'


describe('inc', function() {

  it('is a unary function', function() {
    eq(typeof S.inc, 'function');
    eq(S.inc.length, 1);
  });

  it('type checks its arguments', function() {
    throws(function() { S.inc('xxx'); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'inc :: FiniteNumber -> FiniteNumber\n' +
                   '       ^^^^^^^^^^^^\n' +
                   '            1\n' +
                   '\n' +
                   '1)  "xxx" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘FiniteNumber’.\n'));

    throws(function() { S.inc(Infinity); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'inc :: FiniteNumber -> FiniteNumber\n' +
                   '       ^^^^^^^^^^^^\n' +
                   '            1\n' +
                   '\n' +
                   '1)  Infinity :: Number, ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘FiniteNumber’.\n'));

    throws(function() { S.inc(-Infinity); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'inc :: FiniteNumber -> FiniteNumber\n' +
                   '       ^^^^^^^^^^^^\n' +
                   '            1\n' +
                   '\n' +
                   '1)  -Infinity :: Number, ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘FiniteNumber’.\n'));
  });

  it('increments a number by one', function() {
    eq(S.inc(1), 2);
    eq(S.inc(-1), 0);
    eq(S.inc(1.5), 2.5);
    eq(S.inc(-1.5), -0.5);
  });

});
