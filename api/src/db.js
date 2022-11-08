var { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const sequelize = new Sequelize("postgres://postgres:password@localhost:5432/harrypoter", {
    logging: false,
    native: false
})

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models")).forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Para relacionarlos hacemos un destructuring
const { character, house } = sequelize.models;

// Aca vendrian las relaciones
character.belongsToMany(house, { through: "middle", timestamps: false });
house.belongsToMany(character, { through: "middle", timestamps: false });

//console.log(sequelize.models)

module.exports = {
    ...sequelize.models,
    conn: sequelize
}