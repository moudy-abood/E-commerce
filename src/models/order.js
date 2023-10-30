const Order = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      temporaryAddress: {
        type: DataTypes.JSON
      },
      addressId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      status: {
        type: DataTypes.ENUM('PENDING', 'DISPATCHED', 'DELIVERED'),
        defaultValue: 'PENDING'
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      paranoid: true
    }
  );

  Order.associate = model => {
    Order.belongsTo(model.Address, {
      foreignKey: 'addressId',
      targetKey: 'id'
    });
    Order.belongsTo(model.Cart, {
      foreignKey: 'cartId',
      targetKey: 'id'
    });
    Order.belongsTo(model.User, {
      foreignKey: 'userId',
      targetKey: 'id'
    });
  };

  return Order;
};

module.exports = Order;
