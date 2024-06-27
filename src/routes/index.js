const Router = require('koa-router');
const users = require('./routes/users');
const valorations = require('./routes/valorations')
const ingredients = require('./routes/ingredientes');
const authRoutes = require('./routes/authentication');
const dotenv = require('dotenv');
const jwtMiddleware = require('koa-jwt')
const scopeProtectedRoutes = require('./routes/scopeExample.js');



dotenv.config();


const router = new Router();
router.use('/valorations', valorations.routes());
router.use('/ingredientes', ingredients.routes());


router.use(authRoutes.routes());


// desde esta linea todas las rutas requeriran un JWT, esto no aplica para
// las lineas anteriores
router.use(jwtMiddleware( { secret: process.env.JWT_SECRET } ))
router.use('/users', users.routes());
router.use('/scope-example', scopeProtectedRoutes.routes())

module.exports = router;