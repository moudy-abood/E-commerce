const Sequelize = require('sequelize');
const User = require('./user')
const Address = require('./address')
const Cart = require('./cart')
const Product = require('./product')
const Item = require('./item')
const Order = require('./order')


const sequelize = new Sequelize('e_commerce', 'postgres', '0000', {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(() => {
sequelize.sync({force: true})
console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
  });
const userMod = User(sequelize,Sequelize.DataTypes)
const addressMod = Address(sequelize, Sequelize.DataTypes)
const cartMod = Cart(sequelize, Sequelize.DataTypes)
const productMod = Product(sequelize, Sequelize.DataTypes)
const itemMod = Item(sequelize, Sequelize.DataTypes)
const orderMod = Order(sequelize, Sequelize.DataTypes)

const models = {
User: userMod,
Address: addressMod,
Cart: cartMod,
Product: productMod,
Item: itemMod,
Order: orderMod
}


 Object.keys(models).forEach(modelName => {
    const model = models[modelName];
    if (model.associate) {
      model.associate(models);
    }
  });

  module.exports = models