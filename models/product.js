const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'AVAILABLE'
      }
    },
    {
      paranoid: true
    }
  );

  Product.associate = model => {
    Product.hasMany(model.Item, {
      foreignKey: 'productId',
      targetKey: 'id'
    });
  };

  return Product;
};

module.exports = Product;
