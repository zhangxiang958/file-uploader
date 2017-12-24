var util = require('util');
var path = require('path');
var router = require('koa-router')();
var multiparty = require('multiparty');
var count = 0;
router.prefix('/util');

router.post('/upload', function *(next) {
  var form = new multiparty.Form({
    uploadDir: path.join(__dirname, '../files')
  });
  var revecive = 0, all = 0;
  form.on('error', (err) => {
    console.log('Error parsing form: ' + err.stack);
  });

  form.parse(this.req, (err, fields, files) => {
    // console.log(this.req.headers);
    // console.log(files);
    // console.log(files.files[0].headers);
    // console.log(util.inspect({ fields, files }));
  });

  form.on('progress', (already, notyet) => {
    // if(!part.filename) {
    //   console.log('got fields named ' + part.name);
    // }
    console.log('already: ' + already);
    revecive = already;
    console.log('notyet: ' + notyet);
    all = notyet;
    // this.body = already / notyet;
    // if(part.filename) {
    //   count++;
    //   console.log('go file named ' + part.name);
    //   part.resume();
    // }
    // this.body = 'test';
    // part.on('error', (err) => {
    //   console.log(err);
    // });
  });

  form.on('close', () => {
    console.log('upload completed');
  });
  this.body = 'upload success';
});

module.exports = router;
