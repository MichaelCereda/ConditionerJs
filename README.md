# ConditionerJs
> Get rid of those tangled conditions

#### What can I do with ConditionerJS?
This tiny library has been specifically created to evaluate conditions in a safe and straightfoward way.

You can parse every condition with logical or conditional operators that is normally parsed in javascript (please check 'lib/operators' for a complete list).

Examples
```javascript
...
parser.evaluate('a==0 || (b>10 && foo=="bar")', {values})
...
```

#### Install

Install the module:
```
$ npm install conditionerjs
```

#### Use
```javascript
var conditioner = require('conditionerjs');

//initializing with default options
var parser = conditioner({});

//Parsing string given values
var res = parser.evaluate("a==10",{a:10});

// ... Tadaa!
console.log(res);
//output: true
```

#### Options (beta)

All the options must be passed during initialization.

```javascript
var conditioner = require('conditionerjs');

var options = {

}
var parser = conditioner(options); // add options here

```

#### Todo

* Custom parenthesis support
* Custom operators support
* Adding more operators
* Perfomance improvements  
* More unit tests
