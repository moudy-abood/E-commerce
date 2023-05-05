const Cart = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    'Cart',
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
      status: {
        type: DataTypes.ENUM('NEW', 'INCOMPLETE', 'COMPLETED'),
        allowNull: false,
        defaultValue: 'NEW'
      }
    },
    {
      paranoid: true
    }
  );

  Cart.associate = model => {
    Cart.belongsTo(model.User, {
      foreignKey: 'userId',
      targetKey: 'id'
    });
    Cart.hasMany(model.Item, {
      foreignKey: 'cartId',
      targetKey: 'id'
    });
  };

  return Cart;
};

module.exports = Cart;
