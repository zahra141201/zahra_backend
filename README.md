# zahra_backend

npx sequelize-cli model:generate --name Request --attributes pick_up_date:date,comment:string,state:string,made_by:string,id_ingrediente:integer
npx sequelize-cli model:generate --name ShoppingCart --attributes email_cliente:string,id_ingredient:integer,estado:boolean
npx sequelize-cli model:generate --name Ingredient --attributes name:string, expiration_date:date, weight:integer,bought_date:date,price:float,description:string,owner:string
npx sequelize-cli model:generate --name User --attributes email:string,password:string,name:string,telephone:integer,member_since:date,address:string,description:string,is_admin:boolean
npx sequelize-cli model:generate --name Valoration --attributes comment:string,puntuation:integer,email_user:string,made_by:string