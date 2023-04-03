const Address = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    'Address',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      paranoid: true
    }
  );
  Address.associate = model => {
    Address.belongsTo(model.User, {
      foreignKey: 'userId',
      targetKey: 'id'
    });
    Address.hasMany(model.Order, {
      foreignKey: 'addressId',
      targetKey: 'id'
    });
  };
  return Address;
};

module.exports = Address;
