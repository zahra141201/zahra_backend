const Router = require('koa-router');
const { Valoration } = require('../models/valoration');
const router = new Router();


router.get('/', async (ctx) => {
    try {
        const valorations = await ctx.orm.Valoration.findAll();
        ctx.status = 200;
        ctx.body = valorations;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Ocurrio un error al buscar las valoraciones'}
    }
});


router.post('/', async (ctx) => {
    try {
      console.log('Solicitud recibida para la creación de una valoracion');
      console.log('Datos de la solicitud:', ctx.request.body);
  
      const valoration = await ctx.orm.Valoration.create(ctx.request.body);
      console.log('valoration creado con éxito:', valoration);
  
      ctx.status = 201;
      ctx.body = valoration;
    } catch (error) {
      console.error('Error al crear la valoration:', error);
      ctx.status = 500;
      ctx.body = { error: 'Ocurrió un error al crear la valoration' };
    }
  });
module.exports = router;