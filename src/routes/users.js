
const Router = require('koa-router');
const router = new Router();
const { User } = require('../models');



 router.post('/', async (ctx) => {
   try {
     console.log('Solicitud POST recibida en /users');
     console.log('Datos recibidos:', ctx.request.body);

     const user = await ctx.orm.User.create(ctx.request.body);
     console.log('Usuario creado:', user);

     ctx.body = user;
     ctx.status = 201;
   } catch (error) {
     console.error('Error al crear usuario:', error);
     ctx.body = error;
     ctx.status = 400;
   }
 });

router.get('/', async (ctx) => {
  try {
    const users = await ctx.orm.User.findAll(); // Asegúrate de que ctx.orm.User esté correctamente definido
    ctx.body = users;
    ctx.status = 200;
  } catch (error) {
    console.error('Error en la consulta Sequelize:', error); // Agrega un log para ver el error
    ctx.body = error;
    ctx.status = 500; // Error del servidor
  }
});

// router.get('/:id', async (ctx) => {
//   try {
//     const userId = ctx.params.id;
//     const user = await ctx.orm.User.findByPk(userId);

//     if (!user) {
//       ctx.status = 404;
//       ctx.body = { message: 'Usuario no encontrado' };
//       return;
//     }

//     ctx.body = user;
//     ctx.status = 200;
//   } catch (error) {
//     console.error('Error al obtener usuario:', error);
//     ctx.body = error;
//     ctx.status = 500;
//   }
// });


module.exports = router;







// router.get("user.getByEmail", '/:email', async (ctx) => {
//   try {
//     const { email } = ctx.params;
//     console.log('Recherche d\'un utilisateur avec l\'adresse e-mail :', email);

//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       console.log('Aucun utilisateur trouvÃƒÂ© avec l\'adresse e-mail :', email);
//       ctx.status = 404;
//       ctx.body = { error: 'No user found with the provided email address' };
//     } else {
//       console.log('Utilisateur trouvÃƒÂ© avec succÃƒÂ¨s :', user);
//       ctx.status = 200;
//       ctx.body = user;
//     }
//   } catch (error) {
//     console.error('Une erreur est survenue lors de la recherche de l\'utilisateur par e-mail :', error);
//     ctx.status = 500;
//     ctx.body = { error: 'OcurriÃƒÂ³ un error al buscar el usuario por correo electrÃƒÂ³nico' };
//   }
// });



// const jwt = require('jsonwebtoken');
// const util = require('util');
// const verify = util.promisify(jwt.verify);

// router.get('/login/token', async (ctx) => {
//   try {
//     // Extraire le token du header Authorization
//     const authHeader = ctx.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//       ctx.status = 401;
//       ctx.body = { error: 'Missing token' };
//       return;
//     }

//     // VÃƒÂ©rifier et dÃƒÂ©coder le token JWT
//     let decodedToken;
//     try {
//       decodedToken = await verify(token, 'your_secret_key');
//     } catch (err) {
//       ctx.status = 403;
//       ctx.body = { error: 'Invalid token' };
//       return;
//     }

//     // Utiliser l'email extrait du token JWT pour rechercher l'utilisateur dans la base de donnÃƒÂ©es
//     const userEmail = decodedToken.email;
//     console.log("Email extrait du token JWT:", userEmail);

//     if (!userEmail) {
//       ctx.status = 400;
//       ctx.body = { error: 'Email not found in token' };
//       return;
//     }

//     const user = await User.findOne({ where: { email: userEmail.trim() } });
//     console.log("RÃƒÂ©sultat de la requÃƒÂªte utilisateur:", user);

//     if (!user) {
//       ctx.status = 404;
//       ctx.body = { error: 'User not found' };
//       return;
//     }

//     ctx.status = 200;
//     ctx.body = user;
//   } catch (error) {
//     console.error('Une erreur est survenue lors de la recherche de l\'utilisateur par token :', error);
//     ctx.status = 500;
//     ctx.body = { error: 'Internal server error' };
//   }
// });









// // Route de suppression basÃ©e sur l'email
// router.delete('/deleteByEmail/:email', async (ctx) => {
//   try {
//     const { email } = ctx.params;
//     const user = await User.findOne({ where: { email } });

//     if (user) {
//       await user.destroy();
//       ctx.status = 204;
//     } else {
//       ctx.status = 404;
//       ctx.body = { error: 'User not found' };
//     }
//   } catch (error) {
//     console.log(error);
//     ctx.status = 500;
//     ctx.body = { error: 'An error occurred while deleting the user' };
//   }
// });




//   router.patch('/:id', async (ctx) => {
//     try {
//       const { id } = ctx.params;
//       const { body } = ctx.request;
//       const user = await ctx.orm.User.findByPk(id);
//       if (!user) {
//         ctx.status = 404;
//         ctx.body = { error: 'User not found' };
//         return;
//       }
//       await user.update(body);
//       ctx.status = 200;
//       ctx.body = user;
//     } catch (error) {
//       ctx.status = 500;
//       ctx.body = { error: 'An error occurred while updating the user' };
//     }
//   });








// router.post('/login', async (ctx) => {
//   console.log('Recherche d\'un utilisateur avec l\'adresse e-mail');
//   const { email, password } = ctx.request.body;
//   console.log('Recherche d\'un utilisateur avec l\'adresse e-mail :', email, password);

//   // Rechercher l'utilisateur dans la base de donnÃƒÂ©es
//   const user = await User.findOne({ where: { email } });

//   console.log(user)

//   if (!user) {
//     ctx.status = 401;
//     ctx.body = { error: 'Utilisateur non trouvÃƒÂ©.' };
//     return;
//   }

//   // VÃƒÂ©rifier le mot de passe en utilisant bcrypt
//   if (user.password !== password) {
//     ctx.status = 402;
//     ctx.body = { error: 'Mot de passe incorrect.' };
//     return;
//   }


//   // GÃƒÂ©nÃƒÂ©rer un token JWT
//   const token = jwt.sign({ userId: user.id, email: user.email }, 'your_secret_key');

//   // Envoyer le token JWT au client
//   ctx.body = { token };
// });

  



// router.post('/logout', async (ctx) => {
//   try {
//     // RÃ©cupÃ©rer le token du header Authorization
//     const authHeader = ctx.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (!token) {
//       // Si le token est absent, renvoyer une erreur 401 Unauthorized
//       ctx.status = 401;
//       ctx.body = { error: 'Token non fourni' };
//       return;
//     }

//     // VÃ©rifier et dÃ©coder le token JWT
//     const decodedToken = jwt.verify(token, 'your_secret_key');

//     // Supprimer le token, par exemple en le mettant Ã  null
//     // Ici, vous pouvez Ã©galement choisir d'effectuer d'autres actions de nettoyage, telles que la dÃ©connexion de l'utilisateur de votre application, etc.
//     // Pour l'exemple, nous supprimons simplement le token
//     const nouveauToken = null;

//     // Envoyer une rÃ©ponse avec le nouveau token (qui est maintenant nul)
//     ctx.status = 200;
//     ctx.body = { message: 'DÃ©connexion rÃ©ussie', token: nouveauToken };
//   } catch (error) {
//     console.error('Une erreur est survenue lors de la dÃ©connexion :', error);
//     ctx.status = 500;
//     ctx.body = { error: 'Erreur interne du serveur lors de la dÃ©connexion' };
//   }
// });