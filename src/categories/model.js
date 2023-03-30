import {DataTypes} from "sequelize"
import sequelize from "../db.js"

const CategoriesModel = sequelize.define(
    "category", {
    categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
})

export default CategoriesModel