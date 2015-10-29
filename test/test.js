
var assert = require('assert');

var conditioner = require('../index');

var parser;

var default_operators = require("../lib/operators");

var _makeTest = function(str, vals,res){
    for (var i=0;i<res.length;i++){

        (function(val, res) {
            if(typeof val != "object") val = {a: val};
            it(str + " with " +JSON.stringify(val), function () {

                var result = parser.evaluate(str, val);
                assert.equal(res, result);
            });
        })(vals[i], res[i]);
    }

}

describe('Warming Up', function() {
    parser = conditioner({});
    //var parser = Conditioner({});
    //definer.evaluate("a == 10 && (isOk || foo == 'test') || !isOk", );

    describe('Logical Operators test', function () {
        //var generic_condition = "a == 10 && (isOk || foo == 'test') || !isOk";

        var values = {a:true};

        _makeTest("a || false",
            [false,    true,    undefined],
            [false,     true,   false]
        );

        _makeTest("a || true",
            [false,    true, undefined],
            [true,     true, true]
        );

        _makeTest("a && true",
            [false,    true],
            [false,     true]
        );
        _makeTest("a && false",
            [false,    true],
            [false,     false]
        );

        _makeTest("!a",
            [false,    true],
            [true,     false]
        );

    });

    describe('Conditional Operators test', function () {
        //var generic_condition = "a == 10 && (isOk || foo == 'test') || !isOk";




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

        _makeTest("a == 10 && (isOk || foo == 'test') || !isOk",
            //{} -> isOk=undefined -> !isOk == true
            [{},    {a : 10, isOk : true, foo : 'test'}],
            [true,  true]);

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