const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      released_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      rating: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
