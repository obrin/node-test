var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var _ = require('lodash');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;


function* count() {
  for (var x = 0; true; x++) {
    yield x
  }
}

//for(var x of count()) {
//  console.log(x); // TODO: REMOVE CONSOLE LOG
//}

var hello = function *(name) {
  yield 'Your name is ' + name;
  return 'hello ' + name;
};

//var gen = hello('James');
//console.log(gen.next()); // TODO: REMOVE CONSOLE LOG
//console.log(gen.next()); // TODO: REMOVE CONSOLE LOG

var getAsset = function(assetId) {
  return new Promise (function(resolve, rejected) {
    setTimeout(function() {
      resolve(`${assetId} promised`)
    }, 1000)
  })
};

var getAssets = function (assetIds) {
  return new Promise (function(resolve, rejected) {
    var assets = [];
    _.forEach(assetIds, function(id) {
      getAsset(id)
        .then(function(data) {
          assets.push(data)
        })
    });
    resolve(assets)
  });

};

var assetIds = ['1', '2'];
getAssets(assetIds)
  .then(function(data) {
    console.log(data); // TODO: REMOVE CONSOLE LOG
  });

let p = () => {
  return new Promise ((resolve, reject) => {
    resolve('resolved');
  })
}



/*===================== Promises =====================*/

function otherASync(url, cb) {
  cb(`${url} === this is a callback from otheSync`);
}

function asyncFunc(url) {
  return new Promise((resolve,reject) => {
    otherASync(url, result => resolve(result))
  })
}

//asyncFunc('hello world')
//  .then(data => console.log(data));


/**************************************************************/
/* Generators */
/**************************************************************/

function * asyncFunc_2(url) {
  const caller = yield;
  otherASync(url, result => caller.success(result));
}

function* echo(text, delay = 0) {
  const caller = yield;
  setTimeout(() => caller.success(text), delay);
}

function* demo(str) {
  var res = yield 10;
  if (res === 32) {
    return 42
  }
}

//var d = demo(10);
//console.log(d.next()); // TODO: REMOVE CONSOLE LOG
//console.log(d.next(31)); // TODO: REMOVE CONSOLE LOG



function* powersOfTwo(maxExponent) {
  var exponent = 0;
  while (exponent <= maxExponent) {
    yield Math.pow(2, exponent);
    exponent ++;
  }
}

//var it = pow ersOfTwo(10),
//  result = it.next();
//
//while (!result.done) {
//  console.log(result.value); //dispatch
//  result = it.next();
//}

var myGen = function* () {
  var one = yield 1;
  var two = yield 2;
  var three = yield 3;
  console.log(one, two, three); // TODO: REMOVE CONSOLE LOG
};

//var gen = myGen();
//var it = gen.next();
//console.log(gen.next()); // TODO: REMOVE CONSOLE LOG
//console.log(gen.next()); // TODO: REMOVE CONSOLE LOG
//console.log(gen.next(2)); // TODO: REMOVE CONSOLE LOG
//console.log(gen.next(3)); // TODO: REMOVE CONSOLE LOG

//while (!it.done) {
//  //console.log(it.value); // TODO: REMOVE CONSOLE LOG
//  it = gen.next(it.value);
//}

/*===================== NOTES =====================*/
// values can be passed into a generator which not only makes it an iterator
// but an observable as well
// can iterate infinitely

function* getValues() {
  yield 64;
  yield 2;
  return 71;
}

let v = getValues();
let itv = v.next();

//while (!itv.done) {
//  console.log(itv.value); // TODO: REMOVE CONSOLE LOG
//  itv = v.next();
//}

var delay = function(str) {
  return new Promise((resolved, rejected) => {
    setTimeout(function() {
      resolved(str)
    }, 1000)
  })
};

var delay_2 = function() {
  return new Promise((resolved, rejected) => {
    setTimeout(function() {
      resolved("HAHAHA===");
    }, 200)
  })
};

var delay_3 = function(str, cb) {
  setTimeout(function() {
    cb(str)
  }, 1000)
}

/**************************************************************/
/* Async Await */
/**************************************************************/

async function getWeather(str) {
  try {
    let a = await delay(str);
    let b = await delay_2();
    let c = await delay_3(a, data => data);
    console.log(a, b, c); // TODO: REMOVE CONSOLE LOG
  } catch(err) {
    console.log('error in async ' + err); // TODO: REMOVE CONSOLE LOG
  }

  return {a, b};
}

// getWeather('hello')

var Promises = require("bluebird");
var co = require('co');



let str = 'yoyoyoyoyoyoyoyo';

// Promises.coroutine(function* (str) {
//   var one = yield delay_2();
//   var two = yield delay(str);
//   console.log(one, two); // TODO: REMOVE CONSOLE LOG
//   return [one, two];
// });

// delay_2();

async function foo(str) {
  let a = await delay_2();
  let b = await delay(str);
  console.log(a, b);
  return [a, b];
}


/**************************************************************/
/* For-Of-Loop */
/**************************************************************/


// LODASH test

var users = [
  {
    "key": "dev::users::1",
    "value": {
      "key": 1,
      "value": {
        "user_name": "bar",
        "access_token": "12345",
        "refresh_token": "7789",
        "id": 1
      },
      "id": "dev::users::1"
    },
    "id": "dev::users::1"
  }
]

var userNew = _.pluck(users, 'value');

console.log(userNew);
