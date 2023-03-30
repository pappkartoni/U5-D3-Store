import {DataTypes} from "sequelize"
import sequelize from "../db.js"

const ProductsCategoriesModel = sequelize.define(
    "productCategory", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
})

export default ProductsCategoriesModel