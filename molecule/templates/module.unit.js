/*global describe:false, it:false, expect:false, <%= namespace %>:false */
// <reference path='<%= modulenameCamelized %>.js">
'use strict';

describe('<%= modulenameCamelized %> tests', function () {

  it('Adds two numbers', function () {
    // Arrange
    var num1 = 1;
    var num2 = 3;
    var expected = 4;

    // Act
    var result = <%= namespace %>.<%= modulenameCamelized %>.publicFunctionExample(num1, num2);

    // Assert
    expect(result).toBe(expected);
  });

});
