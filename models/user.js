const User = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      paranoid: true
    }
  );

  User.associate = model => {
    User.hasMany(model.Address, {
      foreignKey: 'userId',
      targetKey: 'id'
    });
  };

  return User;
};

module.exports = User;
