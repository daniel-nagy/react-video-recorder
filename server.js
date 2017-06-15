const connect = require('connect');
const path = require('path');
const serveStatic = require('serve-static');

const PORT = process.env.PORT || 3000;

const app = connect();
const servePublic = serveStatic(path.join(__dirname, 'public'));

app.use((req, res, next) => {
  if (path.extname(req.url) === '') {
    req.url = '/index.html';
  }

  next();
});

app.use(servePublic);

const server = app.listen(PORT, (error) => {
  if (error) {
    return console.log('server failed to start', error);
  }

  console.log(`server listening on port ${PORT}`);
});
