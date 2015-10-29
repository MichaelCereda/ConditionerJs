
var assert = require('assert');

var conditioner = require('../index');

var parser;

var default_operators = require("../lib/operators");

describe('Warming Up', function() {
    parser = conditioner({});
    //var parser = Conditioner({});
    //definer.evaluate("a == 10 && (isOk || foo == 'test') || !isOk", );

    describe('Logical Operators test', function () {
        //var generic_condition = "a == 10 && (isOk || foo == 'test') || !isOk";

        var values = {a:true};

        it('a || false', function () {
            var result = parser.evaluate("a || false", values);
            assert.equal(true, result);
        });

        it('a && false', function () {
            var result = parser.evaluate("a && false", values);
            assert.equal(false, result);
        });

        it('!a', function () {
            var result = parser.evaluate("!a", values);
            assert.equal(false, result);
        });
    });

    describe('Conditional Operators test', function () {
        //var generic_condition = "a == 10 && (isOk || foo == 'test') || !isOk";

        var _makeTest = function(str, vals,res){
            for (var i=0;i<res.length;i++){

                (function(val, res) {
                    it(str + " with a = " +val, function () {
                        var result = parser.evaluate(str, {a: val});
                        assert.equal(res, result);
                    });
                })(vals[i], res[i]);
            }

        }


        _makeTest("a == 3",
            [-1,    3,      5],
            [false, true,   false]
        );
        _makeTest("a == true",
            [false,    true],
            [false,    true]
        );
        _makeTest("a != true",
            [false,    true],
            [true,    false]
        );
        _makeTest("a === 3", [-1,3,5],[false,true,false]);
        _makeTest("a !== 3", [-1,3,5],[true,false,true]);
        //_makeTest("a !=== 3", [-1,3,5],[true,false,true]);
        _makeTest("a >= 3", [-1,3,5],[false,true,true]);
        _makeTest("a > 3",
            [-1,    3,      5],
            [false, false,  true]);
        _makeTest("a <= 3",
            [-1,    3,      5],
            [true, true,  false]);
        _makeTest("a < 3",
            [-1,    3,      5],
            [true, false,  false]);
        _makeTest("a != 3",
            [-1,    3,      5],
            [true, false,  true]);
    });
});


describe('Test', function() {
    parser = conditioner({});
    //var parser = Conditioner({});
    //definer.evaluate("a == 10 && (isOk || foo == 'test') || !isOk", {a:10, isOk:true, foo : 'test'});

    describe('Logical Operators test', function () {
        //var generic_condition = "a == 10 && (isOk || foo == 'test') || !isOk";

        var values = {
            a : 10,
            isOk : true,
            foo : 'test'
        };

        it("a == 10 && (isOk || foo == 'test') || !isOk", function () {
            var result = parser.evaluate("a == 10 && (isOk || foo == 'test') || !isOk", values);
            assert.equal(true, result);
        });

        it("a != 10 && (isOk || foo == 'test') || !isOk", function () {
            var result = parser.evaluate("a != 10 && (isOk || foo == 'test') || !isOk", {
                a : 10,
                isOk : true,
                foo : 'test'
            });
            assert.equal(false, result);
        });

    });
});