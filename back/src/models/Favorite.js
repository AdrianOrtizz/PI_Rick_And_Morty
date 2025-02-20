const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define(
      'Favorite', 
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         },
         name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
         },
         status: {
            type: DataTypes.ENUM("Alive", "Dead", "unknown"),
            allowNull: false,
         },
         species: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         gender: {
            type: DataTypes.ENUM("Female", "Male", "Genderless", "unknown"),
            allowNull: false,
         },
         origin: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         image: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
               isUrl: true,
            }
         },
      }, 
      { 
         timestamps: false 
      }
   );
};
