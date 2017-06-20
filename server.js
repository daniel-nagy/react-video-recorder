const bodyParser = require('body-parser');
const connect = require('connect');
const fs = require('fs');
const path = require('path');
const serveStatic = require('serve-static');

const DEVELOPMENT = 'development';
const HOST = '0.0.0.0';
const PORT = process.env.PORT || 3000;

const app = connect();
const servePublic = serveStatic(path.join(__dirname, 'public'));

if (process.env.NODE_ENV === DEVELOPMENT) {
  // allow CORS
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    next();
  });
}

app.use('/video', bodyParser.raw({type: 'video/*', limit: '10mb'}));

app.use('/video', (req, res, next) => {
  fs.writeFile('videos/test.webm', req.body, function (error) {
    if (error) {
      console.log(error);
      res.statusCode = 500;
    } else {
      res.statusCode = 202;
    }
  });

  res.end();
});

app.use((req, res, next) => {
  if (path.extname(req.url) === '') {
    req.url = '/index.html';
  }

  next();
});

app.use(servePublic);

const server = app.listen(PORT, HOST, (error) => {
  if (error) {
    return console.log('server failed to start', error);
  }

  console.log(`server listening on port ${PORT}`);
});
