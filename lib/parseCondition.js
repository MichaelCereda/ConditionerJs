var default_operators = require("./operators");

var quotesArray = ["'",'"'];

var _tmp_values;
var parseValue = function(str){
    if(_tmp_values.hasOwnProperty(str)) {
        return _tmp_values[str];
    }
    if(isNaN(str)){
        //Contains String
        for(var i=0;i<quotesArray.length; i++){
            var tmp = str.split(quotesArray[i]);
            if(tmp.length === 3) return tmp[1];
        }

        if(str === 'true' || str === 'false'){
            return str == 'true';
        }

        return undefined;

        //it's probably a variable
        console.log("is var ", str);
    } else {
        return +str;
    }
    //hasn't been parsed
    return str;

}

var logical_operators, conditional_operators;


var evaluateArray = function(expr){
    var accumulator;
    if( Object.prototype.toString.call( expr) !== '[object Array]'){
        return parseValue(expr);
    }

    if(expr.length == 3){

        operator = logical_operators[expr[1]] || conditional_operators[expr[1]];
        //console.log(operator, expr[1]);
        return operator(evaluateArray(expr[0]), evaluateArray(expr[2]));
    }
    if(expr.length == 2){
        operator = conditional_operators[expr[0]] || logical_operators[expr[0]];
        return operator(evaluateArray(expr[1]));
    }


    for (var i=0;i<expr.length; i++){
        var  operator, b,
            tmp;
        if( Object.prototype.toString.call( expr[i]) === '[object Array]'){
            tmp =  evaluateArray(expr[i]);
        } else {
            //@todo check if this thing is right
            operator = conditional_operators[expr[i]] || logical_operators[expr[i]];
            if(!operator){
                tmp = evaluateArray(expr[i]);
            }

        }
        if(i==0){
            accumulator = tmp;
        } else {
            //Trigger error if operator is not defined
            accumulator = operator(accumulator, evaluateArray(expr[i+1]));
            i++;
        }
    }
    return accumulator;
};

module.exports = function(options){
    logical_operators = default_operators.logical;
    if(options.logical){
        logical_operators = options.logical;
    }

    conditional_operators = default_operators.conditional;
    if(options.conditional){
        conditional_operators = options.conditional;
    }

    return {
        evaluate: function(expr, values ){
            _tmp_values = values;
            return evaluateArray (expr);
        }
    }
}