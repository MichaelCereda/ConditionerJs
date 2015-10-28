# ConditionerJs
> Get rid of those tangled conditions

This tiny library has been specifically created to evaluate conditions in a safe and straightfoward way.

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

```

#### Todo

* Custom operators support
* Perfomance improvements  
* More unit tests
