const Item = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    'Item',
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
      quantity: {
        type: DataTypes.INTEGER
      }
    },
    {
      paranoid: true
    }
  );

  Item.associate = model => {
    Item.belongsTo(model.Product, {
      foreignKey: 'productId',
      targetKey: 'id'
    });
    Item.belongsTo(model.Cart, {
      foreignKey: 'cartId',
      targetKey: 'id'
    });
  };
  return Item;
};

module.exports = Item;
