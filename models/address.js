
const Address = (sequelize,DataTypes)=>{
    const Address = sequelize.define('Address', {
        // Model attributes are defined here
      
        id:{
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
        street:{
            type: DataTypes.STRING,
            allowNull: false
        },
        postalCode:{
            type: DataTypes.STRING,
            allowNull: true,
        }
      });
      Address.associate = model=>{
        Address.belongsTo(model.User,{
          foreignKey: 'userId',
          targetKey: 'id'
        })
      }

      Address.associate = model=>{
        Address.hasMany(model.Order,{
          foreignKey: 'addressId',
          targetKey: 'id'
        })
      }

      return  Address
}


module.exports = Address