var app = require('koa')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');

var index = require('./routes/index');
var users = require('./routes/users');
var util = require('./routes/util');

var kstatic = require('koa-static');
var conditional = require('koa-conditional-get');
var etag = require('koa-etag');

// error handler
onerror(app);

// global middlewares
app.use(views('views', {
  root: __dirname + '/views',
  default: 'jade'
}));

app.use(require('koa-bodyparser')({
  formLimit: '1kb'
}));
app.use(json());
app.use(logger());


app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(conditional());
app.use(etag());

app.use(function*(next){
  this.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  this.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  this.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  this.set("Access-Control-Allow-Credentials", "true");
  console.log(this.request.method);
  if(this.request.method == 'OPTIONS') {
    this.response.status = 200;
  } else {
    yield next;
  }
});

app.use(kstatic(__dirname + '/public', {
  maxage: 3 * 60 * 1000,
  gzip: true
}));



// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(util.routes(), util.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
