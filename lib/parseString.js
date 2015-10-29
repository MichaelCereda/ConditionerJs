var default_operators = require("./operators");


RegExp.quote = function(str) {
    return (str+'').replace(/([\=.?*+^$[\]\\(){}|-])/g, "\\$1");
};

var logicalOperatorsRegex, conditionalRegex;

function splitByLogicalOperators(operators){
    var opRegex = '(.*?)(';
    var first = true;
    for ( var i in operators ) {

        if ( ! first ) {
            opRegex += '|';
        }
        opRegex += RegExp.quote(i);
        if(i == '!'){
            opRegex += '(?=[\\w ])';
        }
            first = false;
    }
    opRegex += ')(.*)';

    return new RegExp(opRegex, 'g');
}





var _conditionalSplitter= function(str){
    conditionalRegex.lastIndex = 0;


    var tmpStr = conditionalRegex.exec(str);
    if(!tmpStr) {
        return isNaN(str) ? str.trim() : +str;
    }

    return [
        tmpStr[1].trim(),
        tmpStr[2],
        _conditionalSplitter(tmpStr[tmpStr.length-1])];

    /*var operator = _conditional_operators[tmpStr[2]];
     var a = isNaN(tmpStr[1]) ? values[tmpStr[1].trim()] : +tmpStr[1];
     var b = _conditionalSplitter(tmpStr[tmpStr.length-1], values);
     return operator(a,b);*/


};

var _logicalSplitter = function(str){
    logicalOperatorsRegex.lastIndex = 0;
    var tmpStr = logicalOperatorsRegex.exec(str);
    if(!tmpStr) return _conditionalSplitter(str);
    var output;

    if(tmpStr[2] == '!'){
        //console.log([tmpStr[2], _logicalSplitter(tmpStr[tmpStr.length-1])], values);
        output = [tmpStr[2], _logicalSplitter(tmpStr[tmpStr.length-1])];
    } else {
        //console.log([tmpStr[1], tmpStr[2], _logicalSplitter(tmpStr[tmpStr.length-1], values)]);
        /*var operator = _logical_operators[tmpStr[2]];
         var a = _conditionalSplitter(tmpStr[1], values);
         var b = _logicalSplitter(tmpStr[tmpStr.length-1], values);
         output = operator(a,b);
         */

        output = [
            _conditionalSplitter(tmpStr[1]),
            tmpStr[2],
            _logicalSplitter(tmpStr[tmpStr.length-1])
        ];

    }

    return output;
};


function makeOperatorsRegex(operators){
    var opRegex = '([a-zA-Z0-9 ]*)(';
    var first = true;

    var acc = ""
    for ( var i in operators ) {
        if ( ! first ) {
            acc += '|';
        }
        acc += RegExp.quote(i);
        first = false;
    }
    opRegex += acc+')'+'(?:[^'+acc+'])'+'(.*)';

    return new RegExp(opRegex, 'g');
}


var _parseString = function(str){
    var output = [];

    // Handle Parenthesis
    var openParenthesis = str.indexOf('(');
    if ( openParenthesis > -1 ) {
        var closeParenthesis = str.lastIndexOf(')');
        var contents = str.substring(openParenthesis + 1, closeParenthesis);
        var beforePar = _logicalSplitter(str.substring(0, openParenthesis));
        var afterPar = _logicalSplitter(str.substring(closeParenthesis+1, str.length));
        var insidePar = _parseString(contents);

        output = [beforePar[0],beforePar[1], insidePar, afterPar[1],afterPar[2]];
    }
    else {
        openParenthesis = str.length;
        var prefix = str.substring(0, openParenthesis);
        output = _logicalSplitter(prefix);
    }


    /*var res;
     while ( res = regexp.exec(prefix) ) {
     output.push(res[1].trim());
     output.push(res[2].trim());
     }

     var lastIdx = output.length - 1;
     if ( _operators.hasOwnProperty(output[lastIdx])) {
     var tmpOutput = [[output.slice(0, lastIdx)], output[lastIdx]];
     output = tmpOutput;
     }*/
    ///*for ( var i in toAppend ) {
    //    output.push(toAppend[i]);
    //}*/
    return output;
};

module.exports = function(options){
    var logical_operators = default_operators.logical;
    if(options.logical){
        logical_operators = options.logical;
    }

    var conditional_operators = default_operators.conditional;
    if(options.conditional){
        conditional_operators = options.conditional;
    }

    logicalOperatorsRegex = splitByLogicalOperators(logical_operators);
    conditionalRegex = makeOperatorsRegex(conditional_operators);


    return {
        "evaluateString": _parseString
    }
}
