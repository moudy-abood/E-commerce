const Cart = (sequelize,DataTypes)=>{
    const Cart = sequelize.define('Cart', {
        // Model attributes are defined here
        id:{
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        }
      });
      
      Cart.associate = model=>{
        Cart.belongsTo(model.User, {
          foreignKey: 'userId',
          targetKey: 'id'
        })

        Cart.hasMany(model.Item, {
          foreignKey: 'cartId',
          targetKey: 'id'
        })
      }
      return Cart
}




module.exports = Cart