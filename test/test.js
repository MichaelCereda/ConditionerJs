
var assert = require('assert');

var conditioner = require('../index');

var parser;


function tracePerformances(fn){
    var t0 = performance.now();
    var res = fn()
    var t1 = performance.now();
}

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

        var values = {a:true};

        it('a == false', function () {
            var result = parser.evaluate("a == false", values);
            assert.equal(false, result);
        });

        it('a != false', function () {
            var result = parser.evaluate("a != false", values);
            assert.equal(true, result);
        });
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

    });
});