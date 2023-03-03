const Cart = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    status: {
      type: DataTypes.ENUM('NEW', 'INCOMPLETE', 'COMPLETED'),
      allowNull: false,
      defaultValue: 'NEW'
    }
  });

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
