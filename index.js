module.exports = function(options){
    //SETTINGS
    /*
     if(!options.avoidDefaultOperators){
     if(options.enabledOperators){
     for(var i=0; i< options.enabledOperators.length; i++){
     //trigger error if operator not present
     _operators = default_operators[options.enabledOperators[i]];
     }

     } else {
     _operators = default_operators;
     }

     if(options.disabledOperators){
     for(var i=0; i< options.disabledOperators.length; i++){
     //trigger error if operator not present
     delete _operators[options.disabledOperators[i]];
     }
     }
     }
     */

    var _addOperators = function(operators){
        for(var i=0; i< operators.length; i++){
            for (var key in operators[i]) {
                if( operators[i].hasOwnProperty(key) ) {
                    _operators[key] = operators[i][key];
                }
            }
        }
    };

    //set defaults
    var stringParser = require('./lib/parseString')({});
    var conditionParser = require('./lib/parseCondition')({});

    var _evaluate = function(str, values){
        var expression = stringParser.evaluateString(str);
        return conditionParser.evaluate(expression, values);
    };



    return {
        addOperators: _addOperators,
        evaluate: _evaluate
    }
};

