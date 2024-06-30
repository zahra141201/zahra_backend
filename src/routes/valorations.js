const Router = require('koa-router');
const { Valoration } = require('../models');
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

// Route pour obtenir les requêtes selon un user
router.get('/:email', async (ctx) => {
  try {
    const { email } = ctx.params;
    const valorations = await Valoration.findAll({
      where: { email },
    });
    ctx.status = 200;
    ctx.body = valorations;
  } catch (error) {
    console.error('Error fetching requests by ingredient:', error);
    ctx.status = 500;
    ctx.body = { error: 'An error occurred while fetching the requests' };
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { comment, puntuation, email_user, made_by } = req.body;

  try {
      // Trouver la valoration par son ID
      const valoration = await Valoration.findByPk(id);

      if (!valoration) {
          return res.status(404).json({ error: 'Valoration not found' });
      }

      // Mettre à jour les champs de la valoration
      if (comment !== undefined) valoration.comment = comment;
      if (puntuation !== undefined) valoration.puntuation = puntuation;
      if (email_user !== undefined) valoration.email_user = email_user;
      if (made_by !== undefined) valoration.made_by = made_by;

      // Sauvegarder les changements dans la base de données
      await valoration.save();

      res.json({ message: 'Valoration updated successfully', valoration });
  } catch (error) {
      console.error('Error updating valoration:', error);
      res.status(500).json({ error: 'An error occurred while updating the valoration' });
  }
});

// Route pour supprimer une requête selon l'utilisateur et l'ingrédient
router.delete('/user/:made_by/ingredient/:id_ingrediente', async (ctx) => {
  try {
    const { made_by, id_ingrediente } = ctx.params;
    const request = await Valoration.findOne({
      where: { made_by, id_ingrediente },
    });

    if (request) {
      await request.destroy();
      ctx.status = 204; // No Content
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Request not found' };
    }
  } catch (error) {
    console.error('Error deleting request:', error);
    ctx.status = 500;
    ctx.body = { error: 'An error occurred while deleting the request' };
  }
});