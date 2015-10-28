var default_operators = {
    'logical':{
        '||' : function(a, b){ return a || b },
        '&&' : function(a, b){ return a && b },
        '!': function(a){return !a}
    },
    'conditional':{
        '==' : function(a, b){ return a == b },

        '===': function(a, b){ return a === b },
        '!=': function(a, b){ return a != b },
        '!==': function(a, b){ return a !== b },
        '>': function(a, b){ return a > b },
        '<': function(a, b){ return a < b },
        '>=': function(a, b){ return a >= b },
        '<=': function(a, b){ return a <= b }
    }


}; // fill the list

module.exports = default_operators;

module.exports.logical = default_operators.logical;
module.exports.conditional = default_operators.conditional;