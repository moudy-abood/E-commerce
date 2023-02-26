const Order = (sequelize,DataTypes)=>{
    const Order = sequelize.define('Order', {
        // Model attributes are defined here
        id:{
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        temporaryAddress:{
          type: DataTypes.JSON,
      },
        addressId:{
        type: DataTypes.INTEGER,
        allowNull: true
      },

        status:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending'
        },
        total:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0
        }
      });

      Order.associate = model=>{
        Order.belongsTo(model.Address, {
          foreignKey: 'addressId',
          targetKey: 'id'
        })
      }

      
      Order.associate = model=>{
        Order.belongsTo(model.Cart, {
          foreignKey: 'cartId',
          targetKey: 'id'
        })
      }

      return Order
}




module.exports = Order