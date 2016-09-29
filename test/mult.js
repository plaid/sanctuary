'use strict';

var throws = require('assert').throws;

var eq = require('./utils').eq;
var errorEq = require('./utils').errorEq;
import * as S from '../src'


describe('mult', function() {

  it('is a binary function', function() {
    eq(typeof S.mult, 'function');
    eq(S.mult.length, 2);
  });

  it('type checks its arguments', function() {
    throws(function() { S.mult('xxx', 2); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'mult :: FiniteNumber -> FiniteNumber -> FiniteNumber\n' +
                   '        ^^^^^^^^^^^^\n' +
                   '             1\n' +
                   '\n' +
                   '1)  "xxx" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘FiniteNumber’.\n'));

    throws(function() { S.mult(2, 'xxx'); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'mult :: FiniteNumber -> FiniteNumber -> FiniteNumber\n' +
                   '                        ^^^^^^^^^^^^\n' +
                   '                             1\n' +
                   '\n' +
                   '1)  "xxx" :: String\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘FiniteNumber’.\n'));

    throws(function() { S.mult(2, Infinity); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'mult :: FiniteNumber -> FiniteNumber -> FiniteNumber\n' +
                   '                        ^^^^^^^^^^^^\n' +
                   '                             1\n' +
                   '\n' +
                   '1)  Infinity :: Number, ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘FiniteNumber’.\n'));

    throws(function() { S.mult(2, -Infinity); },
           errorEq(TypeError,
                   'Invalid value\n' +
                   '\n' +
                   'mult :: FiniteNumber -> FiniteNumber -> FiniteNumber\n' +
                   '                        ^^^^^^^^^^^^\n' +
                   '                             1\n' +
                   '\n' +
                   '1)  -Infinity :: Number, ValidNumber\n' +
                   '\n' +
                   'The value at position 1 is not a member of ‘FiniteNumber’.\n'));
  });

  it('multiplies two numbers', function() {
    eq(S.mult(4, 2), 8);
    eq(S.mult(4, -2), -8);
    eq(S.mult(-4, -2), 8);
    eq(S.mult(1.5, 3), 4.5);
    eq(S.mult(-1.5, 3), -4.5);
    eq(S.mult(-1.5, -3), 4.5);
  });

  it('is curried', function() {
    eq(S.mult(1).length, 1);
    eq(S.mult(2)(2), 4);
  });

});
