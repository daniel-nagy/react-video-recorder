const bodyParser = require('body-parser');
const connect = require('connect');
const fs = require('fs');
const path = require('path');
const serveStatic = require('serve-static');

const HOST = '0.0.0.0';
const PORT = process.env.PORT || 3000;

const app = connect();
const servePublic = serveStatic(path.join(__dirname, 'public'));

app.use(bodyParser.raw({type: 'video/*'}));

app.use('/video', (req, res, next) => {
  fs.writeFile('videos/test.webm', req.body, function(error) {
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
