const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(require('body-parser').urlencoded());
app.use(require('method-override')('_method'));

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.use('/', require('./routes'));

db.sync()
  .then(()=> db.seed());

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));
