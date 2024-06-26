// src/index.js
const Koa = require('koa');
const Logger = require('koa-logger');
const router = require('./routes'); // Importer le routeur principal

const app = new Koa();

app.use(Logger());

app.use(router.routes()); // Utiliser le routeur principal

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
