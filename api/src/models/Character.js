const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("character", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        species: {
            type: DataTypes.STRING,
            allowNull: false
        },
        wizard: {
            type: DataTypes.BOOLEAN
        },
        eyeColour: {
            type: DataTypes.STRING
        },
        hairColour: {
            type: DataTypes.STRING
        },
        hogwartsStudent: {
            type: DataTypes.BOOLEAN
        },
        actor: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false
    });
};